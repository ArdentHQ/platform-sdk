import { Collections, Contracts, IoC, Services } from "@ardenthq/sdk";
import { DateTime } from "@ardenthq/sdk-intl";
import dotify from "node-dotify";
import { Request } from "./request.js";
import { PayloadSignature } from "./transaction-type.service";

export class ClientService extends Services.AbstractClientService {
	readonly #request: Request;

	public constructor(container: IoC.IContainer) {
		super(container);

		this.#request = new Request(
			container.get(IoC.BindingType.ConfigRepository),
			container.get(IoC.BindingType.HttpClient),
			container.get(IoC.BindingType.NetworkHostSelector),
		);
	}

	public override async transaction(id: string): Promise<Contracts.ConfirmedTransactionData> {
		const body = await this.#request.get(`transactions/${id}`);

		return this.dataTransferObjectService.transaction(body.data);
	}

	public override async transactions(
		query: Services.ClientTransactionsInput,
	): Promise<Collections.ConfirmedTransactionDataCollection> {
		const response = await this.#request.get("transactions", this.#createSearchParams(query));

		return this.dataTransferObjectService.transactions(response.data, this.#createMetaPagination(response));
	}

	public override async wallet(id: Services.WalletIdentifier): Promise<Contracts.WalletData> {
		const body = await this.#request.get(`wallets/${id.value}`);

		return this.dataTransferObjectService.wallet(body.data);
	}

	public override async wallets(query: Services.ClientWalletsInput): Promise<Collections.WalletDataCollection> {
		const response = await this.#request.get("wallets", this.#createSearchParams(query));

		return new Collections.WalletDataCollection(
			response.data.map((wallet) => this.dataTransferObjectService.wallet(wallet)),
			this.#createMetaPagination(response),
		);
	}

	public override async delegate(id: string): Promise<Contracts.WalletData> {
		const body = await this.#request.get(`delegates/${id}`);

		return this.dataTransferObjectService.wallet(body.data);
	}

	public override async delegates(query?: Contracts.KeyValuePair): Promise<Collections.WalletDataCollection> {
		const body = await this.#request.get("delegates", this.#createSearchParams(query || {}));

		return new Collections.WalletDataCollection(
			body.data.map((wallet) => this.dataTransferObjectService.wallet(wallet)),
			this.#createMetaPagination(body),
		);
	}

	public override async votes(id: string): Promise<Services.VoteReport> {
		const { data } = await this.#request.get(`wallets/${id}`);

		const vote = data.vote || data.attributes?.vote;
		const hasVoted = vote !== undefined;

		return {
			available: hasVoted ? 0 : 1,
			used: hasVoted ? 1 : 0,
			votes: hasVoted
				? [
						{
							amount: 0,
							id: vote,
						},
				  ]
				: [],
		};
	}

	public override async voters(
		id: string,
		query?: Contracts.KeyValuePair,
	): Promise<Collections.WalletDataCollection> {
		const body = await this.#request.get(`delegates/${id}/voters`, this.#createSearchParams(query || {}));

		return new Collections.WalletDataCollection(
			body.data.map((wallet) => this.dataTransferObjectService.wallet(wallet)),
			this.#createMetaPagination(body),
		);
	}

	public override async broadcast(
		transactions: Contracts.SignedTransactionData[],
	): Promise<Services.BroadcastResponse> {
		let response: Contracts.KeyValuePair;

		const transactionToBroadcast: any[] = [];

		for (const transaction of transactions) {
			const data = await transaction.toBroadcast();
			transactionToBroadcast.push(data);
		}

		try {
			response = await this.#request.post(
				"transactions",
				{
					body: {
						transactions: transactionToBroadcast,
					},
				},
				"tx",
			);
		} catch (error) {
			response = (error as any).response.json();
		}

		const { data, errors } = response;

		const result: Services.BroadcastResponse = {
			accepted: [],
			errors: {},
			rejected: [],
		};

		if (Array.isArray(data.accept)) {
			for (const acceptedIndex of data.accept) {
				result.accepted.push(transactions[acceptedIndex]?.id());
			}
		}

		if (Array.isArray(data.invalid)) {
			for (const rejected of data.invalid) {
				result.rejected.push(transactions[rejected]?.id());
			}
		}

		if (errors) {
			const responseErrors: [string, { message: string }][] = Object.entries(errors);

			for (const [key, value] of responseErrors) {
				if (Array.isArray(value)) {
					result.errors[key] = value[0].message;
				} else {
					result.errors[key] = value.message;
				}
			}
		}

		return result;
	}

	#createMetaPagination(body): Services.MetaPagination {
		const getPage = (url: string): string | undefined => {
			const match: RegExpExecArray | null = new RegExp(/page=(\d+)/).exec(url);

			return match ? match[1] || undefined : undefined;
		};

		return {
			last: getPage(body.meta.last) || undefined,
			next: getPage(body.meta.next) || undefined,
			prev: getPage(body.meta.previous) || undefined,
			self: getPage(body.meta.self) || undefined,
		};
	}

	#createSearchParams(body: Services.ClientTransactionsInput): { body: object | null; searchParams: object | null } {
		if (Object.keys(body).length <= 0) {
			return { body: null, searchParams: null };
		}

		const result: any = {
			body,
			searchParams: {},
		};

		const mappings: Record<string, string> = {
			address: "address",
			cursor: "page",
			limit: "limit",
			memo: "vendorField",
			orderBy: "orderBy",
			recipientId: "recipientId",
			senderId: "senderId",
			senderPublicKey: "senderPublicKey",
		};

		for (const [alias, original] of Object.entries(mappings)) {
			if (body[alias]) {
				result.searchParams[original] = body[alias];

				delete result.body[alias];
			}
		}

		if (body.identifiers) {
			const identifiers: Services.WalletIdentifier[] = body.identifiers;

			result.searchParams.address = identifiers.map(({ value }) => value).join(",");

			// @ts-ignore
			delete body.identifiers;
		}

		const transactionTypeMap: Record<string, string|undefined> = {
			delegateRegistration: PayloadSignature.VALIDATOR_REGISTRATION,
			delegateResignation: PayloadSignature.VALIDATOR_RESIGNATION,
			multiPayment: PayloadSignature.MULTIPAYMENT,
			multiSignature: undefined,
			transfer: PayloadSignature.TRANSFER,
			usernameRegistration: undefined,
			usernameResignation: undefined,
			vote: [PayloadSignature.VOTE, PayloadSignature.UNVOTE].join(","),
		};

		// @ts-ignore
		if (body.type) {
			const data = transactionTypeMap[body.type];
			if (data !== undefined) {
				result.searchParams.data = data;
			}

			delete body.type;
		}

		if (body.types) {
			const data: string[] = [];

			for (const type of body.types) {
				const datum = transactionTypeMap[type];

				if (datum) {
					data.push(datum);
				}
			}

			if (data.length > 0) {
				result.searchParams.data = data.join(",");
			}

			delete body.types;
		}

		if (body.timestamp) {
			const normalizeTimestamps = (timestamp: Services.RangeCriteria) => {
				const epoch: string = this.configRepository.get<string>("network.constants.epoch");

				const normalized = { ...timestamp };

				if (epoch) {
					for (const [key, value] of Object.entries(normalized)) {
						normalized[key] = Math.max(value - DateTime.make(epoch).toUNIX(), 0);
					}
				}

				return normalized;
			};

			const normalized = normalizeTimestamps(body.timestamp);

			result.searchParams.timestamp = normalized;
			delete body.timestamp;
		}

		result.searchParams = dotify({ ...result.searchParams, ...result.body });
		result.body = null;

		return result;
	}
}

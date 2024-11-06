import { Collections, Contracts, IoC, Services } from "@ardenthq/sdk";
import { uniq } from "@ardenthq/sdk-helpers";
import { DateTime } from "@ardenthq/sdk-intl";
import dotify from "node-dotify";

import { Enums } from "./crypto/index.js";
import { Request } from "./request.js";

const transactionTypeByName = (type?: string): { type: Enums.TransactionType; typeGroup: Enums.TransactionTypeGroup } =>
	({
		delegateRegistration: {
			type: Enums.TransactionType.DelegateRegistration,
			typeGroup: Enums.TransactionTypeGroup.Core,
		},
		delegateResignation: {
			type: Enums.TransactionType.DelegateResignation,
			typeGroup: Enums.TransactionTypeGroup.Core,
		},
		htlcClaim: {
			type: Enums.TransactionType.HtlcClaim,
			typeGroup: Enums.TransactionTypeGroup.Core,
		},
		htlcLock: {
			type: Enums.TransactionType.HtlcLock,
			typeGroup: Enums.TransactionTypeGroup.Core,
		},
		htlcRefund: {
			type: Enums.TransactionType.HtlcRefund,
			typeGroup: Enums.TransactionTypeGroup.Core,
		},
		ipfs: {
			type: Enums.TransactionType.Ipfs,
			typeGroup: Enums.TransactionTypeGroup.Core,
		},
		magistrate: {
			typeGroup: 2,
		},
		multiPayment: {
			type: Enums.TransactionType.MultiPayment,
			typeGroup: Enums.TransactionTypeGroup.Core,
		},
		multiSignature: {
			type: Enums.TransactionType.MultiSignature,
			typeGroup: Enums.TransactionTypeGroup.Core,
		},
		secondSignature: {
			type: Enums.TransactionType.SecondSignature,
			typeGroup: Enums.TransactionTypeGroup.Core,
		},
		transfer: {
			type: Enums.TransactionType.Transfer,
			typeGroup: Enums.TransactionTypeGroup.Core,
		},
		vote: {
			type: Enums.TransactionType.Vote,
			typeGroup: Enums.TransactionTypeGroup.Core,
		},
		// @ts-ignore
	}[type]);

export class ClientService extends Services.AbstractClientService {
	readonly #request: Request;

	#isLegacyMap: Map<string, boolean> = new Map();

	public constructor(container: IoC.IContainer) {
		super(container);

		this.#request = new Request(
			container.get(IoC.BindingType.ConfigRepository),
			container.get(IoC.BindingType.HttpClient),
			container.get(IoC.BindingType.NetworkHostSelector),
		);
	}

	public override async transaction(
		id: string,
		input?: Services.TransactionDetailInput,
	): Promise<Contracts.ConfirmedTransactionData> {
		const body = await this.#request.get(`transactions/${id}`);

		return this.dataTransferObjectService.transaction(body.data);
	}

	public override async transactions(
		query: Services.ClientTransactionsInput,
	): Promise<Collections.ConfirmedTransactionDataCollection> {
		const network = this.configRepository.get<string>("network.id");

		await this.#setLegacy(network);

		const response = this.#isLegacy(network)
			? await this.#request.post("transactions/search", this.#createSearchParams(query))
			: await this.#request.get("transactions", this.#createSearchParams(query));

		return this.dataTransferObjectService.transactions(response.data, this.#createMetaPagination(response));
	}

	public override async wallet(id: Services.WalletIdentifier): Promise<Contracts.WalletData> {
		const body = await this.#request.get(`wallets/${id.value}`);

		return this.dataTransferObjectService.wallet(body.data);
	}

	public override async wallets(query: Services.ClientWalletsInput): Promise<Collections.WalletDataCollection> {
		const network = this.configRepository.get<string>("network.id");

		await this.#setLegacy(network);

		const response = this.#isLegacy(network)
			? await this.#request.post("wallets/search", this.#createSearchParams(query))
			: await this.#request.get("wallets", this.#createSearchParams(query));

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
		await this.#setLegacy(this.configRepository.get<string>("network.id"));

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

		try {
			response = await this.#request.post("transactions", {
				body: {
					transactions: transactions.map((transaction: Contracts.SignedTransactionData) =>
						transaction.toBroadcast(),
					),
				},
			});
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
			result.accepted = data.accept;
		}

		if (Array.isArray(data.invalid)) {
			result.rejected = data.invalid;
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

		const isLegacy = this.#isLegacy(this.configRepository.get<string>("network.id"));

		const result: any = {
			body,
			searchParams: {},
		};

		const mappings: Record<string, string> = {
			cursor: "page",
			limit: "limit",
			memo: "vendorField",
			orderBy: "orderBy",
		};

		if (!isLegacy) {
			Object.assign(mappings, {
				address: "address",
				recipientId: "recipientId",
				senderId: "senderId",
				senderPublicKey: "senderPublicKey",
			});
		}

		for (const [alias, original] of Object.entries(mappings)) {
			if (body[alias]) {
				result.searchParams[original] = body[alias];

				delete result.body[alias];
			}
		}

		if (body.identifiers) {
			const identifiers: Services.WalletIdentifier[] = body.identifiers;

			if (isLegacy) {
				result.body.addresses = identifiers.map(({ value }) => value);
			} else {
				result.searchParams.address = identifiers.map(({ value }) => value).join(",");
			}

			// @ts-ignore
			delete body.identifiers;
		}

		// @ts-ignore
		if (body.type) {
			const { type, typeGroup } = transactionTypeByName(body.type);

			if (type !== undefined) {
				if (isLegacy) {
					result.body!.type = type;
				} else {
					result.searchParams.type = type;
				}
			}

			if (typeGroup !== undefined) {
				if (isLegacy) {
					result.body!.typeGroup = typeGroup;
				} else {
					result.searchParams.typeGroup = typeGroup;
				}
			}

			if (!isLegacy) {
				// @ts-ignore
				delete body.type;
			}
		}

		if (Array.isArray(body.types)) {
			const typeParameters = body.types
				.map((transactionType: string) => transactionTypeByName(transactionType))
				.filter(({ type }) => !!type);
			const types = typeParameters.map(({ type }) => type).join(",");
			const typeGroup = uniq(typeParameters.map(({ typeGroup }) => typeGroup)).join(",");

			if (types !== undefined) {
				if (isLegacy) {
					result.body!.type = types;
				} else {
					result.searchParams.type = types;
				}
			}

			if (typeGroup !== undefined) {
				if (isLegacy) {
					result.body!.typeGroup = typeGroup;
				} else {
					result.searchParams.typeGroup = typeGroup;
				}
			}

			if (!isLegacy) {
				// @ts-ignore
				delete body.types;
			}
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

			if (isLegacy) {
				result.body!.timestamp = normalized;
			} else {
				result.searchParams.timestamp = normalized;

				delete body.timestamp;
			}
		}

		if (!isLegacy) {
			result.searchParams = dotify({ ...result.searchParams, ...result.body });
			result.body = null;
		}

		return result;
	}

	#isLegacy(network: string): boolean | undefined {
		return this.#isLegacyMap.get(network);
	}

	async #setLegacy(network: string): Promise<void> {
		if (this.#isLegacyMap.get(network) !== undefined) {
			return;
		}

		try {
			await this.#request.get("wallets", {
				searchParams: {
					limit: 1,
					nonce: 0,
				},
			});

			this.#isLegacyMap.set(network, false);
		} catch (error) {
			if (error.message.includes(422)) {
				this.#isLegacyMap.set(network, true);
			}
		}
	}
}

import { Collections, Contracts, IoC, Services } from "@ardenthq/sdk";
import { DateTime } from "@ardenthq/sdk-intl";
import dotify from "node-dotify";

import { Enums } from "./crypto/index.js";
import { Request } from "./request.js";

import { Application } from "@mainsail/kernel";
import { Identifiers } from "@mainsail/contracts";
import { ServiceProvider as CoreValidation } from "@mainsail/validation";
import { ServiceProvider as CoreCryptoConfig } from "@mainsail/crypto-config";
import { ServiceProvider as CoreCryptoValidation } from "@mainsail/crypto-validation";
import { ServiceProvider as CoreCryptoKeyPairEcdsa } from "@mainsail/crypto-key-pair-ecdsa";
import { ServiceProvider as CoreCryptoAddressBase58 } from "@mainsail/crypto-address-base58";
import { ServiceProvider as CoreCryptoSignatureSchnorr } from "@mainsail/crypto-signature-schnorr-secp256k1";
import { ServiceProvider as CoreCryptoHashBcrypto } from "@mainsail/crypto-hash-bcrypto";
import { ServiceProvider as CoreFees } from "@mainsail/fees";
import { ServiceProvider as CoreFeesStatic } from "@mainsail/fees-static";
import { ServiceProvider as CoreCryptoTransaction } from "@mainsail/crypto-transaction";
import {
	ServiceProvider as CoreCryptoTransactionTransfer,
	TransferBuilder,
} from "@mainsail/crypto-transaction-transfer";
import { Container } from "@mainsail/container";

import { milestones } from "./crypto/networks/devnet/milestones.js";
import { network } from "./crypto/networks/devnet/network.js";

export class ClientService extends Services.AbstractClientService {
	readonly #request: Request;
	#app: any;

	public constructor(container: IoC.IContainer) {
		super(container);

		this.#request = new Request(
			container.get(IoC.BindingType.ConfigRepository),
			container.get(IoC.BindingType.HttpClient),
			container.get(IoC.BindingType.NetworkHostSelector),
		);

		this.#app = new Application(new Container());
	}

	async #boot(): Promise<void> {
		await this.#app.resolve(CoreValidation).register();
		await this.#app.resolve(CoreCryptoConfig).register();
		await this.#app.resolve(CoreCryptoValidation).register();
		await this.#app.resolve(CoreCryptoKeyPairEcdsa).register();
		await this.#app.resolve(CoreCryptoAddressBase58).register();
		await this.#app.resolve(CoreCryptoSignatureSchnorr).register();
		await this.#app.resolve(CoreCryptoHashBcrypto).register();
		await this.#app.resolve(CoreFees).register();
		await this.#app.resolve(CoreFeesStatic).register();
		await this.#app.resolve(CoreCryptoTransaction).register();
		await this.#app.resolve(CoreCryptoTransactionTransfer).register();
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
		// Example taken from https://hackmd.io/@LwuiVnzwR0Of7SPH5HkMvQ/HJ7ELcG6p#How-To
		await this.#boot();

		// @TODO: extract the mnemonic from signatory, after successfull broadcast.
		const mnemonic =
			"rally use tray draft level program also below today head wrist fabric damage vacuum fog hundred clinic next noodle clean boring universe endorse act";

		const serializedTransactions: any = [];

		for (const transaction of transactions) {
			// Sign transaction.
			const signedTransaction = await this.#app
				.resolve(TransferBuilder)
				.fee(transaction.fee())
				.nonce("1")
				.recipientId(transaction.recipient())
				.amount(transaction.amount())
				.sign(mnemonic);

			const tx = await signedTransaction.build();
			// Transactions needs to be serialized in mainsail compared to ark.
			serializedTransactions.push(tx.serialized.toString("hex"));
		}

		// @TODO: Add url & port in manifest. Notice the endpoint is different than ark (transaction-pool instead of transactions in ark)
		//
		// Also make sure this.httpClient is sending the data in right format, otherwise use another one for the PoC.
		// See example https://hackmd.io/@LwuiVnzwR0Of7SPH5HkMvQ/HJ7ELcG6p#How-To
		try {
			console.log("broadcasting", { serializedTransactions });
			const response = await this.httpClient.post("http:/49.13.30.19:4007/api/transaction-pool", {
				transactions: serializedTransactions,
			});

			console.log({ response });
		} catch (error) {
			console.log({ error });
		}

		// @TODO: Adjust the following code with the respoonse data to return `Services.BroadcastResponse`
		// in order not to break existing functionality for consumers (e.g arkvault)

		// let response: Contracts.KeyValuePair;
		// try {
		// 	response = await this.#request.post("transactions", {
		// 		body: {
		// 			transactions: transactions.map((transaction: Contracts.SignedTransactionData) =>
		// 				transaction.toBroadcast(),
		// 			),
		// 		},
		// 	});
		// } catch (error) {
		// 	response = (error as any).response.json();
		// }
		//
		// const { data, errors } = response;

		// const result: Services.BroadcastResponse = {
		// 	accepted: [],
		// 	errors: {},
		// 	rejected: [],
		// };
		//
		// if (Array.isArray(data.accept)) {
		// 	result.accepted = data.accept;
		// }
		//
		// if (Array.isArray(data.invalid)) {
		// 	result.rejected = data.invalid;
		// }
		//
		// if (errors) {
		// 	const responseErrors: [string, { message: string }][] = Object.entries(errors);
		//
		// 	for (const [key, value] of responseErrors) {
		// 		if (Array.isArray(value)) {
		// 			result.errors[key] = value[0].message;
		// 		} else {
		// 			result.errors[key] = value.message;
		// 		}
		// 	}
		// }
		//
		// return result;
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
			cursor: "page",
			limit: "limit",
			memo: "vendorField",
			orderBy: "orderBy",
			address: "address",
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

		// @ts-ignore
		if (body.type) {
			const { type, typeGroup } = {
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
			}[body.type];

			if (type !== undefined) {
				result.searchParams.type = type;
			}

			if (typeGroup !== undefined) {
				result.searchParams.typeGroup = typeGroup;
			}

			delete body.type;
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

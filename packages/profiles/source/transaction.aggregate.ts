import { Collections, Services } from "@ardenthq/sdk";

import { IProfile, IReadWriteWallet, ITransactionAggregate } from "./contracts.js";
import { promiseAllSettledByKey } from "./helpers/promise.js";
import { AggregateQuery } from "./transaction.aggregate.contract.js";
import { ExtendedConfirmedTransactionDataCollection } from "./transaction.collection.js";
import { ExtendedConfirmedTransactionData } from "./transaction.dto.js";

type HistoryMethod = string;
type HistoryWallet = ExtendedConfirmedTransactionDataCollection;

export class TransactionAggregate implements ITransactionAggregate {
	readonly #profile: IProfile;
	#history: Record<HistoryMethod, Record<string, HistoryWallet>> = {};

	public constructor(profile: IProfile) {
		this.#profile = profile;
	}

	/** {@inheritDoc ITransactionAggregate.all} */
	public async all(query: AggregateQuery = {}): Promise<ExtendedConfirmedTransactionDataCollection> {
		return this.#aggregate("all", query);
	}

	/** {@inheritDoc ITransactionAggregate.sent} */
	public async sent(query: AggregateQuery = {}): Promise<ExtendedConfirmedTransactionDataCollection> {
		return this.#aggregate("sent", query);
	}

	/** {@inheritDoc ITransactionAggregate.received} */
	public async received(query: AggregateQuery = {}): Promise<ExtendedConfirmedTransactionDataCollection> {
		return this.#aggregate("received", query);
	}

	/** {@inheritDoc ITransactionAggregate.hasMore} */
	public hasMore(method: string): boolean {
		return Object.values(this.#history[method] || {})
			.map((response) => response.hasMorePages())
			.includes(true);
	}

	/** {@inheritDoc ITransactionAggregate.flush} */
	public flush(method?: string): void {
		if (method) {
			this.#history[method] = {};
			return;
		}

		this.#history = {};
	}

	async #aggregate(method: string, query: AggregateQuery): Promise<ExtendedConfirmedTransactionDataCollection> {
		const syncedWallets: IReadWriteWallet[] = this.#getWallets(query.identifiers);

		if (syncedWallets.length === 0) {
			console.log("No synced wallet found");
			return new ExtendedConfirmedTransactionDataCollection([], {
				last: undefined,
				next: 0,
				prev: undefined,
				self: undefined,
			});
		}

		const historyRecords = this.#history[method];

		const historyKeys: string[] = [];

		for (const syncedWallet of syncedWallets) {
			historyKeys.push(syncedWallet.address());
		}

		historyKeys.sort((a, b) => a.localeCompare(b));

		query.orderBy && historyKeys.push(query.orderBy);
		query.limit && historyKeys.push(query.limit.toString());
		query?.types.length  && historyKeys.push(query?.types.join(":"));

		const historyKey = historyKeys.join("-");

		if (historyRecords[historyKey]) {
			query = {...query, cursor: historyRecords[historyKey].nextPage()};
		}

		const response = await syncedWallets[0].transactionIndex()[method](query) as ExtendedConfirmedTransactionDataCollection;

		historyRecords[historyKey] = response;

		return new ExtendedConfirmedTransactionDataCollection(response.items(), {
			last: undefined,
			next: Number(response.nextPage()),
			prev: undefined,
			self: undefined,
		});
	}

	#getWallets(identifiers: Services.WalletIdentifier[] = []): IReadWriteWallet[] {
		return this.#profile
			.wallets()
			.values()
			.filter((wallet: IReadWriteWallet) => {
				const match =
					identifiers.length === 0 ||
					identifiers.some(({ type, value, networkId }: Services.WalletIdentifier) => {
						const networkMatch = networkId ? networkId === wallet.networkId() : true;

						if (type === "address") {
							return networkMatch && value === wallet.address();
						}

						/* istanbul ignore else */
						if (type === "extendedPublicKey") {
							return networkMatch && value === wallet.publicKey();
						}

						/* istanbul ignore next */
						return false;
					});
				return match && wallet.hasSyncedWithNetwork();
			});
	}
}

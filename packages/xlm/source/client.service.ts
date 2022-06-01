import { Collections, Contracts, IoC, Networks, Services } from "@ardenthq/sdk";
import Stellar from "stellar-sdk";

export class ClientService extends Services.AbstractClientService {
	#client;

	public constructor(container: IoC.IContainer) {
		super(container);

		const network = this.configRepository.get<Networks.NetworkManifest>("network").id;
		this.#client = new Stellar.Server(
			{ mainnet: "https://horizon.stellar.org", testnet: "https://horizon-testnet.stellar.org" }[
				network.split(".")[1]
			],
		);
	}

	public override async transaction(
		id: string,
		input?: Services.TransactionDetailInput,
	): Promise<Contracts.ConfirmedTransactionData> {
		const transaction = await this.#client.transactions().transaction(id).call();
		const operations = await transaction.operations();

		return this.dataTransferObjectService.transaction({
			...transaction,
			operation: operations.records[0],
		});
	}

	public override async transactions(
		query: Services.ClientTransactionsInput,
	): Promise<Collections.ConfirmedTransactionDataCollection> {
		const { records, next, prev } = await this.#client.payments().forAccount(query.identifiers![0].value).call();

		return this.dataTransferObjectService.transactions(
			records.filter((transaction) => transaction.type === "payment"),
			{
				prev,
				self: undefined,
				next,
				last: undefined,
			},
		);
	}

	public override async wallet(id: Services.WalletIdentifier): Promise<Contracts.WalletData> {
		return this.dataTransferObjectService.wallet(await this.#client.loadAccount(id.value));
	}

	public override async broadcast(
		transactions: Contracts.SignedTransactionData[],
	): Promise<Services.BroadcastResponse> {
		const result: Services.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			try {
				const { id } = await this.#client.submitTransaction(transaction.toBroadcast());

				transaction.setAttributes({ identifier: id });

				result.accepted.push(id);
			} catch (err) {
				result.rejected.push(transaction.id());

				const { extras } = (err as any).response.data;

				result.errors[transaction.id()] = JSON.stringify(extras.result_codes.operations);
			}
		}

		return result;
	}
}

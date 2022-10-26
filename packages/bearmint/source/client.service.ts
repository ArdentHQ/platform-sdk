import { Collections, Contracts, Exceptions, Services } from "@ardenthq/sdk";

export class ClientService extends Services.AbstractClientService {
	public override async transaction(
		id: string,
		input?: Services.TransactionDetailInput,
	): Promise<Contracts.ConfirmedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.transaction.name);
	}

	public override async transactions(
		query: Services.ClientTransactionsInput,
	): Promise<Collections.ConfirmedTransactionDataCollection> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.transactions.name);
	}

	public override async wallet(id: Services.WalletIdentifier): Promise<Contracts.WalletData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.wallet.name);
	}

	public override async wallets(query: Services.ClientWalletsInput): Promise<Collections.WalletDataCollection> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.wallets.name);
	}

	public override async delegate(id: string): Promise<Contracts.WalletData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.delegate.name);
	}

	public override async delegates(query?: Contracts.KeyValuePair): Promise<Collections.WalletDataCollection> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.delegates.name);
	}

	public override async votes(id: string): Promise<Services.VoteReport> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.votes.name);
	}

	public override async voters(
		id: string,
		query?: Contracts.KeyValuePair,
	): Promise<Collections.WalletDataCollection> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.voters.name);
	}

	public override async broadcast(
		transactions: Contracts.SignedTransactionData[],
	): Promise<Services.BroadcastResponse> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.broadcast.name);
	}
}

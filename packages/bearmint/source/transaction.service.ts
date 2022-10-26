import { Contracts, Exceptions, Services } from "@ardenthq/sdk";

export class TransactionService extends Services.AbstractTransactionService {
	/**
	 * @inheritDoc
	 *
	 * @musig
	 * @ledgerX
	 * @ledgerS
	 */
	public override async transfer(input: Services.TransferInput): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.transfer.name);
	}

	public override async secondSignature(
		input: Services.SecondSignatureInput,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.secondSignature.name);
	}

	public override async delegateRegistration(
		input: Services.DelegateRegistrationInput,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.delegateRegistration.name);
	}

	/**
	 * @inheritDoc
	 *
	 * @musig
	 * @ledgerX
	 * @ledgerS
	 */
	public override async vote(input: Services.VoteInput): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.vote.name);
	}

	/**
	 * @inheritDoc
	 *
	 * @musig
	 * @ledgerX
	 */
	public override async multiSignature(
		input: Services.MultiSignatureInput,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.multiSignature.name);
	}

	/**
	 * @inheritDoc
	 *
	 * @musig
	 * @ledgerX
	 * @ledgerS
	 */
	public override async ipfs(input: Services.IpfsInput): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.ipfs.name);
	}

	/**
	 * @inheritDoc
	 *
	 * @musig
	 */
	public override async multiPayment(input: Services.MultiPaymentInput): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.multiPayment.name);
	}

	public override async delegateResignation(
		input: Services.DelegateResignationInput,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.delegateResignation.name);
	}

	public override async estimateExpiration(value?: string): Promise<string | undefined> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.estimateExpiration.name);
	}
}

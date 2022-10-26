import { Contracts, Exceptions, Services, Signatories } from "@ardenthq/sdk";

export class MultiSignatureService extends Services.AbstractMultiSignatureService {
	/** @inheritdoc */
	public override async allWithPendingState(publicKey: string): Promise<Services.MultiSignatureTransaction[]> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.allWithPendingState.name);
	}

	/** @inheritdoc */
	public override async allWithReadyState(publicKey: string): Promise<Services.MultiSignatureTransaction[]> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.allWithReadyState.name);
	}

	/** @inheritdoc */
	public override async findById(id: string): Promise<Services.MultiSignatureTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.findById.name);
	}

	/** @inheritdoc */
	public override async forgetById(id: string): Promise<void> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.forgetById.name);
	}

	/** @inheritdoc */
	public override async broadcast(
		transaction: Services.MultiSignatureTransaction,
	): Promise<Services.BroadcastResponse> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.broadcast.name);
	}

	/** @inheritdoc */
	public override isMultiSignatureReady(
		transaction: Contracts.SignedTransactionData,
		excludeFinal?: boolean,
	): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isMultiSignatureReady.name);
	}

	/** @inheritdoc */
	public override needsSignatures(transaction: Contracts.SignedTransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.needsSignatures.name);
	}

	/** @inheritdoc */
	public override needsAllSignatures(transaction: Contracts.SignedTransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.needsAllSignatures.name);
	}

	/** @inheritdoc */
	public override needsWalletSignature(transaction: Contracts.SignedTransactionData, publicKey: string): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.needsWalletSignature.name);
	}

	/** @inheritdoc */
	public override needsFinalSignature(transaction: Contracts.SignedTransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.needsFinalSignature.name);
	}

	/** @inheritdoc */
	public override remainingSignatureCount(transaction: Contracts.SignedTransactionData): number {
		throw new Exceptions.NotImplemented(this.constructor.name, this.remainingSignatureCount.name);
	}

	/** @inheritdoc */
	public override async addSignature(
		transaction: Contracts.RawTransactionData,
		signatory: Signatories.Signatory,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.addSignature.name);
	}
}

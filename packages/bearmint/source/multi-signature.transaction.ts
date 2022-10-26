import { Exceptions } from "@ardenthq/sdk";
import { MultiSignatureTransaction } from "./multi-signature.contract.js";

export class PendingMultiSignatureTransaction {
	readonly #transaction: MultiSignatureTransaction;

	public constructor(transaction: MultiSignatureTransaction) {
		this.#transaction = {
			...transaction,
			signatures: [...transaction.signatures!],
		};
	}

	public isMultiSignature(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isMultiSignature.name);
	}

	public isMultiSignatureRegistration(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isMultiSignatureRegistration.name);
	}

	public isMultiSignatureReady({ excludeFinal }: { excludeFinal?: boolean }): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isMultiSignatureReady.name);
	}

	public needsSignatures(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.needsSignatures.name);
	}

	public needsAllSignatures(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.needsAllSignatures.name);
	}

	public needsWalletSignature(publicKey: string): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.needsWalletSignature.name);
	}

	public needsFinalSignature(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.needsFinalSignature.name);
	}

	public remainingSignatureCount(): number {
		throw new Exceptions.NotImplemented(this.constructor.name, this.remainingSignatureCount.name);
	}
}

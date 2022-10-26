import { Contracts, Exceptions, Signatories } from "@ardenthq/sdk";

import { MultiSignatureAsset, MultiSignatureTransaction } from "./multi-signature.contract.js";

export class MultiSignatureSigner {
	// The first argument should be a TransactionBuilder but we have no proper type to hint that.
	public sign(transaction: any, multiSignature: MultiSignatureAsset): MultiSignatureTransaction {
		throw new Exceptions.NotImplemented(this.constructor.name, this.sign.name);
	}

	public async addSignature(
		transaction: Contracts.RawTransactionData,
		signatory: Signatories.Signatory,
	): Promise<MultiSignatureTransaction> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.addSignature.name);
	}
}

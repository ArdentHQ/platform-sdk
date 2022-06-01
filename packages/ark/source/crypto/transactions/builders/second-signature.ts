import { BigNumber } from "@ardenthq/sdk-helpers";

import { Keys } from "../../identities/index.js";
import { ITransactionAsset, ITransactionData } from "../../interfaces/index.js";
import { SecondSignatureRegistrationTransaction } from "../types/index.js";
import { TransactionBuilder } from "./transaction.js";

export class SecondSignatureBuilder extends TransactionBuilder<SecondSignatureBuilder> {
	public constructor() {
		super();

		this.data.type = SecondSignatureRegistrationTransaction.type;
		this.data.typeGroup = SecondSignatureRegistrationTransaction.typeGroup;
		this.data.fee = SecondSignatureRegistrationTransaction.staticFee();
		this.data.amount = BigNumber.ZERO;
		this.data.recipientId = undefined;
		this.data.senderPublicKey = undefined;
		this.data.asset = { signature: {} } as ITransactionAsset;
	}

	public signatureAsset(secondPassphrase: string): SecondSignatureBuilder {
		if (this.data.asset && this.data.asset.signature) {
			this.data.asset.signature.publicKey = Keys.fromPassphrase(secondPassphrase).publicKey;
		}

		return this;
	}

	public override getStruct(): ITransactionData {
		const struct: ITransactionData = super.getStruct();
		struct.amount = this.data.amount;
		struct.recipientId = this.data.recipientId;
		struct.asset = this.data.asset;
		return struct;
	}

	protected instance(): SecondSignatureBuilder {
		return this;
	}
}

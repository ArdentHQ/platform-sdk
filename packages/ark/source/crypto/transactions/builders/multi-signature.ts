import { BigNumber } from "@ardenthq/sdk-helpers";

import { IMultiSignatureAsset, ITransactionData } from "../../interfaces/index.js";
import { MultiSignatureRegistrationTransaction } from "../types/index.js";
import { TransactionBuilder } from "./transaction.js";

export class MultiSignatureBuilder extends TransactionBuilder<MultiSignatureBuilder> {
	public constructor() {
		super();

		this.data.type = MultiSignatureRegistrationTransaction.type;
		this.data.typeGroup = MultiSignatureRegistrationTransaction.typeGroup;
		this.data.version = 2;
		this.data.fee = BigNumber.ZERO;
		this.data.amount = BigNumber.ZERO;
		this.data.recipientId = undefined;
		this.data.senderPublicKey = undefined;
		this.data.asset = { multiSignature: { min: 0, publicKeys: [] } };
	}

	public participant(publicKey: string): MultiSignatureBuilder {
		if (this.data.asset && this.data.asset.multiSignature) {
			const { publicKeys }: IMultiSignatureAsset = this.data.asset.multiSignature;

			if (publicKeys.length <= 16) {
				publicKeys.push(publicKey);
				this.data.fee = MultiSignatureRegistrationTransaction.staticFee({ data: this.data });
			}
		}

		return this;
	}

	public min(min: number): MultiSignatureBuilder {
		if (this.data.asset && this.data.asset.multiSignature) {
			this.data.asset.multiSignature.min = min;
		}

		return this;
	}

	public multiSignatureAsset(multiSignature: IMultiSignatureAsset): MultiSignatureBuilder {
		if (this.data.asset && this.data.asset.multiSignature) {
			this.data.asset.multiSignature = multiSignature;
			this.data.fee = MultiSignatureRegistrationTransaction.staticFee({ data: this.data });
		}

		return this;
	}

	public override getStruct(): ITransactionData {
		console.log("ark - multi-signature.ts - getStruct")
		const struct: ITransactionData = super.getStruct();
		console.log("ark - multi-signature.ts - superStruct is", struct)
		struct.amount = this.data.amount;
		struct.recipientId = this.data.recipientId;
		struct.asset = this.data.asset;

		return struct;
	}

	protected instance(): MultiSignatureBuilder {
		return this;
	}
}

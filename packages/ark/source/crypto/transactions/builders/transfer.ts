import { BigNumber } from "@ardenthq/sdk-helpers";

import { ITransactionData } from "../../interfaces/index.js";
import { TransferTransaction } from "../types/index.js";
import { TransactionBuilder } from "./transaction.js";

export class TransferBuilder extends TransactionBuilder<TransferBuilder> {
	public constructor() {
		super();

		this.data.type = TransferTransaction.type;
		this.data.typeGroup = TransferTransaction.typeGroup;
		this.data.fee = TransferTransaction.staticFee();
		this.data.amount = BigNumber.ZERO;
		this.data.recipientId = undefined;
		this.data.senderPublicKey = undefined;
		this.data.expiration = 0;
	}

	public expiration(expiration: number): TransferBuilder {
		this.data.expiration = expiration;

		return this.instance();
	}

	public override getStruct(): ITransactionData {
		const struct: ITransactionData = super.getStruct();
		struct.amount = this.data.amount;
		struct.recipientId = this.data.recipientId;
		struct.asset = this.data.asset;
		struct.vendorField = this.data.vendorField;
		struct.expiration = this.data.expiration;

		return struct;
	}

	protected instance(): TransferBuilder {
		return this;
	}
}

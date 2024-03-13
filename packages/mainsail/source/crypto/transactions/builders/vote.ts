import { BigNumber } from "@ardenthq/sdk-helpers";

import { ITransactionData } from "../../interfaces/index.js";
import { VoteTransaction } from "../types/index.js";
import { TransactionBuilder } from "./transaction.js";

export class VoteBuilder extends TransactionBuilder<VoteBuilder> {
	public constructor() {
		super();

		this.data.type = VoteTransaction.type;
		this.data.typeGroup = VoteTransaction.typeGroup;
		this.data.fee = VoteTransaction.staticFee();
		this.data.amount = BigNumber.ZERO;
		this.data.recipientId = undefined;
		this.data.senderPublicKey = undefined;
		this.data.asset = { votes: [] };

		this.signWithSenderAsRecipient = true;
	}

	public votesAsset(votes: string[]): VoteBuilder {
		if (this.data.asset && this.data.asset.votes) {
			this.data.asset.votes = votes;
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

	protected instance(): VoteBuilder {
		return this;
	}
}

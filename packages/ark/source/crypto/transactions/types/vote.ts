import { ByteBuffer } from "@ardenthq/sdk-helpers";
import { BigNumber } from "bignumber.js";

import { TransactionType, TransactionTypeGroup } from "../../enums.js";
import { ISerializeOptions } from "../../interfaces/index.js";
import * as schemas from "./schemas.js";
import { Transaction } from "./transaction.js";

export class VoteTransaction extends Transaction {
	public static override typeGroup: number = TransactionTypeGroup.Core;
	public static override type: number = TransactionType.Vote;
	public static override key = "vote";

	protected static override defaultStaticFee: BigNumber = new BigNumber("100000000");

	public static override getSchema(): schemas.TransactionSchema {
		return schemas.vote;
	}

	public serialize(options?: ISerializeOptions): ByteBuffer | undefined {
		const { data } = this;
		const buf: ByteBuffer = new ByteBuffer(Buffer.alloc(100));

		if (data.asset && data.asset.votes) {
			const voteBytes = data.asset.votes
				.map((vote) => (vote.startsWith("+") ? "01" : "00") + vote.slice(1))
				.join("");
			buf.writeUInt8(data.asset.votes.length);
			buf.writeBuffer(Buffer.from(voteBytes, "hex"));
		}

		return buf;
	}

	public deserialize(buf: ByteBuffer): void {
		const { data } = this;
		const votelength: number = buf.readUInt8();
		data.asset = { votes: [] };

		for (let index = 0; index < votelength; index++) {
			let vote: string = buf.readBuffer(34).toString("hex");
			vote = (vote[1] === "1" ? "+" : "-") + vote.slice(2);

			if (data.asset && data.asset.votes) {
				data.asset.votes.push(vote);
			}
		}
	}
}

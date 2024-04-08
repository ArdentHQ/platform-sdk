import { BigNumber, ByteBuffer } from "@ardenthq/sdk-helpers";

import { TransactionType, TransactionTypeGroup } from "../../enums.js";
import { ISerializeOptions } from "../../interfaces/index.js";
import * as schemas from "./schemas.js";
import { Transaction } from "./transaction.js";

export abstract class UsernameRegistrationTransaction extends Transaction {
	public static override typeGroup: number = TransactionTypeGroup.Core;
	public static override type: number = TransactionType.UsernameRegistration;
	public static override key = "usernameRegistration";

	protected static override defaultStaticFee: BigNumber = BigNumber.make("2500000000");

	public static override getSchema(): schemas.TransactionSchema {
		return schemas.usernameRegistration;
	}

	public serialize(options?: ISerializeOptions): ByteBuffer | undefined {
		const { data } = this;

		if (data.asset && data.asset.username) {
			const usernameBytes: Buffer = Buffer.from(data.asset.username, "utf8");
			const buf: ByteBuffer = new ByteBuffer(Buffer.alloc(usernameBytes.length + 1));

			buf.writeUInt8(usernameBytes.length);
			buf.writeBuffer(usernameBytes);

			return buf;
		}

		return undefined;
	}

	public deserialize(buf: ByteBuffer): void {
		const { data } = this;
		const usernameLength = buf.readUInt8();

		data.asset = {
			username: buf.readBuffer(usernameLength).toString("utf8"),
		};
	}
}

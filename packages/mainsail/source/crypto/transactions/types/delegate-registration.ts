import { BigNumber, ByteBuffer } from "@ardenthq/sdk-helpers";

import { TransactionType, TransactionTypeGroup } from "../../enums.js";
import { ISerializeOptions } from "../../interfaces/index.js";
import * as schemas from "./schemas.js";
import { Transaction } from "./transaction.js";

export abstract class DelegateRegistrationTransaction extends Transaction {
	public static override typeGroup: number = TransactionTypeGroup.Core;
	public static override type: number = TransactionType.DelegateRegistration;
	public static override key = "delegateRegistration";

	protected static override defaultStaticFee: BigNumber = BigNumber.make("2500000000");

	public static override getSchema(): schemas.TransactionSchema {
		return schemas.delegateRegistration;
	}

	public serialize(options?: ISerializeOptions): ByteBuffer | undefined {
		console.log("delegateRegistration - serialize");
		const { data } = this;

		if (data.asset) {
			console.log("delegateRegistration - serialize - data.asset", data.asset);
			const delegateBytes: Buffer = Buffer.from(data.asset.validatorPublicKey, "hex");
			const buf: ByteBuffer = new ByteBuffer(Buffer.alloc(delegateBytes.length));

			buf.writeBuffer(delegateBytes);

			return buf;
		}

		return undefined;
	}

	public deserialize(buf: ByteBuffer): void {
		const { data } = this;

		data.asset = {
			validatorPublicKey: buf.readBuffer(96).toString("hex"),
		};
	}
}

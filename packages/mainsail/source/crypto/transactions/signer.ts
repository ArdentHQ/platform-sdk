import { numberToHex } from "@ardenthq/sdk-helpers";

import { Hash } from "../hash.js";
import { IKeyPair, ISerializeOptions, ITransactionData } from "../interfaces/index.js";
import { Utils } from "./utils.js";
import { Utils as MainsailUtils } from "@mainsail/crypto-transaction";
import { getApp } from "../../transaction.service";
import { Contracts as MainsailContracts } from "@mainsail/contracts";

export class Signer {
	public static sign(transaction: ITransactionData, keys: IKeyPair, options?: ISerializeOptions): string {
		if (!options || (options.excludeSignature === undefined && options.excludeSecondSignature === undefined)) {
			options = { excludeSecondSignature: true, excludeSignature: true, ...options };
		}

		const hash: Buffer = Utils.toHash(transaction, options);
		const signature: string = Hash.signSchnorr(hash, keys);

		if (!transaction.signature && !options.excludeMultiSignature) {
			transaction.signature = signature;
		}

		return signature;
	}

	public static secondSign(transaction: ITransactionData, keys: IKeyPair): string {
		const hash: Buffer = Utils.toHash(transaction, { excludeSecondSignature: true });
		const signature: string = Hash.signSchnorr(hash, keys);

		if (!transaction.secondSignature) {
			transaction.secondSignature = signature;
		}

		return signature;
	}

	public static async multiSign(transaction: MainsailContracts.Crypto.TransactionData, keys: IKeyPair, index = -1): Promise<string> {
		if (!transaction.signatures) {
			transaction.signatures = [];
		}

		index = index === -1 ? transaction.signatures.length : index;

		const app = await getApp();

		const hash = await app.resolve(MainsailUtils).toHash(transaction, {
			excludeMultiSignature: true,
			excludeSignature: true,
		});

		// const hash2: Buffer = Utils.toHash(transaction, {
		// 	excludeMultiSignature: true,
		// 	excludeSecondSignature: true,
		// 	excludeSignature: true,
		// });

		console.log("multiSign hash", hash.toString("hex"));

		const signature: string = Hash.signSchnorr(hash, keys);
		const indexedSignature = `${numberToHex(index)}${signature}`;
		transaction.signatures.push(indexedSignature);

		return indexedSignature;
	}
}

import { Buffoon, Hash, secp256k1 } from "@ardenthq/sdk-cryptography";
import { DateTime } from "@ardenthq/sdk-intl";

const sortObject = (object) => {
	if (object === null) {
		return null;
	}

	if (typeof object !== "object") {
		return object;
	}

	if (Array.isArray(object)) {
		return object.map(sortObject);
	}

	const sortedKeys = Object.keys(object).sort();
	const result = {};
	for (const key of sortedKeys) {
		result[key] = sortObject(object[key]);
	}

	return result;
};

export const createSignedTransactionData = (stdSignMessage, keyPair) => {
	const privateKey: Buffer = Buffoon.fromHex(keyPair.privateKey);

	return {
		fee: stdSignMessage.fee,
		memo: stdSignMessage.memo,
		msg: stdSignMessage.msgs,
		signatures: [
			{
				account_number: stdSignMessage.account_number,
				pub_key: {
					type: "tendermint/PubKeySecp256k1",
					value: Buffoon.toBase64(secp256k1.publicKeyCreate(privateKey, false)),
				},
				sequence: stdSignMessage.sequence,
				signature: secp256k1
					.sign(Hash.sha256(JSON.stringify(sortObject(stdSignMessage))), privateKey)
					.toString("base64"),
			},
		],
		timestamp: DateTime.make(),
	};
};

import { BigNumber } from "@ardenthq/sdk-helpers";
import Ajv from "ajv";
import ajvKeywords from "ajv-keywords";

import { TransactionType } from "../enums.js";
import { ITransactionData } from "../interfaces/index.js";
import { configManager } from "../managers/index.js";

const maxBytes = (ajv: Ajv) => {
	ajv.addKeyword({
		keyword: "maxBytes",
		code(schema, parentSchema) {
			return (data) => {
				if ((parentSchema as any).type !== "string") {
					return false;
				}

				return Buffer.from(data, "utf8").byteLength <= data;
			};
		},
		errors: false,
		metaSchema: {
			minimum: 0,
			type: "integer",
		},
		type: "string",
	});
};

const transactionType = (ajv: Ajv) => {
	ajv.addKeyword({
		keyword: "transactionType",
		code(schema) {
			return (data, dataPath, parentObject: ITransactionData) => {
				// Impose dynamic multipayment limit based on milestone
				if (
					data === TransactionType.MultiPayment &&
					parentObject &&
					(!parentObject.typeGroup || parentObject.typeGroup === 1) &&
					parentObject.asset &&
					parentObject.asset.payments
				) {
					const limit: number = configManager.getMilestone().multiPaymentLimit || 256;
					return parentObject.asset.payments.length <= limit;
				}

				return data === schema;
			};
		},
		errors: false,
		metaSchema: {
			minimum: 0,
			type: "integer",
		},
	});
};

const network = (ajv: Ajv) => {
	ajv.addKeyword({
		keyword: "network",
		code(schema) {
			return (data) => schema && data === configManager.get("network.pubKeyHash");
		},
		errors: false,
		metaSchema: {
			type: "boolean",
		},
	});
};

const bignumber = (ajv: Ajv) => {
	// const instanceOf = ajvKeywords.get("instanceof").definition;
	// instanceOf.CONSTRUCTORS.BigNumber = BigNumber;

	ajv.addKeyword({
		keyword: "bignumber",
		code(schema, parentSchema) {
			return (data) => {
				// const minimum = typeof schema.minimum !== "undefined" ? schema.minimum : 0;
				// const maximum = typeof schema.maximum !== "undefined" ? schema.maximum : "9223372036854775807"; // 8 byte maximum
				//
				// if (data !== 0 && !data) {
				// 	return false;
				// }
				//
				// let bignum: BigNumber;
				// try {
				// 	bignum = BigNumber.make(data);
				// } catch {
				// 	return false;
				// }
				//
				// // if (parentObject && property) {
				// // 	parentObject[property] = bignum;
				// // }
				//
				// if (bignum.isLessThan(minimum) && !bignum.isZero()) {
				// 	return false;
				// }
				//
				// if (bignum.isGreaterThan(maximum)) {
				// 	return false;
				// }
				//
				return true;
			};
		},
		errors: false,
		// metaSchema: {
		// 	additionalItems: false,
		// 	properties: {
		// 		maximum: { type: "integer" },
		// 		minimum: { type: "integer" },
		// 	},
		// 	type: "object",
		// },
		modifying: true,
	});
};

export const keywords = [bignumber, maxBytes, network, transactionType];

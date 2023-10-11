import { TransactionSchema } from "../transactions/types/schemas.js";
import { BigNumber, isNil } from "@ardenthq/sdk-helpers";

import { ISchemaValidationResult, ITransaction } from "../interfaces/index.js";

import { maxVendorFieldLength } from "../utils.js";
import { transfer } from "./validators/source/transfer.js";
import { TransactionType } from "../enums.js";
import { ITransactionData } from "../interfaces/index.js";
import { configManager } from "../managers/config.js";

export class Validator {
	private readonly transactionSchemas: Map<string, TransactionSchema> = new Map<string, TransactionSchema>();

	private constructor(options: Record<string, any>) {}

	public static make(options: Record<string, any> = {}): Validator {
		return new Validator(options);
	}

	private validateVendorField(data?: string): boolean {
		if (isNil(data)) {
			return true;
		}

		try {
			return Buffer.from(data, "utf8").length <= maxVendorFieldLength();
		} catch {
			return false;
		}
	}

	private validateBignumber(schema: { minimum?: number; maximum?: number }, data?: BigNumber | number): boolean {
		const minimum = typeof schema.minimum !== "undefined" ? schema.minimum : 0;
		const maximum = typeof schema.maximum !== "undefined" ? schema.maximum : "9223372036854775807"; // 8 byte maximum

		if (data !== 0 && !data) {
			return false;
		}

		let bignum: BigNumber;
		try {
			bignum = BigNumber.make(data);
		} catch {
			return false;
		}

		// if (parentObject && property) {
		// 	parentObject[property] = bignum;
		// }

		if (bignum.isLessThan(minimum) && !bignum.isZero()) {
			return false;
		}

		if (bignum.isGreaterThan(maximum)) {
			return false;
		}

		return true;
	}

	private validateTransactionType(data?: ITransactionData): boolean {
		// Impose dynamic multipayment limit based on milestone
		if (
			data?.type === TransactionType.MultiPayment &&
			(!data.typeGroup || data.typeGroup === 1) &&
			data.asset &&
			data.asset.payments
		) {
			const limit: number = configManager.getMilestone().multiPaymentLimit || 256;
			return data.asset.payments.length <= limit;
		}

		// TODO: default check.
		// return data === schema;
		return true;
	}

	private validateNetwork(data?: ITransactionData): boolean {
		return data === configManager.get("network.pubKeyHash");
	}

	public validate<T = any>(
		schemaKeyReference: string | boolean | object,
		data: T,
		schema: TransactionSchema,
	): ISchemaValidationResult<T> {
		return this.validateSchema(schemaKeyReference, data, schema);
	}

	private validateSchema<T = any>(
		schemaKeyReference: string | boolean | object,
		data: T,
		schema: TransactionSchema,
	): ISchemaValidationResult<T> {
		try {
			let isValid = false;
			console.log({ data, schemaKeyReference, schema });

			if (schemaKeyReference === "transfer" || schemaKeyReference === "transferStrict") {
				isValid =
					transfer(data) &&
					this.validateVendorField(data.vendorField) &&
					this.validateBignumber(schema.properties.amount.bignumber, data.amount) &&
					this.validateBignumber(schema.properties.fee.bignumber, data.fee) &&
					this.validateBignumber(schema.properties.nonce.bignumber, data.nonce) &&
					this.validateNetwork(data.network);
			}

			console.log({ schemaKeyReference, isValid });

			// if (schemaKeyReference === "vote") {
			// 	isValid = validateVote(data);
			// }
			//
			// if (schemaKeyReference === "ipfs") {
			// 	isValid = validateIpfs(data);
			// }
			//
			// if (schemaKeyReference === "delegateResignation") {
			// 	isValid = validateDelegateResignation(data);
			// }
			//
			// if (schemaKeyReference === "delegateRegistration") {
			// 	isValid = validateDelegateRegistration(data);
			// }
			//
			// if (schemaKeyReference === "multiPayment") {
			// 	isValid = validateMultiPayment(data);
			// }
			//
			// if (schemaKeyReference === "multiSignature") {
			// 	isValid = validateMultisignature(data);
			// }
			//
			// if (schemaKeyReference === "multiSignatureLegacy") {
			// 	isValid = validateMultisignatureLegacy(data);
			// }
			//
			// if (schemaKeyReference === "secondSignature") {
			// 	isValid = validateSecondSignature(data);
			// }

			const error = !isValid ? `Validation failed for ${schemaKeyReference}.` : undefined;

			return { error, value: data };
		} catch (error) {
			return { error: error.stack, errors: [], value: undefined };
		}
	}
}

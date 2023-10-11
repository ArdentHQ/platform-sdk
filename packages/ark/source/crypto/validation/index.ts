import { TransactionSchema } from "../transactions/types/schemas.js";
import { BigNumber, isNil } from "@ardenthq/sdk-helpers";

import { ISchemaValidationResult } from "../interfaces/index.js";

import { transfer } from "./validators/source/transfer.js";

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
			return Buffer.from(data, "utf8").length <= 60;
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
					this.validateBignumber(schema.properties.nonce.bignumber, data.nonce);
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

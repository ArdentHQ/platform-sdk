import { TransactionSchema } from "../transactions/types/schemas.js";

import { ISchemaValidationResult } from "../interfaces/index.js";

import { transfer } from "./validators/source/transfer.js";

export class Validator {
	private readonly transactionSchemas: Map<string, TransactionSchema> = new Map<string, TransactionSchema>();

	private constructor(options: Record<string, any>) {}

	public static make(options: Record<string, any> = {}): Validator {
		return new Validator(options);
	}

	public validate<T = any>(schemaKeyReference: string | boolean | object, data: T): ISchemaValidationResult<T> {
		return this.validateSchema(schemaKeyReference, data);
	}

	private validateSchema<T = any>(
		schemaKeyReference: string | boolean | object,
		data: T,
	): ISchemaValidationResult<T> {
		try {
			let isValid = false;

			if (schemaKeyReference === "transfer" || schemaKeyReference === "transferStrict") {
				isValid = transfer(data);
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

			const error = !isValid ? "Validation failed." : undefined;

			return { error, value: data };
		} catch (error) {
			return { error: error.stack, errors: [], value: undefined };
		}
	}
}

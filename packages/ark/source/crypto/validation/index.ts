import { TransactionSchema, signedSchema, strictSchema } from "../transactions/types/schemas.js";

import { ISchemaValidationResult } from "../interfaces/index.js";
import validateIpfs from "./validators/source/ipfs.js";
import validateTransfer from "./validators/source/transfer.js";
import validateVote from "./validators/source/vote.js";

// import validateDelegateResignation from "./validators/source/delegateResignation.js";
// import validateDelegateRegistration from "./validators/source/delegateRegistration.js";
// import validateMultiPayment from "./validators/source/multiPayment.js";
// import validateMultisignature from "./validators/source/multiSignature.js";
// import validateMultisignatureLegacy from "./validators/source/multiSignatureLegacy.js";
// import validateSecondSignature from "./validators/source/secondSignature.js";

export class Validator {
	// private ajv: Ajv.Ajv;
	private readonly transactionSchemas: Map<string, TransactionSchema> = new Map<string, TransactionSchema>();

	private constructor(options: Record<string, any>) {}

	public static make(options: Record<string, any> = {}): Validator {
		return new Validator(options);
	}

	public validate<T = any>(schemaKeyReference: string | boolean | object, data: T): ISchemaValidationResult<T> {
		return this.validateSchema(schemaKeyReference, data);
	}

	private validateSchema<T = any>(
		// ajv: Ajv.Ajv,
		schemaKeyReference: string | boolean | object,
		data: T,
	): ISchemaValidationResult<T> {
		try {
			let isValid = false;

			if (schemaKeyReference === "transfer") {
				isValid = validateTransfer(data);
			}

			if (schemaKeyReference === "vote") {
				isValid = validateVote(data);
			}

			if (schemaKeyReference === "ipfs") {
				isValid = validateIpfs(data);
			}

			// // TODO: confirm schemaKey
			// if (schemaKeyReference === "delegateResignation") {
			// 	isValid = validateDelegateResignation(data);
			// }
			//
			// // TODO: confirm schemaKey
			// if (schemaKeyReference === "delegateRegistration") {
			// 	isValid = validateDelegateRegistration(data);
			// }
			//
			// // TODO: confirm schemaKey
			// if (schemaKeyReference === "multiPayment") {
			// 	isValid = validateMultiPayment(data);
			// }
			//
			// // TODO: confirm schemaKey
			// if (schemaKeyReference === "validateMultisignature") {
			// 	isValid = validateMultisignature(data);
			// }
			//
			// // TODO: confirm schemaKey
			// if (schemaKeyReference === "multiSignatureLegacy") {
			// 	isValid = validateMultisignatureLegacy(data);
			// }
			//
			// // TODO: confirm schemaKey
			// if (schemaKeyReference === "secondSignature") {
			// 	isValid = validateSecondSignature(data);
			// }

			const error = !isValid ? "Validation failed." : undefined;
			console.log({ isValid, error });

			return { error, value: data };
		} catch (error) {
			return { error: error.stack, errors: [], value: undefined };
		}
	}
}

export const validator = Validator.make();

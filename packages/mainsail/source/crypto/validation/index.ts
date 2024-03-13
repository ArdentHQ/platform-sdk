import Ajv from "ajv";
import ajvKeywords from "ajv-keywords";

import { ISchemaValidationResult } from "../interfaces/index.js";
import { signedSchema, strictSchema, TransactionSchema } from "../transactions/types/schemas.js";
import { formats } from "./formats.js";
import { keywords } from "./keywords.js";
import { schemas } from "./schemas.js";

export class Validator {
	private ajv: Ajv.Ajv;
	private readonly transactionSchemas: Map<string, TransactionSchema> = new Map<string, TransactionSchema>();

	private constructor(options: Record<string, any>) {
		this.ajv = this.instantiateAjv(options);
	}

	public static make(options: Record<string, any> = {}): Validator {
		return new Validator(options);
	}

	public getInstance(): Ajv.Ajv {
		return this.ajv;
	}

	public validate<T = any>(schemaKeyReference: string | boolean | object, data: T): ISchemaValidationResult<T> {
		return this.validateSchema(this.ajv, schemaKeyReference, data);
	}

	public validateException<T = any>(
		schemaKeyReference: string | boolean | object,
		data: T,
	): ISchemaValidationResult<T> {
		const ajv = this.instantiateAjv({ allErrors: true, verbose: true });

		for (const schema of this.transactionSchemas.values()) {
			this.extendTransactionSchema(ajv, schema);
		}

		return this.validateSchema(ajv, schemaKeyReference, data);
	}

	public addFormat(name: string, format: Ajv.FormatDefinition): void {
		this.ajv.addFormat(name, format);
	}

	public addKeyword(keyword: string, definition: Ajv.KeywordDefinition): void {
		this.ajv.addKeyword(keyword, definition);
	}

	public addSchema(schema: object | object[], key?: string): void {
		this.ajv.addSchema(schema, key);
	}

	public removeKeyword(keyword: string): void {
		this.ajv.removeKeyword(keyword);
	}

	public removeSchema(schemaKeyReference: string | boolean | object | RegExp): void {
		this.ajv.removeSchema(schemaKeyReference);
	}

	public extendTransaction(schema: TransactionSchema, remove?: boolean) {
		this.extendTransactionSchema(this.ajv, schema, remove);
	}

	private validateSchema<T = any>(
		ajv: Ajv.Ajv,
		schemaKeyReference: string | boolean | object,
		data: T,
	): ISchemaValidationResult<T> {
		try {
			ajv.validate(schemaKeyReference, data);

			const error = ajv.errors ? ajv.errorsText() : undefined;

			return { error, errors: ajv.errors || undefined, value: data };
		} catch (error) {
			return { error: error.stack, errors: [], value: undefined };
		}
	}

	private instantiateAjv(options: Record<string, any>) {
		const ajv = new Ajv({
			$data: true,
			extendRefs: true,
			removeAdditional: true,
			schemas,
			...options,
		});
		ajvKeywords(ajv);

		for (const addKeyword of keywords) {
			addKeyword(ajv);
		}

		for (const addFormat of formats) {
			addFormat(ajv);
		}

		return ajv;
	}

	private extendTransactionSchema(ajv: Ajv.Ajv, schema: TransactionSchema, remove?: boolean) {
		if (ajv.getSchema(schema.$id)) {
			remove = true;
		}

		if (remove) {
			this.transactionSchemas.delete(schema.$id);

			ajv.removeSchema(schema.$id);
			ajv.removeSchema(`${schema.$id}Signed`);
			ajv.removeSchema(`${schema.$id}Strict`);
		}

		this.transactionSchemas.set(schema.$id, schema);

		ajv.addSchema(schema);
		ajv.addSchema(signedSchema(schema));
		ajv.addSchema(strictSchema(schema));

		this.updateTransactionArray(ajv);
	}

	private updateTransactionArray(ajv: Ajv.Ajv) {
		ajv.removeSchema("transactions");
		ajv.addSchema({
			$id: "transactions",
			additionalItems: false,
			items: { anyOf: [...this.transactionSchemas.keys()].map((schema) => ({ $ref: `${schema}Signed` })) },
			type: "array",
		});
	}
}

export const validator = Validator.make();

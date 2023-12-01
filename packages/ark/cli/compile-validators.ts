import fs from "fs";
import Ajv, { _ } from "ajv";
import standaloneCode from "ajv/dist/standalone";
import ajvKeywords from "ajv-keywords";
import addFormats from "ajv-formats";

import ts from "typescript";
import { cjsToEsm } from "cjstoesm";
import tsConfig from "../../../tsconfig.json";

import * as transactionSchemas from "../source/crypto/transactions/types/schemas.js";

export const schemas = [
	{
		$id: "hex",
		type: "string",
		pattern: "^[0123456789A-Fa-f]+$",
	},

	{
		$id: "base58",
		type: "string",
		pattern: "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$",
	},

	{
		$id: "networkByte",
		network: true,
	},

	{
		$id: "address",
		type: "string",
		allOf: [{ minLength: 34, maxLength: 34 }, { $ref: "base58" }],
	},

	{
		$id: "publicKey",
		type: "string",
		allOf: [{ minLength: 66, maxLength: 66 }, { $ref: "hex" }],
	},

	{
		$id: "delegateUsername",
		type: "string",
		allOf: [
			{ type: "string", pattern: "^[a-z0-9!@$&_.]+$" },
			{ minLength: 1, maxLength: 20 },
		],
	},

	{
		$id: "genericName",
		type: "string",
		allOf: [
			{ type: "string", pattern: "^[a-zA-Z0-9]+(( - |[ ._-])[a-zA-Z0-9]+)*[.]?$" },
			{ minLength: 1, maxLength: 40 },
		],
	},

	{
		$id: "uri",
		type: "string",
		allOf: [{ format: "uri" }, { minLength: 4, maxLength: 80 }],
	},
];

const addKeywords = (ajv: Ajv) => {
	ajvKeywords(ajv);

	ajv.addKeyword({
		keyword: "transactionType",
		errors: false,
		metaSchema: {
			minimum: 0,
			type: "integer",
		},
	});

	ajv.addKeyword({
		keyword: "network",
		errors: false,
		metaSchema: {
			type: "boolean",
		},
	});

	ajv.addKeyword({
		keyword: "bignumber",
		errors: false,
		metaSchema: {
			properties: {
				maximum: { type: "integer" },
				minimum: { type: "integer" },
			},
			type: "object",
		},
		modifying: true,
	});
};

const compileStandaloneCode = (schemaKey: string) => {
	const schema = transactionSchemas[schemaKey];

	const ajv = new Ajv({
		schemas: [schemas, schema, transactionSchemas.strictSchema(schema), transactionSchemas.signedSchema(schema)],
		code: {
			source: true,
			esm: false,
		},
		$data: true,
		allErrors: true,
		verbose: true,
	});

	addFormats(ajv);
	addKeywords(ajv);

	const moduleCode = standaloneCode(ajv);

	const result = ts.transpileModule(moduleCode, {
		transformers: cjsToEsm({
			preserveModuleSpecifiers: "internal",
		}),
		compilerOptions: {
			...tsConfig.compilerOptions,
			module: ts.ModuleKind.ESNext,
		},
	});

	const notice = `/**
 * IMPORTANT: This file is generated using "pnpm build:validators" CLI command and any manual changes should be avoided, they will be overriden when generating standalone validators.
 *
 * For any changes in schemas or custom validators, see the referenced schemas in packages/ark/cli/compile-validators.ts and adjust them accordingly.
 * After schema update, run "pnpm build:validators" to gererate new standalone validator code.
 *
 * Custom validation functions are defined in /packages/ark/source/crypto/validation/index.ts
 *
 */
//@ts-nocheck
	`;

	fs.writeFileSync(
		`${process.cwd()}/source/crypto/validation/validators/source/${schemaKey}.ts`,
		`${notice}\n${result.outputText.replace(/\.\/node_modules\//g, "")}`,
	);
};

const availableSchemas = [
	"transfer",
	"secondSignature",
	"delegateResignation",
	"delegateRegistration",
	"vote",
	"ipfs",
	"multiPayment",
	"multiSignature",
	"multiSignatureLegacy",
];

for (const transactionSchema of availableSchemas) {
	compileStandaloneCode(transactionSchema);
}

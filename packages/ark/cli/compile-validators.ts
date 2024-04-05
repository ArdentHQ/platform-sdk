import fs from "fs";
import Ajv, { _ } from "ajv";
import standaloneCode from "ajv/dist/standalone";
import ajvKeywords from "ajv-keywords";
import addFormats from "ajv-formats";

import * as transactionSchemas from "../source/crypto/transactions/types/schemas.js";

export const schemas = [
	{
		$id: "networkByte",
		network: true,
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
			esm: true,
		},
		$data: true,
		allErrors: true,
		verbose: true,
	});

	addFormats(ajv);
	addKeywords(ajv);

	const moduleCode = standaloneCode(ajv);

	if (new RegExp(/require\(/).test(moduleCode)) {
		throw new Error(
			`Standalone code for ${schemaKey} uses "require" in an esm code. \n       This is a known issue https://github.com/ajv-validator/ajv/issues/2209. \n       Remove any third-party dependencies and move the related validations in code.\n\n`,
		);
	}

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
		`${notice}\n${moduleCode}`,
	);
};

const availableSchemas = [
	"transfer",
	"secondSignature",
	"delegateResignation",
	"delegateRegistration",
	"usernameRegistration",
	"vote",
	"ipfs",
	"multiPayment",
	"multiSignature",
	"multiSignatureLegacy",
];

for (const transactionSchema of availableSchemas) {
	compileStandaloneCode(transactionSchema);
}

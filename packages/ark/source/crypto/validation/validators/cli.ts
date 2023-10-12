import fs from "fs";
import Ajv, { _ } from "ajv";
import standaloneCode from "ajv/dist/standalone";
import ajvKeywords from "ajv-keywords";

import addFormats from "ajv-formats";

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
		$id: "alphanumeric",
		type: "string",
		pattern: "^[a-zA-Z0-9]+$",
	},

	{
		$id: "transactionId",
		type: "string",
		allOf: [{ minLength: 64, maxLength: 64 }, { $ref: "hex" }],
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
		allOf: [{ minLength: 66, maxLength: 66 }, { $ref: "hex" }, { transform: ["toLowerCase"] }],
	},

	{
		$id: "walletVote",
		allOf: [{ type: "string", pattern: "^[+|-][a-zA-Z0-9]{66}$" }, { transform: ["toLowerCase"] }],
	},

	{
		$id: "delegateUsername",
		type: "string",
		allOf: [
			{ type: "string", pattern: "^[a-z0-9!@$&_.]+$" },
			{ minLength: 1, maxLength: 20 },
			{ transform: ["toLowerCase"] },
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

import {
	transfer,
	secondSignature,
	delegateResignation,
	delegateRegistration,
	vote,
	ipfs,
	multiPayment,
	multiSignature,
	multiSignatureLegacy,
	strictSchema,
	signedSchema,
} from "../../transactions/types/schemas.js";

const ajv = new Ajv({
	schemas: [schemas, transfer, strictSchema(transfer), signedSchema(transfer)],
	code: {
		source: true,
		esm: true,
	},
	$data: true,
	allErrors: true,
	verbose: true,
});

addFormats(ajv);
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

const moduleCode = standaloneCode(ajv);
fs.writeFileSync(`./source/transfer.js`, moduleCode);

// const ajv = Validator.make({
// 	sourceCode: true,
// }).getInstance();
//
// const compileTransfer = ajv.compile(transfer);
// fs.writeFileSync(`./source/transfer.js`, pack(ajv, compileTransfer));
//
// const compileSecondSignature = ajv.compile(secondSignature);
// fs.writeFileSync(`./source/secondSignature.js`, pack(ajv, compileSecondSignature));
//
// const compileDelegateRegistration = ajv.compile(delegateRegistration);
// fs.writeFileSync(`./source/delegateRegistration.js`, pack(ajv, compileDelegateRegistration));
//
// const compileDelegateResignation = ajv.compile(delegateResignation);
// fs.writeFileSync(`./source/delegateResignation.js`, pack(ajv, compileDelegateResignation));
//
// const compileVote = ajv.compile(vote);
// fs.writeFileSync(`./source/vote.js`, pack(ajv, compileVote));
//
// const compileIpfs = ajv.compile(ipfs);
// fs.writeFileSync(`./source/ipfs.js`, pack(ajv, compileIpfs));
//
// const compileMultipayment = ajv.compile(multiPayment);
// fs.writeFileSync(`./source/multiPayment.js`, pack(ajv, compileMultipayment));
//
// const compileMultisignature = ajv.compile(multiSignature);
// fs.writeFileSync(`./source/multiSignature.js`, pack(ajv, compileMultisignature));
//
// const compileMultiSignatureLegacy = ajv.compile(multiSignatureLegacy);
// fs.writeFileSync(`./source/multiSignatureLegacy.js`, pack(ajv, compileMultiSignatureLegacy));

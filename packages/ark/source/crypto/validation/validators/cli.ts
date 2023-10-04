import fs from "fs";
import { Validator } from "../index.js";
import Ajv, { Code, KeywordCxt, nil, _ } from "ajv";
import standaloneCode from "ajv/dist/standalone";
import ajvKeywords from "ajv-keywords";

import { formats } from "../formats.js";
import { keywords } from "../keywords.js";
import { schemas, schemasArray } from "../schemas.js";
import addFormats from "ajv-formats";

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
} from "../../transactions/types/schemas.js";

const ajv = new Ajv({
	schemas: [schemasArray, transfer],
	code: {
		source: true,
		esm: true,
		formats: _`require("../formats")`,
	},
	$data: true,
	allErrors: true,
	verbose: true,
});

addFormats(ajv);
ajvKeywords(ajv);

for (const addKeyword of keywords) {
	addKeyword(ajv);
}

for (const addFormat of formats) {
	addFormat(ajv);
}

let moduleCode = standaloneCode(ajv);

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

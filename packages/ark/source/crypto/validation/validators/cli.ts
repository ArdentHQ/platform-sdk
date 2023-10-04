import fs from "fs";
import { Validator } from "../index.js";
import pack from "ajv-pack";
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

const ajv = Validator.make({
	sourceCode: true,
}).getInstance();

const compileTransfer = ajv.compile(transfer);
fs.writeFileSync(`./source/transfer.js`, pack(ajv, compileTransfer));

const compileSecondSignature = ajv.compile(secondSignature);
fs.writeFileSync(`./source/secondSignature.js`, pack(ajv, compileSecondSignature));

const compileDelegateRegistration = ajv.compile(delegateRegistration);
fs.writeFileSync(`./source/delegateRegistration.js`, pack(ajv, compileDelegateRegistration));

const compileDelegateResignation = ajv.compile(delegateResignation);
fs.writeFileSync(`./source/delegateResignation.js`, pack(ajv, compileDelegateResignation));

const compileVote = ajv.compile(vote);
fs.writeFileSync(`./source/vote.js`, pack(ajv, compileVote));

const compileIpfs = ajv.compile(ipfs);
fs.writeFileSync(`./source/ipfs.js`, pack(ajv, compileIpfs));

const compileMultipayment = ajv.compile(multiPayment);
fs.writeFileSync(`./source/multiPayment.js`, pack(ajv, compileMultipayment));

const compileMultisignature = ajv.compile(multiSignature);
fs.writeFileSync(`./source/multiSignature.js`, pack(ajv, compileMultisignature));

const compileMultiSignatureLegacy = ajv.compile(multiSignatureLegacy);
fs.writeFileSync(`./source/multiSignatureLegacy.js`, pack(ajv, compileMultiSignatureLegacy));

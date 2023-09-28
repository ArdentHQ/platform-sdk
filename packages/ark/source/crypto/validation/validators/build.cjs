const fs = require("fs");
const path = require("path");
const Ajv = require("ajv"); // version >= 4.7.4
const pack = require("ajv-pack");
const schemas = require("../schemas.json");
const txSchemas = require("./tx-schemas.cjs");
const keywords = require("./keywords.cjs");

const ajv = new Ajv({
	$data: true,
	sourceCode: true,
	schemas,
	allErrors: true,
});

// Additional formats.
ajv.addFormat("vendorField", (data) => {
	try {
		// TODO: remove hardcoded value for max vendorfield length and use `maxVendorFieldLength`.
		// @see ./packages/ark/source/crypto/validation/formats.ts
		return Buffer.from(data, "utf8").length <= 60;
	} catch {
		return false;
	}
});

// TODO: add keywords.
ajv.addKeyword(keywords.maxBytes(ajv));

const transactionTypes = [
	"transfer",
	"secondSignature",
	"delegateRegistration",
	"vote",
	"ipfs",
	"multiPayment",
	"delegateResignation",
	"multiSignature",
	"multiSignatureLegacy",
];

// Compile to esm.
for (const type of transactionTypes) {
	console.log(`\nCompiling ${type}...`);

	const compile = ajv.compile(txSchemas[type]);
	const code = pack(ajv, compile);

	console.log(`Finished compiling ${type}. \n`);

	fs.writeFileSync(path.join(__dirname, `./source/${type}.js`), code);
}

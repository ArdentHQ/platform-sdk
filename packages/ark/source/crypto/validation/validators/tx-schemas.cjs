// TODO: Merge with ./packages/ark/source/crypto/transactions/types/schemas.ts
const deepmerge = require("deepmerge");

const TransactionType = {
	Transfer: 0,
	SecondSignature: 1,
	DelegateRegistration: 2,
	Vote: 3,
	MultiSignature: 4,
	Ipfs: 5,
	MultiPayment: 6,
	DelegateResignation: 7,
	HtlcLock: 8,
	HtlcClaim: 9,
	HtlcRefund: 10,
};

const signedTransaction = {
	anyOf: [
		{ required: ["id", "signature"] },
		{ required: ["id", "signature", "signatures"] },
		{ required: ["id", "signatures"] },
	],
};

const strictTransaction = {
	additionalProperties: false,
};

const transactionBaseSchema = {
	$id: undefined,
	else: { required: ["type", "senderPublicKey", "fee", "amount", "nonce"] },
	if: { properties: { version: { anyOf: [{ type: "null" }, { const: 1 }] } } },
	properties: {
		amount: { bignumber: { minimum: 1 } },
		fee: { bignumber: { minimum: 0 } },
		id: { anyOf: [{ $ref: "transactionId" }, { type: "null" }] },
		network: { $ref: "networkByte" },
		nonce: { bignumber: { minimum: 0 } },
		secondSignature: { $ref: "alphanumeric" },
		senderPublicKey: { $ref: "publicKey" },
		signSignature: { $ref: "alphanumeric" },
		signature: { $ref: "alphanumeric" },
		version: { enum: [1, 2] },
		signatures: {
			additionalItems: false,
			items: { allOf: [{ maxLength: 130, minLength: 130 }, { $ref: "alphanumeric" }] },
			maxItems: 16,
			minItems: 1,
			type: "array",
			uniqueItems: true,
		},
		timestamp: { type: "integer", minimum: 0 },
		typeGroup: { minimum: 0, type: "integer" },
	},
	then: { required: ["type", "senderPublicKey", "fee", "amount", "timestamp"] },
	type: "object",
};

const extend = (parent, properties) => deepmerge(parent, properties);

const signedSchema = (schema) => {
	const signed = extend(schema, signedTransaction);
	signed.$id = `${schema.$id}Signed`;
	return signed;
};

const strictSchema = (schema) => {
	const signed = signedSchema(schema);
	const strict = extend(signed, strictTransaction);
	strict.$id = `${schema.$id}Strict`;
	return strict;
};

const transfer = extend(transactionBaseSchema, {
	$id: "transfer",
	properties: {
		expiration: { minimum: 0, type: "integer" },
		fee: { bignumber: { minimum: 1 } },
		recipientId: { $ref: "address" },
		type: { transactionType: TransactionType.Transfer },
		vendorField: { anyOf: [{ type: "null" }, { format: "vendorField", type: "string" }] },
	},
	required: ["recipientId"],
});

const secondSignature = extend(transactionBaseSchema, {
	$id: "secondSignature",
	properties: {
		amount: { bignumber: { maximum: 0, minimum: 0 } },
		asset: {
			properties: {
				signature: {
					properties: {
						publicKey: {
							$ref: "publicKey",
						},
					},
					required: ["publicKey"],
					type: "object",
				},
			},
			required: ["signature"],
			type: "object",
		},
		fee: { bignumber: { minimum: 1 } },
		secondSignature: { type: "null" },
		type: { transactionType: TransactionType.SecondSignature },
	},
	required: ["asset"],
});

const delegateRegistration = extend(transactionBaseSchema, {
	$id: "delegateRegistration",
	properties: {
		amount: { bignumber: { maximum: 0, minimum: 0 } },
		asset: {
			properties: {
				delegate: {
					properties: {
						username: { $ref: "delegateUsername" },
					},
					required: ["username"],
					type: "object",
				},
			},
			required: ["delegate"],
			type: "object",
		},
		fee: { bignumber: { minimum: 1 } },
		type: { transactionType: TransactionType.DelegateRegistration },
	},
	required: ["asset"],
});

const vote = extend(transactionBaseSchema, {
	$id: "vote",
	properties: {
		amount: { bignumber: { maximum: 0, minimum: 0 } },
		asset: {
			properties: {
				votes: {
					additionalItems: false,
					items: { $ref: "walletVote" },
					minItems: 1,
					maxItems: 2,
					type: "array",
				},
			},
			required: ["votes"],
			type: "object",
		},
		fee: { bignumber: { minimum: 1 } },
		recipientId: { $ref: "address" },
		type: { transactionType: TransactionType.Vote },
	},
	required: ["asset"],
});

const multiSignature = extend(transactionBaseSchema, {
	$id: "multiSignature",
	properties: {
		amount: { bignumber: { maximum: 0, minimum: 0 } },
		asset: {
			properties: {
				multiSignature: {
					properties: {
						min: {
							maximum: { $data: "1/publicKeys/length" },
							minimum: 1,
							type: "integer",
						},
						publicKeys: {
							additionalItems: false,
							minItems: 1,
							items: { $ref: "publicKey" },
							type: "array",
							maxItems: 16,
							uniqueItems: true,
						},
					},
					required: ["min", "publicKeys"],
					type: "object",
				},
			},
			required: ["multiSignature"],
			type: "object",
		},
		fee: { bignumber: { minimum: 1 } },
		signatures: {
			additionalItems: false,
			items: { allOf: [{ maxLength: 130, minLength: 130 }, { $ref: "alphanumeric" }] },
			maxItems: { $data: "1/asset/multiSignature/publicKeys/length" },
			minItems: { $data: "1/asset/multiSignature/min" },
			type: "array",
			uniqueItems: true,
		},
		type: { transactionType: TransactionType.MultiSignature },
	},
	required: ["asset", "signatures"],
});

// Multisignature legacy transactions have a different signatures property.
// Then we delete the "signatures" property definition to implement our own.
const transactionBaseSchemaNoSignatures = extend(transactionBaseSchema, {});
delete transactionBaseSchemaNoSignatures.properties.signatures;
const multiSignatureLegacy = extend(transactionBaseSchemaNoSignatures, {
	$id: "multiSignatureLegacy",
	properties: {
		amount: { bignumber: { maximum: 0, minimum: 0 } },
		asset: {
			properties: {
				multiSignatureLegacy: {
					properties: {
						lifetime: {
							minimum: 1,
							type: "integer",
							maximum: 72,
						},
						keysgroup: {
							minItems: 1,
							type: "array",
							additionalItems: false,
							maxItems: 16,
							items: {
								allOf: [{ minimum: 67, type: "string", maximum: 67, transform: ["toLowerCase"] }],
							},
						},
						min: {
							type: "integer",
							minimum: 1,
							maximum: { $data: "1/keysgroup/length" },
						},
					},
					required: ["keysgroup", "min", "lifetime"],
					type: "object",
				},
			},
			required: ["multiSignatureLegacy"],
			type: "object",
		},
		fee: { bignumber: { minimum: 1 } },
		signatures: {
			additionalItems: false,
			items: { $ref: "alphanumeric" },
			maxItems: 1,
			minItems: 1,
			type: "array",
		},
		type: { transactionType: TransactionType.MultiSignature },
		version: { anyOf: [{ type: "null" }, { const: 1 }] },
	},
	required: ["asset"],
});

const ipfs = extend(transactionBaseSchema, {
	$id: "ipfs",
	properties: {
		amount: { bignumber: { maximum: 0, minimum: 0 } },
		asset: {
			properties: {
				ipfs: {
					allOf: [{ maxLength: 90, minLength: 2 }, { $ref: "base58" }],
					// ipfs hash has varying length but we set max limit to twice the length of base58 ipfs sha-256 hash
				},
			},
			required: ["ipfs"],
			type: "object",
		},
		fee: { bignumber: { minimum: 1 } },
		type: { transactionType: TransactionType.Ipfs },
	},
});

const multiPayment = extend(transactionBaseSchema, {
	$id: "multiPayment",
	properties: {
		amount: { bignumber: { maximum: 0, minimum: 0 } },
		asset: {
			properties: {
				payments: {
					additionalItems: false,
					items: {
						required: ["amount", "recipientId"],
						properties: {
							amount: { bignumber: { minimum: 1 } },
							recipientId: { $ref: "address" },
						},
						type: "object",
					},
					minItems: 2,
					type: "array",
					uniqueItems: false,
				},
			},
			required: ["payments"],
			type: "object",
		},
		fee: { bignumber: { minimum: 1 } },
		type: { transactionType: TransactionType.MultiPayment },
		vendorField: { anyOf: [{ type: "null" }, { format: "vendorField", type: "string" }] },
	},
});

const delegateResignation = extend(transactionBaseSchema, {
	$id: "delegateResignation",
	properties: {
		amount: { bignumber: { maximum: 0, minimum: 0 } },
		fee: { bignumber: { minimum: 1 } },
		type: { transactionType: TransactionType.DelegateResignation },
	},
});

module.exports = {
	signedSchema,
	strictSchema,
	transactionBaseSchema,
	transfer,
	secondSignature,
	delegateRegistration,
	vote,
	multiSignature,
	multiSignatureLegacy,
	ipfs,
	multiPayment,
	delegateResignation,
	TransactionType,
};

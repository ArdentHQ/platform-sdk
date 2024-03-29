import deepmerge from "deepmerge";

import { TransactionType } from "../../enums.js";

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

export const transactionBaseSchema: Record<string, any> = {
	$id: undefined,
	else: { required: ["type", "senderPublicKey", "fee", "amount", "nonce"] },
	if: { properties: { version: { anyOf: [{ type: "null" }, { const: 1 }] } } },
	properties: {
		amount: { bignumber: { minimum: 1 } },
		fee: { bignumber: { minimum: 0 } },
		id: { type: "string" },
		network: { $ref: "networkByte" },
		nonce: { bignumber: { minimum: 0 } },
		secondSignature: { type: "string" },
		senderPublicKey: { type: "string" },
		signSignature: { type: "string" },
		signature: { type: "string" },
		version: { enum: [1, 2] },
		signatures: {
			items: { type: "string" },
			maxItems: 16,
			minItems: 1,
			type: "array",
		},
		timestamp: { type: "integer", minimum: 0 },
		typeGroup: { minimum: 0, type: "integer" },
	},
	then: { required: ["type", "senderPublicKey", "fee", "amount", "timestamp"] },
	type: "object",
};

export const extend = (parent, properties): TransactionSchema => deepmerge(parent, properties);

export const signedSchema = (schema: TransactionSchema): TransactionSchema => {
	const signed = extend(schema, signedTransaction);
	signed.$id = `${schema.$id}Signed`;
	return signed;
};

export const strictSchema = (schema: TransactionSchema): TransactionSchema => {
	const signed = signedSchema(schema);
	const strict = extend(signed, strictTransaction);
	strict.$id = `${schema.$id}Strict`;
	return strict;
};

export const transfer = extend(transactionBaseSchema, {
	$id: "transfer",
	properties: {
		expiration: { minimum: 0, type: "integer" },
		fee: { bignumber: { minimum: 1 } },
		recipientId: { type: "string" },
		type: { transactionType: TransactionType.Transfer },
		vendorField: { anyOf: [{ type: "null" }, { type: "string" }] },
	},
	required: ["recipientId"],
});

export const secondSignature = extend(transactionBaseSchema, {
	$id: "secondSignature",
	properties: {
		amount: { bignumber: { maximum: 0, minimum: 0 } },
		asset: {
			properties: {
				signature: {
					properties: {
						publicKey: {
							type: "string",
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

export const delegateRegistration = extend(transactionBaseSchema, {
	$id: "delegateRegistration",
	properties: {
		amount: { bignumber: { maximum: 0, minimum: 0 } },
		asset: {
			properties: {
				delegate: {
					properties: {
						username: { type: "string" },
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

export const vote = extend(transactionBaseSchema, {
	$id: "vote",
	properties: {
		amount: { bignumber: { maximum: 0, minimum: 0 } },
		asset: {
			properties: {
				votes: {
					minItems: 1,
					maxItems: 2,
					type: "array",
				},
			},
			required: ["votes"],
			type: "object",
		},
		fee: { bignumber: { minimum: 1 } },
		recipientId: { type: "string" },
		type: { transactionType: TransactionType.Vote },
	},
	required: ["asset"],
});

export const multiSignature = extend(transactionBaseSchema, {
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
							items: { type: "string" },
							type: "array",
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
			items: { type: "string" },
			maxItems: { $data: "1/asset/multiSignature/publicKeys/length" },
			minItems: { $data: "1/asset/multiSignature/min" },
			type: "array",
		},
		type: { transactionType: TransactionType.MultiSignature },
	},
	required: ["asset", "signatures"],
});

// Multisignature legacy transactions have a different signatures property.
// Then we delete the "signatures" property definition to implement our own.
const transactionBaseSchemaNoSignatures = extend(transactionBaseSchema, {});
delete transactionBaseSchemaNoSignatures.properties.signatures;
export const multiSignatureLegacy = extend(transactionBaseSchemaNoSignatures, {
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
							maxItems: 16,
							items: {
								allOf: [{ minimum: 67, type: "string", maximum: 67 }],
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
			items: { type: "string" },
			maxItems: 1,
			minItems: 1,
			type: "array",
		},
		type: { transactionType: TransactionType.MultiSignature },
		version: { anyOf: [{ type: "null" }, { const: 1 }] },
	},
	required: ["asset"],
});

export const ipfs = extend(transactionBaseSchema, {
	$id: "ipfs",
	properties: {
		amount: { bignumber: { maximum: 0, minimum: 0 } },
		asset: {
			properties: {
				ipfs: { type: "string" },
			},
			required: ["ipfs"],
			type: "object",
		},
		fee: { bignumber: { minimum: 1 } },
		type: { transactionType: TransactionType.Ipfs },
	},
});

export const multiPayment = extend(transactionBaseSchema, {
	$id: "multiPayment",
	properties: {
		amount: { bignumber: { maximum: 0, minimum: 0 } },
		asset: {
			properties: {
				payments: {
					items: {
						required: ["amount", "recipientId"],
						properties: {
							amount: { bignumber: { minimum: 1 } },
							recipientId: { type: "string" },
						},
						type: "object",
					},
					minItems: 2,
					type: "array",
				},
			},
			required: ["payments"],
			type: "object",
		},
		fee: { bignumber: { minimum: 1 } },
		type: { transactionType: TransactionType.MultiPayment },
		vendorField: { anyOf: [{ type: "null" }, { type: "string" }] },
	},
});

export const delegateResignation = extend(transactionBaseSchema, {
	$id: "delegateResignation",
	properties: {
		amount: { bignumber: { maximum: 0, minimum: 0 } },
		fee: { bignumber: { minimum: 1 } },
		type: { transactionType: TransactionType.DelegateResignation },
	},
});

export type TransactionSchema = typeof transactionBaseSchema;

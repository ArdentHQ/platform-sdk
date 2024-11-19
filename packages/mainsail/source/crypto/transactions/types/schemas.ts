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
		id: { anyOf: [{ $ref: "transactionId" }, { type: "null" }] },
		network: { $ref: "networkByte" },
		nonce: { bignumber: { minimum: 0 } },
		senderPublicKey: { $ref: "publicKey" },
		signSignature: { $ref: "alphanumeric" },
		signature: { $ref: "alphanumeric" },
		signatures: {
			additionalItems: false,
			items: { allOf: [{ maxLength: 130, minLength: 130 }, { $ref: "alphanumeric" }] },
			maxItems: 16,
			minItems: 1,
			type: "array",
			uniqueItems: true,
		},
		timestamp: { minimum: 0, type: "integer" },
		typeGroup: { minimum: 0, type: "integer" },
		version: { enum: [1, 2] },
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
		recipientId: { $ref: "address" },
		type: { transactionType: TransactionType.Transfer },
		vendorField: { anyOf: [{ type: "null" }, { format: "vendorField", type: "string" }] },
	},
	required: ["recipientId"],
});

export const delegateRegistration = extend(transactionBaseSchema, {
	$id: "delegateRegistration",
	properties: {
		amount: { bignumber: { maximum: 0, minimum: 0 } },
		asset: {
			properties: {
				validatorPublicKey: { $ref: "consensusPublicKey" },
			},
			required: ["validatorPublicKey"],
			type: "object",
		},
		fee: { bignumber: { minimum: 1 } },
		type: { transactionType: TransactionType.DelegateRegistration },
	},
	required: ["asset"],
});

export const usernameRegistration = extend(transactionBaseSchema, {
	$id: "usernameRegistration",
	properties: {
		amount: { bignumber: { maximum: 0, minimum: 0 } },
		asset: {
			properties: {
				username: {
					$ref: "usernameRegistration",
				},
			},
			required: ["username"],
			type: "object",
		},
		fee: { bignumber: { minimum: 1 } },
		type: { transactionType: TransactionType.UsernameRegistration },
	},
	required: ["asset"],
});

export const usernameResignation = extend(transactionBaseSchema, {
	$id: "usernameResignation",
	properties: {
		amount: { bignumber: { maximum: 0, minimum: 0 } },
		fee: { bignumber: { minimum: 1 } },
		type: { transactionType: TransactionType.UsernameResignation },
	},
});

export const vote = extend(transactionBaseSchema, {
	$id: "vote",
	properties: {
		amount: { bignumber: { maximum: 0, minimum: 0 } },
		asset: {
			properties: {
				votes: {
					additionalItems: false,
					items: { $ref: "walletVote" },
					maxItems: 2,
					minItems: 1,
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
							additionalItems: false,
							items: { $ref: "publicKey" },
							maxItems: 16,
							minItems: 1,
							type: "array",
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
export const multiSignatureLegacy = extend(transactionBaseSchemaNoSignatures, {
	$id: "multiSignatureLegacy",
	properties: {
		amount: { bignumber: { maximum: 0, minimum: 0 } },
		asset: {
			properties: {
				multiSignatureLegacy: {
					properties: {
						keysgroup: {
							additionalItems: false,
							items: {
								allOf: [{ maximum: 67, minimum: 67, transform: ["toLowerCase"], type: "string" }],
							},
							maxItems: 16,
							minItems: 1,
							type: "array",
						},
						lifetime: {
							maximum: 72,
							minimum: 1,
							type: "integer",
						},
						min: {
							maximum: { $data: "1/keysgroup/length" },
							minimum: 1,
							type: "integer",
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

export const multiPayment = extend(transactionBaseSchema, {
	$id: "multiPayment",
	properties: {
		amount: { bignumber: { maximum: 0, minimum: 0 } },
		asset: {
			properties: {
				payments: {
					additionalItems: false,
					items: {
						properties: {
							amount: { bignumber: { minimum: 1 } },
							recipientId: { $ref: "address" },
						},
						required: ["amount", "recipientId"],
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

export const delegateResignation = extend(transactionBaseSchema, {
	$id: "delegateResignation",
	properties: {
		amount: { bignumber: { maximum: 0, minimum: 0 } },
		fee: { bignumber: { minimum: 1 } },
		type: { transactionType: TransactionType.DelegateResignation },
	},
});

export type TransactionSchema = typeof transactionBaseSchema;

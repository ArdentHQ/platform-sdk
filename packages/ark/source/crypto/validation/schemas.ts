export const schemas = {
	hex: {
		$id: "hex",
		type: "string",
		pattern: "^[0123456789A-Fa-f]+$",
	},

	base58: {
		$id: "base58",
		type: "string",
		pattern: "^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$",
	},

	alphanumeric: {
		$id: "alphanumeric",
		type: "string",
		pattern: "^[a-zA-Z0-9]+$",
	},

	transactionId: {
		$id: "transactionId",
		type: "string",
		allOf: [{ minLength: 64, maxLength: 64 }, { $ref: "hex" }],
	},

	networkByte: {
		$id: "networkByte",
		network: true,
	},

	address: {
		$id: "address",
		type: "string",
		allOf: [{ minLength: 34, maxLength: 34 }, { $ref: "base58" }],
	},

	publicKey: {
		$id: "publicKey",
		type: "string",
		allOf: [{ minLength: 66, maxLength: 66 }, { $ref: "hex" }, { transform: ["toLowerCase"] }],
	},

	walletVote: {
		$id: "walletVote",
		allOf: [{ type: "string", pattern: "^[+|-][a-zA-Z0-9]{66}$" }, { transform: ["toLowerCase"] }],
	},

	username: {
		$id: "delegateUsername",
		type: "string",
		allOf: [
			{ type: "string", pattern: "^[a-z0-9!@$&_.]+$" },
			{ minLength: 1, maxLength: 20 },
			{ transform: ["toLowerCase"] },
		],
	},

	genericName: {
		$id: "genericName",
		type: "string",
		allOf: [
			{ type: "string", pattern: "^[a-zA-Z0-9]+(( - |[ ._-])[a-zA-Z0-9]+)*[.]?$" },
			{ minLength: 1, maxLength: 40 },
		],
	},

	uri: {
		type: "string",
		$id: "uri",
		allOf: [{ format: "uri" }, { minLength: 4, maxLength: 80 }],
	},
};

export const schemasArray = [
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

import { Networks } from "@ardenthq/sdk";

export const transactions: Networks.NetworkManifestTransactions = {
	expirationType: "height",
	fees: {
		ticker: "ZIL",
		type: "gas",
	},
	types: ["transfer"],
};

export const importMethods: Networks.NetworkManifestImportMethods = {
	address: {
		default: false,
		permissions: ["read"],
	},
	bip39: {
		default: true,
		permissions: ["read", "write"],
	},
	publicKey: {
		default: false,
		permissions: ["read"],
	},
};

export const featureFlags: Networks.NetworkManifestFeatureFlags = {
	Address: ["mnemonic.bip44", "validate"],
	Client: ["transaction", "wallet", "broadcast"],
	KeyPair: ["mnemonic.bip44"],
	PrivateKey: ["mnemonic.bip44"],
	PublicKey: ["mnemonic.bip44"],
	Transaction: ["transfer"],
};

export const explorer: Networks.NetworkManifestExplorer = {
	block: "zilliqa/block/{0}",
	transaction: "zilliqa/tx/{0}",
	wallet: "zilliqa/address/{0}",
};

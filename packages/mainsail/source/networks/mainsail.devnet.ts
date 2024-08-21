import { Networks } from "@ardenthq/sdk";

import { explorer, featureFlags, importMethods, transactions } from "./shared.js";

const network: Networks.NetworkManifest = {
	coin: "Mainsail",
	constants: {
		epoch: "2023-12-21T00:00:00.000Z",
		slip44: 1,
	},
	currency: {
		decimals: 8,
		symbol: "TѦ",
		ticker: "ARK",
	},
	explorer,
	featureFlags,
	governance: {
		delegateCount: 53,
		votesPerTransaction: 1,
		votesPerWallet: 1,
	},
	hosts: [
		{
			host: "https://dwallets-evm.mainsailhq.com/api",
			type: "full",
		},
		{
			host: "https://dwallets-evm.mainsailhq.com/tx/api",
			type: "tx",
		},
		{
			host: "https://musig-demo.mainsailhq.com",
			type: "musig",
		},
		{
			host: "https://explorer-demo.mainsailhq.com",
			type: "explorer",
		},
	],
	id: "mainsail.devnet",
	importMethods,
	knownWallets: "https://raw.githubusercontent.com/ArkEcosystem/common/master/devnet/known-wallets-extended.json",
	meta: {
		// fastDelegateSync: true,
		nethash: "7b9a7c6a14d3f8fb3f47c434b8c6ef0843d5622f6c209ffeec5411aabbf4bf1c",
	},
	name: "Devnet",
	transactions: {
		...transactions,
		fees: {
			ticker: "ARK",
			type: "static",
		},
		multiPaymentRecipients: 128,
	},
	type: "test",
};

export default network;

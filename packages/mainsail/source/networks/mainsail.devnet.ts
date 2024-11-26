import { Networks } from "@ardenthq/sdk";

import { explorer, featureFlags, importMethods, transactions } from "./shared.js";

const network: Networks.NetworkManifest = {
	coin: "Mainsail",
	constants: {
		epoch: "2023-12-21T00:00:00.000Z",
		slip44: 1,
	},
	currency: {
		decimals: 18,
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
			host: "https://explorer-evm-test.mainsailhq.com",
			type: "explorer",
		},
	],
	id: "mainsail.devnet",
	importMethods,
	knownWallets: "https://raw.githubusercontent.com/ArkEcosystem/common/master/devnet/known-wallets-extended.json",
	meta: {
		// fastDelegateSync: true,
		nethash: "c481dea3dcc13708364e576dff94dd499692b56cbc646d5acd22a3902297dd51",
		pubKeyHash: 30,
		slip44: 1,
		wif: 186,
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

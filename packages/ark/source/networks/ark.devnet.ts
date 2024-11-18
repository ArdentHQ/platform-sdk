import { Networks } from "@ardenthq/sdk";

import { explorer, featureFlags, importMethods, transactions } from "./shared.js";

const network: Networks.NetworkManifest = {
	coin: "ARK",
	constants: {
		epoch: "2017-03-21T13:00:00.000Z",
		slip44: 1,
	},
	currency: {
		decimals: 18,
		symbol: "DѦ",
		ticker: "DARK",
	},
	explorer,
	featureFlags,
	governance: {
		delegateCount: 51,
		votesPerTransaction: 1,
		votesPerWallet: 1,
	},
	hosts: [
		{
			host: "https://ark-test.arkvault.io/api",
			type: "full",
		},
		{
			host: "https://ark-test-musig.arkvault.io",
			type: "musig",
		},
		{
			host: "https://test.arkscan.io",
			type: "explorer",
		},
	],
	id: "ark.devnet",
	importMethods,
	knownWallets: "https://raw.githubusercontent.com/ArkEcosystem/common/master/devnet/known-wallets-extended.json",
	meta: {
		fastDelegateSync: true,
		nethash: "2a44f340d76ffc3df204c5f38cd355b7496c9065a1ade2ef92071436bd72e867",
	},
	name: "Devnet",
	transactions: {
		...transactions,
		fees: {
			ticker: "DARK",
			type: "dynamic",
		},
		multiPaymentRecipients: 128,
	},
	type: "test",
};

export default network;

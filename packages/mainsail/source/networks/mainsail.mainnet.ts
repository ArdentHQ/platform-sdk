import { Networks } from "@ardenthq/sdk";

import { explorer, featureFlags, importMethods, transactions } from "./shared.js";

const network: Networks.NetworkManifest = {
	coin: "Mainsail",
	constants: {
		epoch: "2023-12-21T00:00:00.000Z",
		slip44: 111,
	},
	currency: {
		decimals: 18,
		symbol: "Ѧ",
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
		{
			host: "https://dwallets-evm.mainsailhq.com/evm/api",
			type: "evm",
		},
	],
	id: "mainsail.mainnet",
	importMethods,
	knownWallets:
		"https://raw.githubusercontent.com/ArkEcosystem/common/master/mainsail/devnet/known-wallets-extended.json",
	meta: {
		chainId: 10_000,
		// fastDelegateSync: true,
		nethash: "a7206fa9d82a0896ddb26839e36eb75d4bb6da64a5e85eaf5d46a5435bef1fa5",
		slip44: 111,
		wif: 186,
	},
	name: "Mainnet",
	transactions: {
		...transactions,
		fees: {
			ticker: "MARK",
			type: "dynamic",
		},
		multiPaymentRecipients: 128,
	},
	type: "live",
};

export default network;

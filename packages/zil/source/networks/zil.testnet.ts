import { Networks } from "@ardenthq/sdk";

import { explorer, featureFlags, importMethods, transactions } from "./shared.js";

const network: Networks.NetworkManifest = {
	coin: "Zilliqa",
	constants: {
		slip44: 313,
	},
	currency: {
		decimals: 12,
		symbol: "ZIL",
		ticker: "ZIL",
	},
	explorer,
	featureFlags,
	hosts: [
		{
			host: "https://dev-api.zilliqa.com",
			type: "full",
		},
		{
			host: "https://viewblock.io",
			query: { network: "testnet" },
			type: "explorer",
		},
	],
	id: "zil.testnet",
	importMethods,
	meta: { chainId: 333 },
	name: "Testnet",
	transactions,
	type: "test",
};

export default network;

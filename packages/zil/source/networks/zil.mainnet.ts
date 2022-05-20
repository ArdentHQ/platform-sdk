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
			host: "https://api.zilliqa.com",
			type: "full",
		},
		{
			host: "https://viewblock.io",
			type: "explorer",
		},
	],
	id: "zil.mainnet",
	importMethods,
	meta: { chainId: 1 },
	name: "Mainnet",
	transactions,
	type: "live",
};

export default network;

import { Networks } from "@ardenthq/sdk";

import { explorer, featureFlags, importMethods, transactions } from "./shared.js";

const network: Networks.NetworkManifest = {
	coin: "Ethereum",
	constants: {
		slip44: 60,
	},
	currency: {
		decimals: 18,
		symbol: "Ξ",
		ticker: "ETH",
	},
	explorer,
	featureFlags,
	hosts: [
		{
			host: "https://coins.com/api/eth",
			type: "full",
		},
		{
			host: "https://goerli.etherscan.io",
			type: "explorer",
		},
	],
	id: "eth.goerli",
	importMethods,
	meta: {
		// @TODO
		networkId: "5",
	},
	name: "Goerli",
	transactions,
	type: "test",
};

export default network;

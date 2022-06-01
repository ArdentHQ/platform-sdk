import { Networks } from "@ardenthq/sdk";

import { constants, explorer, featureFlags, importMethods, transactions } from "./shared.js";

const network: Networks.NetworkManifest = {
	coin: "Cardano",
	constants,
	currency: {
		decimals: 6,
		symbol: "ADA",
		ticker: "ADA",
	},
	explorer,
	featureFlags,
	hosts: [
		{
			host: "http://51.75.183.27:3100",
			type: "full",
		},
		{
			host: "https://shelleyexplorer.cardano.org",
			type: "explorer",
		},
	],
	id: "ada.testnet",
	importMethods,
	meta: {
		extendedPublicKey: true,
		keyDeposit: 2_000_000,
		maxTxSize: 16_384,
		maxValueSize: 5000,
		minFeeA: 44,
		minFeeB: 155_381,
		minUTxOValue: 1_000_000,

		// @TODO
		networkId: "0",

		poolDeposit: 500_000_000,
	},
	name: "Testnet",
	transactions,
	type: "test",
};

export default network;

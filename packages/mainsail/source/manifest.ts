import MainsailDevnet from "./networks/mainsail.devnet.js";
import MainsailMainnet from "./networks/mainsail.mainnet.js";

export const manifest = {
	name: "ARK",
	networks: {
		"mainsail.devnet": MainsailDevnet,
		"mainsail.mainnet": MainsailMainnet,
	},
};

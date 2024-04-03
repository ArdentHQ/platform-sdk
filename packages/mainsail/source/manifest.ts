import ArkDevnet from "./networks/ark.devnet.js";
import ArkMainnet from "./networks/ark.mainnet.js";

export const manifest = {
	name: "ARK",
	networks: {
		"ark.devnet": ArkDevnet,
		"ark.mainnet": ArkMainnet,
	},
};

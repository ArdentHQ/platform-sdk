import { BigNumber } from "bignumber.js";

import { ARK_MULTIPLIER, GWEI_MULTIPLIER, WEI_MULTIPLIER } from "../crypto/constants";

export const formatUnits = (value: string, unit = "ark"): BigNumber => {
	switch (unit.toLowerCase()) {
		case "wei":
			return new BigNumber(value).dividedBy(WEI_MULTIPLIER);
		case "gwei":
			return new BigNumber(value).dividedBy(GWEI_MULTIPLIER);
		case "ark":
			return new BigNumber(value).dividedBy(ARK_MULTIPLIER);
		default:
			throw new Error(`Unsupported unit: ${unit}. Supported units are 'wei', 'gwei', and 'ark'.`);
	}
};

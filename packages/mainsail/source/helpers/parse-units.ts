import { BigNumber } from "bignumber.js";

import { ARK_MULTIPLIER, GWEI_MULTIPLIER, WEI_MULTIPLIER } from "../crypto/constants";

export const parseUnits = (value: number | string, unit = "ark"): BigNumber => {
	switch (unit.toLowerCase()) {
		case "wei":
			return new BigNumber(value).times(WEI_MULTIPLIER);
		case "gwei":
			return new BigNumber(value).times(GWEI_MULTIPLIER);
		case "ark":
			return new BigNumber(value).times(ARK_MULTIPLIER);
		default:
			throw new Error(`Unsupported unit: ${unit}. Supported units are 'wei', 'gwei', and 'ark'.`);
	}
};

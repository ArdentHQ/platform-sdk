import { BigNumber } from "@mainsail/kernel/distribution/utils";

import { ARK_MULTIPLIER, GWEI_MULTIPLIER, WEI_MULTIPLIER } from "../crypto/constants";

export const parseUnits = (value: number | string, unit = "ark"): string => {
	switch (unit.toLowerCase()) {
		case "wei":
			return BigNumber.make(value).times(WEI_MULTIPLIER).toString();
		case "gwei":
			return BigNumber.make(value).times(GWEI_MULTIPLIER).toString();
		case "ark":
			return BigNumber.make(value).times(ARK_MULTIPLIER).toString();
		default:
			throw new Error(`Unsupported unit: ${unit}. Supported units are 'wei', 'gwei', and 'ark'.`);
	}
};

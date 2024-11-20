import { BigNumber } from "@mainsail/kernel/distribution/utils";

import { ARK_MULTIPLIER, GWEI_MULTIPLIER, WEI_MULTIPLIER } from "../crypto/constants";

export const parseUnits = (value: number | string, unit = "ark"): string => {
	switch (unit.toLowerCase()) {
		case "wei":
			return BigNumber.make(value).times(WEI_MULTIPLIER*100).toString();
		case "gwei":
			return BigNumber.make(value).times(GWEI_MULTIPLIER*100).toString();
		case "ark":
			return BigNumber.make(value).times(ARK_MULTIPLIER*100).toString();
		default:
			throw new Error(`Unsupported unit: ${unit}. Supported units are 'wei', 'gwei', and 'ark'.`);
	}
};

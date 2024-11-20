/* eslint-disable unicorn/require-number-to-fixed-digits-argument */
import { BigNumber } from "@mainsail/kernel/distribution/utils";

import { ARK_MULTIPLIER, GWEI_MULTIPLIER, WEI_MULTIPLIER } from "../crypto/constants";

export const formatUnits = (value: string, unit = "ark"): string => {
	switch (unit.toLowerCase()) {
		case "wei":
			return BigNumber.make(value).dividedBy(WEI_MULTIPLIER).toString();
		case "gwei":
			return BigNumber.make(value).dividedBy(GWEI_MULTIPLIER).toString();
		case "ark":
			return BigNumber.make(value).dividedBy(ARK_MULTIPLIER).toString();
		default:
			throw new Error(`Unsupported unit: ${unit}. Supported units are 'wei', 'gwei', and 'ark'.`);
	}
};

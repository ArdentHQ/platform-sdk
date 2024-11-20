import { BigNumber } from '@ardenthq/sdk-helpers';

import { ARK_MULTIPLIER, GWEI_MULTIPLIER, WEI_MULTIPLIER } from "../crypto/constants";

export const formatUnits = (value: string, unit = "ark"): string => {
	switch (unit.toLowerCase()) {
		case "wei":
			return BigNumber.make(value).dividedBy(WEI_MULTIPLIER).valueOf();
		case "gwei":
			return BigNumber.make(value).dividedBy(GWEI_MULTIPLIER).valueOf();
		case "ark":
			return BigNumber.make(value).dividedBy(ARK_MULTIPLIER).valueOf();
		default:
			throw new Error(`Unsupported unit: ${unit}. Supported units are 'wei', 'gwei', and 'ark'.`);
	}
};

import { ARK_MULTIPLIER, GWEI_MULTIPLIER, WEI_MULTIPLIER } from "../crypto/constants";

export const parseUnits = (value: number | string, unit = 'ark'): string => {
    switch (unit.toLowerCase()) {
        case 'wei':
            return (Number(value) * WEI_MULTIPLIER).toString();
        case 'gwei':
            return (Number(value) * GWEI_MULTIPLIER).toString();
        case 'ark':
            return (Number(value) * ARK_MULTIPLIER).toString();
        default:
            throw new Error(`Unsupported unit: ${unit}. Supported units are 'wei', 'gwei', and 'ark'.`);
    }
}
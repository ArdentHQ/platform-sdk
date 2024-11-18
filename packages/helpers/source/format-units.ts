import { ARK_MULTIPLIER, GWEI_MULTIPLIER, WEI_MULTIPLIER } from '../../mainsail/source/crypto/constants';

export const formatUnits = (value: string, unit = 'ark'): number => {
    switch (unit.toLowerCase()) {
        case 'wei':
            return Number(value) / WEI_MULTIPLIER;
        case 'gwei':
            return Number(value) / GWEI_MULTIPLIER;
        case 'ark':
            return Number(value) / ARK_MULTIPLIER;
        default:
            throw new Error(`Unsupported unit: ${unit}. Supported units are 'wei', 'gwei', and 'ark'.`);
    }
} 
import BigNumber from "bignumber.js";

export type NumberLike = string | number | bigint | BigNumber;

/**
 * Quick accessor for 0, a commonly used value.
 *
 * @static
 * @type {BigNumber}
 */
export const ZERO = new BigNumber(0);

/**
 * Quick accessor for 1, a commonly used value.
 *
 * @static
 * @type {BigNumber}
 */
export const ONE = new BigNumber(1);

/**
 * Returns a BigNumber expressed in the smallest unit
 *
 * @param {NumberLike} value
 * @param {number} [decimals]
 * @returns {BigNumber}
 */
export const toSatoshi = (value: NumberLike, decimals?: number): BigNumber => {
    const powerOfTen = new BigNumber(10).exponentiatedBy(decimals ?? 8);
    return new BigNumber(value).multipliedBy(powerOfTen).decimalPlaces(0);
}

/**
 * Divides the current value by one satoshi and rounds it to the given amount of decimals. 
 *
 * @param {NumberLike} value
 * @param {number} [decimals] 
 * @returns {number}
 */
export const toHuman = (value: NumberLike, decimals?: number): number => {
    const powerOfTen = new BigNumber(10).exponentiatedBy(decimals ?? 8);
    return new BigNumber(value).dividedBy(powerOfTen).toNumber();
}
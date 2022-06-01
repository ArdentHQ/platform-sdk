import Big, { BigSource } from "big.js";

export type NumberLike = string | number | bigint | Big | BigNumber;

/**
 * An immutable BigNumber implementation wth some nice-to-have functionality
 * for working with crypto currencies throughout our products and use the SDK.
 *
 * This implementation is significantly slower than the native BigInt but for
 * applications that use the Platform SDK this performance loss is acceptable.
 *
 * @export
 * @class BigNumber
 */
export class BigNumber {
	/**
	 * Quick accessor for 0, a commonly used value.
	 *
	 * @static
	 * @type {BigNumber}
	 * @memberof BigNumber
	 */
	public static readonly ZERO: BigNumber = new BigNumber(0);

	/**
	 * Quick accessor for 1, a commonly used value.
	 *
	 * @static
	 * @type {BigNumber}
	 * @memberof BigNumber
	 */
	public static readonly ONE: BigNumber = new BigNumber(1);

	/**
	 * The current value as a Big.js instance.
	 *
	 * @type {Big}
	 * @memberof BigNumber
	 */
	readonly #value: Big;

	/**
	 * The number of decimals
	 *
	 * @type {number}
	 * @memberof BigNumber
	 */
	readonly #decimals: number | undefined;

	/**
	 * Creates an instance of BigNumber.
	 *
	 * @param {NumberLike} value
	 * @param {number} [decimals]
	 * @memberof BigNumber
	 */
	private constructor(value: NumberLike, decimals?: number) {
		Big.RM = Big.roundDown;
		Big.DP = 30;
		Big.PE = 35;

		this.#value = this.#toBigNumber(value);

		if (decimals !== undefined) {
			this.#decimals = decimals;
			this.#value = this.#value.round(this.#decimals);
		}
	}

	/**
	 * Creates an instance of BigNumber. Acts as a static constructor.
	 *
	 * @static
	 * @param {NumberLike} value
	 * @param {number} [decimals]
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	public static make(value: NumberLike, decimals?: number): BigNumber {
		return new BigNumber(value, decimals);
	}

	/**
	 * Creates an instance of BigNumber with the given amount of decimals.
	 *
	 * @param {number} decimals
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	public decimalPlaces(decimals: number): BigNumber {
		return BigNumber.make(this.#value, decimals);
	}

	/**
	 * Creates an instance of BigNumber with the given value added to the current value.
	 *
	 * @param {NumberLike} value
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	public plus(value: NumberLike): BigNumber {
		return BigNumber.make(this.#value.plus(this.#toBigNumber(value)), this.#decimals);
	}

	/**
	 * Creates an instance of BigNumber with the given value subtracted from the current value.
	 *
	 * @param {NumberLike} value
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	public minus(value: NumberLike): BigNumber {
		return BigNumber.make(this.#value.minus(this.#toBigNumber(value)), this.#decimals);
	}

	/**
	 * Creates an instance of BigNumber with the current value divided by the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	public divide(value: NumberLike): BigNumber {
		return BigNumber.make(this.#value.div(this.#toBigNumber(value)), this.#decimals);
	}

	/**
	 * Creates an instance of BigNumber with the current value multiplied by the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	public times(value: NumberLike): BigNumber {
		return BigNumber.make(this.#value.times(this.#toBigNumber(value)), this.#decimals);
	}

	/**
	 * Returns the sum of the different values.
	 *
	 * @param {NumberLike[]} values
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	public static sum(values: NumberLike[]): BigNumber {
		return values.reduce(
			(accumulator: BigNumber, currentValue: NumberLike) => accumulator.plus(currentValue),
			BigNumber.ZERO,
		);
	}

	/**
	 * Creates an instance of BigNumber that's a power of ten.
	 *
	 * @param {NumberLike} exponent
	 * @returns {BigNumber}
	 * @memberof BigNumber
	 */
	public static powerOfTen(exponent: NumberLike): BigNumber {
		const power = BigNumber.make(exponent).toNumber();
		return BigNumber.make(`1${"0".repeat(power)}`);
	}

	/**
	 * Determines if the current value is positive.
	 *
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	public isPositive(): boolean {
		return this.#value.gt(0);
	}

	/**
	 * Determines if the current value is negative.
	 *
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	public isNegative(): boolean {
		return this.#value.lt(0);
	}

	/**
	 * Determines if the current value is zero.
	 *
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	public isZero(): boolean {
		return this.#value.eq(0);
	}

	/**
	 * Compares the current and given value and returns a numerical value
	 * to indicate the type of difference, like less/greater or equal.
	 *
	 * @param {NumberLike} value
	 * @returns {number}
	 * @memberof BigNumber
	 */
	public comparedTo(value: NumberLike): number {
		return this.#value.cmp(this.#toBigNumber(value));
	}

	/**
	 * Determines if the current value is equal to the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	public isEqualTo(value: NumberLike): boolean {
		return this.#value.eq(this.#toBigNumber(value));
	}

	/**
	 * Determines if the current value is greater than the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	public isGreaterThan(value: NumberLike): boolean {
		return this.#value.gt(this.#toBigNumber(value));
	}

	/**
	 * Determines if the current value is greater than or equal to the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	public isGreaterThanOrEqualTo(value: NumberLike): boolean {
		return this.#value.gte(this.#toBigNumber(value));
	}

	/**
	 * Determines if the current value is less than the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	public isLessThan(value: NumberLike): boolean {
		return this.#value.lt(this.#toBigNumber(value));
	}

	/**
	 * Determines if the current value is less than or equal to the given value.
	 *
	 * @param {NumberLike} value
	 * @returns {boolean}
	 * @memberof BigNumber
	 */
	public isLessThanOrEqualTo(value: NumberLike): boolean {
		return this.#value.lte(this.#toBigNumber(value));
	}

	/**
	 * Returns a BigNumber as expressed naturally in the given amount of decimals.
	 *
	 * @param {number} [decimals]
	 * @returns {string}
	 * @memberof BigNumber
	 */
	public denominated(decimals?: number): BigNumber {
		decimals ??= this.#decimals;
		return BigNumber.make(this.#value, decimals).divide(BigNumber.powerOfTen(decimals || 0));
	}

	/**
	 * Returns a BigNumber expressed in the smallest unit
	 *
	 * @param {number} [decimals]
	 * @returns {string}
	 * @memberof BigNumber
	 */
	public toSatoshi(decimals?: number): BigNumber {
		decimals ??= this.#decimals;
		return BigNumber.make(this.#value, decimals).times(BigNumber.powerOfTen(decimals || 0));
	}

	/**
	 * Divides the current value by one satoshi and rounds it to the given amount of decimals.
	 *
	 * @param {number} [decimals]
	 * @returns {number}
	 * @memberof BigNumber
	 */
	public toHuman(decimals?: number): number {
		return +this.denominated(decimals).toString();
	}

	/**
	 * Returns a string representing the current value rounded to the given amount of decimals.
	 *
	 * @param {number} [decimals]
	 * @returns {string}
	 * @memberof BigNumber
	 */
	public toFixed(decimals?: number): string {
		if (decimals !== undefined) {
			return this.#value.toFixed(decimals);
		}

		// eslint-disable-next-line unicorn/require-number-to-fixed-digits-argument
		return this.#value.toFixed();
	}

	/**
	 * Returns the current value as a primitive number.
	 *
	 * @returns {number}
	 * @memberof BigNumber
	 */
	public toNumber(): number {
		return this.#value.toNumber();
	}

	/**
	 * Returns the current value as a BigInt.
	 *
	 * @returns {bigint}
	 * @memberof BigNumber
	 */
	public toBigInt(): bigint {
		return BigInt(this.toString());
	}

	/**
	 * Returns the current value as primitive string.
	 *
	 * @returns {string}
	 * @memberof BigNumber
	 */
	public toString(): string {
		return this.#value.toString();
	}

	/**
	 * Returns the current value as a string but includes minus symbols.
	 *
	 * @returns {string}
	 * @memberof BigNumber
	 */
	public valueOf(): string {
		return this.#value.valueOf();
	}

	/**
	 * Normalise the various types of input.
	 *
	 * @private
	 * @param {NumberLike} value
	 * @returns {Big}
	 * @memberof BigNumber
	 */
	#toBigNumber(value: NumberLike): Big {
		if (value instanceof BigNumber) {
			return new Big(value.valueOf());
		}

		return new Big(value as BigSource);
	}
}

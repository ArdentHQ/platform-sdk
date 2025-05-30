import { toHuman, toSatoshi } from "@ardenthq/sdk-helpers";
import { describe } from "@ardenthq/sdk-test";
import { BigNumber } from "bignumber.js";

import { NumberLike, ONE } from "./bignumber.helpers.js";

describe("BigNumber", async ({ assert, beforeEach, it }) => {
	beforeEach((context) => (context.subject = new BigNumber(1)));

	it("#toString should use the exponential notation up to the 35th number", () => {
		assert.is(new BigNumber("33653665000000000000000000000000000").toString(), "3.3653665e+34");
	});

	it("#toString should use the exponential notation above of the 35th number", () => {
		assert.is(new BigNumber("336536650000000000000000000000000000").toString(), "3.3653665e+35");
	});

	it("#toString should succeed when input is provided as string", () => {
		assert.is(new BigNumber("0").toString(), "0");
		assert.is(new BigNumber("1").toString(), "1");
		assert.is(new BigNumber("1.5").toString(), "1.5");
		assert.is(new BigNumber("1.500000000001").toString(), "1.500000000001");
	});

	it("#toString should succeed when input is provided as number", () => {
		assert.is(new BigNumber(0).toString(), "0");
		assert.is(new BigNumber(1).toString(), "1");
		assert.is(new BigNumber(1.5).toString(), "1.5");
		assert.is(new BigNumber(1.500_000_000_001).toString(), "1.500000000001");
	});

	it("#toString should succeed when input is provided as bigint", () => {
		assert.is(new BigNumber(BigInt(0)).toString(), "0");
		assert.is(new BigNumber(BigInt(1)).toString(), "1");
		assert.is(new BigNumber(BigInt(10)).toString(), "10");
		assert.is(new BigNumber(BigInt(1_234_567_890)).toString(), "1234567890");
	});

	it("#toString should succeed when input is provided as BigNumber", () => {
		assert.is(new BigNumber(ONE).toString(), "1");
		assert.is(new BigNumber(new BigNumber(1.5)).toString(), "1.5");
		assert.is(new BigNumber(new BigNumber(1.500_000_000_001)).toString(), "1.500000000001");
		assert.is(new BigNumber(new BigNumber("1.5")).toString(), "1.5");
		assert.is(new BigNumber(new BigNumber("1.500000000001")).toString(), "1.500000000001");
	});

	it("#toString should not return a value having more than the specified decimals", () => {
		assert.is(new BigNumber("1").decimalPlaces(8).toString(), "1");
		assert.is(new BigNumber(1).decimalPlaces(8).toString(), "1");

		assert.is(new BigNumber("1.5").decimalPlaces(1).toString(), "1.5");
		assert.is(new BigNumber("1.500000000000").decimalPlaces(1).toString(), "1.5");
		assert.is(new BigNumber(1.5).decimalPlaces(1).toString(), "1.5");

		assert.is(new BigNumber("1.500000005555").decimalPlaces(1).toString(), "1.5");
		assert.is(new BigNumber(1.500_000_005_555).decimalPlaces(1).toString(), "1.5");

		assert.is(new BigNumber("1.500000015555").decimalPlaces(8).toString(), "1.50000002");
		assert.is(new BigNumber(1.500_000_015_555).decimalPlaces(8).toString(), "1.50000002");
	});

	it("#decimalPlaces should succeed", () => {
		assert.is(new BigNumber("12.3456789").decimalPlaces(0).valueOf(), "12");
		assert.is(new BigNumber("12.3456789").decimalPlaces(2).valueOf(), "12.35");
		assert.is(new BigNumber("12.3456789").decimalPlaces(4).valueOf(), "12.3457");
		assert.is(new BigNumber("112.3456789").decimalPlaces(6).valueOf(), "112.345679");
	});

	it("#plus", () => {
		assert.is(new BigNumber(10).plus(1).valueOf(), "11");
	});

	it("#minus", () => {
		assert.is(new BigNumber(10).minus(1).valueOf(), "9");
	});

	it("#divide", () => {
		assert.is(new BigNumber(10).dividedBy(2).valueOf(), "5");
		assert.is(new BigNumber(5).dividedBy(2).valueOf(), "2.5");
		assert.is(new BigNumber(2.5).dividedBy(3).valueOf(), "0.83333333333333333333");

		assert.is(new BigNumber("141000").dividedBy("100000000").valueOf(), "0.00141");
		assert.is(new BigNumber(141_000).dividedBy(1e8).valueOf(), "0.00141");
	});

	it("#times", () => {
		assert.is(new BigNumber(10).multipliedBy(2).valueOf(), "20");
		assert.is(new BigNumber(2.5).multipliedBy(2).valueOf(), "5");
		assert.is(new BigNumber(0.83).multipliedBy(3).valueOf(), "2.49");
	});

	it("#sum", () => {
		const sum = (values: NumberLike[]): BigNumber => {
			let result = new BigNumber(0);
			for (const value of values) {
				result = result.plus(value);
			}
			return result;
		};

		assert.is(sum([ONE, 1, "2", 3, 5]).toString(), "12");
	});

	it("#powerOfTen", () => {
		assert.is(new BigNumber(10).exponentiatedBy(0).valueOf(), "1");
		assert.is(new BigNumber(10).exponentiatedBy(1).valueOf(), "10");
		assert.is(new BigNumber(10).exponentiatedBy(2).valueOf(), "100");
	});

	it("#isPositive", (context) => {
		assert.true(context.subject.isPositive());
		assert.false(context.subject.minus(10).isPositive());
	});

	it("#isNegative", (context) => {
		assert.false(context.subject.isNegative());
		assert.true(context.subject.minus(10).isNegative());
	});

	it("#isZero", (context) => {
		assert.false(context.subject.isZero());
		assert.true(new BigNumber(0).isZero());
	});

	it("#comparedTo", (context) => {
		assert.is(context.subject.comparedTo(new BigNumber(1)), 0);
		assert.is(context.subject.comparedTo(new BigNumber(0)), 1);
		assert.is(context.subject.comparedTo(new BigNumber(-1)), 1);
		assert.is(context.subject.comparedTo(new BigNumber(2)), -1);
	});

	it("#isEqualTo", (context) => {
		assert.true(context.subject.isEqualTo(new BigNumber(1)));
		assert.false(context.subject.isEqualTo(new BigNumber(2)));
	});

	it("#isGreaterThan", (context) => {
		assert.true(context.subject.isGreaterThan(new BigNumber(0)));
		assert.false(context.subject.isGreaterThan(new BigNumber(2)));
	});

	it("#isGreaterThanOrEqualTo", (context) => {
		assert.true(context.subject.isGreaterThanOrEqualTo(new BigNumber(0)));
		assert.true(context.subject.isGreaterThanOrEqualTo(new BigNumber(1)));
		assert.true(context.subject.isGreaterThanOrEqualTo(new BigNumber(0)));
		assert.false(context.subject.isGreaterThanOrEqualTo(new BigNumber(3)));
	});

	it("#isLessThan", (context) => {
		assert.true(context.subject.isLessThan(new BigNumber(2)));
		assert.false(context.subject.isLessThan(new BigNumber(1)));
	});

	it("#isLessThanOrEqualTo", (context) => {
		assert.true(context.subject.isLessThanOrEqualTo(new BigNumber(1)));
		assert.true(context.subject.isLessThanOrEqualTo(new BigNumber(1)));
		assert.true(context.subject.isLessThanOrEqualTo(new BigNumber(2)));
		assert.false(context.subject.isLessThanOrEqualTo(new BigNumber(0)));
	});

	it("#toSatoshi", () => {
		assert.is(toSatoshi(new BigNumber(100), 0).toString(), "100");
		assert.is(toSatoshi(new BigNumber(100), 10).toString(), "1000000000000");
		assert.is(toSatoshi(new BigNumber(123_456_789), 5).toString(), "12345678900000");
		assert.is(toSatoshi(new BigNumber(1), 8).toString(), "100000000");
		assert.is(toSatoshi(new BigNumber("0.00000001"), 8).toString(), "1");
	});

	it("#toHuman", () => {
		assert.is(toHuman(new BigNumber(100 * 1e8)), 100);
		assert.is(toHuman(new BigNumber(123.456 * 1e8).decimalPlaces(8)), 123.456);
		assert.is(toHuman(new BigNumber(123.456_789 * 1e8).decimalPlaces(8)), 123.456_789);
		assert.is(toHuman(new BigNumber(1e8).times(1e8).decimalPlaces(8)), +`${1e8}`);
		assert.is(toHuman(new BigNumber(123_456), 0), 123_456);
		assert.is(toHuman(new BigNumber(123_456).decimalPlaces(0), 0), 123_456);
		assert.is(toHuman(new BigNumber(123_456).decimalPlaces(1), 1), 12_345.6);
		assert.is(toHuman(new BigNumber(123_456).decimalPlaces(1), 1), 12_345.6);
		assert.is(toHuman(new BigNumber(123_456).decimalPlaces(6), 6), 0.123_456);
		assert.is(toHuman(new BigNumber(123_456).decimalPlaces(6), 6), 0.123_456);
		assert.is(toHuman(new BigNumber(1).decimalPlaces(8), 8), +`${1e-8}`);
	});

	it("#toFixed", (context) => {
		// eslint-disable-next-line unicorn/require-number-to-fixed-digits-argument
		assert.is(context.subject.toFixed(), "1");

		assert.is(context.subject.toFixed(0), "1");
		assert.is(context.subject.toFixed(2), "1.00");

		assert.is(new BigNumber(1.234_567_891).toFixed(5), "1.23457");
		assert.is(new BigNumber(1.234_567_891).toFixed(28), "1.2345678910000000000000000000");
		assert.is(new BigNumber(1.234_567_891).toFixed(32), "1.23456789100000000000000000000000");

		assert.is(new BigNumber(".123").toFixed(5), "0.12300");
		assert.is(new BigNumber("00010.00010").toFixed(0), "10");
		assert.is(new BigNumber("00010.00010").toFixed(4), "10.0001");

		// eslint-disable-next-line unicorn/require-number-to-fixed-digits-argument
		assert.is(new BigNumber(123.456).toFixed(), "123.456");
		assert.is(new BigNumber(123.456).toFixed(0), "123");
		assert.is(new BigNumber(123.456).toFixed(5), "123.45600");
		assert.is(new BigNumber(123.456).toFixed(2), "123.46");

		assert.is(new BigNumber(123).toFixed(5), "123.00000");
		assert.is(new BigNumber(123_456).toFixed(0), "123456");
	});

	it("#toNumber", (context) => {
		assert.is(context.subject.toNumber(), 1);
	});

	it("#toBigInt", (context) => {
		assert.is(BigInt(context.subject.toString()), BigInt(1));
	});

	it("#valueOf", (context) => {
		assert.is(context.subject.valueOf(), "1");
	});
});

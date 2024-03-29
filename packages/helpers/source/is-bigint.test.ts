import { describe } from "@ardenthq/sdk-test";

import { isBigInt } from "./is-bigint";

describe("isBigInt", async ({ assert, it, nock, loader }) => {
	it("should pass", () => {
		assert.true(isBigInt(BigInt(1)));
	});

	it("should fail", () => {
		assert.false(isBigInt("1"));
		assert.false(isBigInt(1));
	});
});

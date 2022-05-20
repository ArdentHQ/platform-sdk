import { describe } from "@ardenthq/sdk-test";

import { isPositiveZero } from "./is-positive-zero";

describe("FeedServisPositiveZeroice", async ({ assert, it, nock, loader }) => {
	it("should pass", () => {
		assert.true(isPositiveZero(+0));
		assert.true(isPositiveZero(0));
	});

	it("should fail", () => {
		assert.false(isPositiveZero(-0));
		assert.false(isPositiveZero(-1));
	});
});

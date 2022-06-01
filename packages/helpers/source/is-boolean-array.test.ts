import { describe } from "@ardenthq/sdk-test";

import { isBooleanArray } from "./is-boolean-array";

describe("isBooleanArray", async ({ assert, it, nock, loader }) => {
	it("should pass", () => {
		assert.true(isBooleanArray([true]));
	});

	it("should fail", () => {
		assert.false(isBooleanArray([1]));
	});
});

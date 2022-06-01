import { describe } from "@ardenthq/sdk-test";

import { isEmptyArray } from "./is-empty-array";

describe("isEmptyArray", async ({ assert, it, nock, loader }) => {
	it("should return true for an empty array", () => {
		assert.true(isEmptyArray([]));
	});
});

import { describe } from "@ardenthq/sdk-test";

import { isMap } from "./is-map";

describe("isMap", async ({ assert, it, nock, loader }) => {
	it("should pass", () => {
		assert.true(isMap(new Map()));
	});

	it("should fail", () => {
		assert.false(isMap(1));
	});
});

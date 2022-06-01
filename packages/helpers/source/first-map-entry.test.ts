import { describe } from "@ardenthq/sdk-test";

import { firstMapEntry } from "./first-map-entry";

describe("firstMapEntry", async ({ assert, it, nock, loader }) => {
	it("should return the first entry", () => {
		assert.equal(firstMapEntry(new Map([["Hello", "World"]])), ["Hello", "World"]);
	});
});

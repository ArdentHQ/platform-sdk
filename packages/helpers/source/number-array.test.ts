import { describe } from "@ardenthq/sdk-test";

import { numberArray } from "./number-array";

describe("numberArray", async ({ assert, it, nock, loader }) => {
	it("should contain 5 numbers stating from 0", () => {
		assert.equal(numberArray(5), [0, 1, 2, 3, 4]);
	});
});

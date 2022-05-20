import { describe } from "@ardenthq/sdk-test";

import { concat } from "./concat";

describe("concat", async ({ assert, it, nock, loader }) => {
	it("should concatenate all values", () => {
		assert.equal(concat([1], 2, [3], [[4]]), [1, 2, 3, [4]]);
	});
});

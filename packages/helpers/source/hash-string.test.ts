import { describe } from "@ardenthq/sdk-test";

import { hashString } from "./hash-string";

describe("hashString", async ({ assert, it, nock, loader }) => {
	it("should return a number for the given string", function () {
		assert.is(hashString("Hello World"), 1661258373);
	});
});

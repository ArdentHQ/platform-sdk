import { describe } from "@ardenthq/sdk-test";

import { parseUnits } from "./parse-units";


describe("parseUnits", async ({ assert, it, loader }) => {
	it("should parse the value to wei", () => {
		assert.equal(parseUnits(1, "wei"), "1");
		assert.equal(parseUnits(1, "gwei"), "1000000000");
		assert.equal(parseUnits(1, "ark"), "100000000000000000000");
	});

	it("should throw an error for unsupported units", () => {
		assert.throws(
			() => parseUnits(1, "btc"),
			"Unsupported unit: btc. Supported units are 'wei', 'gwei', and 'ark'.",
		);
	});
});

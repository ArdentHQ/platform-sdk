import { formatUnits } from "./format-units";

describe("formatUnits", async ({ assert, it, loader }) => {
    it("should format the value to wei", () => {
        assert.equal(formatUnits("1", "wei"), 1);
        assert.equal(formatUnits("1000000000", "gwei"), 1);
        assert.equal(formatUnits("100000000000000000000", "ark"), 1);
    });

	it("should throw an error for unsupported units", () => {
		assert.throws(
			() => formatUnits("1", "btc"),
			"Unsupported unit: btc. Supported units are 'wei', 'gwei', and 'ark'.",
		);
	});
});

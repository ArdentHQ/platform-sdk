import { describe } from "@ardenthq/sdk-test";

import { configManager } from "./managers";
import { isSupportedTransactionVersion, maxVendorFieldLength } from "./utils";

describe("CryptoUtils", ({ assert, it }) => {
	describe("maxVendorFieldLength", () => {
		it("should return the vendorFieldLength for a given height", () => {
			configManager.getMilestone = (height?: number) => ({ vendorFieldLength: 64 } as any);

			const result = maxVendorFieldLength(100);
			assert.equal(result, 64);
		});

		it("should return the vendorFieldLength when no height is provided", () => {
			configManager.getMilestone = () => ({ vendorFieldLength: 128 } as any);

			const result = maxVendorFieldLength();
			assert.equal(result, 128);
		});
	});

	describe("isSupportedTransactionVersion", () => {
		it("should return true when version is 1", () => {
			const result = isSupportedTransactionVersion(1);
			assert.true(result);
		});

		it("should return false when version is not 1", () => {
			assert.false(isSupportedTransactionVersion(2));
			assert.false(isSupportedTransactionVersion(3));
		});
	});
});

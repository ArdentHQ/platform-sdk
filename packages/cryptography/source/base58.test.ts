import { describe } from "@ardenthq/sdk-test";

import { Base58 } from "./base58";

describe("Base58", ({ assert, it }) => {
	it("should encode the given value", () => {
		assert.type(Base58.encode("Hello"), "string");
		assert.type(Base58.encode(Buffer.from("Hello")), "string");
	});

	it("should decode the given value", () => {
		assert.is(Base58.decode(Base58.encode("Hello")).toString(), "72,101,108,108,111");
	});

	it("should validate the given value", () => {
		assert.is(Base58.validate(Base58.encode("Hello")), true);
		assert.is(Base58.validate("SGVsbG8sIFdvcmxk"), false);
	});
});

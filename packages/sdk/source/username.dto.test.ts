import { describe } from "@ardenthq/sdk-test";

import { UsernameData } from "./username.dto.js";

describe("UsernameData", ({ assert, beforeEach, it }) => {
	beforeEach((context) => {
		context.subject = new UsernameData({
			address: "0x1234567890abcdef1234567890abcdef12345678",
			username: "testUser",
		});
	});

	it("#address", (context) => {
		assert.is(context.subject.address(), "0x1234567890abcdef1234567890abcdef12345678");
	});

	it("#username", (context) => {
		assert.is(context.subject.username(), "testUser");
	});

	it("#toObject", (context) => {
		const result = context.subject.toObject();
		assert.object(result);
		assert.equal(result, {
			address: "0x1234567890abcdef1234567890abcdef12345678",
			username: "testUser",
		});
	});

	it("#raw", (context) => {
		const result = context.subject.raw();
		assert.equal(result, {
			address: "0x1234567890abcdef1234567890abcdef12345678",
			username: "testUser",
		});
	});
});

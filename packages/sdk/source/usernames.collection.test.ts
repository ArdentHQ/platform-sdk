import { describe } from "@ardenthq/sdk-test";

import { UsernameData } from "./username.dto.js";
import { UsernameDataCollection } from "./usernames.collection.js";

describe("UsernameDataCollection", ({ assert, beforeEach, it }) => {
	beforeEach((context) => {
		context.subject = new UsernameDataCollection([
			new UsernameData({
				address: "0x93485b57ff3DeD81430D08579142fAe8234c6A17",
				username: "user1",
			}),
			new UsernameData({
				address: "0x6F0182a0cc707b055322CcF6d4CB6a5Aff1aEb22",
				username: "user2",
			}),
		]);
	});

	it("#items", (context) => {
		const items = context.subject.items();
		assert.array(items);
		assert.length(items, 2);
		assert.instance(items[0], UsernameData);
		assert.equal(items[0].address(), "0x93485b57ff3DeD81430D08579142fAe8234c6A17");
		assert.equal(items[0].username(), "user1");
	});

	it("#findByAddress", (context) => {
		const result = context.subject.findByAddress("0x6F0182a0cc707b055322CcF6d4CB6a5Aff1aEb22");
		assert.object(result);
		assert.instance(result, UsernameData);
		assert.equal(result.username(), "user2");
	});

	it("#findByUsername", (context) => {
		const result = context.subject.findByUsername("user1");
		assert.object(result);
		assert.instance(result, UsernameData);
		assert.equal(result.address(), "0x93485b57ff3DeD81430D08579142fAe8234c6A17");
	});

	it("#isEmpty", (context) => {
		assert.false(context.subject.isEmpty());

		const emptyCollection = new UsernameDataCollection([]);
		assert.true(emptyCollection.isEmpty());
	});

	it("#isNotEmpty", (context) => {
		assert.true(context.subject.isNotEmpty());

		const emptyCollection = new UsernameDataCollection([]);
		assert.false(emptyCollection.isNotEmpty());
	});
});

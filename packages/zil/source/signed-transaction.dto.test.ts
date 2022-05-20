import { describe } from "@ardenthq/sdk-test";
import { DateTime } from "@ardenthq/sdk-intl";

import { createService } from "../test/mocking";
import { SignedTransactionData } from "./signed-transaction.dto.js";

describe("SignedTransactionData", async ({ assert, beforeEach, it, nock, loader }) => {
	beforeEach(async (context) => {
		context.subject = await createService(SignedTransactionData);

		context.subject.configure(
			"3e3817fd0c35bc36674f3874c2953fa3e35877cbcdb44a08bdc6083dbd39d572",
			{
				sender: "zil1ua64tlepq090nw8dttzxyaa9q5zths8w4m9qun",
				recipient: "zil1ua64tlepq090nw8dttzxyaa9q5zths8w4m9123",
				amount: "120000000000000",
				fee: "25",
				timestamp: "1970-01-01T00:00:00.000Z",
			},
			"",
		);
	});

	it("should have a sender", (context) => {
		assert.is(context.subject.sender(), "zil1ua64tlepq090nw8dttzxyaa9q5zths8w4m9qun");
	});

	it("should have a recipient", (context) => {
		assert.is(context.subject.recipient(), "zil1ua64tlepq090nw8dttzxyaa9q5zths8w4m9123");
	});

	it("should have a amount", (context) => {
		assert.is(context.subject.amount().toHuman(), 120);
	});

	it("should have a fee", (context) => {
		assert.is(context.subject.fee().toString(), "25");
	});

	it("should have a timestamp", (context) => {
		assert.true(DateTime.make(0).isSame(context.subject.timestamp()));
	});
});

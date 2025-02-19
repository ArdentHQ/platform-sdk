import { describe } from "@ardenthq/sdk-test";

import { TransactionTypeService } from "./transaction-type.service.js";

describe("TransactionTypeService", async ({ assert, it, nock, loader }) => {
	it("should determine if the transaction is a transfer", () => {
		assert.true(TransactionTypeService.isTransfer({ data: "" }));
		assert.false(TransactionTypeService.isTransfer({ data: "0x88d695b2" }));
	});

	it("should determine if the transaction is a validator registration", () => {
		assert.true(TransactionTypeService.isValidatorRegistration({ data: "0x602a9eee" }));
		assert.false(TransactionTypeService.isValidatorRegistration({ data: "0x922a9eee" }));
	});

	it("should determine if the transaction is a vote", () => {
		assert.true(TransactionTypeService.isVote({ data: "0x6dd7d8ea" }));
		assert.false(TransactionTypeService.isVote({ data: "0x7dd8a8ea" }));
	});

	it("should determine if the transaction is a unvote", () => {
		assert.true(TransactionTypeService.isUnvote({ data: "0x3174b689" }));
		assert.false(TransactionTypeService.isUnvote({ data: "0x7244b689" }));
	});

	it("should determine if the transaction is a multi payment", () => {
		assert.true(TransactionTypeService.isMultiPayment({ data: "0x084ce708" }));
		assert.false(TransactionTypeService.isMultiPayment({ data: "0x58d695b2" }));
	});

	it("should determine if the transaction is a validator resignation", () => {
		assert.true(TransactionTypeService.isValidatorResignation({ data: "0xb85f5da2" }));
		assert.false(TransactionTypeService.isValidatorResignation({ data: "0x692a9eee" }));
	});
});

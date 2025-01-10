import { BigNumber } from "@ardenthq/sdk-helpers";
import { DateTime } from "@ardenthq/sdk-intl";
import { describe } from "@ardenthq/sdk-test";

import { createService } from "../test/mocking";
import { SignedTransactionData } from "./signed-transaction.dto.js";
import { parseUnits } from "./helpers/parse-units";

describe("SignedTransactionData", async ({ assert, beforeAll, it, nock, loader }) => {
	beforeAll(async (context) => {
		context.subject = await createService(SignedTransactionData);

		context.subject.configure(
			"309808271bac6852d1ec46f473187a0ad8dfc5716f329557db00b647fe388cd2",
			{
				data: "",
				gasLimit: 21000,
				gasPrice: 5,
				id: "309808271bac6852d1ec46f473187a0ad8dfc5716f329557db00b647fe388cd2",
				recipientAddress: "0x71c3377F6baF114A975A151c4685E600d13636F6",
				senderAddress: "0x71a5abB8A11E0D1e2937A8A51822B8f7d15286C0",
				senderPublicKey: "02f345c3958d21831e98b44fc3419a4be5fb09ec509444ae447e3b0af303da2aa9",
				timestamp: "1970-01-01T00:00:00.000Z",
				value: "12500000000000000",
			},
			"",
		);
	});

	it("should have a id", (context) => {
		assert.is(context.subject.id(), "309808271bac6852d1ec46f473187a0ad8dfc5716f329557db00b647fe388cd2");
	});

	it("should have a sender", (context) => {
		assert.is(context.subject.sender(), "0x71a5abB8A11E0D1e2937A8A51822B8f7d15286C0");
	});

	it("should have a recipient", (context) => {
		assert.is(context.subject.recipient(), "0x71c3377F6baF114A975A151c4685E600d13636F6");
	});

	it("should have an amount", (context) => {
		assert.equal(context.subject.amount(), BigNumber.make("12500000000000000"));
	});

	// @TODO: fix when MultiPayment implemented
	// it("should have an amount for MultiPayment", (context) => {
	// 	context.subject.configure(
	// 		"3e3817fd0c35bc36674f3874c2953fa3e35877cbcdb44a08bdc6083dbd39d572",
	// 		{
	// 			asset: {
	// 				payments: [
	// 					{
	// 						amount: "12500000000000000",
	// 						recipientId: "",
	// 					},
	// 					{
	// 						amount: "12500000000000000",
	// 						recipientId: "",
	// 					},
	// 				],
	// 			},
	// 			fee: "0",
	// 			id: "3e3817fd0c35bc36674f3874c2953fa3e35877cbcdb44a08bdc6083dbd39d572",
	// 			recipientId: "D6Z26L69gdk9qYmTv5uzk3uGepigtHY4ax",
	// 			senderPublicKey: "0208e6835a8f020cfad439c059b89addc1ce21f8cab0af6e6957e22d3720bff8a4",
	// 			timestamp: "1970-01-01T00:00:00.000Z",
	// 			type: 6,
	// 		},
	// 		"",
	// 	);
	//
	// 	assert.equal(context.subject.amount(), BigNumber.make("25000000000000000"));
	// });

	it("should have votes/unvotes", (context) => {
		context.subject.configure(
			"83951ebb85d9e7c99c801f56436646df0ea4d9d7f0e42bd34386a1cd41d13624",
			{
				amount: "0",
				blockId: "b7f31c95d2bf30dd5dc288131bdbe72e3dfb5afb14e845bc6e9876e9bf61ff1b",
				data: "0x6dd7d8ea000000000000000000000000c3bbe9b1cee1ff85ad72b87414b0e9b7f2366763",
				gasLimit: "200000",
				gasPrice: "5",
				id: "83951ebb85d9e7c99c801f56436646df0ea4d9d7f0e42bd34386a1cd41d13624",
				nonce: "1",
				recipient: "0x535B3D7A252fa034Ed71F0C53ec0C6F784cB64E1",
				senderAddress: "0x71c3377F6baF114A975A151c4685E600d13636F6",
				senderPublicKey: "0266e0fd7186193eda55e328184fdaab9f7d4a6c867c25ef03a497fd683cae7788",
				timestamp: 1_734_115_643_424,
				gasUsed: 149433,
			},
			"",
		);

		assert.equal(context.subject.votes(), ["0xC3bBE9B1CeE1ff85Ad72b87414B0E9B7F2366763"]);
	});

	it("should have a fee", (context) => {
		assert.equal(context.subject.fee(), parseUnits(BigNumber.make("1000000000000000").toString(), "gwei"));
	});

	it("should have a timestamp", (context) => {
		assert.true(DateTime.make(1_734_115_643_424).isSame(context.subject.timestamp()));
	});

	it("should have a timestamp even if the timestamp is missing", async () => {
		const subject = await createService(SignedTransactionData);
		subject.configure("", {}, "");
		assert.instance(subject.timestamp(), DateTime);
	});

	it("should determine if the transaction is a transfer", (context) => {
		assert.boolean(context.subject.isTransfer());
	});

	it("should determine if the transaction is a validator registration", (context) => {
		assert.boolean(context.subject.isDelegateRegistration());
	});

	it("should determine if the transaction is a vote", (context) => {
		assert.boolean(context.subject.isVote());
	});

	it("should determine if the transaction is a unvote", (context) => {
		assert.boolean(context.subject.isUnvote());
	});

	it("should determine if the transaction is a multi signature registration", (context) => {
		assert.boolean(context.subject.isMultiSignatureRegistration());
	});

	it("should determine if the transaction is a multi payment", (context) => {
		assert.boolean(context.subject.isMultiPayment());
	});

	it("should determine if the transaction is a validator resignation", (context) => {
		assert.boolean(context.subject.isDelegateResignation());
	});

	it("should determine if the transaction uses multi signature", (context) => {
		assert.boolean(context.subject.usesMultiSignature());
	});
});

import { IoC } from "@ardenthq/sdk";
import { BigNumber } from "@ardenthq/sdk-helpers";
import { DateTime } from "@ardenthq/sdk-intl";
import { describe } from "@ardenthq/sdk-test";

import TransferFixture from "../test/fixtures/client/transfer-transaction.json";
import UnvoteFixture from "../test/fixtures/client/unvote-transaction.json";
import ValidatorRegistrationFixture from "../test/fixtures/client/validator-registration-transaction.json";
import ValidatorResignationFixture from "../test/fixtures/client/validator-resignation-transaction.json";
import VoteFixture from "../test/fixtures/client/vote-transaction.json";
import { createService } from "../test/mocking";
import { AddressService } from "./address.service";
import { BindingType } from "./coin.contract";
import { ConfirmedTransactionData } from "./confirmed-transaction.dto.js";

const createSubject = async () =>
	await createService(ConfirmedTransactionData, "mainsail.devnet", function (container: IoC.Container) {
		if (container.missing(BindingType.AddressService)) {
			container.constant(BindingType.AddressService, new AddressService(container));
		}
	});

describe("ConfirmedTransactionData", async ({ assert, beforeEach, it, stub }) => {
	beforeEach(async (context) => {
		context.subject = await createSubject();
		context.subject.configure(TransferFixture.data);
	});

	it("should have an id", (context) => {
		assert.is(context.subject.id(), "6acfc98ee12df1b6d619254f92208e85d072e138df81d96483c0284b57e2f55f");
	});

	it("should have a blockId", (context) => {
		assert.is(context.subject.blockId(), "d595f2bdeae15bad821d4ddc70190269ae49646d4491082deb354f40bcb8da8e");
	});

	it("should have a timestamp", (context) => {
		assert.instance(context.subject.timestamp(), DateTime);
		assert.equal(context.subject.timestamp().toUNIX(), 1_740_153_890);
	});

	it("should have a number of confirmations", (context) => {
		assert.equal(context.subject.confirmations(), BigNumber.make(202));
	});

	it("should have a sender", (context) => {
		assert.is(context.subject.sender(), "0x71c3377F6baF114A975A151c4685E600d13636F6");
	});

	it("should have a recipient", (context) => {
		assert.is(context.subject.recipient(), "0x71c3377F6baF114A975A151c4685E600d13636F6");
	});

	// @TODO: fix when MultiPayment implemented
	// it("should have a list of recipients for multi payments", async (context) => {
	// 	assert.equal(context.subject.recipients(), []);
	//
	// 	context.subject = await createService(ConfirmedTransactionData);
	// 	context.subject.configure(MultipaymentFixtures.data[0]);
	// 	assert.length(context.subject.recipients(), 9);
	// });
	//
	// it("should have an amount", async (context) => {
	// 	assert.equal(context.subject.amount(), BigNumber.make("12500000000000000"));
	//
	// 	context.subject = await createService(ConfirmedTransactionData);
	// 	context.subject.configure(MultipaymentFixtures.data[0]);
	// 	assert.equal(context.subject.amount(), BigNumber.make("799999999"));
	// });
	//
	it("should have a fee", (context) => {
		assert.equal(context.subject.fee(), "0.000105");
	});

	it("should determine if the transaction is confirmed", (context) => {
		assert.true(context.subject.isConfirmed());
	});

	it("should be a return for transfers if sender equals recipient", (context) => {
		stub(context.subject, "isTransfer").returnValueOnce(true);
		stub(context.subject, "isSent").returnValueOnce(true);
		stub(context.subject, "isReceived").returnValueOnce(true);
		stub(context.subject, "recipient").returnValueOnce(context.subject.sender());

		assert.is(context.subject.isReturn(), true);
	});

	it("should not be a return for transfers if sender does not equal recipient", (context) => {
		stub(context.subject, "isTransfer").returnValueOnce(true);
		stub(context.subject, "isReceived").returnValueOnce(true);
		stub(context.subject, "recipient").returnValueOnce(context.subject.sender());

		assert.false(context.subject.isReturn());
	});

	// @TODO: fix when MultiPayment implemented
	// it("should be a return true for multipayments if sender is included in recipients", (context) => {
	// 	stub(context.subject, "isTransfer").returnValueOnce(false);
	// 	stub(context.subject, "isMultiPayment").returnValueOnce(true);
	// 	stub(context.subject, "recipients").returnValueOnce([
	// 		{ address: context.subject.sender(), amount: BigNumber.ZERO },
	// 	]);
	//
	// 	assert.is(context.subject.isReturn(), true);
	// });
	//
	// it("should not be a return for multipayments if sender is not included in recipients", (context) => {
	// 	stub(context.subject, "isTransfer").returnValueOnce(false);
	// 	stub(context.subject, "isMultiPayment").returnValueOnce(true);
	// 	stub(context.subject, "recipients").returnValueOnce([
	// 		{ address: context.subject.recipient(), amount: BigNumber.ZERO },
	// 	]);
	//
	// 	assert.false(context.subject.isReturn());
	// });

	it("should not be a return if transaction type is not 'transfer' or 'multiPayment'", (context) => {
		stub(context.subject, "isTransfer").returnValueOnce(false);
		stub(context.subject, "isMultiPayment").returnValueOnce(false);

		assert.false(context.subject.isReturn());
	});

	it("should determine if the transaction is sent", (context) => {
		assert.false(context.subject.isSent());
	});

	it("should determine if the transaction is received", (context) => {
		assert.false(context.subject.isReceived());
	});

	it("should determine if the transaction is a transfer", (context) => {
		assert.true(context.subject.isTransfer());
	});

	it("should determine if the transaction is a validator registration", (context) => {
		assert.false(context.subject.isValidatorRegistration());
	});

	it("should determine if the transaction is a vote", (context) => {
		assert.false(context.subject.isVote());
	});

	it("should determine if the transaction is a unvote", (context) => {
		assert.false(context.subject.isUnvote());
	});

	it("should determine if the transaction is a multi signature registration", (context) => {
		assert.false(context.subject.isMultiSignatureRegistration());
	});

	it("should determine if the transaction is a multi payment", (context) => {
		assert.false(context.subject.isMultiPayment());
	});

	it("should determine if the transaction is a validator resignation", (context) => {
		assert.false(context.subject.isValidatorResignation());
	});

	it("should turn into an object", (context) => {
		assert.object(context.subject.toObject());
	});

	it("should return the underlying data", (context) => {
		assert.equal(context.subject.raw(), TransferFixture.data);
	});

	it("should have a type", (context) => {
		assert.is(context.subject.type(), "transfer");
	});

	it("should have isSuccess", (context) => {
		assert.true(context.subject.isSuccess());
	});
});

describe("ConfirmedTransactionData - ValidatorRegistrationData", ({ assert, beforeEach, it, nock, loader }) => {
	beforeEach(async (context) => {
		context.subject = await createSubject();
		context.subject.configure(ValidatorRegistrationFixture.data);
	});

	it("should a validator public key", (context) => {
		assert.is(
			context.subject.validatorPublicKey(),
			"b19b6b95e7e38a9ec8aecc204b630f07a9170c68e035de758fc981783ccad8cc4181dbbd8ee916dcdb2438f29eb937ad",
		);
	});

	it("should have a type", (context) => {
		assert.is(context.subject.type(), "validatorRegistration");
	});
});

describe("ConfirmedTransactionData - ValidatorResignationData", ({ assert, beforeEach, it, nock, loader }) => {
	beforeEach(async (context) => {
		context.subject = await createSubject();
		context.subject.configure(ValidatorResignationFixture.data);
	});

	it("should have a type", (context) => {
		assert.is(context.subject.type(), "validatorResignation");
	});
});

// @TODO: fix when MultiPayment implemented
// describe("ConfirmedTransactionData - MultiPaymentData", ({ assert, beforeEach, it, nock, loader }) => {
// 	beforeEach(async (context) => {
// 		context.subject = await createService(ConfirmedTransactionData);
// 		context.subject.configure({
// 			asset: {
// 				payments: [
// 					{ amount: 10, to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9" },
// 					{ amount: 10, to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9" },
// 					{ amount: 10, to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9" },
// 				],
// 			},
// 			type: 6,
// 		});
// 	});
//
// 	it("should have a memo", (context) => {
// 		assert.undefined(context.subject.memo());
// 	});
//
// 	it("should have a list of payments", (context) => {
// 		assert.length(context.subject.payments(), 3);
// 	});
//
// 	it("should have a type", (context) => {
// 		assert.is(context.subject.type(), "multiPayment");
// 	});
// });

describe("ConfirmedTransactionData - VoteData", ({ assert, beforeEach, it, nock, loader }) => {
	beforeEach(async (context) => {
		context.subject = await createSubject();
		context.subject.configure(VoteFixture.data);
	});

	it("should have a list of votes", (context) => {
		assert.length(context.subject.votes(), 1);
		assert.is(context.subject.votes()[0], "0xC3bBE9B1CeE1ff85Ad72b87414B0E9B7F2366763");
	});

	it("should have a type", (context) => {
		assert.is(context.subject.type(), "vote");
	});
});

describe("ConfirmedTransactionData - UnvoteData", ({ assert, beforeEach, it, nock, loader }) => {
	beforeEach(async (context) => {
		context.subject = await createSubject();
		context.subject.configure(UnvoteFixture.data);
	});

	it("should have a type", (context) => {
		assert.is(context.subject.type(), "unvote");
	});
});

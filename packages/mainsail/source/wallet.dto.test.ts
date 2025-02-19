import { BigNumber } from "@ardenthq/sdk-helpers";
import { describe } from "@ardenthq/sdk-test";

import { createService } from "../test/mocking";
import { WalletData } from "./wallet.dto.js";

for (const network of ["devnet"]) {
	describe(`WalletData - ${network}`, ({ assert, beforeEach, it, nock, loader }) => {
		const WalletDataFixture = {
			devnet: {
				address: "0x7AF9d8582F439ECC9d83c84a425DFbA422bc7a84",
				attributes: {
					validatorApproval: 0.0189,
					validatorForgedFees: "515",
					validatorForgedRewards: "1000000000000000102",
					validatorForgedTotal: "1000000000000000617",
					validatorLastBlock: {
						height: 194_405,
						id: "5da85131f1495972df05204f8c15f6bf0f7b976e7e0313a5d39d981230a15445",
						timestamp: 1_734_356_107_424,
					},
					validatorProducedBlocks: 3669,
					validatorPublicKey:
						"b6ce18e6d4a21fdf469a45c5299ae7e20b64f4bb2d077aa7bb0d315f844dbfeefb262064e49516f1d0d1dc9260fd0edd",
					validatorRank: 17,
					validatorResigned: false,
					validatorVoteBalance: "2362976566037735849161603",
					validatorVotersCount: 1,
					vote: "0x7AF9d8582F439ECC9d83c84a425DFbA422bc7a84",
				},
				balance: "2362976566037735849161603",
				nonce: "2",
				publicKey: "03a9927b2d4e5481abffb44c3362fafe54a295057224909d6cc9d8674a7a2ad2c6",
			},
		};

		beforeEach(async (context) => {
			context.subject = (await createService(WalletData)).fill(WalletDataFixture[network]);
		});

		it("should have a primary key", (context) => {
			assert.is(context.subject.primaryKey(), "0x7AF9d8582F439ECC9d83c84a425DFbA422bc7a84");
		});

		it("should have a address", (context) => {
			assert.is(context.subject.address(), "0x7AF9d8582F439ECC9d83c84a425DFbA422bc7a84");
		});

		it("should have a public key", (context) => {
			assert.is(
				context.subject.publicKey(),
				"03a9927b2d4e5481abffb44c3362fafe54a295057224909d6cc9d8674a7a2ad2c6",
			);
		});

		it("should have a balance", (context) => {
			assert.equal(context.subject.balance().available, BigNumber.make("2362976566037735849161603"));
		});

		it("should have a nonce", (context) => {
			assert.equal(context.subject.nonce(), BigNumber.make("2"));
		});

		it("should have a secondary public key", (context) => {
			assert.undefined(context.subject.secondPublicKey());
		});

		// @TODO enable when username is implemented https://app.clickup.com/t/86dveqxwz
		// it("should have a username", (context) => {
		// 	assert.is(context.subject.username(), "arkx");
		// });

		it("should have a rank", (context) => {
			assert.is(context.subject.rank(), 17);
		});

		it("should have a votes", (context) => {
			assert.equal(context.subject.votes(), BigNumber.make("2362976566037735849161603"));
		});

		it("should determine if it is a resigned validator", async (context) => {
			context.subject = (await createService(WalletData)).fill({
				...WalletDataFixture.devnet,
				attributes: {
					...WalletDataFixture.devnet.attributes,
					validatorResigned: true,
				},
			});

			assert.false(context.subject.isValidator());
		});

		it("should determine if it is a resigned delegate", (context) => {
			assert.boolean(context.subject.isResignedDelegate());
		});

		it("should determine if it is a multi signature", (context) => {
			assert.boolean(context.subject.isMultiSignature());
		});

		it("should turn into a normalised object", (context) => {
			assert.object(context.subject.toObject());
		});
	});
}

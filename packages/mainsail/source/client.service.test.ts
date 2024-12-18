import { IoC, Services } from "@ardenthq/sdk";
import { describe } from "@ardenthq/sdk-test";

import { createService } from "../test/mocking";
import { AddressService } from "./address.service";
import { ClientService } from "./client.service.js";
import { BindingType } from "./coin.contract";
import { ConfirmedTransactionData } from "./confirmed-transaction.dto.js";
import { SignedTransactionData } from "./signed-transaction.dto.js";
import { WalletData } from "./wallet.dto.js";

describe("ClientService", async ({ assert, nock, beforeEach, it, loader }) => {
	beforeEach(async (context) => {
		context.subject = await createService(ClientService, undefined, (container) => {
			container.constant(IoC.BindingType.Container, container);
			container.constant(IoC.BindingType.DataTransferObjects, {
				ConfirmedTransactionData,
				SignedTransactionData,
				WalletData,
			});
			container.singleton(IoC.BindingType.DataTransferObjectService, Services.AbstractDataTransferObjectService);
			container.constant(BindingType.AddressService, new AddressService(container));
		});
	});

	it("should retrieve a transaction", async (context) => {
		nock.fake(/.+/)
			.get("/api/transactions/7beec0fead3860a677eb28c943a400b1d841666b6d3f3254d887290193be1fc7")
			.reply(200, loader.json(`test/fixtures/client/transfer-transaction.json`));

		const result = await context.subject.transaction(
			"7beec0fead3860a677eb28c943a400b1d841666b6d3f3254d887290193be1fc7",
		);

		assert.instance(result, ConfirmedTransactionData);
	});

	it("should retrieve a list of transactions for a single address", async (context) => {
		nock.fake(/.+/)
			.get("/api/wallets")
			.query({ limit: 1, nonce: 0 })
			.reply(200, {})
			.get("/api/transactions")
			.query({ address: "0x71c3377F6baF114A975A151c4685E600d13636F6" })
			.reply(200, loader.json(`test/fixtures/client/transactions.json`));

		const result = await context.subject.transactions({
			identifiers: [{ type: "address", value: "0x71c3377F6baF114A975A151c4685E600d13636F6" }],
		});

		assert.object(result);
		assert.instance(result.items()[0], ConfirmedTransactionData);
	});

	it("should retrieve a list of transactions for multiple addresses", async (context) => {
		nock.fake(/.+/)
			.get("/api/wallets")
			.query({ limit: 1, nonce: 0 })
			.reply(200, {})
			.get("/api/transactions")
			.query({ address: "0x71c3377F6baF114A975A151c4685E600d13636F6,0x71a5abB8A11E0D1e2937A8A51822B8f7d15286C0" })
			.reply(200, loader.json(`test/fixtures/client/transactions.json`));

		const result = await context.subject.transactions({
			identifiers: [
				{ type: "address", value: "0x71c3377F6baF114A975A151c4685E600d13636F6" },
				{ type: "address", value: "0x71a5abB8A11E0D1e2937A8A51822B8f7d15286C0" },
			],
		});

		assert.object(result);
		assert.instance(result.items()[0], ConfirmedTransactionData);
	});

	it("should retrieve a list of transactions for an advanced search", async (context) => {
		nock.fake(/.+/)
			.get("/api/wallets")
			.query({ limit: 1, nonce: 0 })
			.reply(200, {})
			.get("/api/transactions")
			.query({
				address: "0x71c3377F6baF114A975A151c4685E600d13636F6",
				data: "",
			})
			.reply(200, loader.json(`test/fixtures/client/transactions.json`));

		const result = await context.subject.transactions({
			identifiers: [{ type: "address", value: "0x71c3377F6baF114A975A151c4685E600d13636F6" }],
			type: "transfer",
		});

		assert.object(result);
		assert.instance(result.items()[0], ConfirmedTransactionData);
	});

	it("should retrieve a list of transactions for an advanced search including timestamp", async (context) => {
		nock.fake(/.+/)
			.get("/api/wallets")
			.query({ limit: 1, nonce: 0 })
			.reply(200, {})
			.get("/api/transactions")
			.query({
				address: "0x71c3377F6baF114A975A151c4685E600d13636F6",
				data: "",
				"timestamp.from": 22076698,
				"timestamp.to": 31235098,
			})
			.reply(200, loader.json(`test/fixtures/client/transactions.json`));

		const result = await context.subject.transactions({
			identifiers: [{ type: "address", value: "0x71c3377F6baF114A975A151c4685E600d13636F6" }],
			timestamp: { from: 1725193498, to: 1734351898 },
			type: "transfer",
		});

		assert.object(result);
		assert.instance(result.items()[0], ConfirmedTransactionData);
	});

	it("should retrieve a wallet", async (context) => {
		nock.fake(/.+/)
			.get("/api/wallets/0x71c3377F6baF114A975A151c4685E600d13636F6")
			.reply(200, loader.json(`test/fixtures/client/wallet.json`));

		const result = await context.subject.wallet({
			type: "address",
			value: "0x71c3377F6baF114A975A151c4685E600d13636F6",
		});

		assert.instance(result, WalletData);
	});

	it("should retrieve a list of wallets", async (context) => {
		nock.fake(/.+/)
			.get("/api/wallets")
			.query({ limit: 1, nonce: 0 })
			.reply(200, {})
			.get("/api/wallets")
			.query({ address: "0x71c3377F6baF114A975A151c4685E600d13636F6" })
			.reply(200, loader.json(`test/fixtures/client/wallets.json`));

		const result = await context.subject.wallets({
			identifiers: [{ type: "address", value: "0x71c3377F6baF114A975A151c4685E600d13636F6" }],
		});

		assert.object(result);
		assert.instance(result.items()[0], WalletData);
	});

	it("should retrieve a validator", async (context) => {
		nock.fake(/.+/)
			.get("/api/delegates/0x7AF9d8582F439ECC9d83c84a425DFbA422bc7a84")
			.reply(200, loader.json(`test/fixtures/client/validator.json`));

		const result = await context.subject.delegate("0x7AF9d8582F439ECC9d83c84a425DFbA422bc7a84");

		assert.instance(result, WalletData);
	});

	it("should retrieve a list of validators", async (context) => {
		nock.fake(/.+/).get("/api/delegates").reply(200, loader.json(`test/fixtures/client/validators.json`));

		const result = await context.subject.delegates();

		assert.object(result);
		assert.instance(result.items()[0], WalletData);
	});

	it("should retrieve votes of a wallet", async (context) => {
		const fixture = loader.json(`test/fixtures/client/wallet.json`);

		nock.fake(/.+/).get("/api/wallets/0x7AF9d8582F439ECC9d83c84a425DFbA422bc7a84").reply(200, fixture);

		const result = await context.subject.votes("0x7AF9d8582F439ECC9d83c84a425DFbA422bc7a84");

		assert.object(result);
		assert.is(result.used, 1);
		assert.is(result.available, 0);
		assert.array(result.votes);
	});

	it("should retrieve votes of a wallet without a vote", async (context) => {
		const fixture = loader.json(`test/fixtures/client/wallet.json`);

		const fixtureWithoutVote = {
			data: {
				...fixture.data,
				attributes: {
					...fixture.data.attributes,
					vote: undefined,
				},
				vote: undefined,
			},
		};

		nock.fake(/.+/).get("/api/wallets/0x7AF9d8582F439ECC9d83c84a425DFbA422bc7a84").reply(200, fixtureWithoutVote);

		const result = await context.subject.votes("0x7AF9d8582F439ECC9d83c84a425DFbA422bc7a84");

		assert.object(result);
		assert.is(result.used, 0);
		assert.is(result.available, 1);
		assert.array(result.votes);
	});

	it("should retrieve votes of a wallet without attributes when not voting", async (context) => {
		const fixture = loader.json(`test/fixtures/client/wallet.json`);

		const fixtureWithoutVote = {
			data: {
				...fixture.data,
				attributes: undefined,
				vote: undefined,
			},
		};

		nock.fake(/.+/).get("/api/wallets/0x7AF9d8582F439ECC9d83c84a425DFbA422bc7a84").reply(200, fixtureWithoutVote);

		const result = await context.subject.votes("0x7AF9d8582F439ECC9d83c84a425DFbA422bc7a84");

		assert.object(result);
		assert.is(result.used, 0);
		assert.is(result.available, 1);
		assert.array(result.votes);
	});

	it("should retrieve votes of a wallet without attributes", async (context) => {
		const fixture = loader.json(`test/fixtures/client/wallet.json`);

		const fixtureWithoutVote = {
			data: {
				...fixture.data,
				attributes: undefined,
			},
		};

		nock.fake(/.+/).get("/api/wallets/0x7AF9d8582F439ECC9d83c84a425DFbA422bc7a84").reply(200, fixtureWithoutVote);

		const result = await context.subject.votes("0x7AF9d8582F439ECC9d83c84a425DFbA422bc7a84");

		assert.object(result);
		assert.is(result.used, 0);
		assert.is(result.available, 1);
		assert.array(result.votes);
	});

	it("should retrieve a list of voters", async (context) => {
		nock.fake(/.+/)
			.get("/api/delegates/0x7AF9d8582F439ECC9d83c84a425DFbA422bc7a84/voters")
			.reply(200, loader.json(`test/fixtures/client/voters.json`));

		const result = await context.subject.voters("0x7AF9d8582F439ECC9d83c84a425DFbA422bc7a84");

		assert.object(result);
		assert.instance(result.items()[0], WalletData);
	});

	it("should broadcast and accept 1 transaction and reject 1 transaction", async (context) => {
		const fixture = loader.json(`test/fixtures/client/broadcast.json`);
		nock.fake(/.+/).post("/tx/api/transactions").reply(422, fixture);

		const accepted = { id: () => "accepted-tx", toBroadcast: () => "" };
		const failed = { id: () => "failed-tx", toBroadcast: () => "" };
		const result = await context.subject.broadcast([accepted, failed]);

		assert.equal(result, {
			accepted: ["accepted-tx"],
			rejected: ["failed-tx"],
			errors: {
				"1": "tx 123 cannot be applied",
			},
		});
	});

	it("should broadcast and read errors in non-array format", async (context) => {
		const fixture = loader.json(`test/fixtures/client/broadcast.json`);
		const errorId = Object.keys(fixture.errors)[0];
		const nonArrayFixture = {
			data: fixture.data,
			errors: { [errorId]: fixture.errors[errorId][0] },
		};

		nock.fake(/.+/).post("/tx/api/transactions").reply(422, nonArrayFixture);

		const accepted = { id: () => "accepted-tx", toBroadcast: () => "" };
		const failed = { id: () => "failed-tx", toBroadcast: () => "" };
		const result = await context.subject.broadcast([accepted, failed]);

		assert.equal(result, {
			accepted: ["accepted-tx"],
			rejected: ["failed-tx"],
			errors: {
				"1": "tx 123 cannot be applied",
			},
		});
	});
});

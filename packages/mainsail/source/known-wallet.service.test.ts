import { describe } from "@ardenthq/sdk-test";
import { Coins, IoC } from "@ardenthq/sdk";

import { createService } from "../test/mocking";
import { KnownWalletService } from "./known-wallet.service.js";

describe("KnownWalletService", async ({ assert, beforeAll, it, nock }) => {
	beforeAll(async (context) => {
		context.subject = await createService(KnownWalletService);
	});

	it("should return a list of known wallets if the request succeeds", async (context) => {
		const wallets = [
			{
				type: "team",
				name: "ACF Hot Wallet",
				address: "0x522B3294E6d06aA25Ad0f1B8891242E335D3B459",
			},
			{
				type: "team",
				name: "ACF Hot Wallet (old)",
				address: "0xA5cc0BfEB09742C5e4C610f2EBaaB82Eb142Ca10",
			},
		];

		nock.fake("https://raw.githubusercontent.com")
			.get("/ArkEcosystem/common/master/devnet/known-wallets-extended.json")
			.reply(200, wallets);

		assert.equal(await context.subject.all(), wallets);
	});

	it("should return an empty list if the request fails", async (context) => {
		nock.fake("https://raw.githubusercontent.com")
			.get("/ArkEcosystem/common/master/devnet/known-wallets-extended.json")
			.reply(404);

		assert.equal(await context.subject.all(), []);
	});

	it("should return an empty list if the request response is not an array", async (context) => {
		nock.fake("https://raw.githubusercontent.com")
			.get("/ArkEcosystem/common/master/devnet/known-wallets-extended.json")
			.reply(200, {});

		assert.equal(await context.subject.all(), []);
	});

	it("should return an empty list if the source is empty", async (context) => {
		context.subject = await createService(KnownWalletService, undefined, async (container) => {
			container.get(IoC.BindingType.ConfigRepository).forget(Coins.ConfigKey.KnownWallets);
		});

		assert.equal(await context.subject.all(), []);
	});
});

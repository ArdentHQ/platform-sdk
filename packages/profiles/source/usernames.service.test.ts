import { describe } from "@ardenthq/sdk-test";

import { bootContainer } from "../test/mocking";
import { Profile } from "./profile.js";
import { UsernamesService } from "./usernames.service.js";

describe("UsernamesService", ({ assert, beforeEach, afterEach, it, nock, loader }) => {
	let subject: UsernamesService;

	beforeEach(async () => {
		bootContainer();

		nock.fake()
			.get("/api/node/configuration")
			.reply(200, loader.json("test/fixtures/client/configuration.json"))
			.get("/api/peers")
			.reply(200, loader.json("test/fixtures/client/peers.json"))
			.get("/api/node/configuration/crypto")
			.reply(200, loader.json("test/fixtures/client/cryptoConfiguration.json"))
			.get("/api/node/syncing")
			.reply(200, loader.json("test/fixtures/client/syncing.json"))
			.post("/evm/api")
			.reply(200, {
				id: 1,
				jsonrpc: "2.0",
				result: "0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000200000000000000000000000093485b57ff3ded81430d08579142fae8234c6a1700000000000000000000000000000000000000000000000000000000000000400000000000000000000000006f0182a0cc707b055322ccf6d4cb6a5aff1aeb22000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000057465737431000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f74657374696e67757365726e616d650000000000000000000000000000000000",
			})
			.persist();

		const profile = new Profile({ avatar: "avatar", data: "", id: "uuid", name: "name" });
		await profile.coins().set("Mainsail", "mainsail.devnet").__construct();

		subject = new UsernamesService();

		const addresses = ["0x93485b57ff3DeD81430D08579142fAe8234c6A17", "0x6F0182a0cc707b055322CcF6d4CB6a5Aff1aEb22"];
		await subject.syncUsernames(profile, "Mainsail", "mainsail.devnet", addresses);
	});

	afterEach(() => nock.cleanAll());

	it("#username should succeed", async () => {
		assert.is(subject.username("mainsail.devnet", "0x93485b57ff3DeD81430D08579142fAe8234c6A17"), "test1");
		assert.is(subject.username("mainsail.devnet", "0x6F0182a0cc707b055322CcF6d4CB6a5Aff1aEb22"), "testingusername");
		assert.is(subject.username("mainsail.devnet", "0xUnknownAddress"), undefined);
	});

	it("#has should succeed", async () => {
		assert.true(subject.has("mainsail.devnet", "0x93485b57ff3DeD81430D08579142fAe8234c6A17"));
		assert.true(subject.has("mainsail.devnet", "0x6F0182a0cc707b055322CcF6d4CB6a5Aff1aEb22"));
		assert.false(subject.has("mainsail.devnet", "0xUnknownAddress"));
	});
});

import { Services } from "@ardenthq/sdk";
import { describe } from "@ardenthq/sdk-test";

import { createService } from "../test/mocking";

describe("LinkService", ({ assert, it }) => {
	it("should generate a link for a block on a [ark.mainnet] explorer", async () => {
		const subject = await createService(Services.AbstractLinkService, "ark.mainnet");

		assert.is(subject.block("id"), "https://explorer.ark.io/blocks/id");
	});

	it("should generate a link for a transaction on a [ark.mainnet] explorer", async () => {
		const subject = await createService(Services.AbstractLinkService, "ark.mainnet");

		assert.is(subject.transaction("id"), "https://explorer.ark.io/transactions/id");
	});

	it("should generate a link for a wallet on a [ark.mainnet] explorer", async () => {
		const subject = await createService(Services.AbstractLinkService, "ark.mainnet");

		assert.is(subject.wallet("id"), "https://explorer.ark.io/wallets/id");
	});

	it("should generate a link for a block on a [ark.devnet] explorer", async () => {
		const subject = await createService(Services.AbstractLinkService, "ark.devnet");

		assert.is(subject.block("id"), "https://dexplorer.ark.io/blocks/id");
	});

	it("should generate a link for a transaction on a [ark.devnet] explorer", async () => {
		const subject = await createService(Services.AbstractLinkService, "ark.devnet");

		assert.is(subject.transaction("id"), "https://dexplorer.ark.io/transactions/id");
	});

	it("should generate a link for a wallet on a [ark.devnet] explorer", async () => {
		const subject = await createService(Services.AbstractLinkService, "ark.devnet");

		assert.is(subject.wallet("id"), "https://dexplorer.ark.io/wallets/id");
	});
});

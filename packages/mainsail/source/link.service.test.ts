import { Services } from "@ardenthq/sdk";
import { describe } from "@ardenthq/sdk-test";

import { createService } from "../test/mocking";

describe("LinkService", ({ assert, it }) => {
	it("should generate a link for a block on a [mainsail.mainnet] explorer", async () => {
		const subject = await createService(Services.AbstractLinkService, "mainsail.mainnet");

		assert.is(subject.block("id"), "https://live.arkscan.io/blocks/id");
	});

	it("should generate a link for a transaction on a [mainsail.mainnet] explorer", async () => {
		const subject = await createService(Services.AbstractLinkService, "mainsail.mainnet");

		assert.is(subject.transaction("id"), "https://live.arkscan.io/transactions/id");
	});

	it("should generate a link for a wallet on a [mainsail.mainnet] explorer", async () => {
		const subject = await createService(Services.AbstractLinkService, "mainsail.mainnet");

		assert.is(subject.wallet("id"), "https://live.arkscan.io/addresses/id");
	});

	it("should generate a link for a block on a [mainsail.devnet] explorer", async () => {
		const subject = await createService(Services.AbstractLinkService, "mainsail.devnet");

		assert.is(subject.block("id"), "https://explorer-evm-test.mainsailhq.com/blocks/id");
	});

	it("should generate a link for a transaction on a [mainsail.devnet] explorer", async () => {
		const subject = await createService(Services.AbstractLinkService, "mainsail.devnet");

		assert.is(subject.transaction("id"), "https://explorer-evm-test.mainsailhq.com/transactions/id");
	});

	it("should generate a link for a wallet on a [mainsail.devnet] explorer", async () => {
		const subject = await createService(Services.AbstractLinkService, "mainsail.devnet");

		assert.is(subject.wallet("id"), "https://explorer-evm-test.mainsailhq.com/addresses/id");
	});
});

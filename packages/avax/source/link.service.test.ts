import { describe } from "@ardenthq/sdk-test";
import { Services } from "@ardenthq/sdk";

import { createService } from "../test/mocking";

describe("LinkService", async ({ assert, beforeAll, it, nock, loader }) => {
	beforeAll(async (context) => {
		context.subject = await createService(Services.AbstractLinkService);
	});

	it("should generate a link for a block", async (context) => {
		assert.is(context.subject.block("id"), "https://explorer.avax-test.network/block/id");
	});

	it("should generate a link for a transaction", async (context) => {
		assert.is(context.subject.transaction("id"), "https://explorer.avax-test.network/tx/id");
	});

	it("should generate a link for a wallet", async (context) => {
		assert.is(context.subject.wallet("id"), "https://explorer.avax-test.network/address/id");
	});
});

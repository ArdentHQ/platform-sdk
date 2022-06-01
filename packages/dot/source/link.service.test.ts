import { describe } from "@ardenthq/sdk-test";
import { Services } from "@ardenthq/sdk";

import { createService } from "../test/mocking";

describe("LinkService", async ({ beforeAll, assert, it, nock, loader }) => {
	beforeAll(async (context) => {
		context.subject = await createService(Services.AbstractLinkService);
	});

	it("should generate a link for a block", (context) => {
		assert.is(context.subject.block("id"), "https://polkascan.io/polkadot/block/id");
	});

	it("should generate a link for a transaction", (context) => {
		assert.is(context.subject.transaction("id"), "https://polkascan.io/polkadot/tx/id");
	});

	it("should generate a link for a wallet", (context) => {
		assert.is(context.subject.wallet("id"), "https://polkascan.io/polkadot/address/id");
	});
});

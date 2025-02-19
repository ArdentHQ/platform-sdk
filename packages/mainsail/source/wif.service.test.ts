import { describe } from "@ardenthq/sdk-test";

import { identity, identityWithSecret } from "../test/fixtures/identity";
import { createService } from "../test/mocking";
import { WIFService } from "./wif.service.js";

describe("WIFService", ({ assert, beforeEach, it, nock, loader }) => {
	beforeEach(async (context) => {
		context.subject = await createService(WIFService);
	});

	it("fromMnemonic", async (context) => {
		const result = await context.subject.fromMnemonic(identity.mnemonic);

		assert.equal(result, { wif: identity.wif });
	});

	it("fromSecret", async (context) => {
		const result = await context.subject.fromSecret(identityWithSecret.secret);

		assert.equal(result, { wif: identityWithSecret.wif });
	});

	it("fromPrivateKey", async (context) => {
		const result = await context.subject.fromPrivateKey(identity.privateKey);

		assert.equal(result, { wif: identity.wif });
	});
});

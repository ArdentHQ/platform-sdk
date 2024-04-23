import { describe } from "@ardenthq/sdk-test";
import { identity } from "../test/fixtures/identity";
import { createService } from "../test/mocking";
import { PrivateKeyService } from "./private-key.service.js";

describe("PrivateKeyService", async ({ beforeEach, it, assert }) => {
	beforeEach(async (context) => {
		context.subject = await createService(PrivateKeyService);
	});

	it("should generate an output from a mnemonic", async (context) => {
		assert.equal(await context.subject.fromMnemonic(identity.mnemonic), { privateKey: identity.privateKey });
	});

	it("should generate an output from a wif", async (context) => {
		assert.equal(await context.subject.fromWIF(identity.wif), { privateKey: identity.privateKey });
	});
});
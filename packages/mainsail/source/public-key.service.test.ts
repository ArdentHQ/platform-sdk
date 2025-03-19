import { PublicKeyService } from "./public-key.service.js";
import { createService } from "../test/mocking";
import { describe } from "@ardenthq/sdk-test";
import { identity } from "../test/fixtures/identity";

describe("PublicKeyService", async ({ assert, beforeEach, it, nock, loader }) => {
	beforeEach(async (context) => {
		context.subject = await createService(PublicKeyService);
	});

	it("should generate an output from a mnemonic", async (context) => {
		const result = await context.subject.fromMnemonic(identity.mnemonic);

		assert.equal(result, { publicKey: identity.publicKey });
	});

	it("should generate an output from a mnemonic given a custom locale", async (context) => {
		const result = await context.subject.fromMnemonic(identity.mnemonic);

		assert.equal(result, { publicKey: identity.publicKey });
	});

	it("should fail to generate an output from an invalid mnemonic", async (context) => {
		await assert.rejects(() => context.subject.fromMnemonic());
	});

	it("should fail to generate an output from a multiSignature", async (context) => {
		await assert.rejects(() => context.subject.fromMultiSignature(-1, []));
	});

	// it("should generate an output from a wif", async (context) => {
	// 	const result = await context.subject.fromWIF(identity.wif);

	// 	assert.equal(result, { publicKey: identity.publicKey });
	// });

	// it("should fail to generate an output from a wif", async (context) => {
	// 	await assert.rejects(() => context.subject.fromWIF());
	// });

	it("should generate an output from a secret", async (context) => {
		await assert.rejects(
			() => context.subject.fromSecret(identity.mnemonic),
			"The given value is BIP39 compliant. Please use [fromMnemonic] instead.",
		);

		const result = await context.subject.fromSecret("abc");

		assert.equal(result, { publicKey: "0223542d61708e3fc48ba78fbe8fcc983ba94a520bc33f82b8e45e51dbc47af272" });
	});

	it("should fail to generate an output from a secret", async (context) => {
		await assert.rejects(() => context.subject.fromSecret());
	});
});

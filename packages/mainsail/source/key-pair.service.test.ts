import { describe } from "@ardenthq/sdk-test";
import { identity } from "../test/fixtures/identity";
import { createService } from "../test/mocking";
import { KeyPairService } from "./key-pair.service.js";

describe("AddressService", async ({ assert, beforeEach, it, nock, loader }) => {
	beforeEach(async (context) => {
		context.subject = await createService(KeyPairService);
	});

	it("should generate an output from a mnemonic", async (context) => {
		const result = await context.subject.fromMnemonic(identity.mnemonic);

		assert.equal(result, {
			privateKey: identity.privateKey,
			publicKey: identity.publicKey,
		});
	});

	it("should generate an output from a mnemonic given a custom locale", async (context) => {
		const result = await context.subject.fromMnemonic(identity.mnemonic);

		assert.equal(result, {
			privateKey: identity.privateKey,
			publicKey: identity.publicKey,
		});
	});

	it("should fail to generate an output from an invalid mnemonic", async (context) => {
		await assert.rejects(() => context.subject.fromMnemonic(undefined));
	});

	it("should generate an output from a wif", async (context) => {
		const result = await context.subject.fromWIF(identity.wif);

		assert.equal(result, {
			privateKey: identity.privateKey,
			publicKey: identity.publicKey,
		});
	});

	it("should fail to generate an output from an invalid wif", async (context) => {
		await assert.rejects(() => context.subject.fromWIF(undefined));
	});

	it("should generate an output from a secret", async (context) => {
		await assert.rejects(
			() => context.subject.fromSecret(identity.mnemonic),
			"The given value is BIP39 compliant. Please use [fromMnemonic] instead.",
		);

		const result = await context.subject.fromSecret("abc");

		assert.equal(result, {
			privateKey: "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
			publicKey: "0223542d61708e3fc48ba78fbe8fcc983ba94a520bc33f82b8e45e51dbc47af272",
		});
	});

	it("should fail to generate an output from an invalid wif", async (context) => {
		await assert.rejects(() => context.subject.fromSecret(undefined));
	});
});

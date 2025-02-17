import { Signatories } from "@ardenthq/sdk";
import { describe } from "@ardenthq/sdk-test";

import { identity } from "../test/fixtures/identity";
import { createService } from "../test/mocking";
import { MessageService } from "./message.service.js";

describe("MessageService", async ({ assert, beforeEach, it, nock, loader }) => {
	beforeEach(async (context) => {
		context.subject = await createService(MessageService);
	});

	it("should sign and verify a message", async (context) => {
		const result = await context.subject.sign({
			message: "Hello World",
			signatory: new Signatories.Signatory(
				new Signatories.MnemonicSignatory({
					address: identity.address,
					privateKey: identity.privateKey,
					publicKey: identity.publicKey,
					signingKey: identity.mnemonic,
				}),
			),
		});

		assert.true(await context.subject.verify(result));
		await assert.rejects(() => context.subject.verify({}));
	});

	it("shouldn't sign and verify an invalid message", async (context) => {
		await assert.rejects(() => context.subject.sign({}));
	});
});

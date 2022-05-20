import { describe } from "@ardenthq/sdk-test";
import { Signatories } from "@ardenthq/sdk";

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
					signingKey: identity.mnemonic,
					address: identity.address,
					publicKey: identity.publicKey,
					privateKey: identity.privateKey,
				}),
			),
		});

		assert.true(await context.subject.verify(result));
	});
});

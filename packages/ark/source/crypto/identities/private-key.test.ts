import { describe } from "@ardenthq/sdk-test";

import { data, passphrase } from "../../../test/crypto/identity.json" with { type: "json" };
import { PrivateKey } from "./private-key.js";

describe("Private Key", ({ assert, it }) => {
	it("fromPassphrase", () => {
		assert.is(PrivateKey.fromPassphrase(passphrase), data.privateKey);
	});

	it("fromWIF", () => {
		assert.is(PrivateKey.fromWIF(data.wif), data.privateKey);
	});
});

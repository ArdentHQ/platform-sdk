import { describe } from "@ardenthq/sdk-test";

import { data, passphrase } from "../../../test/crypto/identity.json" with { type: "json" };
import { Keys } from "./keys.js";
import { WIF } from "./wif.js";

describe("WIF", ({ assert, it }) => {
	it("fromPassphrase", () => {
		assert.is(WIF.fromPassphrase(passphrase), data.wif);
	});

	it("fromKeys", () => {
		assert.is(WIF.fromKeys(Keys.fromPassphrase(passphrase)), data.wif);
	});
});

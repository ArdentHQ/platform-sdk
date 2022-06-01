import { describe } from "@ardenthq/sdk-test";

import { createService } from "../test/mocking";
import { FeeService } from "./fee.service.js";

describe("FeeService", async ({ beforeAll, afterEach, it, assert, nock }) => {
	beforeAll(() => nock.disableNetConnect());

	afterEach(() => nock.cleanAll());

	it("should get the fees", async () => {
		nock.fake("https://btc-test.arkvault.io:443")
			.get("/api/fees")
			.reply(200, {
				data: {
					avg: 0.000_010_74,
					max: 0.001_806_17,
					min: 0.000_010_74,
				},
			});

		const result = await (await createService(FeeService, "btc.testnet")).all();

		assert.containKeys(result, [
			"transfer",
			"secondSignature",
			"delegateRegistration",
			"vote",
			"multiSignature",
			"ipfs",
			"multiPayment",
			"delegateResignation",
		]);

		for (const [name, transaction] of Object.entries({
			fees_delegate_registration: result.delegateRegistration,
			fees_delegate_resignation: result.delegateResignation,
			fees_ipfs: result.ipfs,
			fees_multi_payment: result.multiPayment,
			fees_multi_signature: result.multiSignature,
			fees_second_signature: result.secondSignature,
			fees_transfer: result.transfer,
			fees_vote: result.vote,
		})) {
			assert.snapshot(name, {
				avg: transaction.avg,
				max: transaction.max,
				min: transaction.min,
				static: transaction.static,
			});
		}
	});
});

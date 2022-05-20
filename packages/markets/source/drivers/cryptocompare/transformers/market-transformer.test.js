import { describeWithContext } from "@ardenthq/sdk-test";

import { MarketTransformer } from "./market-transformer";

describeWithContext(
	"MarketTransformer",
	{ stubOptions: { type: "day", dateFormat: "DD.MM", token: "ARK" } },
	async ({ assert, it, nock, loader }) => {
		it("should transform the given data", async (context) => {
			const stubResponse = loader.json("test/fixtures/cryptocompare/market.json");

			const subject = new MarketTransformer(stubResponse.RAW.ARK);

			assert.object(subject.transform(context.stubOptions));
		});
	},
);

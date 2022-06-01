import { describe } from "@ardenthq/sdk-test";

import { HistoricalVolumeTransformer } from "./historical-volume-transformer";

describe("HistoricalVolumeTransformer", async ({ assert, it, nock, loader }) => {
	it("should transform the given data", async () => {
		const stubOptions = { type: "day", dateFormat: "DD.MM" };
		const stubResponse = loader.json("test/fixtures/coingecko/historical-volume.json");

		const subject = new HistoricalVolumeTransformer(stubResponse);

		assert.object(subject.transform(stubOptions));
	});
});

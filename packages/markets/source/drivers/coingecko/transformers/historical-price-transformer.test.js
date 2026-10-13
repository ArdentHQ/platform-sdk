import { describe } from "@ardenthq/sdk-test";

import { HistoricalPriceTransformer } from "./historical-price-transformer";

const DAY = 24 * 60 * 60 * 1000;
const HOUR = 60 * 60 * 1000;
const START = Date.UTC(2025, 9, 14);

describe("HistoricalPriceTransformer", async ({ assert, it, nock, loader }) => {
	it("should transform the given data", async () => {
		const stubResponse = loader.json("test/fixtures/coingecko/historical.json");
		const stubOptions = { type: "day", dateFormat: "DD.MM" };

		const subject = new HistoricalPriceTransformer(stubResponse);

		assert.object(subject.transform(stubOptions));
	});

	it("should keep every day when the response has daily granularity", async () => {
		const prices = [0, 1, 2, 3].map((index) => [START + index * DAY, index + 1]);

		const result = new HistoricalPriceTransformer({ prices }).transform({ dateFormat: "YYYY-MM-DD", type: "day" });

		assert.equal(result.labels, ["2025-10-14", "2025-10-15", "2025-10-16", "2025-10-17"]);
		assert.equal(result.datasets, [1, 2, 3, 4]);
		assert.is(result.min, 1);
		assert.is(result.max, 4);
	});

	it("should keep one point per day when the response has hourly granularity", async () => {
		const prices = Array.from({ length: 48 }, (_, index) => [START + index * HOUR, index]);

		const result = new HistoricalPriceTransformer({ prices }).transform({ dateFormat: "YYYY-MM-DD", type: "day" });

		assert.equal(result.labels, ["2025-10-14", "2025-10-15"]);
		assert.equal(result.datasets, [0, 24]);
	});
});

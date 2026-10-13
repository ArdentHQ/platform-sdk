import { DateTime } from "@ardenthq/sdk-intl";

import {
	DailyAverageOptions,
	HistoricalData,
	HistoricalPriceOptions,
	HistoricalTransformer,
	HistoricalVolumeOptions,
	MarketDataCollection,
	PriceTracker,
} from "../../../contracts/index.js";

/**
 * Implements a transformer for historical price data.
 *
 * @export
 * @class HistoricalPriceTransformer
 * @implements {HistoricalTransformer}
 */
export class HistoricalPriceTransformer implements HistoricalTransformer {
	/**
	 * Creates an instance of HistoricalPriceTransformer.
	 *
	 * @param {Record<string, any>} data
	 * @memberof HistoricalPriceTransformer
	 */
	public constructor(private readonly data: Record<string, any>) {}

	/**
	 * Transforms the given data into a normalised format.
	 *
	 * @param {Record<string, any>} options
	 * @returns {HistoricalData}
	 * @memberof HistoricalPriceTransformer
	 */
	public transform(options: Record<string, any>): HistoricalData {
		// CoinGecko returns hourly points for ranges up to 90 days and daily points beyond that,
		// so points are grouped per UTC day instead of relying on a fixed step.
		const datasets = new Map<string, [number, number]>();

		for (const [timestamp, price] of this.data.prices) {
			const day = DateTime.make(timestamp).format("YYYY-MM-DD");

			if (!datasets.has(day)) {
				datasets.set(day, [timestamp, price]);
			}
		}

		const points = [...datasets.values()];
		const datasetValues: number[] = points.map(([, price]) => price);

		return {
			labels: points.map(([timestamp]) => DateTime.make(timestamp).format(options.dateFormat)),
			datasets: datasetValues,
			min: Math.min(...datasetValues),
			max: Math.max(...datasetValues),
		};
	}
}

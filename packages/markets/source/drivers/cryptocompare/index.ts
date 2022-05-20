import { CURRENCIES, DateTime } from "@ardenthq/sdk-intl";
import { Http } from "@ardenthq/sdk";

import {
	CurrentPriceOptions,
	DailyAverageOptions,
	HistoricalData,
	HistoricalPriceOptions,
	HistoricalVolumeOptions,
	MarketDataCollection,
	PriceTracker,
} from "../../contracts/index.js";
import { HistoricalPriceTransformer } from "./transformers/historical-price-transformer.js";
import { HistoricalVolumeTransformer } from "./transformers/historical-volume-transformer.js";
import { MarketTransformer } from "./transformers/market-transformer.js";

/**
 * Implements a price tracker through the CryptoCompare API.
 *
 * @see https://min-api.cryptocompare.com/
 *
 * @export
 * @class PriceTracker
 * @implements {PriceTracker}
 */
export class CryptoCompare implements PriceTracker {
	/**
	 * The HTTP client instance.
	 *
	 * @type {HttpClient}
	 * @memberof PriceTracker
	 */
	readonly #httpClient: Http.HttpClient;

	/**
	 * The host of the CryptoCompare API.
	 *
	 * @type {string}
	 * @memberof PriceTracker
	 */
	readonly #host: string = "https://min-api.cryptocompare.com";

	/**
	 * Creates an instance of PriceTracker.
	 *
	 * @param {HttpClient} httpClient
	 * @memberof PriceTracker
	 */
	public constructor(httpClient: Http.HttpClient) {
		this.#httpClient = httpClient;
	}

	/** {@inheritDoc PriceTracker.verifyToken} */
	public async verifyToken(token: string): Promise<boolean> {
		try {
			const body = await this.#get("data/price", {
				fsym: token,
				tsyms: "BTC",
			});

			return !!body.BTC;
		} catch {
			return false;
		}
	}

	/** {@inheritDoc PriceTracker.marketData} */
	public async marketData(token: string): Promise<MarketDataCollection> {
		const body = await this.#get("data/pricemultifull", {
			fsyms: token,
			tsyms: Object.keys(CURRENCIES).join(","),
		});

		return new MarketTransformer(body.RAW && body.RAW[token] ? body.RAW[token] : {}).transform({});
	}

	/** {@inheritDoc PriceTracker.historicalPrice} */
	public async historicalPrice(options: HistoricalPriceOptions): Promise<HistoricalData> {
		const body = await this.#get(`data/histo${options.type}`, {
			fsym: options.token,
			tsym: options.currency,
			toTs: Math.round(new Date().getTime() / 1000),
			limit: options.days,
		});

		return new HistoricalPriceTransformer(body.Data).transform(options);
	}

	/** {@inheritDoc PriceTracker.historicalVolume} */
	public async historicalVolume(options: HistoricalVolumeOptions): Promise<HistoricalData> {
		const body = await this.#get(`data/histo${options.type}`, {
			fsym: options.token,
			tsym: options.currency,
			toTs: Math.round(new Date().getTime() / 1000),
			limit: options.days,
		});

		return new HistoricalVolumeTransformer(body.Data).transform(options);
	}

	/** {@inheritDoc PriceTracker.dailyAverage} */
	public async dailyAverage(options: DailyAverageOptions): Promise<number> {
		const response = await this.#get(`data/dayAvg`, {
			fsym: options.token,
			tsym: options.currency,
			toTs: DateTime.make(options.timestamp).toUNIX(),
		});

		return response[options.currency.toUpperCase()];
	}

	/** {@inheritDoc PriceTracker.currentPrice} */
	public async currentPrice(options: CurrentPriceOptions): Promise<number> {
		const body = await this.#get("data/price", {
			fsym: options.token,
			tsyms: options.currency,
		});

		return body[options.currency];
	}

	/**
	 * Sends an HTTP GET request to the CryptoCompare API.
	 *
	 * @private
	 * @param {string} path
	 * @param {*} [query={}]
	 * @returns {Promise<any>}
	 * @memberof PriceTracker
	 */
	async #get(path: string, query = {}): Promise<any> {
		const response = await this.#httpClient.get(`${this.#host}/${path}`, query);

		return response.json();
	}
}

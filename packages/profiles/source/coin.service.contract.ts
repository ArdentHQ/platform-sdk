import { Coins, Networks } from "@ardenthq/sdk";

/**
 * Defines the implementation contract for the coin service.
 *
 * @export
 * @interface ICoinService
 */
export interface ICoinService {
	/**
	 * Get all keys and instances.
	 *
	 * @return {Record<string, Coins.Coin>}
	 * @memberof ICoinService
	 */
	all(): Record<string, Coins.Coin>;

	/**
	 * Get all coin instances.
	 *
	 * @return {Coins.Coin[]}
	 * @memberof ICoinService
	 */
	values(): Coins.Coin[];

	/**
	 * Get all entries.
	 *
	 * @return {[string, string[]][]}
	 * @memberof ICoinService
	 */
	entries(): [string, string[]][];

	/**
	 * Get an instance of the given coin and network.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @return {Coins.Coin}
	 * @memberof ICoinService
	 */
	get(coin: string, network: string): Coins.Coin;

	/**
	 * Push an instance of the given coin and network.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @param {object} [options]
	 * @return {Coins.Coin}
	 * @memberof ICoinService
	 */
	set(coin: string, network: string, options?: object): Coins.Coin;

	/**
	 * Check if the given coin and network exist.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @return {boolean}
	 * @memberof ICoinService
	 */
	has(coin: string, network: string): boolean;

	/**
	 * Remove all coins from the storage.
	 *
	 * @memberof ICoinService
	 */
	flush(): void;

	/**
	 * Make an instance of the given coin and network.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @param {object} [options]
	 * @return {Coins.Coin}
	 * @memberof ICoinService
	 */
	makeInstance(coin: string, network: string, options?: object): Coins.Coin;

	/**
	 * Register all available coins stored in profile.
	 *
	 * @memberof ICoinService
	 */
	register(): void;

	/**
	 * Get all available coin networks.
	 *
	 * @return {Networks.Network[]}
	 * @memberof ICoinService
	 */
	availableNetworks(): Networks.Network[];
}

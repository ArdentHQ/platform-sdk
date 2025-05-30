import BigNumber from "bignumber.js";

import { NumberLike } from "./bignumber.helpers.js";

export class CurrencyFormatter {
	// todo: implement generic formatting method
	// https://github.com/ArkEcosystem/desktop-wallet/blob/develop/source/renderer/mixins/currency.js#L7-L100

	public static simpleFormatCrypto(value: NumberLike, token: string): string {
		return `${value} ${token}`;
	}

	public static toBuilder(value: NumberLike, decimals = 8): BigNumber {
		return new BigNumber(value, decimals);
	}

	public static subToUnit(value: NumberLike, decimals = 8): BigNumber {
		return new BigNumber(value).dividedBy(10 ** decimals);
	}

	public static unitToSub(value: NumberLike, decimals = 8): BigNumber {
		return new BigNumber(value).times(10 ** decimals);
	}

	public static cryptoToCurrency(
		value: NumberLike,
		price: NumberLike,
		options: { decimals: number; fromSubUnit: boolean } = {
			decimals: 2,
			fromSubUnit: true,
		},
	): string {
		if (options.fromSubUnit) {
			return this.subToUnit(value)
				.decimalPlaces(options.decimals)
				.times(price)
				.toFixed(0);
		}

		return new BigNumber(value)
			.decimalPlaces(options.decimals)
			.times(price)
			.toFixed(0);
	}
}

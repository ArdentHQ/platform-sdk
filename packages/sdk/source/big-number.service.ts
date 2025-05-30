import { NumberLike } from "@ardenthq/sdk-helpers";
import { BigNumber } from "bignumber.js";

import { ConfigKey, ConfigRepository } from "./config.js";
import { IContainer } from "./container.contracts.js";
import { BindingType } from "./service-provider.contract.js";

export class BigNumberService {
	readonly #configRepository: ConfigRepository;

	public constructor(container: IContainer) {
		this.#configRepository = container.get(BindingType.ConfigRepository);
	}

	public make(value: NumberLike): BigNumber {
		const decimals = this.#configRepository.get<number>(ConfigKey.CurrencyDecimals);
		const bn = new BigNumber(value);

		if (decimals !== undefined) {
			return bn.decimalPlaces(decimals);
		}

		return bn;
	}
}

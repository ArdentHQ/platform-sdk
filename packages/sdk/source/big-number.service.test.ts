import { toHuman } from "@ardenthq/sdk-helpers";
import { describe } from "@ardenthq/sdk-test";

import { BigNumberService } from "./big-number.service.js";
import { ConfigKey, ConfigRepository } from "./config.js";
import { Container } from "./container.js";
import { BindingType } from "./service-provider.contract.js";

describe("BigNumberService", ({ assert, each }) => {
	each(
		"should create a bignum with a power of %s",
		async ({ dataset }) => {
			const container = new Container();
			const configRepository = new ConfigRepository({});
			configRepository.set(ConfigKey.Network, {
				currency: {
					decimals: dataset,
				},
			});
			container.constant(BindingType.ConfigRepository, configRepository);
			container.singleton(BindingType.BigNumberService, BigNumberService);

			const service = container.get<BigNumberService>(BindingType.BigNumberService);
			const powerValue = `1${"0".repeat(dataset)}`;
			const result = toHuman(service.make(powerValue), dataset);

			assert.is(result, 1);
		},
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	);
});

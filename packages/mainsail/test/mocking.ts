import { IoC, Test } from "@ardenthq/sdk";

import { BindingType } from "../source/coin.contract";
import { Request } from "@ardenthq/sdk-fetch";
import { loader } from "@ardenthq/sdk-test";
import { manifest } from "../source/manifest";

export const createService = async <T = any>(
	service: any,
	network = "mainsail.devnet",
	predicate?: Function,
): Promise<T> =>
	Test.createServiceAsync({
		httpClient: new Request(),
		manifest: manifest.networks[network],
		predicate: async (container: IoC.Container) => {
			if (container.missing(BindingType.Crypto)) {
				container.constant(
					BindingType.Crypto,
					loader.json("test/fixtures/client/cryptoConfiguration.json").data,
				);
			}

			if (container.missing(BindingType.Height)) {
				container.constant(BindingType.Height, loader.json("test/fixtures/client/syncing.json").data.height);
			}

			if (predicate) {
				predicate(container);
			}
		},
		service,
	});

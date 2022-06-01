import { Test } from "@ardenthq/sdk";
import { Request } from "@ardenthq/sdk-fetch";

import { manifest } from "../source/manifest";

export const createService = <T = any>(service: any, network: string = "nano.mainnet", predicate?: Function): T => {
	return Test.createService({
		httpClient: new Request(),
		manifest: manifest.networks[network],
		predicate,
		service,
	});
};

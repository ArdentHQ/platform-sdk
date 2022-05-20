import { Test } from "@ardenthq/sdk";
import { Request } from "@ardenthq/sdk-fetch";

import { manifest } from "../source/manifest";

export const createService = <T = any>(service: any, network: string = "dot.mainnet", predicate?: Function): T => {
	return Test.createService({
		httpClient: new Request(),
		manifest: manifest.networks[network],
		predicate,
		service,
	});
};

export const createServiceAsync = async <T = any>(
	service: any,
	network: string = "dot.mainnet",
	predicate?: Function,
): Promise<T> => {
	return Test.createServiceAsync({
		httpClient: new Request(),
		manifest: manifest.networks[network],
		predicate,
		service,
	});
};

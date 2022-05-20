import { Test } from "@ardenthq/sdk";
import { Request } from "@ardenthq/sdk-fetch";
import { Zilliqa } from "@zilliqa-js/zilliqa";

import { manifest } from "../source/manifest";

export const createService = <T = any>(service: any, network: string = "zil.testnet", predicate?: Function): T => {
	return Test.createService({
		httpClient: new Request(),
		manifest: manifest.networks[network],
		predicate,
		service,
	});
};

export const mockWallet = () => new Zilliqa("http://localhost:1234");

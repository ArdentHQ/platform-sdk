import { Collections, DTO } from "@ardenthq/sdk";

import { IProfile, IUsernamesService } from "./contracts.js";

type UsernameRegistry = Record<string, Collections.UsernameDataCollection>;

export class UsernamesService implements IUsernamesService {
	readonly #registry: UsernameRegistry = {};

	public async syncUsernames(profile: IProfile, coin: string, network: string, addresses: string[]): Promise<void> {
		const clientService = profile.coins().get(coin, network).client();
		const collection = await clientService.getUsernames(addresses);
		this.#registry[network] = collection;
	}

	public username(network: string, address: string): string | undefined {
		return this.#findByAddress(network, address)?.username();
	}

	public has(network: string, address: string): boolean {
		return this.#findByAddress(network, address) !== undefined;
	}

	#findByAddress(network: string, address: string): DTO.UsernameData | undefined {
		const registry = this.#registry[network];
		if (!registry) {
			return undefined;
		}
		return registry.findByAddress(address);
	}
}

import { Collections, DTO } from "@ardenthq/sdk";

import { IProfile, IUsernamesService } from "./contracts.js";
import { pqueue } from "./helpers/queue.js";

type UsernameRegistry = Record<string, Collections.UsernameDataCollection>;

export class UsernamesService implements IUsernamesService {
	readonly #registry: UsernameRegistry = {};

	public async syncAll(profile: IProfile): Promise<void> {
		const promises: (() => Promise<void>)[] = [];

		for (const [coin, networks] of profile.coins().entries()) {
			for (const network of networks) {
				promises.push(async () => {
					try {
						const addresses = profile
							.wallets()
							.values()
							.map((wallet) => wallet.address());
						this.#registry[network] = await profile
							.coins()
							.get(coin, network)
							.client()
							.getUsernames(addresses);
					} catch {
						// Do nothing if it fails. It's not critical functionality.
					}
				});
			}
		}

		await pqueue(promises);
	}

	public username(network: string, address: string): string | undefined {
		return this.#findByAddress(network, address)?.username();
	}

	public is(network: string, address: string): boolean {
		return this.#findByAddress(network, address) !== undefined;
	}

	#findByAddress(network: string, address: string): DTO.UsernameData | undefined {
		const registry: Collections.UsernameDataCollection = this.#registry[network];

		if (registry === undefined) {
			return undefined;
		}

		return registry.findByAddress(address);
	}
}

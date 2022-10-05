import { IProfile, IWalletService } from "./contracts.js";
import { pqueueSettled } from "./helpers/queue.js";

export class WalletService implements IWalletService {
	/** {@inheritDoc IWalletService.syncByProfile} */
	public async syncByProfile(profile: IProfile): Promise<void> {
		const availableNetworkIds = new Set(
			profile
				.availableNetworks()
				.filter((network) => network.meta().enabled === undefined || network.meta().enabled === true)
				.map((network) => network.id()),
		);

		const wallets = profile
			.wallets()
			.values()
			.filter((wallet) => availableNetworkIds.has(wallet.networkId()));

		const promises: (() => Promise<void>)[] = [];

		for (const wallet of wallets) {
			promises.push(
				() => wallet?.synchroniser().identity(),
				() => wallet?.synchroniser().votes(),
			);
		}

		await pqueueSettled(promises);
	}
}

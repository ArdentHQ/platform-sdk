import { IoC, Services } from "@ardenthq/sdk";

import { deriveAccount, deriveLegacyAccount } from "./account.js";

export class WalletDiscoveryService implements Services.AbstractWalletDiscoveryService {
	//

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject[]> {
		const [legacy, standard] = await Promise.all([
			deriveLegacyAccount(mnemonic, options?.bip44?.account || 0),
			deriveAccount(mnemonic, options?.bip44?.account || 0),
		]);

		return [
			{
				type: "bip44.legacy",
				address: legacy.address,
				path: "@TODO",
			},
			{
				type: "bip44",
				address: standard.address,
				path: "@TODO",
			},
		];
	}
}

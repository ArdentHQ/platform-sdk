import { Coins, IoC, Services } from "@ardenthq/sdk";

import { createWallet } from "./utils.js";

export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PrivateKeyDataTransferObject> {
		return {
			privateKey: createWallet(
				mnemonic,
				this.configRepository.get(Coins.ConfigKey.Slip44),
				options?.bip44?.account || 0,
				options?.bip44?.change || 0,
				options?.bip44?.addressIndex || 0,
			).privateKey,
		};
	}
}

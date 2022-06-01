import { Coins, Exceptions, IoC, Services } from "@ardenthq/sdk";

import { deriveKeyPair, deriveWallet } from "./utils.js";

export class KeyPairService extends Services.AbstractKeyPairService {
	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.KeyPairDataTransferObject> {
		const { publicKey, privateKey } = deriveWallet(
			mnemonic,
			this.configRepository.get<number>("network.constants.slip44"),
			options?.bip44?.account || 0,
			options?.bip44?.change || 0,
			options?.bip44?.addressIndex || 0,
		);

		return { publicKey, privateKey };
	}

	public override async fromPrivateKey(privateKey: string): Promise<Services.KeyPairDataTransferObject> {
		return deriveKeyPair(privateKey);
	}

	public override async fromWIF(wif: string): Promise<Services.KeyPairDataTransferObject> {
		return deriveKeyPair(wif);
	}
}

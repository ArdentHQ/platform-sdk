import { IoC, Services } from "@ardenthq/sdk";

import { makeAccount } from "./factories.js";

export class KeyPairService extends Services.AbstractKeyPairService {
	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.KeyPairDataTransferObject> {
		const account = makeAccount();
		account.loadFromMnemonic(mnemonic);

		return {
			publicKey: account.publicKeyAsString(),
			privateKey: account.privateKeyAsString(),
		};
	}

	public override async fromPrivateKey(privateKey: string): Promise<Services.KeyPairDataTransferObject> {
		const account = makeAccount();
		account.loadFromHexPrivateKey(privateKey);

		return {
			publicKey: account.publicKeyAsString(),
			privateKey: account.privateKeyAsString(),
		};
	}
}

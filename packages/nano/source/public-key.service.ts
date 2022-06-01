import { IoC, Services } from "@ardenthq/sdk";

import { deriveAccount, deriveLegacyAccount } from "./account.js";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PublicKeyDataTransferObject> {
		if (options?.bip44Legacy) {
			return {
				publicKey: deriveLegacyAccount(mnemonic, options?.bip44Legacy?.account).publicKey,
			};
		}

		return {
			publicKey: deriveAccount(mnemonic, options?.bip44?.account).publicKey,
		};
	}
}

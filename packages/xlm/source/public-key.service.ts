import { Exceptions, IoC, Services } from "@ardenthq/sdk";

import { deriveKeyPair } from "./helpers.js";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PublicKeyDataTransferObject> {
		const { child, path } = deriveKeyPair(mnemonic, options);

		return {
			publicKey: child.publicKey(),
			path,
		};
	}
}

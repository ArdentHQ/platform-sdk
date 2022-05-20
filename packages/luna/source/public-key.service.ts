import { Exceptions, Services } from "@ardenthq/sdk";

import { deriveKey } from "./helpers.js";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PublicKeyDataTransferObject> {
		return { publicKey: deriveKey(mnemonic).publicKey!.toAminoJSON() };
	}
}

import { IoC, Services } from "@ardenthq/sdk";
import { u8aToHex } from "@polkadot/util";
import { mnemonicToMiniSecret, naclBoxPairFromSecret } from "@polkadot/util-crypto";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PublicKeyDataTransferObject> {
		return { publicKey: u8aToHex(naclBoxPairFromSecret(mnemonicToMiniSecret(mnemonic)).publicKey) };
	}
}

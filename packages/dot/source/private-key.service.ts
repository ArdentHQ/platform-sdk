import { IoC, Services } from "@ardenthq/sdk";
import { u8aToHex } from "@polkadot/util";
import { mnemonicToMiniSecret, naclBoxPairFromSecret } from "@polkadot/util-crypto";

export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PrivateKeyDataTransferObject> {
		return { privateKey: u8aToHex(naclBoxPairFromSecret(mnemonicToMiniSecret(mnemonic)).secretKey) };
	}
}

import { Coins, IoC, Services } from "@ardenthq/sdk";
import { BIP44 } from "@ardenthq/sdk-cryptography";

export class KeyPairService extends Services.AbstractKeyPairService {
	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.KeyPairDataTransferObject> {
		const { child, path } = BIP44.deriveChildWithPath(mnemonic, {
			coinType: this.configRepository.get(Coins.ConfigKey.Slip44),
			index: options?.bip44?.addressIndex,
		});

		return {
			publicKey: child.publicKey.toString("hex"),
			privateKey: child.privateKey!.toString("hex"),
			path,
		};
	}
}

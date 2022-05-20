import { Coins, IoC, Services } from "@ardenthq/sdk";
import { BIP44 } from "@ardenthq/sdk-cryptography";
import { deriveKeypair } from "ripple-keypairs";

export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PrivateKeyDataTransferObject> {
		const { child, path } = BIP44.deriveChildWithPath(mnemonic, {
			coinType: this.configRepository.get(Coins.ConfigKey.Slip44),
			index: options?.bip44?.addressIndex,
		});

		return {
			privateKey: child.privateKey?.toString("hex")!,
			path,
		};
	}

	public override async fromSecret(secret: string): Promise<Services.PrivateKeyDataTransferObject> {
		return {
			privateKey: deriveKeypair(secret).privateKey,
		};
	}
}

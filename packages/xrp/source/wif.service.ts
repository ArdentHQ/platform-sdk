import { Coins, Exceptions, IoC, Services } from "@ardenthq/sdk";
import { BIP44 } from "@ardenthq/sdk-cryptography";

export class WIFService extends Services.AbstractWIFService {
	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.WIFDataTransferObject> {
		const { child, path } = BIP44.deriveChildWithPath(mnemonic, {
			coinType: this.configRepository.get(Coins.ConfigKey.Slip44),
			index: options?.bip44?.addressIndex,
		});

		return {
			wif: child.toWIF(),
			path,
		};
	}
}

import { IoC, Services } from "@ardenthq/sdk";
import { BIP32 } from "@ardenthq/sdk-cryptography";
import { ECPair } from "ecpair";
import { convertBuffer } from "@ardenthq/sdk-helpers";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PublicKeyDataTransferObject> {
		return {
			publicKey: convertBuffer(
				BIP32.fromMnemonic(mnemonic, this.configRepository.get("network.constants")).publicKey,
			),
		};
	}

	public override async fromWIF(wif: string): Promise<Services.PublicKeyDataTransferObject> {
		return {
			publicKey: convertBuffer(ECPair.fromWIF(wif).publicKey),
		};
	}
}

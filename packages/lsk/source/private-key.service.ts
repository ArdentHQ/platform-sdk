import { Exceptions, IoC, Services } from "@ardenthq/sdk";
import { getPrivateAndPublicKeyFromPassphrase } from "@liskhq/lisk-cryptography";
import { BIP39 } from "@ardenthq/sdk-cryptography";
import { abort_if, abort_unless } from "@ardenthq/sdk-helpers";

export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PrivateKeyDataTransferObject> {
		abort_unless(BIP39.compatible(mnemonic), "The given value is not BIP39 compliant.");

		const { privateKey } = getPrivateAndPublicKeyFromPassphrase(mnemonic);

		return {
			privateKey: privateKey.toString("hex").substring(0, 64),
		};
	}

	public override async fromSecret(secret: string): Promise<Services.PrivateKeyDataTransferObject> {
		abort_if(BIP39.compatible(secret), "The given value is BIP39 compliant. Please use [fromMnemonic] instead.");

		const { privateKey } = getPrivateAndPublicKeyFromPassphrase(secret);

		return {
			privateKey: privateKey.toString("hex").substring(0, 64),
		};
	}
}

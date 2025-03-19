import { Contracts, Identifiers } from "@mainsail/contracts";
import { abort_if, abort_unless } from "@ardenthq/sdk-helpers";

import { Application } from "@mainsail/kernel";
import { BIP39 } from "@ardenthq/sdk-cryptography";
import { PublicKey } from "@arkecosystem/typescript-crypto";
import { Services } from "@ardenthq/sdk";

export class PublicKeyService {
	public constructor() {
		//
	}

	public fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Services.PublicKeyDataTransferObject {
		abort_unless(BIP39.compatible(mnemonic), "The given value is not BIP39 compliant.");

		return {
			publicKey: PublicKey.fromPassphrase(mnemonic).publicKey,
		};
	}

	public fromSecret(secret: string): Services.PublicKeyDataTransferObject {
		abort_if(BIP39.compatible(secret), "The given value is BIP39 compliant. Please use [fromMnemonic] instead.");

		return {
			publicKey: PublicKey.fromPassphrase(secret).publicKey,
		};
	}

	// TODO: implement
	// public fromWIF(wif: string): Services.PublicKeyDataTransferObject {
	// 	return {
	// 		publicKey: await this.#publicKeyFactory.fromWIF(wif),
	// 	};
	// }

	// TODO: implement
	// public verifyPublicKeyWithBLS(publicKey: string): Promise<boolean> {
	// 	const consensusPublicKeyFactory: Contracts.Crypto.PublicKeyFactory = this.#app.getTagged(
	// 		Identifiers.Cryptography.Identity.PublicKey.Factory,
	// 		"type",
	// 		"consensus",
	// 	);

	// 	return await consensusPublicKeyFactory.verify(publicKey);
	// }
}

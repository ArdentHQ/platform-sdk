import { Address, PrivateKey, PublicKey } from "@arkecosystem/typescript-crypto";
import { abort_if, abort_unless } from "@ardenthq/sdk-helpers";

import { BIP39 } from "@ardenthq/sdk-cryptography";
import { Services } from "@ardenthq/sdk";
import { strict as assert } from "assert";

export class AddressService {
	public constructor() {
		//
	}

	public fromMnemonic(mnemonic: string, options?: Services.IdentityOptions): Services.AddressDataTransferObject {
		abort_unless(BIP39.compatible(mnemonic), "The given value is not BIP39 compliant.");

		return {
			address: Address.fromPassphrase(mnemonic),
			type: "bip39",
		};
	}

	public fromPublicKey(publicKey: string, options?: Services.IdentityOptions): Services.AddressDataTransferObject {
		return {
			address: Address.fromPublicKey(publicKey),
			type: "bip39",
		};
	}

	public fromPrivateKey(privateKey: string, options?: Services.IdentityOptions): Services.AddressDataTransferObject {
		return {
			address: Address.fromPrivateKey(privateKey),
			type: "bip39",
		};
	}

	public fromSecret(secret: string): Services.AddressDataTransferObject {
		abort_if(BIP39.compatible(secret), "The given value is BIP39 compliant. Please use [fromMnemonic] instead.");

		const publicKey = PublicKey.fromPassphrase(secret);

		return {
			address: Address.fromPublicKey(publicKey.publicKey),
			type: "bip39",
		};
	}

	public fromWIF(wif: string): Services.AddressDataTransferObject {
		const privateKey = PrivateKey.fromWif(wif);

		return {
			address: Address.fromPrivateKey(privateKey.privateKey),
			type: "bip39",
		};
	}

	public validate(address: string): boolean {
		return Address.validate(address);
	}
}

import { Address, PublicKey } from "typescript-crypto";
import { abort_if, abort_unless } from "@ardenthq/sdk-helpers";

import { BIP39 } from "@ardenthq/sdk-cryptography";
import { Services } from "@ardenthq/sdk";

export class AddressService {
	public constructor() {
		//
	}

	public fromMnemonic(mnemonic: string): Services.AddressDataTransferObject {
		abort_unless(BIP39.compatible(mnemonic), "The given value is not BIP39 compliant.");

		return {
			address: Address.fromPassphrase(mnemonic),
			type: "bip39",
		};
	}

	public fromPublicKey(publicKey: string): Services.AddressDataTransferObject {
		return {
			address: Address.fromPublicKey(publicKey),
			type: "bip39",
		};
	}

	public fromPrivateKey(privateKey: string): Services.AddressDataTransferObject {
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

	public validate(address: string): boolean {
		return Address.validate(address);
	}
}

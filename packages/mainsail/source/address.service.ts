import { IoC, Services } from "@ardenthq/sdk";
import { BIP39 } from "@ardenthq/sdk-cryptography";
import { abort_if, abort_unless } from "@ardenthq/sdk-helpers";
import { Address, PublicKey } from "typescript-crypto";

export class AddressService extends Services.AbstractAddressService {
	public constructor(container: IoC.IContainer) {
		super(container);
	}

	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		abort_unless(BIP39.compatible(mnemonic), "The given value is not BIP39 compliant.");

		return {
			address: Address.fromPassphrase(mnemonic),
			type: "bip39",
		};
	}

	public override async fromPublicKey(
		publicKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		return {
			address: Address.fromPublicKey(publicKey),
			type: "bip39",
		};
	}

	public override async fromPrivateKey(
		privateKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		return {
			address: Address.fromPrivateKey(privateKey),
			type: "bip39",
		};
	}

	public override async fromSecret(secret: string): Promise<Services.AddressDataTransferObject> {
		abort_if(BIP39.compatible(secret), "The given value is BIP39 compliant. Please use [fromMnemonic] instead.");

		const publicKey = PublicKey.fromPassphrase(secret);
		return {
			address: Address.fromPublicKey(publicKey.publicKey),
			type: "bip39",
		};
	}

	public override async validate(address: string): Promise<boolean> {
		return Address.validate(address);
	}
}

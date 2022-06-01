import { Exceptions, IoC, Services } from "@ardenthq/sdk";
import { Base58, BIP39 } from "@ardenthq/sdk-cryptography";

import { derivePrivateKey, derivePublicKey } from "./keys.js";

export class AddressService extends Services.AbstractAddressService {
	#slip44!: number;

	public constructor(container: IoC.IContainer) {
		super(container);

		this.#slip44 = this.configRepository.get<number>("network.constants.slip44");
	}

	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		if (!BIP39.validate(mnemonic)) {
			throw new Exceptions.InvalidArguments(this.constructor.name, this.fromMnemonic.name);
		}

		return {
			type: "bip44",
			address: Base58.encode(
				derivePublicKey(
					derivePrivateKey(
						mnemonic,
						options?.bip44?.account || 0,
						options?.bip44?.addressIndex || 0,
						this.#slip44,
					),
				),
			),
		};
	}

	public override async fromPublicKey(
		publicKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		return {
			type: "bip44",
			address: Base58.encode(Buffer.from(publicKey, "hex")),
		};
	}

	public override async fromPrivateKey(
		privateKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		return {
			type: "bip44",
			address: Base58.encode(derivePublicKey(Buffer.from(privateKey, "hex"))),
		};
	}

	public override async validate(address: string): Promise<boolean> {
		try {
			Base58.decode(address);

			return true;
		} catch {
			return false;
		}
	}
}

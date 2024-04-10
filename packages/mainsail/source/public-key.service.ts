import { IoC, Services } from "@ardenthq/sdk";
import { BIP39 } from "@ardenthq/sdk-cryptography";
import { abort_if, abort_unless } from "@ardenthq/sdk-helpers";

import { BindingType } from "./coin.contract.js";
import { PublicKey as BasePublicKey } from "./crypto/identities/public-key.js";
import { Interfaces } from "./crypto/index.js";
import { Container } from "@mainsail/container";
import { Application } from "@mainsail/kernel";
import { Contracts } from "@mainsail/contracts";
import { PublicKeyFactory } from "@mainsail/crypto-key-pair-bls12-381";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	readonly #config!: Interfaces.NetworkConfig;

	public constructor(container: IoC.IContainer) {
		super(container);

		this.#config = container.get(BindingType.Crypto);
	}

	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PublicKeyDataTransferObject> {
		abort_unless(BIP39.compatible(mnemonic), "The given value is not BIP39 compliant.");

		return {
			publicKey: BasePublicKey.fromPassphrase(mnemonic),
		};
	}

	public override async fromMultiSignature(
		min: number,
		publicKeys: string[],
	): Promise<Services.PublicKeyDataTransferObject> {
		return {
			publicKey: BasePublicKey.fromMultiSignatureAsset({ min, publicKeys }),
		};
	}

	public override async fromSecret(secret: string): Promise<Services.PublicKeyDataTransferObject> {
		abort_if(BIP39.compatible(secret), "The given value is BIP39 compliant. Please use [fromMnemonic] instead.");

		return {
			publicKey: BasePublicKey.fromPassphrase(secret),
		};
	}

	public override async fromWIF(wif: string): Promise<Services.PublicKeyDataTransferObject> {
		return {
			publicKey: BasePublicKey.fromWIF(wif),
		};
	}

	public override async verifyPublicKeyWithBLS(publicKey: string): Promise<boolean> {
		const app = new Application(new Container());
		console.log("verifyPublicKeyWithBLS", publicKey);
		return await app.resolve<Contracts.Crypto.PublicKeyFactory>(PublicKeyFactory).verify(publicKey);
	}
}

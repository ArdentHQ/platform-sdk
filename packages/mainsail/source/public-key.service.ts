import { IoC, Services } from "@ardenthq/sdk";
import { BIP39 } from "@ardenthq/sdk-cryptography";
import { abort_if, abort_unless } from "@ardenthq/sdk-helpers";
import { Contracts, Identifiers } from "@mainsail/contracts";
import { Application } from "@mainsail/kernel";

import { BindingType } from "./coin.contract.js";
import { PublicKey as BasePublicKey } from "./crypto/identities/public-key.js";
import { Interfaces } from "./crypto/index.js";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	readonly #config!: Interfaces.NetworkConfig;
	readonly #app: Application;

	public constructor(container: IoC.IContainer) {
		super(container);

		this.#config = container.get(BindingType.Crypto);
		this.#app = container.resolve<any>(container.get(BindingType.ServiceProvider)).app();
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
		const consensusKeyPairFactory: Contracts.Crypto.KeyPairFactory = this.#app.getTagged(
			Identifiers.Cryptography.Identity.KeyPair.Factory,
			"type",
			"consensus",
		);

		const consensusPublicKeyFactory: Contracts.Crypto.PublicKeyFactory = this.#app.getTagged(
			Identifiers.Cryptography.Identity.PublicKey.Factory,
			"type",
			"consensus",
		);

		return await consensusPublicKeyFactory.verify(publicKey);
	}
}

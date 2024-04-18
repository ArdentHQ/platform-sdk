import { IoC, Services } from "@ardenthq/sdk";
import { BIP39 } from "@ardenthq/sdk-cryptography";
import { abort_if, abort_unless } from "@ardenthq/sdk-helpers";

import { BindingType } from "./coin.contract.js";
import { PublicKey as BasePublicKey } from "./crypto/identities/public-key.js";
import { Interfaces } from "./crypto/index.js";
import { Container } from "@mainsail/container";
import { Application } from "@mainsail/kernel";
import { Contracts } from "@mainsail/contracts";
import { ServiceProvider as CoreValidation } from "@mainsail/validation";
import { ServiceProvider as CoreCryptoConfig } from "@mainsail/crypto-config";
import { ServiceProvider as CoreCryptoConsensusBls12381 } from "@mainsail/crypto-consensus-bls12-381";
import { ServiceProvider as CoreCryptoValidation } from "@mainsail/crypto-validation";
import { Identifiers } from "@mainsail/contracts";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	readonly #config!: Interfaces.NetworkConfig;
	readonly #app: Application;
	#isBooted: boolean = false;

	public constructor(container: IoC.IContainer) {
		super(container);

		this.#config = container.get(BindingType.Crypto);

		this.#app = new Application(new Container());

		this.#boot();
	}

	async #boot(): Promise<void> {
		await this.#app.resolve(CoreValidation).register();
		await this.#app.resolve(CoreCryptoConfig).register();
		await this.#app.resolve(CoreCryptoValidation).register();
		await this.#app.resolve(CoreCryptoConsensusBls12381).register();

		this.#isBooted = true;
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
		if (!this.#isBooted) {
			await this.#boot();
		}

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

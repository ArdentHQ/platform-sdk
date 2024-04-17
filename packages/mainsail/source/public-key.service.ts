import { IoC, Services } from "@ardenthq/sdk";
import { BIP39 } from "@ardenthq/sdk-cryptography";
import { abort_if, abort_unless } from "@ardenthq/sdk-helpers";

import { BindingType } from "./coin.contract.js";
import { PublicKey as BasePublicKey } from "./crypto/identities/public-key.js";
import { Interfaces } from "./crypto/index.js";
import { Container } from "@mainsail/container";
import { Application } from "@mainsail/kernel";
import { Contracts } from "@mainsail/contracts";
import { PublicKeyFactory, KeyPairFactory } from "@mainsail/crypto-key-pair-bls12-381";
import { ServiceProvider as CoreValidation } from "@mainsail/validation";
import { ServiceProvider as CoreCryptoAddressBase58 } from "@mainsail/crypto-address-base58";
import { ServiceProvider as CoreCryptoConfig } from "@mainsail/crypto-config";
import { ServiceProvider as CoreCryptoConsensusBls12381 } from "@mainsail/crypto-consensus-bls12-381";
import { ServiceProvider as CoreCryptoValidation } from "@mainsail/crypto-validation";
import { ServiceProvider as CoreCryptoHashBcrypto } from "@mainsail/crypto-hash-bcrypto";
import { ServiceProvider as CoreCryptoKeyPairEcdsa } from "@mainsail/crypto-key-pair-ecdsa";
import { ServiceProvider as CoreCryptoSignatureSchnorr } from "@mainsail/crypto-signature-schnorr-secp256k1";
import { Identifiers } from "@mainsail/contracts";
import { milestones } from "./crypto/networks/devnet/milestones.js";
import { network } from "./crypto/networks/devnet/network.js";

import { ServiceProvider as CoreCryptoTransaction } from "@mainsail/crypto-transaction";
import { ServiceProvider as CoreCryptoMultipaymentTransfer } from "@mainsail/crypto-transaction-multi-payment";
import { ServiceProvider as CoreCryptoTransactionTransfer } from "@mainsail/crypto-transaction-transfer";
import { ServiceProvider as CoreCryptoTransactionUsername } from "@mainsail/crypto-transaction-username-registration";
import { ServiceProvider as CoreCryptoTransactionValidatorRegistration } from "@mainsail/crypto-transaction-validator-registration";
import { ServiceProvider as CoreCryptoTransactionVote, VoteBuilder } from "@mainsail/crypto-transaction-vote";
import { ServiceProvider as CoreCryptoTransactionValidatorResignation } from "@mainsail/crypto-transaction-validator-resignation";
import { ServiceProvider as CoreFees } from "@mainsail/fees";
import { ServiceProvider as CoreFeesStatic } from "@mainsail/fees-static";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	readonly #config!: Interfaces.NetworkConfig;
	readonly #app: Application;
	#isBooted: boolean;

	public constructor(container: IoC.IContainer) {
		super(container);

		this.#config = container.get(BindingType.Crypto);

		this.#app = new Application(new Container());

		this.#boot();
	}

	async #boot(): Promise<void> {
		await Promise.all([
			// this.#app.resolve(CoreValidation).register(),
			// this.#app.resolve(CoreCryptoConfig).register(),
			// this.#app.resolve(CoreCryptoValidation).register(),
			// this.#app.resolve(CoreCryptoKeyPairEcdsa).register(),
			// this.#app.resolve(CoreCryptoAddressBase58).register(),
			// this.#app.resolve(CoreCryptoSignatureSchnorr).register(),
			// this.#app.resolve(CoreCryptoHashBcrypto).register(),
			// this.#app.resolve(CoreFees).register(),
			// this.#app.resolve(CoreFeesStatic).register(),
			// this.#app.resolve(CoreCryptoTransaction).register(),
			// this.#app.resolve(CoreCryptoTransactionTransfer).register(),
			// this.#app.resolve(CoreCryptoTransactionVote).register(),
			// this.#app.resolve(CoreCryptoMultipaymentTransfer).register(),
			// this.#app.resolve(CoreCryptoTransactionUsername).register(),
			// this.#app.resolve(CoreCryptoTransactionValidatorRegistration).register(),
			// this.#app.resolve(CoreCryptoTransactionValidatorResignation).register(),
			// this.#app.resolve<Contracts.Crypto.PublicKeyFactory>(PublicKeyFactory),
			// this.#app.resolve(CoreCryptoConsensusBls12381).register(),
		]);

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

		console.log("verifying", { publicKey });
		return await consensusPublicKeyFactory.verify(publicKey);
	}
}

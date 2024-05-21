import { Coins, IoC } from "@ardenthq/sdk";
import { Container } from "@mainsail/container";
import { Contracts as MainsailContracts, Identifiers } from "@mainsail/contracts";
import { ServiceProvider as CoreCryptoAddressBase58 } from "@mainsail/crypto-address-base58";
import { ServiceProvider as CoreCryptoConfig } from "@mainsail/crypto-config";
import { ServiceProvider as CoreCryptoConsensusBls12381 } from "@mainsail/crypto-consensus-bls12-381";
import { ServiceProvider as CoreCryptoHashBcrypto } from "@mainsail/crypto-hash-bcrypto";
import { ServiceProvider as CoreCryptoKeyPairEcdsa } from "@mainsail/crypto-key-pair-ecdsa";
import { ServiceProvider as CoreCryptoSignatureSchnorr } from "@mainsail/crypto-signature-schnorr-secp256k1";
import { ServiceProvider as CoreCryptoTransaction, Utils } from "@mainsail/crypto-transaction";
import { ServiceProvider as CoreCryptoMultipaymentTransfer } from "@mainsail/crypto-transaction-multi-payment";
import { ServiceProvider as CoreCryptoTransactionMultiSignature } from "@mainsail/crypto-transaction-multi-signature-registration";
import { ServiceProvider as CoreCryptoTransactionTransfer } from "@mainsail/crypto-transaction-transfer";
import { ServiceProvider as CoreCryptoTransactionUsernameRegistration } from "@mainsail/crypto-transaction-username-registration";
import { ServiceProvider as CoreCryptoTransactionUsernameResignation } from "@mainsail/crypto-transaction-username-resignation";
import { ServiceProvider as CoreCryptoTransactionValidatorRegistration } from "@mainsail/crypto-transaction-validator-registration";
import { ServiceProvider as CoreCryptoTransactionValidatorResignation } from "@mainsail/crypto-transaction-validator-resignation";
import { ServiceProvider as CoreCryptoTransactionVote, VoteBuilder } from "@mainsail/crypto-transaction-vote";
import { ServiceProvider as CoreCryptoValidation } from "@mainsail/crypto-validation";
import { ServiceProvider as CoreFees } from "@mainsail/fees";
import { ServiceProvider as CoreFeesStatic } from "@mainsail/fees-static";
import { Application } from "@mainsail/kernel";
import { ServiceProvider as CoreValidation } from "@mainsail/validation";

import { BindingType } from "./coin.contract.js";
import { Managers } from "./crypto/index.js";
import { Request } from "./request.js";

export class ServiceProvider extends IoC.AbstractServiceProvider {
	#app: Application | undefined;

	public override async make(container: IoC.Container): Promise<void> {
		await this.#retrieveNetworkConfiguration(container);

		await this.compose(container);
	}

	async #retrieveNetworkConfiguration(container: IoC.Container): Promise<void> {
		const request = new Request(
			container.get(IoC.BindingType.ConfigRepository),
			container.get(IoC.BindingType.HttpClient),
			container.get(IoC.BindingType.NetworkHostSelector),
		);

		const [crypto, status] = await Promise.all([
			request.get("node/configuration/crypto"),
			request.get("node/syncing"),
		]);

		const dataCrypto = crypto.data;
		const { height } = status.data;

		if (dataCrypto.network.client.token !== this.configRepository.get(Coins.ConfigKey.CurrencyTicker)) {
			throw new Error(`Failed to connect to ${request.latestHost()?.host} because it is on another network.`);
		}

		Managers.configManager.setConfig(dataCrypto);
		Managers.configManager.setHeight(height);

		if (container.missing(BindingType.Crypto)) {
			container.constant(BindingType.Crypto, dataCrypto);
		}

		if (container.missing(BindingType.Height)) {
			container.constant(BindingType.Height, height);
		}

		await this.#resolve(dataCrypto);
	}

	async #resolve({ milestones, network }) {
		this.#app = new Application(new Container());

		await this.#app.resolve(CoreValidation).register();
		await this.#app.resolve(CoreCryptoConfig).register();

		await this.#app.resolve(CoreCryptoValidation).register();

		await this.#app.resolve(CoreCryptoKeyPairEcdsa).register();
		await this.#app.resolve(CoreCryptoAddressBase58).register();
		await this.#app.resolve(CoreCryptoSignatureSchnorr).register();
		await this.#app.resolve(CoreCryptoHashBcrypto).register();
		await this.#app.resolve(CoreFees).register();
		await this.#app.resolve(CoreFeesStatic).register();
		await this.#app.resolve(CoreCryptoTransaction).register();
		await this.#app.resolve(CoreCryptoTransactionTransfer).register();
		await this.#app.resolve(CoreCryptoTransactionVote).register();
		await this.#app.resolve(CoreCryptoTransactionUsernameRegistration).register();
		await this.#app.resolve(CoreCryptoTransactionUsernameResignation).register();
		await this.#app.resolve(CoreCryptoMultipaymentTransfer).register();
		await this.#app.resolve(CoreCryptoTransactionValidatorRegistration).register();
		await this.#app.resolve(CoreCryptoTransactionValidatorResignation).register();
		await this.#app.resolve(CoreCryptoConsensusBls12381).register();
		await this.#app.resolve(CoreCryptoTransactionMultiSignature).register();

		this.#app
			.get<{
				setConfig: Function;
			}>(Identifiers.Cryptography.Configuration)
			.setConfig({ milestones, network });

		return this.#app;
	}

	public app(): Application {
		if (!this.#app) {
			throw new Error(
				"[ServiceProvider#app] Attempted to access app but service has not been resolved. Call ServiceProvider.make() first.",
			);
		}

		return this.#app;
	}
}

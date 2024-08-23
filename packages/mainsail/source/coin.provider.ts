import { Coins, IoC } from "@ardenthq/sdk";
import { Container } from "@mainsail/container";
import { Identifiers } from "@mainsail/contracts";
import { ServiceProvider as CoreCryptoAddressKeccak } from "@mainsail/crypto-address-keccak256";
import { ServiceProvider as CoreCryptoConfig } from "@mainsail/crypto-config";
import { ServiceProvider as CoreCryptoConsensusBls12381 } from "@mainsail/crypto-consensus-bls12-381";
import { ServiceProvider as CoreCryptoHashBcrypto } from "@mainsail/crypto-hash-bcrypto";
import { ServiceProvider as CoreCryptoKeyPairEcdsa } from "@mainsail/crypto-key-pair-ecdsa";
import { ServiceProvider as CoreCryptoSignatureSchnorr } from "@mainsail/crypto-signature-schnorr";
import { ServiceProvider as CoreCryptoTransaction } from "@mainsail/crypto-transaction";
import { ServiceProvider as CoreCryptoMultipaymentTransfer } from "@mainsail/crypto-transaction-multi-payment";
import { ServiceProvider as CoreCryptoTransactionMultiSignature } from "@mainsail/crypto-transaction-multi-signature-registration";
import {
	ServiceProvider as CoreCryptoTransactionTransfer,
	TransferBuilder,
} from "@mainsail/crypto-transaction-transfer";
import { ServiceProvider as CoreCryptoTransactionUsernameRegistration } from "@mainsail/crypto-transaction-username-registration";
import { ServiceProvider as CoreCryptoTransactionUsernameResignation } from "@mainsail/crypto-transaction-username-resignation";
import {
	ServiceProvider as CoreCryptoTransactionValidatorRegistration,
	ValidatorRegistrationBuilder,
} from "@mainsail/crypto-transaction-validator-registration";
import { ServiceProvider as CoreCryptoTransactionValidatorResignation } from "@mainsail/crypto-transaction-validator-resignation";
import { ServiceProvider as CoreCryptoTransactionVote } from "@mainsail/crypto-transaction-vote";
import { ServiceProvider as CoreCryptoValidation } from "@mainsail/crypto-validation";
import { ServiceProvider as CoreFees } from "@mainsail/fees";
import { ServiceProvider as CoreFeesStatic } from "@mainsail/fees-static";
import { Application } from "@mainsail/kernel";
import { ServiceProvider as CoreValidation } from "@mainsail/validation";

import { BindingType } from "./coin.contract.js";
import { Managers } from "./crypto/index.js";
import { Request } from "./request.js";

export class ServiceProvider extends IoC.AbstractServiceProvider {
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

		if (container.missing(BindingType.Application)) {
			const application = await this.#boot(dataCrypto);
			container.constant(BindingType.Application, application);
		}
	}

	async #boot({ milestones, network }) {
		const app = new Application(new Container());

		await app.resolve(CoreValidation).register();
		await app.resolve(CoreCryptoConfig).register();

		await app.resolve(CoreCryptoValidation).register();

		await app.resolve(CoreCryptoKeyPairEcdsa).register();
		await app.resolve(CoreCryptoAddressKeccak).register();
		await app.resolve(CoreCryptoSignatureSchnorr).register();
		await app.resolve(CoreCryptoHashBcrypto).register();
		await app.resolve(CoreFees).register();
		await app.resolve(CoreFeesStatic).register();
		await app.resolve(CoreCryptoTransaction).register();
		await app.resolve(CoreCryptoTransactionTransfer).register();
		await app.resolve(CoreCryptoTransactionVote).register();
		await app.resolve(CoreCryptoTransactionUsernameRegistration).register();
		await app.resolve(CoreCryptoTransactionUsernameResignation).register();
		await app.resolve(CoreCryptoMultipaymentTransfer).register();
		await app.resolve(CoreCryptoTransactionValidatorRegistration).register();
		await app.resolve(CoreCryptoTransactionValidatorResignation).register();
		await app.resolve(CoreCryptoConsensusBls12381).register();
		await app.resolve(CoreCryptoTransactionMultiSignature).register();

		app.get<{ setConfig: Function }>(Identifiers.Cryptography.Configuration).setConfig({ milestones, network });

		return app;
	}
}

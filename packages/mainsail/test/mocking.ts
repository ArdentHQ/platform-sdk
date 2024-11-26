import { IoC, Test } from "@ardenthq/sdk";
import { Request } from "@ardenthq/sdk-fetch";
import { loader } from "@ardenthq/sdk-test";
import { Container } from "@mainsail/container";
import { Identifiers } from "@mainsail/contracts";
import { ServiceProvider as CoreCryptoAddressKeccak } from "@mainsail/crypto-address-keccak256";
import { ServiceProvider as CoreCryptoConfig } from "@mainsail/crypto-config";
import { ServiceProvider as CoreCryptoHashBcrypto } from "@mainsail/crypto-hash-bcrypto";
import { ServiceProvider as CoreCryptoKeyPairEcdsa } from "@mainsail/crypto-key-pair-ecdsa";
import { ServiceProvider as CoreCryptoSignatureEcdsa } from "@mainsail/crypto-signature-ecdsa";
import { ServiceProvider as CoreCryptoTransaction } from "@mainsail/crypto-transaction";
import { ServiceProvider as EvmCallBuilder } from "@mainsail/crypto-transaction-evm-call";
import { ServiceProvider as CoreCryptoValidation } from "@mainsail/crypto-validation";
import { ServiceProvider as CoreCryptoWif } from "@mainsail/crypto-wif";
import { Application } from "@mainsail/kernel";
import { ServiceProvider as CoreCryptoSerializer } from "@mainsail/serializer";
import { ServiceProvider as CoreValidation } from "@mainsail/validation";

import { BindingType } from "../source/coin.contract";
import { manifest } from "../source/manifest";

export const createService = async <T = any>(
	service: any,
	network = "mainsail.devnet",
	predicate?: Function,
): Promise<T> =>
	Test.createServiceAsync({
		httpClient: new Request(),
		manifest: manifest.networks[network],
		predicate: async (container: IoC.Container) => {
			const crypto = loader.json("test/fixtures/client/cryptoConfiguration.json").data;

			if (container.missing(BindingType.Crypto)) {
				container.constant(BindingType.Crypto, crypto);
			}

			if (container.missing(BindingType.Height)) {
				container.constant(BindingType.Height, loader.json("test/fixtures/client/syncing.json").data.height);
			}

			if (container.missing(BindingType.Application)) {
				const application = new Application(new Container());

				await application.resolve(CoreValidation).register();
				await application.resolve(CoreCryptoConfig).register();
				await application.resolve(CoreCryptoValidation).register();
				await application.resolve(CoreCryptoSignatureEcdsa).register();
				await application.resolve(CoreCryptoKeyPairEcdsa).register();
				await application.resolve(CoreCryptoAddressKeccak).register();
				await application.resolve(CoreCryptoHashBcrypto).register();
				await application.resolve(CoreCryptoTransaction).register();
				// @TODO: Enabling CoreCryptoConsensusBls12381 in tests, throws the following exception:
				// 								 Error [ERR_PACKAGE_PATH_NOT_EXPORTED]:
				// 								 Package subpath './getImplementation' is not defined by "exports" in node_modules/.pnpm/@mainsail+crypto-key-pair-bls12-381@0.0.1-evm.9/node_modules/@chainsafe/bls/package.json
				// await application.resolve(CoreCryptoConsensusBls12381).register();
				await application.resolve(CoreCryptoWif).register();
				await application.resolve(CoreCryptoSerializer).register();
				await application.resolve(EvmCallBuilder).register();

				application.get<{ setConfig: Function }>(Identifiers.Cryptography.Configuration).setConfig({ milestones: crypto.milestones, network: crypto.network });
				container.constant(BindingType.Application, application);
			}

			if (predicate) {
				predicate(container);
			}

		},
		service,
	});

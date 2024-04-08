import { DelegateRegistrationBuilder } from "./delegate-registration.js";
import { DelegateResignationBuilder } from "./delegate-resignation.js";
import { IPFSBuilder } from "./ipfs.js";
import { MultiPaymentBuilder } from "./multi-payment.js";
import { MultiSignatureBuilder } from "./multi-signature.js";
import { SecondSignatureBuilder } from "./second-signature.js";
import { Application } from "@mainsail/kernel";
import { Container } from "@mainsail/container";
import {
	ServiceProvider as CoreCryptoTransactionTransfer,
	TransferBuilder,
} from "@mainsail/crypto-transaction-transfer";
import { ServiceProvider as CoreCryptoTransactionVote, VoteBuilder } from "@mainsail/crypto-transaction-vote";
import { Identifiers } from "@mainsail/contracts";

import { milestones } from "../../networks/devnet/milestones";
import { network } from "../../networks/devnet/network";
import { ServiceProvider as CoreValidation } from "@mainsail/validation";
import { ServiceProvider as CoreCryptoConfig } from "@mainsail/crypto-config/distribution/service-provider";
import { ServiceProvider as CoreCryptoValidation } from "@mainsail/crypto-validation/distribution/service-provider";
import { ServiceProvider as CoreCryptoKeyPairEcdsa } from "@mainsail/crypto-key-pair-ecdsa";
import { ServiceProvider as CoreCryptoAddressBase58 } from "@mainsail/crypto-address-base58";
import { ServiceProvider as CoreCryptoSignatureSchnorr } from "@mainsail/crypto-signature-schnorr-secp256k1";
import { ServiceProvider as CoreCryptoHashBcrypto } from "@mainsail/crypto-hash-bcrypto";
import { ServiceProvider as CoreFees } from "@mainsail/fees/distribution/service-provider";
import { ServiceProvider as CoreFeesStatic } from "@mainsail/fees-static";
import { ServiceProvider as CoreCryptoTransaction } from "@mainsail/crypto-transaction/distribution/service-provider";
import { ServiceProvider as CoreCryptoMultipaymentTransfer } from "@mainsail/crypto-transaction-multi-payment";
import {
	ServiceProvider as CoreCryptoTransactionUsernameRegistration,
	UsernameRegistrationBuilder,
} from "@mainsail/crypto-transaction-username-registration";

import {
	ServiceProvider as CoreCryptoTransactionUsernameResignation,
	UsernameResignationBuilder,
} from "@mainsail/crypto-transaction-username-resignation";

export * from "./transaction.js";

export class BuilderFactory {
	private static async app() {
		const app = new Application(new Container());

		await Promise.all([
			app.resolve(CoreValidation).register(),
			app.resolve(CoreCryptoConfig).register(),
			app.resolve(CoreCryptoValidation).register(),
			app.resolve(CoreCryptoKeyPairEcdsa).register(),
			app.resolve(CoreCryptoAddressBase58).register(),
			app.resolve(CoreCryptoSignatureSchnorr).register(),
			app.resolve(CoreCryptoHashBcrypto).register(),
			app.resolve(CoreFees).register(),
			app.resolve(CoreFeesStatic).register(),
			app.resolve(CoreCryptoTransaction).register(),
			app.resolve(CoreCryptoTransactionTransfer).register(),
			app.resolve(CoreCryptoTransactionVote).register(),
			app.resolve(CoreCryptoTransactionUsernameRegistration).register(),
			app.resolve(CoreCryptoTransactionUsernameResignation).register(),
			app.resolve(CoreCryptoMultipaymentTransfer).register(),
		]);

		app.get<{
			setConfig: Function;
		}>(Identifiers.Cryptography.Configuration).setConfig({ milestones, network });

		return app;
	}

	public static async transfer(): Promise<TransferBuilder> {
		const app = await this.app();
		return app.resolve(TransferBuilder);
	}

	public static secondSignature(): SecondSignatureBuilder {
		return new SecondSignatureBuilder();
	}

	public static delegateRegistration(): DelegateRegistrationBuilder {
		return new DelegateRegistrationBuilder();
	}

	public static async usernameRegistration(): Promise<UsernameRegistrationBuilder> {
		const app = await this.app();
		return app.resolve(UsernameRegistrationBuilder);
	}

	public static async usernameResignation(): Promise<UsernameResignationBuilder> {
		const app = await this.app();
		return app.resolve(UsernameResignationBuilder);
	}

	public static async vote(): Promise<VoteBuilder> {
		const app = await this.app();
		return app.resolve(VoteBuilder);
	}

	public static multiSignature(): MultiSignatureBuilder {
		return new MultiSignatureBuilder();
	}

	public static ipfs(): IPFSBuilder {
		return new IPFSBuilder();
	}

	public static multiPayment(): MultiPaymentBuilder {
		return new MultiPaymentBuilder();
	}

	public static delegateResignation(): DelegateResignationBuilder {
		return new DelegateResignationBuilder();
	}
}

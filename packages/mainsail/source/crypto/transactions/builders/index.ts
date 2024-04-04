import { DelegateRegistrationBuilder } from "./delegate-registration.js";
import { DelegateResignationBuilder } from "./delegate-resignation.js";
import { IPFSBuilder } from "./ipfs.js";
import { MultiPaymentBuilder } from "./multi-payment.js";
import { MultiSignatureBuilder } from "./multi-signature.js";
import { TransferBuilder } from "./transfer.js";
import { VoteBuilder } from "./vote.js";

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

	public static delegateRegistration(): DelegateRegistrationBuilder {
		return new DelegateRegistrationBuilder();
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

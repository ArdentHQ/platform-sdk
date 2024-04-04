import { DelegateRegistrationBuilder } from "./delegate-registration.js";
import { DelegateResignationBuilder } from "./delegate-resignation.js";
import { IPFSBuilder } from "./ipfs.js";
import { MultiPaymentBuilder } from "./multi-payment.js";
import { MultiSignatureBuilder } from "./multi-signature.js";
import { SecondSignatureBuilder } from "./second-signature.js";
import {Application} from "@mainsail/kernel";
import {Container} from "@mainsail/container";
import {TransferBuilder} from "@mainsail/crypto-transaction-transfer";
import {VoteBuilder} from "@mainsail/crypto-transaction-vote";

export * from "./transaction.js";

export class BuilderFactory {
	private static app() {
		return new Application(new Container());
	}
	public static transfer(): TransferBuilder {
		return this.app().resolve(TransferBuilder);
	}

	public static secondSignature(): SecondSignatureBuilder {
		return new SecondSignatureBuilder();
	}

	public static delegateRegistration(): DelegateRegistrationBuilder {
		return new DelegateRegistrationBuilder();
	}

	public static vote(): VoteBuilder {
		return this.app().resolve(VoteBuilder);
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

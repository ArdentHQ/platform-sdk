import { MultiPaymentBuilder } from "@mainsail/crypto-transaction-multi-payment";
import { TransferBuilder } from "@mainsail/crypto-transaction-transfer";
import { UsernameRegistrationBuilder } from "@mainsail/crypto-transaction-username-registration";
import { UsernameResignationBuilder } from "@mainsail/crypto-transaction-username-resignation";
import { ValidatorRegistrationBuilder } from "@mainsail/crypto-transaction-validator-registration";
import { ValidatorResignationBuilder } from "@mainsail/crypto-transaction-validator-resignation";
import { MultiSignatureBuilder } from "@mainsail/crypto-transaction-multi-signature-registration";
import { VoteBuilder } from "@mainsail/crypto-transaction-vote";
import { Application } from "@mainsail/kernel";

import { IoC } from "@ardenthq/sdk";
import { BindingType } from "../../../coin.contract.js";

export class BuilderFactory {
	#app: Application;

	public constructor(container: IoC.Container) {
		this.#app = container.get(BindingType.Application);
	}

	public transfer(): TransferBuilder {
		return this.#app.resolve(TransferBuilder);
	}

	public delegateRegistration(): ValidatorRegistrationBuilder {
		return this.#app.resolve(ValidatorRegistrationBuilder);
	}

	public usernameRegistration(): UsernameRegistrationBuilder {
		return this.#app.resolve(UsernameRegistrationBuilder);
	}

	public usernameResignation(): UsernameResignationBuilder {
		return this.#app.resolve(UsernameResignationBuilder);
	}

	public vote(): VoteBuilder {
		return this.#app.resolve(VoteBuilder);
	}

	public multiSignature(): MultiSignatureBuilder {
		return this.#app.resolve(MultiSignatureBuilder);
	}

	public multiPayment(): MultiPaymentBuilder {
		return this.#app.resolve(MultiPaymentBuilder);
	}

	public delegateResignation(): ValidatorResignationBuilder {
		return this.#app.resolve(ValidatorResignationBuilder);
	}
}

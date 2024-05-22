import { Container } from "@mainsail/container";
import { Identifiers } from "@mainsail/contracts";
import { MultiPaymentBuilder } from "@mainsail/crypto-transaction-multi-payment";
import { TransferBuilder } from "@mainsail/crypto-transaction-transfer";
import { UsernameRegistrationBuilder } from "@mainsail/crypto-transaction-username-registration";
import { UsernameResignationBuilder } from "@mainsail/crypto-transaction-username-resignation";
import { ValidatorRegistrationBuilder } from "@mainsail/crypto-transaction-validator-registration";
import { ValidatorResignationBuilder } from "@mainsail/crypto-transaction-validator-resignation";
import { MultiSignatureBuilder } from "@mainsail/crypto-transaction-multi-signature-registration";
import { VoteBuilder } from "@mainsail/crypto-transaction-vote";
import { Application } from "@mainsail/kernel";

import { Contracts, IoC } from "@ardenthq/sdk";
import { BindingType } from "../../../coin.contract.js";

export * from "./transaction.js";

export class BuilderFactory {
	#app: Application;

	public constructor(container: IoC.Container) {
		this.#app = container.get(BindingType.Application);
	}

	public transfer(): TransferBuilder {
		return this.#app.resolve(TransferBuilder);
	}

	public async delegateRegistration(): Promise<ValidatorRegistrationBuilder> {
		return this.#app.resolve(ValidatorRegistrationBuilder);
	}

	public async usernameRegistration(): Promise<UsernameRegistrationBuilder> {
		return this.#app.resolve(UsernameRegistrationBuilder);
	}

	public async usernameResignation(): Promise<UsernameResignationBuilder> {
		return this.#app.resolve(UsernameResignationBuilder);
	}

	public async vote(): Promise<VoteBuilder> {
		return this.#app.resolve(VoteBuilder);
	}

	public async multiSignature(): Promise<MultiSignatureBuilder> {
		return this.#app.resolve(MultiSignatureBuilder);
	}

	public async multiPayment(): Promise<MultiPaymentBuilder> {
		return this.#app.resolve(MultiPaymentBuilder);
	}

	public async delegateResignation(): Promise<ValidatorResignationBuilder> {
		return this.#app.resolve(ValidatorResignationBuilder);
	}
}

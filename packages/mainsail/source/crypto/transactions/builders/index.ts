import { Exceptions, IoC } from "@ardenthq/sdk";
import { Application } from "@mainsail/kernel";

import { BindingType } from "../../../coin.contract.js";

export class BuilderFactory {
	#app: Application;

	public constructor(container: IoC.Container) {
		this.#app = container.get(BindingType.Application);
	}

	public transfer(): TransferBuilder {
		throw new Exceptions.NotImplemented(this.constructor.name, this.transfer.name);
	}

	public delegateRegistration(): ValidatorRegistrationBuilder {
		throw new Exceptions.NotImplemented(this.constructor.name, this.delegateRegistration.name);
	}

	public usernameRegistration(): UsernameRegistrationBuilder {
		throw new Exceptions.NotImplemented(this.constructor.name, this.usernameRegistration.name);
	}

	public usernameResignation(): UsernameResignationBuilder {
		throw new Exceptions.NotImplemented(this.constructor.name, this.usernameResignation.name);
	}

	public vote(): VoteBuilder {
		throw new Exceptions.NotImplemented(this.constructor.name, this.vote.name);
	}

	public multiSignature(): MultiSignatureBuilder {
		throw new Exceptions.NotImplemented(this.constructor.name, this.multiSignature.name);
	}

	public multiPayment(): MultiPaymentBuilder {
		throw new Exceptions.NotImplemented(this.constructor.name, this.multiPayment.name);
	}

	public delegateResignation(): ValidatorResignationBuilder {
		throw new Exceptions.NotImplemented(this.constructor.name, this.delegateResignation.name);
	}
}

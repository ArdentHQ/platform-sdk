import { Exceptions, IoC } from "@ardenthq/sdk";
import { Application } from "@mainsail/kernel";

import { BindingType } from "../../../coin.contract.js";
import { EvmCallBuilder } from "@mainsail/crypto-transaction-evm-call";

export class BuilderFactory {
	#app: Application;

	public constructor(container: IoC.Container) {
		this.#app = container.get(BindingType.Application);
	}

	public transfer(): void {
		throw new Exceptions.NotImplemented(this.constructor.name, this.transfer.name);
	}

	public delegateRegistration(): void {
		throw new Exceptions.NotImplemented(this.constructor.name, this.delegateRegistration.name);
	}

	public usernameRegistration(): void {
		throw new Exceptions.NotImplemented(this.constructor.name, this.usernameRegistration.name);
	}

	public usernameResignation(): void {
		throw new Exceptions.NotImplemented(this.constructor.name, this.usernameResignation.name);
	}

	public vote(): void {
		throw new Exceptions.NotImplemented(this.constructor.name, this.vote.name);
	}

	public multiSignature(): void {
		throw new Exceptions.NotImplemented(this.constructor.name, this.multiSignature.name);
	}

	public multiPayment(): void {
		throw new Exceptions.NotImplemented(this.constructor.name, this.multiPayment.name);
	}

	public delegateResignation(): void {
		throw new Exceptions.NotImplemented(this.constructor.name, this.delegateResignation.name);
	}
}

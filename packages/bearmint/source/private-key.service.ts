import { Exceptions, Services } from "@ardenthq/sdk";

export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PrivateKeyDataTransferObject> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.fromMnemonic.name);
	}

	public override async fromSecret(secret: string): Promise<Services.PrivateKeyDataTransferObject> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.fromSecret.name);
	}

	public override async fromWIF(wif: string): Promise<Services.PrivateKeyDataTransferObject> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.fromWIF.name);
	}
}

import { Exceptions, Services } from "@ardenthq/sdk";

export class WIFService extends Services.AbstractWIFService {
	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.WIFDataTransferObject> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.fromMnemonic.name);
	}

	public override async fromSecret(secret: string): Promise<Services.WIFDataTransferObject> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.fromSecret.name);
	}

	public override async fromPrivateKey(privateKey: string): Promise<Services.WIFDataTransferObject> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.fromPrivateKey.name);
	}
}

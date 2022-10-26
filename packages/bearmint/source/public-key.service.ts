import { Exceptions, Services } from "@ardenthq/sdk";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PublicKeyDataTransferObject> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.fromMnemonic.name);
	}

	public override async fromMultiSignature(
		min: number,
		publicKeys: string[],
	): Promise<Services.PublicKeyDataTransferObject> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.fromMultiSignature.name);
	}

	public override async fromSecret(secret: string): Promise<Services.PublicKeyDataTransferObject> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.fromSecret.name);
	}

	public override async fromWIF(wif: string): Promise<Services.PublicKeyDataTransferObject> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.fromWIF.name);
	}
}

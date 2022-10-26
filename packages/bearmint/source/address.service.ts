import { Exceptions, Services } from "@ardenthq/sdk";

export class AddressService extends Services.AbstractAddressService {
	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.fromMnemonic.name);
	}

	public override async fromMultiSignature({
		min,
		publicKeys,
	}: Services.MultisignatureAddressInput): Promise<Services.AddressDataTransferObject> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.fromMultiSignature.name);
	}

	public override async fromPublicKey(
		publicKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.fromPublicKey.name);
	}

	public override async fromPrivateKey(
		privateKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.fromPrivateKey.name);
	}

	public override async fromSecret(secret: string): Promise<Services.AddressDataTransferObject> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.fromSecret.name);
	}

	public override async fromWIF(wif: string): Promise<Services.AddressDataTransferObject> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.fromWIF.name);
	}

	public override async validate(address: string): Promise<boolean> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.validate.name);
	}
}

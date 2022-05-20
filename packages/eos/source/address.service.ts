import { Exceptions, IoC, Services } from "@ardenthq/sdk";

export class AddressService extends Services.AbstractAddressService {
	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, this.fromMnemonic.name);
	}

	public override async validate(address: string): Promise<boolean> {
		return true;
	}
}

import { Exceptions, Services } from "@ardenthq/sdk";

export class KnownWalletService extends Services.AbstractKnownWalletService {
	public override async all(): Promise<Services.KnownWallet[]> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.all.name);
	}
}

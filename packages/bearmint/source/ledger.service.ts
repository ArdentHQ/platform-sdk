import { Contracts, Exceptions, Services } from "@ardenthq/sdk";
import { Buffer } from "buffer";

export class LedgerService extends Services.AbstractLedgerService {
	public override async onPreDestroy(): Promise<void> {
		return this.disconnect();
	}

	public override async connect(): Promise<void> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.connect.name);
	}

	public override async disconnect(): Promise<void> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.disconnect.name);
	}

	public override async getVersion(): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.getVersion.name);
	}

	public override async getPublicKey(path: string): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.getPublicKey.name);
	}

	public override async getExtendedPublicKey(path: string): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.getExtendedPublicKey.name);
	}

	public override async signTransaction(path: string, payload: Buffer): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.signTransaction.name);
	}

	public override async signMessage(path: string, payload: string): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.signMessage.name);
	}

	public override async scan(options?: {
		useLegacy: boolean;
		startPath?: string;
		onProgress?: (wallet: Contracts.WalletData) => void;
	}): Promise<Services.LedgerWalletList> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.scan.name);
	}

	public override async isNanoS(): Promise<boolean> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isNanoS.name);
	}

	public override async isNanoX(): Promise<boolean> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isNanoX.name);
	}
}

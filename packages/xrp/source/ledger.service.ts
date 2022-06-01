import { IoC, Services } from "@ardenthq/sdk";
import Ripple from "@ledgerhq/hw-app-xrp";

export class LedgerService extends Services.AbstractLedgerService {
	#ledger: Services.LedgerTransport;
	#transport!: Ripple;

	public override async connect(): Promise<void> {
		this.#ledger = await this.ledgerTransportFactory();
		this.#transport = new Ripple(this.#ledger);
	}

	public override async disconnect(): Promise<void> {
		await this.#ledger.close();
	}

	public override async getVersion(): Promise<string> {
		const { version } = await this.#transport.getAppConfiguration();

		return version;
	}

	public override async getPublicKey(path: string): Promise<string> {
		const { publicKey } = await this.#transport.getAddress(path);

		return publicKey;
	}

	public override async signTransaction(path: string, payload: Buffer): Promise<string> {
		return this.#transport.signTransaction(path, payload.toString("hex"));
	}
}

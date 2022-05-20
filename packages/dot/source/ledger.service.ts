import { Services } from "@ardenthq/sdk";
import { newPolkadotApp } from "@zondax/ledger-substrate";

export class LedgerService extends Services.AbstractLedgerService {
	#ledger: Services.LedgerTransport;
	#transport;

	public override async connect(): Promise<void> {
		this.#ledger = await this.ledgerTransportFactory();
		this.#transport = newPolkadotApp(this.#ledger);
	}

	public override async disconnect(): Promise<void> {
		await this.#ledger.close();
	}

	public override async getVersion(): Promise<string> {
		const { major, minor, patch } = await this.#transport.getVersion();

		return `${major}.${minor}.${patch}`;
	}

	public override async getPublicKey(path: string): Promise<string> {
		const parsedPath = this.#parseDotPath(path);
		const { pubKey } = await this.#transport.getAddress(parsedPath[2], parsedPath[3], parsedPath[4]);

		return pubKey;
	}

	public override async signTransaction(path: string, payload: Buffer): Promise<string> {
		const parsedPath = this.#parseDotPath(path);
		const { signature } = await this.#transport.sign(parsedPath[2], parsedPath[3], parsedPath[4], payload);

		return signature.toString("hex");
	}

	#parseDotPath(path: string): number[] {
		const HARDENING = 0x80000000;
		const elements: number[] = [];

		for (const level of path.split("/")) {
			const element = parseInt(level, 10) + (level.endsWith("'") ? HARDENING : 0);
			elements.push(element);
		}

		return elements;
	}
}

import { Services } from "@ardenthq/sdk";
import { BIP44 } from "@ardenthq/sdk-cryptography";
import Cosmos from "ledger-cosmos-js";

export class LedgerService extends Services.AbstractLedgerService {
	#ledger: Services.LedgerTransport;
	#transport!: Cosmos;

	public override async connect(): Promise<void> {
		this.#ledger = await this.ledgerTransportFactory();
		this.#transport = new Cosmos(this.#ledger);
	}

	public override async disconnect(): Promise<void> {
		await this.#ledger.close();
	}

	public override async getVersion(): Promise<string> {
		const res = await this.#transport.getVersion();

		return `${res.major}.${res.minor}.${res.patch}`;
	}

	public override async getPublicKey(path: string): Promise<string> {
		const pathArray: number[] = Object.values(BIP44.parse(path));
		const { compressed_pk } = await this.#transport.publicKey(pathArray);

		return compressed_pk.toString("hex");
	}

	public override async signTransaction(path: string, payload: Buffer): Promise<string> {
		const pathArray: number[] = Object.values(BIP44.parse(path));
		const { signature } = await this.#transport.sign(pathArray, payload.toString());

		return signature.toString("hex");
	}
}

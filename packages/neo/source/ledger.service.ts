import { Services } from "@ardenthq/sdk";
import { BIP44 } from "@ardenthq/sdk-cryptography";

export class LedgerService extends Services.AbstractLedgerService {
	#ledger: Services.LedgerTransport;
	#bip44SessionPath = "";

	public override async connect(): Promise<void> {
		this.#ledger = await this.ledgerTransportFactory();
	}

	public override async disconnect(): Promise<void> {
		await this.#ledger.close();
	}

	public override async getVersion(): Promise<string> {
		const result = await this.#ledger.send(0xb0, 0x01, 0x00, 0x00);

		return result.toString("utf-8").match(new RegExp("(\\d.\\d.\\d)", "g")).toString();
	}

	public override async getPublicKey(path: string): Promise<string> {
		const result = await this.#ledger.send(0x80, 0x04, 0x00, 0x00, this.#neoBIP44(path));

		return result.toString("hex").slice(0, 130);
	}

	public override async signTransaction(path: string, payload: Buffer): Promise<string> {
		return await this.#neoSignTransaction(this.#ledger, path, payload);
	}

	/**
	 * Neo-like Bip44 Parsing
	 * modified from:
	 * - https://github.com/CityOfZion/neon-js/blob/master/packages/neon-ledger/source/BIP44.ts
	 */
	#neoBIP44(path: string): Buffer {
		const parsedPath = BIP44.parse(path);
		const accountHex = this.#to8BitHex(parsedPath.account + 0x80_00_00_00);
		const changeHex = this.#to8BitHex(parsedPath.change);
		const addressHex = this.#to8BitHex(parsedPath.addressIndex);

		return Buffer.from("8000002C" + "80000378" + accountHex + changeHex + addressHex, "hex");
	}

	/**
	 * Neo-like Bip44 Element to8BitHex
	 * modified from:
	 * - https://github.com/CityOfZion/neon-js/blob/master/packages/neon-ledger/source/BIP44.ts
	 */
	#to8BitHex(number_: number): string {
		const hex = number_.toString(16);
		return "0".repeat(8 - hex.length) + hex;
	}

	/**
	 * Neo-like Transaction Signing
	 * modified from:
	 * - https://github.com/CityOfZion/neon-js/blob/master/packages/neon-ledger/source/main.ts.ts
	 */
	async #neoSignTransaction(transport: Services.LedgerTransport, path: string, payload: Buffer): Promise<string> {
		const chunks: string[] = payload.toString().match(/.{1,510}/g) || [];

		for (let index = 0; index < chunks.length - 1; index++) {
			await this.#ledger.send(0x80, 0x02, 0x00, 0x00, Buffer.from(chunks[index], "hex"));
		}

		const result = await this.#ledger.send(0x80, 0x02, 0x80, 0x00, Buffer.from(chunks.at(-1)!, "hex"));

		return result.toString("hex").match(new RegExp(".*[^9000]", "g")).toString();
	}
}

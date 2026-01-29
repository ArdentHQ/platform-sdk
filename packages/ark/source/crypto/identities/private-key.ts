import { Network } from "../interfaces/networks.js";
import { Keys } from "./keys.js";

export class PrivateKey {
	public static fromPassphrase(passphrase: string, path?: string): string {
		return path ? Keys.fromBip44Mnemonic(passphrase, path).privateKey : Keys.fromPassphrase(passphrase).privateKey;
	}

	public static fromWIF(wif: string, network?: Network): string {
		return Keys.fromWIF(wif, network).privateKey;
	}
}

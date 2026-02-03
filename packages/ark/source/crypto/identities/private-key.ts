import { Network } from "../interfaces/networks.js";
import { Keys } from "./keys.js";

export class PrivateKey {
	public static fromPassphrase(passphrase: string): string {
		return Keys.fromPassphrase(passphrase).privateKey;
	}

	public static fromBip44Mnemonic(passphrase: string, path: string): string {
		return Keys.fromBip44Mnemonic(passphrase, path).privateKey;
	}

	public static fromWIF(wif: string, network?: Network): string {
		return Keys.fromWIF(wif, network).privateKey;
	}
}

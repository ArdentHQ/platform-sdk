import { BIP39 } from "@ardenthq/sdk-cryptography";
import { derivePath, getPublicKey } from "ed25519-hd-key";

export const derivePrivateKey = (mnemonic: string, account: number, index: number, slip44: number): Buffer =>
	derivePath(`m/44'/${slip44}'/${account}'/${index}'`, Buffer.from(BIP39.toSeed(mnemonic)).toString("hex")).key;

export const derivePublicKey = (privateKey: Buffer): Buffer => getPublicKey(privateKey, false);

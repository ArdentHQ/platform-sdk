import { Services } from "@ardenthq/sdk";
import { BIP39 } from "@ardenthq/sdk-cryptography";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "stellar-sdk";

export const buildPath = (options?: Services.IdentityOptions): string => `m/44'/148'/${options?.bip44?.account || 0}'`;

export const deriveKeyPair = (
	mnemonic: string,
	options?: Services.IdentityOptions,
): {
	child: Keypair;
	path: string;
} => {
	const path: string = buildPath(options);
	const { key } = derivePath(path, Buffer.from(BIP39.toSeed(mnemonic)).toString("hex"));

	return {
		child: Keypair.fromRawEd25519Seed(key),
		path,
	};
};

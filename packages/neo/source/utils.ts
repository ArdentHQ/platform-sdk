import { BIP44 } from "@ardenthq/sdk-cryptography";
import { wallet } from "@cityofzion/neon-js";

export const createWallet = (input: string): any => new wallet.Account(input);

export const deriveWallet = (mnemonic: string, coinType: number, account: number, change: number, index: number) => {
	const privateKey: string = BIP44.deriveChild(mnemonic, { coinType, account, change, index }).privateKey!.toString(
		"hex",
	);

	return createWallet(privateKey);
};

export const deriveKeyPair = (input: string) => {
	const { publicKey, privateKey } = createWallet(input);

	return { publicKey, privateKey };
};

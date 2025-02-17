import { Identities } from "../../source/crypto/index.js";

export const identity = {
	// Standard
	address: "D6i8P5N44rFto6M6RALyUXLLs7Q1A1WREW",
	mnemonic: "bomb open frame quit success evolve gain donate prison very rent later",
	// Multi Signature
	multiSignature: {
		min: 3,
		publicKeys: ["secret 1", "secret 2", "secret 3"].map((secret) => Identities.PublicKey.fromPassphrase(secret)),
	},
	multiSignatureAddress: "DMS861mLRrtH47QUMVif3C2rBCAdHbmwsi",
	multiSignaturePublicKey: "0279f05076556da7173610a7676399c3620276ebbf8c67552ad3b1f26ec7627794",
	privateKey: "e2511a6022953eb399fbd48f84619c04c894f735aee107b02a7690075ae67617",
	publicKey: "022a40ea35d53eedf0341ffa17574fca844d69665ce35f224e9a6b1385575044fd",
	wif: "SHA89yQdW3bLFYyCvEBpn7ngYNR8TEojGCC1uAJjT5esJPm1NiG3",
};

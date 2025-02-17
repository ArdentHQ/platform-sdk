import { Identities } from "../../source/crypto/index.js";

export const identity = {
	
	address: "0x902Ca4319BabB2236155E42bE837cE40C6DC6396",
	
mnemonic: "brother woman opinion heart brand sad clip ignore neutral rigid arm uniform birth speak disease cannon simple donate crawl obscure champion cry hurdle reject",
	
// Multi Signature
multiSignature: {
		min: 3,
		publicKeys: ["secret 1", "secret 2", "secret 3"].map((secret) => Identities.PublicKey.fromPassphrase(secret)),
	},
	

multiSignatureAddress: "DMS861mLRrtH47QUMVif3C2rBCAdHbmwsi",
	

multiSignaturePublicKey: "0279f05076556da7173610a7676399c3620276ebbf8c67552ad3b1f26ec7627794",
	
	// Standard
privateKey: "a27872084dd69fc78996a2af4181a82f6b101c7bf4bee763b4b5d906eea5fb88",
	publicKey: "034598a4613fa09b4d77003df03dd626ef7ee9ef03cfe2249ba457687d4cdd310a",
	wif: "UcJ6zDNvMCmsLDLJumKwgsHo9ocpBF7KHWdxqG3Zr6rxmSs4giFa",
};

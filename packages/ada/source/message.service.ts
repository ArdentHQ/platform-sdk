import { Exceptions, IoC, Services } from "@ardenthq/sdk";
import { Ed25519Signature, PublicKey } from "@emurgo/cardano-serialization-lib-nodejs";

import { deriveRootKey } from "./shelley.js";

export class MessageService extends Services.AbstractMessageService {
	public override async sign(input: Services.MessageInput): Promise<Services.SignedMessage> {
		const privateKey = deriveRootKey(input.signatory.signingKey());

		return {
			message: input.message,
			signatory: privateKey.to_public().to_raw_key().to_bech32(),
			signature: privateKey.to_raw_key().sign(Buffer.from(input.message, "utf8")).to_bech32(),
		};
	}

	public override async verify(input: Services.SignedMessage): Promise<boolean> {
		return PublicKey.from_bech32(input.signatory).verify(
			Buffer.from(input.message, "utf8"),
			Ed25519Signature.from_bech32(input.signature),
		);
	}
}

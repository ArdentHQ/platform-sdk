import { Exceptions, IoC, Services } from "@ardenthq/sdk";
import { Buffoon } from "@ardenthq/sdk-cryptography";
import Stellar from "stellar-sdk";

export class MessageService extends Services.AbstractMessageService {
	public override async sign(input: Services.MessageInput): Promise<Services.SignedMessage> {
		const source = Stellar.Keypair.fromSecret(input.signatory.privateKey());

		return {
			message: input.message,
			signatory: input.signatory.publicKey(),
			signature: source.sign(Buffoon.fromUTF8(input.message)).toString("hex"),
		};
	}

	public override async verify(input: Services.SignedMessage): Promise<boolean> {
		return Stellar.Keypair.fromPublicKey(input.signatory).verify(
			Buffoon.fromUTF8(input.message),
			Buffoon.fromHex(input.signature),
		);
	}
}

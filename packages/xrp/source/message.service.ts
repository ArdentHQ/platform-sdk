import { Exceptions, IoC, Services } from "@ardenthq/sdk";
import { Buffoon } from "@ardenthq/sdk-cryptography";
import { deriveKeypair, sign, verify } from "ripple-keypairs";

export class MessageService extends Services.AbstractMessageService {
	public override async sign(input: Services.MessageInput): Promise<Services.SignedMessage> {
		const { publicKey, privateKey } = deriveKeypair(input.signatory.signingKey());

		return {
			message: input.message,
			signatory: publicKey,
			signature: sign(Buffoon.toHex(input.message), privateKey),
		};
	}

	public override async verify(input: Services.SignedMessage): Promise<boolean> {
		return verify(Buffoon.toHex(input.message), input.signature, input.signatory);
	}
}

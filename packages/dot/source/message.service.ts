import { IoC, Services } from "@ardenthq/sdk";
import { Keyring } from "@polkadot/keyring";
import { hexToU8a, stringToU8a, u8aToHex } from "@polkadot/util";
import { signatureVerify } from "@polkadot/util-crypto";

import { BindingType } from "./constants.js";

export class MessageService extends Services.AbstractMessageService {
	readonly #keyring: Keyring;

	public constructor(container: IoC.IContainer) {
		super(container);

		this.#keyring = container.get(BindingType.Keyring);
	}

	public override async sign(input: Services.MessageInput): Promise<Services.SignedMessage> {
		const keypair = this.#keyring.addFromUri(input.signatory.signingKey());

		return {
			message: input.message,
			signatory: keypair.address,
			signature: u8aToHex(keypair.sign(stringToU8a(input.message))),
		};
	}

	public override async verify(input: Services.SignedMessage): Promise<boolean> {
		return signatureVerify(stringToU8a(input.message), hexToU8a(input.signature), input.signatory).isValid;
	}
}

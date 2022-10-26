import { Exceptions, Services } from "@ardenthq/sdk";

export class MessageService extends Services.AbstractMessageService {
	public override async sign(input: Services.MessageInput): Promise<Services.SignedMessage> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.sign.name);
	}

	public override async verify(input: Services.SignedMessage): Promise<boolean> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.verify.name);
	}
}

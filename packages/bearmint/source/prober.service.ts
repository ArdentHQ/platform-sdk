import { Exceptions, Services } from "@ardenthq/sdk";

export class ProberService extends Services.AbstractProberService {
	public override async evaluate(host: string): Promise<boolean> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.evaluate.name);
	}
}

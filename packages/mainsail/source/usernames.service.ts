import { Collections, Services } from "@ardenthq/sdk";

export class UsernamesService extends Services.AbstractUsernamesService {
	public override async getUsernames(addresses: string[]): Promise<Collections.UsernameDataCollection> {
		return await this.clientService.getUsernames(addresses);
	}
}

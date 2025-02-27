import { ClientService } from "./client.contract.js";
import { IContainer } from "./container.contracts.js";
import { BindingType } from "./service-provider.contract.js";
import { UsernameDataCollection } from "./usernames.collection.js";
import { UsernamesService } from "./usernames.contract.js";

export class AbstractUsernamesService implements UsernamesService {
	protected readonly clientService: ClientService;

	public constructor(container: IContainer) {
		this.clientService = container.get(BindingType.ClientService);
	}

	usernames(addresses: string[]): Promise<UsernameDataCollection> {
		return Promise.resolve(new UsernameDataCollection([]));
	}
}

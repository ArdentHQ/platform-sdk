import { UsernameDataCollection } from "./usernames.collection.js";

export interface UsernamesService {
	usernames(addresses: string[]): Promise<UsernameDataCollection>;
}

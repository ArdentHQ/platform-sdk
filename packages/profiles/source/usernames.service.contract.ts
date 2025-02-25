import { IProfile } from "./contracts.js";

export interface IUsernamesService {
	syncAll(profile: IProfile): Promise<void>;
	username(network: string, address: string): string | undefined;
	is(network: string, address: string): boolean;
}

import { Base64, PBKDF2 } from "@ardenthq/sdk-cryptography";

import { IProfile, IProfileData, IProfileEncrypter } from "./contracts.js";

export class ProfileEncrypter implements IProfileEncrypter {
	readonly #profile: IProfile;

	public constructor(profile: IProfile) {
		this.#profile = profile;
	}

	/** {@inheritDoc IProfileEncrypter.encrypt} */
	public async encrypt(unencrypted: string, password?: string): Promise<string> {
		if (typeof password !== "string") {
			password = this.#profile.password().get();
		}

		if (!this.#profile.auth().verifyPassword(password)) {
			throw new Error("The password did not match our records.");
		}

		return PBKDF2.encrypt(unencrypted, password);
	}

	/** {@inheritDoc IProfileEncrypter.decrypt} */
	public async decrypt(password: string): Promise<IProfileData> {
		if (!this.#profile.usesPassword()) {
			throw new Error("This profile does not use a password but password was passed for decryption");
		}

		const { id, data } = JSON.parse(
			await PBKDF2.decrypt(Base64.decode(this.#profile.getAttributes().get<string>("data")), password),
		);

		return { id, ...data };
	}
}

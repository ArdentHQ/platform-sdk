import { Bcrypt } from "@ardenthq/sdk-cryptography";

import { IAuthenticator, IProfile, ProfileSetting } from "./contracts.js";

export class Authenticator implements IAuthenticator {
	readonly #profile: IProfile;

	public constructor(profile: IProfile) {
		this.#profile = profile;
	}

	/** {@inheritDoc IAuthenticator.setPassword} */
	public setPassword(password: string): void {
		const encrypted: string = Bcrypt.hash(password);

		this.#profile.settings().set(ProfileSetting.Password, encrypted);

		// This is needed for new profiles because they are initialised
		// without any data besides their ID and name which means the
		// password will be omitted and we won't know to use it.
		this.#profile.getAttributes().set("password", encrypted);

		// We'll need the password for future use in plain-text
		// during the lifetime of this profile session.
		this.#profile.password().set(password);

		this.#profile.status().markAsDirty();
	}

	/** {@inheritDoc IAuthenticator.forgetPassword} */
	public forgetPassword(password: string): void {
		if (!this.verifyPassword(password)) {
			throw new Error("The current password does not match.");
		}

		this.#profile.settings().forget(ProfileSetting.Password);

		this.#profile.getAttributes().forget("password");

		this.#profile.password().forget();

		this.#profile.status().markAsDirty();
	}

	/** {@inheritDoc IAuthenticator.verifyPassword} */
	public verifyPassword(password: string): boolean {
		if (!this.#profile.usesPassword()) {
			throw new Error("No password is set.");
		}

		return Bcrypt.verify(this.#profile.getAttributes().get("password"), password);
	}

	/** {@inheritDoc IAuthenticator.changePassword} */
	public changePassword(oldPassword: string, newPassword: string): void {
		if (!this.verifyPassword(oldPassword)) {
			throw new Error("The current password does not match.");
		}

		this.setPassword(newPassword);
	}
}

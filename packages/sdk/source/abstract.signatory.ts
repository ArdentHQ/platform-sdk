import { IdentityOptions } from "./services.js";

export abstract class AbstractSignatory {
	readonly #signingKey: string;
	readonly #address: string;
	readonly #publicKey: string;
	readonly #privateKey: string;
	readonly #options?: IdentityOptions;
	readonly #path?: string;

	public constructor({
		signingKey,
		address,
		publicKey,
		privateKey,
		options,
		path,
	}: {
		signingKey: string;
		address: string;
		publicKey: string;
		privateKey: string;
		options?: IdentityOptions;
		path?: string;
	}) {
		this.#signingKey = signingKey.normalize("NFD");
		this.#address = address;
		this.#publicKey = publicKey;
		this.#privateKey = privateKey;
		this.#options = options;
		this.#path = path;
	}

	public signingKey(): string {
		return this.#signingKey;
	}

	public address(): string {
		return this.#address;
	}

	public publicKey(): string {
		return this.#publicKey;
	}

	public privateKey(): string {
		return this.#privateKey;
	}

	public options(): IdentityOptions | undefined {
		return this.#options;
	}

	public path(): string | undefined {
		return this.#path;
	}
}

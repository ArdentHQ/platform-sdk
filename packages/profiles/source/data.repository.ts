import { get, has, set, unset } from "@ardenthq/sdk-helpers";

import { IDataRepository } from "./contracts.js";

export class DataRepository implements IDataRepository {
	#storage: object = {};
	#snapshot: object | undefined;

	public all(): object {
		return this.#storage;
	}

	public first<T>(): T {
		return this.values()[0] as T;
	}

	public last<T>(): T {
		return this.values()[this.count() - 1] as T;
	}

	public keys(): string[] {
		return Object.keys(this.#storage);
	}

	public values<T>(): T[] {
		return Object.values(this.#storage);
	}

	public get<T>(key: string, defaultValue?: T | undefined): T | undefined {
		return get(this.#storage, key, defaultValue);
	}

	public set(key: string, value: unknown): void {
		set(this.#storage, key, value);
	}

	public fill(entries: object): void {
		for (const [key, value] of Object.entries(entries)) {
			this.set(key, value);
		}
	}

	public has(key: string): boolean {
		return has(this.#storage, key);
	}

	public missing(key: string): boolean {
		return !this.has(key);
	}

	public forget(key: string): void {
		unset(this.#storage, key);
	}

	public forgetIndex(key: string, index: number): void {
		const value: any[] | undefined = this.get(key);

		if (value !== undefined) {
			this.set(
				key,
				value.filter((_, index_) => index_ !== index),
			);
		}
	}

	public flush(): void {
		this.#storage = {};
	}

	public count(): number {
		return this.keys().length;
	}

	public snapshot(): void {
		this.#snapshot = { ...this.all() };
	}

	public restore(): void {
		if (!this.#snapshot) {
			throw new Error("There is no snapshot to restore.");
		}

		this.flush();

		for (const [key, value] of Object.entries(this.#snapshot)) {
			this.set(key, value);
		}

		this.#snapshot = undefined;
	}

	public toJSON(): string {
		return JSON.stringify(this.#storage);
	}
}

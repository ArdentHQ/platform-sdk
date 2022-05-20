import { UUID } from "@ardenthq/sdk-cryptography";

import { IProfile, IProfileExportOptions, IProfileInput, IProfileRepository } from "./contracts.js";
import { DataRepository } from "./data.repository";
import { ProfileDumper } from "./profile.dumper";
import { ProfileExporter } from "./profile.exporter";
import { ProfileFactory } from "./profile.factory.js";
import { ProfileImporter } from "./profile.importer";
import { ProfileInitialiser } from "./profile.initialiser";
import { Profile } from "./profile.js";

export class ProfileRepository implements IProfileRepository {
	readonly #data: DataRepository;

	public constructor() {
		this.#data = new DataRepository();
	}

	/** {@inheritDoc IProfileRepository.fill} */
	public fill(profiles: object): void {
		for (const [id, profile] of Object.entries(profiles)) {
			this.#data.set(id, new Profile(profile));
		}
	}

	/** {@inheritDoc IProfileRepository.all} */
	public all(): Record<string, IProfile> {
		return this.#data.all() as Record<string, IProfile>;
	}

	/** {@inheritDoc IProfileRepository.first} */
	public first(): IProfile {
		return this.#data.first();
	}

	/** {@inheritDoc IProfileRepository.last} */
	public last(): IProfile {
		return this.#data.last();
	}

	/** {@inheritDoc IProfileRepository.keys} */
	public keys(): string[] {
		return this.#data.keys();
	}

	/** {@inheritDoc IProfileRepository.values} */
	public values(): IProfile[] {
		return this.#data.values();
	}

	/** {@inheritDoc IProfileRepository.findById} */
	public findById(id: string): IProfile {
		if (this.#data.missing(id)) {
			throw new Error(`No profile found for [${id}].`);
		}

		return this.#data.get(id) as IProfile;
	}

	/** {@inheritDoc IProfileRepository.findByName} */
	public findByName(name: string): IProfile | undefined {
		return this.values().find((profile: IProfile) => profile.name().toLowerCase() === name.toLowerCase());
	}

	/** {@inheritDoc IProfileRepository.create} */
	public push(profile: IProfile): void {
		this.#data.set(profile.id(), profile);
	}

	/** {@inheritDoc IProfileRepository.create} */
	public async create(name: string): Promise<IProfile> {
		if (this.findByName(name)) {
			throw new Error(`The profile [${name}] already exists.`);
		}

		const result: IProfile = ProfileFactory.fromName(name);

		this.push(result);

		new ProfileInitialiser(result).initialise(name);

		result.status().markAsRestored();

		await this.persist(result);

		return result;
	}

	/** {@inheritDoc IProfileRepository.import} */
	public async import(data: string, password?: string): Promise<Profile> {
		const result = new Profile({
			data,
			id: UUID.random(),
			name: "",
			password,
		});

		await new ProfileImporter(result).import(password);

		return result;
	}

	/** {@inheritDoc IProfileRepository.export} */
	public async export(profile: IProfile, options: IProfileExportOptions, password?: string): Promise<string> {
		return new ProfileExporter(profile).export(password, options);
	}

	/** {@inheritDoc IProfileRepository.restore} */
	public async restore(profile: IProfile, password?: string): Promise<void> {
		await new ProfileImporter(profile).import(password);

		profile.status().markAsRestored();
	}

	/** {@inheritDoc IProfileRepository.dump} */
	public dump(profile: IProfile): IProfileInput {
		return new ProfileDumper(profile).dump();
	}

	/** {@inheritDoc IProfileRepository.persist} */
	public async persist(profile: IProfile): Promise<void> {
		if (!profile.status().isRestored()) {
			return;
		}

		if (!profile.status().isDirty()) {
			return;
		}

		if (profile.usesPassword() && profile.password().exists()) {
			profile.getAttributes().set("data", await new ProfileExporter(profile).export(profile.password().get()));
		}

		if (!profile.usesPassword()) {
			profile.getAttributes().set("data", await new ProfileExporter(profile).export());
		}

		profile.status().markAsClean();
	}

	/** {@inheritDoc IProfileRepository.has} */
	public has(id: string): boolean {
		return this.#data.has(id);
	}

	/** {@inheritDoc IProfileRepository.forget} */
	public forget(id: string): void {
		if (this.#data.missing(id)) {
			throw new Error(`No profile found for [${id}].`);
		}

		this.#data.forget(id);
	}

	/** {@inheritDoc IProfileRepository.flush} */
	public flush(): void {
		this.#data.flush();
	}

	/** {@inheritDoc IProfileRepository.count} */
	public count(): number {
		return this.#data.count();
	}

	/** {@inheritDoc IProfileRepository.toObject} */
	public toObject(): Record<string, object> {
		const result: Record<string, object> = {};
		const profiles: [string, Profile][] = Object.entries(this.#data.all());

		for (const [id, profile] of profiles) {
			result[id] = new ProfileDumper(profile).dump();
		}

		return result;
	}
}

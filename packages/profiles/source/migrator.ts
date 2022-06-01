import semver from "semver";

import { IMigrator, IProfile, ProfileData } from "./contracts.js";
import { IProfileData } from "./profile.contract.js";

export class Migrator implements IMigrator {
	readonly #profile: IProfile;
	readonly #data: IProfileData;

	public constructor(profile: IProfile, data: IProfileData) {
		this.#profile = profile;
		this.#data = data;
	}

	/** {@inheritDoc IMigrator.migrate} */
	public async migrate(migrations: object, versionToMigrate: string): Promise<void> {
		let previousMigratedVersion: string = this.#getPreviousMigratedVersion("0.0.0");

		const newerVersions: string[] = Object.keys(migrations).filter((candidateVersion) =>
			this.#shouldPerformMigration(candidateVersion, previousMigratedVersion, versionToMigrate),
		);

		for (const version of newerVersions) {
			try {
				this.#profile.data().snapshot();

				await migrations[version]({ data: this.#data, profile: this.#profile });

				this.#set(version);

				previousMigratedVersion = version;
			} catch (error) {
				this.#profile.data().restore();

				throw new Error(
					`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${error}`,
				);
			}
		}

		if (
			this.#isVersionInRangeFormat(previousMigratedVersion) ||
			!semver.eq(previousMigratedVersion, versionToMigrate)
		) {
			this.#set(versionToMigrate);
		}
	}

	#isVersionInRangeFormat(version: string): boolean {
		return semver.clean(version) === null;
	}

	#shouldPerformMigration(
		candidateVersion: string,
		previousMigratedVersion: string,
		versionToMigrate: string,
	): boolean {
		if (this.#isVersionInRangeFormat(candidateVersion)) {
			if (previousMigratedVersion !== "0.0.0" && semver.satisfies(previousMigratedVersion, candidateVersion)) {
				return false;
			}

			return semver.satisfies(versionToMigrate, candidateVersion);
		}

		if (semver.lte(candidateVersion, previousMigratedVersion)) {
			return false;
		}

		if (semver.gt(candidateVersion, versionToMigrate)) {
			return false;
		}

		return true;
	}

	#set(migration: string): void {
		this.#profile.data().set(ProfileData.LatestMigration, migration);
	}

	#getPreviousMigratedVersion(defaultVersion: string): string {
		return this.#profile.data().get(ProfileData.LatestMigration, defaultVersion) as string;
	}
}

import { IProfileExportOptions } from "./contracts.js";

export interface IProfileExporter {
	/**
	 * Export the profile data to a base64 string.
	 *
	 * @param {string} [password]
	 * @param {IProfileExportOptions} [options]
	 * @return {string}
	 * @memberof Profile
	 */
	export(password?: string, options?: IProfileExportOptions): Promise<string>;
}

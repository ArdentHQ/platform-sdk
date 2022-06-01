import { IProfileData } from "./contracts.js";

export interface IProfileValidator {
	/**
	 * Validate the profile data
	 *
	 * @param {IProfileData} [data]
	 * @return {IProfileData}
	 * @memberof Profile
	 */
	validate(data: IProfileData): IProfileData;
}

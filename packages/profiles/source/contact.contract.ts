import { IContactAddressData, IContactAddressInput, IContactAddressRepository } from "./contracts.js";

/**
 * Defines the structure that represents a contact.
 *
 * @export
 * @interface IContactData
 */
export interface IContactData {
	id: string;
	name: string;
	addresses: IContactAddressData[];
	starred: boolean;
}

/**
 * Defines the implementation contract for a contact.
 *
 * @export
 * @interface IContact
 */
export interface IContact {
	/**
	 * Get the ID.
	 *
	 * @return {string}
	 * @memberof IContact
	 */
	id(): string;

	/**
	 * Get the name.
	 *
	 * @return {string}
	 * @memberof IContact
	 */
	name(): string;

	/**
	 * Get the address repository.
	 *
	 * @return {IContactAddressRepository}
	 * @memberof IContact
	 */
	addresses(): IContactAddressRepository;

	/**
	 * Determine if the contact is starred.
	 *
	 * @return {boolean}
	 * @memberof IContact
	 */
	isStarred(): boolean;

	/**
	 * Toggle the starred state.
	 *
	 * @memberof IContact
	 */
	toggleStarred(): void;

	/**
	 * Set the avatar.
	 *
	 * @param {string} value
	 * @memberof IContact
	 */
	setAvatar(value: string): void;

	/**
	 * Set the name.
	 *
	 * @param {string} name
	 * @memberof IContact
	 */
	setName(name: string): void;

	/**
	 * Set the addresses of the contact in bulk.
	 *
	 * @param {IContactAddressInput[]} addresses
	 * @return {void}
	 * @memberof IContact
	 */
	setAddresses(addresses: IContactAddressInput[]): void;

	/**
	 * Get the avatar.
	 *
	 * @return {string}
	 * @memberof IContact
	 */
	avatar(): string;

	/**
	 * Turn the contact into a normalised object.
	 *
	 * @return {IContactData}
	 * @memberof IContact
	 */
	toObject(): IContactData;
}

import { Exceptions } from "@ardenthq/sdk";

type TransactionData = Record<string, any>;

export class TransactionTypeService {
	public static isTransfer(data: TransactionData): boolean {
		return TransactionTypeService.#typeGroup(data) === 1 && data.type === 0;
	}

	public static isSecondSignature(data: TransactionData): boolean {
		return TransactionTypeService.#typeGroup(data) === 1 && data.type === 1;
	}

	public static isDelegateRegistration(data: TransactionData): boolean {
		return TransactionTypeService.#typeGroup(data) === 1 && data.type === 2;
	}

	public static isVoteCombination(data: TransactionData): boolean {
		return this.isVote(data) && this.isUnvote(data);
	}

	public static isVote(data: TransactionData): boolean {
		const isVote = TransactionTypeService.#typeGroup(data) === 1 && data.type === 3;

		if (!isVote) {
			return false;
		}

		return (data.asset?.votes || []).length > 0;
	}

	public static isUnvote(data: TransactionData): boolean {
		const isVote = TransactionTypeService.#typeGroup(data) === 1 && data.type === 3;

		if (!isVote) {
			return false;
		}

		return (data.asset?.unvotes || []).length > 0;
	}

	public static isMultiSignatureRegistration(data: TransactionData): boolean {
		return TransactionTypeService.#typeGroup(data) === 1 && data.type === 4;
	}

	public static isIpfs(data: TransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isIpfs.name);
	}

	public static isMultiPayment(data: TransactionData): boolean {
		return TransactionTypeService.#typeGroup(data) === 1 && data.type === 6;
	}

	// https://github.com/ArkEcosystem/mainsail/blob/develop/packages/contracts/source/contracts/crypto/enums.ts#L8C2-L8C22
	public static isUsernameRegistration(data: TransactionData): boolean {
		return TransactionTypeService.#typeGroup(data) === 1 && data.type === 8;
	}

	public static isDelegateResignation(data: TransactionData): boolean {
		return TransactionTypeService.#typeGroup(data) === 1 && data.type === 7;
	}

	public static isHtlcLock(data: TransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isHtlcLock.name);
	}

	public static isHtlcClaim(data: TransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isHtlcClaim.name);
	}

	public static isHtlcRefund(data: TransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isHtlcRefund.name);
	}

	public static isMagistrate(data: TransactionData): boolean {
		return TransactionTypeService.#typeGroup(data) === 2;
	}

	static #typeGroup(data: TransactionData): number {
		if (data.typeGroup === undefined) {
			return 1;
		}

		return data.typeGroup;
	}
}

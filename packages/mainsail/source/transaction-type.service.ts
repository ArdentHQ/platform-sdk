import { Exceptions } from "@ardenthq/sdk";
import { FunctionSigs } from "@mainsail/evm-contracts";

type TransactionData = Record<string, any>;

export const TransactionTypes = {
	Transfer: "0x",
	...FunctionSigs.ConsensusV1,
}

export class TransactionTypeService {
	public static isTransfer(data: TransactionData): boolean {
		return data.data === TransactionTypes.Transfer
	}

	public static isSecondSignature(data: TransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isSecondSignature.name);
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

	public static isUsernameRegistration(data: TransactionData): boolean {
		return TransactionTypeService.#typeGroup(data) === 1 && data.type === 8;
	}

	public static isUsernameResignation(data: TransactionData): boolean {
		return TransactionTypeService.#typeGroup(data) === 1 && data.type === 9;
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

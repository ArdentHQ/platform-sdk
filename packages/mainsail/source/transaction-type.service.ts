import { Exceptions } from "@ardenthq/sdk";
import { FunctionSigs } from "@mainsail/evm-contracts/distribution/function-sigs.js";

type TransactionData = Record<string, any>;

export const TransactionTypes = {
	MultiPayment: "0x88d695b2",
	RegisterUsername: "0xusernamereg",
	ResignUsername: "0xusernameres",
	Transfer: "0x",
	...FunctionSigs.ConsensusV1,
};

export const trimHexPrefix = (type: string): string => {
	return type.replace(/^0x/, "");
};

export class TransactionTypeService {
	public static isTransfer(data: TransactionData): boolean {
		return data.data === TransactionTypes.Transfer;
	}

	public static isSecondSignature(data: TransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isSecondSignature.name);
	}

	public static isDelegateRegistration(data: TransactionData): boolean {
		return data.data.startsWith(TransactionTypes.RegisterValidator);
	}

	public static isVoteCombination(data: TransactionData): boolean {
		return false;
	}

	public static isVote(data: TransactionData): boolean {
		return data.data.startsWith(TransactionTypes.Vote);
	}

	public static isUnvote(data: TransactionData): boolean {
		return data.data.startsWith(TransactionTypes.Unvote);
	}

	public static isMultiSignatureRegistration(data: TransactionData): boolean {
		return false;
	}

	public static isIpfs(data: TransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isIpfs.name);
	}

	public static isMultiPayment(data: TransactionData): boolean {
		return data.data.startsWith(TransactionTypes.MultiPayment);
	}

	public static isUsernameRegistration(data: TransactionData): boolean {
		return data.data.startsWith(TransactionTypes.RegisterUsername);
	}

	public static isUsernameResignation(data: TransactionData): boolean {
		return data.data.startsWith(TransactionTypes.ResignUsername);
	}

	public static isDelegateResignation(data: TransactionData): boolean {
		return data.data.startsWith(TransactionTypes.ResignValidator);
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
		return false;
	}
}

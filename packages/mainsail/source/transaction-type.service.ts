import { Exceptions } from "@ardenthq/sdk";
import { FunctionSigs } from "@mainsail/evm-contracts";

type TransactionData = Record<string, any>;

export const TransactionTypes = {
	MultiPayment: "0x88d695b2",
	RegisterUsername: "0xusernamereg",
	ResignUsername: "0xusernameres",
	Transfer: "",
	...FunctionSigs.ConsensusV1,
} as const;

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
		return this.isValidatorRegistration(data);
	}

	public static isValidatorRegistration(data: TransactionData): boolean {
		// When signing transaction, mainsail removes the 0x prefix form the data payload forcing these tx type checks to always be false
		// as the TransactionTypes from mainsail consensus are always prefixed with 0x.
		// @TODO: Revisit these checks. See relevant issue https://app.clickup.com/t/86dvawadc
		return data.data.includes(TransactionTypes.RegisterValidator.slice(2)); // remove `0x` prefix from api response
	}

	public static isVoteCombination(data: TransactionData): boolean {
		return false;
	}

	public static isVote(data: TransactionData): boolean {
		// When signing transaction, mainsail removes the 0x prefix form the data payload forcing these tx type checks to always be false
		// as the TransactionTypes from mainsail consensus are always prefixed with 0x.
		// @TODO: Revisit these checks. See relevant issue https://app.clickup.com/t/86dvawadc
		return data.data.includes(TransactionTypes.Vote.slice(2)); // remove `0x` prefix from api response
	}

	public static isUnvote(data: TransactionData): boolean {
		// When signing transaction, mainsail removes the 0x prefix form the data payload forcing these tx type checks to always be false
		// as the TransactionTypes from mainsail consensus are always prefixed with 0x.
		// @TODO: Revisit these checks. See relevant issue https://app.clickup.com/t/86dvawadc
		return data.data.includes(TransactionTypes.Unvote.slice(2)); // remove `0x` prefix from api response
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
		return this.isValidatorResignation(data);
	}

	public static isValidatorResignation(data: TransactionData): boolean {
		// When signing transaction, mainsail removes the 0x prefix form the data payload forcing these tx type checks to always be false
		// as the TransactionTypes from mainsail consensus are always prefixed with 0x.
		// @TODO: Revisit these checks. See relevant issue https://app.clickup.com/t/86dvawadc
		return data.data.includes(TransactionTypes.ResignValidator.slice(2)); // remove `0x` prefix from api response
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

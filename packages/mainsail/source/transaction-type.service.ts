import { Exceptions } from "@ardenthq/sdk";

type TransactionData = Record<string, any>;

export enum PayloadSignature {
	TRANSFER = "a9059cbb",
	VALIDATOR_REGISTRATION = "602a9eee",
	VALIDATOR_RESIGNATION = "b85f5da2",
	VOTE = "6dd7d8ea",
	UNVOTE = "3174b689",
	MULTIPAYMENT = "88d695b2",
	USERNAME_REGISTRATION = "username-registration",
	USERNAME_RESIGNATION = "username-resignation",
}

export class TransactionTypeService {
	public static isTransfer(data: TransactionData): boolean {
		return data.data.startsWith(this.prependHex(PayloadSignature.TRANSFER));
	}

	public static isSecondSignature(data: TransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isSecondSignature.name);
	}

	public static isDelegateRegistration(data: TransactionData): boolean {
		return data.data.startsWith(this.prependHex(PayloadSignature.VALIDATOR_REGISTRATION));
	}

	public static isVoteCombination(data: TransactionData): boolean {
		return false;
	}

	public static isVote(data: TransactionData): boolean {
		return data.data.startsWith(this.prependHex(PayloadSignature.VOTE));
	}

	public static isUnvote(data: TransactionData): boolean {
		return data.data.startsWith(this.prependHex(PayloadSignature.UNVOTE));
	}

	public static isMultiSignatureRegistration(data: TransactionData): boolean {
		return false;
	}

	public static isIpfs(data: TransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isIpfs.name);
	}

	public static isMultiPayment(data: TransactionData): boolean {
		return data.data.startsWith(this.prependHex(PayloadSignature.MULTIPAYMENT));
	}

	public static isUsernameRegistration(data: TransactionData): boolean {
		return data.data.startsWith(this.prependHex(PayloadSignature.USERNAME_REGISTRATION));
	}

	public static isUsernameResignation(data: TransactionData): boolean {
		return data.data.startsWith(this.prependHex(PayloadSignature.USERNAME_RESIGNATION));
	}

	public static isDelegateResignation(data: TransactionData): boolean {
		return data.data.startsWith(this.prependHex(PayloadSignature.VALIDATOR_RESIGNATION));
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

	static prependHex(signature: PayloadSignature): string {
		return "0x" + signature;
	}
}

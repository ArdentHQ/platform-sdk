import { Exceptions } from "@ardenthq/sdk";

type TransactionData = Record<string, any>;

export class TransactionTypeService {
	public static isTransfer(data: TransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isTransfer.name);
	}

	public static isSecondSignature(data: TransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isSecondSignature.name);
	}

	public static isDelegateRegistration(data: TransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isDelegateRegistration.name);
	}

	public static isVoteCombination(data: TransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isVoteCombination.name);
	}

	public static isVote(data: TransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isVote.name);
	}

	public static isUnvote(data: TransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isUnvote.name);
	}

	public static isMultiSignatureRegistration(data: TransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isMultiSignatureRegistration.name);
	}

	public static isIpfs(data: TransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isIpfs.name);
	}

	public static isMultiPayment(data: TransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isMultiPayment.name);
	}

	public static isDelegateResignation(data: TransactionData): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isDelegateResignation.name);
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
		throw new Exceptions.NotImplemented(this.constructor.name, this.isMagistrate.name);
	}
}

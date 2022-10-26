import { Contracts, DTO, Exceptions } from "@ardenthq/sdk";
import { BigNumber } from "@ardenthq/sdk-helpers";
import { DateTime } from "@ardenthq/sdk-intl";

export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData
{
	public override sender(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, this.sender.name);
	}

	public override recipient(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, this.recipient.name);
	}

	public override amount(): BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, this.amount.name);
	}

	public override fee(): BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, this.fee.name);
	}

	public override memo(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.memo.name);
	}

	public override timestamp(): DateTime {
		throw new Exceptions.NotImplemented(this.constructor.name, this.timestamp.name);
	}

	public override isTransfer(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isTransfer.name);
	}

	public override isSecondSignature(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isSecondSignature.name);
	}

	public override isDelegateRegistration(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isDelegateRegistration.name);
	}

	public override isVoteCombination(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isVoteCombination.name);
	}

	public override isVote(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isVote.name);
	}

	public override isUnvote(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isUnvote.name);
	}

	public override isMultiSignatureRegistration(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isMultiSignatureRegistration.name);
	}

	public override isIpfs(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isIpfs.name);
	}

	public override isMultiPayment(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isMultiPayment.name);
	}

	public override isDelegateResignation(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isDelegateResignation.name);
	}

	public override isHtlcLock(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isHtlcLock.name);
	}

	public override isHtlcClaim(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isHtlcClaim.name);
	}

	public override isHtlcRefund(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isHtlcRefund.name);
	}

	public override isMagistrate(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isMagistrate.name);
	}

	public override usesMultiSignature(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.usesMultiSignature.name);
	}

	public override toBroadcast() {
		throw new Exceptions.NotImplemented(this.constructor.name, this.toBroadcast.name);
	}
}

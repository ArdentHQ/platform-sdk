import { Contracts, DTO, Exceptions } from "@ardenthq/sdk";
import { BigNumber } from "@ardenthq/sdk-helpers";
import { DateTime } from "@ardenthq/sdk-intl";

import { TransactionTypeService } from "./transaction-type.service.js";

export class ConfirmedTransactionData extends DTO.AbstractConfirmedTransactionData {
	public override id(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, this.id.name);
	}

	public override blockId(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.blockId.name);
	}

	public override timestamp(): DateTime | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.timestamp.name);
	}

	public override confirmations(): BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, this.confirmations.name);
	}

	public override sender(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, this.sender.name);
	}

	public override recipient(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, this.recipient.name);
	}

	public override recipients(): Contracts.MultiPaymentRecipient[] {
		throw new Exceptions.NotImplemented(this.constructor.name, this.recipients.name);
	}

	public override amount(): BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, this.amount.name);
	}

	public override fee(): BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, this.fee.name);
	}

	public override asset(): Record<string, unknown> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.asset.name);
	}

	public override isReturn(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isReturn.name);
	}

	public override isSent(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isSent.name);
	}

	public override isReceived(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isReceived.name);
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

	// Delegate Registration
	public override username(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, this.username.name);
	}

	// Transfer
	public override memo(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.memo.name);
	}

	// Vote
	public override votes(): string[] {
		throw new Exceptions.NotImplemented(this.constructor.name, this.votes.name);
	}

	public override unvotes(): string[] {
		throw new Exceptions.NotImplemented(this.constructor.name, this.unvotes.name);
	}

	// Second-Signature Registration
	public override secondPublicKey(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, this.secondPublicKey.name);
	}

	// Multi-Signature Registration
	public override publicKeys(): string[] {
		throw new Exceptions.NotImplemented(this.constructor.name, this.publicKeys.name);
	}

	public override min(): number {
		throw new Exceptions.NotImplemented(this.constructor.name, this.min.name);
	}

	// Multi-Payment
	public override payments(): { recipientId: string; amount: BigNumber }[] {
		throw new Exceptions.NotImplemented(this.constructor.name, this.payments.name);
	}

	// IPFS
	public override hash(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, this.hash.name);
	}

	// HTLC Claim / Refund
	public override lockTransactionId(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, this.lockTransactionId.name);
	}

	// HTLC Claim
	public override unlockSecret(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, this.unlockSecret.name);
	}

	// HTLC Lock
	public override secretHash(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, this.secretHash.name);
	}

	public override expirationType(): number {
		throw new Exceptions.NotImplemented(this.constructor.name, this.expirationType.name);
	}

	public override expirationValue(): number {
		throw new Exceptions.NotImplemented(this.constructor.name, this.expirationValue.name);
	}
}

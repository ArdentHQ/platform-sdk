import { Contracts, DTO } from "@ardenthq/sdk";
import { MultiPaymentItem } from "@ardenthq/sdk/source/confirmed-transaction.dto.contract.js";
import { DateTime } from "@ardenthq/sdk-intl";
import { BigNumber } from "bignumber.js";

import { Identities } from "./crypto/index.js";
import { TransactionTypeService } from "./transaction-type.service.js";

export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData {
	public override sender(): string {
		return Identities.Address.fromPublicKey(this.signedData.senderPublicKey);
	}

	public override recipient(): string {
		return this.signedData.recipientId;
	}

	public override amount(): BigNumber {
		if (this.isMultiPayment()) {
			return new BigNumber(
				this.signedData.asset.payments.reduce((sum, { amount }) => sum.plus(amount), new BigNumber(0)),
			);
		}

		return new BigNumber(this.signedData.amount);
	}

	public override payments(): MultiPaymentItem[] {
		return this.signedData.asset.payments.map((payment: MultiPaymentItem) => ({
			address: payment.recipientId,
			amount: new BigNumber(payment.amount),
		}));
	}

	public override fee(): BigNumber {
		return new BigNumber(this.signedData.fee);
	}

	public override memo(): string | undefined {
		return this.signedData.vendorField;
	}

	public override nonce(): BigNumber {
		return new BigNumber(this.signedData.nonce);
	}

	public override timestamp(): DateTime {
		if (this.signedData.timestamp) {
			return DateTime.make(this.signedData.timestamp);
		}

		return DateTime.make();
	}

	public override isTransfer(): boolean {
		return TransactionTypeService.isTransfer(this.signedData);
	}

	public override isSecondSignature(): boolean {
		return TransactionTypeService.isSecondSignature(this.signedData);
	}

	public override isDelegateRegistration(): boolean {
		return TransactionTypeService.isDelegateRegistration(this.signedData);
	}

	public override isVoteCombination(): boolean {
		return TransactionTypeService.isVoteCombination(this.signedData);
	}

	public override isVote(): boolean {
		return TransactionTypeService.isVote(this.signedData);
	}

	public override isUnvote(): boolean {
		return TransactionTypeService.isUnvote(this.signedData);
	}

	public override isMultiSignatureRegistration(): boolean {
		return TransactionTypeService.isMultiSignatureRegistration(this.signedData);
	}

	public override isIpfs(): boolean {
		return TransactionTypeService.isIpfs(this.signedData);
	}

	public override isMultiPayment(): boolean {
		return TransactionTypeService.isMultiPayment(this.signedData);
	}

	public override isDelegateResignation(): boolean {
		return TransactionTypeService.isDelegateResignation(this.signedData);
	}

	public override isHtlcLock(): boolean {
		return TransactionTypeService.isHtlcLock(this.signedData);
	}

	public override isHtlcClaim(): boolean {
		return TransactionTypeService.isHtlcClaim(this.signedData);
	}

	public override isHtlcRefund(): boolean {
		return TransactionTypeService.isHtlcRefund(this.signedData);
	}

	public override isMagistrate(): boolean {
		return TransactionTypeService.isMagistrate(this.signedData);
	}

	public override usesMultiSignature(): boolean {
		return !!this.signedData.multiSignature;
	}

	public override votes(): string[] {
		return this.signedData.asset.votes
			.filter((vote: string) => vote.startsWith("+"))
			.map((publicKey: string) => publicKey.slice(1));
	}

	public override unvotes(): string[] {
		return this.signedData.asset.votes
			.filter((vote: string) => vote.startsWith("-"))
			.map((publicKey: string) => publicKey.slice(1));
	}

	public override toBroadcast() {
		const broadcastData = super.normalizeTransactionData<Contracts.RawTransactionData>(this.broadcastData);
		delete broadcastData.timestamp;
		return broadcastData;
	}
}

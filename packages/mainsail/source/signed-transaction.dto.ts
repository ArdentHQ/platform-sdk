import { Contracts, DTO, Exceptions } from "@ardenthq/sdk";
import { BigNumber } from "@ardenthq/sdk-helpers";
import { DateTime } from "@ardenthq/sdk-intl";
import { Utils } from "@mainsail/crypto-transaction";
import { Hash } from "./crypto/hash.js";

import { Identities, Transactions } from "./crypto/index.js";
import { getApp } from "./transaction.service";
import { TransactionTypeService } from "./transaction-type.service.js";

export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData
{
	public override sender(): string {
		return Identities.Address.fromPublicKey(this.signedData.senderPublicKey);
	}

	public override recipient(): string {
		return this.signedData.recipientId;
	}

	public override amount(): BigNumber {
		if (this.isMultiPayment()) {
			return this.bigNumberService.make(
				BigNumber.sum(this.signedData.asset.payments.map(({ amount }) => amount)),
			);
		}

		return this.bigNumberService.make(this.signedData.amount);
	}

	public override fee(): BigNumber {
		return this.bigNumberService.make(this.signedData.fee);
	}

	public override memo(): string | undefined {
		return this.signedData.vendorField;
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

	public override isUsernameRegistration(): boolean {
		return TransactionTypeService.isUsernameRegistration(this.signedData);
	}

	public override isUsernameResignation(): boolean {
		return TransactionTypeService.isUsernameResignation(this.signedData);
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

	public override username(): string {
		return this.signedData.asset.username;
	}

	public override isIpfs(): boolean {
		return false;
	}

	public override isMultiPayment(): boolean {
		return TransactionTypeService.isMultiPayment(this.signedData);
	}

	public override isDelegateResignation(): boolean {
		return TransactionTypeService.isDelegateResignation(this.signedData);
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
		return TransactionTypeService.isMagistrate(this.signedData);
	}

	public override usesMultiSignature(): boolean {
		return !!this.signedData.multiSignature;
	}

	public override async toBroadcast() {
		const app = await getApp();
		const serialized = await app.resolve(Utils).toBytes(this.broadcastData);

		return serialized.toString("hex");
	}

	public async generateHash(options: { excludeMultiSignature?: boolean } = {}) {
		const app = await getApp();
		return app.resolve(Utils).toHash(this.signedData, {
			excludeMultiSignature: options?.excludeMultiSignature ?? true,
			excludeSignature: true,
		});
	}

	public async sanitizeSignatures(): Promise<void> {
		const transaction = this.signedData;

		const validSignatures: string[] = [];
		const signatures: string[] = this.signedData.signatures ?? ([] as string[]);

		for (const signature of signatures) {
			const publicKeyIndex: number = parseInt(signature.slice(0, 2), 16);
			const partialSignature: string = signature.slice(2, 130);
			const publicKey: string = transaction.multiSignature.publicKeys[publicKeyIndex];

			const hash = await this.generateHash();

			const isValid = Hash.verifySchnorr(hash, partialSignature, publicKey);

			if (isValid) {
				validSignatures.push(signature);
			}
		}

		transaction.signatures = validSignatures;

		if (transaction.signature) {
			const hash = await this.generateHash({ excludeMultiSignature: false });
			const isValid = Hash.verifySchnorr(hash, transaction.signature, transaction.senderPublicKey!);

			if (!isValid) {
				transaction.signature = undefined;
			}
		}
	}
}

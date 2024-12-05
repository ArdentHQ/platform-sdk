import { Contracts, DTO, Exceptions, IoC, Services } from "@ardenthq/sdk";
import { BigNumber } from "@ardenthq/sdk-helpers";
import { DateTime } from "@ardenthq/sdk-intl";

import { BindingType } from "./coin.contract.js";
import { parseUnits } from "./helpers/parse-units.js";
import { TransactionTypeService } from "./transaction-type.service.js";
import { decodeFunctionData } from "./helpers/decode-function-data.js";

export class ConfirmedTransactionData extends DTO.AbstractConfirmedTransactionData {
	readonly #addressService: Services.AddressService;

	public constructor(container: IoC.IContainer) {
		super(container);

		this.#addressService = container.get(BindingType.AddressService);
	}

	public override id(): string {
		return this.data.id;
	}

	public override nonce(): BigNumber {
		return this.data.nonce;
	}

	public override blockId(): string | undefined {
		return this.data.blockId;
	}

	public override timestamp(): DateTime | undefined {
		return DateTime.fromUnix(this.data.timestamp / 1000);
	}

	public override confirmations(): BigNumber {
		return BigNumber.make(this.data.confirmations);
	}

	public override sender(): string {
		return this.data.senderAddress;
	}

	public override recipient(): string {
		return this.data.recipient;
	}

	public override recipients(): Contracts.MultiPaymentRecipient[] {
		if (!this.isMultiPayment()) {
			return [];
		}

		return this.data.asset.payments.map((payment: { recipientId: string; amount: BigNumber }) => ({
			address: payment.recipientId,
			amount: this.bigNumberService.make(payment.amount),
		}));
	}

	public override amount(): BigNumber {
		// @TODO: handle evm multipayments.
		// if (this.isMultiPayment()) { }

		return this.bigNumberService.make(this.data.amount);
	}

	public override fee(): BigNumber {
		return this.bigNumberService.make(parseUnits(this.data.gasPrice, "ark"));
	}

	public override asset(): Record<string, unknown> {
		return this.data.asset || {};
	}

	public override isReturn(): boolean {
		if (this.isTransfer()) {
			return this.isSent() && this.isReceived();
		}

		if (this.isMultiPayment()) {
			return this.recipients().some(({ address }: Contracts.MultiPaymentRecipient) => address === this.sender());
		}

		return false;
	}

	public override isSent(): boolean {
		return [this.getMeta("address"), this.getMeta("publicKey")].includes(this.sender());
	}

	public override isReceived(): boolean {
		return [this.getMeta("address"), this.getMeta("publicKey")].includes(this.recipient());
	}

	public override isTransfer(): boolean {
		return TransactionTypeService.isTransfer(this.data);
	}

	public override isSecondSignature(): boolean {
		return false;
	}

	public override isUsernameRegistration(): boolean {
		return TransactionTypeService.isUsernameRegistration(this.data);
	}

	public override isUsernameResignation(): boolean {
		return TransactionTypeService.isUsernameResignation(this.data);
	}

	public override isDelegateRegistration(): boolean {
		return this.isValidatorRegistration();
	}

	public override isValidatorRegistration(): boolean {
		return TransactionTypeService.isValidatorRegistration(this.data);
	}

	public override isVoteCombination(): boolean {
		return TransactionTypeService.isVoteCombination(this.data);
	}

	public override isVote(): boolean {
		return TransactionTypeService.isVote(this.data);
	}

	public override isUnvote(): boolean {
		return TransactionTypeService.isUnvote(this.data);
	}

	public override isMultiSignatureRegistration(): boolean {
		return TransactionTypeService.isMultiSignatureRegistration(this.data);
	}

	public override isMultiPayment(): boolean {
		return TransactionTypeService.isMultiPayment(this.data);
	}

	public override isDelegateResignation(): boolean {
		return this.isValidatorResignation();
	}

	public override isValidatorResignation(): boolean {
		return TransactionTypeService.isValidatorResignation(this.data);
	}

	public override isMagistrate(): boolean {
		return TransactionTypeService.isMagistrate(this.data);
	}

	// Username registration
	public override username(): string {
		return this.data.asset?.username;
	}

	public override validatorPublicKey(): string {
		const key = decodeFunctionData(this.data.data).args[0] as string;
		return key.slice(2); // removes 0x part
	}

	// Transfer
	public override memo(): string | undefined {
		return this.data.vendorField;
	}

	// Vote
	public override votes(): string[] {
		return this.data.asset?.votes ?? [];
	}

	public override unvotes(): string[] {
		return this.data.asset?.unvotes ?? [];
	}

	// Second-Signature Registration
	public override secondPublicKey(): string {
		return this.data.asset.signature.publicKey;
	}

	// Multi-Signature Registration
	public override publicKeys(): string[] {
		return this.data.asset.multiSignature.publicKeys;
	}

	public override min(): number {
		return this.data.asset.multiSignature.min;
	}

	// Multi-Payment
	public override payments(): { recipientId: string; amount: BigNumber }[] {
		return this.data.asset.payments.map((payment: { recipientId: string; amount: BigNumber }) => ({
			address: payment.recipientId,
			amount: this.bigNumberService.make(payment.amount),
		}));
	}

	public override methodHash(): string | undefined {
		return this.data.data.slice(0, 10)
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
		return this.data.asset.lock.expiration.type;
	}

	public override expirationValue(): number {
		return this.data.asset.lock.expiration.value;
	}

	public override async normalizeData(): Promise<void> {
		this.data.sender = (await this.#addressService.fromPublicKey(this.data.senderPublicKey)).address;
	}

	public override isSuccess(): boolean {
		return this.data.success === true;
	}
}

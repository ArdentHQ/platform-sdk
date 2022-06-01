import { Contracts, DTO, Exceptions, IoC } from "@ardenthq/sdk";
import { DateTime } from "@ardenthq/sdk-intl";
import { BigNumber } from "@ardenthq/sdk-helpers";

export class ConfirmedTransactionData extends DTO.AbstractConfirmedTransactionData {
	public override id(): string {
		return this.data.transaction_hash || this.data.id;
	}

	public override timestamp(): DateTime | undefined {
		return DateTime.make(this.data.created_at);
	}

	public override confirmations(): BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, this.confirmations.name);
	}

	public override sender(): string {
		return this.data.from || this.data.operation.from;
	}

	public override recipient(): string {
		return this.data.to || this.data.operation.to;
	}

	public override amount(): BigNumber {
		const amount = BigNumber.powerOfTen(this.decimals!).times(this.data.amount || this.data.operation.amount);
		return this.bigNumberService.make(amount);
	}

	// todo: with the "transaction" method we get a nonce but with "transactions" it isn't available
	public override fee(): BigNumber {
		const fee = BigNumber.powerOfTen(this.decimals!).times(this.data.fee_charged || 0);
		return this.bigNumberService.make(fee);
	}
}

import { DTO, IoC } from "@ardenthq/sdk";
import { DateTime } from "@ardenthq/sdk-intl";
import { BigNumber } from "@ardenthq/sdk-helpers";

export class ConfirmedTransactionData extends DTO.AbstractConfirmedTransactionData {
	public override id(): string {
		return this.data.hash;
	}

	public override timestamp(): DateTime | undefined {
		return DateTime.make(this.data.date);
	}

	public override sender(): string {
		return this.data.Account;
	}

	public override recipient(): string {
		return this.data.Destination;
	}

	public override amount(): BigNumber {
		const value = typeof this.data.Amount === "string" ? this.data.Amount : this.data.Amount.value;
		return this.bigNumberService.make(value).times(BigNumber.powerOfTen(this.decimals!));
	}

	public override fee(): BigNumber {
		return this.bigNumberService.make(this.data.Fee).times(BigNumber.powerOfTen(this.decimals!));
	}

	public override isConfirmed(): boolean {
		return this.data.validated;
	}

	public override isTransfer(): boolean {
		return this.data.TransactionType === "Payment";
	}
}

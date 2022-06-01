import { Contracts, DTO, IoC } from "@ardenthq/sdk";
import { DateTime } from "@ardenthq/sdk-intl";
import { BigNumber } from "@ardenthq/sdk-helpers";

export class ConfirmedTransactionData extends DTO.AbstractConfirmedTransactionData {
	public override id(): string {
		return this.data.hash;
	}

	public override blockId(): string | undefined {
		return this.data.hash;
	}

	public override timestamp(): DateTime {
		return DateTime.fromUnix(this.data.local_timestamp);
	}

	public override sender(): string {
		if (this.isSent()) {
			return this.data._origin;
		}

		return this.data.account;
	}

	public override recipient(): string {
		if (this.isReceived()) {
			return this.data._origin;
		}

		return this.data.account;
	}

	public override amount(): BigNumber {
		return this.bigNumberService.make(this.data.amount);
	}

	public override isConfirmed(): boolean {
		return true;
	}

	public override isSent(): boolean {
		return this.data.type === "send";
	}

	public override isReceived(): boolean {
		return this.data.type === "receive";
	}
}

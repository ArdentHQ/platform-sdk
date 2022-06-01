import { DTO } from "@ardenthq/sdk";
import { BigNumber } from "@ardenthq/sdk-helpers";
import { DateTime } from "@ardenthq/sdk-intl";

export class ConfirmedTransactionData extends DTO.AbstractConfirmedTransactionData {
	public override id(): string {
		return this.data.txid;
	}

	public override timestamp(): DateTime | undefined {
		return DateTime.fromUnix(this.data.time);
	}

	public override sender(): string {
		return this.data.address_from;
	}

	public override recipient(): string {
		return this.data.address_to;
	}

	public override amount(): BigNumber {
		return this.bigNumberService.make(this.data.amount);
	}

	public override fee(): BigNumber {
		return BigNumber.ZERO;
	}
}

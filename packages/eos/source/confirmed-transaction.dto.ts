import { DTO } from "@ardenthq/sdk";
import { BigNumber } from "@ardenthq/sdk-helpers";

export class ConfirmedTransactionData extends DTO.AbstractConfirmedTransactionData {
	public override id(): string {
		return this.data.hash;
	}

	public override sender(): string {
		return this.data.from;
	}

	public override recipient(): string {
		return this.data.to;
	}

	public override amount(): BigNumber {
		return this.bigNumberService.make(this.data.value);
	}

	public override fee(): BigNumber {
		return this.bigNumberService.make(this.data.gas);
	}

	public override memo(): string | undefined {
		return this.data.data;
	}
}

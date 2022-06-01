import { DTO, IoC } from "@ardenthq/sdk";
import { BigNumber } from "@ardenthq/sdk-helpers";
import { DateTime } from "@ardenthq/sdk-intl";

export class ConfirmedTransactionData extends DTO.AbstractConfirmedTransactionData {
	public override id(): string {
		return this.data.txhash;
	}

	public override timestamp(): DateTime | undefined {
		return DateTime.make(this.data.timestamp);
	}

	public override sender(): string {
		const event = this.data.events.find(({ type }) => type === "message");
		const attribute = event.attributes.find(({ key }) => key === "sender");

		return attribute.value;
	}

	public override recipient(): string {
		const event = this.data.events.find(({ type }) => type === "transfer");
		const attribute = event.attributes.find(({ key }) => key === "recipient");

		return attribute.value;
	}

	// @ts-ignore
	public amount(): BigNumber {
		const event = this.data.events.find(({ type }) => type === "transfer");
		const attribute = event.attributes.find(({ key }) => key === "amount");

		return this.bigNumberService.make(attribute.value.replace(/\D/g, ""));
	}

	public override fee(): BigNumber {
		return this.bigNumberService.make(this.data.gas_used);
	}

	public override memo(): string | undefined {
		return this.data.tx.value.memo;
	}
}

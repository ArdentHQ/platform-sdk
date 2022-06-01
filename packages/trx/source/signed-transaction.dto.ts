import { Contracts, DTO, IoC } from "@ardenthq/sdk";
import { DateTime } from "@ardenthq/sdk-intl";
import { BigNumber } from "@ardenthq/sdk-helpers";

export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData
{
	public override sender(): string {
		return this.signedData.raw_data.contract[0].parameter.value.owner_address;
	}

	public override recipient(): string {
		return this.signedData.raw_data.contract[0].parameter.value.to_address;
	}

	public override amount(): BigNumber {
		return this.bigNumberService.make(this.signedData.raw_data.contract[0].parameter.value.amount);
	}

	public override timestamp(): DateTime {
		return DateTime.make(this.signedData.raw_data.timestamp);
	}
}

import { Contracts, DTO } from "@ardenthq/sdk";
import { BigNumber } from "@ardenthq/sdk-helpers";
import { DateTime } from "@ardenthq/sdk-intl";

export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData
{
	public override sender(): string {
		return this.signedData.sender;
	}

	public override recipient(): string {
		return this.signedData.receiver;
	}

	public override amount(): BigNumber {
		return this.bigNumberService.make(this.signedData.value);
	}

	public override fee(): BigNumber {
		return BigNumber.make(this.signedData.gasUsed).times(this.signedData.gasPrice);
	}

	public override timestamp(): DateTime {
		return DateTime.make(this.signedData.timestamp);
	}
}

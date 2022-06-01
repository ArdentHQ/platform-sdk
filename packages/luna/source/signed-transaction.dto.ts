import { Contracts, DTO, Exceptions, IoC } from "@ardenthq/sdk";
import { DateTime } from "@ardenthq/sdk-intl";
import { BigNumber } from "@ardenthq/sdk-helpers";

export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData
{
	public override sender(): string {
		return "TODO";
	}

	public override recipient(): string {
		return "TODO";
	}

	public override amount(): BigNumber {
		return BigNumber.ZERO;
	}

	public override timestamp(): DateTime {
		throw new Exceptions.NotImplemented(this.constructor.name, this.timestamp.name);
	}
}

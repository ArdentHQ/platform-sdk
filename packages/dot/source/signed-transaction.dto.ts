import { Contracts, DTO, IoC } from "@ardenthq/sdk";
import { DateTime } from "@ardenthq/sdk-intl";
import { BigNumber } from "@ardenthq/sdk-helpers";

export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData
{
	public override sender(): string {
		return this.signedData.signature.signer;
	}

	public override recipient(): string {
		return this.signedData.method.args.dest;
	}

	public override amount(): BigNumber {
		return this.bigNumberService.make(this.signedData.method.args.value);
	}

	public override fee(): BigNumber {
		return BigNumber.ZERO;
	}

	public override timestamp(): DateTime {
		return DateTime.make(this.signedData.timestamp);
	}
}

import { Contracts, Exceptions, Services } from "@ardenthq/sdk";
import { BigNumber } from "@ardenthq/sdk-helpers";

export class FeeService extends Services.AbstractFeeService {
	public override async all(): Promise<Services.TransactionFees> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.all.name);
	}

	public override async calculate(
		transaction: Contracts.RawTransactionData,
		options?: Services.TransactionFeeOptions,
	): Promise<BigNumber> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.calculate.name);
	}
}

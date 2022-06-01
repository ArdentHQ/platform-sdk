import { Contracts, DTO, IoC } from "@ardenthq/sdk";
import { DateTime } from "@ardenthq/sdk-intl";
import { BigNumber } from "@ardenthq/sdk-helpers";

export class ConfirmedTransactionData extends DTO.AbstractConfirmedTransactionData {
	public override id(): string {
		return this.data.hash;
	}

	public override timestamp(): DateTime {
		return DateTime.make(this.data.includedAt);
	}

	public override sender(): string {
		return this.data.inputs[0].address;
	}

	public override recipient(): string {
		return this.recipients()[0].address;
	}

	public override recipients(): Contracts.MultiPaymentRecipient[] {
		return this.data.outputs
			.sort((a, b) => a.index - b.index)
			.map((out) => ({
				address: out.address,
				amount: this.bigNumberService.make(out.value),
			}));
	}

	public override inputs(): Contracts.UnspentTransactionData[] {
		return this.data.inputs.map(
			(input: Contracts.KeyValuePair) =>
				new DTO.UnspentTransactionData({
					id: input.sourceTransaction.hash,
					amount: this.bigNumberService.make(input.value),
					addresses: [input.address],
				}),
		);
	}

	public override outputs(): Contracts.UnspentTransactionData[] {
		return this.data.outputs.map(
			(output: Contracts.KeyValuePair) =>
				new DTO.UnspentTransactionData({
					amount: this.bigNumberService.make(output.value),
					addresses: [output.address],
				}),
		);
	}

	public override amount(): BigNumber {
		const totalInput = BigNumber.sum(this.data.inputs.map(({ value }) => value));

		const changeOutput =
			this.data.outputs <= 1
				? BigNumber.ZERO
				: this.bigNumberService.make(
						this.data.outputs.sort((a, b) => a.index - b.index)[this.data.outputs.length - 1].value,
				  );

		const netAmount = totalInput.minus(changeOutput).minus(this.fee());
		return this.bigNumberService.make(netAmount);
	}

	public override fee(): BigNumber {
		return this.bigNumberService.make(this.data.fee);
	}
}

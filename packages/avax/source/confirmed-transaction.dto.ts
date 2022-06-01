import { Contracts, DTO, IoC } from "@ardenthq/sdk";
import { Base64 } from "@ardenthq/sdk-cryptography";
import { DateTime } from "@ardenthq/sdk-intl";
import { BigNumber } from "@ardenthq/sdk-helpers";

export class ConfirmedTransactionData extends DTO.AbstractConfirmedTransactionData {
	public override id(): string {
		return this.data.id;
	}

	public override blockId(): string | undefined {
		return this.data.txBlockId;
	}

	public override timestamp(): DateTime | undefined {
		return DateTime.make(this.data.timestamp);
	}

	public override sender(): string {
		const { addresses } = Object.values(this.data.inputs)[0] as { addresses: string[] };

		if (addresses) {
			return addresses[0];
		}

		if (this.data.__identifier__) {
			return this.data.__identifier__;
		}

		return this.getMeta("address") as string;
	}

	public override recipient(): string {
		const { addresses } = Object.values(this.data.outputs)[0] as { addresses: string[] };

		return addresses[0];
	}

	public override amount(): BigNumber {
		return this.bigNumberService.make(Object.values(this.data.outputTotals)[0] as string);
	}

	public override fee(): BigNumber {
		return this.bigNumberService.make(this.data.txFee);
	}

	public override inputs(): Contracts.UnspentTransactionData[] {
		return this.data.inputs.map(
			(input: Contracts.KeyValuePair) =>
				new DTO.UnspentTransactionData({
					id: input.transactionID,
					timestamp: DateTime.make(input.timestamp),
					amount: this.bigNumberService.make(input.amount),
					addresses: input.identifiers.map(({ value }) => value),
				}),
		);
	}

	public override outputs(): Contracts.UnspentTransactionData[] {
		return this.data.outputs.map(
			(output: Contracts.KeyValuePair) =>
				new DTO.UnspentTransactionData({
					id: output.transactionID,
					timestamp: DateTime.make(output.timestamp),
					amount: this.bigNumberService.make(output.amount),
					addresses: output.identifiers.map(({ value }) => value),
				}),
		);
	}

	public override isConfirmed(): boolean {
		return true;
	}

	public override isTransfer(): boolean {
		return this.data.type === "base";
	}

	public override memo(): string | undefined {
		try {
			return Base64.decode(this.data.memo);
		} catch {
			return undefined;
		}
	}
}

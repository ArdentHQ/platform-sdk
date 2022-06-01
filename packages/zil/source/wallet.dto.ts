import { Contracts, DTO, Exceptions } from "@ardenthq/sdk";
import { BigNumber } from "@ardenthq/sdk-helpers";

export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public override primaryKey(): string {
		return this.address();
	}

	public override address(): string {
		return this.data.address;
	}

	public override balance(): Contracts.WalletBalance {
		return {
			total: this.bigNumberService.make(this.data.balance).divide(1e4),
			available: this.bigNumberService.make(this.data.balance).divide(1e4),
			fees: this.bigNumberService.make(this.data.balance).divide(1e4),
		};
	}

	public override nonce(): BigNumber {
		return BigNumber.make(this.data.nonce);
	}
}

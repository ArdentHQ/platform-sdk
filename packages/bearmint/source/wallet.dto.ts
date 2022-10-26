import { Contracts, DTO, Exceptions } from "@ardenthq/sdk";
import { BigNumber } from "@ardenthq/sdk-helpers";

export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public override primaryKey(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, this.primaryKey.name);
	}

	public override address(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, this.address.name);
	}

	public override publicKey(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.publicKey.name);
	}

	public override balance(): Contracts.WalletBalance {
		throw new Exceptions.NotImplemented(this.constructor.name, this.balance.name);
	}

	public override nonce(): BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, this.nonce.name);
	}

	public override secondPublicKey(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.secondPublicKey.name);
	}

	public override username(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.username.name);
	}

	public override rank(): number | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.rank.name);
	}

	public override votes(): BigNumber | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.votes.name);
	}

	public override multiSignature(): Contracts.WalletMultiSignature {
		throw new Exceptions.NotImplemented(this.constructor.name, this.multiSignature.name);
	}

	public override isDelegate(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isDelegate.name);
	}

	public override isResignedDelegate(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isResignedDelegate.name);
	}

	public override isMultiSignature(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isMultiSignature.name);
	}

	public override isSecondSignature(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, this.isSecondSignature.name);
	}
}

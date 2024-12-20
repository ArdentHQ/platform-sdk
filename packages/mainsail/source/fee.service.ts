import { Contracts, IoC, Services } from "@ardenthq/sdk";
import { BigNumber } from "@ardenthq/sdk-helpers";

import { Request } from "./request.js";
import { GWEI_MULTIPLIER } from "./crypto/constants";

interface Fees {
	min: string;
	avg: string;
	max: string;
}

export class FeeService extends Services.AbstractFeeService {
	readonly #request: Request;

	public constructor(container: IoC.IContainer) {
		super(container);

		this.#request = new Request(
			container.get(IoC.BindingType.ConfigRepository),
			container.get(IoC.BindingType.HttpClient),
			container.get(IoC.BindingType.NetworkHostSelector),
		);
	}

	public override async all(): Promise<Services.TransactionFees> {
		const node = await this.#request.get("node/fees");
		const dynamicFees: Fees = node.data.evmCall;

		return {
			delegateRegistration: this.#transform(dynamicFees),
			delegateResignation: this.#transform(dynamicFees),
			ipfs: this.#transform(dynamicFees),
			multiPayment: this.#transform(dynamicFees),
			multiSignature: this.#transform(dynamicFees),
			secondSignature: this.#transform(dynamicFees),
			transfer: this.#transform(dynamicFees),
			usernameRegistration: this.#transform(dynamicFees),
			usernameResignation: this.#transform(dynamicFees),
			vote: this.#transform(dynamicFees),
		};
	}

	public override async calculate(
		transaction: Contracts.RawTransactionData,
		options?: Services.TransactionFeeOptions,
	): Promise<BigNumber> {
		const { multiSignature } = await this.all();

		if (Array.isArray(transaction.data()?.asset?.multiSignature?.publicKeys)) {
			return multiSignature.static.times(transaction.data().asset.multiSignature.publicKeys.length + 1);
		}

		return BigNumber.ZERO;
	}

	#transform(dynamicFees: Fees): Services.TransactionFee {
		return {
			avg: BigNumber.make(dynamicFees?.avg ?? "0").divide(GWEI_MULTIPLIER),
			isDynamic: true,
			max: BigNumber.make(dynamicFees?.max ?? "0").divide(GWEI_MULTIPLIER),
			min: BigNumber.make(dynamicFees?.min ?? "0").divide(GWEI_MULTIPLIER),
			static: BigNumber.make("0").divide(GWEI_MULTIPLIER),
		};
	}
}

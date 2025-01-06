import { Contracts, IoC, Services } from "@ardenthq/sdk";
import { BigNumber } from "@ardenthq/sdk-helpers";

import { Request } from "./request.js";
import { GWEI_MULTIPLIER } from "./crypto/constants.js";

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

		const fees = this.#transform(dynamicFees);

		return {
			delegateRegistration: fees,
			delegateResignation: fees,
			ipfs: fees,
			multiPayment: fees,
			multiSignature: fees,
			secondSignature: fees,
			transfer: fees,
			usernameRegistration: fees,
			usernameResignation: fees,
			vote: fees,
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

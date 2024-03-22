import { Contracts, IoC, Services } from "@ardenthq/sdk";
import { BigNumber, get } from "@ardenthq/sdk-helpers";

import { Request } from "./request.js";

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
		// @TODO: Uncomment when endpoint will be available in mainsail.
		// const type = await this.#request.get("transactions/fees");

		const dynamicFees: object = node.data;
		// @TODO: Remove and use /transactions/fees when available in mainsail.
		const staticFees: object = this.#transformDynamicFeesToStatic(dynamicFees);

		return {
			delegateRegistration: this.#transform("delegateRegistration", 1, staticFees, dynamicFees),
			delegateResignation: this.#transform("delegateResignation", 1, staticFees, dynamicFees),
			ipfs: this.#transform("ipfs", 1, staticFees, dynamicFees),
			multiPayment: this.#transform("multiPayment", 1, staticFees, dynamicFees),
			multiSignature: this.#transform("multiSignature", 1, staticFees, dynamicFees),
			secondSignature: this.#transform("secondSignature", 1, staticFees, dynamicFees),
			transfer: this.#transform("transfer", 1, staticFees, dynamicFees),
			vote: this.#transform("vote", 1, staticFees, dynamicFees),
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

	// @TODO: Replace with static fee api once available in mainsail.
	#transformDynamicFeesToStatic(dynamicFees: object): Object {
		// Defaults are taken from https://ark-test.arkvault.io/api/transactions/fees
		const defaults = {
			transfer: "10000000",
			secondSignature: "500000000",
			delegateRegistration: "2500000000",
			vote: "100000000",
			multiSignature: "500000000",
			ipfs: "500000000",
			multiPayment: "10000000",
			delegateResignation: "2500000000",
			entityRegistration: "5000000000",
			entityResignation: "500000000",
			entityUpdate: "500000000",
		};

		return {
			"1": {
				transfer: get(dynamicFees, "1.transfer.max", defaults.transfer),
				secondSignature: get(dynamicFees, "1.secondSignature.max", defaults.secondSignature),
				delegateRegistration: get(dynamicFees, "1.delegateRegistration.max", defaults.delegateRegistration),
				vote: get(dynamicFees, "1.vote.max", defaults.vote),
				multiSignature: get(dynamicFees, "1.multiSignature.max", defaults.multiSignature),
				ipfs: get(dynamicFees, "1.ipfs.max", defaults.ipfs),
				multiPayment: get(dynamicFees, "1.multiPayment.max", defaults.multiPayment),
				delegateResignation: get(dynamicFees, "1.delegateResignation.max", defaults.delegateResignation),
			},
			"2": {
				entityRegistration: get(dynamicFees, "2.entityRegistration.max", defaults.entityResignation),
				entityResignation: get(dynamicFees, "2.entityResignation.max", defaults.entityRegistration),
				entityUpdate: get(dynamicFees, "2.entityUpdate.max", defaults.entityUpdate),
			},
		};
	}

	#transform(type: string, typeGroup: number, staticFees: object, dynamicFees: object): Services.TransactionFee {
		const dynamicFee = (dynamicFees[typeGroup] ?? staticFees[typeGroup])[type] ?? "0";
		let minimumFee = this.bigNumberService.make(dynamicFee?.min ?? "0");
		let averageFee = this.bigNumberService.make(dynamicFee?.avg ?? "0");
		const maximumFee = this.bigNumberService.make(staticFees[typeGroup][type] ?? "0");

		if (type === "multiPayment") {
			minimumFee = maximumFee;
			averageFee = maximumFee;
		}

		return {
			avg: averageFee.isGreaterThan(maximumFee) ? maximumFee : averageFee,
			isDynamic:
				this.configRepository.get<string>("network.transactions.fees.type") !== "static" &&
				type !== "multiSignature",
			max: maximumFee,
			min: minimumFee.isGreaterThan(maximumFee) ? maximumFee : minimumFee,
			static: maximumFee,
		};
	}
}

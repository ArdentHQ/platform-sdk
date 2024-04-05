import { BigNumber } from "@ardenthq/sdk-helpers";

import { SignedTransactionData } from "./dto.js";

export interface TransactionFee {
	static: BigNumber;
	max: BigNumber;
	min: BigNumber;
	avg: BigNumber;
	isDynamic?: boolean;
}

export interface TransactionFees {
	// Core
	transfer: TransactionFee;
	secondSignature: TransactionFee;
	delegateRegistration: TransactionFee;
	usernameRegistration: TransactionFee;
	vote: TransactionFee;
	multiSignature: TransactionFee;
	ipfs: TransactionFee;
	multiPayment: TransactionFee;
	delegateResignation: TransactionFee;
}

export interface FeeService {
	all(): Promise<TransactionFees>;

	calculate(transaction: SignedTransactionData, options?: TransactionFeeOptions): Promise<BigNumber>;
}

export interface TransactionFeeOptions {
	priority?: "slow" | "average" | "fast";
}

import { TransactionSchema } from "../transactions/types/schemas.js";
import { BigNumber } from "@ardenthq/sdk-helpers";

import { ISchemaValidationResult, ITransaction } from "../interfaces/index.js";

import { maxVendorFieldLength } from "../utils.js";
import { TransactionType } from "../enums.js";
import { ITransactionData } from "../interfaces/index.js";
import { configManager } from "../managers/config.js";

import { transfer as validateTransferSchema } from "./validators/source/transfer.js";
import { delegateRegistration as validateDelegateRegistration } from "./validators/source/delegateRegistration.js";
import { delegateResignation as validateDelegateResignation } from "./validators/source/delegateResignation.js";
import { secondSignature as validateSecondSignature } from "./validators/source/secondSignature.js";
import { vote as validateVote } from "./validators/source/vote.js";
import { ipfs as validateIpfs } from "./validators/source/ipfs.js";
import { multiPayment as validateMultiPayment } from "./validators/source/multiPayment.js";
import { multiSignature as validateMultisignature } from "./validators/source/multiSignature.js";

export class Validator {
	private readonly transactionSchemas: Map<string, TransactionSchema> = new Map<string, TransactionSchema>();

	private constructor(options: Record<string, any>) {}

	public static make(options: Record<string, any> = {}): Validator {
		return new Validator(options);
	}

	private validateVendorField(data?: string): boolean {
		if (data === undefined || data === null) {
			return true;
		}

		try {
			return Buffer.from(data, "utf8").length <= maxVendorFieldLength();
		} catch {
			return false;
		}
	}

	private validateBignumber(schema: { minimum?: number; maximum?: number }, data?: BigNumber | number): boolean {
		const minimum = typeof schema.minimum !== "undefined" ? schema.minimum : 0;
		const maximum = typeof schema.maximum !== "undefined" ? schema.maximum : "9223372036854775807"; // 8 byte maximum

		if (data !== 0 && !data) {
			return false;
		}

		let bignum: BigNumber;

		try {
			bignum = BigNumber.make(data);
		} catch {
			return false;
		}

		if (bignum.isLessThan(minimum) && !bignum.isZero()) {
			return false;
		}

		if (bignum.isGreaterThan(maximum)) {
			return false;
		}

		return true;
	}

	private validateTransactionType(data: ITransactionData): boolean {
		// Impose dynamic multipayment limit based on milestone
		if (
			data?.type === TransactionType.MultiPayment &&
			(!data.typeGroup || data.typeGroup === 1) &&
			data.asset &&
			data.asset.payments
		) {
			const limit: number = configManager.getMilestone().multiPaymentLimit || 256;
			return data.asset.payments.length <= limit;
		}

		return [
			TransactionType.DelegateRegistration,
			TransactionType.DelegateResignation,
			TransactionType.HtlcClaim,
			TransactionType.HtlcLock,
			TransactionType.HtlcRefund,
			TransactionType.Ipfs,
			TransactionType.MultiPayment,
			TransactionType.MultiSignature,
			TransactionType.SecondSignature,
			TransactionType.Transfer,
			TransactionType.Vote,
		].includes(data.type);

		// TODO: AND typeGroup check?
	}

	private validateNetwork(network?: number): boolean {
		return network === configManager.get("network.pubKeyHash");
	}

	public validate<T = any>(
		schema: TransactionSchema,
		data: ITransactionData,
	): ISchemaValidationResult<ITransactionData> {
		return this.validateSchema(data, schema);
	}

	private validateSchema<T = any>(
		data: ITransactionData,
		schema: TransactionSchema,
	): ISchemaValidationResult<ITransactionData> {
		try {
			let isValid = false;

			if (schema.$id === "transfer" && !!data) {
				isValid =
					validateTransferSchema(data) &&
					this.validateVendorField(data.vendorField) &&
					this.validateBignumber(schema.properties.amount.bignumber, data.amount) &&
					this.validateBignumber(schema.properties.fee.bignumber, data.fee) &&
					this.validateBignumber(schema.properties.nonce.bignumber, data.nonce) &&
					this.validateTransactionType(data);
			}

			if (schema.$id === "vote") {
				isValid = validateVote(data);
			}

			if (schema.$id === "ipfs") {
				isValid = validateIpfs(data);
			}

			if (schema.$id === "delegateResignation") {
				isValid = validateDelegateResignation(data);
			}

			if (schema.$id === "delegateRegistration") {
				isValid = validateDelegateRegistration(data);
			}

			if (schema.$id === "multiPayment") {
				isValid = validateMultiPayment(data);
			}

			if (schema.$id === "multiSignature") {
				isValid = validateMultisignature(data);
			}

			// if (schema.$id === "multiSignatureLegacy") {
			// 	isValid = validateMultisignatureLegacy(data);
			// }

			if (schema.$id === "secondSignature") {
				isValid = validateSecondSignature(data);
			}

			const error = !isValid ? `Validation failed for ${schema.$id}.` : undefined;

			return { error, value: data };
		} catch (error) {
			return { error: error.stack, errors: [], value: undefined };
		}
	}
}

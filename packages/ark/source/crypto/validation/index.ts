import { TransactionSchema } from "../transactions/types/schemas.js";
import { BigNumber } from "@ardenthq/sdk-helpers";

import { ISchemaValidationResult, ITransaction } from "../interfaces/index.js";

import { maxVendorFieldLength } from "../utils.js";
import { TransactionType, TransactionTypeGroup } from "../enums.js";
import { ITransactionData } from "../interfaces/index.js";
import { configManager } from "../managers/config.js";

import {
	transfer as validateTransferSchema,
	delegateRegistration as validateDelegateRegistrationSchema,
	delegateResignation as validateDelegateResignationSchema,
	secondSignature as validateSecondSignatureSchema,
	vote as validateVoteSchema,
	ipfs as validateIpfsSchema,
	multiPayment as validateMultiPaymentSchema,
	multiSignature as validateMultisignatureSchema,
	multiSignatureLegacy as validateMultisignatureLegacySchema,
} from "./validators/source/index.js";

export class Validator {
	private readonly transactionSchemas: Map<string, TransactionSchema> = new Map<string, TransactionSchema>();

	private constructor(options: Record<string, any>) {}

	public static make(options: Record<string, any> = {}): Validator {
		return new Validator(options);
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
				isValid =
					validateVoteSchema(data) &&
					this.validateBignumber(schema.properties.fee.bignumber, data.fee) &&
					this.validateBignumber(schema.properties.nonce.bignumber, data.nonce);
			}

			if (schema.$id === "ipfs") {
				isValid =
					validateIpfsSchema(data) &&
					this.validateBignumber(schema.properties.fee.bignumber, data.fee) &&
					this.validateBignumber(schema.properties.nonce.bignumber, data.nonce);
			}

			if (schema.$id === "delegateResignation") {
				isValid =
					validateDelegateResignationSchema(data) &&
					this.validateBignumber(schema.properties.fee.bignumber, data.fee) &&
					this.validateBignumber(schema.properties.nonce.bignumber, data.nonce);
			}

			if (schema.$id === "delegateRegistration") {
				isValid =
					validateDelegateRegistrationSchema(data) &&
					this.validateBignumber(schema.properties.fee.bignumber, data.fee) &&
					this.validateBignumber(schema.properties.nonce.bignumber, data.nonce);
			}

			if (schema.$id === "multiPayment") {
				isValid =
					validateMultiPaymentSchema(data) &&
					this.validateBignumber(schema.properties.fee.bignumber, data.fee) &&
					this.validateBignumber(schema.properties.nonce.bignumber, data.nonce);
			}

			if (schema.$id === "multiSignature") {
				isValid =
					validateMultisignatureSchema(data) &&
					this.validateBignumber(schema.properties.fee.bignumber, data.fee) &&
					this.validateBignumber(schema.properties.nonce.bignumber, data.nonce);
			}

			if (schema.$id === "multiSignatureLegacy") {
				isValid =
					validateMultisignatureLegacySchema(data) &&
					this.validateBignumber(schema.properties.fee.bignumber, data.fee) &&
					this.validateBignumber(schema.properties.nonce.bignumber, data.nonce);
			}

			if (schema.$id === "secondSignature") {
				isValid =
					validateSecondSignatureSchema(data) &&
					this.validateBignumber(schema.properties.fee.bignumber, data.fee) &&
					this.validateBignumber(schema.properties.nonce.bignumber, data.nonce);
			}

			const error = !isValid ? `Validation failed for ${schema.$id}.` : undefined;

			return { error, value: data };
		} catch (error) {
			return { error: error.stack, errors: [], value: undefined };
		}
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

		const types = [
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
		];

		const typeGroups = [TransactionTypeGroup.Core, TransactionTypeGroup.Test];

		if (data.typeGroup && !typeGroups.includes(data.typeGroup)) {
			return false;
		}

		return types.includes(data.type);
	}

	private validateNetwork(network?: number): boolean {
		if (!network) {
			return true;
		}

		return network === configManager.get("network.pubKeyHash");
	}
}

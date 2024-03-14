import {
	TransactionAlreadyRegisteredError,
	TransactionKeyAlreadyRegisteredError,
	TransactionVersionAlreadyRegisteredError,
	UnkownTransactionError,
} from "../errors.js";
import { validator } from "../validation/index.js";
import {
	DelegateRegistrationTransaction,
	DelegateResignationTransaction,
	IpfsTransaction,
	MultiPaymentTransaction,
	MultiSignatureRegistrationTransaction,
	SecondSignatureRegistrationTransaction,
	Transaction,
	TransactionTypeFactory,
	TransferTransaction,
	VoteTransaction,
} from "./types/index.js";
import { InternalTransactionType } from "./types/internal-transaction-type.js";

export type TransactionConstructor = typeof Transaction;

class TransactionRegistry {
	private readonly transactionTypes: Map<InternalTransactionType, Map<number, TransactionConstructor>> = new Map();

	public constructor() {
		TransactionTypeFactory.initialize(this.transactionTypes);

		this.registerTransactionType(TransferTransaction);
		this.registerTransactionType(SecondSignatureRegistrationTransaction);
		this.registerTransactionType(DelegateRegistrationTransaction);
		this.registerTransactionType(VoteTransaction);
		this.registerTransactionType(MultiSignatureRegistrationTransaction);
		this.registerTransactionType(IpfsTransaction);
		this.registerTransactionType(MultiPaymentTransaction);
		this.registerTransactionType(DelegateResignationTransaction);
	}

	public registerTransactionType(constructor: TransactionConstructor): void {
		const { typeGroup, type } = constructor;

		if (typeof type === "undefined" || typeof typeGroup === "undefined") {
			throw new TypeError();
		}

		const internalType: InternalTransactionType = InternalTransactionType.from(type, typeGroup);
		for (const registeredConstructors of this.transactionTypes.values()) {
			if (registeredConstructors.size > 0) {
				const first = [...registeredConstructors.values()][0];
				if (
					first.key === constructor.key &&
					InternalTransactionType.from(first.type!, first.typeGroup) !== internalType
				) {
					throw new TransactionKeyAlreadyRegisteredError(first.key!);
				}

				for (const registeredConstructor of registeredConstructors.values()) {
					if (registeredConstructor === constructor) {
						throw new TransactionAlreadyRegisteredError(constructor.name);
					}
				}
			}
		}

		if (!this.transactionTypes.has(internalType)) {
			this.transactionTypes.set(internalType, new Map());
		} else if (this.transactionTypes.get(internalType)?.has(constructor.version)) {
			throw new TransactionVersionAlreadyRegisteredError(constructor.name, constructor.version);
		}

		this.transactionTypes.get(internalType)!.set(constructor.version, constructor);
		this.updateSchemas(constructor);
	}

	public deregisterTransactionType(constructor: TransactionConstructor): void {
		const { typeGroup, type, version } = constructor;

		if (typeof type === "undefined" || typeof typeGroup === "undefined") {
			throw new TypeError();
		}

		const internalType: InternalTransactionType = InternalTransactionType.from(type, typeGroup);
		if (!this.transactionTypes.has(internalType)) {
			throw new UnkownTransactionError(internalType.toString());
		}

		this.updateSchemas(constructor, true);

		const constructors = this.transactionTypes.get(internalType)!;
		if (!constructors.has(version)) {
			throw new UnkownTransactionError(internalType.toString());
		}

		constructors.delete(version);

		if (constructors.size === 0) {
			this.transactionTypes.delete(internalType);
		}
	}

	private updateSchemas(transaction: TransactionConstructor, remove?: boolean): void {
		validator.extendTransaction(transaction.getSchema(), remove);
	}
}

export const transactionRegistry = new TransactionRegistry();

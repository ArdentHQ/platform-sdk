import { ConfirmedTransactionData } from "./confirmed-transaction.dto.contract.js";
import { Paginator } from "./paginator.js";

export class ConfirmedTransactionDataCollection extends Paginator<ConfirmedTransactionData> {
	public findById(id: string): ConfirmedTransactionData | undefined {
		return this.#find("id", id);
	}

	public findByType(type: string | string[]): ConfirmedTransactionData | undefined {
		return this.#find("type", type);
	}

	public findByTimestamp(timestamp: string): ConfirmedTransactionData | undefined {
		return this.#find("timestamp", timestamp);
	}

	public findBySender(sender: string): ConfirmedTransactionData | undefined {
		return this.#find("sender", sender);
	}

	public findByRecipient(recipient: string): ConfirmedTransactionData | undefined {
		return this.#find("recipient", recipient);
	}

	#find(key: string, value: string | string[]): ConfirmedTransactionData | undefined {
		if (Array.isArray(value)) {
			// If value is an array, check if any of the types match
			return this.items().find((transaction: ConfirmedTransactionData) =>
				value.includes(transaction[key]())
			);
		}
		// Otherwise, search for a single match
		return this.items().find((transaction: ConfirmedTransactionData) => transaction[key]() === value);
	}
}

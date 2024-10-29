import { Collections } from "@ardenthq/sdk";

import { ExtendedConfirmedTransactionData } from "./transaction.dto.js";

export class ExtendedConfirmedTransactionDataCollection extends Collections.Paginator<ExtendedConfirmedTransactionData> {
	public findById(id: string): ExtendedConfirmedTransactionData | undefined {
		return this.#find("id", id);
	}

	public findByType(types: string | string[]): ExtendedConfirmedTransactionData[] {
		// Ensure types is an array
		const typesArray = Array.isArray(types) ? types : [types];

		// Filter items that match any type in typesArray
		return this.items().filter((transaction: ExtendedConfirmedTransactionData) =>
			typesArray.includes(transaction["type"]())
		);
	}

	public findByTimestamp(timestamp: string): ExtendedConfirmedTransactionData | undefined {
		return this.#find("timestamp", timestamp);
	}

	public findBySender(sender: string): ExtendedConfirmedTransactionData | undefined {
		return this.#find("sender", sender);
	}

	public findByRecipient(recipient: string): ExtendedConfirmedTransactionData | undefined {
		return this.#find("recipient", recipient);
	}

	#find(key: string, value: string): ExtendedConfirmedTransactionData | undefined {
		return this.items().find((transaction: ExtendedConfirmedTransactionData) => transaction[key]() === value);
	}
}

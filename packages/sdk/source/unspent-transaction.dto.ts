/* istanbul ignore file */

import { BigNumber } from "@ardenthq/sdk-helpers";
import { DateTime } from "@ardenthq/sdk-intl";

import { UnspentTransactionData as Contract } from "./confirmed-transaction.dto.contract.js";
import { KeyValuePair } from "./contracts.js";

export class UnspentTransactionData implements Contract {
	readonly #data: KeyValuePair;

	public constructor(data: KeyValuePair) {
		this.#data = data;
	}

	public id(): string {
		return this.#data.id;
	}

	public timestamp(): DateTime {
		return this.#data.timestamp;
	}

	public amount(): BigNumber {
		return this.#data.amount;
	}

	public address(): string {
		return this.#data.address;
	}
}

/* istanbul ignore file */
/* eslint-disable import/no-namespace */

import { get } from "@ardenthq/sdk-helpers";

import { MetaPagination } from "./client.contract.js";
import { ConfigKey, ConfigRepository } from "./coins.js";
import { ConfirmedTransactionDataCollection } from "./collections.js";
import { ConfirmedTransactionData } from "./confirmed-transaction.dto.contract.js";
import { IContainer } from "./container.contracts.js";
import { WalletData } from "./contracts.js";
import { DataTransferObjectService } from "./data-transfer-object.contract.js";
import * as DataTransferObjects from "./dto.js";
import { Container } from "./ioc.js";
import { BindingType } from "./service-provider.contract.js";
import { SignedTransactionData } from "./signed-transaction.dto.contract.js";

export class AbstractDataTransferObjectService implements DataTransferObjectService {
	// @TODO: rework so that the container is not needed, this is a weird setup
	readonly #container: Container;
	readonly #configRepository: ConfigRepository;
	readonly #dataTransferObjects: Record<string, any>;

	public constructor(container: IContainer) {
		this.#container = container.get(BindingType.Container);
		this.#configRepository = container.get(BindingType.ConfigRepository);
		this.#dataTransferObjects = container.get(BindingType.DataTransferObjects);
	}

	public signedTransaction(identifier: string, signedData: string, broadcastData?: any): SignedTransactionData {
		console.log("data-transfer-object.service.ts => signedTransaction");

		const data = this.#container
			.resolve<SignedTransactionData>(this.#dataTransferObjects.SignedTransactionData)
			.configure(
				identifier,
				signedData,
				broadcastData,
				this.#configRepository.get<number>(ConfigKey.CurrencyDecimals),
			);

		console.log("data-transfer-object.service.ts => signedTransaction", data.toObject());
		return data;
	}

	public transaction(transaction: unknown): ConfirmedTransactionData {
		return this.#resolveTransactionClass("ConfirmedTransactionData", transaction);
	}

	public transactions(transactions: unknown[], meta: MetaPagination): ConfirmedTransactionDataCollection {
		return new ConfirmedTransactionDataCollection(
			transactions.map((transaction) => this.transaction(transaction)),
			meta,
		);
	}

	public wallet(wallet: unknown): WalletData {
		return this.#container.resolve<WalletData>(this.#dataTransferObjects.WalletData).fill(wallet);
	}

	#resolveTransactionClass(klass: string, transaction: unknown): ConfirmedTransactionData {
		return this.#container
			.resolve<ConfirmedTransactionData>(
				(get(this.#dataTransferObjects, klass) || get(DataTransferObjects, klass))!,
			)
			.configure(transaction)
			.withDecimals(this.#configRepository.get(ConfigKey.CurrencyDecimals));
	}
}

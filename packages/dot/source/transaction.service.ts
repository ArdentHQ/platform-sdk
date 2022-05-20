import { Contracts, Exceptions, IoC, Services } from "@ardenthq/sdk";
import { DateTime } from "@ardenthq/sdk-intl";
import { ApiPromise } from "@polkadot/api";
import { Keyring } from "@polkadot/keyring";

import { BindingType } from "./constants.js";

export class TransactionService extends Services.AbstractTransactionService {
	readonly #client: ApiPromise;
	readonly #keyring: Keyring;

	public constructor(container: IoC.IContainer) {
		super(container);

		this.#client = container.get(BindingType.ApiPromise);
		this.#keyring = container.get(BindingType.Keyring);
	}

	public async onPreDestroy(): Promise<void> {
		await this.#client.disconnect();
	}

	public override async transfer(input: Services.TransferInput): Promise<Contracts.SignedTransactionData> {
		if (input.signatory.signingKey() === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "input.signatory");
		}

		const amount = this.toSatoshi(input.data.amount).toString();
		const keypair = this.#keyring.addFromMnemonic(input.signatory.signingKey());
		const transaction = await this.#client.tx.balances.transfer(input.data.to, amount).signAsync(keypair);

		const signedData = {
			...JSON.parse(transaction.toString()),
			timestamp: DateTime.make(),
		};

		return this.dataTransferObjectService.signedTransaction(
			transaction.hash.toHex(),
			signedData,
			transaction.toHex(),
		);
	}
}

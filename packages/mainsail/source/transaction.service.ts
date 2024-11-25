import { Exceptions } from "@mainsail/contracts";
import { EvmCallBuilder } from "@mainsail/crypto-transaction-evm-call";
import { Contracts, IoC, Services, Signatories } from "@ardenthq/sdk";
import { BigNumber } from "@ardenthq/sdk-helpers";
import { Contracts as MainsailContracts } from "@mainsail/contracts";
import { Utils } from "@mainsail/crypto-transaction";
import { Application } from "@mainsail/kernel";

import { BindingType } from "./coin.contract.js";
import { applyCryptoConfiguration } from "./config.js";
import { Interfaces, Transactions } from "./crypto/index.js";
import { BuilderFactory } from "./crypto/transactions/index.js";
import { Request } from "./request.js";

enum GasLimit {
	Transfer = 21_000,
}

interface ValidatedTransferInput extends Services.TransferInput {
	fee: number;
}

export class TransactionService extends Services.AbstractTransactionService {
	readonly #ledgerService!: Services.LedgerService;
	readonly #addressService!: Services.AddressService;
	readonly #publicKeyService!: Services.PublicKeyService;
	readonly #request: Request;
	readonly #app: Application;

	#transactionBuilder!: IoC.Factory<BuilderFactory>;
	#configCrypto!: { crypto: Interfaces.NetworkConfig; height: number };

	public constructor(container: IoC.IContainer) {
		super(container);

		this.#ledgerService = container.get(IoC.BindingType.LedgerService);
		this.#addressService = container.get(IoC.BindingType.AddressService);
		this.#publicKeyService = container.get(IoC.BindingType.PublicKeyService);
		this.#transactionBuilder = container.factory(Transactions.BuilderFactory);
		this.#app = container.get(BindingType.Application);

		this.#configCrypto = {
			crypto: container.get(BindingType.Crypto),
			height: container.get(BindingType.Height),
		};

		this.#request = new Request(
			container.get(IoC.BindingType.ConfigRepository),
			container.get(IoC.BindingType.HttpClient),
			container.get(IoC.BindingType.NetworkHostSelector),
		);
	}

	#validateInput(input: Services.TransferInput): asserts input is ValidatedTransferInput {
		if (!input.data.amount) {
			throw new Error(
				`[TransactionService#transfer] Expected amount to be defined but received ${typeof input.data.amount}`,
			);
		}

		if (!input.fee) {
			throw new Error(
				`[TransactionService#transfer] Expected fee to be defined but received ${typeof input.fee}`,
			);
		}
	}

	public override async transfer(input: Services.TransferInput): Promise<Contracts.SignedTransactionData> {
		applyCryptoConfiguration(this.#configCrypto);
		this.#validateInput(input);

		const transaction = this.#app.resolve(EvmCallBuilder);

		const { address } = await this.#signerData(input);
		const nonce = await this.#generateNonce(address, input);

		console.log({ address, input, network: this.#configCrypto.crypto.network, nonce });

		const signed = await transaction
			.network(this.#configCrypto.crypto.network.pubKeyHash) // 30
			.gasLimit(GasLimit.Transfer)
			.recipientAddress(input.data.to)
			.payload("")
			.nonce(nonce)
			.value("100000000") // revisit
			.gasPrice(5) // revisit
			.sign(input.signatory.signingKey());

		console.log({ signed });

		const build = await signed.build();
		console.log({ build });
	}

	public override async delegateRegistration(
		input: Services.ValidatorRegistrationInput,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.delegateRegistration.name);
	}

	/**
	 * @inheritDoc
	 */
	public override async vote(input: Services.VoteInput): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.vote.name);
	}

	/**
	 * @inheritDoc
	 */
	public override async multiPayment(input: Services.MultiPaymentInput): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.multiPayment.name);
	}

	public override async usernameRegistration(
		input: Services.UsernameRegistrationInput,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.usernameRegistration.name);
	}

	public override async usernameResignation(
		input: Services.UsernameResignationInput,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.usernameResignation.name);
	}

	public override async delegateResignation(
		input: Services.DelegateResignationInput,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.delegateResignation.name);
	}

	public override async estimateExpiration(value?: string): Promise<string | undefined> {
		const { data: blockchain } = await this.#request.get("blockchain");
		const { data: configuration } = await this.#request.get("node/configuration");

		return BigNumber.make(blockchain.block.height)
			.plus((value ? Number(value) : 5) * configuration.constants.activeValidators)
			.toString();
	}

	/**
	 * @inheritDoc
	 */
	// public override async multiSignature(
	// 	input: Services.MultiSignatureInput,
	// ): Promise<Contracts.SignedTransactionData> {
	// 	return this.#createFromData(
	// 		"multiSignature",
	// 		input,
	// 		({ transaction, data }: { transaction: any; data: any }) => {
	// 			if (data.senderPublicKey) {
	// 				transaction.senderPublicKey(data.senderPublicKey);
	// 			}
	//
	// 			transaction.multiSignatureAsset({
	// 				min: data.min,
	// 				publicKeys: data.publicKeys,
	// 			});
	// 		},
	// 	);
	// }

	async #signerData(input: Services.TransactionInputs): Promise<{ address?: string; publicKey?: string }> {
		let address: string | undefined;
		let publicKey: string | undefined;

		if (input.signatory.actsWithMnemonic() || input.signatory.actsWithConfirmationMnemonic()) {
			address = (await this.#addressService.fromMnemonic(input.signatory.signingKey())).address;
			publicKey = (await this.#publicKeyService.fromMnemonic(input.signatory.signingKey())).publicKey;
		}

		if (input.signatory.actsWithSecret() || input.signatory.actsWithConfirmationSecret()) {
			address = (await this.#addressService.fromSecret(input.signatory.signingKey())).address;
			publicKey = (await this.#publicKeyService.fromSecret(input.signatory.signingKey())).publicKey;
		}

		if (input.signatory.actsWithWIF() || input.signatory.actsWithConfirmationWIF()) {
			address = (await this.#addressService.fromWIF(input.signatory.signingKey())).address;
			publicKey = (await this.#publicKeyService.fromWIF(input.signatory.signingKey())).publicKey;
		}

		if (input.signatory.actsWithLedger()) {
			await this.#ledgerService.connect();

			publicKey = await this.#ledgerService.getPublicKey(input.signatory.signingKey());
			address = (await this.#addressService.fromPublicKey(publicKey)).address;
		}

		if (input.signatory.actsWithMultiSignature()) {
			address = (
				await this.#addressService.fromMultiSignature({
					min: input.signatory.asset().min,
					publicKeys: input.signatory.asset().publicKeys,
				})
			).address;
		}

		return { address, publicKey };
	}

	async #generateNonce(address?: string, input?: Services.TransactionInputs): Promise<string> {
		if (input?.nonce) {
			return input.nonce;
		}

		const wallet = await this.clientService.wallet({ type: "address", value: address! });

		return wallet.nonce().toFixed(0);
	}

	async #buildTransaction(
		input: Services.TransactionInputs,
		transaction: any,
	): Promise<Contracts.SignedTransactionData> {
		let signedTransactionBuilder;

		if (input.signatory.actsWithMnemonic()) {
			signedTransactionBuilder = await transaction.sign(input.signatory.signingKey());
		}

		if (input.signatory.actsWithConfirmationMnemonic()) {
			signedTransactionBuilder = await transaction.sign(input.signatory.signingKey());
			// transaction.secondSign(input.signatory.confirmKey());
		}

		if (input.signatory.actsWithWIF()) {
			signedTransactionBuilder = await transaction.signWithWif(input.signatory.signingKey());
		}

		if (input.signatory.actsWithConfirmationWIF()) {
			signedTransactionBuilder = await transaction.signWithWif(input.signatory.signingKey());
			// transaction.secondSignWithWif(input.signatory.confirmKey());
		}

		if (input.signatory.actsWithSecret()) {
			signedTransactionBuilder = await transaction.sign(input.signatory.signingKey());
		}

		if (input.signatory.actsWithConfirmationSecret()) {
			signedTransactionBuilder = await transaction.sign(input.signatory.signingKey());
			// transaction.secondSign(input.signatory.confirmKey());
		}

		const signedTransaction = await signedTransactionBuilder?.build();

		return this.dataTransferObjectService.signedTransaction(signedTransaction.id!, signedTransaction.data);
	}
}

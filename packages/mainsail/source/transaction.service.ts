import { Contracts, IoC, Services, Signatories } from "@ardenthq/sdk";
import { BigNumber } from "@ardenthq/sdk-helpers";
import { Container } from "@mainsail/container";
import { Identifiers } from "@mainsail/contracts";
import { ServiceProvider as CoreCryptoAddressBase58 } from "@mainsail/crypto-address-base58";
import { ServiceProvider as CoreCryptoConfig } from "@mainsail/crypto-config";
import { ServiceProvider as CoreCryptoConsensusBls12381 } from "@mainsail/crypto-consensus-bls12-381";
import { ServiceProvider as CoreCryptoHashBcrypto } from "@mainsail/crypto-hash-bcrypto";
import { ServiceProvider as CoreCryptoKeyPairEcdsa } from "@mainsail/crypto-key-pair-ecdsa";
import { ServiceProvider as CoreCryptoSignatureSchnorr } from "@mainsail/crypto-signature-schnorr-secp256k1";
import { ServiceProvider as CoreCryptoTransaction } from "@mainsail/crypto-transaction";
import { ServiceProvider as CoreCryptoMultipaymentTransfer } from "@mainsail/crypto-transaction-multi-payment";
import { ServiceProvider as CoreCryptoTransactionTransfer } from "@mainsail/crypto-transaction-transfer";
import {
	ServiceProvider as CoreCryptoTransactionUsername,
	UsernameRegistrationBuilder,
} from "@mainsail/crypto-transaction-username-registration";
import {
	ServiceProvider as CoreCryptoTransactionValidatorRegistration,
	ValidatorRegistrationBuilder,
} from "@mainsail/crypto-transaction-validator-registration";
import { ServiceProvider as CoreCryptoTransactionValidatorResignation } from "@mainsail/crypto-transaction-validator-resignation";
import { ServiceProvider as CoreCryptoTransactionVote, VoteBuilder } from "@mainsail/crypto-transaction-vote";
import { ServiceProvider as CoreCryptoValidation } from "@mainsail/crypto-validation";
import { ServiceProvider as CoreFees } from "@mainsail/fees";
import { ServiceProvider as CoreFeesStatic } from "@mainsail/fees-static";
import { Application } from "@mainsail/kernel";
import { ServiceProvider as CoreValidation } from "@mainsail/validation";

import { BindingType } from "./coin.contract.js";
import { applyCryptoConfiguration } from "./config.js";
import { Identities, Interfaces, Transactions } from "./crypto/index.js";
import { milestones } from "./crypto/networks/devnet/milestones.js";
import { network } from "./crypto/networks/devnet/network.js";
import { MultiSignatureSigner } from "./multi-signature.signer.js";
import { Request } from "./request.js";

export class TransactionService extends Services.AbstractTransactionService {
	readonly #ledgerService!: Services.LedgerService;
	readonly #addressService!: Services.AddressService;
	readonly #publicKeyService!: Services.PublicKeyService;
	readonly #multiSignatureService!: Services.MultiSignatureService;
	readonly #multiSignatureSigner!: IoC.Factory<MultiSignatureSigner>;
	readonly #request: Request;
	readonly #app: Application;
	#isBooted: boolean;

	#configCrypto!: { crypto: Interfaces.NetworkConfig; height: number };

	public constructor(container: IoC.IContainer) {
		super(container);

		this.#ledgerService = container.get(IoC.BindingType.LedgerService);
		this.#addressService = container.get(IoC.BindingType.AddressService);
		this.#publicKeyService = container.get(IoC.BindingType.PublicKeyService);
		this.#multiSignatureService = container.get(IoC.BindingType.MultiSignatureService);
		this.#multiSignatureSigner = container.factory(MultiSignatureSigner);

		this.#configCrypto = {
			crypto: container.get(BindingType.Crypto),
			height: container.get(BindingType.Height),
		};

		this.#request = new Request(
			container.get(IoC.BindingType.ConfigRepository),
			container.get(IoC.BindingType.HttpClient),
			container.get(IoC.BindingType.NetworkHostSelector),
		);

		this.#app = new Application(new Container());

		this.#isBooted = false;
	}

	async #boot(): Promise<void> {
		await Promise.all([
			this.#app.resolve(CoreValidation).register(),
			this.#app.resolve(CoreCryptoConfig).register(),
			this.#app.resolve(CoreCryptoValidation).register(),
			this.#app.resolve(CoreCryptoKeyPairEcdsa).register(),
			this.#app.resolve(CoreCryptoAddressBase58).register(),
			this.#app.resolve(CoreCryptoSignatureSchnorr).register(),
			this.#app.resolve(CoreCryptoHashBcrypto).register(),
			this.#app.resolve(CoreFees).register(),
			this.#app.resolve(CoreFeesStatic).register(),
			this.#app.resolve(CoreCryptoTransaction).register(),
			this.#app.resolve(CoreCryptoTransactionTransfer).register(),
			this.#app.resolve(CoreCryptoTransactionVote).register(),
			this.#app.resolve(CoreCryptoMultipaymentTransfer).register(),
			this.#app.resolve(CoreCryptoTransactionUsername).register(),
			this.#app.resolve(CoreCryptoTransactionValidatorRegistration).register(),
			this.#app.resolve(CoreCryptoTransactionValidatorResignation).register(),
			this.#app.resolve(CoreCryptoConsensusBls12381).register(),
		]);

		this.#app
			.get<{
				setConfig: Function;
			}>(Identifiers.Cryptography.Configuration)
			.setConfig({ milestones, network });

		this.#isBooted = true;
	}

	/**
	 * @inheritDoc
	 *
	 * @musig
	 */
	public override async transfer(input: Services.TransferInput): Promise<Contracts.SignedTransactionData> {
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

		return this.#createFromData("transfer", input, ({ transaction, data }) => {
			transaction.recipientId(data.to);

			if (data.memo) {
				transaction.vendorField(data.memo);
			}
		});
	}

	public override async delegateRegistration(
		input: Services.ValidatorRegistrationInput,
	): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData(
			"delegateRegistration",
			input,
			({
				transaction,
				data,
			}: {
				transaction: ValidatorRegistrationBuilder;
				data: { validatorPublicKey: string };
			}) => {
				transaction.publicKeyAsset(data.validatorPublicKey);
			},
		);
	}

	/**
	 * @inheritDoc
	 *
	 * @musig
	 */
	public override async vote(input: Services.VoteInput): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData(
			"vote",
			input,
			({
				transaction,
				data,
			}: {
				transaction: VoteBuilder;
				data: {
					votes: {
						id: string;
						amount: BigNumber;
					}[];
					unvotes: {
						id: string;
						amount: BigNumber;
					}[];
				};
			}) => {
				if (Array.isArray(data.unvotes)) {
					const unvotes: string[] = [];

					for (const unvote of data.unvotes) {
						unvotes.push(unvote.id);
					}

					transaction.unvotesAsset(unvotes);
				}

				if (Array.isArray(data.votes)) {
					const votes: string[] = [];

					for (const vote of data.votes) {
						votes.push(vote.id);
					}

					transaction.votesAsset(votes);
				}
			},
		);
	}

	/**
	 * @inheritDoc
	 *
	 * @musig
	 */
	public override async multiSignature(
		input: Services.MultiSignatureInput,
	): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("multiSignature", input, ({ transaction, data }) => {
			if (data.senderPublicKey) {
				transaction.senderPublicKey(data.senderPublicKey);
			}

			transaction.multiSignatureAsset({
				min: data.min,
				publicKeys: data.publicKeys,
			});
		});
	}

	/**
	 * @inheritDoc
	 *
	 * @musig
	 */
	public override async multiPayment(input: Services.MultiPaymentInput): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("multiPayment", input, ({ transaction, data }) => {
			if (data.memo) {
				transaction.vendorField(data.memo);
			}
		});
	}

	public override async usernameRegistration(
		input: Services.UsernameRegistrationInput,
	): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData(
			"usernameRegistration",
			input,
			({ transaction, data }: { transaction: UsernameRegistrationBuilder; data: { username: string } }) => {
				transaction.usernameAsset(data.username);
			},
		);
	}

	public override async usernameResignation(
		input: Services.UsernameResignationInput,
	): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("usernameResignation", input);
	}

	public override async delegateResignation(
		input: Services.DelegateResignationInput,
	): Promise<Contracts.SignedTransactionData> {
		return this.#createFromData("delegateResignation", input);
	}

	public override async estimateExpiration(value?: string): Promise<string | undefined> {
		const { data: blockchain } = await this.#request.get("blockchain");
		const { data: configuration } = await this.#request.get("node/configuration");

		return BigNumber.make(blockchain.block.height)
			.plus((value ? Number(value) : 5) * configuration.constants.activeValidators)
			.toString();
	}

	async #createFromData(
		type: string,
		input: Services.TransactionInputs,
		callback?: Function,
	): Promise<Contracts.SignedTransactionData> {
		if (!this.#isBooted) {
			await this.#boot();
		}

		applyCryptoConfiguration(this.#configCrypto);

		let address: string | undefined;
		let senderPublicKey: string | undefined;

		const transaction = await Transactions.BuilderFactory[type]();

		if (input.signatory.actsWithMnemonic() || input.signatory.actsWithConfirmationMnemonic()) {
			address = (await this.#addressService.fromMnemonic(input.signatory.signingKey())).address;
			senderPublicKey = (await this.#publicKeyService.fromMnemonic(input.signatory.signingKey())).publicKey;
		}

		if (input.signatory.actsWithSecret() || input.signatory.actsWithConfirmationSecret()) {
			address = (await this.#addressService.fromSecret(input.signatory.signingKey())).address;
			senderPublicKey = (await this.#publicKeyService.fromSecret(input.signatory.signingKey())).publicKey;
		}

		if (input.signatory.actsWithWIF() || input.signatory.actsWithConfirmationWIF()) {
			address = (await this.#addressService.fromWIF(input.signatory.signingKey())).address;
			senderPublicKey = (await this.#publicKeyService.fromWIF(input.signatory.signingKey())).publicKey;
		}

		if (input.signatory.actsWithMultiSignature()) {
			address = (
				await this.#addressService.fromMultiSignature({
					min: input.signatory.asset().min,
					publicKeys: input.signatory.asset().publicKeys,
				})
			).address;
		}

		if (input.signatory.actsWithLedger()) {
			await this.#ledgerService.connect();

			senderPublicKey = await this.#ledgerService.getPublicKey(input.signatory.signingKey());
			address = (await this.#addressService.fromPublicKey(senderPublicKey)).address;
		}

		if (senderPublicKey) {
			transaction.senderPublicKey(senderPublicKey);
		}

		if (input.nonce) {
			transaction.nonce(input.nonce);
		} else {
			const wallet = await this.clientService.wallet({ type: "address", value: address! });

			transaction.nonce(wallet.nonce().plus(1).toFixed(0));
		}

		if (input.data && input.data.amount) {
			transaction.amount(this.toSatoshi(input.data.amount).toString());
		}

		if (input.data && Array.isArray(input.data.payments)) {
			for (const { amount, to } of input.data.payments) {
				transaction.addPayment(to, BigNumber.make(this.toSatoshi(amount)).toString());
			}
		}

		if (input.fee) {
			transaction.fee(this.toSatoshi(input.fee).toString());
		}

		try {
			if (input.data && input.data.expiration) {
				transaction.expiration(input.data.expiration);
			} else {
				let estimatedExpiration: string | undefined;

				if (
					input.signatory.actsWithMultiSignature() ||
					input.signatory.hasMultiSignature() ||
					type === "multiSignature"
				) {
					estimatedExpiration = await this.estimateExpiration("211");
				} else {
					estimatedExpiration = await this.estimateExpiration("5");
				}

				if (estimatedExpiration) {
					transaction.expiration(Number.parseInt(estimatedExpiration));
				}
			}
		} catch {
			// If we fail to set the expiration we'll still continue.
		}

		if (callback) {
			callback({ data: input.data, transaction });
		}

		if (input.signatory.actsWithMultiSignature()) {
			const transactionWithSignature = this.#multiSignatureSigner().sign(transaction, input.signatory.asset());

			return this.dataTransferObjectService.signedTransaction(
				transactionWithSignature.id!,
				transactionWithSignature,
			);
		}

		if (input.signatory.hasMultiSignature()) {
			return this.#addSignature(transaction, input.signatory.multiSignature()!, input.signatory);
		}

		if (type === "multiSignature") {
			return this.#addSignature(
				transaction,
				{
					min: input.data.min,
					publicKeys: input.data.publicKeys,
				},
				input.signatory,
				senderPublicKey,
			);
		}

		if (input.signatory.actsWithLedger()) {
			transaction.data.signature = await this.#ledgerService.signTransaction(
				input.signatory.signingKey(),
				Transactions.Serializer.getBytes(transaction.data, {
					excludeSecondSignature: true,
					excludeSignature: true,
				}),
			);

			await this.#ledgerService.disconnect();
		}

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

		return this.dataTransferObjectService.signedTransaction(
			signedTransaction.id!,
			signedTransaction.data,
			signedTransaction.serialized.toString("hex"),
		);
	}

	async #addSignature(
		transaction,
		multiSignature: Interfaces.IMultiSignatureAsset,
		signatory: Signatories.Signatory,
		senderPublicKey?: string,
	): Promise<Contracts.SignedTransactionData> {
		transaction.data.signatures = [];

		if (senderPublicKey) {
			transaction.senderPublicKey(senderPublicKey);
		} else {
			transaction.senderPublicKey(Identities.PublicKey.fromMultiSignatureAsset(multiSignature));
		}

		const struct = transaction.getStruct();
		struct.multiSignature = multiSignature;

		return this.#multiSignatureService.addSignature(struct, signatory);
	}
}

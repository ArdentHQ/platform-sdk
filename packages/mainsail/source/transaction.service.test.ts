import { IoC, Services, Signatories } from "@ardenthq/sdk";

import { ClientService } from "./client.service.js";
import { ConfirmedTransactionData } from "./confirmed-transaction.dto.js";
import { KeyPairService } from "./key-pair.service.js";
import { LedgerService } from "./ledger.service.js";
import { MultiSignatureService } from "./multi-signature.service.js";
import { MultiSignatureSigner } from "./multi-signature.signer.js";
import { PublicKeyService } from "./public-key.service.js";
import { SignedTransactionData } from "./signed-transaction.dto.js";
import { TransactionService } from "./transaction.service.js";
import { WalletData } from "./wallet.dto.js";
import { createService } from "../test/mocking";
import { describe } from "@ardenthq/sdk-test";
import { formatUnits } from "./helpers/format-units.js";
import { identity } from "../test/wallets";
import { parseUnits } from "./helpers/parse-units.js";

describe("TransactionService", async ({ assert, beforeAll, nock, it, loader }) => {
	beforeAll(async (context) => {
		context.subject = await createService(TransactionService, undefined, (container) => {
			container.constant(IoC.BindingType.Container, container);
			container.factory(MultiSignatureSigner);
			container.constant(IoC.BindingType.DataTransferObjects, {
				ConfirmedTransactionData,
				SignedTransactionData,
				WalletData,
			});
			container.singleton(IoC.BindingType.DataTransferObjectService, Services.AbstractDataTransferObjectService);
			container.singleton(IoC.BindingType.ClientService, ClientService);
			container.singleton(IoC.BindingType.KeyPairService, KeyPairService);
			container.constant(IoC.BindingType.LedgerTransportFactory, async () => {});
			container.singleton(IoC.BindingType.LedgerService, LedgerService);
			container.singleton(IoC.BindingType.PublicKeyService, PublicKeyService);
			container.singleton(IoC.BindingType.MultiSignatureService, MultiSignatureService);
		});

		context.defaultTransferInput = {
			data: {
				amount: 1,
				memo: "foo",
				to: identity.address,
			},
			gasLimit: 21_000,
			gasPrice: 5,
			nonce: "1",
			signatory: new Signatories.Signatory(
				new Signatories.MnemonicSignatory({
					address: identity.address,
					privateKey: "privateKey",
					publicKey: "publicKey",
					signingKey: identity.mnemonic,
				}),
			),
		};

		context.defaultMultiPaymentInput = {
			data: {
				payments: [
					{
						amount: 1,
						to: "0x93485b57ff3DeD81430D08579142fAe8234c6A17",
					},
					{
						amount: 2,
						to: "0x93485b57ff3DeD81430D08579142fAe8234c6A17",
					},
				],
			},
			gasLimit: 210_000,
			gasPrice: 5,
			nonce: "1",
			signatory: new Signatories.Signatory(
				new Signatories.MnemonicSignatory({
					address: identity.address,
					privateKey: "privateKey",
					publicKey: "publicKey",
					signingKey: identity.mnemonic,
				}),
			),
		};

		context.defaultValidatorRegistrationInput = {
			data: {
				validatorPublicKey:
					"8e65659ba176f2e14e9042db662c6106a85ecd6ec8de14665facc4aaa643aec0c2d0a7ea29cecd7daf5b6452e39d431d",
			},
			gasLimit: 500_000,
			gasPrice: 5,
			nonce: "1",
			signatory: new Signatories.Signatory(
				new Signatories.MnemonicSignatory({
					address: identity.address,
					privateKey: "privateKey",
					publicKey: "publicKey",
					signingKey: identity.mnemonic,
				}),
			),
		};

		context.defaultValidatorResignationInput = {
			gasLimit: 150_000,
			gasPrice: 5,
			nonce: "1",
			signatory: new Signatories.Signatory(
				new Signatories.MnemonicSignatory({
					address: identity.address,
					privateKey: "privateKey",
					publicKey: "publicKey",
					signingKey: identity.mnemonic,
				}),
			),
		};

		context.defaultUsernameRegistrationInput = {
			data: {
				username: "foo",
			},
			gasLimit: 200_000,
			gasPrice: 5,
			nonce: "1",
			signatory: new Signatories.Signatory(
				new Signatories.MnemonicSignatory({
					address: identity.address,
					privateKey: "privateKey",
					publicKey: "publicKey",
					signingKey: identity.mnemonic,
				}),
			),
		};

		context.defaultUsernameResignationInput = {
			gasLimit: 200_000,
			gasPrice: 5,
			nonce: "1",
			signatory: new Signatories.Signatory(
				new Signatories.MnemonicSignatory({
					address: identity.address,
					privateKey: "privateKey",
					publicKey: "publicKey",
					signingKey: identity.mnemonic,
				}),
			),
		};
	});

	it("should sign a transfer transaction", async (context) => {
		const signedTransaction = await context.subject.transfer(context.defaultTransferInput);

		assert.is(
			signedTransaction.amount().toString(),
			parseUnits(context.defaultTransferInput.data.amount, "ark").toString(),
		);
		assert.is(
			signedTransaction.fee().toString(),
			formatUnits(
				(signedTransaction.signedData.gasLimit * signedTransaction.signedData.gasPrice).toString(),
				"ark",
			).valueOf(),
		);
		assert.is(signedTransaction.nonce().toString(), context.defaultTransferInput.nonce);
		assert.is(signedTransaction.recipient(), context.defaultTransferInput.data.to);
	});

	it("should require gasFee when signing a transfer transaction", async (context) => {
		try {
			await context.subject.transfer({
				...context.defaultTransferInput,
				gasFee: undefined,
			});
		} catch (error) {
			assert.instance(error, Error);
			assert.match(error.message, "Expected gasFee to be defined");
		}
	});

	it("should require gasPrice when signing a transfer transaction", async (context) => {
		try {
			await context.subject.transfer({
				...context.defaultTransferInput,
				gasPrice: undefined,
			});
		} catch (error) {
			assert.instance(error, Error);
			assert.match(error.message, "Expected gasPrice to be defined");
		}
	});

	it("should require amount when signing a transfer transaction", async (context) => {
		try {
			await context.subject.transfer({
				...context.defaultTransferInput,
				data: {
					...context.defaultTransferInput.data,
					amount: null,
				},
			});
		} catch (error) {
			assert.instance(error, Error);
			assert.match(error.message, "Expected amount to be defined");
		}
	});

	it("should sign a validator registration transaction", async (context) => {
		const signedTransaction = await context.subject.validatorRegistration(
			context.defaultValidatorRegistrationInput,
		);

		assert.is(
			signedTransaction.fee().toString(),
			formatUnits(
				(signedTransaction.signedData.gasLimit * signedTransaction.signedData.gasPrice).toString(),
				"ark",
			).valueOf(),
		);
		assert.is(signedTransaction.nonce().toString(), context.defaultValidatorRegistrationInput.nonce);

		const validatorKey = new RegExp(context.defaultValidatorRegistrationInput.validatorPublicKey, "g");

		assert.match(signedTransaction.data().data, validatorKey);
	});

	it("should require gasPrice when signing a validator registration transaction", async (context) => {
		try {
			await context.subject.validatorRegistration({
				...context.defaultValidatorRegistrationInput,
				gasPrice: undefined,
			});
		} catch (error) {
			assert.instance(error, Error);
			assert.match(error.message, "Expected gasPrice to be defined");
		}
	});

	it("should require gasLimit when signing a validator registration transaction", async (context) => {
		try {
			await context.subject.validatorRegistration({
				...context.defaultValidatorRegistrationInput,
				gasLimit: undefined,
			});
		} catch (error) {
			assert.instance(error, Error);
			assert.match(error.message, "Expected gasLimit to be defined");
		}
	});

	it("should require a validator public key when signing a validator registration transaction", async (context) => {
		try {
			await context.subject.validatorRegistration({
				...context.defaultValidatorRegistrationInput,
				data: {
					validatorPublicKey: undefined,
				},
			});
		} catch (error) {
			assert.instance(error, Error);
			assert.match(error.message, "Expected validatorPublicKey to be defined");
		}
	});

	it("should sign a validator resignation transaction", async (context) => {
		const signedTransaction = await context.subject.validatorResignation(context.defaultValidatorResignationInput);

		assert.is(
			signedTransaction.fee().toString(),
			formatUnits(
				(signedTransaction.signedData.gasLimit * signedTransaction.signedData.gasPrice).toString(),
				"ark",
			).valueOf(),
		);
		assert.is(signedTransaction.nonce().toString(), context.defaultValidatorRegistrationInput.nonce);
	});

	it("should require gasPrice when signing a validator resignation transaction", async (context) => {
		try {
			await context.subject.validatorResignation({
				...context.defaultValidatorResignationInput,
				gasPrice: undefined,
			});
		} catch (error) {
			assert.instance(error, Error);
			assert.match(error.message, "Expected gasPrice to be defined");
		}
	});

	it("should require gasLimit when signing a validator resignation transaction", async (context) => {
		try {
			await context.subject.validatorResignation({
				...context.defaultValidatorResignationInput,
				gasLimit: undefined,
			});
		} catch (error) {
			assert.instance(error, Error);
			assert.match(error.message, "Expected gasLimit to be defined");
		}
	});

	// username registration tx tests
	it("should sign a username registration transaction", async (context) => {
		const signedTransaction = await context.subject.usernameRegistration(context.defaultUsernameRegistrationInput);

		assert.is(
			signedTransaction.fee().toString(),
			formatUnits(
				(signedTransaction.signedData.gasLimit * signedTransaction.signedData.gasPrice).toString(),
				"ark",
			).valueOf(),
		);
		assert.is(signedTransaction.nonce().toString(), context.defaultUsernameRegistrationInput.nonce);
	});

	it("should require gasPrice when signing a username registration transaction", async (context) => {
		try {
			await context.subject.usernameRegistration({
				...context.defaultUsernameRegistrationInput,
				gasPrice: undefined,
			});
		} catch (error) {
			assert.instance(error, Error);
			assert.match(error.message, "Expected gasPrice to be defined");
		}
	});

	it("should require gasLimit when signing a username registration transaction", async (context) => {
		try {
			await context.subject.usernameRegistration({
				...context.defaultUsernameRegistrationInput,
				gasLimit: undefined,
			});
		} catch (error) {
			assert.instance(error, Error);
			assert.match(error.message, "Expected gasLimit to be defined");
		}
	});

	it("should require a username when signing a username registration transaction", async (context) => {
		try {
			await context.subject.usernameRegistration({
				...context.defaultUsernameRegistrationInput,
				data: {
					username: undefined,
				},
			});
		} catch (error) {
			assert.instance(error, Error);
			assert.match(error.message, "Expected username to be defined");
		}
	});

	// username resignation tx tests
	it("should sign a username resignation transaction", async (context) => {
		const signedTransaction = await context.subject.usernameResignation(context.defaultUsernameResignationInput);

		assert.is(
			signedTransaction.fee().toString(),
			formatUnits(
				(signedTransaction.signedData.gasLimit * signedTransaction.signedData.gasPrice).toString(),
				"ark",
			).valueOf(),
		);
		assert.is(signedTransaction.nonce().toString(), context.defaultUsernameResignationInput.nonce);
	});

	it("should require gasPrice when signing a username resignation transaction", async (context) => {
		try {
			await context.subject.usernameResignation({
				...context.defaultUsernameResignationInput,
				gasPrice: undefined,
			});
		} catch (error) {
			assert.instance(error, Error);
			assert.match(error.message, "Expected gasPrice to be defined");
		}
	});

	it("should require gasLimit when signing a username resignation transaction", async (context) => {
		try {
			await context.subject.usernameResignation({
				...context.defaultUsernameResignationInput,
				gasLimit: undefined,
			});
		} catch (error) {
			assert.instance(error, Error);
			assert.match(error.message, "Expected gasLimit to be defined");
		}
	});

	// multiPayment tx tests
	it("should sign a multiPayment transaction", async (context) => {
		const signedTransaction = await context.subject.multiPayment(context.defaultMultiPaymentInput);

		assert.is(
			signedTransaction.fee().toString(),
			formatUnits(
				(signedTransaction.signedData.gasLimit * signedTransaction.signedData.gasPrice).toString(),
				"ark",
			).valueOf(),
		);
		assert.is(signedTransaction.nonce().toString(), context.defaultMultiPaymentInput.nonce);
	});

	it("should require payments when signing a multiPayment transaction", async (context) => {
		try {
			await context.subject.multiPayment({
				...context.defaultMultiPaymentInput,
				data: {},
			});
		} catch (error) {
			assert.instance(error, Error);
			assert.match(error.message, "Expected payments to be defined");
		}
	});

	it("should require gasPrice when signing a multiPayment transaction", async (context) => {
		try {
			await context.subject.multiPayment({
				...context.defaultMultiPaymentInput,
				gasPrice: undefined,
			});
		} catch (error) {
			assert.instance(error, Error);
			assert.match(error.message, "Expected gasPrice to be defined");
		}
	});

	it("should require gasLimit when signing a multiPayment transaction", async (context) => {
		try {
			await context.subject.multiPayment({
				...context.defaultMultiPaymentInput,
				gasLimit: undefined,
			});
		} catch (error) {
			assert.instance(error, Error);
			assert.match(error.message, "Expected gasLimit to be defined");
		}
	});
});

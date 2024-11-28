import { IoC, Services, Signatories } from "@ardenthq/sdk";
import { describe } from "@ardenthq/sdk-test";

import { createService } from "../test/mocking";
import { identity } from "../test/wallets";
import { AddressService } from "./address.service.js";
import { ClientService } from "./client.service.js";
import { ConfirmedTransactionData } from "./confirmed-transaction.dto.js";
import { parseUnits } from "./helpers/parse-units.js";
import { KeyPairService } from "./key-pair.service.js";
import { LedgerService } from "./ledger.service.js";
import { MultiSignatureService } from "./multi-signature.service.js";
import { MultiSignatureSigner } from "./multi-signature.signer.js";
import { PublicKeyService } from "./public-key.service.js";
import { SignedTransactionData } from "./signed-transaction.dto.js";
import { TransactionService } from "./transaction.service.js";
import { WalletData } from "./wallet.dto.js";

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
			container.singleton(IoC.BindingType.AddressService, AddressService);
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
			fee: 1,
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

		assert.is(signedTransaction.fee().toNumber(), context.defaultTransferInput.fee);
		assert.is(signedTransaction.amount().toString(), parseUnits(context.defaultTransferInput.data.amount));
		assert.is(signedTransaction.nonce().toString(), context.defaultTransferInput.nonce);
		assert.is(signedTransaction.recipient(), context.defaultTransferInput.data.to);
	});

	it("should require fee when signing transaction", async (context) => {
		try {
			const signedTransaction = await context.subject.transfer({
				...context.defaultTransferInput,
				fee: null,
			});
		} catch (error) {
			assert.instance(error, Error);
			assert.match(error.message, "Expected fee to be defined");
		}
	});

	it("should require amount when signing transaction", async (context) => {
		try {
			const signedTransaction = await context.subject.transfer({
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
});

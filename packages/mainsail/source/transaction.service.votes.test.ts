import { IoC, Services, Signatories } from "@ardenthq/sdk";
import { describe } from "@ardenthq/sdk-test";

import { createService } from "../test/mocking";
import { identity } from "../test/wallets";
import { AddressService } from "./address.service.js";
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

describe("TransactionService Votes", async ({ assert, beforeAll, nock, it }) => {
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

		context.defaultInput = {
			data: {
				votes: [{ amount: 0, id: identity.address }],
			},
			fee: 5,
			nonce: "1",
			signatory: new Signatories.Signatory(
				new Signatories.MnemonicSignatory({
					address: identity.address,
					privateKey: "",
					publicKey: "",
					signingKey: identity.mnemonic,
				}),
			),
		};
	});

	it("should sign a vote transaction", async (context) => {
		const signedTransaction = await context.subject.vote(context.defaultInput);

		assert.is(signedTransaction.isVote(), true);
		assert.is(signedTransaction.isUnvote(), false);
		assert.is(signedTransaction.fee().toNumber(), context.defaultInput.fee);
		assert.is(signedTransaction.nonce().toString(), context.defaultInput.nonce);
	});

	it("should sign an unvote transaction", async (context) => {
		const signedTransaction = await context.subject.vote({
			...context.defaultInput,
			data: { ...context.defaultInput.data, votes: [] },
		});

		assert.is(signedTransaction.isUnvote(), true);
		assert.is(signedTransaction.isVote(), false);
		assert.is(signedTransaction.fee().toNumber(), context.defaultInput.fee);
		assert.is(signedTransaction.nonce().toString(), context.defaultInput.nonce);
	});

	it("should require fee when signing transaction", async (context) => {
		try {
			const signedTransaction = await context.subject.vote({
				...context.defaultInput,
				fee: null,
			});
		} catch (error) {
			assert.instance(error, Error);
			assert.match(error.message, "Expected fee to be defined");
		}
	});
});

import { openTransportReplayer, RecordStore } from "@ledgerhq/hw-transport-mocker";
import { UUID } from "@ardenthq/sdk-cryptography";
import { describe } from "@ardenthq/sdk-test";
import { IoC, Services, Signatories } from "@ardenthq/sdk";

import { musig } from "./fixtures/musig";
import { createServiceAsync } from "./mocking";
import { TransactionService } from "../source/transaction.service";
import { AddressService } from "../source/address.service";
import { ClientService } from "../source/client.service";
import { SignedTransactionData } from "../source/signed-transaction.dto";
import { ConfirmedTransactionData } from "../source/confirmed-transaction.dto";
import { WalletData } from "../source/wallet.dto";
import { ExtendedPublicKeyService } from "../source/extended-public-key.service";
import { FeeService } from "../source/fee.service";
import { LedgerService } from "../source/ledger.service";
import { MultiSignatureService } from "../source/multi-signature.service";
import { BindingType } from "../source/constants";
import { MultiSignatureSigner } from "../source/multi-signature.signer";
import { AddressFactory } from "../source/address.factory";

describe("example musig wallet creation", async ({ assert, beforeEach, it, stub }) => {
	beforeEach(async (context) => {
		context.subject = await createServiceAsync(
			TransactionService,
			"btc.testnet",
			async (container: IoC.Container) => {
				container.constant(IoC.BindingType.Container, container);
				container.constant(IoC.BindingType.DataTransferObjects, {
					SignedTransactionData,
					ConfirmedTransactionData,
					WalletData,
				});
				container.singleton(
					IoC.BindingType.DataTransferObjectService,
					Services.AbstractDataTransferObjectService,
				);
				container.singleton(BindingType.AddressFactory, AddressFactory);
				container.singleton(BindingType.MultiSignatureSigner, MultiSignatureSigner);
				container.singleton(IoC.BindingType.AddressService, AddressService);
				container.singleton(IoC.BindingType.ClientService, ClientService);
				container.singleton(IoC.BindingType.ExtendedPublicKeyService, ExtendedPublicKeyService);
				container.singleton(IoC.BindingType.FeeService, FeeService);
				container.constant(
					IoC.BindingType.LedgerTransportFactory,
					async () => await openTransportReplayer(RecordStore.fromString("")),
				);
				container.singleton(IoC.BindingType.LedgerService, LedgerService);
				container.singleton(IoC.BindingType.MultiSignatureService, MultiSignatureService);
			},
		);

		context.musigService = await createServiceAsync(
			MultiSignatureService,
			"btc.testnet",
			async (container: IoC.Container) => {
				container.constant(IoC.BindingType.Container, container);
				container.constant(IoC.BindingType.DataTransferObjects, {
					SignedTransactionData,
					ConfirmedTransactionData,
					WalletData,
				});
				container.singleton(
					IoC.BindingType.DataTransferObjectService,
					Services.AbstractDataTransferObjectService,
				);
				container.singleton(BindingType.AddressFactory, AddressFactory);
				container.singleton(BindingType.MultiSignatureSigner, MultiSignatureSigner);
				container.singleton(IoC.BindingType.AddressService, AddressService);
				container.singleton(IoC.BindingType.ClientService, ClientService);
				container.singleton(IoC.BindingType.ExtendedPublicKeyService, ExtendedPublicKeyService);
				container.singleton(IoC.BindingType.FeeService, FeeService);
				container.constant(
					IoC.BindingType.LedgerTransportFactory,
					async () => await openTransportReplayer(RecordStore.fromString("")),
				);
				container.singleton(IoC.BindingType.LedgerService, LedgerService);
				container.singleton(IoC.BindingType.MultiSignatureService, MultiSignatureService);
			},
		);
	});

	it("first cosigner should create a wallet and others join it", async (context) => {
		stub(UUID, "random").returnValueOnce("189f015c-2a58-4664-83f4-0b331fa9172a");

		// Wallet 1 creates the musig wallet and signs it
		const wallet1 = {
			signingKey: musig.accounts[0].mnemonic,
			publicKey: musig.accounts[0].legacyMasterPublicKey,
			path: musig.accounts[0].legacyMasterPath,
		};

		const transaction1 = await context.subject.renamedMultiSignature({
			signatory: new Signatories.Signatory(
				new Signatories.MnemonicSignatory({
					signingKey: wallet1.signingKey,
					address: "address", // Not needed / used
					publicKey: wallet1.path, // TODO for now we use publicKey for passing path
					privateKey: "privateKey", // Not needed / used
				}),
			),
			data: {
				min: 2,
				numberOfSignatures: 3,
				publicKeys: [],
				derivationMethod: "legacyMusig",
			},
		});

		assert.instance(transaction1, SignedTransactionData);
		assert.is(transaction1.id(), "189f015c-2a58-4664-83f4-0b331fa9172a");
		assert.is(transaction1.data().senderPublicKey, wallet1.publicKey);
		assert.instance(transaction1.data().multiSignature.publicKeys, Array);
		assert.is(transaction1.data().multiSignature.publicKeys[0], wallet1.publicKey);
		assert.false(context.musigService.isMultiSignatureReady(transaction1));
		assert.false(context.musigService.needsFinalSignature(transaction1));
		assert.true(context.musigService.needsSignatures(transaction1));
		assert.true(context.musigService.needsAllSignatures(transaction1));
		assert.is(context.musigService.remainingSignatureCount(transaction1), 2);

		const wallet2 = {
			signingKey: musig.accounts[1].mnemonic,
			publicKey: musig.accounts[1].legacyMasterPublicKey,
			path: musig.accounts[1].legacyMasterPath,
		};

		const transaction2 = await context.musigService.addSignature(
			transaction1.data(),
			new Signatories.Signatory(
				new Signatories.MnemonicSignatory({
					signingKey: wallet2.signingKey,
					address: "address", // Not needed / used
					publicKey: wallet2.path, // TODO really? We need a way to pass in the account path
					privateKey: "privateKey", // Not needed / used
				}),
			),
		);

		assert.instance(transaction2, SignedTransactionData);
		assert.is(transaction2.data().senderPublicKey, wallet1.publicKey);
		assert.instance(transaction2.data().multiSignature.publicKeys, Array);
		assert.is(transaction2.data().multiSignature.publicKeys[0], wallet1.publicKey);
		assert.false(context.musigService.isMultiSignatureReady(transaction2));
		assert.false(context.musigService.needsFinalSignature(transaction2));
		assert.true(context.musigService.needsSignatures(transaction2));
		assert.true(context.musigService.needsAllSignatures(transaction2));
		assert.is(context.musigService.remainingSignatureCount(transaction2), 1);

		const wallet3 = {
			signingKey: musig.accounts[2].mnemonic,
			path: musig.accounts[2].legacyMasterPath,
		};

		const transaction3 = await context.musigService.addSignature(
			transaction2.data(),
			new Signatories.Signatory(
				new Signatories.MnemonicSignatory({
					signingKey: wallet3.signingKey,
					address: "address", // Not needed / used
					publicKey: wallet3.path, // TODO really?
					privateKey: "privateKey", // Not needed / used
				}),
			),
		);

		assert.instance(transaction3, SignedTransactionData);
		assert.is(transaction3.data().senderPublicKey, wallet1.publicKey);
		assert.instance(transaction3.data().multiSignature.publicKeys, Array);
		assert.is(transaction3.data().multiSignature.publicKeys[0], wallet1.publicKey);
		assert.true(context.musigService.isMultiSignatureReady(transaction3));
		assert.false(context.musigService.needsFinalSignature(transaction3));
		assert.false(context.musigService.needsSignatures(transaction3));
		assert.true(context.musigService.needsAllSignatures(transaction3));
		assert.is(context.musigService.remainingSignatureCount(transaction3), 0);
	});
});

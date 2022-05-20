import { IoC, Services, Signatories } from "@ardenthq/sdk";
import { UUID } from "@ardenthq/sdk-cryptography";
import { describe } from "@ardenthq/sdk-test";
import { openTransportReplayer, RecordStore } from "@ledgerhq/hw-transport-mocker";

import { musig } from "../test/fixtures/musig.js";
import {
	manyMusigRegistrationTxs,
	oneSignatureNativeSegwitMusigRegistrationTx,
	oneSignatureNativeSegwitMusigTransferTx,
	threeSignatureNativeSegwitMusigRegistrationTx,
	threeSignatureNativeSegwitMusigTransferTx,
	twoSignatureNativeSegwitMusigRegistrationTx,
	twoSignatureNativeSegwitMusigTransferTx,
	unsignedNativeSegwitMusigRegistrationTx,
	unsignedNativeSegwitMusigTransferTx,
} from "../test/fixtures/musig-native-segwit-txs";
import { createService } from "../test/mocking.js";
import { AddressFactory } from "./address.factory.js";
import { AddressService } from "./address.service.js";
import { ClientService } from "./client.service.js";
import { ConfirmedTransactionData } from "./confirmed-transaction.dto.js";
import { BindingType } from "./constants.js";
import { KeyPairService } from "./key-pair.service.js";
import { LedgerService } from "./ledger.service.js";
import { MultiSignatureService } from "./multi-signature.service.js";
import { MultiSignatureSigner } from "./multi-signature.signer";
import { PublicKeyService } from "./public-key.service.js";
import { SignedTransactionData } from "./signed-transaction.dto.js";
import { WalletData } from "./wallet.dto.js";

describe("multi signature registration", ({ assert, beforeEach, each, it, nock }) => {
	beforeEach(async (context) => {
		context.subject = await createService(MultiSignatureService, "btc.testnet", (container) => {
			container.constant(IoC.BindingType.Container, container);
			container.constant(IoC.BindingType.DataTransferObjects, {
				ConfirmedTransactionData,
				SignedTransactionData,
				WalletData,
			});
			container.singleton(IoC.BindingType.DataTransferObjectService, Services.AbstractDataTransferObjectService);
			container.singleton(BindingType.AddressFactory, AddressFactory);
			container.singleton(IoC.BindingType.AddressService, AddressService);
			container.singleton(IoC.BindingType.ClientService, ClientService);
			container.singleton(BindingType.MultiSignatureSigner, MultiSignatureSigner);
			container.singleton(IoC.BindingType.KeyPairService, KeyPairService);
			container.constant(
				IoC.BindingType.LedgerTransportFactory,
				async () => await openTransportReplayer(RecordStore.fromString("")),
			);
			container.singleton(IoC.BindingType.LedgerService, LedgerService);
			container.singleton(IoC.BindingType.PublicKeyService, PublicKeyService);
		});

		context.fixtures = { result: [...manyMusigRegistrationTxs] };
	});

	it("#allWithPendingState", async (context) => {
		nock.fake("https://btc-test-musig.arkvault.io").post("/").reply(200, context.fixtures);

		assert.length(
			await context.subject.allWithPendingState(
				"Vpub5mtyU6Hx9xrx63Y3W4aGW1LuQkmwrq9xsQNgX7tDAM8DTHhE7vXMZ7Hue2FR8SMAGDW57fy76HFmN1jnckSmeX2cDMWVA1KViot6bLgJZuN",
			),
			2,
		);
	});

	it("#allWithReadyState", async (context) => {
		nock.fake("https://btc-test-musig.ardenthq.comcom").post("/").reply(200, context.fixtures);

		assert.length(
			await context.subject.allWithReadyState(
				"Vpub5mtyU6Hx9xrx63Y3W4aGW1LuQkmwrq9xsQNgX7tDAM8DTHhE7vXMZ7Hue2FR8SMAGDW57fy76HFmN1jnckSmeX2cDMWVA1KViot6bLgJZuN",
			),
			2,
		);
	});

	it("#findById", async (context) => {
		nock.fake("https://btc-test-musig.ardenthq.comcom")
			.post("/")
			.reply(200, { result: oneSignatureNativeSegwitMusigRegistrationTx });

		assert.object(
			await context.subject.findById(
				"Vpub5mtyU6Hx9xrx63Y3W4aGW1LuQkmwrq9xsQNgX7tDAM8DTHhE7vXMZ7Hue2FR8SMAGDW57fy76HFmN1jnckSmeX2cDMWVA1KViot6bLgJZuN",
			),
		);
	});

	it("#broadcast", async (context) => {
		nock.fake("https://btc-test-musig.ardenthq.comcom")
			.post("/")
			.reply(200, { result: { id: "abc" } })
			.post("/")
			.reply(200, { result: { id: "abc" } });

		assert.equal(await context.subject.broadcast({}), { accepted: ["abc"], errors: {}, rejected: [] });
		assert.equal(await context.subject.broadcast({ asset: { multiSignature: "123" } }), {
			accepted: ["abc"],
			errors: {},
			rejected: [],
		});
	});

	it("#addSignature", async (context) => {
		// We need a deep copy as signing modifies the signatures and public keys
		const transactionData = JSON.parse(JSON.stringify(unsignedNativeSegwitMusigRegistrationTx));

		const wallet1 = {
			path: musig.accounts[0].nativeSegwitMasterPath,
			signingKey: musig.accounts[0].mnemonic,
		};
		const signatory = new Signatories.Signatory(
			new Signatories.MnemonicSignatory({
				address: "address",
				// TODO for now we use publicKey for passing path
				privateKey: "privateKey",

				// Not needed / used
				publicKey: wallet1.path,

				signingKey: wallet1.signingKey, // Not needed / used
			}),
		);
		// Add wallet's public key and sign it
		transactionData.multiSignature.publicKeys.push(
			"Vpub5mtyU6Hx9xrx63Y3W4aGW1LuQkmwrq9xsQNgX7tDAM8DTHhE7vXMZ7Hue2FR8SMAGDW57fy76HFmN1jnckSmeX2cDMWVA1KViot6bLgJZuN",
		);
		assert.equal(
			(await context.subject.addSignature(transactionData, signatory)).data(),
			oneSignatureNativeSegwitMusigRegistrationTx,
		);

		const wallet2 = {
			path: musig.accounts[1].nativeSegwitMasterPath,
			signingKey: musig.accounts[1].mnemonic,
		};
		const signatory2 = new Signatories.Signatory(
			new Signatories.MnemonicSignatory({
				address: "address",
				// TODO for now we use publicKey for passing path
				privateKey: "privateKey",

				// Not needed / used
				publicKey: wallet2.path,

				signingKey: wallet2.signingKey, // Not needed / used
			}),
		);
		// Add wallet's public key and sign it
		transactionData.multiSignature.publicKeys.push(
			"Vpub5mYgzMb93fDtChZ2xmY7g3aEgHFjdgQE6P596AiL5zENEcVjDCciGfWmhZJngn6gVmBRh6E1Vp7aZYY7wQkMRTQSKhauGwYAUEdiGbS35D1",
		);
		assert.equal(
			(await context.subject.addSignature(transactionData, signatory2)).data(),
			twoSignatureNativeSegwitMusigRegistrationTx,
		);

		const wallet3 = {
			path: musig.accounts[2].nativeSegwitMasterPath,
			signingKey: musig.accounts[2].mnemonic,
		};
		const signatory3 = new Signatories.Signatory(
			new Signatories.MnemonicSignatory({
				address: "address",
				// TODO for now we use publicKey for passing path
				privateKey: "privateKey",

				// Not needed / used
				publicKey: wallet3.path,

				signingKey: wallet3.signingKey, // Not needed / used
			}),
		);
		// Add wallet's public key and sign it
		transactionData.multiSignature.publicKeys.push(
			"Vpub5mSSLBPFi3acdjk5giwrmA7gXPAJsiLXXKibgjXYycH1gp95t2Pqv3U8dT9kEGxvAdfiN5DGmozDmZ7sJyDuMgfxt4h4KujF7MWt5tQH8py",
		);
		assert.equal(
			(await context.subject.addSignature(transactionData, signatory3)).data(),
			threeSignatureNativeSegwitMusigRegistrationTx,
		);
	});

	each(
		"isMultiSignatureRegistrationReady when already signed",
		async ({ context, dataset }) => {
			const transaction = (await createService(SignedTransactionData)).configure(dataset.tx.id, dataset.tx);

			assert.is(context.subject.isMultiSignatureReady(transaction), dataset.expected);
		},
		[
			{ expected: false, tx: unsignedNativeSegwitMusigRegistrationTx },
			{ expected: false, tx: oneSignatureNativeSegwitMusigRegistrationTx },
			{ expected: false, tx: twoSignatureNativeSegwitMusigRegistrationTx },
			{ expected: true, tx: threeSignatureNativeSegwitMusigRegistrationTx },
		],
	);

	it("#needsSignatures", async (context) => {
		const transaction = (await createService(SignedTransactionData)).configure("123", { signatures: [] });

		assert.false(context.subject.needsSignatures(transaction));
	});

	it("#needsAllSignatures", async (context) => {
		const transaction = (await createService(SignedTransactionData)).configure("123", {
			multiSignature: {
				min: 2,
				publicKeys: [
					"0301fd417566397113ba8c55de2f093a572744ed1829b37b56a129058000ef7bce",
					"034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
				],
			},
			signatures: [],
		});

		assert.true(context.subject.needsAllSignatures(transaction));
	});

	it("#needsWalletSignature", async (context) => {
		const transaction = (await createService(SignedTransactionData)).configure(
			oneSignatureNativeSegwitMusigRegistrationTx.id,
			oneSignatureNativeSegwitMusigRegistrationTx,
		);

		assert.false(
			context.subject.needsWalletSignature(
				transaction,
				"Vpub5mtyU6Hx9xrx63Y3W4aGW1LuQkmwrq9xsQNgX7tDAM8DTHhE7vXMZ7Hue2FR8SMAGDW57fy76HFmN1jnckSmeX2cDMWVA1KViot6bLgJZuN",
			),
		);

		assert.true(
			context.subject.needsWalletSignature(
				transaction,
				"Vpub5mYgzMb93fDtChZ2xmY7g3aEgHFjdgQE6P596AiL5zENEcVjDCciGfWmhZJngn6gVmBRh6E1Vp7aZYY7wQkMRTQSKhauGwYAUEdiGbS35D1",
			),
		);
	});

	it("#needsFinalSignature", async (context) => {
		const transaction = (await createService(SignedTransactionData)).configure("123", { signatures: [] });

		assert.false(context.subject.needsFinalSignature(transaction));
	});

	each(
		"remainingSignatureCount when already signed by participants",
		async ({ context, dataset }) => {
			const transaction = (await createService(SignedTransactionData)).configure(dataset.tx.id, dataset.tx);

			assert.is(context.subject.remainingSignatureCount(transaction), dataset.expected);
		},
		[
			{ expected: 3, tx: unsignedNativeSegwitMusigRegistrationTx },
			{ expected: 2, tx: oneSignatureNativeSegwitMusigRegistrationTx },
			{ expected: 1, tx: twoSignatureNativeSegwitMusigRegistrationTx },
			{ expected: 0, tx: threeSignatureNativeSegwitMusigRegistrationTx },
		],
	);
});

describe("transfer", ({ assert, beforeEach, each, it, nock, stub }) => {
	beforeEach(async (context) => {
		context.subject = await createService(MultiSignatureService, "btc.testnet", (container) => {
			container.constant(IoC.BindingType.Container, container);
			container.constant(IoC.BindingType.DataTransferObjects, {
				ConfirmedTransactionData,
				SignedTransactionData,
				WalletData,
			});
			container.singleton(IoC.BindingType.DataTransferObjectService, Services.AbstractDataTransferObjectService);
			container.singleton(BindingType.AddressFactory, AddressFactory);
			container.singleton(IoC.BindingType.AddressService, AddressService);
			container.singleton(IoC.BindingType.ClientService, ClientService);
			container.singleton(BindingType.MultiSignatureSigner, MultiSignatureSigner);
			container.singleton(IoC.BindingType.KeyPairService, KeyPairService);
			container.constant(
				IoC.BindingType.LedgerTransportFactory,
				async () => await openTransportReplayer(RecordStore.fromString("")),
			);
			container.singleton(IoC.BindingType.LedgerService, LedgerService);
			container.singleton(IoC.BindingType.PublicKeyService, PublicKeyService);
		});
	});

	it("#broadcast", async (context) => {
		stub(UUID, "random").returnValueOnce("68db1bb0-d747-48e8-b6f6-e347cc01b568");

		const { multiSignature, ...data } = unsignedNativeSegwitMusigTransferTx;
		nock.fake("https://btc-test-musig.ardenthq.comcom")
			.post("/", {
				id: "68db1bb0-d747-48e8-b6f6-e347cc01b568",
				jsonrpc: "2.0",
				method: "store",
				params: { data: data as any, multiSignature },
			})
			.reply(
				200,
				'{"id":"68db1bb0-d747-48e8-b6f6-e347cc01b568","jsonrpc":"2.0","result":{"id":"189f015c-2a58-4664-83f4-0b331fa9172a"}}',
			);

		assert.equal(await context.subject.broadcast(unsignedNativeSegwitMusigTransferTx), {
			accepted: [unsignedNativeSegwitMusigTransferTx.id],
			errors: {},
			rejected: [],
		});
	});

	each(
		"remainingSignatureCount when already signed",
		async ({ context, dataset }) => {
			const transaction = (await createService(SignedTransactionData)).configure(dataset.tx.id, dataset.tx);

			assert.is(context.subject.remainingSignatureCount(transaction), dataset.expected);
		},
		[
			{ expected: 2, tx: unsignedNativeSegwitMusigTransferTx },
			{ expected: 1, tx: twoSignatureNativeSegwitMusigRegistrationTx },
			{ expected: 0, tx: threeSignatureNativeSegwitMusigRegistrationTx },
		],
	);

	it("#addSignature", async (context) => {
		// We need a deep copy as signing modifies the signatures and public keys
		const transactionData = JSON.parse(JSON.stringify(unsignedNativeSegwitMusigTransferTx));

		const wallet1 = {
			path: musig.accounts[0].nativeSegwitMasterPath,
			signingKey: musig.accounts[0].mnemonic,
		};
		const signatory1 = new Signatories.Signatory(
			new Signatories.MnemonicSignatory({
				address: "address",
				// TODO for now we use publicKey for passing path
				privateKey: "privateKey",

				// Not needed / used
				publicKey: wallet1.path,

				signingKey: wallet1.signingKey, // Not needed / used
			}),
		);

		const signedTransaction1 = await context.subject.addSignature(transactionData, signatory1);
		assert.equal(signedTransaction1.data(), oneSignatureNativeSegwitMusigTransferTx);

		const wallet2 = {
			path: musig.accounts[1].nativeSegwitMasterPath,
			signingKey: musig.accounts[1].mnemonic,
		};
		const signatory2 = new Signatories.Signatory(
			new Signatories.MnemonicSignatory({
				address: "address",
				// TODO for now we use publicKey for passing path
				privateKey: "privateKey",

				// Not needed / used
				publicKey: wallet2.path,

				signingKey: wallet2.signingKey, // Not needed / used
			}),
		);
		const signedTransaction2 = await context.subject.addSignature(signedTransaction1.data(), signatory2);
		assert.equal(signedTransaction2.data(), twoSignatureNativeSegwitMusigTransferTx);

		const wallet3 = {
			path: musig.accounts[2].nativeSegwitMasterPath,
			signingKey: musig.accounts[2].mnemonic,
		};
		const signatory3 = new Signatories.Signatory(
			new Signatories.MnemonicSignatory({
				address: "address",
				// TODO for now we use publicKey for passing path
				privateKey: "privateKey",

				// Not needed / used
				publicKey: wallet3.path,

				signingKey: wallet3.signingKey, // Not needed / used
			}),
		);
		const signedTransaction3 = await context.subject.addSignature(signedTransaction2.data(), signatory3);
		assert.equal(signedTransaction3.data(), threeSignatureNativeSegwitMusigTransferTx);
	});
});

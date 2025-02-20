import { IoC, Services, Signatories } from "@ardenthq/sdk";
import { describe } from "@ardenthq/sdk-test";

import { createService } from "../test/mocking";
import { identity } from "../test/wallets";
import { AddressService } from "./address.service.js";
import { ClientService } from "./client.service.js";
import { ConfirmedTransactionData } from "./confirmed-transaction.dto.js";
import { FeeService } from "./fee.service";
import { KeyPairService } from "./key-pair.service.js";
import { LedgerService } from "./ledger.service.js";
import { MultiSignatureService } from "./multi-signature.service.js";
import { MultiSignatureSigner } from "./multi-signature.signer.js";
import { PublicKeyService } from "./public-key.service.js";
import { SignedTransactionData } from "./signed-transaction.dto.js";
import { TransactionService } from "./transaction.service.js";
import { WalletData } from "./wallet.dto.js";

describe("FeeService", ({ assert, nock, it, loader, beforeAll }) => {
	describe("all", () => {
		it("should get the fees for Mainsail", async () => {
			nock.fake(/.+/)
				.get("/api/node/fees")
				.reply(200, loader.json(`test/fixtures/client/feesByNode.json`))
				.get("/api/transactions/fees")
				.reply(200, loader.json(`test/fixtures/client/feesByType.json`));

			const feeService = await createService(FeeService, "mainsail.devnet");
			const result = await feeService.all();

			assert.containKeys(result, [
				"delegateRegistration",
				"delegateResignation",
				"multiPayment",
				"transfer",
				"usernameRegistration",
				"usernameResignation",
				"vote",
			]);

			assert.snapshot("fees_mainsail_delegate_registration", result.delegateRegistration);
			assert.snapshot("fees_mainsail_delegate_resignation", result.delegateResignation);
			assert.snapshot("fees_mainsail_multi_payment", result.multiPayment);
			assert.snapshot("fees_mainsail_transfer", result.transfer);
			assert.snapshot("fees_mainsail_username_registration", result.usernameRegistration);
			assert.snapshot("fees_mainsail_username_resignation", result.usernameResignation);
			assert.snapshot("fees_mainsail_vote", result.vote);
		});
	});

	describe("calculate", () => {
		let feeService: FeeService;
		let transactionService: TransactionService;
		let defaultTransferInput: any;

		beforeAll(async () => {
			feeService = await createService(FeeService, "mainsail.devnet");
			transactionService = await createService(TransactionService, "mainsail.devnet", (container) => {
				container.constant(IoC.BindingType.Container, container);
				container.factory(MultiSignatureSigner);
				container.constant(IoC.BindingType.DataTransferObjects, {
					ConfirmedTransactionData,
					SignedTransactionData,
					WalletData,
				});
				container.singleton(
					IoC.BindingType.DataTransferObjectService,
					Services.AbstractDataTransferObjectService,
				);
				container.singleton(IoC.BindingType.AddressService, AddressService);
				container.singleton(IoC.BindingType.ClientService, ClientService);
				container.singleton(IoC.BindingType.KeyPairService, KeyPairService);
				container.constant(IoC.BindingType.LedgerTransportFactory, async () => {});
				container.singleton(IoC.BindingType.LedgerService, LedgerService);
				container.singleton(IoC.BindingType.PublicKeyService, PublicKeyService);
				container.singleton(IoC.BindingType.MultiSignatureService, MultiSignatureService);
			});

			defaultTransferInput = {
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
		});

		it("should calculate fee for a transfer transaction", async () => {
			nock.fake(/.+/)
				.get("/api/node/fees")
				.reply(200, loader.json(`test/fixtures/client/feesByNode.json`))
				.get("/api/transactions/fees")
				.reply(200, loader.json(`test/fixtures/client/feesByType.json`));

			const transaction = await transactionService.transfer(defaultTransferInput);
			const fee = await feeService.calculate(transaction);
			assert.equal(fee.toString(), "0");
		});
	});

	describe("transform", () => {
		it("should transform dynamic fees correctly", async () => {
			nock.fake(/.+/)
				.get("/api/node/fees")
				.reply(200, {
					data: {
						evmCall: {
							avg: "2000000000",
							max: "3000000000",
							min: "1000000000",
						},
					},
				})
				.get("/api/transactions/fees")
				.reply(200, {});

			const feeService = await createService(FeeService, "mainsail.devnet");
			const fees = await feeService.all();
			assert.equal(fees.delegateRegistration.min, "1");
			assert.equal(fees.delegateRegistration.avg, "2");
			assert.equal(fees.delegateRegistration.max, "3");
			assert.true(fees.delegateRegistration.isDynamic);
			assert.equal(fees.delegateRegistration.static.toString(), "0");
		});
	});
});

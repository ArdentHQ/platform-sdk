/* istanbul ignore file */

import { ConfigRepository } from "./coins.js";
import { IContainer } from "./container.contracts.js";
import { Container } from "./container.js";
import { AbstractExtendedPublicKeyService } from "./extended-public-key.service.js";
import { AbstractProberService } from "./prober.service.js";
import { BindingType, IServiceProvider, ServiceList } from "./service-provider.contract.js";
import {
	AbstractAddressService,
	AbstractClientService,
	AbstractDataTransferObjectService,
	AbstractExtendedAddressService,
	AbstractFeeService,
	AbstractKeyPairService,
	AbstractKnownWalletService,
	AbstractLedgerService,
	AbstractLinkService,
	AbstractMessageService,
	AbstractMultiSignatureService,
	AbstractPrivateKeyService,
	AbstractPublicKeyService,
	AbstractSignatoryService,
	AbstractTransactionService,
	AbstractWalletDiscoveryService,
	AbstractWIFService,
	BigNumberService,
} from "./services.js";

export class AbstractServiceProvider implements IServiceProvider {
	protected readonly configRepository: ConfigRepository;

	public constructor(container: IContainer) {
		this.configRepository = container.get(BindingType.ConfigRepository);
	}

	public async make(container: Container): Promise<void> {
		return this.compose(container);
	}

	protected async compose(container: Container): Promise<void> {
		const services: ServiceList = container.get(BindingType.Services);

		if (container.missing(BindingType.AddressService)) {
			container.singleton(BindingType.AddressService, services.AddressService || AbstractAddressService);
		}

		if (container.missing(BindingType.BigNumberService)) {
			container.singleton(BindingType.BigNumberService, BigNumberService);
		}

		if (container.missing(BindingType.DataTransferObjectService)) {
			container.singleton(
				BindingType.DataTransferObjectService,
				services.DataTransferObjectService || AbstractDataTransferObjectService,
			);
		}

		if (container.missing(BindingType.ClientService)) {
			container.singleton(BindingType.ClientService, services.ClientService || AbstractClientService);
		}

		if (container.missing(BindingType.ExtendedAddressService)) {
			container.singleton(
				BindingType.ExtendedAddressService,
				services.ExtendedAddressService || AbstractExtendedAddressService,
			);
		}

		if (container.missing(BindingType.ExtendedPublicKeyService)) {
			container.singleton(
				BindingType.ExtendedPublicKeyService,
				services.ExtendedPublicKeyService || AbstractExtendedPublicKeyService,
			);
		}

		if (container.missing(BindingType.FeeService)) {
			container.singleton(BindingType.FeeService, services.FeeService || AbstractFeeService);
		}

		if (container.missing(BindingType.KeyPairService)) {
			container.singleton(BindingType.KeyPairService, services.KeyPairService || AbstractKeyPairService);
		}

		if (container.missing(BindingType.KnownWalletService)) {
			container.singleton(
				BindingType.KnownWalletService,
				services.KnownWalletService || AbstractKnownWalletService,
			);
		}

		if (container.missing(BindingType.LedgerService)) {
			container.singleton(BindingType.LedgerService, services.LedgerService || AbstractLedgerService);
		}

		if (container.missing(BindingType.LinkService)) {
			container.singleton(BindingType.LinkService, services.LinkService || AbstractLinkService);
		}

		if (container.missing(BindingType.MessageService)) {
			container.singleton(BindingType.MessageService, services.MessageService || AbstractMessageService);
		}

		if (container.missing(BindingType.MultiSignatureService)) {
			container.singleton(
				BindingType.MultiSignatureService,
				services.MultiSignatureService || AbstractMultiSignatureService,
			);
		}

		if (container.missing(BindingType.PrivateKeyService)) {
			container.singleton(BindingType.PrivateKeyService, services.PrivateKeyService || AbstractPrivateKeyService);
		}

		if (container.missing(BindingType.ProberService)) {
			container.singleton(BindingType.ProberService, services.ProberService || AbstractProberService);
		}

		if (container.missing(BindingType.PublicKeyService)) {
			container.singleton(BindingType.PublicKeyService, services.PublicKeyService || AbstractPublicKeyService);
		}

		if (container.missing(BindingType.SignatoryService)) {
			container.singleton(BindingType.SignatoryService, services.SignatoryService || AbstractSignatoryService);
		}

		if (container.missing(BindingType.TransactionService)) {
			container.singleton(
				BindingType.TransactionService,
				services.TransactionService || AbstractTransactionService,
			);
		}

		if (container.missing(BindingType.WalletDiscoveryService)) {
			container.singleton(
				BindingType.WalletDiscoveryService,
				services.WalletDiscoveryService || AbstractWalletDiscoveryService,
			);
		}

		if (container.missing(BindingType.WIFService)) {
			container.singleton(BindingType.WIFService, services.WIFService || AbstractWIFService);
		}
	}
}

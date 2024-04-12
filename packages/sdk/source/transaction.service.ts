/* istanbul ignore file */

import { BigNumber, NumberLike } from "@ardenthq/sdk-helpers";
import {
	TransactionService as Contract,
	DelegateRegistrationInput,
	DelegateResignationInput,
	IpfsInput,
	MultiPaymentInput,
	MultiSignatureInput,
	SecondSignatureInput,
	TransferInput,
	UnlockTokenInput,
	UsernameRegistrationInput,
	UsernameResignationInput,
	ValidatorRegistrationInput,
	VoteInput,
} from "./transaction.contract.js";

import { BigNumberService } from "./big-number.service.js";
import { BindingType } from "./service-provider.contract.js";
import { ClientService } from "./client.contract.js";
import { ConfigRepository } from "./coins.js";
import { DataTransferObjectService } from "./data-transfer-object.contract.js";
import { HttpClient } from "./http.js";
import { IContainer } from "./container.contracts.js";
import { NetworkHostSelector } from "./network.models.js";
import { NotImplemented } from "./exceptions.js";
import { SignedTransactionData } from "./contracts.js";

export class AbstractTransactionService implements Contract {
	protected readonly bigNumberService: BigNumberService;
	protected readonly clientService: ClientService;
	protected readonly configRepository: ConfigRepository;
	protected readonly dataTransferObjectService: DataTransferObjectService;
	protected readonly httpClient: HttpClient;
	protected readonly hostSelector: NetworkHostSelector;

	public constructor(container: IContainer) {
		this.bigNumberService = container.get(BindingType.BigNumberService);
		this.clientService = container.get(BindingType.ClientService);
		this.configRepository = container.get(BindingType.ConfigRepository);
		this.dataTransferObjectService = container.get(BindingType.DataTransferObjectService);
		this.httpClient = container.get(BindingType.HttpClient);
		this.hostSelector = container.get(BindingType.NetworkHostSelector);
	}

	public async transfer(input: TransferInput): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, this.transfer.name);
	}

	public async secondSignature(input: SecondSignatureInput): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, this.secondSignature.name);
	}

	public async usernameRegistration(input: UsernameRegistrationInput): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, this.usernameRegistration.name);
	}

	public async usernameResignation(input: UsernameResignationInput): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, this.usernameResignation.name);
	}

	public async delegateRegistration(
		input: DelegateRegistrationInput | ValidatorRegistrationInput,
	): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, this.delegateRegistration.name);
	}

	public async vote(input: VoteInput): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, this.vote.name);
	}

	public async multiSignature(input: MultiSignatureInput): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, this.multiSignature.name);
	}

	public async ipfs(input: IpfsInput): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, this.ipfs.name);
	}

	public async multiPayment(input: MultiPaymentInput): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, this.multiPayment.name);
	}

	public async delegateResignation(input: DelegateResignationInput): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, this.delegateResignation.name);
	}

	public async unlockToken(input: UnlockTokenInput): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, this.unlockToken.name);
	}

	public async estimateExpiration(value?: string): Promise<string | undefined> {
		return undefined;
	}

	protected toSatoshi(value: NumberLike): BigNumber {
		return this.bigNumberService.make(value).toSatoshi();
	}
}

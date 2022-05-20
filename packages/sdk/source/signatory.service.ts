/* istanbul ignore file */

import { AddressService } from "./address.contract.js";
import { IContainer } from "./container.contracts.js";
import { MultiSignatureAsset } from "./multi-signature.contract.js";
import { PrivateKeyService } from "./private-key.contract.js";
import { PublicKeyService } from "./public-key.contract.js";
import { BindingType } from "./service-provider.contract.js";
import { IdentityOptions } from "./shared.contract.js";
import {
	ConfirmationMnemonicSignatory,
	ConfirmationSecretSignatory,
	ConfirmationWIFSignatory,
	LedgerSignatory,
	MnemonicSignatory,
	MultiSignatureSignatory,
	PrivateKeySignatory,
	SecretSignatory,
	Signatory,
	WIFSignatory,
} from "./signatories.js";
import { SignatoryService } from "./signatory.contract.js";

export class AbstractSignatoryService implements SignatoryService {
	readonly #addressService: AddressService;
	readonly #privateKeyService: PrivateKeyService;
	readonly #publicKeyService: PublicKeyService;

	public constructor(container: IContainer) {
		this.#addressService = container.get(BindingType.AddressService);
		this.#privateKeyService = container.get(BindingType.PrivateKeyService);
		this.#publicKeyService = container.get(BindingType.PublicKeyService);
	}

	public async mnemonic(mnemonic: string, options?: IdentityOptions): Promise<Signatory> {
		return new Signatory(
			new MnemonicSignatory({
				address: (await this.#addressService.fromMnemonic(mnemonic, options)).address,
				options,
				privateKey: (await this.#privateKeyService.fromMnemonic(mnemonic, options)).privateKey,
				publicKey: (await this.#publicKeyService.fromMnemonic(mnemonic, options)).publicKey,
				signingKey: mnemonic,
			}),
			options?.multiSignature,
		);
	}

	public async confirmationMnemonic(
		signingKey: string,
		confirmKey: string,
		options?: IdentityOptions,
	): Promise<Signatory> {
		return new Signatory(
			new ConfirmationMnemonicSignatory({
				address: (await this.#addressService.fromMnemonic(signingKey, options)).address,
				confirmKey,
				privateKey: (await this.#privateKeyService.fromMnemonic(signingKey, options)).privateKey,
				publicKey: (await this.#publicKeyService.fromMnemonic(signingKey, options)).publicKey,
				signingKey,
			}),
			options?.multiSignature,
		);
	}

	public async wif(primary: string, options?: IdentityOptions): Promise<Signatory> {
		return new Signatory(
			new WIFSignatory({
				address: (await this.#addressService.fromWIF(primary)).address,
				options,
				privateKey: (await this.#privateKeyService.fromWIF(primary)).privateKey,
				publicKey: (await this.#publicKeyService.fromWIF(primary)).publicKey,
				signingKey: primary,
			}),
			options?.multiSignature,
		);
	}

	public async confirmationWIF(
		signingKey: string,
		confirmKey: string,
		options?: IdentityOptions,
	): Promise<Signatory> {
		return new Signatory(
			new ConfirmationWIFSignatory({
				address: (await this.#addressService.fromWIF(signingKey)).address,
				confirmKey,
				privateKey: (await this.#privateKeyService.fromWIF(signingKey)).privateKey,
				publicKey: (await this.#publicKeyService.fromWIF(signingKey)).publicKey,
				signingKey,
			}),
			options?.multiSignature,
		);
	}

	public async privateKey(privateKey: string, options?: IdentityOptions): Promise<Signatory> {
		return new Signatory(
			new PrivateKeySignatory({
				address: (await this.#addressService.fromPrivateKey(privateKey, options)).address,
				options,
				signingKey: privateKey,
			}),
			options?.multiSignature,
		);
	}

	public async multiSignature(asset: MultiSignatureAsset, options?: IdentityOptions): Promise<Signatory> {
		return new Signatory(
			new MultiSignatureSignatory(
				asset,
				(
					await this.#addressService.fromMultiSignature({ min: asset.min, publicKeys: asset.publicKeys })
				).address,
			),
			options?.multiSignature ?? asset,
		);
	}

	public async ledger(path: string, options?: IdentityOptions): Promise<Signatory> {
		return new Signatory(new LedgerSignatory({ options, signingKey: path }), options?.multiSignature);
	}

	public async secret(secret: string, options?: IdentityOptions): Promise<Signatory> {
		return new Signatory(
			new SecretSignatory({
				address: (await this.#addressService.fromSecret(secret)).address,
				options,
				privateKey: (await this.#privateKeyService.fromSecret(secret)).privateKey,
				publicKey: (await this.#publicKeyService.fromSecret(secret)).publicKey,
				signingKey: secret,
			}),
			options?.multiSignature,
		);
	}

	public async confirmationSecret(
		signingKey: string,
		confirmKey: string,
		options?: IdentityOptions,
	): Promise<Signatory> {
		return new Signatory(
			new ConfirmationSecretSignatory({
				address: (await this.#addressService.fromSecret(signingKey)).address,
				confirmKey,
				privateKey: (await this.#privateKeyService.fromSecret(signingKey)).privateKey,
				publicKey: (await this.#publicKeyService.fromSecret(signingKey)).publicKey,
				signingKey,
			}),
			options?.multiSignature,
		);
	}

	/**
	 * This signatory should only be used for testing and fee calculations.
	 */
	public async stub(mnemonic: string): Promise<Signatory> {
		return new Signatory(
			new MnemonicSignatory({
				address: "address",
				privateKey: "privateKey",
				publicKey: "publicKey",
				signingKey: mnemonic,
			}),
		);
	}
}

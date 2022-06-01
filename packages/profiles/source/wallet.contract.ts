import { Coins, Contracts, Networks, Services } from "@ardenthq/sdk";
import { BigNumber } from "@ardenthq/sdk-helpers";

import {
	IDataRepository,
	IMultiSignature,
	IProfile,
	ISettingRepository,
	ISignatoryFactory,
	ITransactionIndex,
	ITransactionService,
	IVoteRegistry,
	IWalletGate,
	IWalletImportFormat,
	IWalletMutator,
	IWalletSynchroniser,
} from "./contracts.js";
import { AttributeBag } from "./helpers/attribute-bag.js";

export type WalletBalanceType = keyof Contracts.WalletBalance;

export type WalletDerivationMethod = "bip39" | "bip44" | "bip49" | "bip84";

/**
 * Defines the structure that represents the wallet data.
 *
 * @export
 * @interface IWalletData
 */
export interface IWalletData {
	id: string;
	data: Record<string, any>;
	settings: Record<string, any>;
}

/**
 *
 *
 * @export
 * @interface IReadWriteWalletAttributes
 */
export interface IReadWriteWalletAttributes {
	id: string;
	initialState: IWalletData;
	restorationState: { full: boolean; partial: boolean };
	// Will be empty initially
	coin: Coins.Coin;
	wallet: Contracts.WalletData | undefined;
	address: string;
	publicKey: string | undefined;
	avatar: string;
	// Will be set when the client removes implementations
	isMissingCoin: boolean;
	isMissingNetwork: boolean;
}

/**
 * Defines the implementation contract for the read-write wallet.
 *
 * @export
 * @interface IReadWriteWallet
 */
export interface IReadWriteWallet {
	/**
	 * Get the profile that manages the wallet.
	 *
	 * @return {*}  {IProfile}
	 * @memberof IReadWriteWallet
	 */
	profile(): IProfile;

	/**
	 * Determine if the wallet has synchronised itself with the network.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	hasSyncedWithNetwork(): boolean;

	/**
	 * Get the id.
	 *
	 * @return {string}
	 * @memberof IReadWriteWallet
	 */
	id(): string;

	/**
	 * Get the coin instance.
	 *
	 * @return {Coins.Coin}
	 * @memberof IReadWriteWallet
	 */
	coin(): Coins.Coin;

	/**
	 * Get the network data.
	 *
	 * @return {Networks.Network}
	 * @memberof IReadWriteWallet
	 */
	network(): Networks.Network;

	/**
	 * Get the crypto currency.
	 *
	 * @return {string}
	 * @memberof IReadWriteWallet
	 */
	currency(): string;

	/**
	 * Get the exchange currency.
	 *
	 * @return {string}
	 * @memberof IReadWriteWallet
	 */
	exchangeCurrency(): string;

	/**
	 * Get the alias.
	 *
	 * @return {(string | undefined)}
	 * @memberof IReadWriteWallet
	 */
	alias(): string | undefined;

	/**
	 * Get the display name.
	 *
	 * @return {(string | undefined)}
	 * @memberof IReadWriteWallet
	 */
	displayName(): string | undefined;

	/**
	 * Get the primary key.
	 *
	 * @return {string}
	 * @memberof IReadWriteWallet
	 */
	primaryKey(): string;

	/**
	 * Get the method used to import the wallet.
	 *
	 * @return {string}
	 * @memberof IReadWriteWallet
	 */
	importMethod(): string;

	/**
	 * Get the method used for deriving addresses: bip44, bip49, etc.
	 *
	 * @return {WalletDerivationMethod}
	 * @memberof IReadWriteWallet
	 */
	derivationMethod(): WalletDerivationMethod;

	/**
	 * Get the address.
	 *
	 * @return {string}
	 * @memberof IReadWriteWallet
	 */
	address(): string;

	/**
	 * Get the public key
	 *
	 * @return {(string | undefined)}
	 * @memberof IReadWriteWallet
	 */
	publicKey(): string | undefined;

	/**
	 * Get the balance.
	 *
	 * @return {number}
	 * @memberof IReadWriteWallet
	 */
	balance(type?: WalletBalanceType): number;

	/**
	 * Get the converted balance.
	 *
	 * @return {number}
	 * @memberof IReadWriteWallet
	 */
	convertedBalance(type?: WalletBalanceType): number;

	/**
	 * Get the nonce.
	 *
	 * @return {BigNumber}
	 * @memberof IReadWriteWallet
	 */
	nonce(): BigNumber;

	/**
	 * Get the avatar.
	 *
	 * @return {string}
	 * @memberof IReadWriteWallet
	 */
	avatar(): string;

	/**
	 * Get the data repository instance.
	 *
	 * @return {IDataRepository}
	 * @memberof IReadWriteWallet
	 */
	data(): IDataRepository;

	/**
	 * Get the settings repository instance.
	 *
	 * @return {ISettingRepository}
	 * @memberof IReadWriteWallet
	 */
	settings(): ISettingRepository;

	/**
	 * Get the underlying wallet data.
	 *
	 * @return {Contracts.WalletData}
	 * @memberof IReadWriteWallet
	 */
	toData(): Contracts.WalletData;

	/**
	 * Turn the wallet into a normalised object.
	 *
	 * @return {IWalletData}
	 * @memberof IReadWriteWallet
	 */
	toObject(): IWalletData;

	/**
	 * Get the known name.
	 *
	 * @return {(string | undefined)}
	 * @memberof IReadWriteWallet
	 */
	knownName(): string | undefined;

	/**
	 * Get the second public key.
	 *
	 * @return {(string | undefined)}
	 * @memberof IReadWriteWallet
	 */
	secondPublicKey(): string | undefined;

	/**
	 * Get the username.
	 *
	 * @return {(string | undefined)}
	 * @memberof IReadWriteWallet
	 */
	username(): string | undefined;

	/**
	 * Determine if the wallet is a delegate.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	isDelegate(): boolean;

	/**
	 * Determine if the wallet is a resigned delegate.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	isResignedDelegate(): boolean;

	/**
	 * Determine if the wallet is known.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	isKnown(): boolean;

	/**
	 * Determine if the wallet is owned by an exchange.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	isOwnedByExchange(): boolean;

	/**
	 * Determine if the wallet is owned by the blockchain development team.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	isOwnedByTeam(): boolean;

	/**
	 * Determine if the wallet belongs to a ledger.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	isLedger(): boolean;

	/**
	 * Determine if the wallet belongs to a Nano S ledger.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	isLedgerNanoS(): boolean;

	/**
	 * Determine if the wallet belongs to a Nano X ledger.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	isLedgerNanoX(): boolean;

	/**
	 * Determine if the wallet uses a multi signature.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	isMultiSignature(): boolean;

	/**
	 * Determine if the wallet uses a second signature.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	isSecondSignature(): boolean;

	/**
	 * Determine if the wallet is starred.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	isStarred(): boolean;

	/**
	 * Determine if the wallet is a cold wallet.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	isCold(): boolean;

	/**
	 * Toggle the starred state.
	 *
	 * @memberof IReadWriteWallet
	 */
	toggleStarred(): void;

	/**
	 * Get the coin ID.
	 *
	 * @return {string}
	 * @memberof IReadWriteWallet
	 */
	coinId(): string;

	/**
	 * Get the network ID.
	 *
	 * @return {string}
	 * @memberof IReadWriteWallet
	 */
	networkId(): string;

	/**
	 * Get the coin manifest.
	 *
	 * @return {Coins.Manifest}
	 * @memberof IReadWriteWallet
	 */
	manifest(): Coins.Manifest;

	/**
	 * Get the coin configuration.
	 *
	 * @return {Coins.Config}
	 * @memberof IReadWriteWallet
	 */
	config(): Coins.ConfigRepository;

	/**
	 * Get the client service instance.
	 *
	 * @return {Services.ClientService}
	 * @memberof IReadWriteWallet
	 */
	client(): Services.ClientService;

	/**
	 * Get the data transfer object service instance.
	 *
	 * @return {Services.DataTransferObjectService}
	 * @memberof IReadWriteWallet
	 */
	dataTransferObject(): Services.DataTransferObjectService;

	/**
	 * Get the identity service instance.
	 *
	 * @return {Services.IdentityService}
	 * @memberof IReadWriteWallet
	 */
	addressService(): Services.AddressService;

	/**
	 * Get the identity service instance.
	 *
	 * @return {Services.IdentityService}
	 * @memberof IReadWriteWallet
	 */
	extendedAddressService(): Services.ExtendedAddressService;

	/**
	 * Get the identity service instance.
	 *
	 * @return {Services.IdentityService}
	 * @memberof IReadWriteWallet
	 */
	keyPairService(): Services.KeyPairService;

	/**
	 * Get the identity service instance.
	 *
	 * @return {Services.IdentityService}
	 * @memberof IReadWriteWallet
	 */
	privateKeyService(): Services.PrivateKeyService;

	/**
	 * Get the identity service instance.
	 *
	 * @return {Services.IdentityService}
	 * @memberof IReadWriteWallet
	 */
	publicKeyService(): Services.PublicKeyService;

	/**
	 * Get the identity service instance.
	 *
	 * @return {Services.IdentityService}
	 * @memberof IReadWriteWallet
	 */
	wifService(): Services.WIFService;

	/**
	 * Get the ledger service instance.
	 *
	 * @return {Services.LedgerService}
	 * @memberof IReadWriteWallet
	 */
	ledger(): Services.LedgerService;

	/**
	 * Get the link service instance.
	 *
	 * @return {Services.LinkService}
	 * @memberof IReadWriteWallet
	 */
	link(): Services.LinkService;

	/**
	 * Get the message service instance.
	 *
	 * @return {Services.MessageService}
	 * @memberof IReadWriteWallet
	 */
	message(): Services.MessageService;

	/**
	 * Get the signatory service instance.
	 *
	 * @return {Services.SignatoryService}
	 * @memberof IReadWriteWallet
	 */
	signatory(): Services.SignatoryService;

	/**
	 * Get the transaction service instance.
	 *
	 * @return {ITransactionService}
	 * @memberof IReadWriteWallet
	 */
	transaction(): ITransactionService;

	/**
	 * Get the supported transaction types.
	 *
	 * @return {Networks.TransactionType[]}
	 * @memberof IReadWriteWallet
	 */
	transactionTypes(): Networks.TransactionType[];

	/**
	 * Get the explorer link.
	 *
	 * @return {string}
	 * @memberof IReadWriteWallet
	 */
	explorerLink(): string;

	/**
	 * Mark the wallet as fully restored.
	 *
	 * @memberof IReadWriteWallet
	 */
	markAsFullyRestored(): void;

	/**
	 * Determine if the wallet has been fully restored.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	hasBeenFullyRestored(): boolean;

	/**
	 * Mark the wallet as partially restored.
	 *
	 * @memberof IReadWriteWallet
	 */
	markAsPartiallyRestored(): void;

	/**
	 * Determine if the wallet has been partially restored.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	hasBeenPartiallyRestored(): boolean;

	/**
	 * Mark the wallet as missing its coin.
	 *
	 * @memberof IReadWriteWallet
	 */
	markAsMissingCoin(): void;

	/**
	 * Determine if the wallet is missing its coin.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	isMissingCoin(): boolean;

	/**
	 * Mark the wallet as missing its network.
	 *
	 * @memberof IReadWriteWallet
	 */
	markAsMissingNetwork(): void;

	/**
	 * Determine if the wallet is missing its network.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	isMissingNetwork(): boolean;

	/**
	 * Connect the coin to the network.
	 *
	 * @return {Promise<void>}
	 * @memberof IReadWriteWallet
	 */
	connect(): Promise<void>;

	/**
	 * Determine if the wallet has yet configured a coin.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	hasCoin(): boolean;

	/**
	 * Get the underlying attributes.
	 *
	 * @return {AttributeBag}
	 * @memberof IReadWriteWallet
	 */
	getAttributes(): AttributeBag<IReadWriteWalletAttributes>;

	/**
	 * Get the wallet authorisation gate instance.
	 *
	 * @return {IWalletGate}
	 * @memberof IReadWriteWallet
	 */
	gate(): IWalletGate;

	/**
	 * Get the wallet synchroniser instance.
	 *
	 * @return {IWalletGate}
	 * @memberof IReadWriteWallet
	 */
	synchroniser(): IWalletSynchroniser;

	/**
	 * Get the wallet mutator instance.
	 *
	 * @return {IWalletMutator}
	 * @memberof IReadWriteWallet
	 */
	mutator(): IWalletMutator;

	/**
	 * Get the wallet vote registry instance.
	 *
	 * @return {IVoteRegistry}
	 * @memberof IReadWriteWallet
	 */
	voting(): IVoteRegistry;

	/**
	 * Get the wallet transaction index instance.
	 *
	 * @return {ITransactionIndex}
	 * @memberof IReadWriteWallet
	 */
	transactionIndex(): ITransactionIndex;

	/**
	 * Get the wallet import format instance.
	 *
	 * @return {IWalletImportFormat}
	 * @memberof IReadWriteWallet
	 */
	signingKey(): IWalletImportFormat;

	/**
	 * Get the wallet import format instance for the confirmation key.
	 *
	 * @return {IWalletImportFormat}
	 * @memberof IReadWriteWallet
	 */
	confirmKey(): IWalletImportFormat;

	/**
	 * Get the wallet multi signature instance.
	 *
	 * @return {IMultiSignature}
	 * @memberof IReadWriteWallet
	 */
	multiSignature(): IMultiSignature;

	/**
	 * Determine if the wallet can vote.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	canVote(): boolean;

	/**
	 * Determine if the wallet can perform write actions.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	canWrite(): boolean;

	/**
	 * Determines if the wallet has been imported with a mnemonic.
	 *
	 * @return {*}  {boolean}
	 * @memberof IReadWriteWallet
	 */
	actsWithMnemonic(): boolean;

	/**
	 * Determines if the wallet has been imported with a address.
	 *
	 * @return {*}  {boolean}
	 * @memberof IReadWriteWallet
	 */
	actsWithAddress(): boolean;

	/**
	 * Determines if the wallet has been imported with a public key.
	 *
	 * @return {*}  {boolean}
	 * @memberof IReadWriteWallet
	 */
	actsWithPublicKey(): boolean;

	/**
	 * Determines if the wallet has been imported with a private key.
	 *
	 * @return {*}  {boolean}
	 * @memberof IReadWriteWallet
	 */
	actsWithPrivateKey(): boolean;

	/**
	 * Determines if the wallet has been imported with an address with a derivation path.
	 *
	 * @return {*}  {boolean}
	 * @memberof IReadWriteWallet
	 */
	actsWithAddressWithDerivationPath(): boolean;

	/**
	 * Determines if the wallet has been imported with a mnemonic with encryption.
	 *
	 * @return {*}  {boolean}
	 * @memberof IReadWriteWallet
	 */
	actsWithMnemonicWithEncryption(): boolean;

	/**
	 * Determines if the wallet has been imported with a wif.
	 *
	 * @return {*}  {boolean}
	 * @memberof IReadWriteWallet
	 */
	actsWithWif(): boolean;

	/**
	 * Determines if the wallet has been imported with a wif with encryption.
	 *
	 * @return {*}  {boolean}
	 * @memberof IReadWriteWallet
	 */
	actsWithWifWithEncryption(): boolean;

	/**
	 * Determines if the wallet has been imported with a secret.
	 *
	 * @return {*}  {boolean}
	 * @memberof IReadWriteWallet
	 */
	actsWithSecret(): boolean;

	/**
	 * Determines if the wallet has been imported with a secret with encryption.
	 *
	 * @return {*}  {boolean}
	 * @memberof IReadWriteWallet
	 */
	actsWithSecretWithEncryption(): boolean;

	/**
	 * Determines if the wallet has an encryption password.
	 *
	 * @return {*}  {boolean}
	 * @memberof IReadWriteWallet
	 */
	usesPassword(): boolean;

	/**
	 * Returns an instance of SignatoryFactory.
	 *
	 * @return {ISignatoryFactory}
	 * @memberof IReadWriteWallet
	 */
	signatoryFactory(): ISignatoryFactory;
}

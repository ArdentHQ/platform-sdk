import { ConfigRepository } from "./config.js";

export type FeeType = "static" | "dynamic" | "gas" | "free" | "weight" | "size";

export type ExpirationType = "height" | "timestamp";

export type SignatureMethod = "default" | "musig" | "ledgerS" | "ledgerX";

export type NetworkHostType = "full" | "musig" | "archival" | "explorer";

export type WalletPermission = "read" | "write";

export type TransactionType =
	| "delegateRegistration"
	| "delegateResignation"
	| "ipfs"
	| "multiPayment"
	| "multiSignature"
	| "secondSignature"
	| "transfer"
	| "unlockToken"
	| "vote";

export interface NetworkHost {
	type: NetworkHostType;
	host: string;
	custom?: boolean;
	failedCount?: number;
	height?: number;
	query?: Record<string, string>;
	enabled?: boolean;
}

export type NetworkHostSelector = (configRepository: ConfigRepository, type?: NetworkHostType) => NetworkHost;

export interface ImportMethod {
	default: boolean;
	permissions: WalletPermission[];
	canBeEncrypted?: boolean;
}

export interface NetworkManifestTransactions {
	expirationType: ExpirationType;
	types: TransactionType[];
	fees: {
		type: FeeType;
		ticker: string;
	};
	memo?: boolean;
	utxo?: boolean;
	multiPaymentRecipients?: number;
	multiSignatureType?: "standard" | "advanced";
	lockedBalance?: boolean;
}

export interface NetworkManifestFeatureFlags {
	Address?: AddressMethods;
	Client?: ClientMethods;
	Fee?: FeeMethods;
	KeyPair?: KeyPairMethods;
	Ledger?: LedgerMethods;
	Message?: MessageMethods;
	PrivateKey?: PrivateKeyMethods;
	PublicKey?: PublicKeyMethods;
	Transaction?: TransactionMethods;
	WIF?: WIFMethods;
}

export interface NetworkManifestExplorer {
	block: string;
	transaction: string;
	wallet: string;
}

export interface NetworkManifestToken {
	name: string;
	symbol: string;
	address: string;
	decimals: number;
}

export interface NetworkManifestImportMethods {
	address?: ImportMethod;
	bip38?: ImportMethod;
	bip39?: ImportMethod;
	bip44?: ImportMethod;
	bip49?: ImportMethod;
	bip84?: ImportMethod;
	discovery?: ImportMethod;
	privateKey?: ImportMethod;
	publicKey?: ImportMethod;
	secret?: ImportMethod;
	wif?: ImportMethod;
}

export interface NetworkManifestConstants {
	slip44: number;
	bech32?: string;
	bip32?: {
		private: number;
		public: number;
	};
	bip39?: {
		wordCount: number;
	};
	wif?: number;
}

export type VotingMethod = "simple" | "split" | "transfer";

export interface NetworkManifest {
	id: string;
	type: string;
	name: string;
	coin: string;
	currency: {
		ticker: string;
		symbol: string;
		decimals?: number;
	};
	hosts: NetworkHost[];
	constants: NetworkManifestConstants;
	governance?: {
		/**
		 * If the type is "simple" then the transaction can be send as is.
		 * ARK for example can do everything in a single vote transaction.
		 *
		 * If the type is "split" then a vote and unvote have to be performed separately.
		 * BIND for exampel can't vote and unvote in a single vote transaction.
		 *
		 * If the type is "transfer" then funds have to be transfered before voting.
		 * AVAX for example operates on multiple blockchains and requires fund transfers.
		 */
		method?: VotingMethod;
		delegateIdentifier?: "address" | "publicKey";
		delegateCount: number;
		votesPerWallet: number;
		votesPerTransaction: number;
		// Only LSK at the moment
		votesAmountStep?: number;
		votesAmountMinimum?: number;
		votesAmountMaximum?: number;
	};
	transactions: NetworkManifestTransactions;
	importMethods: NetworkManifestImportMethods;
	knownWallets?: string;
	featureFlags: NetworkManifestFeatureFlags;
	explorer: NetworkManifestExplorer;
	tokens?: NetworkManifestToken[];
	meta?: Record<string, any>;
}

export interface CoinManifest {
	name: string;
	networks: Record<string, NetworkManifest>;
}

// These types and interfaces describe what functionality is available.
// A client shall use these to modify the UI to avoid the execution of
// methods that are not available.

export type ClientMethod =
	| "transaction"
	| "transactions"
	| "wallet"
	| "wallets"
	| "delegate"
	| "delegates"
	| "votes"
	| "voters"
	| "configuration"
	| "fees"
	| "syncing"
	| "broadcast";
export type ClientMethods = ClientMethod[];

export type FeeMethod = "all" | "calculate";
export type FeeMethods = FeeMethod[];

export type AddressMethod =
	| "mnemonic.bip39"
	| "mnemonic.bip44"
	| "mnemonic.bip49"
	| "mnemonic.bip84"
	| "multiSignature"
	| "privateKey"
	| "publicKey"
	| "secret"
	| "validate"
	| "wif";
export type AddressMethods = AddressMethod[];

export type KeyPairMethod =
	| "mnemonic.bip39"
	| "mnemonic.bip44"
	| "mnemonic.bip49"
	| "mnemonic.bip84"
	| "privateKey"
	| "secret"
	| "wif";
export type KeyPairMethods = KeyPairMethod[];

export type PrivateKeyMethod =
	| "mnemonic.bip39"
	| "mnemonic.bip44"
	| "mnemonic.bip49"
	| "mnemonic.bip84"
	| "secret"
	| "wif";
export type PrivateKeyMethods = PrivateKeyMethod[];

export type PublicKeyMethod =
	| "mnemonic.bip39"
	| "mnemonic.bip44"
	| "mnemonic.bip49"
	| "mnemonic.bip84"
	| "multiSignature"
	| "secret"
	| "wif";
export type PublicKeyMethods = PublicKeyMethod[];

export type WIFMethod = "mnemonic.bip39" | "mnemonic.bip44" | "mnemonic.bip49" | "mnemonic.bip84" | "secret";
export type WIFMethods = WIFMethod[];

export type LedgerMethod = "getVersion" | "getPublicKey" | "signTransaction" | "signMessage";
export type LedgerMethods = LedgerMethod[];

export type MessageMethod = "sign" | "verify";
export type MessageMethods = MessageMethod[];

export type TransactionMethod =
	| "delegateRegistration.ledgerS"
	| "delegateRegistration.ledgerX"
	| "delegateRegistration.musig"
	| "delegateRegistration"
	| "delegateResignation.ledgerS"
	| "delegateResignation.ledgerX"
	| "delegateResignation.musig"
	| "delegateResignation"
	| "estimateExpiration"
	| "ipfs.ledgerS"
	| "ipfs.ledgerX"
	| "ipfs.musig"
	| "ipfs"
	| "multiPayment.ledgerS"
	| "multiPayment.ledgerX"
	| "multiPayment.musig"
	| "multiPayment"
	| "multiSignature.ledgerS"
	| "multiSignature.ledgerX"
	| "multiSignature.musig"
	| "multiSignature"
	| "secondSignature.ledgerS"
	| "secondSignature.ledgerX"
	| "secondSignature.musig"
	| "secondSignature"
	| "transfer.ledgerS"
	| "transfer.ledgerX"
	| "transfer.musig"
	| "transfer"
	| "unlockToken.ledgerS"
	| "unlockToken.ledgerX"
	| "unlockToken.musig"
	| "unlockToken"
	| "vote.ledgerS"
	| "vote.ledgerX"
	| "vote.musig"
	| "vote";
export type TransactionMethods = TransactionMethod[];

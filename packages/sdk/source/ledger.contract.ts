import { WalletData } from "./contracts.js";

export type LedgerTransport = any;
export type LedgerTransportFactory = () => Promise<LedgerTransport>;

export type LedgerWalletList = Record<string, WalletData>;

export type LedgerTransportInstance = any;
export type SetupLedgerFactory = (transport: LedgerTransport) => LedgerTransportInstance;
export type LedgerSignature = { r: string, s: string, v: string };

export interface LedgerService {
	connect(setupLedgerFactory?: SetupLedgerFactory): Promise<void>;

	disconnect(): Promise<void>;

	getVersion(): Promise<string>;

	getPublicKey(path: string): Promise<string>;

	getExtendedPublicKey(path: string): Promise<string>;

	signTransaction(path: string, payload: string | Buffer): Promise<string>;

	sign(path: string, payload: string): Promise<LedgerSignature>;

	signMessage(path: string, payload: string): Promise<string>;

	scan(options?: {
		useLegacy: boolean;
		startPath?: string;
		onProgress?: (wallet: WalletData) => void;
	}): Promise<Record<string, WalletData>>;

	isNanoS(): Promise<boolean>;

	isNanoX(): Promise<boolean>;
}

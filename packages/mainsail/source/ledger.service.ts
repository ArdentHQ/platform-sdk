import { Buffer } from "buffer";
import { Collections, Contracts, IoC, Services } from "@ardenthq/sdk";
import { BIP44, HDKey } from "@ardenthq/sdk-cryptography";
import { Exceptions } from "@mainsail/contracts";
import { chunk, createRange, formatLedgerDerivationPath } from "./ledger.service.helpers.js";
import { SetupLedgerFactory } from "./ledger.service.types.js";

export class LedgerService extends Services.AbstractLedgerService {
	readonly #clientService!: Services.ClientService;
	readonly #addressService!: Services.AddressService;
	readonly #dataTransferObjectService: Services.DataTransferObjectService;
	#ledger!: Services.LedgerTransport;
	#transport!: any;

	public constructor(container: IoC.IContainer) {
		super(container);

		this.#clientService = container.get(IoC.BindingType.ClientService);
		this.#addressService = container.get(IoC.BindingType.AddressService);
		this.#dataTransferObjectService = container.get(IoC.BindingType.DataTransferObjectService);
	}

	public override async onPreDestroy(): Promise<void> {
		return this.disconnect();
	}

	public override async connect(setupTransport: SetupLedgerFactory): Promise<void> {
		this.#ledger = await this.ledgerTransportFactory();
		this.#transport = setupTransport?.(this.#ledger);
	}

	public override async disconnect(): Promise<void> {
		if (this.#ledger) {
			await this.#ledger.close();
		}
	}

	public override async getVersion(): Promise<string> {
		// @TODO: fix hardcoded number.
		return "1";
	}

	public override async getPublicKey(path: string): Promise<string> {
		const result = await this.#transport.getAddress(path);
		return result.publicKey;
	}

	public override async getExtendedPublicKey(path: string): Promise<string> {
		// @TODO: revisit.
		return this.getPublicKey(path);
	}

	public override async signTransaction(path: string, payload: Buffer): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.signTransaction.name);
	}

	public override async signMessage(path: string, payload: string): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.signMessage.name);
	}

	public override async scan(options?: {
		useLegacy: boolean;
		startPath?: string;
		onProgress?: (wallet: Contracts.WalletData) => void;
	}): Promise<Services.LedgerWalletList> {
		const pageSize = 5;
		const page = 0;
		const slip44 = this.configRepository.get<number>("network.constants.slip44");

		const addresses: Record<string, { address: string; publicKey: string }> = {};
		const path = `m/44'/${slip44}'/0'`;

		let initialAddressIndex = 0;

		if (options?.startPath) {
			// Get the address index from expected format `m/purpose'/coinType'/account'/change/addressIndex`
			initialAddressIndex = BIP44.parse(options.startPath).addressIndex + 1;
		}

		const compressedPublicKey = await this.getExtendedPublicKey(path);
		const ledgerWallets: Services.LedgerWalletList = {};

		for (const addressIndexIterator of createRange(page, pageSize)) {
			const addressIndex = initialAddressIndex + addressIndexIterator;

			const publicKey: string = HDKey.fromCompressedPublicKey(compressedPublicKey)
				.derive(`m/0/${addressIndex}`)
				.publicKey.toString("hex");

			const { address } = await this.#addressService.fromPublicKey(publicKey);

			ledgerWallets[`${path}/0/${addressIndex}`] = this.#dataTransferObjectService.wallet({
				address,
				balance: 0,
				publicKey,
			});
		}

		return ledgerWallets;
	}

	public override async isNanoS(): Promise<boolean> {
		return this.#ledger.deviceModel?.id === "nanoS";
	}

	public override async isNanoX(): Promise<boolean> {
		return this.#ledger.deviceModel?.id === "nanoX";
	}
}

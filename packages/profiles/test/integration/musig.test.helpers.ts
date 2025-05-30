import { BigNumber } from "bignumber.js";

import { IProfile } from "../../source/profile.contract";
import { IReadWriteWallet } from "../../source/wallet.contract";
import { mnemonics as testMnemonics } from "../fixtures/identity";

interface Wallet {
	wallet: IReadWriteWallet;
	mnemonic: string;
}

export const generateWalletsFromMnemonics = async ({
	profile,
	coinId,
	networkId,
	mnemonics,
}: {
	profile: IProfile;
	coinId: string;
	networkId: string;
	mnemonics: string[];
}): Promise<Wallet[]> => {
	const wallets: Wallet[] = [];

	for (const mnemonic of mnemonics) {
		const wallet = await profile.walletFactory().fromMnemonicWithBIP39({
			coin: coinId,
			mnemonic,
			network: networkId,
		});

		await wallet.synchroniser().identity();

		wallets.push({
			mnemonic,
			wallet,
		});
	}

	return wallets;
};

export const generateWallets = async ({
	numberOfWallets,
	profile,
	coinId,
	networkId,
}: {
	numberOfWallets: number;
	profile: IProfile;
	coinId: string;
	networkId: string;
}) => {
	const mnemonics = testMnemonics[networkId].slice(0, numberOfWallets);
	const wallets = await generateWalletsFromMnemonics({ coinId, mnemonics, networkId, profile });
	const publicKeys = wallets.map(({ wallet }) => wallet.publicKey()) as string[];

	return {
		mnemonics,
		publicKeys,
		wallets,
	};
};

export const generateRegistrationTransactionData = async ({
	wallet,
	minSignatures,
	publicKeys = [],
	optionalKeys = [],
	mandatoryKeys = [],
	timestamp,
}: {
	wallet: Wallet;
	minSignatures: number;
	timestamp?: number;
	publicKeys?: string[];
	mandatoryKeys?: string[];
	optionalKeys?: string[];
}) => {
	let transactionData: any;

	if (wallet.wallet.network().id() === "ark.devnet") {
		transactionData = {
			data: {
				min: minSignatures,
				publicKeys,
				senderPublicKey: wallet.wallet.publicKey(),
			},
			fee: 5,
			nonce: wallet.wallet.nonce().plus(1).toString(),
			signatory: await wallet.wallet.coin().signatory().mnemonic(wallet.mnemonic),
			timestamp,
		};
	}

	const fee = new BigNumber(transactionData.fee)
		.times([...publicKeys, ...mandatoryKeys, ...optionalKeys].length)
		.plus(transactionData.fee);
	transactionData.fee = fee.toNumber();

	return { fee, transactionData };
};

export const createMusigRegistrationFixture = ({
	uuid,
	publicKeys = [],
	mandatoryKeys = [],
	optionalKeys = [],
	signatures,
	signature,
	min = 2,
	wallet,
	fee,
	timestamp,
}: {
	uuid: string;
	publicKeys?: string[];
	mandatoryKeys?: string[];
	optionalKeys?: string[];
	signatures: string[];
	signature?: string;
	min: number;
	wallet: IReadWriteWallet;
	fee?: string;
	timestamp?: number;
}) => {
	if (wallet.network().id() === "ark.devnet") {
		return {
			data: {
				amount: "0",

				asset: {
					multiSignature: {
						min,
						publicKeys,
					},
				},

				// Make sure fee is enough to avoid side-effects in wallet statuses (isAwaitingOurSignature, isAwaitingOtherSignatures etc)
				fee: fee || "1500000000",

				id: uuid,
				multiSignature: {
					min,
					publicKeys,
				},
				nonce: wallet.nonce().plus(1).toString(),
				senderPublicKey: wallet.publicKey(),
				signature,
				signatures,
				type: 4,
				typeGroup: 1,
				version: 2,
			},
			id: uuid,
			multisigAsset: {
				min,
				publicKeys,
			},
			timestampReceived: timestamp,
		};
	}

	throw new Error(`Fixture for [${wallet.network().id()}] is missing`);
};

export const mockMusigServer = (nock, url) => {
	const mockResponse: Record<string, any> = {
		delete: { result: [] },
		pending: { result: [] },
		ready: { result: [] },
		show: { result: { id: undefined } },
		store: { result: { id: undefined } },
	};

	nock.fake(url)
		.post("/", ({ method }) => method === "delete")
		.reply(200, () => mockResponse.delete)
		.post("/", ({ method }) => method === "store")
		.reply(200, () => mockResponse.store)
		.post("/", ({ method }) => method === "show")
		.reply(200, () => mockResponse.show)
		.post("/", ({ method, params }) => method === "list" && params.state === "pending")
		.reply(200, () => mockResponse.pending)
		.post("/", ({ method, params }) => method === "list" && params.state === "ready")
		.reply(200, () => mockResponse.ready)
		.persist();

	const mockServerResponse = (key: string, fixture: any) => {
		mockResponse[key].result = fixture;
	};

	return {
		mockServerResponse,
		resetServerResponseMocks: () => {
			mockServerResponse("delete", []);
			mockServerResponse("store", { id: undefined });
			mockServerResponse("show", { id: undefined });
			mockServerResponse("ready", []);
			mockServerResponse("pending", []);
		},
	};
};

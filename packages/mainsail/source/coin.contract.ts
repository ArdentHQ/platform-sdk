import { ServiceProvider } from "@mainsail/crypto-address-base58";

export interface CryptoConfig {
	pubKeyHash: number;
	wif: number;
}

export const BindingType = {
	Application: Symbol.for("Coin<Application>"),
	Crypto: Symbol.for("ARK<Crypto>"),
	Height: Symbol.for("ARK<Height>"),
	MultiSignatureSigner: Symbol.for("ARK<MultiSignatureSigner>"),
	ServiceProvider: Symbol.for("Coin<ServiceProvider>"),
	TransferBuilder: Symbol.for("Coin<TransferBuilder>"),
};

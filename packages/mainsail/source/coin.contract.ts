export interface CryptoConfig {
	pubKeyHash: number;
	wif: number;
}

export const BindingType = {
	Crypto: Symbol.for("ARK<Crypto>"),
	Height: Symbol.for("ARK<Height>"),
	MultiSignatureSigner: Symbol.for("ARK<MultiSignatureSigner>"),
};

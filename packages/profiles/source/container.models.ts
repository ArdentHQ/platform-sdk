export const Identifiers = {
	AppData: Symbol.for("Data<App>"),
	Coins: Symbol.for("Coins"),
	ContactRepository: Symbol.for("ContactRepository"),
	DataRepository: Symbol.for("DataRepository"),
	DelegateService: Symbol.for("DelegateService"),
	ExchangeRateService: Symbol.for("ExchangeRateService"),
	FeeService: Symbol.for("FeeService"),
	HttpClient: Symbol.for("HttpClient"),
	KnownWalletService: Symbol.for("KnownWalletService"),
	LedgerTransportFactory: Symbol.for("LedgerTransportFactory"),
	MigrationSchemas: Symbol.for("Migration<Schemas>"),
	MigrationVersion: Symbol.for("Migration<Version>"),
	NetworkHostSelectorFactory: Symbol.for("NetworkHostSelectorFactory"),
	PluginRegistry: Symbol.for("PluginRegistry"),
	ProfileRepository: Symbol.for("ProfileRepository"),
	SettingRepository: Symbol.for("SettingRepository"),
	Storage: Symbol.for("Storage"),
	WalletRepository: Symbol.for("WalletRepository"),
	WalletService: Symbol.for("WalletService"),
};

export const Events = {
	EnvironmentChanged: Symbol.for("EnvironmentChanged"),
	ProfileChanged: Symbol.for("ProfileChanged"),
};

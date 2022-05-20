import { Networks } from "@ardenthq/sdk";

import { explorer, featureFlags, importMethods, transactions } from "./shared.js";

const network: Networks.NetworkManifest = {
	coin: "Ethereum",
	constants: {
		slip44: 60,
	},
	currency: {
		decimals: 18,
		symbol: "Ξ",
		ticker: "ETH",
	},
	explorer,
	featureFlags,
	hosts: [
		{
			host: "https://eth-live.arkvault.io/api",
			type: "full",
		},
		{
			host: "https://etherscan.io",
			type: "explorer",
		},
	],
	id: "eth.mainnet",
	importMethods,
	meta: {
		// @TODO
		networkId: "1",
	},
	name: "Mainnet",
	tokens: [
		{
			address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
			decimals: 18,
			name: "Wrapped Ethereum",
			symbol: "WETH",
		},
		{
			address: "0x0000000000085d4780B73119b644AE5ecd22b376",
			decimals: 18,
			name: "TrueUSD",
			symbol: "TUSD",
		},
		{
			address: "0x0000000000095413afC295d19EDeb1Ad7B71c952",
			decimals: 18,
			name: "Tokenlon",
			symbol: "LON",
		},
		{
			address: "0x00a8b738E453fFd858a7edf03bcCfe20412f0Eb0",
			decimals: 18,
			name: "AllianceBlock Token",
			symbol: "ALBT",
		},
		{
			address: "0x00c83aeCC790e8a4453e5dD3B0B4b3680501a7A7",
			decimals: 18,
			name: "SKALE",
			symbol: "SKL",
		},
		{
			address: "0x0202Be363B8a4820f3F4DE7FaF5224fF05943AB1",
			decimals: 18,
			name: "UniLend Finance Token",
			symbol: "UFT",
		},
		{
			address: "0x0258F474786DdFd37ABCE6df6BBb1Dd5dfC4434a",
			decimals: 8,
			name: "Orion Protocol",
			symbol: "ORN",
		},
		{
			address: "0x03ab458634910AaD20eF5f1C8ee96F1D6ac54919",
			decimals: 18,
			name: "Rai Reflex Index",
			symbol: "RAI",
		},
		{
			address: "0x0488401c3F535193Fa8Df029d9fFe615A06E74E6",
			decimals: 18,
			name: "SparkPoint",
			symbol: "SRK",
		},
		{
			address: "0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828",
			decimals: 18,
			name: "UMA Voting Token v1",
			symbol: "UMA",
		},
		{
			address: "0x06A01a4d579479Dd5D884EBf61A31727A3d8D442",
			decimals: 8,
			name: "SmartKey",
			symbol: "Skey",
		},
		{
			address: "0x07150e919B4De5fD6a63DE1F9384828396f25fDC",
			decimals: 9,
			name: "Base Protocol",
			symbol: "BASE",
		},
		{
			address: "0x09a3EcAFa817268f77BE1283176B946C4ff2E608",
			decimals: 18,
			name: "Wrapped MIR Token",
			symbol: "MIR",
		},
		{
			address: "0x09e64c2B61a5f1690Ee6fbeD9baf5D6990F8dFd0",
			decimals: 18,
			name: "Growth",
			symbol: "GRO",
		},
		{
			address: "0x0a50C93c762fDD6E56D86215C24AaAD43aB629aa",
			decimals: 8,
			name: "LGO Token",
			symbol: "LGO",
		},
		{
			address: "0x0Ae055097C6d159879521C384F1D2123D1f195e6",
			decimals: 18,
			name: "xDai",
			symbol: "STAKE",
		},
		{
			address: "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
			decimals: 18,
			name: "Yearn.Finance",
			symbol: "YFI",
		},
		{
			address: "0x0c7D5ae016f806603CB1782bEa29AC69471CAb9c",
			decimals: 18,
			name: "Bifrost",
			symbol: "BFC",
		},
		{
			address: "0x0CDF9acd87E940837ff21BB40c9fd55F68bba059",
			decimals: 18,
			name: "Public Mint",
			symbol: "MINT",
		},
		{
			address: "0x0D8775F648430679A709E98d2b0Cb6250d2887EF",
			decimals: 18,
			name: "Basic Attention Token",
			symbol: "BAT",
		},
		{
			address: "0x0f51bb10119727a7e5eA3538074fb341F56B09Ad",
			decimals: 18,
			name: "DAO Maker Token",
			symbol: "DAO",
		},
		{
			address: "0x0F5D2fB29fb7d3CFeE444a200298f468908cC942",
			decimals: 18,
			name: "Decentraland MANA",
			symbol: "MANA",
		},
		{
			address: "0x0f7F961648aE6Db43C75663aC7E5414Eb79b5704",
			decimals: 18,
			name: "XIO Network",
			symbol: "XIO",
		},
		{
			address: "0x0fF6ffcFDa92c53F615a4A75D982f399C989366b",
			decimals: 18,
			name: "Unilayer",
			symbol: "LAYER",
		},
		{
			address: "0x10Be9a8dAe441d276a5027936c3aADEd2d82bC15",
			decimals: 18,
			name: "https://unimex.network/",
			symbol: "UMX",
		},
		{
			address: "0x111111111117dC0aa78b770fA6A738034120C302",
			decimals: 18,
			name: "1INCH Token",
			symbol: "1INCH",
		},
		{
			address: "0x1337DEF16F9B486fAEd0293eb623Dc8395dFE46a",
			decimals: 18,
			name: "Armor",
			symbol: "ARMOR",
		},
		{
			address: "0x1337DEF18C680aF1f9f45cBcab6309562975b1dD",
			decimals: 18,
			name: "Armor NXM",
			symbol: "arNXM",
		},
		{
			address: "0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b",
			decimals: 18,
			name: "DefiPulse Index",
			symbol: "DPI",
		},
		{
			address: "0x152687Bc4A7FCC89049cF119F9ac3e5aCF2eE7ef",
			decimals: 18,
			name: "DeltaHub Community",
			symbol: "DHC",
		},
		{
			address: "0x1614F18Fc94f47967A3Fbe5FfcD46d4e7Da3D787",
			decimals: 18,
			name: "PAID Network",
			symbol: "PAID",
		},
		{
			address: "0x16980b3B4a3f9D89E33311B5aa8f80303E5ca4F8",
			decimals: 6,
			name: "KIRA Network",
			symbol: "KEX",
		},
		{
			address: "0x178c820f862B14f316509ec36b13123DA19A6054",
			decimals: 18,
			name: "Energy Web Token Bridged",
			symbol: "EWTB",
		},
		{
			address: "0x1796ae0b0fa4862485106a0de9b654eFE301D0b2",
			decimals: 18,
			name: "Polkamon",
			symbol: "PMON",
		},
		{
			address: "0x17aC188e09A7890a1844E5E65471fE8b0CcFadF3",
			decimals: 18,
			name: "Cryptocurrency Top 10 Tokens Index",
			symbol: "CC10",
		},
		{
			address: "0x18aAA7115705e8be94bfFEBDE57Af9BFc265B998",
			decimals: 18,
			name: "Audius",
			symbol: "AUDIO",
		},
		{
			address: "0x1985365e9f78359a9B6AD760e32412f4a445E862",
			decimals: 18,
			name: "Reputation",
			symbol: "REP",
		},
		{
			address: "0x1b40183EFB4Dd766f11bDa7A7c3AD8982e998421",
			decimals: 18,
			name: "VesperToken",
			symbol: "VSP",
		},
		{
			address: "0x1C9491865a1DE77C5b6e19d2E6a5F1D7a6F2b25F",
			decimals: 18,
			name: "Antimatter.Finance Governance Token",
			symbol: "MATTER",
		},
		{
			address: "0x1C9922314ED1415c95b9FD453c3818fd41867d0B",
			decimals: 18,
			name: "TOWER",
			symbol: "TOWER",
		},
		{
			address: "0x1cBb83EbcD552D5EBf8131eF8c9CD9d9BAB342bC",
			decimals: 18,
			name: "Non-Fungible Yearn",
			symbol: "NFY",
		},
		{
			address: "0x1cEB5cB57C4D4E2b2433641b95Dd330A33185A44",
			decimals: 18,
			name: "Keep3rV1",
			symbol: "KP3R",
		},
		{
			address: "0x1dD80016e3d4ae146Ee2EBB484e8edD92dacC4ce",
			decimals: 18,
			name: "Lead Token",
			symbol: "LEAD",
		},
		{
			address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
			decimals: 18,
			name: "Uniswap",
			symbol: "UNI",
		},
		{
			address: "0x1fE24F25b1Cf609B9c4e7E12D802e3640dFA5e43",
			decimals: 18,
			name: "ChainGuardians Governance Token",
			symbol: "CGG",
		},
		{
			address: "0x21BfBDa47A0B4B5b1248c767Ee49F7caA9B23697",
			decimals: 18,
			name: "OVR",
			symbol: "OVR",
		},
		{
			address: "0x221657776846890989a759BA2973e427DfF5C9bB",
			decimals: 18,
			name: "Reputation",
			symbol: "REPv2",
		},
		{
			address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
			decimals: 8,
			name: "Wrapped BTC",
			symbol: "WBTC",
		},
		{
			address: "0x226f7b842E0F0120b7E194D05432b3fd14773a9D",
			decimals: 18,
			name: "UNION Protocol Governance Token",
			symbol: "UNN",
		},
		{
			address: "0x23B608675a2B2fB1890d3ABBd85c5775c51691d5",
			decimals: 18,
			name: "Unisocks Edition 0",
			symbol: "SOCKS",
		},
		{
			address: "0x25e1474170c4c0aA64fa98123bdc8dB49D7802fa",
			decimals: 18,
			name: "Bidao",
			symbol: "BID",
		},
		{
			address: "0x26c8AFBBFE1EBaca03C2bB082E69D0476Bffe099",
			decimals: 18,
			name: "Cellframe Token",
			symbol: "CELL",
		},
		{
			address: "0x26CE25148832C04f3d7F26F32478a9fe55197166",
			decimals: 18,
			name: "DEXTools",
			symbol: "DEXT",
		},
		{
			address: "0x26E43759551333e57F073bb0772F50329A957b30",
			decimals: 18,
			name: "DegenVC",
			symbol: "DGVC",
		},
		{
			address: "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39",
			decimals: 8,
			name: "HEX",
			symbol: "HEX",
		},
		{
			address: "0x2ba592F78dB6436527729929AAf6c908497cB200",
			decimals: 18,
			name: "Cream",
			symbol: "CREAM",
		},
		{
			address: "0x2e1E15C44Ffe4Df6a0cb7371CD00d5028e571d14",
			decimals: 18,
			name: "Mettalex",
			symbol: "MTLX",
		},
		{
			address: "0x2e2f3246b6c65CCc4239c9Ee556EC143a7E5DE2c",
			decimals: 18,
			name: "yfi.mobi",
			symbol: "YFIM",
		},
		{
			address: "0x2eDf094dB69d6Dcd487f1B3dB9febE2eeC0dd4c5",
			decimals: 18,
			name: "ZeroSwapToken",
			symbol: "ZEE",
		},
		{
			address: "0x30f271C9E86D2B7d00a6376Cd96A1cFBD5F0b9b3",
			decimals: 18,
			name: "Decentr",
			symbol: "DEC",
		},
		{
			address: "0x3155BA85D5F96b2d030a4966AF206230e46849cb",
			decimals: 18,
			name: "THORChain ETH.RUNE",
			symbol: "RUNE",
		},
		{
			address: "0x3383c5a8969Dc413bfdDc9656Eb80A1408E4bA20",
			decimals: 18,
			name: "Wrapped ANATHA",
			symbol: "wANATHA",
		},
		{
			address: "0x33D0568941C0C64ff7e0FB4fbA0B11BD37deEd9f",
			decimals: 18,
			name: "RAMP DEFI",
			symbol: "RAMP",
		},
		{
			address: "0x3593D125a4f7849a1B059E64F4517A86Dd60c95d",
			decimals: 18,
			name: "MANTRA DAO",
			symbol: "OM",
		},
		{
			address: "0x362bc847A3a9637d3af6624EeC853618a43ed7D2",
			decimals: 18,
			name: "Parsiq Token",
			symbol: "PRQ",
		},
		{
			address: "0x37236CD05b34Cc79d3715AF2383E96dd7443dCF1",
			decimals: 0,
			name: "Small Love Potion",
			symbol: "SLP",
		},
		{
			address: "0x3845badAde8e6dFF049820680d1F14bD3903a5d0",
			decimals: 18,
			name: "SAND",
			symbol: "SAND",
		},
		{
			address: "0x38e4adB44ef08F22F5B5b76A8f0c2d0dCbE7DcA1",
			decimals: 18,
			name: "Concentrated Voting Power",
			symbol: "CVP",
		},
		{
			address: "0x3aFfCCa64c2A6f4e3B6Bd9c64CD2C969EFd1ECBe",
			decimals: 18,
			name: "DSLA",
			symbol: "DSLA",
		},
		{
			address: "0x3D3D35bb9bEC23b06Ca00fe472b50E7A4c692C30",
			decimals: 18,
			name: "Vidya",
			symbol: "VIDYA",
		},
		{
			address: "0x3DB6Ba6ab6F95efed1a6E794caD492fAAabF294D",
			decimals: 8,
			name: "LTO Network Token",
			symbol: "LTO",
		},
		{
			address: "0x408e41876cCCDC0F92210600ef50372656052a38",
			decimals: 18,
			name: "Republic Token",
			symbol: "REN",
		},
		{
			address: "0x40FD72257597aA14C7231A7B1aaa29Fce868F677",
			decimals: 18,
			name: "Sora",
			symbol: "XOR",
		},
		{
			address: "0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b",
			decimals: 8,
			name: "FunFair",
			symbol: "FUN",
		},
		{
			address: "0x429881672B9AE42b8EbA0E26cD9C73711b891Ca5",
			decimals: 18,
			name: "PickleToken",
			symbol: "PICKLE",
		},
		{
			address: "0x431ad2ff6a9C365805eBaD47Ee021148d6f7DBe0",
			decimals: 18,
			name: "",
			symbol: "DF",
		},
		{
			address: "0x4575f41308EC1483f3d399aa9a2826d74Da13Deb",
			decimals: 18,
			name: "Orchid",
			symbol: "OXT",
		},
		{
			address: "0x45804880De22913dAFE09f4980848ECE6EcbAf78",
			decimals: 18,
			name: "Paxos Gold",
			symbol: "PAXG",
		},
		{
			address: "0x4691937a7508860F876c9c0a2a617E7d9E945D4B",
			decimals: 18,
			name: "Wootrade Network",
			symbol: "WOO",
		},
		{
			address: "0x4a220E6096B25EADb88358cb44068A3248254675",
			decimals: 18,
			name: "Quant",
			symbol: "QNT",
		},
		{
			address: "0x4B1E80cAC91e2216EEb63e29B957eB91Ae9C2Be8",
			decimals: 18,
			name: "Jupiter",
			symbol: "JUP",
		},
		{
			address: "0x4c11249814f11b9346808179Cf06e71ac328c1b5",
			decimals: 18,
			name: "Oraichain Token",
			symbol: "ORAI",
		},
		{
			address: "0x4C19596f5aAfF459fA38B0f7eD92F11AE6543784",
			decimals: 8,
			name: "TrustToken",
			symbol: "TRU",
		},
		{
			address: "0x4de2573e27E648607B50e1Cfff921A33E4A34405",
			decimals: 18,
			name: "Lendroid Support Token",
			symbol: "LST",
		},
		{
			address: "0x4e352cF164E64ADCBad318C3a1e222E9EBa4Ce42",
			decimals: 18,
			name: "MCDEX Token",
			symbol: "MCB",
		},
		{
			address: "0x4fE83213D56308330EC302a8BD641f1d0113A4Cc",
			decimals: 18,
			name: "NuCypher",
			symbol: "NU",
		},
		{
			address: "0x50DE6856358Cc35f3A9a57eAAA34BD4cB707d2cd",
			decimals: 18,
			name: "RAZOR",
			symbol: "RAZOR",
		},
		{
			address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
			decimals: 18,
			name: "ChainLink",
			symbol: "Link",
		},
		{
			address: "0x5218E472cFCFE0b64A064F055B43b4cdC9EfD3A6",
			decimals: 18,
			name: "UnFederalReserveToken",
			symbol: "eRSDL",
		},
		{
			address: "0x5228a22e72ccC52d415EcFd199F99D0665E7733b",
			decimals: 18,
			name: "pTokens BTC",
			symbol: "pBTC",
		},
		{
			address: "0x54C9EA2E9C9E8eD865Db4A4ce6711C2a0d5063Ba",
			decimals: 18,
			name: "BarterTrade",
			symbol: "BART",
		},
		{
			address: "0x557B933a7C2c45672B610F8954A3deB39a51A8Ca",
			decimals: 18,
			name: "REVV",
			symbol: "REVV",
		},
		{
			address: "0x57Ab1ec28D129707052df4dF418D58a2D46d5f51",
			decimals: 18,
			name: "Synth sUSD",
			symbol: "sUSD",
		},
		{
			address: "0x584bC13c7D411c00c01A62e8019472dE68768430",
			decimals: 18,
			name: "Hegic",
			symbol: "HEGIC",
		},
		{
			address: "0x5a666c7d92E5fA7Edcb6390E4efD6d0CDd69cF37",
			decimals: 18,
			name: "UnmarshalToken",
			symbol: "MARSH",
		},
		{
			address: "0x5BEfBB272290dD5b8521D4a938f6c4757742c430",
			decimals: 18,
			name: "Xfinance",
			symbol: "XFI",
		},
		{
			address: "0x5cAf454Ba92e6F2c929DF14667Ee360eD9fD5b26",
			decimals: 18,
			name: "Dev",
			symbol: "DEV",
		},
		{
			address: "0x5Dc02Ea99285E17656b8350722694c35154DB1E8",
			decimals: 8,
			name: "BOND",
			symbol: "BOND",
		},
		{
			address: "0x5F64Ab1544D28732F0A24F4713c2C8ec0dA089f0",
			decimals: 18,
			name: "DEXTF Token",
			symbol: "DEXTF",
		},
		{
			address: "0x5f98805A4E8be255a32880FDeC7F6728C6568bA0",
			decimals: 18,
			name: "LUSD Stablecoin",
			symbol: "LUSD",
		},
		{
			address: "0x607F4C5BB672230e8672085532f7e901544a7375",
			decimals: 9,
			name: "iExec RLC",
			symbol: "RLC",
		},
		{
			address: "0x6149C26Cd2f7b5CCdb32029aF817123F6E37Df5B",
			decimals: 18,
			name: "Launchpool token",
			symbol: "LPOOL",
		},
		{
			address: "0x62359Ed7505Efc61FF1D56fEF82158CcaffA23D7",
			decimals: 18,
			name: "cVault.finance",
			symbol: "CORE",
		},
		{
			address: "0x626E8036dEB333b408Be468F951bdB42433cBF18",
			decimals: 18,
			name: "AIOZ Network",
			symbol: "AIOZ",
		},
		{
			address: "0x63b4f3e3fa4e438698CE330e365E831F7cCD1eF4",
			decimals: 18,
			name: "CyberFi Token",
			symbol: "CFi",
		},
		{
			address: "0x66a0f676479Cee1d7373f3DC2e2952778BfF5bd6",
			decimals: 18,
			name: "Wise Token",
			symbol: "WISE",
		},
		{
			address: "0x67B6D479c7bB412C54e03dCA8E1Bc6740ce6b99C",
			decimals: 18,
			name: "Kylin Network",
			symbol: "KYL",
		},
		{
			address: "0x67c597624B17b16fb77959217360B7cD18284253",
			decimals: 9,
			name: "Benchmark",
			symbol: "MARK",
		},
		{
			address: "0x6810e776880C02933D47DB1b9fc05908e5386b96",
			decimals: 18,
			name: "Gnosis Token",
			symbol: "GNO",
		},
		{
			address: "0x69692D3345010a207b759a7D1af6fc7F38b35c5E",
			decimals: 18,
			name: "chads.vc",
			symbol: "CHADS",
		},
		{
			address: "0x69A95185ee2a045CDC4bCd1b1Df10710395e4e23",
			decimals: 18,
			name: "$Poolz Finance",
			symbol: "POOLZ",
		},
		{
			address: "0x69af81e73A73B40adF4f3d4223Cd9b1ECE623074",
			decimals: 18,
			name: "Mask Network",
			symbol: "MASK",
		},
		{
			address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
			decimals: 18,
			name: "Dai Stablecoin",
			symbol: "DAI",
		},
		{
			address: "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",
			decimals: 18,
			name: "SushiSwap",
			symbol: "SUSHI",
		},
		{
			address: "0x6BFf2fE249601ed0Db3a87424a2E923118BB0312",
			decimals: 18,
			name: "Fyooz",
			symbol: "FYZ",
		},
		{
			address: "0x6c6EE5e31d828De241282B9606C8e98Ea48526E2",
			decimals: 18,
			name: "HoloToken",
			symbol: "HOT",
		},
		{
			address: "0x6e0daDE58D2d89eBBe7aFc384e3E4f15b70b14D8",
			decimals: 18,
			name: "QuiverX",
			symbol: "QRX",
		},
		{
			address: "0x6F87D756DAf0503d08Eb8993686c7Fc01Dc44fB1",
			decimals: 18,
			name: "UniTrade",
			symbol: "TRADE",
		},
		{
			address: "0x6fC13EACE26590B80cCCAB1ba5d51890577D83B2",
			decimals: 18,
			name: "Umbrella",
			symbol: "UMB",
		},
		{
			address: "0x70401dFD142A16dC7031c56E862Fc88Cb9537Ce0",
			decimals: 18,
			name: "Bird.Money",
			symbol: "BIRD",
		},
		{
			address: "0x71F85B2E46976bD21302B64329868fd15eb0D127",
			decimals: 18,
			name: "Axion",
			symbol: "AXN",
		},
		{
			address: "0x725C263e32c72dDC3A19bEa12C5a0479a81eE688",
			decimals: 18,
			name: "Bridge Mutual",
			symbol: "BMI",
		},
		{
			address: "0x72630B1e3B42874bf335020Ba0249e3E9e47Bafc",
			decimals: 18,
			name: "Paypolitan Token",
			symbol: "EPAN",
		},
		{
			address: "0x72e364F2ABdC788b7E918bc238B21f109Cd634D7",
			decimals: 18,
			name: "Metaverse Index",
			symbol: "MVI",
		},
		{
			address: "0x72e9D9038cE484EE986FEa183f8d8Df93f9aDA13",
			decimals: 18,
			name: "SMARTCREDIT Token",
			symbol: "SMARTCREDIT",
		},
		{
			address: "0x740623d2c797b7D8D1EcB98e9b4Afcf99Ec31E14",
			decimals: 18,
			name: "DoYourTip",
			symbol: "DYT",
		},
		{
			address: "0x7671904eed7f10808B664fc30BB8693FD7237abF",
			decimals: 18,
			name: "BitberryToken",
			symbol: "BBR",
		},
		{
			address: "0x77777FeDdddFfC19Ff86DB637967013e6C6A116C",
			decimals: 18,
			name: "TornadoCash",
			symbol: "TORN",
		},
		{
			address: "0x7a2Bc711E19ba6aff6cE8246C546E8c4B4944DFD",
			decimals: 8,
			name: "WAX Economic Token",
			symbol: "WAXE",
		},
		{
			address: "0x7b123f53421b1bF8533339BFBdc7C98aA94163db",
			decimals: 18,
			name: "dfohub",
			symbol: "buidl",
		},
		{
			address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
			decimals: 18,
			name: "Matic Token",
			symbol: "MATIC",
		},
		{
			address: "0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7",
			decimals: 9,
			name: "Robonomics",
			symbol: "XRT",
		},
		{
			address: "0x7F3EDcdD180Dbe4819Bd98FeE8929b5cEdB3AdEB",
			decimals: 18,
			name: "xToken",
			symbol: "XTK",
		},
		{
			address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
			decimals: 18,
			name: "Aave Token",
			symbol: "AAVE",
		},
		{
			address: "0x7FF4169a6B5122b664c51c95727d87750eC07c84",
			decimals: 18,
			name: "10Set Token",
			symbol: "10SET",
		},
		{
			address: "0x80fB784B7eD66730e8b1DBd9820aFD29931aab03",
			decimals: 18,
			name: "Lend",
			symbol: "LEND",
		},
		{
			address: "0x8207c1FfC5B6804F6024322CcF34F29c3541Ae26",
			decimals: 18,
			name: "OriginToken",
			symbol: "OGN",
		},
		{
			address: "0x83e6f1E41cdd28eAcEB20Cb649155049Fac3D5Aa",
			decimals: 18,
			name: "PolkastarterToken",
			symbol: "POLS",
		},
		{
			address: "0x8400D94A5cb0fa0D041a3788e395285d61c9ee5e",
			decimals: 8,
			name: "Unibright",
			symbol: "UBT",
		},
		{
			address: "0x84cA8bc7997272c7CfB4D0Cd3D55cd942B3c9419",
			decimals: 18,
			name: "DIA",
			symbol: "DIA",
		},
		{
			address: "0x853d955aCEf822Db058eb8505911ED77F175b99e",
			decimals: 18,
			name: "Frax",
			symbol: "FRAX",
		},
		{
			address: "0x85Eee30c52B0b379b046Fb0F85F4f3Dc3009aFEC",
			decimals: 18,
			name: "KEEP Token",
			symbol: "KEEP",
		},
		{
			address: "0x8762db106B2c2A0bccB3A80d1Ed41273552616E8",
			decimals: 18,
			name: "Reserve Rights",
			symbol: "RSR",
		},
		{
			address: "0x8888801aF4d980682e47f1A9036e589479e835C5",
			decimals: 18,
			name: "88mph.app",
			symbol: "MPH",
		},
		{
			address: "0x88EF27e69108B2633F8E1C184CC37940A075cC02",
			decimals: 18,
			name: "dego.finance",
			symbol: "DEGO",
		},
		{
			address: "0x89Ab32156e46F46D02ade3FEcbe5Fc4243B9AAeD",
			decimals: 18,
			name: "pNetwork Token",
			symbol: "PNT",
		},
		{
			address: "0x8a40c222996f9F3431f63Bf80244C36822060f12",
			decimals: 18,
			name: "Finxflo",
			symbol: "FXF",
		},
		{
			address: "0x8a854288a5976036A725879164Ca3e91d30c6A1B",
			decimals: 18,
			name: "GET",
			symbol: "GET",
		},
		{
			address: "0x8B39B70E39Aa811b69365398e0aACe9bee238AEb",
			decimals: 18,
			name: "PolkaFoundry",
			symbol: "PKF",
		},
		{
			address: "0x8c15Ef5b4B21951d50E53E4fbdA8298FFAD25057",
			decimals: 18,
			name: "Function X",
			symbol: "FX",
		},
		{
			address: "0x8c8687fC965593DFb2F0b4EAeFD55E9D8df348df",
			decimals: 18,
			name: "PAID Network",
			symbol: "PAID",
		},
		{
			address: "0x8CE9137d39326AD0cD6491fb5CC0CbA0e089b6A9",
			decimals: 18,
			name: "Swipe",
			symbol: "SXP",
		},
		{
			address: "0x8dAEBADE922dF735c38C80C7eBD708Af50815fAa",
			decimals: 18,
			name: "tBTC",
			symbol: "TBTC",
		},
		{
			address: "0x8eB24319393716668D768dCEC29356ae9CfFe285",
			decimals: 8,
			name: "SingularityNET Token",
			symbol: "AGI",
		},
		{
			address: "0x8f8221aFbB33998d8584A2B05749bA73c37a938a",
			decimals: 18,
			name: "Request Token",
			symbol: "REQ",
		},
		{
			address: "0x9355372396e3F6daF13359B7b607a3374cc638e0",
			decimals: 4,
			name: "WHALE",
			symbol: "WHALE",
		},
		{
			address: "0x93ED3FBe21207Ec2E8f2d3c3de6e058Cb73Bc04d",
			decimals: 18,
			name: "Pinakion",
			symbol: "PNK",
		},
		{
			address: "0x9469D013805bFfB7D3DEBe5E7839237e535ec483",
			decimals: 18,
			name: "Evolution Land Global Token",
			symbol: "RING",
		},
		{
			address: "0x954b890704693af242613edEf1B603825afcD708",
			decimals: 18,
			name: "Cardstack",
			symbol: "CARD",
		},
		{
			address: "0x956F47F50A910163D8BF957Cf5846D573E7f87CA",
			decimals: 18,
			name: "Fei USD",
			symbol: "FEI",
		},
		{
			address: "0x95a4492F028aa1fd432Ea71146b433E7B4446611",
			decimals: 18,
			name: "APY Governance Token",
			symbol: "APY",
		},
		{
			address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
			decimals: 18,
			name: "SHIBA INU",
			symbol: "SHIB",
		},
		{
			address: "0x961C8c0B1aaD0c0b10a51FeF6a867E3091BCef17",
			decimals: 18,
			name: "DeFiYieldProtocol",
			symbol: "DYP",
		},
		{
			address: "0x967da4048cD07aB37855c090aAF366e4ce1b9F48",
			decimals: 18,
			name: "Ocean Protocol",
			symbol: "OCEAN",
		},
		{
			address: "0x990f341946A3fdB507aE7e52d17851B87168017c",
			decimals: 18,
			name: "Strong",
			symbol: "STRONG",
		},
		{
			address: "0x9B02dD390a603Add5c07f9fd9175b7DABE8D63B7",
			decimals: 18,
			name: "Shopping.io",
			symbol: "SPI",
		},
		{
			address: "0x9BE89D2a4cd102D8Fecc6BF9dA793be995C22541",
			decimals: 8,
			name: "Binance Wrapped BTC",
			symbol: "BBTC",
		},
		{
			address: "0x9cEB84f92A0561fa3Cc4132aB9c0b76A59787544",
			decimals: 18,
			name: "DokiDokiFinance",
			symbol: "DOKI",
		},
		{
			address: "0x9EA3b5b4EC044b70375236A281986106457b20EF",
			decimals: 18,
			name: "Delta Financial",
			symbol: "DELTA",
		},
		{
			address: "0x9Ed8e7C9604790F7Ec589F99b94361d8AAB64E5E",
			decimals: 18,
			name: "Unistake",
			symbol: "UNISTAKE",
		},
		{
			address: "0x9f7229aF0c4b9740e207Ea283b9094983f78ba04",
			decimals: 18,
			name: "Tadpole",
			symbol: "TAD",
		},
		{
			address: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
			decimals: 18,
			name: "MakerDAO",
			symbol: "MKR",
		},
		{
			address: "0x9F9c8ec3534c3cE16F928381372BfbFBFb9F4D24",
			decimals: 18,
			name: "GraphLinq",
			symbol: "GLQ",
		},
		{
			address: "0xa0246c9032bC3A600820415aE600c6388619A14D",
			decimals: 18,
			name: "FARM Reward Token",
			symbol: "FARM",
		},
		{
			address: "0xa0afAA285Ce85974c3C881256cB7F225e3A1178a",
			decimals: 18,
			name: "Wrapped CRES",
			symbol: "wCRES",
		},
		{
			address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
			decimals: 6,
			name: "USDC",
			symbol: "USDC",
		},
		{
			address: "0xa117000000f279D81A1D3cc75430fAA017FA5A2e",
			decimals: 18,
			name: "Aragon Network Token",
			symbol: "ANT",
		},
		{
			address: "0xA15C7Ebe1f07CaF6bFF097D8a589fb8AC49Ae5B3",
			decimals: 18,
			name: "Pundi X Token",
			symbol: "NPXS",
		},
		{
			address: "0xa1d6Df714F91DeBF4e0802A542E13067f31b8262",
			decimals: 18,
			name: "RFOX",
			symbol: "RFOX",
		},
		{
			address: "0xa393473d64d2F9F026B60b6Df7859A689715d092",
			decimals: 8,
			name: "Lattice Token",
			symbol: "LTX",
		},
		{
			address: "0xa3BeD4E1c75D00fa6f4E5E6922DB7261B5E9AcD2",
			decimals: 18,
			name: "Meta",
			symbol: "MTA",
		},
		{
			address: "0xA4EED63db85311E22dF4473f87CcfC3DaDCFA3E3",
			decimals: 18,
			name: "Rubic",
			symbol: "RBC",
		},
		{
			address: "0xA8b919680258d369114910511cc87595aec0be6D",
			decimals: 18,
			name: "LUKSO Token",
			symbol: "LYXe",
		},
		{
			address: "0xa8c8CfB141A3bB59FEA1E2ea6B79b5ECBCD7b6ca",
			decimals: 18,
			name: "NOIA Token",
			symbol: "NOIA",
		},
		{
			address: "0xA91ac63D040dEB1b7A5E4d4134aD23eb0ba07e14",
			decimals: 18,
			name: "Bella",
			symbol: "BEL",
		},
		{
			address: "0xAa6E8127831c9DE45ae56bB1b0d4D4Da6e5665BD",
			decimals: 18,
			name: "ETH 2x Flexible Leverage Index",
			symbol: "ETH2x-FLI",
		},
		{
			address: "0xaA7a9CA87d3694B5755f213B5D04094b8d0F0A6F",
			decimals: 18,
			name: "Trace Token",
			symbol: "TRAC",
		},
		{
			address: "0xaaAEBE6Fe48E54f431b0C390CfaF0b017d09D42d",
			decimals: 4,
			name: "Celsius",
			symbol: "CEL",
		},
		{
			address: "0xaAAf91D9b90dF800Df4F55c205fd6989c977E73a",
			decimals: 8,
			name: "Monolith TKN",
			symbol: "TKN",
		},
		{
			address: "0xaC0104Cca91D167873B8601d2e71EB3D4D8c33e0",
			decimals: 18,
			name: "Crowns",
			symbol: "CWS",
		},
		{
			address: "0xAd4f86a25bbc20FfB751f2FAC312A0B4d8F88c64",
			decimals: 18,
			name: "OptionRoom Token",
			symbol: "ROOM",
		},
		{
			address: "0xADE00C28244d5CE17D72E40330B1c318cD12B7c3",
			decimals: 18,
			name: "AdEx Network",
			symbol: "ADX",
		},
		{
			address: "0xAE1eaAE3F627AAca434127644371b67B18444051",
			decimals: 8,
			name: "YOP",
			symbol: "YOP",
		},
		{
			address: "0xaE697F994Fc5eBC000F8e22EbFfeE04612f98A0d",
			decimals: 18,
			name: "LGCY Network",
			symbol: "LGCY",
		},
		{
			address: "0xAec7e1f531Bb09115103C53ba76829910Ec48966",
			decimals: 18,
			name: "Blank Token",
			symbol: "BLANK",
		},
		{
			address: "0xaf9f549774ecEDbD0966C52f250aCc548D3F36E5",
			decimals: 18,
			name: "Rio Fuel Token",
			symbol: "RFuel",
		},
		{
			address: "0xB1e9157c2Fdcc5a856C8DA8b2d89b6C32b3c1229",
			decimals: 18,
			name: "Zenfuse Trading Platform Token",
			symbol: "ZEFU",
		},
		{
			address: "0xB26631c6dda06aD89B93C71400D25692de89c068",
			decimals: 18,
			name: "Minds",
			symbol: "MINDS",
		},
		{
			address: "0xB4d930279552397bbA2ee473229f89Ec245bc365",
			decimals: 18,
			name: "MahaDAO",
			symbol: "MAHA",
		},
		{
			address: "0xB4EFd85c19999D84251304bDA99E90B92300Bd93",
			decimals: 18,
			name: "Rocket Pool",
			symbol: "RPL",
		},
		{
			address: "0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206",
			decimals: 18,
			name: "Nexo",
			symbol: "NEXO",
		},
		{
			address: "0xB6ff96B8A8d214544Ca0dBc9B33f7AD6503eFD32",
			decimals: 18,
			name: "SYNC",
			symbol: "SYNC",
		},
		{
			address: "0xb753428af26E81097e7fD17f40c88aaA3E04902c",
			decimals: 18,
			name: "Spice",
			symbol: "SFI",
		},
		{
			address: "0xB987D48Ed8f2C468D52D6405624EADBa5e76d723",
			decimals: 18,
			name: "Stabilize Token",
			symbol: "STBZ",
		},
		{
			address: "0xB9d99C33eA2d86EC5eC6b8A4dD816EBBA64404AF",
			decimals: 18,
			name: "k21.kanon.art",
			symbol: "K21",
		},
		{
			address: "0xb9EF770B6A5e12E45983C5D80545258aA38F3B78",
			decimals: 10,
			name: "0chain",
			symbol: "ZCN",
		},
		{
			address: "0xba100000625a3754423978a60c9317c58a424e3D",
			decimals: 18,
			name: "Balancer",
			symbol: "BAL",
		},
		{
			address: "0xBA11D00c5f74255f56a5E366F4F77f5A186d7f55",
			decimals: 18,
			name: "BandToken",
			symbol: "BAND",
		},
		{
			address: "0xBa21Ef4c9f433Ede00badEFcC2754B8E74bd538A",
			decimals: 18,
			name: "Swapfolio",
			symbol: "SWFL",
		},
		{
			address: "0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD",
			decimals: 18,
			name: "LoopringCoin V2",
			symbol: "LRC",
		},
		{
			address: "0xBBc2AE13b23d715c30720F079fcd9B4a74093505",
			decimals: 18,
			name: "@EthernityChain $ERN Token",
			symbol: "ERN",
		},
		{
			address: "0xbC396689893D065F41bc2C6EcbeE5e0085233447",
			decimals: 18,
			name: "Perpetual",
			symbol: "PERP",
		},
		{
			address: "0xbE9375C6a420D2eEB258962efB95551A5b722803",
			decimals: 18,
			name: "StormX",
			symbol: "STMX",
		},
		{
			address: "0xbEa98c05eEAe2f3bC8c3565Db7551Eb738c8CCAb",
			decimals: 18,
			name: "Geyser",
			symbol: "GYSR",
		},
		{
			address: "0xBF494F02EE3FdE1F20BEE6242bCe2d1ED0c15e47",
			decimals: 18,
			name: "World Token",
			symbol: "WORLD",
		},
		{
			address: "0xc00e94Cb662C3520282E6f5717214004A7f26888",
			decimals: 18,
			name: "Compound",
			symbol: "COMP",
		},
		{
			address: "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
			decimals: 18,
			name: "Synthetix Network Token",
			symbol: "SNX",
		},
		{
			address: "0xC0bA369c8Db6eB3924965e5c4FD0b4C1B91e305F",
			decimals: 18,
			name: "DLP Duck Token",
			symbol: "DUCK",
		},
		{
			address: "0xc3771d47E2Ab5A519E2917E61e23078d0C05Ed7f",
			decimals: 18,
			name: "Gather",
			symbol: "GTH",
		},
		{
			address: "0xC4C2614E694cF534D407Ee49F8E44D125E4681c4",
			decimals: 18,
			name: "Chain Games",
			symbol: "CHAIN",
		},
		{
			address: "0xC57d533c50bC22247d49a368880fb49a1caA39F7",
			decimals: 18,
			name: "PowerTrade Fuel Token",
			symbol: "PTF",
		},
		{
			address: "0xc719d010B63E5bbF2C0551872CD5316ED26AcD83",
			decimals: 18,
			name: "Decentralized Insurance Protocol",
			symbol: "DIP",
		},
		{
			address: "0xc7283b66Eb1EB5FB86327f08e1B5816b0720212B",
			decimals: 18,
			name: "Tribe",
			symbol: "TRIBE",
		},
		{
			address: "0xc834Fa996fA3BeC7aAD3693af486ae53D8aA8B50",
			decimals: 18,
			name: "Convergence",
			symbol: "CONV",
		},
		{
			address: "0xc944E90C64B2c07662A292be6244BDf05Cda44a7",
			decimals: 18,
			name: "Graph Token",
			symbol: "GRT",
		},
		{
			address: "0xCb5f72d37685C3D5aD0bB5F982443BC8FcdF570E",
			decimals: 18,
			name: "RootKit",
			symbol: "ROOT",
		},
		{
			address: "0xCbfef8fdd706cde6F208460f2Bf39Aa9c785F05D",
			decimals: 18,
			name: "Kine Governance Token",
			symbol: "KINE",
		},
		{
			address: "0xCC4304A31d09258b0029eA7FE63d032f52e44EFe",
			decimals: 18,
			name: "TrustSwap Token",
			symbol: "SWAP",
		},
		{
			address: "0xCF3C8Be2e2C42331Da80EF210e9B1b307C03d36A",
			decimals: 18,
			name: "BetProtocolToken",
			symbol: "BEPRO",
		},
		{
			address: "0xd084B83C305daFD76AE3E1b4E1F1fe2eCcCb3988",
			decimals: 18,
			name: "Terra Virtua Kolect",
			symbol: "TVK",
		},
		{
			address: "0xD23Ac27148aF6A2f339BD82D0e3CFF380b5093de",
			decimals: 18,
			name: "SIREN",
			symbol: "SI",
		},
		{
			address: "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07",
			decimals: 18,
			name: "OMG Network",
			symbol: "OMG",
		},
		{
			address: "0xd2877702675e6cEb975b4A1dFf9fb7BAF4C91ea9",
			decimals: 18,
			name: "Wrapped LUNA Token",
			symbol: "LUNA",
		},
		{
			address: "0xD2dDa223b2617cB616c1580db421e4cFAe6a8a85",
			decimals: 18,
			name: "Bondly Token",
			symbol: "BONDLY",
		},
		{
			address: "0xd379700999F4805Ce80aa32DB46A94dF64561108",
			decimals: 18,
			name: "Dextrust",
			symbol: "DETS",
		},
		{
			address: "0xD46bA6D942050d489DBd938a2C909A5d5039A161",
			decimals: 9,
			name: "Ampleforth",
			symbol: "AMPL",
		},
		{
			address: "0xD478161C952357F05f0292B56012Cd8457F1cfbF",
			decimals: 18,
			name: "Polkamarkets",
			symbol: "POLK",
		},
		{
			address: "0xD533a949740bb3306d119CC777fa900bA034cd52",
			decimals: 18,
			name: "Curve DAO Token",
			symbol: "CRV",
		},
		{
			address: "0xD5525D397898e5502075Ea5E830d8914f6F0affe",
			decimals: 8,
			name: "MEME",
			symbol: "MEME",
		},
		{
			address: "0xD6c67B93a7b248dF608a653d82a100556144c5DA",
			decimals: 16,
			name: "ExNetwork Community Token",
			symbol: "EXNT",
		},
		{
			address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
			decimals: 6,
			name: "Tether USD",
			symbol: "USDT",
		},
		{
			address: "0xdacD69347dE42baBfAEcD09dC88958378780FB62",
			decimals: 0,
			name: "AtariToken",
			symbol: "ATRI",
		},
		{
			address: "0xDcB01cc464238396E213a6fDd933E36796eAfF9f",
			decimals: 18,
			name: "Yield",
			symbol: "YLD",
		},
		{
			address: "0xdd974D5C2e2928deA5F71b9825b8b646686BD200",
			decimals: 18,
			name: "Kyber Network Crystal",
			symbol: "KNC",
		},
		{
			address: "0xDDB3422497E61e13543BeA06989C0789117555c5",
			decimals: 18,
			name: "COTI Token",
			symbol: "COTI",
		},
		{
			address: "0xE1c7E30C42C24582888C758984f6e382096786bd",
			decimals: 8,
			name: "Curate",
			symbol: "XCUR",
		},
		{
			address: "0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30",
			decimals: 18,
			name: "Injective Token",
			symbol: "INJ",
		},
		{
			address: "0xe3818504c1B32bF1557b16C238B2E01Fd3149C17",
			decimals: 18,
			name: "PILLAR",
			symbol: "PLR",
		},
		{
			address: "0xE41d2489571d322189246DaFA5ebDe1F4699F498",
			decimals: 18,
			name: "0x Protocol Token",
			symbol: "ZRX",
		},
		{
			address: "0xe53EC727dbDEB9E2d5456c3be40cFF031AB40A55",
			decimals: 18,
			name: "SuperFarm",
			symbol: "SUPER",
		},
		{
			address: "0xE5CAeF4Af8780E59Df925470b050Fb23C43CA68C",
			decimals: 6,
			name: "Ferrum Network Token",
			symbol: "FRM",
		},
		{
			address: "0xE61fDAF474Fac07063f2234Fb9e60C1163Cfa850",
			decimals: 18,
			name: "Coin Utility Token",
			symbol: "COIN",
		},
		{
			address: "0xE95A203B1a91a908F9B9CE46459d101078c2c3cb",
			decimals: 18,
			name: "aEthereum",
			symbol: "aEth",
		},
		{
			address: "0xEA1ea0972fa092dd463f2968F9bB51Cc4c981D71",
			decimals: 18,
			name: "Modefi",
			symbol: "MOD",
		},
		{
			address: "0xEa319e87Cf06203DAe107Dd8E5672175e3Ee976c",
			decimals: 18,
			name: "SURF.Finance",
			symbol: "SURF",
		},
		{
			address: "0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D",
			decimals: 8,
			name: "renBTC",
			symbol: "renBTC",
		},
		{
			address: "0xEBd9D99A3982d547C5Bb4DB7E3b1F9F14b67Eb83",
			decimals: 18,
			name: "Everest ID",
			symbol: "ID",
		},
		{
			address: "0xEd91879919B71bB6905f23af0A68d231EcF87b14",
			decimals: 18,
			name: "DMM: Governance",
			symbol: "DMG",
		},
		{
			address: "0xee573a945B01B788B9287CE062A0CFC15bE9fd86",
			decimals: 18,
			name: "Exeedme",
			symbol: "XED",
		},
		{
			address: "0xeEAA40B28A2d1b0B08f6f97bB1DD4B75316c6107",
			decimals: 18,
			name: "GOVI",
			symbol: "GOVI",
		},
		{
			address: "0xEEF9f339514298C6A857EfCfC1A762aF84438dEE",
			decimals: 18,
			name: "Hermez Network Token",
			symbol: "HEZ",
		},
		{
			address: "0xF063fE1aB7a291c5d06a86e14730b00BF24cB589",
			decimals: 18,
			name: "DxSale.Network",
			symbol: "SALE",
		},
		{
			address: "0xf1f955016EcbCd7321c7266BccFB96c68ea5E49b",
			decimals: 18,
			name: "Rally",
			symbol: "RLY",
		},
		{
			address: "0xf21661D0D1d76d3ECb8e1B9F1c923DBfffAe4097",
			decimals: 18,
			name: "Realio Network",
			symbol: "RIO",
		},
		{
			address: "0xF411903cbC70a74d22900a5DE66A2dda66507255",
			decimals: 18,
			name: "VERA",
			symbol: "VRA",
		},
		{
			address: "0xf4CD3d3Fda8d7Fd6C5a500203e38640A70Bf9577",
			decimals: 18,
			name: "YfDAI.finance",
			symbol: "Yf-DAI",
		},
		{
			address: "0xF4d861575ecC9493420A3f5a14F85B13f0b50EB3",
			decimals: 18,
			name: "Fractal Protocol Token",
			symbol: "FCL",
		},
		{
			address: "0xF5D669627376EBd411E34b98F19C868c8ABA5ADA",
			decimals: 18,
			name: "Axie Infinity",
			symbol: "AXS",
		},
		{
			address: "0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c",
			decimals: 18,
			name: "Enjin Coin",
			symbol: "ENJ",
		},
		{
			address: "0xf6537FE0df7F0Cc0985Cf00792CC98249E73EFa0",
			decimals: 8,
			name: "GIVToken",
			symbol: "GIV",
		},
		{
			address: "0xF938424F7210f31dF2Aee3011291b658f872e91e",
			decimals: 18,
			name: "VISOR",
			symbol: "VISR",
		},
		{
			address: "0xF94b5C5651c888d928439aB6514B93944eEE6F48",
			decimals: 18,
			name: "Yield",
			symbol: "YLD",
		},
		{
			address: "0xfAd45E47083e4607302aa43c65fB3106F1cd7607",
			decimals: 9,
			name: "hoge.finance",
			symbol: "HOGE",
		},
		{
			address: "0xFbEEa1C75E4c4465CB2FCCc9c6d6afe984558E20",
			decimals: 18,
			name: "DuckDaoDime",
			symbol: "DDIM",
		},
		{
			address: "0xfC98e825A2264D890F9a1e68ed50E1526abCcacD",
			decimals: 18,
			name: "Moss Carbon Credit",
			symbol: "MCO2",
		},
		{
			address: "0xFca59Cd816aB1eaD66534D82bc21E7515cE441CF",
			decimals: 18,
			name: "Rarible",
			symbol: "RARI",
		},
		{
			address: "0xFE3E6a25e6b192A42a44ecDDCd13796471735ACf",
			decimals: 18,
			name: "Reef.finance",
			symbol: "REEF",
		},
		{
			address: "0xfF20817765cB7f73d4bde2e66e067E58D11095C2",
			decimals: 18,
			name: "Amp",
			symbol: "AMP",
		},
		{
			address: "0xfffffffFf15AbF397dA76f1dcc1A1604F45126DB",
			decimals: 18,
			name: "FalconSwap Token",
			symbol: "FSW",
		},
	],
	transactions,
	type: "live",
};

export default network;

// Mexico — Countries section dataset.
// Supply verified Oct 3, 2026.
//
// The peso stablecoin market is small — roughly 50.8M MXNB plus negligible MXNT and
// WMXN — but the number understates the story. The US-Mexico remittance corridor is
// worth about $61.8B a year and runs predominantly on dollar stablecoins; MXNB is the
// peso-native challenger to that default. The page should lead with the corridor.
//
// MXNB is the first asset here that DefiLlama does not index, so it uses the ERC-20
// supply path: the same contract address is deployed on every chain it runs on.

import type {
  CountryDataset,
  CountryStablecoin,
  Exchange,
  TimelineEvent,
  HonourableMentionGroup,
} from "./types";

const MXNB_CONTRACT = "0xf197ffc28c23e0309b5559e7a166f2c6164c80aa";

// ============================================
// STABLECOIN DATA
// ============================================

export const mexicoStablecoins: CountryStablecoin[] = [
  {
    id: "mxnb",
    name: "MXNB",
    symbol: "MXNB",
    issuer: "Juno (Bitso)",
    status: "live",
    statusLabel: "Live",
    tagline: "The peso-native rail for the US-Mexico corridor",
    founded: "2025",
    headquarters: "Mexico City, Mexico",
    website: "https://www.bitso.com/mxnb",
    backing: "1:1 Mexican pesos in safeguarded accounts",
    custodian: "Licensed financial institutions in Mexico",
    blockchains: ["Arbitrum", "Avalanche", "Base", "Ethereum", "XRPL"],
    backers: ["Bitso"],
    audits: "Published reserve disclosures",
    volume: "Paired with RLUSD on XRPL's Permissioned DEX (Jun 2026)",
    exchangePartners: 1,
    reserveMetadata: {
      reserveRatio: "100% (1:1)",
      custodian: "Licensed Mexican financial institutions",
      lastAttested: "Oct 2026",
      attestationFrequency: "Published reserve disclosures",
      attestationUrl: "https://www.bitso.com/mxnb",
      chainLabel: "All chains",
      attestedSupplySource:
        "Juno is an authorized Electronic Payment Funds Institution (IFPE) under the Ley Fintech, placing redemption inside a CNBV-supervised entity",
    },
  },
  {
    id: "mxnt",
    name: "Mexican Peso Tether",
    symbol: "MXNT",
    issuer: "Tether",
    status: "live",
    statusLabel: "Live, minimal supply",
    tagline: "Tether's peso token, effectively dormant",
    founded: "2022",
    headquarters: "El Salvador",
    website: "https://tether.to",
    backing: "Cash & cash equivalents",
    custodian: "Tether",
    blockchains: ["Ethereum", "Polygon"],
    backers: ["Tether"],
    audits: "Quarterly attestation (group level)",
    exchangePartners: 0,
    reserveMetadata: {
      reserveRatio: "100% (1:1)",
      custodian: "Tether",
      lastAttested: "Q2 2026",
      attestationFrequency: "Quarterly (group level)",
      attestationUrl: "https://tether.to/en/transparency/",
      chainLabel: "All chains",
    },
  },
];

// ============================================
// HONOURABLE MENTIONS
// ============================================

export const mexicoHonourableMentions: HonourableMentionGroup[] = [
  {
    category: "What the corridor actually runs on",
    blurb:
      "The US-Mexico remittance corridor moves roughly $61.8B a year. Almost none of it settles in pesos onchain — dollar stablecoins are the default, and MXNB exists to remove the USD-to-USDC-to-MXN conversion cycle.",
    entries: [
      {
        symbol: "USDC",
        name: "USD Coin",
        issuer: "Circle",
        supply: "$74.26B",
        note: "The incumbent default for Mexican corridor flows",
      },
      {
        symbol: "RLUSD",
        name: "Ripple USD",
        issuer: "Ripple",
        supply: "$2.50B",
        note: "Paired directly against MXNB on XRPL's Permissioned DEX since June 2026",
      },
    ],
  },
  {
    category: "Minor peso tokens",
    blurb: "Tracked for completeness; supply is negligible.",
    entries: [
      {
        symbol: "WMXN",
        name: "Mexican Peso",
        issuer: "Wrapped",
        supply: "MXN 475,398",
        note: "Not included in the main list given the size",
      },
    ],
  },
];

export const exchanges: Exchange[] = [];

export const timelineEvents: TimelineEvent[] = [];

// ============================================
// LIVE SUPPLY SOURCES
// ============================================

// MXNB is not indexed by DefiLlama, so supply is read from the token contract, which
// is deployed at the same address on every EVM chain it runs on. XRPL is excluded
// because it is not EVM and needs a different reader.
export const mexicoSupplySources: CountryDataset["supplySources"] = {
  mxnb: {
    kind: "erc20",
    address: MXNB_CONTRACT,
    decimals: 6,
    chains: [
      { chain: "Arbitrum", rpcUrl: "https://arb1.arbitrum.io/rpc" },
      { chain: "Avalanche", rpcUrl: "https://api.avax.network/ext/bc/C/rpc" },
      { chain: "Base", rpcUrl: "https://mainnet.base.org" },
      { chain: "Ethereum", rpcUrl: "https://ethereum.publicnode.com" },
    ],
  },
  mxnt: { kind: "defillama", id: "281" },
};

export const mexico: CountryDataset = {
  meta: {
    slug: "mexico",
    name: "Mexico",
    demonym: "Mexican",
    tagline: "A $61.8B remittance corridor, and a peso-native challenger",
    locale: "es-MX",
    currency: "MXN",
    currencySymbol: "MX$",
    regulationCode: "mx",
    accent: {
      gradient: "from-[#047857] to-[#064e3b]",
      bar: "bg-emerald-700",
    },
  },
  stablecoins: mexicoStablecoins,
  exchanges,
  timelineEvents,
  supplySources: mexicoSupplySources,
  honourableMentions: mexicoHonourableMentions,
};

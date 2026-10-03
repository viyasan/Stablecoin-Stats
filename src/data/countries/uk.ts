// United Kingdom — Countries section dataset.
// Supply figures verified against DefiLlama on Oct 3, 2026.
//
// The UK's story is the gap between regime and market. The framework is one of the
// most developed anywhere — FCA final rules published June 2026, authorisation gateway
// open since Sept 30, 2026, full regime in force Oct 25, 2027 — while the entire
// sterling stablecoin market is roughly £29.6M across five assets. For scale, that is
// roughly $39M at current rates, against $258B in USDT and USDC alone. The page should lead with that gap
// rather than present five tiny assets as a league table.

import type {
  CountryDataset,
  CountryStablecoin,
  Exchange,
  TimelineEvent,
  HonourableMentionGroup,
} from "./types";

// ============================================
// STABLECOIN DATA
// ============================================

export const ukStablecoins: CountryStablecoin[] = [
  {
    id: "tgbp",
    name: "Tokenised GBP",
    symbol: "tGBP",
    issuer: "BCP Technologies",
    status: "live",
    statusLabel: "Live",
    tagline: "The UK's first FCA-registered sterling stablecoin",
    founded: "2017 (as BitcoinPoint)",
    headquarters: "London, United Kingdom",
    website: "https://bcp.markets",
    backing: "Cash & short-term UK government bonds, segregated",
    custodian: "Segregated account at a UK-regulated financial institution",
    blockchains: ["Ethereum", "Base", "Solana", "Polygon", "BNB Chain", "Avalanche", "Arbitrum", "Gnosis"],
    backers: ["BCP Technologies"],
    audits: "Independent reserve audits",
    volume: "Listed on Coinbase (Apr 2026) and Kraken (Nov 2025)",
    exchangePartners: 2,
    reserveMetadata: {
      reserveRatio: "100% (1:1)",
      custodian: "UK-regulated financial institution (segregated)",
      lastAttested: "Oct 2026",
      attestationFrequency: "Independent reserve audit",
      attestationUrl: "https://bcp.markets",
      chainLabel: "All chains",
    },
  },
  {
    id: "gbpa",
    name: "Agant GBP",
    symbol: "GBPA",
    issuer: "Agant",
    status: "live",
    statusLabel: "Live",
    tagline: "Institutional sterling for payments and settlement",
    founded: "2024",
    headquarters: "London, United Kingdom",
    website: "https://www.agant.io",
    backing: "1:1 sterling reserves",
    custodian: "Not disclosed",
    blockchains: ["Ethereum", "Base", "Solana", "Tempo", "Arc"],
    backers: ["Agant"],
    audits: "Not disclosed",
    volume: "Institutional access via Clear Junction (Jun 2026)",
    exchangePartners: 0,
    reserveMetadata: {
      reserveRatio: "100% (1:1)",
      custodian: "Not disclosed",
      lastAttested: "Not disclosed",
      attestationFrequency: "Not disclosed",
      chainLabel: "All chains",
    },
  },
  {
    id: "gbpm",
    name: "Mento British Pound",
    symbol: "GBPm",
    issuer: "Mento",
    status: "live",
    statusLabel: "Live",
    tagline: "Crypto-collateralised sterling on Celo",
    founded: "2024",
    headquarters: "Decentralised protocol",
    website: "https://www.mento.org",
    backing: "Crypto-collateralised reserve",
    custodian: "Onchain reserve (Mento protocol)",
    blockchains: ["Celo", "Monad"],
    backers: ["Mento Labs"],
    audits: "Onchain reserve, publicly verifiable",
    exchangePartners: 0,
    reserveMetadata: {
      reserveRatio: "Over-collateralised",
      custodian: "Mento onchain reserve",
      lastAttested: "Continuous (onchain)",
      attestationFrequency: "Continuous",
      attestationUrl: "https://reserve.mento.org",
      chainLabel: "Celo + Monad",
    },
  },
  {
    id: "vgbp",
    name: "VNX British Pound",
    symbol: "VGBP",
    issuer: "VNX",
    status: "live",
    statusLabel: "Live",
    tagline: "Liechtenstein-issued sterling token",
    founded: "2022",
    headquarters: "Vaduz, Liechtenstein",
    website: "https://vnx.io",
    backing: "Cash & cash equivalents",
    custodian: "VNX",
    blockchains: ["Solana", "Base", "Celo"],
    backers: ["VNX"],
    audits: "Periodic attestation",
    exchangePartners: 0,
    reserveMetadata: {
      reserveRatio: "100% (1:1)",
      custodian: "VNX",
      lastAttested: "Not disclosed",
      attestationFrequency: "Periodic",
      chainLabel: "All chains",
    },
  },
  {
    id: "egbp",
    name: "ARYZE eGBP",
    symbol: "eGBP",
    issuer: "ARYZE",
    status: "live",
    statusLabel: "Live",
    tagline: "Digital sterling from a Danish e-money issuer",
    founded: "2018",
    headquarters: "Copenhagen, Denmark",
    website: "https://aryze.io",
    backing: "Cash held at regulated institutions",
    custodian: "ARYZE",
    blockchains: ["BNB Chain", "Polygon"],
    backers: ["ARYZE"],
    audits: "Not disclosed",
    exchangePartners: 0,
    reserveMetadata: {
      reserveRatio: "100% (1:1)",
      custodian: "ARYZE",
      lastAttested: "Not disclosed",
      attestationFrequency: "Not disclosed",
      chainLabel: "All chains",
    },
  },
];

// ============================================
// HONOURABLE MENTIONS
// ============================================

export const ukHonourableMentions: HonourableMentionGroup[] = [
  {
    category: "What the market actually uses",
    blurb:
      "Sterling stablecoins total roughly £29.6M. UK users and businesses overwhelmingly transact in dollar stablecoins instead, which is the context for every figure on this page.",
    entries: [
      {
        symbol: "USDT / USDC",
        name: "Dollar stablecoins",
        issuer: "Tether / Circle",
        supply: "$258B combined",
        note: "About 6,500x the entire sterling stablecoin market, which is worth roughly $39M at current rates",
      },
    ],
  },
  {
    category: "Retired",
    blurb: "Earlier attempts at a sterling stablecoin that did not reach scale.",
    entries: [
      {
        symbol: "GBPT",
        name: "poundtoken",
        issuer: "Blackfridge",
        note: "Launched 2022, Isle of Man; wound down",
      },
    ],
  },
];

export const exchanges: Exchange[] = [];

export const timelineEvents: TimelineEvent[] = [];

// ============================================
// LIVE SUPPLY SOURCES
// ============================================

export const ukSupplySources: CountryDataset["supplySources"] = {
  tgbp: { kind: "defillama", id: "317" },
  gbpa: { kind: "defillama", id: "399" },
  gbpm: { kind: "defillama", id: "358" },
  vgbp: { kind: "defillama", id: "292" },
  egbp: { kind: "defillama", id: "140" },
};

export const uk: CountryDataset = {
  meta: {
    slug: "uk",
    name: "United Kingdom",
    demonym: "UK",
    tagline: "An advanced regime arriving ahead of its market",
    locale: "en-GB",
    currency: "GBP",
    currencySymbol: "£",
    regulationCode: "uk",
    accent: {
      gradient: "from-[#1e3a8a] to-[#0f172a]",
      bar: "bg-indigo-800",
    },
  },
  stablecoins: ukStablecoins,
  exchanges,
  timelineEvents,
  supplySources: ukSupplySources,
  honourableMentions: ukHonourableMentions,
};

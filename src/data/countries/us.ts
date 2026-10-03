// United States — Countries section dataset.
// Supply figures verified against DefiLlama on Oct 3, 2026.
//
// The main list is deliberately limited to payment stablecoins issued by US entities,
// which is why the two largest dollar stablecoins by supply are absent from it:
// USDT is issued offshore, and USDG is issued by Paxos Digital Singapore under MAS
// despite Paxos being a US company. Both appear under honourableMentions so the page
// states that explicitly rather than quietly omitting them.

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

export const usStablecoins: CountryStablecoin[] = [
  {
    id: "usdc",
    name: "USDC",
    symbol: "USDC",
    issuer: "Circle",
    logo: "/usdc-logo.png",
    status: "live",
    statusLabel: "Live",
    tagline: "The largest US-issued dollar stablecoin",
    founded: "2018",
    headquarters: "New York, NY",
    website: "https://www.circle.com",
    backing: "Cash & short-dated US Treasuries",
    custodian: "BNY Mellon (Circle Reserve Fund, managed by BlackRock)",
    blockchains: ["Ethereum", "Solana", "Base", "Arbitrum", "Polygon", "Avalanche"],
    backers: ["Public (NYSE: CRCL)"],
    audits: "Monthly attestation (Deloitte)",
    volume: "Live on every major venue",
    exchangePartners: 0,
    reserveMetadata: {
      tokenLogo: "/usdc-logo.png",
      reserveRatio: "100% (1:1)",
      custodian: "BNY Mellon / BlackRock",
      lastAttested: "Oct 2026",
      attestationFrequency: "Monthly attestation + weekly disclosure",
      attestationUrl: "https://www.circle.com/transparency",
      chainLabel: "All chains",
    },
  },
  {
    id: "usd1",
    name: "World Liberty Financial USD",
    symbol: "USD1",
    issuer: "World Liberty Financial",
    status: "live",
    statusLabel: "Live",
    tagline: "The fastest-growing fiat-backed stablecoin of 2026",
    founded: "2025",
    headquarters: "New York, NY",
    website: "https://worldlibertyfinancial.com",
    backing: "Cash & short-duration US T-bills via government money market funds",
    custodian: "BitGo Trust Company",
    blockchains: ["Ethereum", "BNB Chain", "Solana", "Aptos"],
    backers: ["World Liberty Financial"],
    audits: "Monthly reserve reporting",
    exchangePartners: 0,
    reserveMetadata: {
      reserveRatio: "100% (1:1)",
      custodian: "BitGo Trust Company",
      lastAttested: "Oct 2026",
      attestationFrequency: "Monthly",
      chainLabel: "All chains",
      attestedSupplySource:
        "Conditional OCC bank charter carries a $20M minimum capital condition and a GENIUS compliance mandate",
    },
  },
  {
    id: "pyusd",
    name: "PayPal USD",
    symbol: "PYUSD",
    issuer: "Paxos Trust Company (for PayPal)",
    status: "live",
    statusLabel: "Live",
    tagline: "PayPal's dollar, issued by a NYDFS-regulated trust",
    founded: "2023",
    headquarters: "New York, NY",
    website: "https://www.paypal.com/pyusd",
    backing: "Cash, cash equivalents & US Treasuries",
    custodian: "Paxos Trust Company",
    blockchains: ["Ethereum", "Solana", "Arbitrum", "Polygon", "Flow", "Sei"],
    backers: ["PayPal"],
    audits: "Monthly attestation",
    exchangePartners: 0,
    reserveMetadata: {
      reserveRatio: "100% (1:1)",
      custodian: "Paxos Trust Company (NYDFS)",
      lastAttested: "Oct 2026",
      attestationFrequency: "Monthly",
      attestationUrl: "https://www.paxos.com/pyusd-transparency",
      chainLabel: "All chains",
    },
  },
  {
    id: "rlusd",
    name: "Ripple USD",
    symbol: "RLUSD",
    issuer: "Ripple",
    status: "live",
    statusLabel: "Live",
    tagline: "Ripple's settlement dollar across XRPL and Ethereum",
    founded: "2024",
    headquarters: "San Francisco, CA",
    website: "https://ripple.com/solutions/stablecoin",
    backing: "Cash & cash equivalents, short-dated US Treasuries",
    custodian: "Standard Custody & Trust Company (NYDFS)",
    blockchains: ["Ethereum", "XRPL"],
    backers: ["Ripple"],
    audits: "Monthly attestation",
    exchangePartners: 0,
    reserveMetadata: {
      reserveRatio: "100% (1:1)",
      custodian: "Standard Custody & Trust (NYDFS)",
      lastAttested: "Oct 2026",
      attestationFrequency: "Monthly",
      attestationUrl: "https://ripple.com/solutions/stablecoin",
      chainLabel: "Ethereum + XRPL",
    },
  },
];

// ============================================
// HONOURABLE MENTIONS
// ============================================

export const usHonourableMentions: HonourableMentionGroup[] = [
  {
    category: "Offshore scale",
    blurb:
      "Larger than every US-issued dollar stablecoin combined, but issued outside the US and so outside the GENIUS perimeter.",
    entries: [
      {
        symbol: "USDT",
        name: "Tether",
        issuer: "Tether (El Salvador)",
        supply: "$184.04B",
        note: "Roughly 2.5x USDC; not a permitted payment stablecoin issuer under GENIUS",
      },
    ],
  },
  {
    category: "US parent, offshore issuance",
    blurb:
      "Run by US companies but issued through non-US entities, which keeps them outside the US list.",
    entries: [
      {
        symbol: "USDG",
        name: "Global Dollar",
        issuer: "Paxos Digital Singapore",
        supply: "$3.09B",
        note: "Paxos is a US company, but USDG is issued out of Singapore under an MAS Major Payment Institution licence",
      },
    ],
  },
  {
    category: "Decentralized",
    blurb: "Crypto-backed rather than fiat-reserved, so no issuer to license.",
    entries: [
      { symbol: "USDS", name: "Sky Dollar", issuer: "Sky", supply: "$6.85B" },
      { symbol: "DAI", name: "Dai", issuer: "Sky", supply: "$4.79B" },
    ],
  },
  {
    category: "Synthetic yield",
    blurb: "Delta-hedged rather than fiat-backed — a different risk model entirely.",
    entries: [
      { symbol: "USDe", name: "Ethena USDe", issuer: "Ethena", supply: "$4.89B" },
    ],
  },
  {
    category: "Tokenized Treasuries",
    blurb:
      "Yield-bearing funds rather than payment instruments, but increasingly used as dollar collateral onchain.",
    entries: [
      { symbol: "USYC", name: "Circle USYC", issuer: "Circle", supply: "$2.40B" },
      { symbol: "BUIDL", name: "BlackRock USD", issuer: "BlackRock / Securitize", supply: "$2.25B" },
      { symbol: "USDY", name: "Ondo US Dollar Yield", issuer: "Ondo Finance", supply: "$2.20B" },
    ],
  },
];

export const exchanges: Exchange[] = [];

export const timelineEvents: TimelineEvent[] = [];

// ============================================
// LIVE SUPPLY SOURCES
// ============================================

export const usSupplySources: CountryDataset["supplySources"] = {
  usdc: { kind: "defillama", id: "2" },
  usd1: { kind: "defillama", id: "262" },
  pyusd: { kind: "defillama", id: "120" },
  rlusd: { kind: "defillama", id: "250" },
};

export const us: CountryDataset = {
  meta: {
    slug: "us",
    name: "United States",
    demonym: "US",
    tagline: "Dollar stablecoins issued under the GENIUS Act framework",
    locale: "en-US",
    currency: "USD",
    currencySymbol: "$",
    regulationCode: "us",
    accent: {
      gradient: "from-[#1d4ed8] to-[#1e3a8a]",
      bar: "bg-blue-700",
    },
  },
  stablecoins: usStablecoins,
  exchanges,
  timelineEvents,
  supplySources: usSupplySources,
  honourableMentions: usHonourableMentions,
};

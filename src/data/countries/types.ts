// Shared types for the Countries section.
// One dataset per country lives alongside this file; see ./index.ts for the registry.

export type RegulatoryStage =
  | "fintrac_msb"
  | "prospectus_filed"
  | "prospectus_receipt"
  | "live";

export type StablecoinStatus = "live" | "coming_soon" | "pending_approval";

export interface RegulatoryStep {
  id: RegulatoryStage;
  label: string;
  description: string;
  completed: boolean;
  current: boolean;
}

export interface ParentCompany {
  name: string;
  description: string;
  founded: string;
  headquarters: string;
  website: string;
  leadership: {
    name: string;
    title: string;
  }[];
  keyFacts: string[];
  parentOf?: string[]; // subsidiary companies
}

export interface CompanyTimelineEvent {
  date: string;
  title: string;
  description: string;
  type: "milestone" | "regulatory" | "funding" | "launch" | "partnership";
}

export interface StrategicPartner {
  name: string;
  role: string;
}

export interface DesignPartner {
  name: string;
}

export interface PlatformIntegration {
  name: string;
  role: string;
}

export interface ReserveMetadata {
  tokenLogo?: string;
  chainLabel?: string;
  reserveRatio: string;
  custodian: string;
  lastAttested: string;
  attestationFrequency: string;
  attestationUrl?: string;
  supplyNote?: string;
  attestedSupply?: number; // Total issued per latest regulatory filing (overrides live on-chain sum)
  attestedSupplySource?: string; // e.g. "SEDAR+ Apr 2026"
}

export interface CountryStablecoin {
  id: string;
  name: string;
  symbol: string;
  issuer: string;
  logo?: string;
  status: StablecoinStatus;
  statusLabel: string;
  tagline: string;
  founded: string;
  headquarters: string;
  website: string;
  backing: string;
  custodian: string;
  blockchains: string[];
  backers: string[];
  strategicPartners?: StrategicPartner[];
  designPartners?: DesignPartner[];
  platformIntegrations?: PlatformIntegration[];
  regulatorySteps: RegulatoryStep[];
  fintracRegistered: boolean;
  audits: string;
  volume?: string;
  exchangePartners: number;
  parentCompany: ParentCompany;
  companyTimeline: CompanyTimelineEvent[];
  reserveMetadata: ReserveMetadata;
}

export interface Exchange {
  name: string;
  type: "CEX" | "DEX";
  url: string;
  logo?: string;
  stablecoins: string[]; // which stablecoins are available
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type: "milestone" | "regulatory" | "funding" | "launch" | "partnership";
  stablecoinId?: string;
}

// ============================================
// LIVE SUPPLY
// ============================================

/** An EVM chain to read an ERC-20 totalSupply from. */
export interface Erc20ChainSource {
  chain: string;
  rpcUrl: string;
}

/**
 * How to read a stablecoin's live on-chain supply.
 * - `defillama` covers anything DefiLlama indexes (every US and UK asset tracked here)
 * - `erc20` reads totalSupply directly, for assets DefiLlama does not index (e.g. MXNB)
 */
export type SupplySource =
  | { kind: "defillama"; id: string }
  | {
      kind: "erc20";
      address: string;
      decimals: number;
      chains: Erc20ChainSource[];
    };

// ============================================
// COUNTRY REGISTRY
// ============================================

export interface CountryMeta {
  /** URL slug, e.g. "canada" -> /countries/canada */
  slug: string;
  name: string;
  /** Intl locale for number formatting, e.g. "en-CA" */
  locale: string;
  /** Currency the local stablecoins are pegged to, e.g. "CAD" */
  currency: string;
  /** Matching id in regulationMapData.ts, for deep-linking to /regulation/:code */
  regulationCode: string;
}

export interface CountryDataset {
  meta: CountryMeta;
  stablecoins: CountryStablecoin[];
  exchanges: Exchange[];
  timelineEvents: TimelineEvent[];
  /** Per-stablecoin live supply config, keyed by stablecoin id. */
  supplySources?: Record<string, SupplySource>;
}

/**
 * @deprecated Use CountryStablecoin. Retained so the Canada components keep
 * compiling until they are generalized; removed when they move.
 */
export type CanadianStablecoin = CountryStablecoin;

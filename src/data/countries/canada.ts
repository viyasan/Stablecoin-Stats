// Canada — Countries section dataset.
// Future: Replace with Supabase API fetch.

import type {
  CountryDataset,
  CountryStablecoin,
  Exchange,
  TimelineEvent,
} from "./types";

// ============================================
// STABLECOIN DATA
// ============================================

export const canadianStablecoins: CountryStablecoin[] = [
  {
    id: "cadx",
    name: "CADX",
    symbol: "CADX",
    issuer: "Transactix",
    logo: "/cadx-logo.png",
    status: "pending_approval",
    statusLabel: "Not Live Yet",
    tagline: "Canada's Stablecoin-as-a-Service platform powered by patented OVN technology",
    founded: "2024",
    headquarters: "Calgary, AB",
    website: "https://www.transactix.ca",
    backing: "1:1 CAD reserves ($50M CAD in Canadian assets)",
    custodian: "Undisclosed",
    blockchains: ["TBD"],
    backers: [],
    regulatorySteps: [
      {
        id: "fintrac_msb",
        label: "FINTRAC MSB",
        description: "Compliance described as core to operations; registration status not publicly confirmed",
        completed: false,
        current: true,
      },
      {
        id: "prospectus_filed",
        label: "CSA Filing",
        description: "Regulatory filing status not publicly disclosed",
        completed: false,
        current: false,
      },
      {
        id: "prospectus_receipt",
        label: "Prospectus Receipt",
        description: "Pending",
        completed: false,
        current: false,
      },
      {
        id: "live",
        label: "Launch",
        description: "Launched publicly at Consensus 2025 (May 14, 2025)",
        completed: true,
        current: false,
      },
    ],
    fintracRegistered: false,
    audits: "Not publicly disclosed",
    volume: "$100B+ platform volume",
    exchangePartners: 0,
    parentCompany: {
      name: "Transactix Financial Inc.",
      description:
        "Transactix is redefining the movement of value using blockchain technology via its patented Open Value Network (OVN) platform. The company enables individuals and businesses to exchange money, crypto, loyalty rewards, and credits instantly at costs often less than sending a text message.",
      founded: "2024",
      headquarters: "Calgary, AB",
      website: "https://www.transactix.ca",
      leadership: [{ name: "Ali Abou Daya", title: "CEO" }],
      keyFacts: [
        "$100B+ in digital transactions processed on OVN platform",
        "Patented Open Value Network (OVN) enables Stablecoin-as-a-Service",
        "Credit union partnerships across Ontario and BC",
        "Member of Canada Blockchain Consortium & Web3 Canada Council",
      ],
    },
    companyTimeline: [
      {
        date: "May 14, 2025",
        title: "CADX Launched at Consensus",
        description:
          "Transactix publicly launches CADX and the Open Value Network at Consensus 2025 in Toronto; attendees purchase lattes using CADX",
        type: "launch",
      },
    ],
    reserveMetadata: {
      reserveRatio: "TBD",
      custodian: "Undisclosed",
      lastAttested: "Not disclosed",
      attestationFrequency: "N/A",
      supplyNote: "Reserve data not publicly disclosed",
    },
  },
  {
    id: "cadc",
    name: "CADC",
    symbol: "CADC",
    issuer: "Loon",
    logo: "/loon-logo.png",
    status: "live",
    statusLabel: "Live",
    tagline: "Canada's leading CAD stablecoin by usage",
    founded: "2021",
    headquarters: "Calgary, AB",
    website: "https://loon.finance",
    backing: "101% CAD reserves at ATB Financial with monthly attestations",
    custodian: "ATB Financial",
    blockchains: ["Ethereum", "Base", "Polygon", "Arbitrum", "Solana"],
    backers: ["Version One Ventures", "Garage Capital"],
    platformIntegrations: [
      { name: "MetaMask", role: "Wallet" },
      { name: "Aerodrome", role: "Onchain Lending/Liquidity" },
      { name: "PancakeSwap", role: "Onchain Lending/Liquidity" },
      { name: "Paytrie", role: "Minting/Redemption" },
    ],
    regulatorySteps: [
      {
        id: "fintrac_msb",
        label: "FINTRAC MSB",
        description: "Registered as a Money Service Business",
        completed: true,
        current: false,
      },
      {
        id: "prospectus_filed",
        label: "ASC Pre-filed",
        description: "Pre-filed prospectus with Alberta Securities Commission",
        completed: true,
        current: false,
      },
      {
        id: "prospectus_receipt",
        label: "Prospectus Receipt",
        description: "Working toward final prospectus receipt",
        completed: false,
        current: true,
      },
      {
        id: "live",
        label: "Launch",
        description: "Live since 2021, acquired by Loon Oct 2025",
        completed: true,
        current: false,
      },
    ],
    fintracRegistered: true,
    audits: "Monthly attestations (HDCPA Professional Corporation)",
    volume: "$850M+",
    exchangePartners: 5,
    parentCompany: {
      name: "Loon Technology Inc.",
      description:
        "Loon Technology is on a mission to build Canada's sovereign digital dollar infrastructure. After acquiring CADC, the country's most widely used CAD stablecoin with over $850M in on-chain volume, Loon is pioneering a regulated, made-in-Canada alternative to US-dominated stablecoins.",
      founded: "2025",
      headquarters: "Calgary, AB",
      website: "https://loon.finance",
      leadership: [{ name: "Kevin Zhang", title: "CEO & Co-Founder" }],
      keyFacts: [
        "$850M+ on-chain volume processed",
        "5 institutional partners (FIs and DApps)",
        "3-second average settlement time",
        "First Canadian stablecoin in a live remittance corridor (Canada→Mexico & Nigeria via Circle Payments Network, May 2026)",
      ],
    },
    companyTimeline: [
      {
        date: "2021",
        title: "CADC Launched",
        description: "Paytrie launches CADC stablecoin",
        type: "launch",
      },
      {
        date: "Feb 2025",
        title: "Base Network Launch",
        description:
          "CADC expanded to Base for faster, low-cost transactions",
        type: "launch",
      },
      {
        date: "2021-2025",
        title: "$250M+ Volume",
        description: "CADC transacts over $250M in volume",
        type: "milestone",
      },
      {
        date: "Oct 2025",
        title: "Loon Founded",
        description: "Loon spun out from Paytrie to focus on CADC",
        type: "launch",
      },
      {
        date: "Oct 2025",
        title: "$3M Pre-Seed",
        description: "Raises $3M led by Version One Ventures",
        type: "funding",
      },
      {
        date: "Oct 2025",
        title: "ASC Pre-filing",
        description: "Pre-files prospectus with Alberta Securities Commission",
        type: "regulatory",
      },
      {
        date: "Feb 2026",
        title: "Paytrie Partnership",
        description: "Paytrie enables 1:1 CAD-to-CADC minting and redemption",
        type: "partnership",
      },
      {
        date: "May 18, 2026",
        title: "Cross-Border Remittance Corridor",
        description:
          "Paytrie enables CADC-powered remittances from Canada to Mexico and Nigeria — converting CAD→CADC→USDC via the Circle Payments Network; first Canadian stablecoin used in an end-to-end remittance corridor",
        type: "partnership",
      },
      {
        date: "Jun 1, 2026",
        title: "CADC Launches on Solana",
        description:
          "CADC goes live on Solana with mint and redemption support via Paytrie, bringing CADC to five chains",
        type: "launch",
      },
      {
        date: "TBD",
        title: "Regulatory Approval",
        description: "Pending full regulatory approval",
        type: "regulatory",
      },
    ],
    reserveMetadata: {
      tokenLogo: "/cadc-logo.jpg",
      reserveRatio: "101%",
      custodian: "ATB Financial",
      lastAttested: "Aug 2026",
      attestationFrequency: "Monthly",
      chainLabel: "All chains",
      attestationUrl: "https://loon.finance/transparency/",
    },
  },
  {
    id: "qcad",
    name: "QCAD",
    symbol: "QCAD",
    issuer: "Stablecorp",
    logo: "https://framerusercontent.com/images/lilr82jG0Ivzk8HOVqzlhx0wPas.png?scale-down-to=512",
    status: "live",
    statusLabel: "Live",
    tagline: "Canada's First Compliant CAD Stablecoin",
    founded: "2020",
    headquarters: "Toronto, ON",
    website: "https://stablecorp.ca",
    backing: "1:1 CAD reserves at regulated financial institutions",
    custodian: "TD Bank Group (primary), VersaBank, Tetra Trust",
    blockchains: ["Ethereum", "Base", "Arc"],
    backers: [
      "Coinbase Ventures",
      "Circle Ventures",
      "DeFi Technologies",
      "Side Door Ventures",
    ],
    strategicPartners: [
      { name: "Valour", role: "CAD-linked ETPs & yield products" },
      { name: "Stillman Digital", role: "Liquidity provider" },
      { name: "BTQ", role: "Post-quantum security" },
    ],
    regulatorySteps: [
      {
        id: "fintrac_msb",
        label: "FINTRAC MSB",
        description: "Registered as a Money Service Business with FINTRAC",
        completed: true,
        current: false,
      },
      {
        id: "prospectus_filed",
        label: "CSA Prospectus Filed",
        description: "Prospectus filed with Canadian Securities Administrators",
        completed: true,
        current: false,
      },
      {
        id: "prospectus_receipt",
        label: "Final Receipt",
        description: "Received final receipt from CSA qualifying distribution",
        completed: true,
        current: false,
      },
      {
        id: "live",
        label: "Live",
        description: "Fully compliant and available for public use",
        completed: true,
        current: true,
      },
    ],
    fintracRegistered: true,
    audits: "Monthly attestations (Davidson & Company LLP) with annual audits",
    volume: "Live on Kraken (Apr 2026)",
    exchangePartners: 23,
    parentCompany: {
      name: "Stablecorp Digital Currencies Inc.",
      description:
        "Stablecorp is a joint venture between 3iQ (Canada's largest cryptoasset manager) and Mavennet Systems (a leader in blockchain development). The company focuses on building compliant digital currency infrastructure for the Canadian market.",
      founded: "2019",
      headquarters: "Toronto, ON",
      website: "https://stablecorp.ca",
      leadership: [
        { name: "Kesem Frank", title: "CEO" },
        { name: "Fred Pye", title: "Vice Chairman, Capital Markets" },
        { name: "Alex McDougall", title: "Co-Founder" },
      ],
      keyFacts: [
        "Joint venture between 3iQ and Mavennet Systems",
        "First to mint a Canadian dollar token in 2020",
        "Backed by Coinbase Ventures and Circle Ventures",
        "TD Bank Group is primary reserve custodian (Jul 2026), joining VersaBank and Tetra Trust",
        "VersaBank custody agreement (Feb 2026) - first stablecoin at a Schedule I bank",
        "Live on Arc mainnet via Circle's StableFX (Sept 2026) — first onchain CAD/USD settlement, after USDC and EURC",
        "22 ecosystem partners including exchanges and DEXs",
      ],
    },
    companyTimeline: [
      {
        date: "Feb 2020",
        title: "First QCAD Minted",
        description: "Stablecorp mints the very first Canadian dollar token",
        type: "launch",
      },
      {
        date: "2021",
        title: "Algorand Launch",
        description: "QCAD becomes first non-USD stablecoin on Algorand",
        type: "milestone",
      },
      {
        date: "May 2025",
        title: "$1.8M Funding",
        description: "Raises funding led by Coinbase Ventures",
        type: "funding",
      },
      {
        date: "Sept 2025",
        title: "CSA Prospectus Filed",
        description: "Files prospectus under CSA interim regulatory framework",
        type: "regulatory",
      },
      {
        date: "Sept 2025",
        title: "$5M Strategic Round",
        description: "Raises $5M CAD led by FTP Ventures to accelerate scaling",
        type: "funding",
      },
      {
        date: "Sept 2025",
        title: "DeFi Technologies Partnership",
        description:
          "Strategic partnership with Valour (ETPs), Stillman Digital (liquidity), and BTQ (post-quantum security)",
        type: "partnership",
      },
      {
        date: "Nov 24, 2025",
        title: "QCAD Goes Live",
        description: "Becomes Canada's first fully compliant CAD stablecoin",
        type: "milestone",
      },
      {
        date: "Feb 3, 2026",
        title: "VersaBank Custody Agreement",
        description: "VersaBank becomes custodian for QCAD reserves using VersaVault - first stablecoin customer for the federally regulated Schedule I bank",
        type: "partnership",
      },
      {
        date: "Apr 2026",
        title: "Deloitte Strategic Collaboration",
        description: "Deloitte Canada and Stablecorp announce strategic collaboration to deliver QCAD-based stablecoin infrastructure for Canadian financial institutions",
        type: "partnership",
      },
      {
        date: "Apr 2026",
        title: "Kraken Listing",
        description: "QCAD launches trading on Kraken — first CAD-denominated stablecoin on a major global exchange",
        type: "milestone",
      },
      {
        date: "Apr 30, 2026",
        title: "Added to Coinbase Listing Roadmap",
        description: "Coinbase Assets adds QCAD to its official listing roadmap, signalling a path to trading on the largest US exchange",
        type: "milestone",
      },
      {
        date: "Apr 2026",
        title: "VersaBank Begins Receiving Deposits",
        description: "VersaBank begins accepting QCAD reserve deposits under its custody services agreement, concurrent with the Kraken listing",
        type: "partnership",
      },
      {
        date: "May 21, 2026",
        title: "QCAD Joins Circle StableFX on Arc",
        description:
          "Stablecorp integrates QCAD with StableFX, Circle's institutional FX engine, and issues QCAD on Arc testnet — the first onchain CAD/USD settlement and one of the first assets on StableFX after USDC and EURC; targets the $150B/day USD/CAD corridor (sandbox now, production after Arc mainnet launch)",
        type: "partnership",
      },
      {
        date: "Jul 15, 2026",
        title: "TD Named Primary Reserve Custodian",
        description:
          "Stablecorp selects TD Bank Group as primary custodian for QCAD Digital Trust fiat reserves — one of the first times a major Canadian bank has custodied reserves for a fiat-backed digital currency; phased rollout through Q3-Q4 2026, joining VersaBank and Tetra Trust",
        type: "partnership",
      },
      {
        date: "Aug 20, 2026",
        title: "Fred Pye Named Vice Chairman, Capital Markets",
        description:
          "Co-founder Fred Pye takes on a capital markets mandate, extending QCAD beyond payments into equities, fixed income and tokenized real-world assets as an onchain settlement layer",
        type: "milestone",
      },
      {
        date: "Sept 16, 2026",
        title: "QCAD Live on Arc Mainnet",
        description:
          "QCAD goes live on Arc mainnet on launch day, moving its StableFX integration from testnet to production — Canadian institutions can now settle CAD against other supported currencies onchain, 24/7",
        type: "launch",
      },
    ],
    reserveMetadata: {
      reserveRatio: "100% (1:1)",
      custodian: "TD Bank Group (primary)",
      lastAttested: "Oct 2026",
      attestationFrequency: "Daily + Monthly (SEDAR+)",
      attestationUrl: "https://stablecorp.ca/transparency",
      chainLabel: "Ethereum",
      attestedSupply: 2_124_672,
      attestedSupplySource: "Stablecorp proof-of-reserves, Oct 3, 2026",
    },
  },
  {
    id: "tetra",
    name: "CADD",
    symbol: "CADD",
    issuer: "Tetra Digital",
    logo: "https://tetradg.com/wp-content/uploads/2025/11/TetraDigitalGroup-Icon.svg",
    status: "live",
    statusLabel: "Live",
    tagline: "First regulated CAD stablecoin issued by a financial institution",
    founded: "2019",
    headquarters: "Calgary, AB",
    website: "https://tetradg.com/cadd-stablecoin/",
    backing: "1:1 CAD reserves held in trust by Tetra Trust under Canadian law (regulated by Alberta Treasury Board and Finance)",
    custodian: "Tetra Trust Company",
    blockchains: ["Base", "Ethereum", "Tempo", "Solana"],
    backers: [
      "National Bank of Canada",
      "Shopify",
      "Wealthsimple",
      "Shakepay",
      "ATB Financial",
      "Purpose Unlimited",
      "Urbana Corporation",
      "Coinbase Ventures",
    ],
    designPartners: [
      { name: "Aquanow" },
      { name: "Capco" },
      { name: "Cybrid" },
      { name: "Float Financial" },
      { name: "KOHO" },
      { name: "Sling Money" },
      { name: "Tempo" },
      { name: "WealthONE" },
    ],
    regulatorySteps: [
      {
        id: "fintrac_msb",
        label: "Trust License",
        description: "Licensed trust company in Alberta since 2021",
        completed: true,
        current: false,
      },
      {
        id: "prospectus_filed",
        label: "Qualified Custodian",
        description: "Qualified custodian under NI 31-103 and NI 81-102",
        completed: true,
        current: false,
      },
      {
        id: "prospectus_receipt",
        label: "Partner Testing",
        description: "Completed testing with National Bank & Wealthsimple",
        completed: true,
        current: false,
      },
      {
        id: "live",
        label: "Launch",
        description: "Public launch May 4, 2026 on Base, Ethereum, and Tempo",
        completed: true,
        current: false,
      },
    ],
    fintracRegistered: false,
    audits: "Monthly attestations (Baker Tilly) plus annual audit, under Alberta TBF oversight",
    volume: "Live — see Network Circulation",
    exchangePartners: 0,
    parentCompany: {
      name: "Tetra Digital Group",
      description:
        "Tetra Digital Group is a leading Canadian digital asset infrastructure provider. Through its subsidiary CAD Digital, they are launching CADD, the first CAD stablecoin issued by a regulated financial institution.",
      founded: "2019",
      headquarters: "Calgary, AB",
      website: "https://tetradg.com",
      leadership: [{ name: "Didier Lavallée", title: "CEO" }],
      keyFacts: [
        "Canada's first qualified custodian (NI 31-103 & NI 81-102)",
        "$2.5B+ in digital assets under custody",
        "First CAD stablecoin to transfer between financial institutions",
      ],
      parentOf: ["Tetra Trust Company", "CAD Digital", "Tetra Unity"],
    },
    companyTimeline: [
      {
        date: "2019",
        title: "Tetra Founded",
        description:
          "Founded to become Canada's first licensed digital asset custodian",
        type: "launch",
      },
      {
        date: "July 2021",
        title: "Trust License & Qualified Custodian",
        description:
          "Receives Alberta Certificate of Registration, becomes Canada's first qualified custodian for digital assets",
        type: "regulatory",
      },
      {
        date: "April 2025",
        title: "Urbana Majority Position",
        description:
          "Urbana Corporation increases holdings to majority equity position",
        type: "funding",
      },
      {
        date: "May 2025",
        title: "Tetra Unity Launch",
        description:
          "Launches institutional-grade orchestration platform for digital asset services",
        type: "milestone",
      },
      {
        date: "May 2025",
        title: "Wealthsimple Partnership",
        description: "Chosen by Wealthsimple for digital asset custody",
        type: "partnership",
      },
      {
        date: "May 2025",
        title: "Corporate Reorganization",
        description:
          "Tetra Trust becomes subsidiary of Tetra Digital Group Inc.",
        type: "milestone",
      },
      {
        date: "Sept 2025",
        title: "$10M Funding Round",
        description:
          "Raises $10M from Shopify, Wealthsimple, National Bank, Coinbase Ventures, Horizon Kinetics and others",
        type: "funding",
      },
      {
        date: "Sept 2025",
        title: "Design Partner Program",
        description:
          "Expands partners to include Aquanow, Capco, Cybrid, Float, KOHO, Sling Money, Tempo, WealthONE",
        type: "partnership",
      },
      {
        date: "Dec 2025",
        title: "Testnet Milestone",
        description:
          "First CAD stablecoin to move between two financial institutions (National Bank ↔ Wealthsimple)",
        type: "milestone",
      },
      {
        date: "May 4, 2026",
        title: "CADD Launch",
        description: "CADD goes live on Base, Ethereum, and Tempo (Solana to follow)",
        type: "launch",
      },
      {
        date: "Sept 23, 2026",
        title: "CADD Launches on Solana",
        description: "CADD goes live on Solana, its fourth network",
        type: "launch",
      },
    ],
    reserveMetadata: {
      reserveRatio: "100% (1:1)",
      custodian: "Tetra Trust",
      lastAttested: "Aug 2026",
      attestationFrequency: "Daily reserve report + monthly attestation (Baker Tilly)",
      attestationUrl: "https://tetradg.com/cadd-reserve-attestations/",
      chainLabel: "Multi-chain",
      attestedSupply: 1_319_658,
      attestedSupplySource: "Daily Reserve Ratio Report (CAD Digital), Oct 2, 2026",
    },
  },
];

// ============================================
// EXCHANGE DATA
// ============================================

export const exchanges: Exchange[] = [
  {
    name: "Netcoins",
    type: "CEX",
    url: "https://netcoins.ca",
    stablecoins: ["qcad"],
  },
  {
    name: "Newton",
    type: "CEX",
    url: "https://newton.co",
    stablecoins: ["qcad"],
  },
  {
    name: "Coinsmart",
    type: "CEX",
    url: "https://coinsmart.com",
    stablecoins: ["qcad"],
  },
  {
    name: "Paytrie",
    type: "CEX",
    url: "https://paytrie.com/cadc",
    stablecoins: ["cadc"],
  },
  {
    name: "Aerodrome",
    type: "DEX",
    url: "https://aerodrome.finance",
    stablecoins: ["cadc"],
  },
  {
    name: "Kraken",
    type: "CEX",
    url: "https://kraken.com",
    stablecoins: ["qcad"],
  },
];

// ============================================
// TIMELINE DATA
// ============================================

export const timelineEvents: TimelineEvent[] = [
  {
    date: "May 14, 2025",
    title: "CADX Launches at Consensus",
    description: "Transactix publicly launches CADX stablecoin and Open Value Network at Consensus 2025 in Toronto; Canada's first Stablecoin-as-a-Service platform goes live",
    type: "launch",
    stablecoinId: "cadx",
  },
  {
    date: "Feb 2020",
    title: "First QCAD Minted",
    description: "Stablecorp mints the very first Canadian dollar token",
    type: "launch",
    stablecoinId: "qcad",
  },
  {
    date: "2021",
    title: "CADC Launches",
    description: "Paytrie launches CADC stablecoin",
    type: "launch",
    stablecoinId: "cadc",
  },
  {
    date: "May 2025",
    title: "Wealthsimple Partnership",
    description: "Tetra Trust chosen by Wealthsimple for digital asset custody",
    type: "milestone",
    stablecoinId: "tetra",
  },
  {
    date: "July 2025",
    title: "US Passes GENIUS Act",
    description: "US stablecoin legislation puts pressure on Canada to act",
    type: "regulatory",
  },
  {
    date: "Sept 2025",
    title: "Tetra Raises $10M",
    description:
      "Tetra Digital Group raises funding from Shopify, Wealthsimple, National Bank and others",
    type: "funding",
    stablecoinId: "tetra",
  },
  {
    date: "Sept 2025",
    title: "QCAD Files Prospectus",
    description:
      "Stablecorp files prospectus with CSA under interim regulatory framework",
    type: "regulatory",
    stablecoinId: "qcad",
  },
  {
    date: "Oct 2025",
    title: "Loon Acquires CADC",
    description: "Loon raises $3M CAD and acquires CADC stablecoin from Paytrie",
    type: "funding",
    stablecoinId: "cadc",
  },
  {
    date: "Nov 2025",
    title: "Federal Budget Announcement",
    description:
      "Budget 2025 commits $10M to Bank of Canada for stablecoin oversight",
    type: "regulatory",
  },
  {
    date: "Nov 24, 2025",
    title: "QCAD Goes Live",
    description: "QCAD becomes Canada's first fully compliant CAD stablecoin",
    type: "milestone",
    stablecoinId: "qcad",
  },
  {
    date: "Dec 2025",
    title: "CADD Testnet Milestone",
    description:
      "First CAD stablecoin transferred between two financial institutions (National Bank ↔ Wealthsimple)",
    type: "milestone",
    stablecoinId: "tetra",
  },
  {
    date: "Dec 2025",
    title: "Stablecoin Act Introduced",
    description: "Federal government introduces proposed Stablecoin Act",
    type: "regulatory",
  },
  {
    date: "Feb 3, 2026",
    title: "QCAD Custodied at VersaBank",
    description: "Stablecorp signs custody agreement with VersaBank, making QCAD the first stablecoin held at a Canadian Schedule I bank",
    type: "partnership",
    stablecoinId: "qcad",
  },
  {
    date: "Mar 26, 2026",
    title: "Stablecoin Act Receives Royal Assent",
    description: "Bill C-15 receives Royal Assent, establishing Canada's federal stablecoin framework; implementation regulations TBD",
    type: "regulatory",
  },
  {
    date: "Apr 2026",
    title: "Deloitte-Stablecorp Collaboration",
    description: "Deloitte Canada and Stablecorp announce strategic collaboration on QCAD-based stablecoin infrastructure for Canadian FIs",
    type: "partnership",
    stablecoinId: "qcad",
  },
  {
    date: "May 4, 2026",
    title: "CADD Launch",
    description: "CAD Digital launches CADD, Canada's first CAD stablecoin issued by a regulated financial institution, live on Base, Ethereum and Tempo",
    type: "launch",
    stablecoinId: "tetra",
  },
  {
    date: "May 5, 2026",
    title: "Visa Canada Pilots Stablecoin Settlement",
    description: "Visa Canada and Wealthsimple launch Canada's first stablecoin settlement pilot, using USDC to settle obligations with Visa — signalling mainstream Canadian adoption of onchain settlement",
    type: "partnership",
  },
  {
    date: "May 18, 2026",
    title: "CADC Powers First Remittance Corridor",
    description: "Paytrie enables CADC-powered remittances from Canada to Mexico and Nigeria via the Circle Payments Network — the first Canadian stablecoin used in an end-to-end remittance corridor",
    type: "partnership",
    stablecoinId: "cadc",
  },
  {
    date: "Jun 1, 2026",
    title: "CADC Launches on Solana",
    description: "Loon brings CADC to Solana with mint and redemption via Paytrie, taking CADC to five chains",
    type: "launch",
    stablecoinId: "cadc",
  },
  {
    date: "Jul 15, 2026",
    title: "TD Becomes QCAD's Primary Reserve Custodian",
    description: "Stablecorp selects TD Bank Group as primary custodian for QCAD Digital Trust reserves, joining VersaBank and Tetra Trust — among the first times a major Canadian bank has custodied reserves for a fiat-backed digital currency",
    type: "partnership",
    stablecoinId: "qcad",
  },
  {
    date: "Aug 20, 2026",
    title: "Stablecorp Appoints Fred Pye Vice Chairman, Capital Markets",
    description: "Co-founder Fred Pye takes a capital markets mandate to extend QCAD beyond payments into equities, fixed income and tokenized real-world assets",
    type: "milestone",
    stablecoinId: "qcad",
  },
  {
    date: "Sept 1, 2026",
    title: "21 Global Banks Commit to Multi-Currency Stablecoin",
    description: "Twenty-one international banks — including Scotiabank and TD Bank Group — commit to form a company in H2 2026 to issue a USD stablecoin in H1 2027, with CAD named alongside GBP and JPY as later G7 targets",
    type: "partnership",
  },
  {
    date: "Sept 16, 2026",
    title: "QCAD Goes Live on Arc Mainnet",
    description: "QCAD launches on Circle's Arc mainnet with StableFX in production, enabling 24/7 onchain CAD settlement against other supported currencies",
    type: "launch",
    stablecoinId: "qcad",
  },
  {
    date: "Sept 23, 2026",
    title: "CADD Launches on Solana",
    description: "Tetra brings CADD to Solana, its fourth network after Base, Ethereum, and Tempo",
    type: "launch",
    stablecoinId: "tetra",
  },
  {
    date: "2027",
    title: "Bank of Canada Oversight Begins",
    description:
      "Bank of Canada begins formal stablecoin oversight under enacted Stablecoin Act",
    type: "regulatory",
  },
];

// ============================================
// LIVE SUPPLY SOURCES
// ============================================

const ETH_RPC = "https://ethereum.publicnode.com";

// CADC is indexed by DefiLlama; QCAD is not, so its Ethereum contract is read directly.
// Both behaviours are carried over unchanged from the previous useCanadianReserves hook.
export const canadaSupplySources: CountryDataset["supplySources"] = {
  cadc: { kind: "defillama", id: "145" },
  qcad: {
    kind: "erc20",
    address: "0x3Fa142dD3f384414e05E71Ad0939274EdC82EC0A",
    decimals: 6,
    chains: [{ chain: "Ethereum", rpcUrl: ETH_RPC }],
  },
};

/** Per-issuer header gradients, preserved from the original Canada page. */
const canadaCardGradients: Record<string, string> = {
  cadx: "from-[#dc2626] to-[#b91c1c]",
  cadc: "from-[#d92525] to-[#b61b1b]",
  qcad: "from-[#dc2626] to-[#b91c1c]",
  tetra: "from-[#d52424] to-[#b21a1a]",
};

export const canada: CountryDataset = {
  meta: {
    slug: "canada",
    name: "Canada",
    demonym: "Canadian",
    tagline: "The Canadian Stablecoin Issuer Landscape",
    locale: "en-CA",
    currency: "CAD",
    currencySymbol: "CA$",
    regulationCode: "ca",
    accent: {
      gradient: "from-[#dc2626] to-[#b91c1c]",
      bar: "bg-red-600",
    },
  },
  stablecoins: canadianStablecoins,
  exchanges,
  timelineEvents,
  supplySources: canadaSupplySources,
  cardGradients: canadaCardGradients,
};

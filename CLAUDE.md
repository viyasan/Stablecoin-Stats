# Stablecoin Market Dashboard

React + TypeScript dashboard for stablecoin market data, regulation tracking, and insights. Deployed on Vercel.

## Quick Commands

```bash
npm run dev            # Local dev server (Vite)
npm run build          # TypeScript check + Vite build
npm run test:run       # Single test run (Vitest)
npm run test           # Watch mode tests
npm run lint           # ESLint
```

Build runs `tsc -b && vite build` — TypeScript errors will fail the build.

## Tech Stack

- **Framework**: React 19, TypeScript 5 (strict mode), Vite 7
- **Routing**: React Router DOM 7
- **Styling**: Tailwind CSS 4 with custom primary color palette
- **Charts**: Recharts 3 (AreaChart, PieChart, LineChart)
- **Maps**: React Simple Maps (world regulation map)
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library + MSW for API mocking
- **Deployment**: Vercel

## Architecture

```
src/
  api/           # Custom hooks for data fetching
  components/
    common/      # Reusable: Badge, Card, Skeleton, Spinner, etc.
    overview/    # Dashboard: KPI cards, charts, treasury, reserves
    canada/      # Canada regulation components
    countries/   # Global regulation components
    news/        # News display components
    layout/      # Header, Footer, PageContainer
  routes/        # Page components (OverviewPage, CanadaPage, etc.)
  types/         # Shared TypeScript interfaces
  utils/         # Formatting and calculation helpers
  config/        # API URLs, feature flags, cache durations
  data/          # Static datasets (Canadian stablecoins)
  test/          # Test setup (jsdom, matchMedia mock, ResizeObserver mock)
```

### API Hook Pattern

All API hooks return the same interface:

```typescript
{ data: T | null, isLoading: boolean, error: Error | null, refetch: () => void }
```

Hooks live in `src/api/` and are re-exported from `src/api/index.ts`.

### Component Conventions

- Feature folders under `src/components/` — colocated with their test files
- Shared components in `src/components/common/`
- Tailwind for all styling — no CSS modules or styled-components
- Recharts for all data visualization
- Loading states use `Skeleton*` components from common
- Error states include a retry button calling `refetch()`

## Data Sources

| Source | File | Type |
|--------|------|------|
| DefiLlama API | `src/api/marketApi.ts`, `yieldApi.ts`, `useCanadianReserves.ts` | Live — market caps, charts, chain breakdown, stablecoin list, yields, CADC supply |
| Supabase cache | `api/market-summary.ts`, `api/cron/refresh.ts` | Live — daily Vercel cron snapshot of DefiLlama; `marketApi.ts` falls back to DefiLlama directly |
| Ethereum RPC | `src/api/useCanadianReserves.ts` | Live — QCAD on-chain supply |
| News RSS | `src/api/newsApi.ts` | Live — CoinDesk / CoinTelegraph feeds |
| US Treasury TIC Data | `TreasuryHoldingsCard.tsx` | Static — July 2026 foreign holder rankings (top 8 + Tether #18, Circle ~#28) |
| Tether/Circle Attestations | `marketApi.ts` RESERVE_DATA, `TreasuryHoldingsCard.tsx` | Static — Treasury holdings: Tether $141B (Q1 2026 BDO), Circle $62.47B (Circle Reserve Fund, Sept 30, 2026) |
| Canadian stablecoins | `src/data/canadianStablecoins.ts` | Static — issuer profiles, timelines, attested supply (Oct 2026) |
| Global regulation | `src/components/countries/regulationMapData.ts` | Static — 10 jurisdictions, `lastVerified` per entry (Oct 2026) |
| Quick Insights / Insights | `QuickInsightsCarousel.tsx`, `news/InsightsSection.tsx` | Static — homepage insights (Oct 2026), curated reports (Feb 2026) |

Static data needs manual updates. Sources and dates are documented in comments and card attribution links.

## Environment Variables

```
VITE_GTM_CONTAINER_ID          # Google Tag Manager
VITE_BEEHIIV_EMBED_URL         # Beehiiv newsletter signup form URL
VITE_SUPABASE_URL              # Supabase project URL (email signup; card hidden when missing)
VITE_SUPABASE_ANON_KEY         # Supabase anon/public key (email signup; card hidden when missing)
```

See `.env.example` for the template.

## Workflow Rules

- **Plan first**: Enter plan mode for any task or architectural decision
- **Verify before done**: Run `npm run build` — TypeScript errors fail the build. Run tests when touching API hooks or utils
- **Simplicity first**: Make every change as simple as possible. Minimal code impact
- **No temporary fixes**: Find root causes. No workarounds that will need revisiting
- **Minimal impact**: Only touch what's necessary. Don't refactor adjacent code
- **Data consistency**: When the same metric appears in multiple cards (e.g. treasury holdings), ensure values match across all components

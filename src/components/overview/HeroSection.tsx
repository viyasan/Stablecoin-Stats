import { Link } from 'react-router-dom';
import { GlobalKpiCard } from './GlobalKpiCard';
import { Marquee } from '@/components/ui/marquee';
import { RotatingWords } from '@/components/ui/rotating-words';
import { ShimmerLink } from '@/components/ui/shimmer-link';

const ROTATING_NAMES = [
  'digital dollars',
  'USDC',
  'USDT',
  'CADC',
  'USD1',
  'PYUSD',
  'USDG',
  'USDS',
  'USDe',
  'DAI',
];

const CHAINS = [
  'Ethereum',
  'Tron',
  'Solana',
  'Arbitrum',
  'Base',
  'Polygon',
  'Avalanche',
  'BSC',
  'TON',
  'Optimism',
  'Stellar',
  'Sui',
  'Aptos',
];

export function HeroSection() {
  return (
    <section className="relative rounded-2xl bg-white border border-chrome-200 mb-8">
      {/* ── Background decorations ── */}
      <div className="absolute inset-0 bg-hero-grid pointer-events-none" />
      <div className="absolute -top-24 -right-16 w-[420px] h-[420px] rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-12 w-[280px] h-[280px] rounded-full bg-gold-500/8 blur-2xl pointer-events-none" />
      <div className="absolute top-[10%] left-[33%] w-px h-[60%] bg-gradient-to-b from-transparent via-gold-500/12 to-transparent pointer-events-none" />
      <div className="absolute top-[30%] right-[25%] w-px h-[40%] bg-gradient-to-b from-transparent via-gold-500/12 to-transparent pointer-events-none" />

      {/* ── Main content ── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-6 sm:gap-8 p-5 sm:p-8 lg:p-12">
        {/* Left column */}
        <div>
          {/* Headline */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] tracking-tight text-chrome-800 mb-6"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Tracking
            <br />
            <span className="inline-block h-[1.2em]">
              {/* Hold "digital dollars" for 4s on first load, then 2s per coin */}
              <em>
                <RotatingWords
                  words={ROTATING_NAMES}
                  initialHoldMs={4000}
                  intervalMs={2000}
                  loopFirstWord={false}
                  className="text-gold-500"
                />
              </em>
            </span>
            <br />
            on-chain.
          </h1>

          {/* Subhead */}
          <p className="font-mono text-sm text-chrome-400 leading-relaxed max-w-md mb-8 tracking-wide">
            Stablecoin growth and dominance tracker, global digital asset
            regulatory progress, yield and insights, all in one place.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <ShimmerLink to="/stats">Explore Stats</ShimmerLink>
            <Link
              to="/yields"
              className="inline-flex items-center px-6 py-3 border border-gold-500 text-gold-600 text-sm font-medium rounded-md hover:bg-gold-50 transition-colors"
            >
              View Yield
            </Link>
          </div>
        </div>

        {/* Right column */}
        <div className="flex justify-center lg:justify-end">
          <GlobalKpiCard />
        </div>
      </div>

      {/* ── Bottom strip ── */}
      <div className="relative z-10 border-t border-chrome-200 py-2 sm:py-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <Marquee pauseOnHover repeat={4} className="[--gap:1.25rem]">
          {CHAINS.map((chain) => (
            <span
              key={chain}
              className="font-mono text-[11px] text-chrome-400 tracking-wide whitespace-nowrap"
            >
              {chain}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

import { ExternalLink } from 'lucide-react';
import type { CountryStablecoin, ChainSupply, CountryMeta } from '../../api';

interface ReserveCardProps {
  stablecoin: CountryStablecoin;
  chains: ChainSupply[] | null;
  isLoadingSupply: boolean;
  country: CountryMeta;
  /** Optional per-issuer gradient overrides, keyed by stablecoin id. */
  cardGradients?: Record<string, string>;
}

export function ReserveCard({
  stablecoin,
  chains,
  isLoadingSupply,
  country,
  cardGradients,
}: ReserveCardProps) {
  const { locale, currencySymbol, accent } = country;
  const meta = stablecoin.reserveMetadata;
  const gradient = cardGradients?.[stablecoin.id] ?? accent.gradient;
  const logoSrc = meta.tokenLogo ?? stablecoin.logo;

  const onChainTotal = chains?.reduce((sum, c) => sum + c.amount, 0) ?? 0;
  const displayTotal = meta.attestedSupply ?? onChainTotal;
  const hasLiveData = !meta.supplyNote && chains !== null && chains.length > 0;

  // Pre-mint case: more tokens exist on-chain than have been independently attested
  // as issued/backed (e.g. QCAD — most on-chain supply is "allowed but not issued").
  const attestedBacked = meta.attestedSupply ?? 0;
  const isPremint = hasLiveData && attestedBacked > 0 && attestedBacked < onChainTotal;
  const premintAmount = onChainTotal - attestedBacked;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-chrome-200 overflow-hidden flex flex-col">
      {/* Header */}
      <div className={`bg-gradient-to-r ${gradient} px-5 py-3 flex items-center gap-3`}>
        {logoSrc && (
          <img
            src={logoSrc}
            alt={`${stablecoin.symbol} logo`}
            className="w-10 h-10 rounded-lg bg-white p-1.5 object-contain flex-shrink-0"
          />
        )}
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-white">{stablecoin.symbol}</h3>
          <p className="text-white text-sm opacity-90 truncate">{stablecoin.issuer}</p>
        </div>
      </div>

      {/* Total supply row */}
      <div className="px-5 py-3 border-b border-chrome-100">
        <p className="text-[11px] font-semibold text-chrome-400 uppercase tracking-wide mb-1">Net Circulation</p>
        {meta.supplyNote ? (
          <p className="text-sm text-chrome-500">{meta.supplyNote}</p>
        ) : isLoadingSupply ? (
          <div className="h-4 w-32 bg-chrome-100 rounded animate-pulse" />
        ) : isPremint ? (
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-base font-bold text-chrome-900">
              {attestedBacked.toLocaleString(locale, { maximumFractionDigits: 0 })} {stablecoin.symbol}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-gold-600 font-semibold bg-gold-50 px-1.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              Attested
            </span>
            <span className="text-[11px] text-chrome-400">
              of {onChainTotal.toLocaleString(locale, { maximumFractionDigits: 0 })} on-chain
            </span>
          </div>
        ) : hasLiveData ? (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base font-bold text-chrome-900">
              {onChainTotal.toLocaleString(locale, { maximumFractionDigits: 0 })} {stablecoin.symbol}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-status-positive font-semibold bg-status-positive/10 px-1.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-status-positive" />
              Live
            </span>
          </div>
        ) : meta.attestedSupply ? (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base font-bold text-chrome-900">
              {meta.attestedSupply.toLocaleString(locale, { maximumFractionDigits: 0 })} {stablecoin.symbol}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-gold-600 font-semibold bg-gold-50 px-1.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              Reported
            </span>
          </div>
        ) : (
          <p className="text-sm text-chrome-400">Data unavailable</p>
        )}
      </div>

      {/* Chain breakdown */}
      <div className="px-5 py-3 flex-grow">
        {meta.supplyNote ? (
          <p className="text-xs text-chrome-400 italic pt-1">No on-chain data available</p>
        ) : isLoadingSupply ? (
          <div className="space-y-3 pt-1">
            {[1, 2].map((i) => (
              <div key={i}>
                <div className="h-3 w-16 bg-chrome-100 rounded animate-pulse mb-1.5" />
                <div className="h-1.5 w-full bg-chrome-100 rounded-full animate-pulse" />
              </div>
            ))}
          </div>
        ) : isPremint ? (
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-chrome-700">Backed &amp; attested</span>
                <span className="text-xs text-chrome-500">{attestedBacked.toLocaleString(locale)}</span>
              </div>
              <div className="h-1.5 bg-chrome-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${accent.bar} rounded-full`}
                  style={{ width: `${Math.max((attestedBacked / onChainTotal) * 100, 1.5)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-chrome-700">Pre-mint (not yet issued)</span>
                <span className="text-xs text-chrome-500">{premintAmount.toLocaleString(locale)}</span>
              </div>
              <div className="h-1.5 bg-chrome-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${(premintAmount / onChainTotal) * 100}%` }}
                />
              </div>
            </div>
            <p className="text-[11px] text-chrome-400 italic pt-0.5">
              ≈ {currencySymbol}{onChainTotal.toLocaleString(locale)} potential reserve if fully issued at 1:1
            </p>
            {meta.attestedSupplySource && (
              <p className="text-[11px] text-chrome-400 italic">{meta.attestedSupplySource}</p>
            )}
          </div>
        ) : hasLiveData ? (
          <div className="space-y-3">
            {chains!.map((c) => {
              const pct = displayTotal > 0 ? (c.amount / displayTotal) * 100 : 0;
              return (
                <div key={c.chain}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-chrome-700">On {c.chain}</span>
                    <span className="text-xs text-chrome-500">
                      {c.amount.toLocaleString(locale, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="h-1.5 bg-chrome-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${accent.bar} rounded-full`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {meta.attestedSupply && onChainTotal < meta.attestedSupply && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-chrome-700">Custodial (off-chain)</span>
                  <span className="text-xs text-chrome-500">
                    {(meta.attestedSupply - onChainTotal).toLocaleString(locale, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="h-1.5 bg-chrome-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-chrome-300 rounded-full"
                    style={{ width: `${((meta.attestedSupply - onChainTotal) / meta.attestedSupply) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : meta.attestedSupply ? (
          <div className="space-y-2 pt-1">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-chrome-700">Cash reserves</span>
                <span className="text-xs text-chrome-500">100%</span>
              </div>
              <div className="h-1.5 bg-chrome-100 rounded-full overflow-hidden">
                <div className={`h-full ${accent.bar} rounded-full`} style={{ width: '100%' }} />
              </div>
            </div>
            {meta.attestedSupplySource && (
              <p className="text-[11px] text-chrome-400 italic">{meta.attestedSupplySource}</p>
            )}
          </div>
        ) : (
          <p className="text-xs text-chrome-400 pt-1">Data unavailable</p>
        )}
      </div>

      {/* Metadata footer */}
      <div className="px-5 py-3 border-t border-chrome-100 bg-chrome-50 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-chrome-400">Reserve Ratio</span>
          <span className="text-[11px] font-semibold text-chrome-700">{meta.reserveRatio}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-chrome-400">Custodian</span>
          <span className="text-[11px] font-semibold text-chrome-700">{meta.custodian}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-chrome-400">Last Attested</span>
          <span className="text-[11px] font-semibold text-chrome-700">{meta.lastAttested}</span>
        </div>
        {meta.attestationUrl && (
          <a
            href={meta.attestationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-chrome-500 hover:text-chrome-800 pt-0.5"
          >
            View Reports <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}

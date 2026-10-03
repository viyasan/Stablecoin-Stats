import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageContainer } from '../components/layout';
import { CountryFlag } from '../components/countries-market';
import { COUNTRIES, COUNTRY_SLUGS } from '../data/countries';

/**
 * Entry point for the Countries section. Driven by the registry, so a new country
 * dataset appears here automatically.
 */
export function CountriesIndexPage() {
  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-chrome-800 mb-2">Countries</h1>
        <p className="text-lg text-chrome-500">
          Stablecoin issuers, reserves and market structure, country by country
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {COUNTRY_SLUGS.map((slug) => {
          const { meta, stablecoins } = COUNTRIES[slug];
          const live = stablecoins.filter((s) => s.status === 'live').length;

          return (
            <Link
              key={slug}
              to={`/countries/${slug}`}
              className="group bg-white rounded-xl shadow-sm border border-chrome-200 overflow-hidden hover:border-gold-400 hover:shadow-md transition-all duration-150"
            >
              <div className={`bg-gradient-to-r ${meta.accent.gradient} px-5 py-4`}>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-white">{meta.name}</h2>
                  <CountryFlag slug={slug} className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="px-5 py-4">
                <p className="text-sm text-chrome-600 leading-relaxed mb-4">{meta.tagline}</p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-5">
                    <div>
                      <p className="text-[11px] font-semibold text-chrome-400 uppercase tracking-wide">
                        Tracked
                      </p>
                      <p className="text-sm font-bold text-chrome-900">
                        {stablecoins.length} stablecoin{stablecoins.length === 1 ? '' : 's'}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-chrome-400 uppercase tracking-wide">
                        Live
                      </p>
                      <p className="text-sm font-bold text-chrome-900">{live}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-chrome-400 uppercase tracking-wide">
                        Currency
                      </p>
                      <p className="text-sm font-bold text-chrome-900">{meta.currency}</p>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-chrome-400 group-hover:text-gold-500 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </PageContainer>
  );
}

import { useParams, Navigate } from 'react-router-dom';
import { PageContainer } from '../components/layout';
import { SkeletonCanadaPage } from '../components/common';
import {
  ReserveCard,
  ComparisonTable,
  CompanyProfileCards,
  CompanyTimelines,
  CountryFlag,
} from '../components/countries-market';
import { useCountryStablecoins, useCountryExchanges, useCountryReserves } from '../api';
import { getCountry } from '../data/countries';

/**
 * One page per country in the Countries section, driven entirely by that country's
 * dataset. Sections that depend on optional data (company profiles, timelines)
 * render only where the dataset provides it, so lighter countries simply omit them.
 */
export function CountryMarketPage() {
  const { slug = '' } = useParams();
  const dataset = getCountry(slug);

  const { data: stablecoins, isLoading } = useCountryStablecoins(slug);
  const { data: exchanges } = useCountryExchanges(slug);
  const { data: reserveSupply, isLoading: isLoadingSupply } = useCountryReserves(slug);

  // The regulation tracker used to own /countries/:code. A slug with no dataset is
  // therefore treated as one of those legacy links and forwarded to its regulation
  // page — which also means adding a country is purely a data change.
  if (!dataset) {
    return <Navigate to={`/regulation/${slug}`} replace />;
  }

  if (isLoading) {
    return (
      <PageContainer>
        <SkeletonCanadaPage />
      </PageContainer>
    );
  }

  if (!stablecoins) {
    return (
      <PageContainer>
        <div className="bg-white rounded-lg shadow-sm border border-chrome-200 p-8">
          <p className="text-chrome-500 text-center">Failed to load data</p>
        </div>
      </PageContainer>
    );
  }

  const { meta } = dataset;
  const hasProfiles = stablecoins.some((s) => s.parentCompany);
  const hasTimelines = stablecoins.some((s) => s.companyTimeline?.length);

  return (
    <PageContainer>
      {/* Hero Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-chrome-800">{meta.name}</h1>
          <CountryFlag slug={meta.slug} />
        </div>
        <p className="text-lg text-chrome-500">{meta.tagline}</p>
      </div>

      {/* Company Profile Cards */}
      {hasProfiles && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-chrome-800 mb-4">
            Leading {meta.demonym} Stablecoin Issuers
          </h2>
          <CompanyProfileCards stablecoins={stablecoins} />
        </section>
      )}

      {/* Reserve & Transparency */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-chrome-800 mb-4">
          Reserve &amp; Transparency
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {stablecoins.map((stablecoin) => (
            <ReserveCard
              key={stablecoin.id}
              stablecoin={stablecoin}
              chains={reserveSupply?.[stablecoin.id] ?? null}
              isLoadingSupply={isLoadingSupply}
              country={meta}
              cardGradients={dataset.cardGradients}
            />
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="mb-8">
        <ComparisonTable
          heading={`${meta.demonym} Stablecoins - Across the Board`}
          stablecoins={stablecoins}
          exchanges={exchanges || []}
        />
      </section>

      {/* Company Timelines */}
      {hasTimelines && (
        <section>
          <CompanyTimelines stablecoins={stablecoins} demonym={meta.demonym} />
        </section>
      )}
    </PageContainer>
  );
}

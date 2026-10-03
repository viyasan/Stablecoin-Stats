import { useState, useEffect, useCallback } from 'react';
import { getCountry } from '../data/countries';
import type { CountryStablecoin, Exchange, CountryDataset } from '../data/countries';

// Re-export types for convenience
export type {
  CountryStablecoin,
  CanadianStablecoin,
  CountryDataset,
  CountryMeta,
  CountryAccent,
  SupplySource,
  HonourableMentionGroup,
  HonourableMention,
  Exchange,
  RegulatoryStep,
  StablecoinStatus,
  ParentCompany,
  CompanyTimelineEvent,
  ReserveMetadata,
} from '../data/countries';

interface UseApiResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Shared loader for the static country datasets. The artificial delay preserves the
 * existing loading states, and keeps the call sites honest for the eventual swap to
 * a Supabase fetch.
 */
function useCountryData<T>(
  slug: string,
  select: (dataset: CountryDataset) => T
): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Future: Replace with Supabase fetch
      // const { data, error } = await supabase.from('country_stablecoins').select('*');

      const dataset = getCountry(slug);
      if (!dataset) throw new Error(`Unknown country: ${slug}`);

      setData(select(dataset));
      setError(null);
    } catch (err) {
      setData(null);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
    // `select` is called inline per fetch; callers pass a stable slug.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

/** Stablecoins issued in a country, by URL slug. */
export function useCountryStablecoins(slug: string): UseApiResult<CountryStablecoin[]> {
  return useCountryData(slug, (d) => d.stablecoins);
}

/** Exchanges in a country, optionally narrowed to those listing one stablecoin. */
export function useCountryExchanges(
  slug: string,
  stablecoinId?: string
): UseApiResult<Exchange[]> {
  const { data, isLoading, error, refetch } = useCountryData(slug, (d) => d.exchanges);

  const filtered = data
    ? stablecoinId
      ? data.filter((e) => e.stablecoins.includes(stablecoinId))
      : data
    : null;

  return { data: filtered, isLoading, error, refetch };
}

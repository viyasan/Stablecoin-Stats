import { useState, useEffect, useCallback } from 'react';
import { getCountry } from '../data/countries';
import type { SupplySource } from '../data/countries';

export interface ChainSupply {
  chain: string;
  amount: number;
}

/** Live on-chain supply per stablecoin id; null means that asset's fetch failed. */
export type CountryReserveSupply = Record<string, ChainSupply[] | null>;

interface UseApiResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const ERC20_TOTAL_SUPPLY_SELECTOR = '0x18160ddd';

/**
 * The DefiLlama list covers every asset in one response, so a page tracking several
 * of them shares a single request rather than downloading the list once per asset.
 * Kept per fetch cycle, not cached across them, so refetch() still gets fresh data.
 */
let inFlightList: Promise<DefiLlamaList> | null = null;

interface DefiLlamaList {
  peggedAssets?: {
    id: string;
    chainCirculating?: Record<string, { current?: Record<string, number> }>;
  }[];
}

function fetchDefiLlamaList(): Promise<DefiLlamaList> {
  if (!inFlightList) {
    inFlightList = fetch('https://stablecoins.llama.fi/stablecoins')
      .then((res) => {
        if (!res.ok) throw new Error('DefiLlama fetch failed');
        return res.json();
      })
      .finally(() => {
        // Release once settled so the next refetch starts a new request.
        inFlightList = null;
      });
  }
  return inFlightList;
}

/**
 * Reads per-chain circulating supply from DefiLlama. Works for any asset DefiLlama
 * indexes, whatever its peg currency — the per-chain figures live under a
 * `pegged<CCY>` key that varies by asset, so take whichever one is present.
 */
async function fetchFromDefiLlama(id: string): Promise<ChainSupply[]> {
  const json = await fetchDefiLlamaList();

  const asset = json.peggedAssets?.find((a: { id: string }) => a.id === id);
  if (!asset) throw new Error(`Asset ${id} not found in DefiLlama`);

  return Object.entries(
    (asset.chainCirculating ?? {}) as Record<string, { current?: Record<string, number> }>
  )
    .map(([chain, data]) => ({
      chain,
      amount: Object.values(data.current ?? {})[0] ?? 0,
    }))
    .filter((c) => c.amount > 0)
    .sort((a, b) => b.amount - a.amount);
}

/**
 * Reads ERC-20 totalSupply directly, for assets DefiLlama does not index.
 * Chains are read independently so one dead RPC does not lose the others.
 */
async function fetchFromErc20(
  source: Extract<SupplySource, { kind: 'erc20' }>
): Promise<ChainSupply[]> {
  const results = await Promise.allSettled(
    source.chains.map(async ({ chain, rpcUrl }) => {
      const res = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_call',
          params: [{ to: source.address, data: ERC20_TOTAL_SUPPLY_SELECTOR }, 'latest'],
          id: 1,
        }),
      });
      if (!res.ok) throw new Error(`${chain} RPC fetch failed`);

      const json = await res.json();
      if (json.error) throw new Error(json.error.message);
      if (!json.result || json.result === '0x') throw new Error(`${chain} returned no supply`);

      const amount = Number(BigInt(json.result)) / 10 ** source.decimals;
      return { chain, amount };
    })
  );

  const chains = results
    .filter((r): r is PromiseFulfilledResult<ChainSupply> => r.status === 'fulfilled')
    .map((r) => r.value)
    .filter((c) => c.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  if (chains.length === 0) throw new Error('No chain returned a supply');
  return chains;
}

function fetchSupply(source: SupplySource): Promise<ChainSupply[]> {
  return source.kind === 'defillama'
    ? fetchFromDefiLlama(source.id)
    : fetchFromErc20(source);
}

/**
 * Live on-chain supply for every stablecoin in a country's dataset that declares
 * a supply source. Assets are fetched independently, so one failure yields null
 * for that asset rather than losing the whole page.
 */
export function useCountryReserves(slug: string): UseApiResult<CountryReserveSupply> {
  const [data, setData] = useState<CountryReserveSupply | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const sources = getCountry(slug)?.supplySources ?? {};
      const ids = Object.keys(sources);

      const settled = await Promise.allSettled(ids.map((id) => fetchSupply(sources[id])));

      const next: CountryReserveSupply = {};
      ids.forEach((id, i) => {
        const result = settled[i];
        next[id] = result.status === 'fulfilled' ? result.value : null;
      });

      setData(next);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

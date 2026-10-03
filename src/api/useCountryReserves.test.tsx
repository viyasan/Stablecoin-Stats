import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useCountryReserves } from './useCountryReserves';

const llamaResponse = {
  peggedAssets: [
    { id: '2', chainCirculating: { Ethereum: { current: { peggedUSD: 40_000_000_000 } } } },
    { id: '262', chainCirculating: { Ethereum: { current: { peggedUSD: 3_000_000_000 } } } },
    { id: '120', chainCirculating: { Ethereum: { current: { peggedUSD: 2_000_000_000 } } } },
    { id: '250', chainCirculating: { XRPL: { current: { peggedUSD: 1_000_000_000 } } } },
    { id: '145', chainCirculating: { Base: { current: { peggedCAD: 1_053_667 } } } },
  ],
};

describe('useCountryReserves', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shares one DefiLlama request across every asset on a page', async () => {
    const fetchMock = vi.fn(async () =>
      new Response(JSON.stringify(llamaResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useCountryReserves('us'));
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // The US dataset tracks four DefiLlama assets; they must not cause four downloads.
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(Object.keys(result.current.data ?? {})).toHaveLength(4);
    expect(result.current.data?.usdc?.[0]).toEqual({ chain: 'Ethereum', amount: 40_000_000_000 });
  });

  it('reads whichever pegged currency key an asset uses', async () => {
    const fetchMock = vi.fn(async (url: string) => {
      if (typeof url === 'string' && url.includes('llama')) {
        return new Response(JSON.stringify(llamaResponse), { status: 200 });
      }
      // QCAD's ERC-20 totalSupply call
      return new Response(JSON.stringify({ jsonrpc: '2.0', id: 1, result: '0x7868a4b2e2' }), {
        status: 200,
      });
    });
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useCountryReserves('canada'));
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // CADC is peggedCAD, not peggedUSD
    expect(result.current.data?.cadc?.[0]).toEqual({ chain: 'Base', amount: 1_053_667 });
    // QCAD comes from the ERC-20 path, 6 decimals
    expect(result.current.data?.qcad?.[0].chain).toBe('Ethereum');
    expect(result.current.data?.qcad?.[0].amount).toBeGreaterThan(0);
  });

  it('yields null for an asset whose fetch fails without losing the others', async () => {
    const fetchMock = vi.fn(async (url: string) => {
      if (typeof url === 'string' && url.includes('llama')) {
        return new Response(JSON.stringify(llamaResponse), { status: 200 });
      }
      return new Response('boom', { status: 500 });
    });
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useCountryReserves('canada'));
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data?.qcad).toBeNull();
    expect(result.current.data?.cadc).not.toBeNull();
  });
});

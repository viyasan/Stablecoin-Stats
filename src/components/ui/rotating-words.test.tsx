import { describe, it, expect, vi, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MotionGlobalConfig } from 'motion/react';
import { RotatingWords } from './rotating-words';

describe('RotatingWords', () => {
  beforeAll(() => {
    MotionGlobalConfig.skipAnimations = true;
  });
  afterAll(() => {
    MotionGlobalConfig.skipAnimations = false;
  });
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  const advance = async (ms: number) => {
    await act(async () => {
      await vi.advanceTimersByTimeAsync(ms);
    });
  };

  it('holds the first word, then cycles at the interval', async () => {
    render(<RotatingWords words={['digital dollars', 'USDC', 'USDT']} initialHoldMs={4000} intervalMs={2000} />);
    expect(screen.getByText('digital dollars')).toBeInTheDocument();

    await advance(3900);
    expect(screen.getByText('digital dollars')).toBeInTheDocument();
    expect(screen.queryByText('USDC')).not.toBeInTheDocument();

    await advance(200); // 4.1s: swapped (100ms slack for the exit frame)
    expect(screen.getByText('USDC')).toBeInTheDocument();

    await advance(2000);
    expect(screen.getByText('USDT')).toBeInTheDocument();
  });

  it('skips the first word on repeat when loopFirstWord is false', async () => {
    render(
      <RotatingWords words={['digital dollars', 'USDC', 'USDT']} initialHoldMs={1000} intervalMs={1000} loopFirstWord={false} />
    );
    await advance(1100); // -> USDC
    await advance(1000); // -> USDT
    await advance(1000); // -> back to USDC, not "digital dollars"
    expect(screen.getByText('USDC')).toBeInTheDocument();
    expect(screen.queryByText('digital dollars')).not.toBeInTheDocument();
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Marquee } from './marquee';

describe('Marquee', () => {
  it('repeats its content and hides the copies from screen readers', () => {
    const { container } = render(
      <Marquee repeat={3}>
        <span>Ethereum</span>
      </Marquee>
    );
    const copies = container.querySelectorAll('.animate-marquee');
    expect(copies).toHaveLength(3);
    expect(copies[0]).not.toHaveAttribute('aria-hidden');
    expect(copies[1]).toHaveAttribute('aria-hidden', 'true');
    // only the first copy is exposed to assistive tech
    expect(screen.getAllByText('Ethereum')).toHaveLength(3);
  });

  it('pauses on hover when asked', () => {
    const { container } = render(
      <Marquee pauseOnHover repeat={1}>
        <span>Tron</span>
      </Marquee>
    );
    expect(container.querySelector('.animate-marquee')).toHaveClass('group-hover:[animation-play-state:paused]');
  });
});

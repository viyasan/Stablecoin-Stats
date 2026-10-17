import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GlowingBorderCard } from './glowing-border-card';

describe('GlowingBorderCard', () => {
  it('renders its children', () => {
    render(<GlowingBorderCard>Canada</GlowingBorderCard>);
    expect(screen.getByText('Canada')).toBeInTheDocument();
  });

  it('shows the glow only while hovered and follows the cursor', () => {
    const { container } = render(<GlowingBorderCard>Canada</GlowingBorderCard>);
    const card = container.firstChild as HTMLElement;
    const glow = screen.getByTestId('glow');

    expect(glow).toHaveStyle({ opacity: '0' });

    fireEvent.mouseEnter(card);
    fireEvent.mouseMove(card, { clientX: 40, clientY: 25 });
    expect(glow).toHaveStyle({ opacity: '1' });
    expect(glow.style.background).toContain('40px 25px');

    fireEvent.mouseLeave(card);
    expect(glow).toHaveStyle({ opacity: '0' });
  });

  it('merges custom classes onto the wrapper', () => {
    const { container } = render(
      <GlowingBorderCard className="h-full shadow-sm">Canada</GlowingBorderCard>
    );
    expect(container.firstChild).toHaveClass('h-full', 'shadow-sm', 'rounded-2xl');
  });
});

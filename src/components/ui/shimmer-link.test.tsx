import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ShimmerLink } from './shimmer-link';

describe('ShimmerLink', () => {
  it('renders a navigation link with the shimmer overlay', () => {
    render(
      <MemoryRouter>
        <ShimmerLink to="/stats">Explore Stats</ShimmerLink>
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: 'Explore Stats' });
    expect(link).toHaveAttribute('href', '/stats');
    expect(link).toHaveClass('bg-primary', 'text-primary-foreground');
    expect(link.querySelector('[aria-hidden]')).toHaveClass('group-hover:translate-x-full');
  });
});

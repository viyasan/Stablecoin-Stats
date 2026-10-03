import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';

const renderHeader = (initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Header />
    </MemoryRouter>
  );
};

describe('Header', () => {
  it('renders the logo', () => {
    renderHeader();

    expect(screen.getByAltText('StablecoinStats logo')).toHaveAttribute('src', '/logo.png');
  });

  it('renders navigation links', () => {
    renderHeader();

    expect(screen.getByRole('link', { name: /overview/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /countries/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^regulation$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /news/i })).toBeInTheDocument();
  });

  it('logo links to home page', () => {
    renderHeader();

    const logoLink = screen.getByRole('link', { name: /stablecoinstats logo/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('overview link has correct href', () => {
    renderHeader();

    const overviewLink = screen.getByRole('link', { name: /^overview$/i });
    expect(overviewLink).toHaveAttribute('href', '/');
  });

  it('countries link has correct href', () => {
    renderHeader();

    const countriesLink = screen.getByRole('link', { name: /^countries$/i });
    expect(countriesLink).toHaveAttribute('href', '/countries');
  });

  it('regulation link has correct href', () => {
    renderHeader();

    const regulationLink = screen.getByRole('link', { name: /^regulation$/i });
    expect(regulationLink).toHaveAttribute('href', '/regulation');
  });

  it('news link has correct href', () => {
    renderHeader();

    const newsLink = screen.getByRole('link', { name: /news/i });
    expect(newsLink).toHaveAttribute('href', '/news');
  });

  it('renders mobile menu button', () => {
    renderHeader();

    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it('toggles mobile menu on button click', () => {
    renderHeader();

    const menuButton = screen.getByRole('button', { name: /toggle menu/i });

    // Mobile menu should not be visible initially
    expect(screen.queryByRole('navigation')).toBeInTheDocument(); // Desktop nav exists

    // Click to open mobile menu
    fireEvent.click(menuButton);

    // Mobile menu should now be visible (multiple nav links now appear)
    const countriesLinks = screen.getAllByRole('link', { name: /^countries$/i });
    expect(countriesLinks.length).toBeGreaterThanOrEqual(2); // Desktop + mobile
  });

  it('has sticky header styling', () => {
    const { container } = renderHeader();

    const header = container.querySelector('header');
    expect(header).toHaveClass('sticky', 'top-0', 'z-50');
  });

  it('has white background', () => {
    const { container } = renderHeader();

    const header = container.querySelector('header');
    expect(header).toHaveClass('bg-white');
  });

  it('highlights active navigation item', () => {
    renderHeader('/countries/canada');

    // The Countries link stays active on nested country routes
    const countriesLinks = screen.getAllByRole('link', { name: /^countries$/i });
    const desktopCountriesLink = countriesLinks[0];
    expect(desktopCountriesLink).toHaveClass('text-gold-600');
    expect(screen.getAllByRole('link', { name: /news/i })[0]).toHaveClass('text-chrome-500');
  });
});

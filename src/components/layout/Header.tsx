import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { to: '/', label: 'OVERVIEW' },
  { to: '/regulation', label: 'REGULATION' },
  { to: '/yields', label: 'YIELD' },
  { to: '/stats', label: 'STATS' },
  { to: '/countries', label: 'COUNTRIES' },
  { to: '/news', label: 'NEWS' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-chrome-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="group transition-transform duration-150 ease-out hover:scale-[1.02] active:scale-[0.98] ml-4 flex items-center">
            <img
              src="/logo.png"
              alt="StablecoinStats logo"
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 font-mono text-sm font-medium tracking-[0.04em] uppercase transition-all duration-150 ease-out flex items-center gap-1.5 ${
                    isActive
                      ? 'text-gold-600'
                      : 'text-chrome-500 hover:text-gold-500'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-chrome-500 hover:text-chrome-800 hover:bg-chrome-100 rounded-lg transition-all duration-150 ease-out active:scale-95"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-chrome-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-4 py-2 font-mono text-sm font-medium tracking-[0.04em] uppercase transition-all duration-150 ease-out ${
                    isActive
                      ? 'text-gold-600'
                      : 'text-chrome-500 hover:text-gold-500'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

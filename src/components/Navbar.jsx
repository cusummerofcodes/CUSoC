import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/register/contributor', label: 'Contributors' },
    { to: '/register/mentor', label: 'Mentors' },
    { to: '/register/project', label: 'Projects' },
    { to: '/#timeline', label: 'Timeline', isAnchor: true },
  ];

  return (
    <nav className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[64px] sm:h-[72px]">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
              <img className="h-10 sm:h-14 w-auto" src="/cusoc.png" alt="CUSoC Logo" fetchPriority="high" />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(link =>
              link.isAnchor ? (
                <a
                  key={link.label}
                  href={link.to}
                  className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-gray-50"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    pathname === link.to
                      ? 'text-cusoc-red bg-red-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/register/contributor"
              className="px-5 py-2.5 bg-cusoc-red text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-all hover:shadow-[0_4px_12px_rgba(230,57,70,0.3)] hover:-translate-y-0.5"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile: Hamburger + Apply */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              to="/register/contributor"
              className="px-3.5 py-2 bg-cusoc-red text-white text-xs font-bold rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              Apply
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className={`block h-0.5 w-5 bg-gray-700 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-5 bg-gray-700 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-5 bg-gray-700 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-1">
          {navLinks.map(link =>
            link.isAnchor ? (
              <a
                key={link.label}
                href={link.to}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-cusoc-red hover:bg-red-50 px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === link.to
                    ? 'text-cusoc-red bg-red-50'
                    : 'text-gray-700 hover:text-cusoc-red hover:bg-red-50'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { pathname } = useLocation();

  const navLinks = [
    { to: '/register/contributor', label: 'Contributors' },
    { to: '/register/mentor', label: 'Mentors' },
    { to: '/register/project', label: 'Projects' },
    { to: '#timeline', label: 'Timeline', isAnchor: true },
  ];

  return (
    <nav className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img className="h-14 w-auto" src="/cusoc.png" alt="CUSoC Logo" />
            </Link>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(link =>
              link.isAnchor ? (
                <a
                  key={link.label}
                  href="/#timeline"
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

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/register/contributor"
              className="px-5 py-2.5 bg-cusoc-red text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-all hover:shadow-[0_4px_12px_rgba(230,57,70,0.3)] hover:-translate-y-0.5"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile menu placeholder */}
          <div className="md:hidden flex items-center">
            <Link to="/register/contributor" className="px-4 py-2 bg-cusoc-red text-white text-xs font-bold rounded-lg">
              Apply
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

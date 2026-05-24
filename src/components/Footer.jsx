import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-12 sm:pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand — full width on small, spans 2 cols on sm */}
          <div className="col-span-2">
            <img src="/CUSOC Logo.svg" alt="CUSoC Logo" className="h-10 sm:h-12 w-auto mb-3 sm:mb-4" />
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm font-medium">
              Chandigarh University Season of Code — A student-driven open-source program building the next generation of developers through real-world projects and mentorship.
            </p>
            <div className="flex items-center gap-3 sm:gap-4 mt-5 sm:mt-6">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-cusoc-red hover:text-white text-gray-600 transition-all text-sm font-bold">
                GH
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-cusoc-red hover:text-white text-gray-600 transition-all text-sm font-bold">
                TW
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-cusoc-red hover:text-white text-gray-600 transition-all text-sm font-bold">
                LI
              </a>
            </div>
          </div>

          {/* Apply */}
          <div>
            <h4 className="text-gray-900 font-black text-sm uppercase tracking-widest mb-3 sm:mb-4">Apply</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              <li><Link to="/register/contributor" className="text-gray-500 hover:text-cusoc-red text-sm font-medium transition-colors">As a Contributor</Link></li>
              <li><Link to="/register/mentor" className="text-gray-500 hover:text-cusoc-red text-sm font-medium transition-colors">As a Mentor</Link></li>
              <li><Link to="/register/project" className="text-gray-500 hover:text-cusoc-red text-sm font-medium transition-colors">Submit a Project</Link></li>
            </ul>
          </div>

          {/* Program */}
          <div>
            <h4 className="text-gray-900 font-black text-sm uppercase tracking-widest mb-3 sm:mb-4">Program</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              <li><a href="/#timeline" className="text-gray-500 hover:text-cusoc-red text-sm font-medium transition-colors">Timeline</a></li>
              <li><a href="/#applications" className="text-gray-500 hover:text-cusoc-red text-sm font-medium transition-colors">Portals</a></li>
              <li><Link to="/admin/login" className="text-gray-500 hover:text-cusoc-red text-sm font-medium transition-colors">Admin</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-5 sm:pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 text-center sm:text-left">
          <p className="text-xs text-gray-400 font-medium">© 2026 Chandigarh University Season of Code. All rights reserved.</p>
          <p className="text-xs text-gray-400 font-medium">Built with ❤️ by the CUSoC Team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

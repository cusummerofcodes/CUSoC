import { Link } from 'react-router-dom';

const ProjectPortal = () => {
  return (
    <div className="bg-[#FAFAFA] min-h-[calc(100vh-64px)] py-12 sm:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-[4.5rem] font-black mb-4 sm:mb-6 tracking-tight leading-tight">
            <span className="text-gray-900">Project </span>
            <span className="text-cusoc-red">Proposals</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-medium">
            Share your innovative project ideas with CUSoC. Whether from academia or industry, we want to hear about your vision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
          {/* Institutional Projects */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 shadow-xl relative flex flex-col h-full group">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-800 text-xs font-black uppercase tracking-widest rounded-full mb-5 sm:mb-6 w-fit border border-blue-100">FOR FACULTY</span>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 sm:mb-4 tracking-tight">Institutional Projects</h3>
            <p className="text-gray-600 font-medium mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">Present research-oriented or utility-focused projects from your department or research group.</p>
            <ul className="space-y-2.5 sm:space-y-3 mb-8 sm:mb-10 flex-grow">
              <li className="flex items-start text-sm text-gray-700 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-cusoc-red mt-1.5 mr-3 flex-shrink-0" /> Ideal for academic research</li>
              <li className="flex items-start text-sm text-gray-700 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-cusoc-red mt-1.5 mr-3 flex-shrink-0" /> 8-week structured timeline</li>
              <li className="flex items-start text-sm text-gray-700 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-cusoc-red mt-1.5 mr-3 flex-shrink-0" /> Mentor students on real projects</li>
            </ul>
            <Link to="/apply/project/institutional" className="block w-full py-3.5 sm:py-4 bg-gray-900 hover:bg-black text-white text-center font-bold rounded-xl transition-all shadow-sm hover:shadow-md mt-auto text-sm uppercase tracking-wider">
              Submit Institutional Project
            </Link>
          </div>

          {/* Industry Projects */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 shadow-xl relative flex flex-col h-full group">
            <span className="inline-block px-3 py-1 bg-yellow-50 text-yellow-800 text-xs font-black uppercase tracking-widest rounded-full mb-5 sm:mb-6 w-fit border border-yellow-100">FOR INDUSTRY</span>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 sm:mb-4 tracking-tight">Industry Projects</h3>
            <p className="text-gray-600 font-medium mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">Partner with CUSoC to develop products, features, or solutions with talented student developers.</p>
            <ul className="space-y-2.5 sm:space-y-3 mb-8 sm:mb-10 flex-grow">
              <li className="flex items-start text-sm text-gray-700 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-cusoc-red mt-1.5 mr-3 flex-shrink-0" /> Real-world product development</li>
              <li className="flex items-start text-sm text-gray-700 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-cusoc-red mt-1.5 mr-3 flex-shrink-0" /> Access to skilled developer talent</li>
              <li className="flex items-start text-sm text-gray-700 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-cusoc-red mt-1.5 mr-3 flex-shrink-0" /> Showcase company innovation</li>
            </ul>
            <Link to="/apply/project/industry" className="block w-full py-3.5 sm:py-4 bg-gray-900 hover:bg-black text-white text-center font-bold rounded-xl transition-all shadow-sm hover:shadow-md mt-auto text-sm uppercase tracking-wider">
              Submit Industry Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPortal;

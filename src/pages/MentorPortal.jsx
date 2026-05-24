import { Link } from 'react-router-dom';

const MentorPortal = () => {
  return (
    <div className="bg-[#FAFAFA] min-h-[calc(100vh-64px)] py-12 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-[4.5rem] font-black mb-4 sm:mb-6 tracking-tight leading-tight">
            <span className="text-gray-900">Mentor </span>
            <span className="text-cusoc-red">Applications</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-medium">
            Join our mentorship program and guide the next generation of developers through their CUSoC journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {/* Industry Mentor */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 shadow-xl relative flex flex-col h-full group">
            <span className="inline-block px-3 py-1 bg-purple-50 text-purple-800 text-xs font-black uppercase tracking-widest rounded-full mb-5 sm:mb-6 w-fit border border-purple-100">INDUSTRY</span>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 sm:mb-4 tracking-tight">Industry Mentor</h3>
            <p className="text-gray-600 font-medium mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">Share your professional expertise and industry insights with aspiring developers.</p>
            <ul className="space-y-2.5 sm:space-y-3 mb-8 sm:mb-10 flex-grow">
              <li className="flex items-start text-sm text-gray-700 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-cusoc-red mt-1.5 mr-3 flex-shrink-0" /> 5+ years of experience</li>
              <li className="flex items-start text-sm text-gray-700 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-cusoc-red mt-1.5 mr-3 flex-shrink-0" /> Guide real-world projects</li>
              <li className="flex items-start text-sm text-gray-700 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-cusoc-red mt-1.5 mr-3 flex-shrink-0" /> Shape the future talent</li>
            </ul>
            <Link to="/apply/mentor/industry" className="block w-full py-3.5 sm:py-4 bg-gray-900 hover:bg-black text-white text-center font-bold rounded-xl transition-all shadow-sm hover:shadow-md mt-auto text-sm uppercase tracking-wider">
              Apply as Industry Mentor
            </Link>
          </div>

          {/* Faculty Mentor */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 shadow-xl relative flex flex-col h-full group">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-800 text-xs font-black uppercase tracking-widest rounded-full mb-5 sm:mb-6 w-fit border border-blue-100">FACULTY</span>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 sm:mb-4 tracking-tight">Faculty Mentor</h3>
            <p className="text-gray-600 font-medium mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">Lead research and academic projects with hands-on mentorship for students.</p>
            <ul className="space-y-2.5 sm:space-y-3 mb-8 sm:mb-10 flex-grow">
              <li className="flex items-start text-sm text-gray-700 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-cusoc-red mt-1.5 mr-3 flex-shrink-0" /> From CU Faculty members</li>
              <li className="flex items-start text-sm text-gray-700 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-cusoc-red mt-1.5 mr-3 flex-shrink-0" /> Research &amp; academic guidance</li>
              <li className="flex items-start text-sm text-gray-700 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-cusoc-red mt-1.5 mr-3 flex-shrink-0" /> Develop future researchers</li>
            </ul>
            <Link to="/apply/mentor/faculty" className="block w-full py-3.5 sm:py-4 bg-gray-900 hover:bg-black text-white text-center font-bold rounded-xl transition-all shadow-sm hover:shadow-md mt-auto text-sm uppercase tracking-wider">
              Apply as Faculty Mentor
            </Link>
          </div>

          {/* Student Mentor */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 shadow-xl relative flex flex-col h-full group sm:col-span-2 lg:col-span-1">
            <span className="inline-block px-3 py-1 bg-green-50 text-green-800 text-xs font-black uppercase tracking-widest rounded-full mb-5 sm:mb-6 w-fit border border-green-100">STUDENT</span>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 sm:mb-4 tracking-tight">Student Mentor</h3>
            <p className="text-gray-600 font-medium mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">Help your peers grow by sharing knowledge and offering peer mentorship.</p>
            <ul className="space-y-2.5 sm:space-y-3 mb-8 sm:mb-10 flex-grow">
              <li className="flex items-start text-sm text-gray-700 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-cusoc-red mt-1.5 mr-3 flex-shrink-0" /> 3rd/4th year students</li>
              <li className="flex items-start text-sm text-gray-700 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-cusoc-red mt-1.5 mr-3 flex-shrink-0" /> Peer mentorship &amp; support</li>
              <li className="flex items-start text-sm text-gray-700 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-cusoc-red mt-1.5 mr-3 flex-shrink-0" /> Build leadership skills</li>
            </ul>
            <Link to="/apply/mentor/student" className="block w-full py-3.5 sm:py-4 bg-gray-900 hover:bg-black text-white text-center font-bold rounded-xl transition-all shadow-sm hover:shadow-md mt-auto text-sm uppercase tracking-wider">
              Apply as Student Mentor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorPortal;

import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-[#FAFAFA] text-gray-900 min-h-screen relative font-space-grotesk">

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:64px_64px] -z-20 pointer-events-none" />

      {/* Glowing Orbs — scaled down on mobile */}
      <div className="absolute top-[-15%] left-[-15%] w-[70%] sm:w-[50%] h-[40%] sm:h-[50%] rounded-full bg-cusoc-red/10 blur-[80px] sm:blur-[120px] -z-10 mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[80%] sm:w-[60%] h-[40%] sm:h-[60%] rounded-full bg-blue-500/10 blur-[100px] sm:blur-[150px] -z-10 mix-blend-multiply pointer-events-none" />

      {/* ─── Hero Section ─── */}
      <section className="relative pt-10 sm:pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-72px)] gap-10 lg:gap-0">

        {/* Background Watermark Video — contained & not overflowing on mobile */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden mix-blend-multiply"
          style={{ WebkitMaskImage: 'linear-gradient(to top, transparent 15%, black 25%)', maskImage: 'linear-gradient(to top, transparent 15%, black 25%)' }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            src="/CUSOC logo reveal.mp4"
            className="w-[90%] sm:w-[70%] lg:w-full max-w-2xl lg:max-w-full h-auto object-contain opacity-[0.25] sm:opacity-[0.3] select-none blur-[1px] sm:blur-[2px] brightness-110 contrast-125"
          />
        </div>

        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col z-10 relative text-center lg:text-left items-center lg:items-start">
          {/* Label */}
          <div className="flex items-center text-cusoc-red tracking-[0.3em] text-xs mb-5 sm:mb-6 font-bold uppercase">
            <span className="w-8 sm:w-10 h-[2px] bg-cusoc-red mr-3 sm:mr-4 opacity-80" />
            CUSoC
            <span className="w-8 sm:w-10 h-[2px] bg-cusoc-red ml-3 sm:ml-4 opacity-80" />
          </div>

          {/* Headline */}
          <h1 className="text-[2.8rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] font-black tracking-tighter leading-none mb-5 font-space-grotesk drop-shadow-sm">
            <div className="text-gray-900">Build.</div>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-cusoc-red to-red-600">Compete.</div>
            <div className="text-gray-900">Grow.</div>
          </h1>

          {/* Description card */}
          <div className="bg-white/40 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)] mb-6 w-full max-w-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
            <p className="text-gray-800 tracking-[0.15em] sm:tracking-[0.2em] text-xs font-black mb-3 uppercase relative z-10">
              Chandigarh University<br />Season of Code
            </p>
            <p className="text-gray-700 text-sm leading-relaxed font-medium relative z-10">
              Chandigarh University Season of Code is a student-driven open-source program
              where beginners become contributors, contributors become maintainers, and
              maintainers become builders through real-world projects, mentorship, and
              collaborative development.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 w-full">
            <a
              href="#applications"
              className="flex-1 sm:flex-none text-center px-6 sm:px-8 py-3 sm:py-3.5 bg-cusoc-red text-white text-sm font-bold rounded-md hover:bg-red-700 transition-all hover:shadow-[0_4px_15px_rgba(230,57,70,0.3)] hover:-translate-y-0.5"
            >
              APPLY NOW
            </a>
            <a
              href="#timeline"
              className="flex-1 sm:flex-none text-center px-6 sm:px-8 py-3 sm:py-3.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-md hover:bg-gray-50 transition-all hover:shadow-sm hover:-translate-y-0.5"
            >
              VIEW TIMELINE
            </a>
          </div>
        </div>

        {/* Right Content — Code Editor Mockup */}
        <div className="w-full lg:w-1/2 relative z-10 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[500px]">
            <div className="absolute inset-0 bg-cusoc-red/5 blur-[40px] sm:blur-[60px] -z-10 rounded-full" />
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/40 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] w-full transform hover:scale-[1.02] transition-transform duration-500">
              {/* Header */}
              <div className="flex items-center px-3 sm:px-4 py-2.5 sm:py-3 bg-white/30 border-b border-white/40">
                <div className="flex space-x-1.5 sm:space-x-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56] shadow-sm" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E] shadow-sm" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F] shadow-sm" />
                </div>
                <div className="mx-auto text-[10px] sm:text-[11px] text-gray-500 font-mono flex items-center font-medium tracking-wide">
                  <span className="text-gray-400 mr-1.5">{'</>'}</span> CUSoC.js
                </div>
                <div className="text-[9px] sm:text-[10px] text-gray-400 font-mono">UTF-8</div>
              </div>
              {/* Code Area */}
              <div className="p-4 sm:p-6 font-mono text-[11px] sm:text-[13px] leading-[1.6] overflow-hidden text-left flex bg-white/10">
                <div className="text-gray-400 select-none pr-3 sm:pr-4 text-right flex flex-col font-medium border-r border-gray-200 mr-3 sm:mr-4">
                  {[1,2,3,4,5,6,7,8,9,10].map(n => <span key={n}>{n}</span>)}
                </div>
                <div className="text-gray-800 flex-grow font-medium tracking-tight overflow-x-auto">
<div><span className="text-[#0000FF]">class</span> <span className="text-[#267F99]">CUSoC</span> {'{'}</div>
<div>{'  '}<span className="text-[#0000FF]">async</span> <span className="text-[#795E26]">join</span>() {'{'}</div>
<div>{'    '}<span className="text-[#001080]">console</span>.<span className="text-[#795E26]">log</span>(</div>
<div>{'      '}<span className="text-[#A31515]">&quot;Welcome to Open Source!&quot;</span></div>
<div>{'    '});</div>
<div>{'  '}{'}'}</div>
<br/>
<div>{'  '}<span className="text-[#0000FF]">static</span> <span className="text-[#0000FF]">async</span> <span className="text-[#795E26]">init</span>() {'{'}</div>
<div>{'    '}<span className="text-[#0000FF]">const</span> <span className="text-[#001080]">cohort</span> = <span className="text-[#0000FF]">new</span> <span className="text-[#267F99]">CUSoC</span>();</div>
<div>{'    '}<span className="text-[#AF00DB]">await</span> <span className="text-[#001080]">cohort</span>.<span className="text-[#795E26]">join</span>();</div>
<div>{'  '}{'}'}</div>
<div>{'}'}</div>
                </div>
              </div>
              {/* Footer */}
              <div className="flex justify-between items-center px-3 sm:px-4 py-2 bg-white/30 border-t border-white/40 text-[9px] sm:text-[10px] text-gray-600 font-mono">
                <div className="font-medium">{'>_'} Node 20.x</div>
                <div className="flex items-center font-medium"><span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#27C93F] mr-1.5 sm:mr-2 shadow-[0_0_6px_#27C93F]" />Ready</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Road to GSoC ─── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 scroll-mt-16 sm:scroll-mt-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 bg-white/60 backdrop-blur-xl border border-gray-200/60 rounded-3xl p-8 sm:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-gradient-to-l from-yellow-500/5 to-transparent pointer-events-none" />
          
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-gray-100 text-gray-700 text-xs font-black uppercase tracking-widest rounded-full mb-6 border border-gray-200">
              <img src="/GSOC Logo 1-2.png" alt="GSoC Logo" className="h-5 w-auto" />
              <span>The Bridge to Google Summer of Code</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-5 tracking-tight text-gray-900 leading-[1.1]">
              From Campus to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Global Open Source</span>
            </h2>
            
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-medium mb-8">
              CUSoC is designed to bridge the gap between academic learning and world-class open-source contribution. Our curriculum and projects are tailored to prepare you directly for the prestigious <b>Google Summer of Code (GSoC)</b>.
            </p>
          </div>

          <div className="w-full lg:w-1/2 relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50 bg-white transform hover:scale-[1.02] transition-transform duration-500">
            <video
              autoPlay
              muted
              playsInline
              onEnded={(e) => {
                const video = e.target;
                setTimeout(() => {
                  video.play();
                }, 1000);
              }}
              src="/Animated_logo_CUSoC_to_GSoC.mp4"
              className="w-full h-auto object-cover pointer-events-none mix-blend-multiply brightness-110 contrast-125"
            />
          </div>
          
        </div>
      </section>

      {/* ─── Application Portals ─── */}
      <section id="applications" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative scroll-mt-16 sm:scroll-mt-20">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black mb-3 sm:mb-4 tracking-tight text-gray-900">Application Portals</h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto font-medium">Join the upcoming cohort as a contributor, mentor, or propose a project to shape the future of open-source at CU.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {[
            {
              title: 'Contributor',
              desc: 'Register as an open-source contributor for the pilot program. Ideal for students looking to build real-world skills.',
              to: '/register/contributor',
              cta: 'Apply Now',
            },
            {
              title: 'Mentor',
              desc: 'Industry professionals, Faculty, and Senior Students. Guide real-world projects and mentor the next generation.',
              to: '/register/mentor',
              cta: 'Apply Now',
            },
            {
              title: 'Project',
              desc: 'Propose open-source projects for contributors to work on. Submit your ideas for the upcoming cohort.',
              to: '/register/project',
              cta: 'Submit Idea',
              last: true,
            },
          ].map(card => (
            <div
              key={card.title}
              className={`bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:-translate-y-2 transition-all duration-300 group hover:border-cusoc-red/30 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgb(230,57,70,0.1)] relative overflow-hidden flex flex-col h-full ${card.last ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cusoc-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900 group-hover:text-cusoc-red transition-colors tracking-tight">{card.title}</h3>
              <p className="text-gray-600 text-sm mb-6 sm:mb-8 leading-relaxed font-medium flex-grow">{card.desc}</p>
              <Link to={card.to} className="text-gray-900 font-bold text-sm flex items-center uppercase tracking-widest mt-auto group-hover:text-cusoc-red transition-colors">
                {card.cta} <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Program Timeline ─── */}
      <section id="timeline" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative scroll-mt-16 sm:scroll-mt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent -z-10" />
        <h2 className="text-3xl sm:text-4xl font-black mb-8 sm:mb-12 text-center tracking-tight text-gray-900">Program Timeline</h2>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-hidden bg-white rounded-2xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 lg:px-8 py-5 lg:py-6 whitespace-nowrap text-sm lg:text-base font-bold text-gray-900">Pilot Season Program</td>
                <td className="px-6 lg:px-8 py-5 lg:py-6 whitespace-nowrap text-sm font-bold text-cusoc-red">15 May 2026 – 15 July 2026</td>
                <td className="px-6 lg:px-8 py-5 lg:py-6 text-sm font-medium text-gray-600">Identification and training of high-potential contributors</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors bg-gray-50/50">
                <td className="px-6 lg:px-8 py-5 lg:py-6 whitespace-nowrap text-sm lg:text-base font-bold text-gray-900">Final Showcase &amp; Evaluation</td>
                <td className="px-6 lg:px-8 py-5 lg:py-6 whitespace-nowrap text-sm font-bold text-cusoc-red">21 July 2026</td>
                <td className="px-6 lg:px-8 py-5 lg:py-6 text-sm font-medium text-gray-600">Final assessment and project showcase</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 lg:px-8 py-5 lg:py-6 whitespace-nowrap text-sm lg:text-base font-bold text-gray-900">CUSoC Cohort Program</td>
                <td className="px-6 lg:px-8 py-5 lg:py-6 whitespace-nowrap text-sm font-bold text-cusoc-red">25 July 2026 – April 2027</td>
                <td className="px-6 lg:px-8 py-5 lg:py-6 text-sm font-medium text-gray-600">Long-term mentorship and production-scale engineering training</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile cards — table becomes stacked cards */}
        <div className="sm:hidden flex flex-col gap-4">
          {[
            {
              phase: 'Pilot Season Program',
              date: '15 May 2026 – 15 July 2026',
              desc: 'Identification and training of high-potential contributors',
              step: '01',
            },
            {
              phase: 'Final Showcase & Evaluation',
              date: '21 July 2026',
              desc: 'Final assessment and project showcase',
              step: '02',
            },
            {
              phase: 'CUSoC Cohort Program',
              date: '25 July 2026 – April 2027',
              desc: 'Long-term mentorship and production-scale engineering training',
              step: '03',
            },
          ].map(item => (
            <div key={item.step} className="bg-white rounded-2xl border border-gray-200 shadow-[0_4px_16px_rgb(0,0,0,0.04)] p-5 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-cusoc-red/10 flex items-center justify-center flex-shrink-0">
                <span className="text-cusoc-red font-black text-xs">{item.step}</span>
              </div>
              <div>
                <p className="font-black text-gray-900 text-sm mb-0.5">{item.phase}</p>
                <p className="text-cusoc-red font-bold text-xs mb-1.5">{item.date}</p>
                <p className="text-gray-600 text-xs font-medium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default LandingPage;

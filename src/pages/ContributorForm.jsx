import { useState } from 'react';
import api from '../api';

const inputClass = "w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cusoc-red focus:ring-2 focus:ring-cusoc-red/10 transition-all text-sm";
const labelClass = "block text-sm font-semibold text-gray-700 mb-2";
const sectionClass = "mb-10";
const sectionTitleClass = "text-lg font-black text-gray-900 mb-6 pb-3 border-b-2 border-gray-100 uppercase tracking-wide";

const CheckboxGroup = ({ options, selected, onChange, cols = 3 }) => (
  <div className={`grid grid-cols-2 md:grid-cols-${cols} gap-3`}>
    {options.map(opt => (
      <label key={opt} className="flex items-start gap-2.5 cursor-pointer group">
        <input
          type="checkbox"
          checked={selected.includes(opt)}
          onChange={() => {
            if (selected.includes(opt)) onChange(selected.filter(s => s !== opt));
            else onChange([...selected, opt]);
          }}
          className="mt-0.5 w-4 h-4 rounded border-gray-300 text-cusoc-red accent-cusoc-red cursor-pointer flex-shrink-0"
        />
        <span className="text-sm text-gray-700 font-medium leading-tight group-hover:text-gray-900 transition-colors">{opt}</span>
      </label>
    ))}
  </div>
);

const RadioGroup = ({ options, value, onChange, inline = true }) => (
  <div className={`flex ${inline ? 'flex-row gap-6' : 'flex-col gap-3'}`}>
    {options.map(opt => (
      <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
        <input
          type="radio"
          checked={value === opt}
          onChange={() => onChange(opt)}
          className="w-4 h-4 border-gray-300 text-cusoc-red accent-cusoc-red cursor-pointer"
        />
        <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{opt}</span>
      </label>
    ))}
  </div>
);

const ConfidenceRater = ({ value, onChange }) => (
  <div className="flex gap-3">
    {[1, 2, 3, 4, 5].map(n => (
      <button
        key={n}
        type="button"
        onClick={() => onChange(n)}
        className={`w-11 h-11 rounded-full border-2 text-sm font-bold transition-all ${value === n
            ? 'bg-cusoc-red border-cusoc-red text-white shadow-[0_0_12px_rgba(230,57,70,0.3)]'
            : 'bg-white border-gray-300 text-gray-600 hover:border-cusoc-red hover:text-cusoc-red'
          }`}
      >
        {n}
      </button>
    ))}
  </div>
);

const ContributorForm = () => {
  const [formData, setFormData] = useState({
    fullName: '', email: '', contactNumber: '', university: '',
    degreeProgram: '', currentYear: '', linkedIn: '', gitHub: '',
    technicalSkills: '',
    technicalConfidence: 3,
    bestProject: '', projectLinks: '', openSourceContributions: '',
    workedInTeams: 'Yes',
    whyCUSoC: '', whatAchieve: '', whySelected: '',
    selfLearnedSkill: '',
    weeklyAvailability: '18–25 Hours',
    collabMode: 'Online',
  });

  const [areasOfInterest, setAreasOfInterest] = useState([]);
  const [comfortableWith, setComfortableWith] = useState([]);
  const [participatedIn, setParticipatedIn] = useState([]);
  const [preferredDomains, setPreferredDomains] = useState([]);
  const [preferredRole, setPreferredRole] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type === 'application/pdf') setFile(dropped);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setStatus('Please upload your resume PDF.');
    if (!confirmed) return setStatus('Please confirm the declaration before submitting.');
    setStatus('submitting');
    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v));
    data.append('areasOfInterest', JSON.stringify(areasOfInterest));
    data.append('comfortableWith', JSON.stringify(comfortableWith));
    data.append('participatedIn', JSON.stringify(participatedIn));
    data.append('preferredDomains', JSON.stringify(preferredDomains));
    data.append('preferredRole', JSON.stringify(preferredRole));
    data.append('resume', file);
    try {
      await api.post('/api/apply/contributor', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-[calc(100vh-72px)] bg-[#FAFAFA] flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-3">Application Submitted!</h2>
          <p className="text-gray-600 font-medium mb-8 leading-relaxed">Thank you for applying to CUSoC. We'll review your application and reach out via email soon.</p>
          <a href="/" className="inline-block px-8 py-3.5 bg-cusoc-red text-white font-bold rounded-xl hover:bg-red-700 transition-colors text-sm uppercase tracking-wider">Back to Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#FAFAFA] py-10 sm:py-16 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex justify-center mb-6">
          <img src="/CUSOC Logo.svg" alt="CUSoC Logo" className="h-14 w-auto" />
        </div>
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-cusoc-red/10 text-cusoc-red text-xs font-black uppercase tracking-widest rounded-full mb-4 border border-cusoc-red/20">
            ⚙ PILOT PROGRAM FORM
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
            <span className="text-gray-900">Cohort </span>
            <span className="text-cusoc-red">Registration</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Chandigarh University Season of Code Cohort — Start your open-source journey with our pilot and long-term programs.
          </p>
        </div>

        {(status === 'error' || (typeof status === 'string' && status.startsWith('Please'))) && (
          <div className="mb-8 p-4 rounded-xl text-center font-semibold text-sm bg-red-50 border border-red-100 text-cusoc-red">
            {status}
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-10">

            {/* SECTION 1 */}
            <div className={sectionClass}>
              <h2 className={sectionTitleClass}>Section 1 — Basic Information</h2>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>1. Full Name *</label>
                  <input required name="fullName" placeholder="Your full name" onChange={handleChange} className={inputClass} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>2. Email Address *</label>
                    <input required type="email" name="email" placeholder="you@email.com" onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>3. Contact Number *</label>
                    <input required name="contactNumber" placeholder="+91 XXXXX XXXXX" onChange={handleChange} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>4. University / Institution Name *</label>
                  <input required name="university" placeholder="e.g. Chandigarh University" onChange={handleChange} className={inputClass} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>5. Degree Program *</label>
                    <input required name="degreeProgram" placeholder="e.g. B.Tech CSE, MCA" onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>6. Current Year of Study *</label>
                    <select required name="currentYear" onChange={handleChange} className={inputClass + " text-gray-500"} defaultValue="">
                      <option value="" disabled>Select Year</option>
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>7. LinkedIn Profile</label>
                    <input name="linkedIn" placeholder="linkedin.com/in/yourname" onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>8. GitHub Profile *</label>
                    <input required name="gitHub" placeholder="github.com/yourhandle" onChange={handleChange} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>9. Resume/CV Upload (PDF only, Max size 5 MB) *</label>
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleFileDrop}
                    onClick={() => document.getElementById('resumeInput').click()}
                    className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${dragOver ? 'border-cusoc-red bg-red-50' : 'border-gray-300 hover:border-cusoc-red hover:bg-gray-50'
                      }`}
                  >
                    <svg className="w-10 h-10 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    {file ? (
                      <p className="text-sm font-semibold text-cusoc-red">✓ {file.name}</p>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400 mt-1">PDF (MAX. 5MB)</p>
                      </>
                    )}
                    <input id="resumeInput" type="file" accept=".pdf" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2 */}
            <div className={sectionClass}>
              <h2 className={sectionTitleClass}>Section 2 — Technical Background</h2>
              <div className="space-y-7">
                <div>
                  <label className={labelClass}>10. Primary Areas of Interest</label>
                  <CheckboxGroup
                    options={['Artificial Intelligence / Machine Learning', 'Data Science', 'Web Development', 'Mobile Development', 'Cybersecurity', 'Cloud / DevOps', 'UI/UX', 'Open Source', 'Research', 'IoT / Embedded Systems', 'Blockchain', 'Automation', 'Other']}
                    selected={areasOfInterest}
                    onChange={setAreasOfInterest}
                    cols={3}
                  />
                </div>
                <div>
                  <label className={labelClass}>11. Technical Skills (Programming Languages, Frameworks, Tools, Databases) *</label>
                  <textarea required name="technicalSkills" rows={3} placeholder="e.g. Python, React, PostgreSQL, AWS..." onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>12. Comfortable With</label>
                  <CheckboxGroup
                    options={['Git/GitHub', 'REST APIs', 'Linux', 'Docker', 'Research Writing', 'Team Collaboration', 'Agile/Scrum', 'Testing & Debugging']}
                    selected={comfortableWith}
                    onChange={setComfortableWith}
                    cols={4}
                  />
                </div>
                <div>
                  <label className={labelClass}>13. Rate Your Technical Confidence (1 = Beginner, 5 = Advanced)</label>
                  <ConfidenceRater value={formData.technicalConfidence} onChange={(v) => setFormData({ ...formData, technicalConfidence: v })} />
                </div>
              </div>
            </div>

            {/* SECTION 3 */}
            <div className={sectionClass}>
              <h2 className={sectionTitleClass}>Section 3 — Technical Projects & Experience</h2>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>14. Describe Your Best Technical Project *</label>
                  <p className="text-xs text-gray-400 mb-2">Explain the problem, technologies used, your contribution, and key outcomes.</p>
                  <textarea required name="bestProject" rows={5} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>15. Project Links (GitHub repos, deployed apps, etc.)</label>
                  <textarea name="projectLinks" rows={2} placeholder="https://github.com/..." onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>16. Open Source Contributions (Optional)</label>
                  <p className="text-xs text-gray-400 mb-2">Mention contributions, pull requests, issues, hackathons, or community participation.</p>
                  <textarea name="openSourceContributions" rows={3} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>17. Have You Worked in Teams Before?</label>
                  <RadioGroup options={['Yes', 'No']} value={formData.workedInTeams} onChange={(v) => setFormData({ ...formData, workedInTeams: v })} />
                </div>
              </div>
            </div>

            {/* SECTION 4 */}
            <div className={sectionClass}>
              <h2 className={sectionTitleClass}>Section 4 — Statement of Purpose</h2>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>18. Why do you want to join CUSoC? *</label>
                  <textarea required name="whyCUSoC" rows={4} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>19. What do you expect to learn during this 8-week program? *</label>
                  <textarea required name="whatAchieve" rows={4} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>20. Why should you be selected for the pilot cohort? *</label>
                  <textarea required name="whySelected" rows={4} onChange={handleChange} className={inputClass} />
                </div>
              </div>
            </div>

            {/* SECTION 5 */}
            <div className={sectionClass}>
              <h2 className={sectionTitleClass}>Section 5 — Learning Potential & Commitment</h2>
              <div className="space-y-7">
                <div>
                  <label className={labelClass}>21. Describe a technology or skill you learned on your own recently.</label>
                  <textarea name="selfLearnedSkill" rows={4} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>22. Have you participated in any of the following?</label>
                  <CheckboxGroup
                    options={['Hackathons', 'Open Source Programs', 'Research Projects', 'Freelancing', 'Internships', 'Technical Clubs', 'Competitive Programming', 'Community Events', 'None']}
                    selected={participatedIn}
                    onChange={setParticipatedIn}
                    cols={3}
                  />
                </div>
                <div>
                  <label className={labelClass}>23. Weekly Availability During Program *</label>
                  <RadioGroup
                    options={['18–25 Hours', '25+ Hours']}
                    value={formData.weeklyAvailability}
                    onChange={(v) => setFormData({ ...formData, weeklyAvailability: v })}
                  />
                </div>
              </div>
            </div>

            {/* SECTION 6 */}
            <div className={sectionClass}>
              <h2 className={sectionTitleClass}>Section 6 — Project Preferences</h2>
              <div className="space-y-7">
                <div>
                  <label className={labelClass}>26. Preferred Project Domains</label>
                  <CheckboxGroup
                    options={['AI/ML', 'Research', 'Web Development', 'Mobile Apps', 'Cybersecurity', 'Open Source', 'Institutional Tools', 'Data Science', 'Automation', 'IoT']}
                    selected={preferredDomains}
                    onChange={setPreferredDomains}
                    cols={3}
                  />
                </div>
                <div>
                  <label className={labelClass}>27. Preferred Role</label>
                  <CheckboxGroup
                    options={['Developer', 'Research Contributor', 'UI/UX Designer', 'Technical Writer', 'Data Analyst', 'QA/Testing']}
                    selected={preferredRole}
                    onChange={setPreferredRole}
                    cols={3}
                  />
                </div>
                <div>
                  <label className={labelClass}>28. Preferred Collaboration Mode *</label>
                  <RadioGroup
                    options={['Online', 'Offline', 'Hybrid']}
                    value={formData.collabMode}
                    onChange={(v) => setFormData({ ...formData, collabMode: v })}
                  />
                </div>
              </div>
            </div>

            {/* Declaration */}
            <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded border-gray-300 accent-cusoc-red cursor-pointer flex-shrink-0"
                />
                <span className="text-sm text-gray-700 font-medium leading-relaxed">
                  <span className="font-bold text-gray-900"></span> I confirm that the information provided is accurate and that I am committed to actively participating in the 8-week CUSoC pilot program, attending reviews, and collaborating ethically with mentors and contributors.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-4 bg-cusoc-red text-white font-bold rounded-xl hover:bg-red-700 transition-all hover:shadow-[0_4px_20px_rgba(230,57,70,0.35)] text-sm uppercase tracking-widest disabled:opacity-60"
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ContributorForm;

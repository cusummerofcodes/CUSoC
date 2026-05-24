import { useState } from 'react';
import api from '../api';

const inputClass = "w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cusoc-red focus:ring-2 focus:ring-cusoc-red/10 transition-all text-sm";
const labelClass = "block text-sm font-semibold text-gray-700 mb-2";
const sectionTitleClass = "text-base font-black text-cusoc-red mb-5 uppercase tracking-wide";

const CheckboxGroup = ({ options, selected, onChange, cols = 2 }) => (
  <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-3`}>
    {options.map(opt => (
      <label key={opt} className="flex items-start gap-2.5 cursor-pointer group">
        <input
          type="checkbox"
          checked={selected.includes(opt)}
          onChange={() => onChange(selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt])}
          className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-cusoc-red cursor-pointer flex-shrink-0"
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

const InstitutionalProjectForm = () => {
  const [formData, setFormData] = useState({
    facultyName: '', designation: 'Assistant Professor', department: '', employeeId: '',
    email: '', contactNumber: '', linkedIn: '',
    projectTitle: '', projectType: 'Select Type', difficultyLevel: 'Beginner Friendly', projectAbstract: '',
    problemStatement: '', proposedSolution: '', expectedDeliverables: '', currentStatus: 'Idea Stage',
    preferredTech: '', mentorAvailability: '3-5 Hours', collaborationMode: 'Hybrid',
    repoLink: '', learningOutcomes: '', successEvaluation: '',
    sensitiveData: 'No'
  });
  
  const [projectDomain, setProjectDomain] = useState([]);
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [preferredLevel, setPreferredLevel] = useState([]);
  const [preferredRoles, setPreferredRoles] = useState([]);
  const [resourcesAvailable, setResourcesAvailable] = useState([]);
  const [expectedOutcomes, setExpectedOutcomes] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!confirmed) return setStatus('Please confirm the declaration before submitting.');
    setStatus('submitting');
    try {
      const payload = {
        // Section 1 — Faculty Info
        proposerName: formData.facultyName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        linkedIn: formData.linkedIn,
        affiliation: 'Faculty',
        designation: formData.designation,
        department: formData.department,
        employeeId: formData.employeeId,

        // Section 2 — Project Overview
        projectTitle: formData.projectTitle,
        projectDomain,
        projectType: formData.projectType,
        difficultyLevel: formData.difficultyLevel,
        projectAbstract: formData.projectAbstract,

        // Section 3 — Scope
        problemStatement: formData.problemStatement,
        proposedSolution: formData.proposedSolution,
        expectedDeliverables: formData.expectedDeliverables,
        currentStatus: formData.currentStatus,
        estimatedDuration: '8 weeks',

        // Section 4 — Technical
        requiredSkills,
        techStack: formData.preferredTech,
        preferredLevel,
        preferredRoles,

        // Section 5 — Mentorship
        mentorAvailability: formData.mentorAvailability,
        collaborationMode: formData.collaborationMode,
        resourcesAvailable,
        repoLink: formData.repoLink,
        gitHub: formData.repoLink,
        willingToMentor: true,

        // Section 6 — Outcomes
        expectedOutcomes,
        learningOutcomes: formData.learningOutcomes,
        successEvaluation: formData.successEvaluation,

        // Section 7 — Compliance
        sensitiveData: formData.sensitiveData,
      };
      await api.post('/api/apply/project', payload);
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
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-3">Proposal Submitted!</h2>
          <p className="text-gray-600 font-medium mb-8 leading-relaxed">Thank you for proposing an Institutional Project. We'll review your submission and reach out via email.</p>
          <a href="/" className="inline-block px-8 py-3.5 bg-cusoc-red text-white font-bold rounded-xl hover:bg-red-700 transition-colors text-sm uppercase tracking-wider">Back to Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#FAFAFA] py-10 sm:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <img src="/cusoc.png" alt="CUSoC Logo" className="h-14 w-auto" />
        </div>
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-50 text-blue-800 text-xs font-black uppercase tracking-widest rounded-full mb-4 border border-blue-200">
            🎓 FOR FACULTY
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-3">
            <span className="text-gray-900">Institutional Project </span>
            <span className="text-cusoc-red">Proposal</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Propose your research, infrastructure, or academic project for CUSoC 2026.
            <br />Let students contribute to meaningful institutional initiatives.
          </p>
        </div>

        {(status === 'error' || (typeof status === 'string' && status.startsWith('Please'))) && (
          <div className="mb-8 p-4 rounded-xl text-center font-semibold text-sm bg-red-50 border border-red-100 text-cusoc-red">{status}</div>
        )}

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-12">

            {/* SECTION 1 */}
            <div>
              <h2 className={sectionTitleClass}>SECTION 1 — Faculty Information</h2>
              <div className="space-y-5">
                <div><label className={labelClass}>Faculty Name</label><input required name="facultyName" onChange={handleChange} className={inputClass} /></div>
                <div>
                  <label className={labelClass}>Designation</label>
                  <select name="designation" onChange={handleChange} className={inputClass}>
                    <option>Assistant Professor</option><option>Associate Professor</option><option>Professor</option><option>Other</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div><label className={labelClass}>Department</label><input required name="department" onChange={handleChange} className={inputClass} /></div>
                  <div><label className={labelClass}>Employee ID</label><input required name="employeeId" onChange={handleChange} className={inputClass} /></div>
                </div>
                <div><label className={labelClass}>Official University Email</label><input required type="email" name="email" placeholder="name@cumail.in" onChange={handleChange} className={inputClass} /></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div><label className={labelClass}>Contact Number</label><input required name="contactNumber" onChange={handleChange} className={inputClass} /></div>
                  <div><label className={labelClass}>LinkedIn / Faculty Profile (Optional)</label><input name="linkedIn" onChange={handleChange} className={inputClass} /></div>
                </div>
              </div>
            </div>

            {/* SECTION 2 */}
            <div>
              <h2 className={sectionTitleClass}>SECTION 2 — Project Overview</h2>
              <div className="space-y-5">
                <div><label className={labelClass}>Project Title</label><input required name="projectTitle" onChange={handleChange} className={inputClass} /></div>
                <div>
                  <label className={labelClass}>Project Domain (Multiple Choice)</label>
                  <CheckboxGroup
                    options={[
                      'Artificial Intelligence / Machine Learning', 'Data Science',
                      'Web Development', 'Mobile Development',
                      'Cybersecurity', 'Cloud / DevOps',
                      'IoT / Embedded Systems', 'Open Source',
                      'Research Software', 'Automation',
                      'Institutional Infrastructure', 'Blockchain',
                      'UI/UX', 'Other'
                    ]}
                    selected={projectDomain}
                    onChange={setProjectDomain}
                    cols={2}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Project Type</label>
                    <select name="projectType" onChange={handleChange} className={inputClass}>
                      <option>Select Type</option><option>Research Oriented</option><option>Infrastructure/Tooling</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Difficulty Level</label>
                    <select name="difficultyLevel" onChange={handleChange} className={inputClass}>
                      <option>Beginner Friendly</option><option>Intermediate</option><option>Advanced</option>
                    </select>
                  </div>
                </div>
                <div><label className={labelClass}>Project Abstract</label><textarea required name="projectAbstract" rows="4" placeholder="Briefly describe the project, objectives, and expected outcomes." onChange={handleChange} className={inputClass} /></div>
              </div>
            </div>

            {/* SECTION 3 */}
            <div>
              <h2 className={sectionTitleClass}>SECTION 3 — Problem Statement & Scope</h2>
              <div className="space-y-5">
                <div><label className={labelClass}>Problem Statement</label><textarea required name="problemStatement" rows="4" placeholder="Describe the problem or institutional/research challenge this project addresses." onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>Proposed Solution</label><textarea required name="proposedSolution" rows="4" onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>Expected Deliverables After 8 Weeks</label><textarea required name="expectedDeliverables" rows="4" onChange={handleChange} className={inputClass} /></div>
                <div>
                  <label className={labelClass}>Current Project Status</label>
                  <select name="currentStatus" onChange={handleChange} className={inputClass}>
                    <option>Idea Stage</option><option>Planning</option><option>In Progress</option><option>Existing Codebase</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 4 */}
            <div>
              <h2 className={sectionTitleClass}>SECTION 4 — Technical Requirements</h2>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Required Skills</label>
                  <CheckboxGroup
                    options={[
                      'Python', 'JavaScript',
                      'React', 'Node.js',
                      'AI/ML', 'Data Analysis',
                      'UI/UX', 'Cloud',
                      'DevOps', 'Research Writing',
                      'API Development', 'Git/GitHub',
                      'Other'
                    ]}
                    selected={requiredSkills}
                    onChange={setRequiredSkills}
                    cols={2}
                  />
                </div>
                <div><label className={labelClass}>Preferred Technologies / Tools</label><input required name="preferredTech" onChange={handleChange} className={inputClass} /></div>
                <div>
                  <label className={labelClass}>Preferred Contributor Level</label>
                  <CheckboxGroup
                    options={['1st Year', '2nd Year', '3rd Year', 'Final Year']}
                    selected={preferredLevel}
                    onChange={setPreferredLevel}
                    cols={2}
                  />
                </div>
                <div>
                  <label className={labelClass}>Preferred Roles</label>
                  <CheckboxGroup
                    options={[
                      'Developer', 'Researcher',
                      'UI/UX Designer', 'Data Analyst',
                      'Technical Writer', 'QA/Testing'
                    ]}
                    selected={preferredRoles}
                    onChange={setPreferredRoles}
                    cols={2}
                  />
                </div>
              </div>
            </div>

            {/* SECTION 5 */}
            <div>
              <h2 className={sectionTitleClass}>SECTION 5 — Mentorship & Support</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Weekly Mentor Availability</label>
                    <select name="mentorAvailability" onChange={handleChange} className={inputClass}>
                      <option>1-2 Hours</option><option>3-5 Hours</option><option>5+ Hours</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Preferred Collaboration Mode</label>
                    <select name="collaborationMode" onChange={handleChange} className={inputClass}>
                      <option>Hybrid</option><option>Online</option><option>In-Person</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Resources Available</label>
                  <CheckboxGroup
                    options={[
                      'Datasets', 'APIs',
                      'Lab Access', 'GPU Resources',
                      'Hardware', 'Research Papers',
                      'Existing Codebase'
                    ]}
                    selected={resourcesAvailable}
                    onChange={setResourcesAvailable}
                    cols={2}
                  />
                </div>
                <div><label className={labelClass}>GitHub Repository / Documentation Links (Optional)</label><input name="repoLink" onChange={handleChange} className={inputClass} /></div>
              </div>
            </div>

            {/* SECTION 6 */}
            <div>
              <h2 className={sectionTitleClass}>SECTION 6 — Outcomes & Impact</h2>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Expected Outcomes</label>
                  <CheckboxGroup
                    options={[
                      'Working Prototype', 'Research Outcome',
                      'Open Source Repository', 'Institutional Tool',
                      'Research Publication', 'Dataset Creation',
                      'Automation System'
                    ]}
                    selected={expectedOutcomes}
                    onChange={setExpectedOutcomes}
                    cols={2}
                  />
                </div>
                <div><label className={labelClass}>Learning Outcomes for Contributors</label><textarea required name="learningOutcomes" rows="3" onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>How will project success be evaluated?</label><textarea required name="successEvaluation" rows="3" onChange={handleChange} className={inputClass} /></div>
              </div>
            </div>

            {/* SECTION 7 */}
            <div>
              <h2 className={sectionTitleClass}>SECTION 7 — Compliance & Declaration</h2>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Does the project involve sensitive/confidential data?</label>
                  <RadioGroup options={['Yes', 'No']} value={formData.sensitiveData} onChange={(v) => setFormData({...formData, sensitiveData: v})} />
                </div>
                <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={confirmed}
                      onChange={(e) => setConfirmed(e.target.checked)}
                      className="mt-0.5 w-5 h-5 rounded border-gray-300 accent-cusoc-red cursor-pointer flex-shrink-0"
                    />
                    <span className="text-sm text-gray-700 font-medium leading-relaxed">
                      I confirm that the submitted project aligns with academic and ethical standards and is feasible within the 8-week CUSoC program duration.
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-4 mt-6 bg-cusoc-red text-white font-bold rounded-xl hover:bg-red-700 transition-all hover:shadow-[0_4px_20px_rgba(230,57,70,0.35)] text-sm uppercase tracking-widest disabled:opacity-60"
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit Institutional Project Proposal'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InstitutionalProjectForm;

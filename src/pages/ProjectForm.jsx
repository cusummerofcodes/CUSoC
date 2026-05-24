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

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    proposerName: '', email: '', affiliation: 'Faculty', gitHub: '',
    projectTitle: '', problemStatement: '',
    proposedSolution: '', techStack: '', expectedDeliverables: '',
    difficultyLevel: 'Beginner', estimatedDuration: '4 weeks',
    repoLink: '', willingToMentor: 'Yes', references: ''
  });
  
  const [projectDomain, setProjectDomain] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!confirmed) return setStatus('Please confirm the declaration before submitting.');
    setStatus('submitting');
    try {
      const payload = {
        ...formData,
        willingToMentor: formData.willingToMentor === 'Yes',
        projectDomain: projectDomain,
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
          <p className="text-gray-600 font-medium mb-8 leading-relaxed">Thank you for proposing a Project. We'll review your submission and reach out via email.</p>
          <a href="/" className="inline-block px-8 py-3.5 bg-cusoc-red text-white font-bold rounded-xl hover:bg-red-700 transition-colors text-sm uppercase tracking-wider">Back to Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#FAFAFA] py-10 sm:py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
          <img src="/cusoc.png" alt="CUSoC Logo" className="h-14 w-auto" />
        </div>
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gray-100 text-gray-700 text-xs font-black uppercase tracking-widest rounded-full mb-4 border border-gray-200">
            📝 OPEN SOURCE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
            <span className="text-gray-900">Project </span>
            <span className="text-cusoc-red">Proposal</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Submit your project idea for the upcoming CUSoC cohort. Provide clear requirements and a strong vision so contributors can execute your idea.
          </p>
        </div>

        {(status === 'error' || (typeof status === 'string' && status.startsWith('Please'))) && (
          <div className="mb-8 p-4 rounded-xl text-center font-semibold text-sm bg-red-50 border border-red-100 text-cusoc-red">{status}</div>
        )}

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Proposer Details */}
            <div>
              <h2 className={sectionTitleClass}>Proposer Details</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Proposer Full Name *</label>
                    <input required name="proposerName" value={formData.proposerName} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Affiliation *</label>
                    <select name="affiliation" value={formData.affiliation} onChange={handleChange} className={inputClass}>
                      <option>Faculty</option>
                      <option>Student</option>
                      <option>Staff</option>
                      <option>External / Open Source</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>GitHub Profile</label>
                    <input name="gitHub" value={formData.gitHub} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div>
              <h2 className={sectionTitleClass}>Project Details</h2>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Project Title *</label>
                  <input required name="projectTitle" value={formData.projectTitle} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Project Domain *</label>
                  <CheckboxGroup
                    options={['Web Development', 'Mobile Apps', 'AI/ML', 'Data Science', 'Cloud/DevOps', 'Cybersecurity', 'IoT / Hardware', 'Blockchain', 'UI/UX Design', 'Other']}
                    selected={projectDomain}
                    onChange={setProjectDomain}
                    cols={2}
                  />
                </div>
                <div>
                  <label className={labelClass}>Problem Statement *</label>
                  <textarea required name="problemStatement" rows="3" value={formData.problemStatement} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Proposed Solution *</label>
                  <textarea required name="proposedSolution" rows="3" value={formData.proposedSolution} onChange={handleChange} className={inputClass} />
                </div>
              </div>
            </div>

            {/* Technical Requirements */}
            <div>
              <h2 className={sectionTitleClass}>Technical Requirements</h2>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Required Tech Stack *</label>
                  <input required name="techStack" value={formData.techStack} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Expected Deliverables *</label>
                  <input required name="expectedDeliverables" value={formData.expectedDeliverables} onChange={handleChange} className={inputClass} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Difficulty Level *</label>
                    <select name="difficultyLevel" value={formData.difficultyLevel} onChange={handleChange} className={inputClass}>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Estimated Duration *</label>
                    <select name="estimatedDuration" value={formData.estimatedDuration} onChange={handleChange} className={inputClass}>
                      <option>4 weeks</option>
                      <option>6 weeks</option>
                      <option>8 weeks</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Are you willing to mentor this project? *</label>
                    <RadioGroup options={['Yes', 'No']} value={formData.willingToMentor} onChange={(v) => setFormData({...formData, willingToMentor: v})} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Existing Codebase / Repo Link</label>
                  <input name="repoLink" value={formData.repoLink} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>References / Similar Projects</label>
                  <textarea name="references" rows="2" value={formData.references} onChange={handleChange} className={inputClass} />
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
                  I confirm that this project proposal is accurate and I understand that it is subject to review by the CUSoC organizing team.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-4 bg-cusoc-red text-white font-bold rounded-xl hover:bg-red-700 transition-all hover:shadow-[0_4px_20px_rgba(230,57,70,0.35)] text-sm uppercase tracking-widest disabled:opacity-60"
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit Project Proposal'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;

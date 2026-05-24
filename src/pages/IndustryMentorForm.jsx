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

const IndustryMentorForm = () => {
  const [formData, setFormData] = useState({
    fullName: '', email: '', contactNumber: '', linkedIn: '',
    currentCompany: '', designation: '', yearsOfExperience: '',
    mentorshipGoals: '', mentorshipStyle: '', mentoringExperience: '',
    availableHours: '3–5 Hours', collabMode: 'Hybrid', maxMentees: '',
    whyMentor: '',
  });

  const [industriesFocus, setIndustriesFocus] = useState([]);
  const [areasOfExpertise, setAreasOfExpertise] = useState([]);
  const [canProvide, setCanProvide] = useState([
    'Provide regular feedback on mentees\' work',
    'Guide on project selection and planning',
    'Review code and technical implementations',
  ]);
  const [file, setFile] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setStatus('Please upload your resume PDF.');
    if (!confirmed) return setStatus('Please confirm the declaration before submitting.');
    setStatus('submitting');
    const data = new FormData();
    data.append('mentorType', 'Industry');
    Object.entries(formData).forEach(([k, v]) => data.append(k, v));
    data.append('industriesFocus', JSON.stringify(industriesFocus));
    data.append('areasOfExpertise', JSON.stringify(areasOfExpertise));
    data.append('canProvide', JSON.stringify(canProvide));
    data.append('resume', file);
    try {
      await api.post('/api/apply/mentor', data, { headers: { 'Content-Type': 'multipart/form-data' } });
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
          <h2 className="text-4xl font-black text-gray-900 mb-3">Application Submitted!</h2>
          <p className="text-gray-600 font-medium mb-8 leading-relaxed">Thank you for applying as an Industry Mentor. We'll review your application and reach out via email.</p>
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
            ⚙ INDUSTRY MENTOR APPLICATION
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
            <span className="text-gray-900">Industry Mentor </span>
            <span className="text-cusoc-red">Application</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Share your professional expertise and guide the next generation of developers through their CUSoC projects.
          </p>
        </div>

        {(status === 'error' || (typeof status === 'string' && status.startsWith('Please'))) && (
          <div className="mb-8 p-4 rounded-xl text-center font-semibold text-sm bg-red-50 border border-red-100 text-cusoc-red">{status}</div>
        )}

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-10">

            {/* Basic Information */}
            <div>
              <h2 className={sectionTitleClass}>Basic Information</h2>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input required name="fullName" placeholder="Your full name" onChange={handleChange} className={inputClass} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Email *</label>
                    <input required type="email" name="email" placeholder="you@company.com" onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Contact Number *</label>
                    <input required name="contactNumber" placeholder="+91 XXXXX XXXXX" onChange={handleChange} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>LinkedIn Profile (Optional)</label>
                  <input name="linkedIn" placeholder="linkedin.com/in/yourname" onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Resume / CV (PDF, Max 5MB) *</label>
                  <div
                    onClick={() => document.getElementById('resumeInputIndustry').click()}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-cusoc-red hover:bg-gray-50 transition-all"
                  >
                    <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <input id="resumeInputIndustry" type="file" accept=".pdf" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Background */}
            <div>
              <h2 className={sectionTitleClass}>Professional Background</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Company Name *</label>
                    <input required name="currentCompany" placeholder="e.g. Google, Infosys" onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Designation / Role *</label>
                    <input required name="designation" placeholder="e.g. Senior Engineer" onChange={handleChange} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Years of Experience *</label>
                  <input required name="yearsOfExperience" placeholder="e.g., 5 years" onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Industries Focus</label>
                  <CheckboxGroup
                    options={['Software Development', 'Data Science', 'Cloud Computing', 'AI/ML', 'Cybersecurity', 'DevOps', 'Mobile Development', 'Web Development', 'Blockchain', 'IoT', 'Other']}
                    selected={industriesFocus}
                    onChange={setIndustriesFocus}
                    cols={2}
                  />
                </div>
              </div>
            </div>

            {/* Expertise & Skills */}
            <div>
              <h2 className={sectionTitleClass}>Expertise & Skills</h2>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Areas of Expertise</label>
                  <CheckboxGroup
                    options={['Backend Development', 'Frontend Development', 'Full-Stack Development', 'Mobile Development', 'Machine Learning', 'Data Engineering', 'DevOps', 'System Design', 'Architecture', 'Project Management', 'Other']}
                    selected={areasOfExpertise}
                    onChange={setAreasOfExpertise}
                    cols={2}
                  />
                </div>
                <div>
                  <label className={labelClass}>Mentorship Goals *</label>
                  <textarea required name="mentorshipGoals" rows={4} placeholder="What do you want to achieve as a mentor? How can you help students grow?" onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Mentorship Style (Optional)</label>
                  <textarea name="mentorshipStyle" rows={4} placeholder="Describe your mentoring approach" onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Previous Mentoring Experience (Optional)</label>
                  <textarea name="mentoringExperience" rows={4} placeholder="Have you mentored anyone before? Describe your experience." onChange={handleChange} className={inputClass} />
                </div>
              </div>
            </div>

            {/* Availability & Preferences */}
            <div>
              <h2 className={sectionTitleClass}>Availability & Preferences</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Available Hours per Week *</label>
                    <select name="availableHours" onChange={handleChange} className={inputClass}>
                      <option>3–5 Hours</option>
                      <option>5–8 Hours</option>
                      <option>8–12 Hours</option>
                      <option>12+ Hours</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Preferred Collaboration Mode *</label>
                    <select name="collabMode" onChange={handleChange} className={inputClass}>
                      <option>Hybrid</option>
                      <option>Online</option>
                      <option>In-Person</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Maximum Number of Mentees</label>
                  <input name="maxMentees" type="number" min="1" max="10" placeholder="e.g. 3" onChange={handleChange} className={inputClass} />
                </div>
              </div>
            </div>

            {/* What Can You Provide */}
            <div>
              <h2 className={sectionTitleClass}>What Can You Provide?</h2>
              <div className="space-y-3">
                {[
                  "Provide regular feedback on mentees' work",
                  "Guide on project selection and planning",
                  "Review code and technical implementations",
                  "Conduct mock interviews or career sessions",
                  "Share industry insights and real-world experience",
                ].map(item => (
                  <label key={item} className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={canProvide.includes(item)}
                      onChange={() => setCanProvide(canProvide.includes(item) ? canProvide.filter(c => c !== item) : [...canProvide, item])}
                      className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-cusoc-red cursor-pointer flex-shrink-0"
                    />
                    <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{item}</span>
                  </label>
                ))}
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
                  I commit to being an active and supportive mentor throughout the CUSoC program and will maintain ethical standards in my mentoring.
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

export default IndustryMentorForm;

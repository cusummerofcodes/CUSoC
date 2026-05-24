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

const FacultyMentorForm = () => {
  const [formData, setFormData] = useState({
    fullName: '', email: '', contactNumber: '', linkedIn: '',
    department: '', employeeId: '', officialEmail: '',
    mentorshipGoals: '', mentorshipApproach: '', mentoringExperience: '',
    availableHours: '3–5 Hours', collabMode: 'Hybrid', maxMentees: '',
  });

  const [researchAreas, setResearchAreas] = useState([]);
  const [areasOfExpertise, setAreasOfExpertise] = useState([]);
  const [canProvide, setCanProvide] = useState([
    'Provide regular feedback on mentees\' work',
    'Guide on project selection and planning',
    'Review code and technical implementations',
  ]);
  const [confirmed, setConfirmed] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSendOtp = async () => {
    if (!formData.officialEmail.endsWith('@cumail.in')) {
      setStatus('Please enter a valid @cumail.in email address.');
      return;
    }
    try {
      setStatus('Sending OTP...');
      await api.post('/api/apply/send-otp', { email: formData.officialEmail });
      setOtpSent(true);
      setStatus('');
    } catch (err) {
      setStatus(err.response?.data?.message || 'Failed to send OTP.');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return setStatus('Please enter the OTP.');
    try {
      setVerifying(true);
      await api.post('/api/apply/verify-otp', { email: formData.officialEmail, otp });
      setOtpVerified(true);
      setStatus('');
    } catch (err) {
      setStatus(err.response?.data?.message || 'Invalid OTP.');
    } finally {
      setVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) return setStatus('Please verify your official email before submitting.');
    if (!confirmed) return setStatus('Please confirm the declaration before submitting.');
    setStatus('submitting');
    const data = new FormData();
    data.append('mentorType', 'Faculty');
    Object.entries(formData).forEach(([k, v]) => data.append(k, v));
    data.append('researchAreas', JSON.stringify(researchAreas));
    data.append('areasOfExpertise', JSON.stringify(areasOfExpertise));
    data.append('canProvide', JSON.stringify(canProvide));
    
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
          <p className="text-gray-600 font-medium mb-8 leading-relaxed">Thank you for applying as a Faculty Mentor. We'll review your application and reach out via email.</p>
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
            ✨ FACULTY MENTOR APPLICATION
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
            <span className="text-gray-900">Faculty Mentor </span>
            <span className="text-cusoc-red">Application</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Lead research and academic initiatives while mentoring talented students through the CUSoC program.
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
                  <label className={labelClass}>Full Name</label>
                  <input required name="fullName" placeholder="" onChange={handleChange} className={inputClass} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Email</label>
                    <input 
                      required 
                      type="email" 
                      name="email" 
                      placeholder="name@cumail.in" 
                      pattern=".+@cumail\.in$"
                      title="Must be a valid @cumail.in email address"
                      onChange={handleChange} 
                      className={inputClass} 
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Contact Number</label>
                    <input required name="contactNumber" placeholder="" onChange={handleChange} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>LinkedIn Profile (Optional)</label>
                  <input name="linkedIn" placeholder="" onChange={handleChange} className={inputClass} />
                </div>
              </div>
            </div>

            {/* Academic Background */}
            <div>
              <h2 className={sectionTitleClass}>Academic Background</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Department</label>
                    <input required name="department" placeholder="" onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Employee ID</label>
                    <input required name="employeeId" placeholder="" onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                {/* Official Email + OTP */}
                <div>
                  <label className={labelClass}>Official Email</label>
                  <input
                    required
                    type="email"
                    name="officialEmail"
                    placeholder="name@cumail.in"
                    pattern=".+@cumail\.in$"
                    title="Must be a valid @cumail.in email address"
                    onChange={(e) => {
                      handleChange(e);
                      setOtpSent(false);
                      setOtpVerified(false);
                    }}
                    className={inputClass}
                    disabled={otpVerified}
                  />
                  
                  {!otpVerified && (
                    <div className="mt-3 border border-amber-200 bg-amber-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        <span className="text-xs font-bold text-amber-700">Email Verification Required</span>
                      </div>
                      
                      {!otpSent ? (
                        <>
                          <p className="text-xs text-amber-600 mb-3">Please verify your official @cumail.in email address to proceed.</p>
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            disabled={status === 'Sending OTP...'}
                            className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all bg-[#A88840] text-white hover:bg-[#8e7336] w-full md:w-auto disabled:opacity-70"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            {status === 'Sending OTP...' ? 'Sending...' : 'Send OTP to Email'}
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <p className="text-xs text-amber-600">OTP sent! Please check your email.</p>
                          <div className="flex items-center gap-3">
                            <input
                              type="text"
                              maxLength={6}
                              placeholder="Enter 6-digit OTP"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              className="w-40 bg-white border border-amber-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                            />
                            <button
                              type="button"
                              onClick={handleVerifyOtp}
                              disabled={verifying}
                              className="px-4 py-2 bg-amber-600 text-white text-xs font-bold rounded-lg hover:bg-amber-700 disabled:opacity-70"
                            >
                              {verifying ? 'Verifying...' : 'Verify OTP'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {otpVerified && (
                    <div className="mt-3 flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-semibold">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Email Verified Successfully
                    </div>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Research Areas / Specializations</label>
                  <CheckboxGroup
                    options={['Artificial Intelligence', 'Machine Learning', 'Data Science', 'Web Development', 'Mobile Development', 'Cloud Computing', 'Cybersecurity', 'IoT', 'Blockchain', 'Software Engineering', 'Other']}
                    selected={researchAreas}
                    onChange={setResearchAreas}
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
                    options={['Research Guidance', 'Project Development', 'Code Review', 'System Design', 'Architecture', 'Algorithm Design', 'Problem Solving', 'Technical Writing', 'Presentation Skills', 'Career Guidance', 'Other']}
                    selected={areasOfExpertise}
                    onChange={setAreasOfExpertise}
                    cols={2}
                  />
                </div>
                <div>
                  <label className={labelClass}>Mentorship Goals</label>
                  <textarea required name="mentorshipGoals" rows={4} placeholder="What do you want to achieve as a faculty mentor? How can you help students grow?" onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Mentorship Approach (Optional)</label>
                  <textarea name="mentorshipApproach" rows={4} placeholder="Describe your mentoring approach and philosophy" onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Previous Mentoring Experience (Optional)</label>
                  <textarea name="mentoringExperience" rows={4} placeholder="Describe your experience mentoring students or junior faculty" onChange={handleChange} className={inputClass} />
                </div>
              </div>
            </div>

            {/* Availability & Preferences */}
            <div>
              <h2 className={sectionTitleClass}>Availability & Preferences</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Available Hours per Week</label>
                    <select name="availableHours" onChange={handleChange} className={inputClass}>
                      <option>3–5 Hours</option>
                      <option>5–8 Hours</option>
                      <option>8–12 Hours</option>
                      <option>12+ Hours</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Preferred Collaboration Mode</label>
                    <select name="collabMode" onChange={handleChange} className={inputClass}>
                      <option>Hybrid</option>
                      <option>Online</option>
                      <option>In-Person</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Maximum Number of Mentees</label>
                  <input name="maxMentees" type="number" min="1" max="10" placeholder="" onChange={handleChange} className={inputClass} />
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
                  "Supervise research activities and academic output",
                  "Share academic resources and research material",
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

export default FacultyMentorForm;

import { useState } from 'react';
import api from '../api';

const MentorForm = () => {
  const [mentorType, setMentorType] = useState('Industry');
  const [formData, setFormData] = useState({
    fullName: '', email: '', contactNumber: '', linkedIn: '', gitHub: '',
    areasOfExpertise: '', mentoringExperience: '', whyMentor: '', availability: 5,
    collabMode: 'Online', currentCompany: '', designation: '', yearsOfExperience: '',
    industryDomain: '', department: '', researchAreas: '', publications: '',
    universityRollNumber: '', currentYearOfStudy: '3rd Year', degreeProgram: '', technicalSkills: ''
  });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    if (!file) return setStatus('Please upload your resume PDF.');
    
    const data = new FormData();
    data.append('mentorType', mentorType);
    Object.keys(formData).forEach(key => {
      let val = formData[key];
      if (key === 'areasOfExpertise') val = JSON.stringify(val.split(',').map(s => s.trim()));
      data.append(key, val);
    });
    data.append('resume', file);

    try {
      await api.post('/api/apply/mentor', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatus('Success! Your mentor application has been submitted.');
    } catch (err) {
      console.error(err);
      setStatus('Failed to submit. Please try again.');
    }
  };

  const inputClass = "w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all text-sm";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#FAFAFA] py-10 sm:py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
          <img src="/CUSOC Logo.svg" alt="CUSoC Logo" className="h-14 w-auto" />
        </div>
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-black uppercase tracking-widest rounded-full mb-4 border border-gray-200">MENTOR</span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 mb-3">Mentor Application</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium">
            Thank you for offering your expertise. Please select your mentor track and fill out the form below.
          </p>
        </div>
      
      {/* Mentor Type Selector */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {['Industry', 'Faculty', 'Student'].map(type => (
          <button 
            key={type}
            onClick={() => setMentorType(type)}
            className={`px-6 py-2 rounded-full border transition-all ${mentorType === type ? 'bg-cusoc-red border-cusoc-red text-white font-medium shadow-sm' : 'border-gray-300 text-gray-600 hover:bg-gray-50 bg-white'}`}
          >
            {type} Mentor
          </button>
        ))}
      </div>

        {status && (
          <div className={`mb-8 p-4 rounded-xl text-center font-semibold text-sm ${status.includes('Success') ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-100 text-cusoc-red'}`}>
            {status}
          </div>
        )}
        
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Common Fields */}
          <h3 className="text-lg font-black text-gray-900 mb-5 pb-2 border-b border-gray-100">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div><label className={labelClass}>Full Name *</label><input required name="fullName" onChange={handleChange} className={inputClass} /></div>
            <div><label className={labelClass}>Email *</label><input required type="email" name="email" onChange={handleChange} className={inputClass} /></div>
            <div><label className={labelClass}>Contact Number *</label><input required name="contactNumber" onChange={handleChange} className={inputClass} /></div>
            <div><label className={labelClass}>LinkedIn Profile *</label><input required name="linkedIn" onChange={handleChange} className={inputClass} /></div>
          </div>

          <div><label className={labelClass}>Resume (PDF) *</label>
            <input required type="file" accept=".pdf" onChange={handleFileChange} className={inputClass} />
          </div>
          <div><label className={labelClass}>Areas of Expertise (comma separated) *</label><input required name="areasOfExpertise" onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Why do you want to mentor? *</label><textarea required name="whyMentor" rows="3" onChange={handleChange} className={inputClass} /></div>

          {/* Industry Specific */}
          {mentorType === 'Industry' && (
            <div>
              <h3 className="text-lg font-black text-gray-900 mb-5 pb-2 border-b border-gray-100">Industry Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><label className={labelClass}>Current Company *</label><input required name="currentCompany" onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>Designation *</label><input required name="designation" onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>Years of Experience *</label><input required type="number" name="yearsOfExperience" onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>Industry Domain *</label><input required name="industryDomain" onChange={handleChange} className={inputClass} /></div>
              </div>
            </div>
          )}

          {/* Faculty Specific */}
          {mentorType === 'Faculty' && (
            <div>
              <h3 className="text-lg font-black text-gray-900 mb-5 pb-2 border-b border-gray-100">Academic Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><label className={labelClass}>Department *</label><input required name="department" onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>Research Areas *</label><input required name="researchAreas" onChange={handleChange} className={inputClass} /></div>
              </div>
            </div>
          )}

          {/* Student Specific */}
          {mentorType === 'Student' && (
            <div>
              <h3 className="text-lg font-black text-gray-900 mb-5 pb-2 border-b border-gray-100">Student Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><label className={labelClass}>University Roll Number *</label><input required name="universityRollNumber" onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>Degree Program *</label><input required name="degreeProgram" onChange={handleChange} className={inputClass} /></div>
                <div className="md:col-span-2"><label className={labelClass}>Technical Skills *</label><input required name="technicalSkills" onChange={handleChange} className={inputClass} /></div>
              </div>
            </div>
          )}

          <button type="submit" className="w-full py-4 bg-cusoc-red text-white rounded-xl hover:bg-red-700 transition-all font-bold text-sm uppercase tracking-wider hover:shadow-[0_4px_15px_rgba(230,57,70,0.3)]">Submit Application</button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default MentorForm;

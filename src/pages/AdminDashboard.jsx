import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AdminDashboard = () => {
  const [data, setData] = useState({ contributors: [], mentors: [], projects: [] });
  const [activeTab, setActiveTab] = useState('contributors');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) return navigate('/admin/login');

    const fetchData = async () => {
      try {
        const res = await api.get('/api/admin/submissions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
        }
      }
    };
    fetchData();
  }, [navigate]);

  const updateStatus = async (type, id, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      await api.put(`/api/admin/submissions/${type}/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(prev => ({
        ...prev,
        [`${type}s`]: prev[`${type}s`].map(item => item._id === id ? { ...item, status } : item)
      }));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const downloadResume = async (url, name) => {
    try {
      // Ensure it is HTTPS
      const secureUrl = url.replace('http://', 'https://');
      const response = await fetch(secureUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = blobUrl;
      const safeName = (name || 'resume').replace(/[^a-z0-9]/gi, '_').toLowerCase();
      a.download = `${safeName}_resume.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to securely download resume. It will open in a new tab instead.");
      window.open(url, "_blank");
    }
  };

  const exportToCSV = () => {
    const activeData = data[activeTab];
    if (!activeData.length) return alert('No data to export');
    
    // Safely parse arrays and objects to strings
    const replacer = (key, value) => {
      if (Array.isArray(value)) return value.join('; ');
      return value === null ? '' : value;
    };
    
    const header = Object.keys(activeData[0]).filter(k => k !== '__v' && k !== 'resumeUrl');
    const csv = [
      header.join(','),
      ...activeData.map(row => header.map(fieldName => {
        let val = row[fieldName];
        if (Array.isArray(val)) val = val.join('; ');
        return JSON.stringify(val ?? ''); // Quotes automatically handle internal commas
      }).join(','))
    ].join('\r\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cusoc_${activeTab}_export.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderTable = (items, type) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-100">
        <thead className="bg-gray-50/50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name/Title</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact/Email</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {items.map(item => (
            <tr key={item._id} className="hover:bg-gray-50/80 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                {item.fullName || item.proposerName} <br/>
                <span className="text-xs text-gray-500 font-medium mt-0.5 inline-block">
                  {item.projectTitle || (item.university ? `${item.university}` : item.mentorType ? `${item.mentorType} Mentor` : '')}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                {item.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full 
                  ${item.status === 'Approved' ? 'bg-green-50 text-green-700 border border-green-200' : 
                    item.status === 'Rejected' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold space-x-3 text-right">
                <button onClick={() => updateStatus(type, item._id, 'Approved')} className="text-green-600 hover:text-green-800 transition-colors">Approve</button>
                <button onClick={() => updateStatus(type, item._id, 'Rejected')} className="text-red-600 hover:text-red-800 transition-colors">Reject</button>
                {item.resumeUrl && <button onClick={() => downloadResume(item.resumeUrl, item.fullName || item.proposerName)} className="text-cusoc-red hover:text-red-800 transition-colors">Resume</button>}
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan="4" className="px-6 py-8 text-center text-sm text-gray-500 font-medium">
                No {activeTab} found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <img src="/cusoc.png" alt="CUSoC Logo" className="h-10 w-auto" />
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Dashboard</h1>
              <p className="text-sm font-medium text-gray-500 mt-1">Manage all program applications</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={exportToCSV} 
              className="px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
            >
              Export CSV
            </button>
            <button 
              onClick={() => { localStorage.removeItem('adminToken'); navigate('/admin/login'); }} 
              className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              Logout
            </button>
          </div>
        </div>
        
        <div className="flex space-x-8 mb-6 border-b border-gray-200">
          <button onClick={() => setActiveTab('contributors')} className={`pb-4 px-1 font-bold text-sm transition-colors ${activeTab === 'contributors' ? 'border-b-2 border-cusoc-red text-cusoc-red' : 'text-gray-500 hover:text-gray-800'}`}>Contributors ({data.contributors.length})</button>
          <button onClick={() => setActiveTab('mentors')} className={`pb-4 px-1 font-bold text-sm transition-colors ${activeTab === 'mentors' ? 'border-b-2 border-cusoc-red text-cusoc-red' : 'text-gray-500 hover:text-gray-800'}`}>Mentors ({data.mentors.length})</button>
          <button onClick={() => setActiveTab('projects')} className={`pb-4 px-1 font-bold text-sm transition-colors ${activeTab === 'projects' ? 'border-b-2 border-cusoc-red text-cusoc-red' : 'text-gray-500 hover:text-gray-800'}`}>Projects ({data.projects.length})</button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          {activeTab === 'contributors' && renderTable(data.contributors, 'contributor')}
          {activeTab === 'mentors' && renderTable(data.mentors, 'mentor')}
          {activeTab === 'projects' && renderTable(data.projects, 'project')}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

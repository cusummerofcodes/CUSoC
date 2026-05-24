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
    } catch {
      alert('Failed to update status');
    }
  };

  const downloadResume = async (url, name) => {
    try {
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
      console.error('Download failed:', error);
      window.open(url, '_blank');
    }
  };

  const exportToCSV = () => {
    const activeData = data[activeTab];
    if (!activeData.length) return alert('No data to export');
    const header = Object.keys(activeData[0]).filter(k => k !== '__v' && k !== 'resumeUrl');
    const csv = [
      header.join(','),
      ...activeData.map(row => header.map(fieldName => {
        let val = row[fieldName];
        if (Array.isArray(val)) val = val.join('; ');
        return JSON.stringify(val ?? '');
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

  const statusBadge = (status) => {
    const map = {
      Approved: 'bg-green-50 text-green-700 border-green-200',
      Rejected: 'bg-red-50 text-red-700 border-red-200',
    };
    return `px-2.5 py-0.5 inline-flex text-xs leading-5 font-bold rounded-full border ${map[status] || 'bg-yellow-50 text-yellow-700 border-yellow-200'}`;
  };

  /* ── Desktop Table ─────────────────────────────────────── */
  const renderTable = (items, type) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-100">
        <thead className="bg-gray-50/50">
          <tr>
            <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name / Title</th>
            <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Email</th>
            <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-4 sm:px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {items.map(item => (
            <tr key={item._id} className="hover:bg-gray-50/80 transition-colors">
              <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 font-bold">
                <div>{item.fullName || item.proposerName}</div>
                {/* Show email under name on mobile since email col is hidden */}
                <div className="text-xs text-gray-500 font-medium mt-0.5 sm:hidden">{item.email}</div>
                <div className="text-xs text-gray-400 font-medium mt-0.5">
                  {item.projectTitle || (item.university ? item.university : item.mentorType ? `${item.mentorType} Mentor` : '')}
                </div>
              </td>
              <td className="px-4 sm:px-6 py-4 text-sm text-gray-600 font-medium hidden sm:table-cell whitespace-nowrap">{item.email}</td>
              <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                <span className={statusBadge(item.status)}>{item.status}</span>
              </td>
              <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right">
                <div className="flex items-center justify-end gap-2 sm:gap-3 flex-wrap">
                  <button onClick={() => updateStatus(type, item._id, 'Approved')} className="text-xs sm:text-sm font-bold text-green-600 hover:text-green-800 transition-colors">Approve</button>
                  <button onClick={() => updateStatus(type, item._id, 'Rejected')} className="text-xs sm:text-sm font-bold text-red-600 hover:text-red-800 transition-colors">Reject</button>
                  {item.resumeUrl && (
                    <button onClick={() => downloadResume(item.resumeUrl, item.fullName || item.proposerName)} className="text-xs sm:text-sm font-bold text-cusoc-red hover:text-red-800 transition-colors">CV</button>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan="4" className="px-6 py-10 text-center text-sm text-gray-500 font-medium">
                No {activeTab} found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const tabs = [
    { key: 'contributors', label: 'Contributors', count: data.contributors.length },
    { key: 'mentors', label: 'Mentors', count: data.mentors.length },
    { key: 'projects', label: 'Projects', count: data.projects.length },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <img src="/cusoc.png" alt="CUSoC Logo" className="h-9 sm:h-10 w-auto" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Admin Dashboard</h1>
              <p className="text-xs sm:text-sm font-medium text-gray-500 mt-0.5">Manage all program applications</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={exportToCSV}
              className="flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 bg-gray-900 text-white text-xs sm:text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
            >
              Export CSV
            </button>
            <button
              onClick={() => { localStorage.removeItem('adminToken'); navigate('/admin/login'); }}
              className="flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 bg-white border border-gray-200 text-gray-700 text-xs sm:text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {tabs.map(t => (
            <div
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`bg-white rounded-xl border p-3 sm:p-5 cursor-pointer transition-all ${activeTab === t.key ? 'border-cusoc-red shadow-[0_0_0_2px_rgba(230,57,70,0.15)]' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <p className="text-xl sm:text-3xl font-black text-gray-900">{t.count}</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-500 mt-0.5">{t.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 sm:gap-0 sm:space-x-8 mb-4 sm:mb-6 border-b border-gray-200 overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`pb-3 sm:pb-4 px-2 sm:px-1 font-bold text-xs sm:text-sm transition-colors whitespace-nowrap ${activeTab === t.key ? 'border-b-2 border-cusoc-red text-cusoc-red' : 'text-gray-500 hover:text-gray-800'}`}
            >
              {t.label} ({t.count})
            </button>
          ))}
        </div>

        {/* Table */}
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

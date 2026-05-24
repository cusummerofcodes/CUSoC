import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/api/admin/login', { email, password });
      localStorage.setItem('adminToken', data.token);
      navigate('/admin');
    } catch (err) {
      setError('Invalid email or password');
      setLoading(false);
    }
  };

  if (localStorage.getItem('adminToken')) {
    return null;
  }

  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cusoc-red focus:ring-2 focus:ring-cusoc-red/10 focus:bg-white transition-all text-sm";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-72px)] bg-[#FAFAFA] px-4 py-12">
      <div className="w-full max-w-md bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-8 md:p-10">
        <div className="flex justify-center mb-8">
          <img src="/CUSOC Logo.svg" alt="CUSoC Logo" className="h-14 w-auto" />
        </div>
        
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-black uppercase tracking-widest rounded-full mb-3">ADMINISTRATION</span>
          <h2 className="text-3xl font-black tracking-tight text-gray-900">Sign In</h2>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl text-center font-semibold text-sm bg-red-50 border border-red-100 text-cusoc-red">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={labelClass}>Email Address</label>
            <input 
              required type="email" placeholder="admin@cusoc.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Password</label>
            <input 
              required type="password" placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 mt-2 bg-cusoc-red text-white font-bold rounded-xl hover:bg-red-700 transition-all hover:shadow-[0_4px_15px_rgba(230,57,70,0.3)] text-sm uppercase tracking-wider disabled:opacity-70"
          >
            {loading ? 'Authenticating...' : 'Access Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

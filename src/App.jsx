import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ContributorForm from './pages/ContributorForm';
import IndustryMentorForm from './pages/IndustryMentorForm';
import FacultyMentorForm from './pages/FacultyMentorForm';
import StudentMentorForm from './pages/StudentMentorForm';
import InstitutionalProjectForm from './pages/InstitutionalProjectForm';
import IndustryProjectForm from './pages/IndustryProjectForm';
import MentorPortal from './pages/MentorPortal';
import ProjectPortal from './pages/ProjectPortal';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // Add a tiny delay for smoothness
      setTimeout(() => setLoading(false), 500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#000511]">
        <div className="relative flex items-center justify-center">
          {/* Glowing pulse rings */}
          <div className="absolute w-32 h-32 border-4 border-[#0F62FE] rounded-full animate-ping opacity-20"></div>
          <div className="absolute w-40 h-40 border-2 border-[#0F62FE] rounded-full animate-ping opacity-10" style={{ animationDelay: '0.2s' }}></div>
          
          {/* Spinning gradient ring */}
          <div className="absolute w-24 h-24 rounded-full border-t-4 border-r-4 border-l-4 border-transparent border-t-[#0F62FE] border-r-[#0F62FE] animate-spin"></div>
          
          {/* Center logo/dot */}
          <div className="w-16 h-16 bg-[#000511] rounded-full z-10 flex items-center justify-center shadow-[0_0_20px_#0F62FE]">
            <img src="/cusoc.png" alt="CUSoC Logo" className="w-10 h-auto" />
          </div>
        </div>
        <h2 className="mt-8 text-xl font-semibold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#0F62FE] animate-pulse">
          INITIALIZING
        </h2>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register/contributor" element={<ContributorForm />} />
            <Route path="/register/mentor" element={<MentorPortal />} />
            <Route path="/register/project" element={<ProjectPortal />} />
            <Route path="/apply/mentor/industry" element={<IndustryMentorForm />} />
            <Route path="/apply/mentor/faculty" element={<FacultyMentorForm />} />
            <Route path="/apply/mentor/student" element={<StudentMentorForm />} />
            <Route path="/apply/project/institutional" element={<InstitutionalProjectForm />} />
            <Route path="/apply/project/industry" element={<IndustryProjectForm />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

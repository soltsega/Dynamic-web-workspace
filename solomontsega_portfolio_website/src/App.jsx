import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import Credentials from './pages/Credentials';
import Home from './pages/Home';
import './index.css';

function AppEffects() {
  const location = useLocation();

  useEffect(() => {
    const targetId = location.hash?.slice(1);

    const scrollToTarget = () => {
      if (targetId) {
        const element = document.getElementById(targetId);

        if (element) {
          const offset = window.innerWidth <= 768 ? 72 : 92;
          const top = element.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
          return;
        }
      }

      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    const timer = window.setTimeout(scrollToTarget, 50);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash]);



  return null;
}

function App() {
  return (
    <Router>
      <AppEffects />
      <div className="app-shell">
        <Navbar />
        <main id="main-content" className="site-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/credentials" element={<Credentials />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

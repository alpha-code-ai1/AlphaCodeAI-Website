import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import ArticlePage from './components/pages/ArticlePage';
import AuthorityPage from './components/pages/AuthorityPage';
import LightExperience from './components/pages/LightExperience';
import Footer from './components/layout/Footer';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';
import CosmicBackground from './components/ui/CosmicBackground';
import ScrollProgress from './components/ui/ScrollProgress';
import CursorGlow from './components/ui/CursorGlow';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import authorityPages from './data/authorityPages.json';
import './App.css';

const AppContent = () => {
  const { theme, isLight } = useTheme();
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname]);

  return (
    <div className={`app-root app-${theme}${isHomepage ? ' app-home' : ''}`}>
      {!isLight && !isHomepage && <CosmicBackground />}
      <ScrollProgress />
      <CursorGlow theme={theme} />
      {!isLight && !isHomepage && <div className="noise-overlay" />}
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.div
          key={`${theme}-${location.pathname}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="app-stage"
        >
          <Routes location={location}>
            <Route path="/" element={<LightExperience />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            {authorityPages.map((page) => (
              <Route key={page.path} path={page.path} element={<AuthorityPage />} />
            ))}
          </Routes>
          {!isHomepage && <Footer />}
        </motion.div>
      </AnimatePresence>

      <FloatingWhatsApp />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;

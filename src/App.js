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
import salesPages from './data/salesPages.json';
import SalesLandingPage from './components/pages/SalesLandingPage';
import './App.css';

const isSalesRoute = (pathname) => salesPages.some(page =>
  page.path === `${pathname.toLowerCase().replace(/\/$/, '')}/`
);

const AppContent = () => {
  const { theme, isLight } = useTheme();
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const isSalesPage = isSalesRoute(location.pathname);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname]);

  return (
    <div className={`app-root app-${theme}${isHomepage ? ' app-home' : ''}`}>
      {!isLight && !isHomepage && !isSalesPage && <CosmicBackground />}
      {!isSalesPage && <ScrollProgress />}
      {!isSalesPage && <CursorGlow theme={theme} />}
      {!isLight && !isHomepage && !isSalesPage && <div className="noise-overlay" />}
      {!isSalesPage && <Navbar />}

      <AnimatePresence mode="wait">
        <motion.div
          key={`${isSalesPage ? 'sales' : theme}-${location.pathname}`}
          initial={isSalesPage ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="app-stage"
        >
          <Routes location={location}>
            <Route path="/" element={<LightExperience />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            {salesPages.map(page => <Route key={page.path} path={page.path} element={<SalesLandingPage page={page} />} />)}
            {authorityPages.map((page) => (
              <Route key={page.path} path={page.path} element={<AuthorityPage />} />
            ))}
          </Routes>
          {!isHomepage && !isSalesPage && <Footer />}
        </motion.div>
      </AnimatePresence>

      {!isSalesPage && <FloatingWhatsApp />}
    </div>
  );
};

// Keep campaign defaults and manual toggles independent from the main site.
const RouteTheme = () => {
  const { pathname } = useLocation();
  const campaign = isSalesRoute(pathname);
  return (
    <ThemeProvider key={campaign ? 'campaign' : 'site'} initialTheme={campaign ? 'dark' : 'light'} campaign={campaign}>
      <AppContent />
    </ThemeProvider>
  );
};

function App() {
  return (
    <Router>
      <RouteTheme />
    </Router>
  );
}

export default App;

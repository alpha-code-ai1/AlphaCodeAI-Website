import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import AISolutionsSection from './components/sections/AISolutionsSection';
import PartnersSection from './components/sections/PartnersSection';
import ArticlesSection from './components/sections/ArticlesSection';
import ContactSection from './components/sections/ContactSection';
import ArticlePage from './components/pages/ArticlePage';
import LightExperience from './components/pages/LightExperience';
import Footer from './components/layout/Footer';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';
import CosmicBackground from './components/ui/CosmicBackground';
import ScrollProgress from './components/ui/ScrollProgress';
import CursorGlow from './components/ui/CursorGlow';
import MarqueeBand from './components/ui/MarqueeBand';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './App.css';

const DarkExperience = () => (
  <>
    <HeroSection />
    <MarqueeBand
      items={[
        'Artificial Intelligence',
        'Machine Learning',
        'Production Grade',
        'Idea to Deployment',
        'AlphaCodeAI'
      ]}
    />
    <PartnersSection />
    <ServicesSection />
    <MarqueeBand
      reverse
      items={[
        'Chatbots',
        'Trading Platforms',
        'Datastores',
        'Cloud',
        'Payments',
        'Digitization'
      ]}
    />
    <AISolutionsSection />
    <ArticlesSection />
    <ContactSection />
  </>
);

const AppContent = () => {
  const { theme, isLight } = useTheme();
  const location = useLocation();
  const lightHomepage = isLight && location.pathname === '/';

  return (
    <div className={`app-root app-${theme}`}>
      {!isLight && <CosmicBackground />}
      <ScrollProgress />
      {!isLight && <CursorGlow />}
      {!isLight && <div className="noise-overlay" />}
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
            <Route path="/" element={isLight ? <LightExperience /> : <DarkExperience />} />
            <Route path="/article/:id" element={<ArticlePage />} />
          </Routes>
          {!lightHomepage && <Footer />}
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

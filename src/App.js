import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import AISolutionsSection from './components/sections/AISolutionsSection';
import PartnersSection from './components/sections/PartnersSection';
import ArticlesSection from './components/sections/ArticlesSection';
import ContactSection from './components/sections/ContactSection';
import ArticlePage from './components/pages/ArticlePage';
import Footer from './components/layout/Footer';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';
import CosmicBackground from './components/ui/CosmicBackground';
import ScrollProgress from './components/ui/ScrollProgress';
import CursorGlow from './components/ui/CursorGlow';
import MarqueeBand from './components/ui/MarqueeBand';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-canvas font-sans text-slate-300 antialiased selection:bg-brand-violet/40">
        <CosmicBackground />
        <ScrollProgress />
        <CursorGlow />
        <div className="noise-overlay" />
        <Navbar />
        <div className="relative z-10">
          <Routes>
            <Route
              path="/"
              element={
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
              }
            />
            <Route path="/article/:id" element={<ArticlePage />} />
          </Routes>
          <Footer />
        </div>
        <FloatingWhatsApp />
      </div>
    </Router>
  );
}

export default App;

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
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-primary to-secondary">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <ServicesSection />
              <AISolutionsSection />
              <PartnersSection />
              <ArticlesSection />
              <ContactSection />
            </>
          } />
          <Route path="/article/:id" element={<ArticlePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

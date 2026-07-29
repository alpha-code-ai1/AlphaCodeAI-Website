import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import ThemeSwitch from '../ui/ThemeSwitch';

const navItems = ['Home', 'Services', 'Solutions', 'Articles', 'Contact'];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { isLight } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
      if (location.pathname !== '/') return;

      const scrollPosition = window.scrollY + 150;
      const visibleSections = navItems
        .map((item) => document.getElementById(item.toLowerCase()))
        .filter(Boolean);

      for (let index = visibleSections.length - 1; index >= 0; index -= 1) {
        if (scrollPosition >= visibleSections[index].offsetTop) {
          setActiveSection(visibleSections[index].id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, isLight]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => setIsMenuOpen(false), [isLight, location.pathname]);

  const handleNavClick = (itemId) => {
    setIsMenuOpen(false);

    const scrollToTarget = () => {
      const element = document.getElementById(itemId);
      if (!element) return;
      const headerOffset = isLight ? 104 : 90;
      const offsetPosition =
        element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    };

    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(scrollToTarget, 120);
      return;
    }

    scrollToTarget();
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`site-nav ${isLight ? 'site-nav--light' : 'site-nav--dark'} ${
        scrolled ? 'site-nav--scrolled' : ''
      }`}
    >
      <div className="site-nav__inner">
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="site-nav__brand"
          aria-label="AlphaCodeAI home"
        >
          <span className="site-nav__mark">
            <img src={`${process.env.PUBLIC_URL}/alpha.png`} alt="" />
          </span>
          <span className="site-nav__wordmark">
            Alpha<span>Code</span>AI
          </span>
        </button>

        <div className="site-nav__links">
          {navItems.map((item, index) => {
            const id = item.toLowerCase();
            const isActive = activeSection === id && location.pathname === '/';
            return (
              <button
                type="button"
                key={item}
                onClick={() => handleNavClick(id)}
                className={isActive ? 'is-active' : ''}
              >
                {isLight && <span>0{index + 1}</span>}
                {item}
                {isActive && !isLight && (
                  <motion.i
                    layoutId="navActive"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="site-nav__actions">
          <ThemeSwitch />
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className="site-nav__cta"
          >
            Let's talk
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="site-nav__menu-button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span className="sr-only">Toggle menu</span>
            {isMenuOpen ? <XMarkIcon /> : <Bars3Icon />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.5rem) 2rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)' }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="site-nav__mobile"
          >
            <div className="site-nav__mobile-list">
              {navItems.map((item, index) => (
                <motion.button
                  type="button"
                  key={item}
                  initial={{ opacity: 0, x: 35 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.05 + index * 0.045 }}
                  onClick={() => handleNavClick(item.toLowerCase())}
                >
                  <span>0{index + 1}</span>
                  {item}
                </motion.button>
              ))}
              <div className="site-nav__mobile-theme">
                <span>Choose your experience</span>
                <ThemeSwitch />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

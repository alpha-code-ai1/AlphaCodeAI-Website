import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navItems = ['Home', 'Services', 'Solutions', 'Articles', 'Contact'];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);

      const sections = navItems.map((item) => ({
        id: item.toLowerCase(),
        offset: document.getElementById(item.toLowerCase())?.offsetTop - 120
      }));

      const scrollPosition = window.scrollY;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offset && scrollPosition >= sections[i].offset) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (itemId) => {
    setIsMenuOpen(false);
    const element = document.getElementById(itemId);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-900/5 bg-white/70 shadow-soft backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-2.5"
          >
            <img
              src={`${process.env.PUBLIC_URL}/alpha.png`}
              alt="AlphaCodeAI"
              className="h-9 w-9 object-contain transition-transform group-hover:scale-110 group-hover:rotate-6"
            />
            <span className="font-display text-lg font-bold tracking-tight text-slate-900">
              Alpha<span className="text-gradient">Code</span>AI
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const id = item.toLowerCase();
              const isActive = activeSection === id;
              return (
                <button
                  key={item}
                  onClick={() => handleNavClick(id)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navActive"
                      className="absolute inset-0 rounded-full bg-brand-gradient-soft ring-1 ring-brand-indigo/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item}</span>
                </button>
              );
            })}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('contact')}
              className="hidden rounded-full bg-brand-gradient bg-[length:200%_auto] px-5 py-2 text-sm font-semibold text-white shadow-glow transition-all hover:scale-105 hover:bg-[position:right_center] md:block"
            >
              Let's talk
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-slate-900 md:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-900/5 bg-white/90 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item.toLowerCase())}
                  className="block w-full rounded-xl px-4 py-3 text-left text-slate-600 transition-colors hover:bg-canvas-muted hover:text-slate-900"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('contact')}
                className="mt-2 block w-full rounded-xl bg-brand-gradient px-4 py-3 text-center font-semibold text-white"
              >
                Let's talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

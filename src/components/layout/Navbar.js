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

  // Lock body scroll while the full-screen menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

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
          ? 'border-b border-brand-violet/15 bg-canvas/70 shadow-soft backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="group relative z-[75] flex items-center gap-2.5"
          >
            <span className="relative">
              <img
                src={`${process.env.PUBLIC_URL}/alpha.png`}
                alt="AlphaCodeAI"
                className="h-9 w-9 object-contain transition-transform duration-500 group-hover:rotate-[360deg]"
              />
              <span className="absolute inset-0 -z-10 animate-neon-pulse rounded-full bg-brand-violet/40 blur-lg" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-white">
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
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navActive"
                      className="absolute inset-0 rounded-full bg-brand-gradient-soft ring-1 ring-brand-violet/40 shadow-[0_0_18px_-4px_rgba(139,92,246,0.7)]"
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
              className="relative z-[75] text-slate-300 transition-colors hover:text-white md:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              {isMenuOpen ? (
                <XMarkIcon className="h-7 w-7" />
              ) : (
                <Bars3Icon className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.5rem) 2rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] flex h-[100svh] flex-col justify-center overflow-hidden bg-canvas/95 backdrop-blur-2xl md:hidden"
          >
            {/* Menu backdrop deco */}
            <div className="orb pointer-events-none h-80 w-80 -left-20 top-10 animate-wobble bg-brand-violet/25" />
            <div className="orb pointer-events-none h-72 w-72 -right-16 bottom-10 animate-aurora bg-brand-cyan/20" />

            <div className="relative space-y-2 px-8">
              {navItems.map((item, i) => {
                const id = item.toLowerCase();
                const isActive = activeSection === id;
                return (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: 60, rotate: 3 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => handleNavClick(id)}
                    className={`block w-full text-left font-display text-4xl font-bold tracking-tight transition-colors ${
                      isActive ? 'text-gradient' : 'text-white/85'
                    }`}
                  >
                    <span className="mr-3 text-base font-semibold text-brand-cyan/70">
                      0{i + 1}
                    </span>
                    {item}
                  </motion.button>
                );
              })}
              <motion.button
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                onClick={() => handleNavClick('contact')}
                className="!mt-10 block w-full rounded-2xl bg-brand-gradient bg-[length:200%_auto] px-4 py-4 text-center font-semibold text-white shadow-glow animate-gradient-x"
              >
                Let's talk
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

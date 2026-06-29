import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import AuroraBackground from '../ui/AuroraBackground';
import { scrollToSection } from '../../utils/scrollUtils';

// Concrete capabilities — doubles as a teaser for the Services section
const rotatingWords = [
  'chatbots',
  'trading platforms',
  'data platforms',
  'cloud systems',
  'payment flows'
];

const partners = [
  'Terracon India',
  'Skillocraft',
  'Opro',
  'Shapotools',
  'Proofit',
  'Fanizm'
];

const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <AuroraBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow badge */}
          <motion.div
            variants={item}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-900/5 bg-white/70 px-4 py-1.5 text-sm font-medium text-slate-600 shadow-soft backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-indigo" />
            </span>
            AI engineering studio
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
          >
            We build production-grade
            <br className="hidden sm:block" /> AI{' '}
            <span className="relative inline-block min-w-[1ch] align-bottom">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 18, rotateX: -40 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -18, rotateX: 40 }}
                  transition={{ duration: 0.4 }}
                  className="text-gradient inline-block"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={item}
            className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-500 sm:text-xl"
          >
            From AI chatbots and trading systems to cloud infrastructure and
            payments — we design, engineer, and ship intelligent software that
            actually goes to production.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button
              onClick={() => scrollToSection('contact')}
              className="group inline-flex items-center gap-2 rounded-full bg-brand-gradient bg-[length:200%_auto] px-8 py-3.5 text-base font-semibold text-white shadow-glow transition-all hover:scale-[1.03] hover:bg-[position:right_center]"
            >
              Start a project
              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-8 py-3.5 text-base font-semibold text-slate-700 shadow-soft backdrop-blur-md transition-all hover:scale-[1.03] hover:text-slate-900"
            >
              Explore what we do
            </button>
          </motion.div>

          {/* Trust row */}
          <motion.div
            variants={item}
            className="mt-16 flex flex-col items-center gap-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Trusted by teams building the future
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm font-semibold text-slate-500">
              {partners.map((p, i) => (
                <span key={p} className="flex items-center gap-x-7">
                  {i > 0 && <span className="h-1 w-1 rounded-full bg-slate-300" />}
                  <span>{p}</span>
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollToSection('services')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-slate-400 hover:text-slate-600"
        aria-label="Scroll down"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="block"
        >
          <ChevronDownIcon className="h-6 w-6" />
        </motion.span>
      </motion.button>
    </section>
  );
};

export default HeroSection;

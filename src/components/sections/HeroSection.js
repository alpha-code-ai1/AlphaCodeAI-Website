import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { scrollToSection } from '../../utils/scrollUtils';
import CountUp from '../ui/CountUp';
import MagneticButton from '../ui/MagneticButton';

const EASE = [0.22, 1, 0.36, 1];

// Cosmic background clip + poster (Higgsfield-generated).
const VIDEO_SRC = `${process.env.PUBLIC_URL}/cosmic-hero.mp4`;
const VIDEO_POSTER = `${process.env.PUBLIC_URL}/cosmic-hero-poster.webp`;

const STATS = [
  { value: '60', label: 'Partner\nBrands' },
  { value: '100', label: 'AI Products\nShipped' },
  { value: '18', label: 'Industries\nServed' }
];

const HEADING_WORDS = ['Intelligent', 'Software', 'Delivered'];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: EASE }
  })
};

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });
  // Parallax: content drifts up + fades as you scroll past the hero
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] flex-col overflow-hidden uppercase"
    >
      {/* Deep space fallback behind the video */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1b0b4d_0%,#050014_60%)]" />

      {/* Background video with scroll zoom */}
      <motion.video
        style={{ scale: videoScale }}
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_SRC}
        poster={VIDEO_POSTER || undefined}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark veil so neon text stays readable over any frame */}
      <div className="absolute inset-0 bg-gradient-to-b from-canvas/70 via-canvas/25 to-canvas" />

      {/* Scanline sweep */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-scanline bg-gradient-to-b from-transparent via-brand-cyan/10 to-transparent" />

      {/* Orbiting deco rings (hidden on very small screens) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:block">
        <div className="h-[34rem] w-[34rem] animate-orbit rounded-full border border-brand-violet/20 [animation-duration:30s]">
          <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 rounded-full bg-brand-cyan shadow-[0_0_12px_#22d3ee]" />
        </div>
        <div className="absolute inset-0 m-auto h-[24rem] w-[24rem] animate-orbit-reverse rounded-full border border-brand-cyan/15">
          <span className="absolute -bottom-1 left-1/3 h-2 w-2 rounded-full bg-brand-fuchsia shadow-[0_0_12px_#e879f9]" />
        </div>
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-1 flex-col"
      >
        {/* Stats row */}
        <div className="flex flex-1 items-center justify-end px-5 pt-24 sm:px-8 md:px-12 md:pt-28">
          <div className="flex gap-6 sm:gap-8 md:gap-12">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-right"
              >
                <div
                  className="font-semibold text-white"
                  style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)' }}
                >
                  <CountUp value={stat.value} />
                  <span className="animate-neon-pulse text-brand-cyan" style={{ fontSize: '0.6em' }}>
                    +
                  </span>
                </div>
                <p className="whitespace-pre-line text-[10px] font-semibold leading-tight tracking-widest text-slate-300 sm:text-xs md:text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col gap-6 px-5 pb-10 sm:px-8 md:gap-12 md:px-12 md:pb-14">
          {/* Row A: tagline + CTA */}
          <div className="flex items-center justify-between gap-4">
            <motion.p
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="max-w-[140px] text-[10px] font-semibold tracking-widest text-slate-200 sm:max-w-[180px] sm:text-xs md:max-w-xs md:text-sm"
            >
              Turning Bold
              <br />
              Ideas Into
              <br />
              Production AI
            </motion.p>

            <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible">
              <MagneticButton>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-brand-cyan/40 bg-canvas-soft/60 px-4 py-2 text-sm font-semibold tracking-wide text-brand-cyan shadow-glow-cyan backdrop-blur transition-all hover:bg-brand-cyan/10 hover:shadow-[0_0_50px_-6px_rgba(34,211,238,0.8)] sm:px-6 sm:py-2.5 sm:text-lg md:text-xl"
                >
                  Start A Project
                  <ArrowUpRightIcon className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-[22px] sm:w-[22px]" />
                </button>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Row B: description + giant heading */}
          <div className="flex items-end justify-between gap-3 sm:gap-4">
            <motion.div
              custom={7}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="w-[130px] shrink-0 sm:w-[200px] md:w-[300px]"
            >
              <p className="text-left text-[9px] font-semibold tracking-widest text-slate-300 sm:text-xs md:text-right md:text-sm">
                AI Engineering Studio Building Production-Grade Software From
                Idea To Deployment
              </p>
            </motion.div>

            <h1 className="text-right">
              {HEADING_WORDS.map((word, i) => (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    className={`glitch-text block font-semibold ${
                      i === HEADING_WORDS.length - 1 ? 'text-gradient' : 'text-white'
                    }`}
                    data-text={word}
                    style={{ fontSize: 'clamp(2rem, 9vw, 9rem)', lineHeight: 0.88 }}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.4 + i * 0.14, duration: 0.7, ease: EASE }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.button
          onClick={() => scrollToSection('services')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          aria-label="Scroll down"
          className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 sm:block"
        >
          <span className="flex h-9 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
            <span className="h-2 w-1 animate-scroll-hint rounded-full bg-brand-cyan" />
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;

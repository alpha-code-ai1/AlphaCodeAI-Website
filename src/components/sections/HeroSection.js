import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { scrollToSection } from '../../utils/scrollUtils';

const ACCENT = '#6D28D9';
const EASE = [0.22, 1, 0.36, 1];

// Swap this URL for your own hosted clip anytime.
const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4';

const STATS = [
  { value: '6', label: 'Partner\nBrands' },
  { value: '10', label: 'AI Products\nShipped' },
  { value: '8', label: 'Industries\nServed' }
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
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col overflow-hidden uppercase"
    >
      {/* Light fallback behind the video (keeps black text readable if the video is slow/unavailable) */}
      <div className="absolute inset-0 bg-gradient-to-br from-canvas-muted via-white to-canvas-deep" />

      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Subtle veil to guarantee text contrast over any frame */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-white/45" />

      {/* Stats row */}
      <div className="relative z-10 flex flex-1 items-center justify-end px-5 pt-24 sm:px-8 md:px-12 md:pt-28">
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
                className="font-semibold text-slate-900"
                style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)' }}
              >
                <span style={{ color: ACCENT, fontSize: '0.5em' }}>+</span>
                {stat.value}
              </div>
              <p className="whitespace-pre-line text-[10px] font-semibold leading-tight tracking-widest text-slate-700 sm:text-xs md:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom section */}
      <div className="relative z-10 flex flex-col gap-6 px-5 pb-10 sm:px-8 md:gap-12 md:px-12 md:pb-14">
        {/* Row A: tagline + CTA */}
        <div className="flex items-center justify-between gap-4">
          <motion.p
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-[140px] text-[10px] font-semibold tracking-widest text-slate-800 sm:max-w-[180px] sm:text-xs md:max-w-xs md:text-sm"
          >
            Turning Bold
            <br />
            Ideas Into
            <br />
            Production AI
          </motion.p>

          <motion.button
            custom={6}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-base font-semibold tracking-wide sm:text-xl md:text-2xl"
            style={{ color: ACCENT }}
          >
            Start A Project
            <ArrowUpRightIcon className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" />
          </motion.button>
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
            <p className="text-left text-[9px] font-semibold tracking-widest text-slate-800 sm:text-xs md:text-right md:text-sm">
              AI Engineering Studio Building Production-Grade Software From Idea
              To Deployment
            </p>
          </motion.div>

          <h1 className="text-right">
            {HEADING_WORDS.map((word, i) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  className="block font-semibold text-slate-900"
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
    </section>
  );
};

export default HeroSection;

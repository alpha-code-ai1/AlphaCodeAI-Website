import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

// Scroll progress rendered as a shooting star: a comet tail stretches across
// the top of the page and a rotating four-point star rides its leading edge.
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });
  const width = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-1.5">
      <motion.div style={{ width }} className="relative h-full">
        {/* Comet tail — fades out toward the back */}
        <div className="absolute inset-y-0 left-0 right-0 rounded-full bg-gradient-to-r from-transparent via-brand-violet/70 to-brand-cyan shadow-[0_0_14px_rgba(34,211,238,0.8)]" />
        {/* Hot core near the head */}
        <div className="absolute inset-y-0 right-0 w-24 rounded-full bg-gradient-to-r from-transparent to-white/80 blur-[1px]" />

        {/* Rotating star head */}
        <div className="absolute -right-3.5 top-1/2 -translate-y-1/2">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7 animate-spin drop-shadow-[0_0_10px_rgba(254,215,170,0.9)] [animation-duration:1.8s]"
          >
            <defs>
              <linearGradient id="star-head" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="55%" stopColor="#FEF3C7" />
                <stop offset="100%" stopColor="#FDBA74" />
              </linearGradient>
            </defs>
            <path
              d="M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z"
              fill="url(#star-head)"
            />
          </svg>
          {/* Twinkle halo */}
          <span className="absolute inset-0 -z-10 animate-neon-pulse rounded-full bg-orange-200/40 blur-md" />
        </div>
      </motion.div>
    </div>
  );
};

export default ScrollProgress;

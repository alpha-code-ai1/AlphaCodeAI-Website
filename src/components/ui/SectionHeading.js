import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

// Editorial heading in the hero's visual language: index number, micro-label
// with a neon rule, then a giant uppercase display title that reveals as one
// straight block.
const SectionHeading = ({ index, eyebrow, title, highlight, subtitle }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="mb-10 sm:mb-12"
    >
      {/* Index + eyebrow + rule */}
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -24 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } }
        }}
        className="mb-4 flex items-center gap-3 sm:mb-5 sm:gap-4"
      >
        {index && (
          <span className="font-display text-sm font-bold text-brand-cyan sm:text-base">
            {index}
          </span>
        )}
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-300 sm:text-xs">
          {eyebrow}
        </span>
        <span className="relative h-px flex-1 overflow-hidden bg-white/10">
          <span className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-brand-violet to-transparent bg-[length:200%_100%]" />
        </span>
      </motion.div>

      {/* Giant uppercase title — reveals as one straight block */}
      <div className="overflow-hidden pb-1">
        <motion.h2
          variants={{
            hidden: { y: '105%' },
            visible: { y: 0, transition: { duration: 0.7, ease: EASE } }
          }}
          className="font-display font-semibold uppercase leading-[0.95] tracking-tight text-white"
          style={{ fontSize: 'clamp(2rem, 7vw, 4.75rem)' }}
        >
          {title} {highlight && <span className="text-gradient">{highlight}</span>}
        </motion.h2>
      </div>

      {subtitle && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 0.25, duration: 0.55, ease: EASE }
            }
          }}
          className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;

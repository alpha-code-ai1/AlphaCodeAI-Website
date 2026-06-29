import { motion } from 'framer-motion';

const SectionHeading = ({ eyebrow, title, highlight, subtitle, center = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={`mb-14 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}
    >
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-indigo/15 bg-brand-gradient-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-ink">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;

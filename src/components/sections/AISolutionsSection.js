import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { scrollToSection } from '../../utils/scrollUtils';
import contentIcon from '../../assets/icons/content-generation.png';
import videoIcon from '../../assets/icons/video-editing.png';
import learningIcon from '../../assets/icons/personalized-learning.png';
import medicalIcon from '../../assets/icons/medical-ai.png';
import SectionHeading from '../ui/SectionHeading';

const EASE = [0.22, 1, 0.36, 1];

const aiSolutions = [
  {
    title: 'AI Content Generation',
    description: 'Generate high-quality content across formats and languages, on brand.',
    image: contentIcon,
    gradient: 'linear-gradient(135deg,#22D3EE,#3B82F6)',
    glow: 'rgba(34,211,238,0.45)'
  },
  {
    title: 'AI-Driven Video Editing',
    description: 'Automated editing with intelligent scene and content analysis.',
    image: videoIcon,
    gradient: 'linear-gradient(135deg,#6366F1,#22D3EE)',
    glow: 'rgba(99,102,241,0.45)'
  },
  {
    title: 'Personalized Learning',
    description: 'Adaptive learning platforms that tailor pace and path to each learner.',
    image: learningIcon,
    gradient: 'linear-gradient(135deg,#E879F9,#8B5CF6)',
    glow: 'rgba(232,121,249,0.45)'
  },
  {
    title: 'Medical AI Assistance',
    description: 'Supporting clinicians with AI-powered triage and diagnostic insights.',
    image: medicalIcon,
    gradient: 'linear-gradient(135deg,#8B5CF6,#6366F1)',
    glow: 'rgba(139,92,246,0.45)'
  }
];

const SolutionRow = ({ solution, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.06, ease: EASE }}
    >
      <button
        onClick={() => scrollToSection('contact')}
        className="group relative block w-full overflow-hidden border-t border-white/10 py-6 text-left transition-colors sm:py-9"
      >
        {/* Hover wash + corner glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, transparent, ${solution.glow.replace(
              '0.45',
              '0.10'
            )}, transparent)`
          }}
        />
        <div
          className="pointer-events-none absolute -right-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
          style={{ background: solution.glow }}
        />

        <div className="relative flex items-center gap-4 sm:gap-8">
          {/* Index */}
          <span className="w-7 shrink-0 font-display text-xs font-bold text-brand-cyan/70 transition-colors group-hover:text-brand-cyan sm:w-10 sm:text-sm">
            0{index + 1}
          </span>

          {/* Icon tile */}
          <img
            src={solution.image}
            alt=""
            aria-hidden
            draggable={false}
            className="h-11 w-11 shrink-0 select-none rounded-xl object-cover transition-all duration-500 group-hover:-rotate-12 group-hover:scale-110 sm:h-14 sm:w-14"
            style={{ filter: `drop-shadow(0 0 12px ${solution.glow})` }}
          />

          {/* Title + description */}
          <span className="min-w-0 flex-1">
            <span
              className="block font-display font-semibold uppercase leading-tight tracking-tight text-white transition-all duration-300 group-hover:translate-x-1 sm:group-hover:translate-x-2"
              style={{ fontSize: 'clamp(1.05rem, 3.4vw, 2.1rem)' }}
            >
              {solution.title}
            </span>
            <span className="mt-1 block max-w-xl text-xs leading-relaxed text-slate-400 sm:text-sm">
              {solution.description}
            </span>
          </span>

          {/* Arrow */}
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-all duration-300 group-hover:rotate-45 group-hover:border-brand-cyan/60 group-hover:text-brand-cyan group-hover:shadow-glow-cyan sm:h-12 sm:w-12">
            <ArrowUpRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>
        </div>
      </button>
    </motion.div>
  );
};

const AISolutionsSection = () => {
  return (
    <section id="solutions" className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          eyebrow="Where AI delivers"
          title="AI solutions across"
          highlight="industries"
          subtitle="Applied AI for real domains — media, content, education, and healthcare."
        />
        <div className="border-b border-white/10">
          {aiSolutions.map((solution, index) => (
            <SolutionRow key={solution.title} solution={solution} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AISolutionsSection;

import { motion } from 'framer-motion';
import { scrollToSection } from '../../utils/scrollUtils';

const SolutionCard = ({ solution, index }) => {
  const Icon = solution.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <button
        onClick={() => scrollToSection('contact')}
        className="gradient-border relative flex h-full w-full flex-col rounded-2xl glass p-6 text-left transition-shadow duration-300 hover:shadow-glow-cyan"
      >
        <div
          className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
          style={{ backgroundImage: solution.gradient }}
        >
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mb-2 font-display text-base font-semibold text-slate-900">
          {solution.title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-500">
          {solution.description}
        </p>
      </button>
    </motion.div>
  );
};

export default SolutionCard;

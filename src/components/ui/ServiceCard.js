import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { scrollToSection } from '../../utils/scrollUtils';

const ServiceCard = ({ service, index }) => {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.09, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <button
        onClick={() => scrollToSection('contact')}
        className="gradient-border relative flex h-full w-full flex-col overflow-hidden rounded-2xl glass p-5 text-left transition-shadow duration-300 hover:shadow-glow sm:p-7"
      >
        {/* Corner glow on hover */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
          style={{ background: service.glow }}
        />

        {/* Icon tile */}
        <div
          className="relative mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 sm:mb-6 sm:h-14 sm:w-14"
          style={{ backgroundImage: service.gradient }}
        >
          <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
        </div>

        <h3 className="relative mb-2 font-display text-base font-semibold text-slate-900 sm:mb-3 sm:text-xl">
          {service.title}
        </h3>
        <p className="relative flex-1 text-sm leading-relaxed text-slate-500">
          {service.description}
        </p>

        <span className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink sm:mt-6">
          Learn more
          <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </button>
    </motion.div>
  );
};

export default ServiceCard;

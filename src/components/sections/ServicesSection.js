import { motion } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  PresentationChartLineIcon,
  CircleStackIcon,
  CloudIcon,
  CreditCardIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline';
import { scrollToSection } from '../../utils/scrollUtils';
import SectionHeading from '../ui/SectionHeading';
import TiltCard from '../ui/TiltCard';

const EASE = [0.22, 1, 0.36, 1];

const services = [
  {
    title: 'AI Chatbots & Web Apps',
    description:
      'Custom AI-powered chatbots and web applications, built end-to-end and tailored to how your business actually works.',
    icon: ChatBubbleLeftRightIcon,
    gradient: 'linear-gradient(135deg,#8B5CF6,#6366F1)',
    glow: 'rgba(139,92,246,0.5)'
  },
  {
    title: 'Trading Platforms',
    description:
      'Advanced trading platforms with AI-driven insights, real-time data, and automated execution strategies.',
    icon: PresentationChartLineIcon,
    gradient: 'linear-gradient(135deg,#22D3EE,#3B82F6)',
    glow: 'rgba(34,211,238,0.5)'
  },
  {
    title: 'AI Custom Datastores',
    description:
      'Scalable, secure data storage optimized for AI workloads — embeddings, retrieval, and everything in between.',
    icon: CircleStackIcon,
    gradient: 'linear-gradient(135deg,#6366F1,#22D3EE)',
    glow: 'rgba(99,102,241,0.5)'
  },
  {
    title: 'Cloud Solutions',
    description:
      'Enterprise-grade cloud infrastructure with AI-powered optimization, monitoring, and cost control.',
    icon: CloudIcon,
    gradient: 'linear-gradient(135deg,#3B82F6,#8B5CF6)',
    glow: 'rgba(59,130,246,0.5)'
  },
  {
    title: 'Payments & eCommerce',
    description:
      'Secure payment flows and AI-enhanced eCommerce experiences that convert and scale.',
    icon: CreditCardIcon,
    gradient: 'linear-gradient(135deg,#E879F9,#8B5CF6)',
    glow: 'rgba(232,121,249,0.5)'
  },
  {
    title: 'Enterprise Digitization',
    description:
      'Complete digital transformation — turning manual, legacy workflows into modern, intelligent systems.',
    icon: BuildingOffice2Icon,
    gradient: 'linear-gradient(135deg,#22D3EE,#6366F1)',
    glow: 'rgba(34,211,238,0.5)'
  }
];

const ServiceCard = ({ service, index }) => {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: EASE }}
      className="group h-full w-[76vw] shrink-0 snap-center sm:w-auto sm:shrink"
    >
      <TiltCard className="h-full rounded-3xl" maxTilt={11}>
        <button
          onClick={() => scrollToSection('contact')}
          className="gradient-border relative flex h-full w-full flex-col overflow-hidden rounded-3xl glass p-6 text-left transition-shadow duration-300 hover:shadow-glow sm:p-7"
        >
          {/* Ghost index number */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-[6rem] font-bold leading-none text-transparent transition-transform duration-500 group-hover:-translate-y-1"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.10)' }}
          >
            0{index + 1}
          </span>

          {/* Hover glow */}
          <div
            className="pointer-events-none absolute -left-12 -bottom-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
            style={{ background: service.glow }}
          />

          {/* Icon tile with orbiting spark */}
          <div className="relative mb-12 h-12 w-12 sm:mb-14">
            <div
              className="flex h-full w-full items-center justify-center rounded-xl text-white shadow-glow transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
              style={{ backgroundImage: service.gradient }}
            >
              <Icon className="h-6 w-6" />
            </div>
            <div className="pointer-events-none absolute -inset-2 animate-orbit opacity-0 transition-opacity duration-500 group-hover:opacity-100 [animation-duration:4s]">
              <span className="absolute -top-0.5 left-1/2 h-1.5 w-1.5 rounded-full bg-brand-cyan shadow-[0_0_8px_#22d3ee]" />
            </div>
          </div>

          <h3 className="relative mb-2 font-display text-lg font-semibold uppercase leading-snug tracking-tight text-white">
            {service.title}
          </h3>
          <p className="relative flex-1 text-sm leading-relaxed text-slate-400">
            {service.description}
          </p>
        </button>
      </TiltCard>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="relative overflow-hidden py-12 sm:py-16">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-radial-glow opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          eyebrow="What we do"
          title="Services built to"
          highlight="ship"
          subtitle="Full-stack AI product engineering — from the first prototype to the system running in production."
        />
      </div>

      {/* Mobile: swipeable snap carousel · Desktop: grid */}
      <div className="relative mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="no-scrollbar flex touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain px-4 pb-2 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] uppercase tracking-[0.25em] text-slate-500 sm:hidden">
          Swipe to explore ✦
        </p>
      </div>
    </section>
  );
};

export default ServicesSection;

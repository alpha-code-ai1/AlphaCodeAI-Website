import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  ArrowUpRightIcon
} from '@heroicons/react/24/outline';
import SectionHeading from '../ui/SectionHeading';
import MagneticButton from '../ui/MagneticButton';
import WhatsAppGlyph from '../ui/WhatsAppIcon';

const EASE = [0.22, 1, 0.36, 1];

const LinkedInIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const contactMethods = [
  {
    icon: EnvelopeIcon,
    label: 'Email us',
    value: 'aryanchandwani@gmail.com',
    href: 'mailto:aryanchandwani@gmail.com',
    accent: '#A78BFA'
  },
  {
    icon: ChatBubbleLeftRightIcon,
    label: 'WhatsApp',
    value: '+91 8850313109',
    href: 'https://wa.me/918850313109',
    accent: '#22D3EE'
  },
  {
    icon: LinkedInIcon,
    label: 'LinkedIn',
    value: 'Aryan Chandwani',
    href: 'https://www.linkedin.com/in/aryanchandwani/',
    accent: '#60A5FA'
  },
  {
    icon: MapPinIcon,
    label: 'Based in',
    value: 'Mumbai, India',
    href: null,
    accent: '#E879F9'
  }
];

const ContactRow = ({ method, index }) => {
  const Icon = method.icon;
  const Wrapper = method.href ? 'a' : 'div';
  const wrapperProps = method.href
    ? { href: method.href, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
    >
      <Wrapper
        {...wrapperProps}
        className="group relative block overflow-hidden border-t border-white/10 py-5 sm:py-7"
      >
        {/* Hover wash */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, transparent, ${method.accent}14, transparent)`
          }}
        />
        <div className="relative flex items-center gap-4 sm:gap-8">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-glow transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110 sm:h-12 sm:w-12"
            style={{ background: `linear-gradient(135deg, ${method.accent}, #6366F1)` }}
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500 sm:text-xs">
              {method.label}
            </span>
            <span
              className="block truncate font-display font-semibold text-white transition-colors duration-300 group-hover:text-brand-cyan"
              style={{ fontSize: 'clamp(1rem, 3.4vw, 1.8rem)' }}
            >
              {method.value}
            </span>
          </span>

          {method.href && (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-all duration-300 group-hover:rotate-45 group-hover:border-brand-cyan/60 group-hover:text-brand-cyan sm:h-12 sm:w-12">
              <ArrowUpRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
          )}
        </div>
      </Wrapper>
    </motion.div>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="relative overflow-hidden py-12 sm:py-16">
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-radial-glow opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          eyebrow="Get in touch"
          title="Let's build something"
          highlight="intelligent"
          subtitle="Have a project in mind? Reach out on any channel below — we usually reply within a day."
        />

        <div className="border-b border-white/10">
          {contactMethods.map((m, index) => (
            <ContactRow key={m.label} method={m} index={index} />
          ))}
        </div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex justify-center sm:mt-16"
        >
          <MagneticButton strength={0.25}>
            <a
              href="https://wa.me/918850313109"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-base font-semibold text-white shadow-[0_12px_40px_-8px_rgba(37,211,102,0.8)] transition-all hover:scale-[1.04] hover:bg-[#1ebe5d] sm:px-10 sm:py-5 sm:text-lg"
            >
              <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-25 [animation-duration:2.2s]" />
              <WhatsAppGlyph className="h-5 w-5 transition-transform group-hover:scale-110 group-hover:rotate-12 sm:h-6 sm:w-6" />
              Start a conversation
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

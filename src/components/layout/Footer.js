import { EnvelopeIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { scrollToSection } from '../../utils/scrollUtils';

const LinkedInIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const socials = [
  { icon: LinkedInIcon, href: 'https://www.linkedin.com/in/aryanchandwani/', label: 'LinkedIn' },
  { icon: EnvelopeIcon, href: 'mailto:aryanchandwani@gmail.com', label: 'Email' },
  { icon: ChatBubbleLeftRightIcon, href: 'https://wa.me/918850313109', label: 'WhatsApp' }
];

const quickLinks = ['Services', 'Solutions', 'Articles', 'Contact'];

const partners = [
  { name: 'Terracon India', href: 'https://www.terraconindia.com/' },
  { name: 'Skillocraft', href: 'https://skillocraft.com' },
  { name: 'Opro Maldives', href: 'https://OproMaldives.com' },
  { name: 'Shapotools', href: 'https://Shapotools.com' },
  { name: 'Proofit', href: 'https://Proofitcompany.com' },
  { name: 'Fanizm', href: 'https://fanizm.com' }
];

const Footer = () => {
  return (
    <footer className="relative border-t border-slate-900/5 bg-canvas-muted">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-2.5">
              <img
                src={`${process.env.PUBLIC_URL}/alpha.png`}
                alt="AlphaCodeAI"
                className="h-9 w-9 object-contain"
              />
              <span className="font-display text-lg font-bold text-slate-900">
                Alpha<span className="text-gradient">Code</span>AI
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-500">
              We design, engineer, and ship production-grade AI software for
              ambitious teams.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-900/10 bg-white text-slate-500 transition-all hover:-translate-y-0.5 hover:border-brand-indigo/40 hover:text-brand-ink hover:shadow-soft"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-slate-900">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="text-sm text-slate-500 transition-colors hover:text-brand-ink"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-slate-900">
              Partners
            </h4>
            <ul className="space-y-2.5">
              {partners.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-500 transition-colors hover:text-brand-ink"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-slate-900">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-500">
              <li>
                <a href="mailto:aryanchandwani@gmail.com" className="hover:text-brand-ink">
                  aryanchandwani@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/918850313109" className="hover:text-brand-ink">
                  +91 8850313109
                </a>
              </li>
              <li>Malad, Mumbai, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-900/5 pt-8 sm:flex-row">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} AlphaCodeAI. All rights reserved.
          </p>
          <p className="text-sm text-slate-400">Your portal to the future.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

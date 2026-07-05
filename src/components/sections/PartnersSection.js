import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowTopRightOnSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HandRaisedIcon,
  LightBulbIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import SectionHeading from '../ui/SectionHeading';

// tileBg matches each logo's own baked-in background so it blends seamlessly.
// `color` is each logo's brand color, deep enough for white text to stay legible.
// Fanizm intentionally placed last.
const partners = [
  {
    name: 'Terracon India',
    description: "India's first nature-based solutions company.",
    logo: 'https://www.terraconindia.com/wp-content/uploads/2023/09/Terracon-nature-based-solution-logo-Copy-1-1-1536x1216.jpg',
    link: 'https://www.terraconindia.com/',
    tileBg: '#FFFFFF',
    color: '#35602A'
  },
  {
    name: 'Skillocraft',
    description: 'Where skills meet profession.',
    logo: '/partners/skillocraft.jpg',
    link: 'https://skillocraft.com',
    tileBg: '#FFFFFF',
    color: '#9A4E1E'
  },
  {
    name: 'Opro Maldives',
    description: 'Adding care to your property.',
    logo: '/partners/opro.jpg',
    link: 'https://OproMaldives.com',
    tileBg: '#F7F6F2',
    color: '#35427C'
  },
  {
    name: 'Shapotools',
    description: 'Quality tools, built to perform.',
    logo: '/partners/shapotools.jpg',
    link: 'https://Shapotools.com',
    tileBg: '#333333',
    color: '#333B47'
  },
  {
    name: 'Proofit',
    description: 'Smarter property inspections, proofed.',
    logo: '/partners/proofit.jpg',
    link: 'https://Proofitcompany.com',
    tileBg: '#FFFFFF',
    color: '#9E5B1E'
  },
  {
    name: 'Fanizm',
    description: 'Revolutionizing entertainment & fan engagement.',
    logo: '/partners/fanizm.jpg',
    link: 'https://fanizm.com',
    tileBg: '#1A1945',
    color: '#141133'
  }
];

// Convert "#RRGGBB" + alpha to an rgba() string
const rgba = (hex, a) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

const benefits = [
  {
    icon: HandRaisedIcon,
    title: 'Strong Collaboration',
    text: 'Working together to deliver exceptional solutions.'
  },
  {
    icon: LightBulbIcon,
    title: 'Innovation Focus',
    text: 'Pushing boundaries with cutting-edge technology.'
  },
  {
    icon: ArrowTrendingUpIcon,
    title: 'Shared Success',
    text: 'Growing together through mutual achievements.'
  }
];

const PartnerCard = ({ partner }) => (
  <a
    href={partner.link}
    target="_blank"
    rel="noopener noreferrer"
    draggable={false}
    style={{ backgroundColor: partner.color, '--c-glow': rgba(partner.color, 0.6) }}
    className="group relative flex w-[17rem] flex-shrink-0 select-none flex-col overflow-hidden rounded-2xl border border-white/10 p-5 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_55px_-16px_var(--c-glow)]"
  >
    {/* Soft top sheen */}
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />

    <div
      className="relative flex h-24 w-full items-center justify-center overflow-hidden rounded-xl p-4 ring-1 ring-white/25"
      style={{ backgroundColor: partner.tileBg }}
    >
      <img
        src={partner.logo}
        alt={partner.name}
        loading="lazy"
        draggable={false}
        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
      />
    </div>
    <div className="relative mt-4 flex items-start justify-between gap-3">
      <div>
        <h3 className="font-display text-base font-semibold text-white">
          {partner.name}
        </h3>
        <p className="mt-1 text-sm text-white/85">{partner.description}</p>
      </div>
      <ArrowTopRightOnSquareIcon className="mt-1 h-5 w-5 flex-shrink-0 text-white/85" />
    </div>
  </a>
);

const PartnersSection = () => {
  const trackRef = useRef(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });
  const [paused, setPaused] = useState(false);

  // Gentle auto-scroll that yields to user interaction
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    let raf;
    const step = () => {
      if (!paused && el) {
        el.scrollLeft += 0.5;
        const half = el.scrollWidth / 2;
        if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  const pauseBriefly = () => {
    setPaused(true);
    window.clearTimeout(pauseBriefly._t);
    pauseBriefly._t = window.setTimeout(() => setPaused(false), 1500);
  };

  const scrollByAmount = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 300, behavior: 'smooth' });
    pauseBriefly();
  };

  const onPointerDown = (e) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      down: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false
    };
    setPaused(true);
  };
  const onPointerMove = (e) => {
    if (!drag.current.down) return;
    const el = trackRef.current;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };
  const endDrag = () => {
    if (!drag.current.down) return;
    drag.current.down = false;
    setPaused(false);
  };
  // Suppress the click navigation if the pointer was dragged
  const onClickCapture = (e) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="00"
          eyebrow="Who we work with"
          title="Trusted by ambitious"
          highlight="teams"
          subtitle="We partner with companies across industries to build and ship what's next."
        />
      </div>

      {/* Scrollable / draggable carousel */}
      <div className="group/carousel relative mx-auto max-w-[100rem]">
        {/* Arrow buttons */}
        <button
          onClick={() => scrollByAmount(-1)}
          aria-label="Scroll left"
          className="absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-brand-violet/25 bg-canvas-soft/80 p-2.5 text-slate-300 shadow-glow backdrop-blur transition-all hover:scale-110 hover:text-brand-cyan sm:flex"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => scrollByAmount(1)}
          aria-label="Scroll right"
          className="absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-brand-violet/25 bg-canvas-soft/80 p-2.5 text-slate-300 shadow-glow backdrop-blur transition-all hover:scale-110 hover:text-brand-cyan sm:flex"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>

        <div
          ref={trackRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            endDrag();
            setPaused(false);
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onClickCapture={onClickCapture}
          className="no-scrollbar flex cursor-grab gap-5 overflow-x-auto px-4 py-3 active:cursor-grabbing sm:px-12"
          style={{ scrollbarWidth: 'none' }}
        >
          {[...partners, ...partners].map((partner, i) => (
            <PartnerCard key={`${partner.name}-${i}`} partner={partner} />
          ))}
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-slate-500">
        Drag, scroll, or use the arrows to explore
      </p>

      {/* Partnership benefits strip */}
      <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="gradient-border grid grid-cols-1 divide-y divide-white/10 rounded-3xl glass sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {benefits.map((b, index) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group flex items-center gap-4 p-5 sm:p-7"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient-soft text-brand-ink shadow-neon-ring ring-1 ring-brand-violet/25 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white sm:text-base">
                    {b.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-400 sm:text-sm">{b.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;

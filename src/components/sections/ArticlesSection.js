import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ClockIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { articles } from '../../data/articles';
import SectionHeading from '../ui/SectionHeading';

const EASE = [0.22, 1, 0.36, 1];

const ArticleCard = ({ article, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.09, ease: EASE }}
      whileHover={{ y: -8 }}
      className="group h-full"
    >
      <Link
        to={`/article/${article.id}`}
        className="gradient-border flex h-full flex-col overflow-hidden rounded-3xl glass transition-shadow duration-300 hover:shadow-glow"
      >
        {/* Cover */}
        <div className="relative h-52 overflow-hidden sm:h-56">
          <img
            src={article.coverImage}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas-soft via-canvas/20 to-transparent" />

          {/* Floating date chip */}
          <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-canvas/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
            {article.date}
          </span>

          {/* Read arrow */}
          <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-canvas/60 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100 group-hover:rotate-45">
            <ArrowUpRightIcon className="h-4 w-4" />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-500">
            <ClockIcon className="h-3.5 w-3.5 text-brand-cyan/70" />
            <span>{article.readTime}</span>
          </div>

          <h3 className="mb-2 font-display text-lg font-semibold leading-snug text-white transition-colors group-hover:text-brand-cyan">
            {article.title}
          </h3>
          <p className="mb-5 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-400">
            {article.content[0].text}
          </p>

          <div className="flex items-center gap-3 border-t border-white/10 pt-4">
            <img
              src={article.author.image}
              alt={article.author.name}
              loading="lazy"
              className="h-9 w-9 rounded-full object-cover ring-1 ring-brand-violet/40"
            />
            <div>
              <p className="text-sm font-medium text-white">{article.author.name}</p>
              <p className="text-xs text-slate-500">{article.author.title}</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ArticlesSection = () => {
  return (
    <section id="articles" className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03"
          eyebrow="Insights"
          title="Latest from the"
          highlight="blog"
          subtitle="Perspectives on AI technology, engineering, and where the industry is heading."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;

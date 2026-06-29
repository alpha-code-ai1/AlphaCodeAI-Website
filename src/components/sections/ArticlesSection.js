import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ClockIcon } from '@heroicons/react/24/outline';
import { articles } from '../../data/articles';
import SectionHeading from '../ui/SectionHeading';

const ArticleCard = ({ article, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.09, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link
        to={`/article/${article.id}`}
        className="gradient-border flex h-full flex-col overflow-hidden rounded-2xl glass transition-shadow duration-300 hover:shadow-glow"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center gap-2 text-xs text-slate-400">
            <span>{article.date}</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <ClockIcon className="h-3.5 w-3.5" />
            <span>{article.readTime}</span>
          </div>

          <h3 className="mb-2 font-display text-lg font-semibold text-slate-900 transition-colors group-hover:text-brand-ink">
            {article.title}
          </h3>
          <p className="mb-5 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500">
            {article.content[0].text}
          </p>

          <div className="flex items-center gap-3 border-t border-slate-900/5 pt-4">
            <img
              src={article.author.image}
              alt={article.author.name}
              loading="lazy"
              className="h-9 w-9 rounded-full object-cover ring-1 ring-slate-900/10"
            />
            <div>
              <p className="text-sm font-medium text-slate-900">{article.author.name}</p>
              <p className="text-xs text-slate-400">{article.author.title}</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ArticlesSection = () => {
  return (
    <section id="articles" className="relative bg-canvas-soft py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
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

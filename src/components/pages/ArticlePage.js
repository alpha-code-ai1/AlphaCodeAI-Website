import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ClockIcon } from '@heroicons/react/24/outline';
import { articles } from '../../data/articles';
import { useEffect } from 'react';

const ArticlePage = () => {
  const { id } = useParams();
  const article = articles.find((a) => a.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!article) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
        <p className="text-xl text-slate-300">Article not found</p>
        <Link
          to="/"
          className="rounded-full bg-brand-gradient px-6 py-2.5 text-sm font-semibold text-white shadow-glow"
        >
          Back home
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden pt-24">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-radial-glow opacity-60" />

      <motion.article
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8"
      >
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-brand-cyan"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to home
        </Link>

        <header className="mb-10">
          <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
            <span>{article.date}</span>
            <span className="h-1 w-1 rounded-full bg-brand-cyan/60" />
            <ClockIcon className="h-4 w-4" />
            <span>{article.readTime}</span>
          </div>
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="mt-4 text-lg text-slate-400">{article.subtitle}</p>
          )}
          <div className="mt-6 flex items-center gap-3">
            <img
              src={article.author.image}
              alt={article.author.name}
              className="h-11 w-11 rounded-full object-cover ring-1 ring-brand-violet/30"
            />
            <div>
              <p className="font-medium text-white">{article.author.name}</p>
              <p className="text-sm text-slate-500">{article.author.title}</p>
            </div>
          </div>
        </header>

        <div className="relative mb-12 h-72 overflow-hidden rounded-2xl shadow-card ring-1 ring-brand-violet/20 sm:h-96">
          <img
            src={article.coverImage}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="prose prose-invert max-w-none prose-headings:font-display prose-a:text-brand-cyan">
          {article.content.map((section, index) => {
            if (section.type === 'heading') {
              return (
                <h2 key={index} className="mt-10 text-2xl font-bold text-white">
                  {section.text}
                </h2>
              );
            }
            return (
              <p key={index} className="leading-relaxed text-slate-300">
                {section.text}
              </p>
            );
          })}
        </div>

        {article.tags && (
          <div className="mt-12 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-brand-violet/30 bg-brand-gradient-soft px-3 py-1 text-sm font-medium text-brand-ink"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </motion.article>
    </div>
  );
};

export default ArticlePage;

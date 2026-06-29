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
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-canvas text-center">
        <p className="text-xl text-slate-600">Article not found</p>
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
    <div className="relative min-h-screen overflow-hidden bg-canvas pt-24">
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
          className="mb-10 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to home
        </Link>

        <header className="mb-10">
          <div className="mb-4 flex items-center gap-2 text-sm text-slate-400">
            <span>{article.date}</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <ClockIcon className="h-4 w-4" />
            <span>{article.readTime}</span>
          </div>
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="mt-4 text-lg text-slate-500">{article.subtitle}</p>
          )}
          <div className="mt-6 flex items-center gap-3">
            <img
              src={article.author.image}
              alt={article.author.name}
              className="h-11 w-11 rounded-full object-cover ring-1 ring-slate-900/10"
            />
            <div>
              <p className="font-medium text-slate-900">{article.author.name}</p>
              <p className="text-sm text-slate-400">{article.author.title}</p>
            </div>
          </div>
        </header>

        <div className="relative mb-12 h-72 overflow-hidden rounded-2xl shadow-soft ring-1 ring-slate-900/5 sm:h-96">
          <img
            src={article.coverImage}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="prose prose-slate max-w-none prose-headings:font-display prose-a:text-brand-ink">
          {article.content.map((section, index) => {
            if (section.type === 'heading') {
              return (
                <h2 key={index} className="mt-10 text-2xl font-bold text-slate-900">
                  {section.text}
                </h2>
              );
            }
            return (
              <p key={index} className="leading-relaxed text-slate-600">
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
                className="rounded-full border border-brand-indigo/15 bg-brand-gradient-soft px-3 py-1 text-sm font-medium text-brand-ink"
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

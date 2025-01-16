import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { articles } from '../../data/articles';
import { useEffect } from 'react';

const ArticlePage = () => {
  const { id } = useParams();
  const article = articles.find(a => a.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!article) return <div>Article not found</div>;

  return (
    <div className="min-h-screen bg-primary pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 text-gray-400 mb-4">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {article.title}
          </h1>
          <div className="flex items-center space-x-4">
            <img 
              src={article.author.image} 
              alt={article.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-white font-semibold">{article.author.name}</p>
              <p className="text-gray-400">{article.author.title}</p>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
          <img 
            src={article.coverImage} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          {article.content.map((section, index) => {
            if (section.type === 'heading') {
              return (
                <h2 key={index} className="text-2xl font-bold text-white mt-8 mb-4">
                  {section.text}
                </h2>
              );
            }
            return (
              <p key={index} className="text-gray-300 mb-6 leading-relaxed">
                {section.text}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div className="mt-12 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 bg-secondary/50 text-white rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ArticlePage; 
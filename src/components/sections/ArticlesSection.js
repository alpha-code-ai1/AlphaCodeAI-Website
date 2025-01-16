import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { articles } from '../../data/articles';

const ArticleCard = ({ article }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-secondary/30 backdrop-blur-sm rounded-2xl overflow-hidden group hover:bg-secondary/40 transition-all duration-300"
    >
      <Link to={`/article/${article.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={article.coverImage} 
            alt={article.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-3">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-highlight transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-300 truncate line-clamp-2 mb-4">
            {article.content[0].text}
          </p>
          <div className="flex items-center space-x-3">
            <img 
              src={article.author.image} 
              alt={article.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-white font-semibold">{article.author.name}</p>
              <p className="text-gray-400 text-sm">{article.author.title}</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ArticlesSection = () => {
  return (
    <div id="articles" className="py-20 bg-primary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Latest Articles</h2>
          <p className="text-gray-300">Explore the latest insights in AI technology and innovation</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesSection; 
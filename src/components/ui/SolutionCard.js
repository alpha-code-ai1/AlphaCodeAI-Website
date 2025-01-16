import { motion } from 'framer-motion';
import { scrollToSection } from '../../utils/scrollUtils';

const SolutionCard = ({ solution, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="relative group h-full"
    >
      <div className="bg-primary/80 p-6 rounded-2xl relative overflow-hidden transform hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-2xl border border-primary-light/20 h-full">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 opacity-40 group-hover:opacity-50 transition-all duration-500 transform group-hover:scale-105"
          style={{
            backgroundImage: `url(${solution.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.8) contrast(1.2)'
          }}
        />
        
        {/* Simple gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-transparent to-primary/80" />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon Container */}
          <motion.div 
            className="w-16 h-16 mb-6 rounded-xl bg-neon-purple/20 p-3"
            whileHover={{ scale: 1.05 }}
          >
            <img src={solution.icon} alt="" className="w-full h-full object-contain" />
          </motion.div>
          
          <h3 className="text-xl font-bold mb-4 text-white group-hover:text-neon-purple transition-colors duration-300">
            {solution.title}
          </h3>
          
          <p className="text-gray-200 group-hover:text-white transition-colors duration-300 leading-relaxed min-h-[80px]">
            {solution.description}
          </p>
          
          <div className="mt-6 flex items-center space-x-2 text-neon-purple group-hover:text-neon-purple/80 transition-colors duration-300 cursor-pointer"
               onClick={() => scrollToSection('contact')}>
            <span className="text-sm font-semibold">Explore Solution</span>
            <svg 
              className="w-4 h-4"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SolutionCard;
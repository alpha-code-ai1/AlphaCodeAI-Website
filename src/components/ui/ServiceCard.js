import { motion } from 'framer-motion';
import { scrollToSection } from '../../utils/scrollUtils';

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group h-full"
    >
      <div className="bg-secondary/80 p-8 rounded-2xl relative overflow-hidden transform hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-2xl border border-secondary-light/20 h-full">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 opacity-40 group-hover:opacity-50 transition-all duration-500 transform group-hover:scale-105"
          style={{
            backgroundImage: `url(${service.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.8) contrast(1.2)'
          }}
        />
        
        {/* Simple gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-transparent to-secondary/80" />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon Container */}
          <motion.div 
            className="w-16 h-16 mb-6 rounded-xl bg-highlight/20 p-3"
            whileHover={{ scale: 1.05 }}
          >
            <img src={service.icon} alt="" className="w-full h-full object-contain" />
          </motion.div>
          
          <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-highlight transition-colors duration-300">
            {service.title}
          </h3>
          
          <p className="text-gray-200 group-hover:text-white transition-colors duration-300 leading-relaxed min-h-[80px]">
            {service.description}
          </p>
          
          <button 
            className="mt-6 px-6 py-2 rounded-lg bg-highlight/80 hover:bg-highlight text-white transition-all duration-300 text-sm font-semibold"
            onClick={() => scrollToSection('contact')}
          >
            Learn More →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import BackgroundVideo from '../ui/BackgroundVideo';

// Move subtitles outside component to avoid recreation
const subtitles = [
  "Empowering Innovation Through Advanced AI Technology",
  "Transforming Businesses with Cutting-Edge Solutions",
  "Building the Future with Intelligent Systems",
  "Revolutionizing Industries through AI Integration",
  "Creating Smarter Solutions for Tomorrow"
];

const HeroSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => 
        prevIndex === subtitles.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      const headerOffset = 100;
      const elementPosition = servicesSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id="home" className="relative min-h-screen">
      <BackgroundVideo />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Next-Gen AI Solutions
          </h1>
          
          <div className="h-16"> {/* Container for changing subtitle */}
            <motion.p
              key={currentTextIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl text-gray-300 mb-8"
            >
              {subtitles[currentTextIndex]}
            </motion.p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToServices}
            className="bg-highlight hover:bg-accent px-8 py-3 rounded-full text-lg font-semibold transition-all text-white"
          >
            Get Started
          </motion.button>
        </div>
      </motion.div>

      
    </div>
  );
};

export default HeroSection; 
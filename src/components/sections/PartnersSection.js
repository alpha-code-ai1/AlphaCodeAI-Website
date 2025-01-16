import { motion } from 'framer-motion';

const PartnersSection = () => {
  const partners = [
    {
      name: "Fanizm",
      description: "Revolutionizing entertainment & engagement!",
      logo: "https://fanizm.com/brandpage/fanizm.com_files/Logotagline.png",
      link: "https://fanizm.com",
      maxWidth: "350px",
      height: "h-32",
      scale: "scale-125"
    },
    {
      name: "TerraconIndia",
      description: "India's First Nature-Based Solution Company",
      logo: "https://www.terraconindia.com/wp-content/uploads/2023/09/Terracon-nature-based-solution-logo-Copy-1-1-1536x1216.jpg",
      link: "https://www.terraconindia.com/",
      maxWidth: "200px",
      height: "h-32",
      scale: ""
    }
  ];

  return (
    <div className="py-20 bg-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Partners</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-secondary/30 backdrop-blur-sm p-8 rounded-xl hover:bg-secondary/40 transition-all group"
            >
              <a href={partner.link} target="_blank" rel="noopener noreferrer" 
                className="flex flex-col items-center space-y-6"
              >
                <div className={`w-full ${partner.height} flex items-center justify-center bg-white rounded-lg p-6 group-hover:shadow-lg transition-all`}>
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className={`w-full h-full object-contain group-hover:scale-105 transition-transform ${partner.scale}`}
                    style={{ maxWidth: partner.maxWidth }}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">{partner.name}</h3>
                  <p className="text-gray-300">{partner.description}</p>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Partnership Benefits */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-highlight/20 rounded-full flex items-center justify-center">
              <img src="https://img.icons8.com/fluency/48/handshake.png" alt="Partnership" className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Strong Collaboration</h3>
            <p className="text-gray-300">Working together to deliver exceptional solutions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-highlight/20 rounded-full flex items-center justify-center">
              <img src="https://img.icons8.com/fluency/48/innovation.png" alt="Innovation" className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Innovation Focus</h3>
            <p className="text-gray-300">Pushing boundaries with cutting-edge technologies</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-highlight/20 rounded-full flex items-center justify-center">
              <img src="https://img.icons8.com/fluency/48/goal.png" alt="Success" className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Shared Success</h3>
            <p className="text-gray-300">Growing together through mutual achievements</p>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default PartnersSection;
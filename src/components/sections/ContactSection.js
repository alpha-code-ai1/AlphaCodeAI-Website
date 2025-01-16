import { motion } from 'framer-motion';

const ContactSection = () => {
  return (
    <div id="contact" className="py-12 bg-primary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Get In Touch</h2>
        
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row gap-8 items-center justify-center md:justify-between"
          >
            <div className="flex items-center space-x-4 w-full max-w-xs bg-secondary/30 p-4 rounded-xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-highlight/20 rounded-full flex items-center justify-center flex-shrink-0">
                <img src="https://img.icons8.com/fluency/48/mail.png" alt="Email" className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold">Email Us</h3>
                <a href="mailto:founder@alphacodeai.com" className="text-gray-300 hover:text-highlight">
                  founder@alphacodeai.com
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4 w-full max-w-xs bg-secondary/30 p-4 rounded-xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-highlight/20 rounded-full flex items-center justify-center flex-shrink-0">
                <img src="https://img.icons8.com/fluency/48/whatsapp.png" alt="WhatsApp" className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold">WhatsApp</h3>
                <a href="https://wa.me/918850313109" className="text-gray-300 hover:text-highlight">
                  +91 8850313109
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4 w-full max-w-xs bg-secondary/30 p-4 rounded-xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-highlight/20 rounded-full flex items-center justify-center flex-shrink-0">
                <img src="https://img.icons8.com/fluency/48/linkedin.png" alt="LinkedIn" className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold">LinkedIn</h3>
                <a href="https://www.linkedin.com/in/aryanchandwani/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-highlight">
                  Aryan Chandwani
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection; 
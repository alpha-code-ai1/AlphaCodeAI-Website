const Footer = () => {
  return (
    <footer className="bg-primary/90 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">ALPHACODEAI</h3>
            <p className="text-gray-400">
              Transforming businesses with cutting-edge artificial intelligence solutions.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/aryanchandwani/" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/fluency/48/linkedin.png" alt="LinkedIn" className="w-8 h-8" />
              </a>
              <a href="mailto:founder@alphacodeai.com">
                <img src="https://img.icons8.com/fluency/48/mail.png" alt="Email" className="w-8 h-8" />
              </a>
              <a href="https://wa.me/918850313109">
                <img src="https://img.icons8.com/fluency/48/whatsapp.png" alt="WhatsApp" className="w-8 h-8" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-400 hover:text-white">Services</a></li>
              <li><a href="#solutions" className="text-gray-400 hover:text-white">Solutions</a></li>
              <li><a href="#articles" className="text-gray-400 hover:text-white">Articles</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Our Partners</h4>
            <ul className="space-y-2">
              <li className="text-gray-400 hover:text-white cursor-pointer">Fanizm</li>
              <li className="text-gray-400 hover:text-white cursor-pointer">TerraconIndia</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">founder@alphacodeai.com</li>
              <li className="text-gray-400">+91 8850313109</li>
              <li className="text-gray-400">Malad</li>
              <li className="text-gray-400">Mumbai, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} ALPHACODEAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
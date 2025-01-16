import ServiceCard from '../ui/ServiceCard';

const ServicesSection = () => {
  const services = [
    {
      title: "AI Chatbots & Web Solutions",
      description: "Custom AI-powered chatbots and web applications tailored to your business needs.",
      image: "https://cdn-icons-gif.flaticon.com/11184/11184177.gif",
      icon: "https://img.icons8.com/fluency/96/chatbot.png"
    },
    {
      title: "Trading Platforms",
      description: "Advanced trading platforms with AI-driven insights and automated trading capabilities.",
      image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWFqbWxvYnBxbWd1ZWJyeXd6ZnF4ZDV5Y2JnOWF5ZmN0aXBzaXR6eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JtBZm3Getg3dqxK0zP/giphy-downsized-large.gif",
      icon: "https://img.icons8.com/fluency/96/stocks-growth.png"
    },
    {
      title: "AI Custom Datastores",
      description: "Scalable and secure data storage solutions optimized for AI applications.",
      image: "https://cdn.dribbble.com/users/707433/screenshots/6654057/comp_4.gif",
      icon: "https://img.icons8.com/fluency/96/database.png"
    },
    {
      title: "Cloud Solutions",
      description: "Enterprise-grade cloud infrastructure with AI-powered optimization.",
      image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWRyZXJyMmN0ZWxwdmRwbWJnbmJxNmRyeWRpbm1samZyZzlicG5kciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT9IgzoKnwFNmISR8I/giphy.gif",
      icon: "https://img.icons8.com/fluency/96/cloud-sync.png"
    },
    {
      title: "Payments & eCommerce",
      description: "Secure payment solutions and AI-enhanced eCommerce platforms.",
      image: "https://i.giphy.com/TDyxBGZcViZnoye8iN.webp",
      icon: "https://img.icons8.com/fluency/96/card-security.png"
    },
    {
      title: "Enterprise Digitization",
      description: "Complete digital transformation solutions for modern enterprises.",
      image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmliYmRwd2RwbWJnbmJxNmRyeWRpbm1samZyZzlicG5kcmliYmR5dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tn33aiTi1jkl6H6/giphy.gif",
      icon: "https://img.icons8.com/fluency/96/organization.png"
    }
  ];

  return (
    <div id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ServicesSection; 
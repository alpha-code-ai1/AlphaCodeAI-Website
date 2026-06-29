import {
  ChatBubbleLeftRightIcon,
  PresentationChartLineIcon,
  CircleStackIcon,
  CloudIcon,
  CreditCardIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline';
import ServiceCard from '../ui/ServiceCard';
import SectionHeading from '../ui/SectionHeading';

const services = [
  {
    title: 'AI Chatbots & Web Apps',
    description:
      'Custom AI-powered chatbots and web applications, built end-to-end and tailored to how your business actually works.',
    icon: ChatBubbleLeftRightIcon,
    gradient: 'linear-gradient(135deg,#8B5CF6,#6366F1)',
    glow: 'rgba(139,92,246,0.5)'
  },
  {
    title: 'Trading Platforms',
    description:
      'Advanced trading platforms with AI-driven insights, real-time data, and automated execution strategies.',
    icon: PresentationChartLineIcon,
    gradient: 'linear-gradient(135deg,#22D3EE,#3B82F6)',
    glow: 'rgba(34,211,238,0.5)'
  },
  {
    title: 'AI Custom Datastores',
    description:
      'Scalable, secure data storage optimized for AI workloads — embeddings, retrieval, and everything in between.',
    icon: CircleStackIcon,
    gradient: 'linear-gradient(135deg,#6366F1,#22D3EE)',
    glow: 'rgba(99,102,241,0.5)'
  },
  {
    title: 'Cloud Solutions',
    description:
      'Enterprise-grade cloud infrastructure with AI-powered optimization, monitoring, and cost control.',
    icon: CloudIcon,
    gradient: 'linear-gradient(135deg,#3B82F6,#8B5CF6)',
    glow: 'rgba(59,130,246,0.5)'
  },
  {
    title: 'Payments & eCommerce',
    description:
      'Secure payment flows and AI-enhanced eCommerce experiences that convert and scale.',
    icon: CreditCardIcon,
    gradient: 'linear-gradient(135deg,#E879F9,#8B5CF6)',
    glow: 'rgba(232,121,249,0.5)'
  },
  {
    title: 'Enterprise Digitization',
    description:
      'Complete digital transformation — turning manual, legacy workflows into modern, intelligent systems.',
    icon: BuildingOffice2Icon,
    gradient: 'linear-gradient(135deg,#22D3EE,#6366F1)',
    glow: 'rgba(34,211,238,0.5)'
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What we do"
          title="Services built to"
          highlight="ship"
          subtitle="Full-stack AI product engineering — from the first prototype to the system running in production."
        />
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;


import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Server, ShieldCheck, Cloud, Briefcase, LineChart, Palette } from 'lucide-react';

const ServicesOverview = () => {
  const services = [
    {
      icon: <Server className="w-12 h-12 text-white" />,
      title: "Managed IT Services",
      description: "Comprehensive support for your entire IT infrastructure with 24/7 monitoring and maintenance.",
      link: "/services/managed-it",
      bgColor: "bg-gradient-to-br from-gowith-dark-blue to-gowith-medium-blue"
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-white" />,
      title: "Cybersecurity Services",
      description: "Advanced protection against evolving threats with multi-layered security solutions.",
      link: "/services/cybersecurity",
      bgColor: "bg-gradient-to-br from-gowith-medium-blue to-gowith-light-blue"
    },
    {
      icon: <Cloud className="w-12 h-12 text-white" />,
      title: "Managed Cloud Services",
      description: "Secure, scalable cloud infrastructure optimized for performance and growth.",
      link: "/services/cloud",
      bgColor: "bg-gradient-to-br from-gowith-dark-blue to-gowith-medium-blue"
    },
    {
      icon: <Briefcase className="w-12 h-12 text-white" />,
      title: "Professional Services",
      description: "Expert guidance and implementation for strategic IT initiatives.",
      link: "/services/professional",
      bgColor: "bg-gradient-to-br from-gowith-medium-blue to-gowith-light-blue"
    },
    {
      icon: <LineChart className="w-12 h-12 text-white" />,
      title: "IT Strategy",
      description: "Aligning technology with business goals for sustainable growth and competitive advantage.",
      link: "/services/it-strategy",
      bgColor: "bg-gradient-to-br from-gowith-dark-blue to-gowith-medium-blue"
    },
    {
      icon: <Palette className="w-12 h-12 text-white" />,
      title: "Web Design & Development",
      description: "Professional websites that engage visitors, drive conversions, and reflect your brand identity.",
      link: "/services/web-design-development",
      bgColor: "bg-gradient-to-br from-gowith-medium-blue to-gowith-light-blue"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gowith-dark-blue mb-4">Our Comprehensive IT Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From day-to-day support to strategic planning, we provide the technology services your business needs to thrive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`${service.bgColor} rounded-lg shadow-lg p-8 text-white transition-transform duration-300 hover:scale-105`}
            >
              <div className="mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="mb-6 opacity-90">{service.description}</p>
              <Link to={service.link} className="inline-block text-white font-medium hover:underline">
                Learn More →
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/services">
            <Button className="bg-gowith-orange hover:bg-gowith-orange-hover text-white px-8 py-6 text-lg">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;

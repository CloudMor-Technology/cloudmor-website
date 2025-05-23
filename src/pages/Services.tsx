import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import CtaSection from "../components/CtaSection";
import ServiceHero from "../components/ServiceHero";
import { 
  Server, 
  ShieldCheck, 
  Cloud, 
  Briefcase, 
  LineChart, 
  Headphones, 
  Fingerprint, 
  Code 
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Server className="w-6 h-6 text-white" />,
      title: "Managed IT Services",
      description: "Comprehensive support for your entire IT infrastructure",
      link: "/services/managed-it",
      features: ["24/7 monitoring and support", "Proactive maintenance and updates", "Help desk and technical support", "Network management and optimization", "Hardware and software management"]
    }, 
    {
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      title: "Cybersecurity Services",
      description: "Advanced protection against evolving threats",
      link: "/services/cybersecurity",
      features: ["Security assessments and audits", "Endpoint protection and detection", "Email security and anti-phishing", "Security awareness training", "Incident response planning"]
    }, 
    {
      icon: <Cloud className="w-6 h-6 text-white" />,
      title: "Managed Cloud Services",
      description: "Secure, scalable cloud infrastructure solutions",
      link: "/services/cloud",
      features: ["Cloud migration and strategy", "Infrastructure optimization", "Backup and disaster recovery", "Cloud security and compliance", "Ongoing cloud management"]
    }, 
    {
      icon: <Briefcase className="w-6 h-6 text-white" />,
      title: "Professional Services",
      description: "Expert guidance for strategic IT initiatives",
      link: "/services/professional",
      features: ["IT project management", "Technology implementation", "Systems integration", "Software development", "Business process automation"]
    }, 
    {
      icon: <LineChart className="w-6 h-6 text-white" />,
      title: "IT Strategy",
      description: "Aligning technology with business goals",
      link: "/services/it-strategy",
      features: ["Technology roadmapping", "IT budget planning", "Digital transformation", "IT governance", "Strategic technology consultation"]
    },
    {
      icon: <Headphones className="w-6 h-6 text-white" />,
      title: "Business Comms Platform",
      description: "Unified communications for modern businesses",
      link: "/services/business-comms",
      features: ["Voice, messaging, and video integration", "Advanced call center capabilities", "CRM integration", "Business productivity tools", "Enterprise-grade security"]
    },
    {
      icon: <Fingerprint className="w-6 h-6 text-white" />,
      title: "Face ID Auth",
      description: "Secure biometric authentication solutions",
      link: "/services/face-id-auth",
      features: ["Web and mobile authentication", "Anti-spoofing technology", "Developer-friendly integration", "Enterprise security compliance", "Seamless user experience"]
    },
    {
      icon: <Code className="w-6 h-6 text-white" />,
      title: "Web Dev Automation",
      description: "AI-powered development acceleration",
      link: "/services/web-dev-automation",
      features: ["AI code generation", "No-code visual development", "Automated testing and deployment", "Intelligent project management", "Development process optimization"]
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <ServiceHero
          title="Comprehensive IT Services for Growing Businesses"
          subtitle="From day-to-day support to strategic planning, we provide the technology solutions your business needs to thrive in today's digital landscape."
        />

        {/* Services Overview */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gowith-dark-blue mb-4">
                Our Services
              </h2>
              <p className="text-lg text-gray-600">
                We offer a full spectrum of IT services designed to secure your data, optimize your infrastructure, and accelerate your business growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard 
                  key={index} 
                  icon={service.icon} 
                  title={service.title} 
                  description={service.description} 
                  link={service.link} 
                  features={service.features} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gowith-dark-blue mb-6">
                  Our Approach to IT Services
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  We believe that technology should be an accelerator for your business, not an obstacle. Our approach is built on four key pillars:
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="shrink-0 bg-gowith-light-blue rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">
                        Understand
                      </h3>
                      <p className="text-gray-600">
                        We begin by gaining a deep understanding of your business goals, challenges, and existing technology environment.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0 bg-gowith-light-blue rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">
                        Design
                      </h3>
                      <p className="text-gray-600">
                        We create a customized solution that addresses your specific needs, aligns with your budget, and provides a clear path forward.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0 bg-gowith-light-blue rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">
                        Implement
                      </h3>
                      <p className="text-gray-600">
                        Our certified experts deploy solutions with minimal disruption to your business operations, ensuring a smooth transition.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0 bg-gowith-light-blue rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">
                        Optimize
                      </h3>
                      <p className="text-gray-600">
                        We continuously monitor, maintain, and improve your IT systems to ensure optimal performance, security, and value.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1531973819741-e27a5ae2cc7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" alt="IT professionals in a meeting" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gowith-orange p-6 rounded-lg shadow-lg max-w-xs">
                  <p className="text-white font-bold text-xl">
                    "Technology is just a means to an end. The true goal is business success."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gowith-dark-blue mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-600">
                  Get answers to common questions about our IT services
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">
                    How quickly can you respond to IT issues?
                  </h3>
                  <p className="text-gray-600">
                    Our standard response time for critical issues is under 15 minutes. For non-critical issues, we typically respond within 1 hour during business hours. We offer 24/7 support for clients on our managed services plans.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">
                    Do you work with small businesses?
                  </h3>
                  <p className="text-gray-600">
                    Yes, we work with businesses of all sizes. We have specifically designed service packages for small and medium-sized businesses that provide enterprise-level technology solutions at an affordable price point.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">
                    How do you handle data security and privacy?
                  </h3>
                  <p className="text-gray-600">
                    We take a multi-layered approach to security, implementing best practices at every level. This includes endpoint protection, network security, email security, and security awareness training. We also help clients meet industry compliance requirements like HIPAA, PCI, and GDPR.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">
                    What sets GowithSupport apart from other IT service providers?
                  </h3>
                  <p className="text-gray-600">
                    Our combination of technical expertise, personalized service, and strategic approach sets us apart. We don't just fix IT problems—we help you use technology to achieve your business goals. Our team includes certified experts across all major platforms and technologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CtaSection />
      </main>
      <Footer />
    </>
  );
};
export default Services;

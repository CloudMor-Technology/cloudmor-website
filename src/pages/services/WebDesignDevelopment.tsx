
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ServiceHero from "../../components/ServiceHero";
import FinalCTA from "../../components/FinalCTA";
import SuccessMetrics from "../../components/SuccessMetrics";
import { 
  Palette, 
  Code, 
  Search, 
  Server, 
  Smartphone, 
  Monitor,
  Zap,
  Users,
  CheckCircle,
  ArrowRight,
  Star
} from "lucide-react";

const WebDesignDevelopment = () => {
  const designServices = [
    {
      icon: <Palette className="w-6 h-6 text-gowith-orange" />,
      title: "UI/UX Design",
      description: "Creating intuitive, engaging user experiences that convert visitors into customers."
    },
    {
      icon: <Smartphone className="w-6 h-6 text-gowith-orange" />,
      title: "Responsive Design",
      description: "Ensuring perfect display and functionality across all devices and screen sizes."
    },
    {
      icon: <Monitor className="w-6 h-6 text-gowith-orange" />,
      title: "Brand Integration",
      description: "Seamlessly incorporating your visual identity into compelling web experiences."
    }
  ];

  const developmentServices = [
    {
      icon: <Code className="w-6 h-6 text-gowith-orange" />,
      title: "Front-End Development",
      description: "Building the visual elements and interactions users experience on your website."
    },
    {
      icon: <Server className="w-6 h-6 text-gowith-orange" />,
      title: "Back-End Development",
      description: "Creating robust functionality and database systems that power your website."
    },
    {
      icon: <Zap className="w-6 h-6 text-gowith-orange" />,
      title: "CMS Implementation",
      description: "Enabling easy content management with user-friendly administrative interfaces."
    }
  ];

  const packages = [
    {
      name: "Starter Package",
      subtitle: "Perfect for small businesses and startups",
      features: [
        "Professional 7-page business website",
        "Mobile-responsive design",
        "Lead capture forms",
        "Service showcase sections",
        "Blog functionality",
        "SEO-optimized structure",
        "1-week development timeline"
      ],
      timeline: "1 week"
    },
    {
      name: "Growth Package",
      subtitle: "Ideal for established businesses seeking expansion",
      features: [
        "Up to 15-page comprehensive website",
        "Advanced functionality integration",
        "Mobile-responsive design across all devices",
        "Bug-free performance",
        "Lead generation forms",
        "Content management system",
        "Live chat integration",
        "Custom hero banners"
      ],
      timeline: "4 weeks"
    },
    {
      name: "Enterprise Solution",
      subtitle: "Custom development for complex business needs",
      features: [
        "Unlimited pages",
        "Custom functionality development",
        "Advanced integration capabilities",
        "Enterprise-grade security",
        "Scalable architecture",
        "Dedicated development team",
        "Tailored to your specific requirements"
      ],
      timeline: "Custom"
    }
  ];

  const successMetrics = [
    { value: "3,200+", label: "Websites Built" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "145%", label: "Average Traffic Increase" },
    { value: "24/7", label: "Support Available" },
    { value: "99.9%", label: "Uptime Guarantee" }
  ];

  const testimonials = [
    {
      quote: "GowithSupport transformed our online presence completely. Their team's expertise and dedication are unmatched. We've seen a 200% increase in leads since launching our new website.",
      author: "John Martinez",
      title: "CEO",
      company: "TechFlow Solutions"
    },
    {
      quote: "The website GowithSupport created for us is not only stunning but incredibly effective. We've experienced a significant boost in conversions and customer engagement.",
      author: "Sarah Chen",
      title: "Marketing Director",
      company: "InnovateCorp"
    },
    {
      quote: "Working with GowithSupport was seamless from start to finish. They delivered exactly what we envisioned and exceeded our expectations in every way.",
      author: "Michael Rodriguez",
      title: "Founder",
      company: "GreenTech Ventures"
    }
  ];

  const themes = [
    {
      category: "Modern Business Themes",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
      items: [
        "Minimalist Corporate - Clean lines and strategic typography",
        "Bold Typography-Driven - Impactful headlines with visual hierarchy",
        "Split-Screen Layout - Contrasting elements with natural flow",
        "Dark Mode Professional - Sophisticated backgrounds with accent colors",
        "Micro-Interaction Rich - Subtle animations and interactive elements"
      ]
    },
    {
      category: "E-Commerce Excellence",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      items: [
        "Product Showcase - High-quality imagery with minimal distractions",
        "Service Catalog - Organized grid layouts with clear categorization",
        "Conversion-Focused - Strategic CTAs and testimonials placement"
      ]
    },
    {
      category: "Creative Portfolio Styles",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2364&q=80",
      items: [
        "Interactive Storytelling - Narrative-driven scrolling experiences",
        "Creative Agency Showcase - Bold visuals with interactive elements",
        "Photographer Portfolio - Full-screen imagery with minimal UI",
        "3D Elements Integration - WebGL and immersive animations"
      ]
    },
    {
      category: "Industry-Specific Excellence",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      items: [
        "Professional Services - Clean, trust-building design",
        "Healthcare & Wellness - Calming palettes with accessible architecture",
        "Restaurant & Hospitality - Immersive imagery and reservation systems",
        "Technology & SaaS - Feature-focused with value propositions"
      ]
    },
    {
      category: "Cutting-Edge Approaches",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      items: [
        "AI-Enhanced Experience - Personalized content delivery",
        "Sustainability Showcase - Eco-conscious design elements",
        "Accessibility-First - Inclusive design for all users",
        "Virtual Experience - Immersive interactive environments"
      ]
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "Understanding your business goals, target audience, competitive analysis, and creating a strategic roadmap."
    },
    {
      step: "02", 
      title: "Design & Prototyping",
      description: "Wireframing key pages, creating visual mockups, and developing interactive prototypes for testing."
    },
    {
      step: "03",
      title: "Development & Integration", 
      description: "Clean front-end coding, robust back-end development, and third-party integrations."
    },
    {
      step: "04",
      title: "Testing & Launch",
      description: "Cross-browser testing, performance optimization, security implementation, and controlled launch."
    },
    {
      step: "05",
      title: "Support & Growth",
      description: "Post-launch support, performance analytics, ongoing maintenance, and continuous optimization."
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        <ServiceHero
          title="Web Design & Development"
          subtitle="Transform your online presence into a powerful business asset"
          description="We create stunning, functional websites that engage visitors, drive conversions, and reflect your brand's unique identity using cutting-edge design trends and proven development practices."
          backgroundClass="from-gowith-dark-blue via-gowith-medium-blue to-gowith-light-blue"
        />

        {/* Success Metrics */}
        <SuccessMetrics
          title="Our Web Development Success Story"
          subtitle="Proven results for businesses worldwide"
          metrics={successMetrics}
        />

        {/* Client Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gowith-dark-blue mb-6">
                What Our Clients Say
              </h2>
              <p className="text-lg text-gray-600">
                Hear from business leaders who've transformed their online presence with our services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-gowith-orange fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-600 mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-bold text-gowith-dark-blue">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.title}, {testimonial.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gowith-dark-blue mb-6">
                Comprehensive Web Design & Development Services
              </h2>
              <p className="text-lg text-gray-600">
                We combine cutting-edge design trends with proven development practices to deliver websites that stand out in today's competitive digital landscape.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Design Services */}
              <div>
                <h3 className="text-2xl font-bold text-gowith-dark-blue mb-8 flex items-center">
                  <Palette className="w-8 h-8 text-gowith-orange mr-3" />
                  Design Services
                </h3>
                <div className="space-y-6">
                  {designServices.map((service, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="shrink-0">
                        {service.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gowith-dark-blue mb-2">
                          {service.title}
                        </h4>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Development Services */}
              <div>
                <h3 className="text-2xl font-bold text-gowith-dark-blue mb-8 flex items-center">
                  <Code className="w-8 h-8 text-gowith-orange mr-3" />
                  Development Services
                </h3>
                <div className="space-y-6">
                  {developmentServices.map((service, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="shrink-0">
                        {service.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gowith-dark-blue mb-2">
                          {service.title}
                        </h4>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Services */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gowith-dark-blue mb-6 text-center">
                Additional Services
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Search className="w-12 h-12 text-gowith-orange mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-gowith-dark-blue mb-2">SEO Optimization</h4>
                  <p className="text-gray-600">Building for search engine visibility from the ground up</p>
                </div>
                <div className="text-center">
                  <Server className="w-12 h-12 text-gowith-orange mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-gowith-dark-blue mb-2">Hosting Solutions</h4>
                  <p className="text-gray-600">Reliable, secure website hosting with optimal performance</p>
                </div>
                <div className="text-center">
                  <Users className="w-12 h-12 text-gowith-orange mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-gowith-dark-blue mb-2">Ongoing Maintenance</h4>
                  <p className="text-gray-600">Keeping your site secure, updated, and performing optimally</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Development Process */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gowith-dark-blue mb-6">
                Our Development Process
              </h2>
              <p className="text-lg text-gray-600">
                A structured approach that ensures consistent results and exceptional websites
              </p>
            </div>

            <div className="space-y-8">
              {process.map((item, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="shrink-0 bg-gowith-orange text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gowith-dark-blue mb-3">
                      {item.title}
                    </h3>
                    <p className="text-lg text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Website Development Packages */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gowith-dark-blue mb-6">
                Website Development Packages
              </h2>
              <p className="text-lg text-gray-600">
                Tailored solutions designed to meet the unique needs of businesses at every stage of growth
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold text-gowith-dark-blue mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-6">{pkg.subtitle}</p>
                  
                  <div className="mb-8">
                    <ul className="space-y-3">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-gowith-orange mt-0.5 shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-4">Timeline: {pkg.timeline}</div>
                    <button className="w-full bg-gowith-orange hover:bg-gowith-orange-hover text-white font-bold py-3 px-6 rounded-md transition-colors">
                      Request a Quote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Website Themes */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gowith-dark-blue mb-6">
                Professional Website Themes We Offer
              </h2>
              <p className="text-lg text-gray-600">
                Choose from our collection of professional themes, each designed for specific business needs and objectives
              </p>
            </div>

            <div className="space-y-16">
              {themes.map((category, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="relative h-64 lg:h-auto">
                      <img 
                        src={category.image} 
                        alt={category.category}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gowith-dark-blue bg-opacity-20"></div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gowith-dark-blue mb-6">{category.category}</h3>
                      <div className="space-y-4">
                        {category.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-3">
                            <ArrowRight className="w-5 h-5 text-gowith-orange mt-1 shrink-0" />
                            <p className="text-gray-700">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gowith-dark-blue mb-6">
                Why Choose Our Web Design Services?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gowith-light-blue rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gowith-dark-blue mb-3">Results-Driven Approach</h3>
                <p className="text-gray-600">We focus on creating websites that achieve your business objectives, whether generating leads, increasing sales, or building brand awareness.</p>
              </div>

              <div className="text-center">
                <div className="bg-gowith-light-blue rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gowith-dark-blue mb-3">User-Centric Design</h3>
                <p className="text-gray-600">Our designs prioritize the user experience, making it easy for visitors to find information and take action.</p>
              </div>

              <div className="text-center">
                <div className="bg-gowith-light-blue rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gowith-dark-blue mb-3">Technical Excellence</h3>
                <p className="text-gray-600">Our development team follows best practices to ensure your website is fast, secure, and reliable.</p>
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
                  Get answers to common questions about our web design and development services
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">
                    How long does it take to build a website?
                  </h3>
                  <p className="text-gray-600">
                    Development timelines vary based on complexity. Simple websites can be completed in 1-2 weeks, while more complex projects may take 4-8 weeks.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">
                    What platforms do you build websites on?
                  </h3>
                  <p className="text-gray-600">
                    We build on all major platforms including WordPress, Shopify, WooCommerce, and custom solutions depending on your needs.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">
                    Will my website be mobile-friendly?
                  </h3>
                  <p className="text-gray-600">
                    Absolutely! All our websites are built with responsive design to ensure they look and function perfectly on all devices.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">
                    Do you help with website content?
                  </h3>
                  <p className="text-gray-600">
                    Yes, we offer content creation services to help craft compelling messaging for your website.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">
                    What happens after my website launches?
                  </h3>
                  <p className="text-gray-600">
                    We provide ongoing support and maintenance to ensure your website continues to perform optimally, including security updates and performance monitoring.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FinalCTA
          headline="Ready to Transform Your Online Presence?"
          buttonText="Get Started Today"
          buttonLink="/contact"
        />
      </main>
      <Footer />
    </>
  );
};

export default WebDesignDevelopment;

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ServiceHero from "../../components/ServiceHero";
import FinalCTA from "../../components/FinalCTA";
import SuccessMetrics from "../../components/SuccessMetrics";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
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
  Star,
  ExternalLink
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
    },
    {
      quote: "The financial portal they built for us has revolutionized how we serve our clients. The security features and user experience are exceptional.",
      author: "Emily Johnson",
      title: "VP of Technology",
      company: "Baleen Specialty Insurance"
    },
    {
      quote: "Our accounting firm's new website has attracted more high-value clients than ever before. The professional design speaks volumes about our expertise.",
      author: "David Wilson",
      title: "Managing Partner",
      company: "Maxwell Locke & Ritter LLP"
    },
    {
      quote: "The e-commerce platform exceeded our expectations. Sales have increased by 180% since the launch, and customer feedback has been overwhelmingly positive.",
      author: "Lisa Thompson",
      title: "Operations Manager",
      company: "Allied Wallet"
    },
    {
      quote: "GowithSupport's attention to detail and understanding of our industry needs made all the difference. The website perfectly captures our brand identity.",
      author: "Robert Kim",
      title: "Creative Director",
      company: "Digital Dynamics"
    },
    {
      quote: "The mobile-responsive design has improved our user engagement significantly. We're seeing more conversions from mobile traffic than ever before.",
      author: "Jennifer Davis",
      title: "Marketing Manager",
      company: "TechAdvantage"
    },
    {
      quote: "From concept to launch, the team maintained excellent communication and delivered on every promise. Our new site is a powerful business tool.",
      author: "Mark Anderson",
      title: "Business Owner",
      company: "Anderson Consulting"
    },
    {
      quote: "The SEO optimization has been incredible. We've moved from page 3 to the top 3 results for our main keywords within just 6 months.",
      author: "Patricia Brown",
      title: "CEO",
      company: "Brown & Associates"
    },
    {
      quote: "The custom CMS they developed allows us to update content easily while maintaining the professional design. It's exactly what we needed.",
      author: "Thomas Lee",
      title: "Content Manager",
      company: "Lee Financial Group"
    },
    {
      quote: "Security was our top priority, and they delivered a robust, secure platform that gives us and our clients complete peace of mind.",
      author: "Amanda White",
      title: "Security Officer",
      company: "SecureBank"
    },
    {
      quote: "The integration with our existing systems was flawless. The website works seamlessly with our CRM and accounting software.",
      author: "Christopher Garcia",
      title: "IT Director",
      company: "Garcia Industries"
    },
    {
      quote: "Their ongoing support and maintenance service ensures our website stays current and performs optimally. Truly a partnership we value.",
      author: "Michelle Taylor",
      title: "Operations Director",
      company: "Taylor Enterprises"
    },
    {
      quote: "The analytics and reporting features help us understand our customers better and make data-driven decisions for our business growth.",
      author: "Steven Clark",
      title: "Data Analyst",
      company: "Clark Analytics"
    },
    {
      quote: "The website's loading speed and performance optimization have significantly improved our search rankings and user satisfaction.",
      author: "Rachel Martinez",
      title: "Digital Marketing Specialist",
      company: "Martinez Media"
    },
    {
      quote: "They turned our vision into reality while suggesting improvements we hadn't considered. The result exceeded our highest expectations.",
      author: "Kevin Wright",
      title: "Founder",
      company: "Wright Solutions"
    },
    {
      quote: "The backup and disaster recovery features give us confidence that our business continuity is protected at all times.",
      author: "Nicole Adams",
      title: "Risk Manager",
      company: "Adams Insurance"
    }
  ];

  const websiteShowcase = [
    {
      title: "Financial Services Portal",
      category: "Finance & Banking",
      description: "Modern banking interface with secure dashboard and investment tracking",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Secure Login", "Real-time Analytics", "Mobile Banking"]
    },
    {
      title: "Corporate Business Hub",
      category: "Corporate",
      description: "Professional corporate website with service showcase and team profiles",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Service Catalog", "Team Directory", "Client Portal"]
    },
    {
      title: "Investment Platform",
      category: "Investment",
      description: "Sophisticated platform for portfolio management and market analysis",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Portfolio Tracking", "Market Data", "Risk Analysis"]
    },
    {
      title: "Consulting Firm Website",
      category: "Professional Services",
      description: "Clean, trust-building design for management consulting firm",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Case Studies", "Expert Profiles", "Resource Library"]
    },
    {
      title: "Fintech Startup",
      category: "Technology",
      description: "Modern fintech application with innovative payment solutions",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["API Integration", "Real-time Payments", "Security Features"]
    },
    {
      title: "Insurance Agency Portal",
      category: "Insurance",
      description: "Comprehensive insurance platform with quote generation and claims",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Quote Calculator", "Claims Portal", "Policy Management"]
    },
    {
      title: "Accounting Firm Site",
      category: "Accounting",
      description: "Professional accounting services website with client management",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Service Booking", "Document Upload", "Tax Calculator"]
    },
    {
      title: "Real Estate Platform",
      category: "Real Estate",
      description: "Interactive property listing platform with virtual tours",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Property Search", "Virtual Tours", "Mortgage Calculator"]
    },
    {
      title: "Wealth Management Hub",
      category: "Wealth Management",
      description: "Sophisticated platform for high-net-worth client management",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Portfolio Analysis", "Client Dashboard", "Reporting Tools"]
    },
    {
      title: "Credit Union Website",
      category: "Banking",
      description: "Community-focused banking website with member services",
      image: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Member Portal", "Loan Applications", "Online Banking"]
    },
    // Financial Services (10 websites)
    {
      title: "Baleen Specialty Insurance Portal",
      category: "Insurance & Risk Management",
      description: "Comprehensive insurance platform for high-risk clients with advanced underwriting tools",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Risk Assessment", "Policy Management", "Claims Processing"],
      caseStudyLink: "/case-studies/baleen-specialty"
    },
    {
      title: "Maxwell Locke & Ritter Financial Hub",
      category: "Accounting & Financial Services",
      description: "Professional accounting firm platform with client management and financial reporting",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Client Portal", "Financial Reports", "Tax Management"],
      caseStudyLink: "/case-studies/maxwell-locke-ritter"
    },
    {
      title: "Allied Wallet Payment Gateway",
      category: "Payment Processing",
      description: "Secure payment processing platform with multi-currency support and fraud protection",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Payment Processing", "Fraud Detection", "Multi-Currency"],
      caseStudyLink: "/case-studies/allied-wallet"
    },
    {
      title: "Premier Investment Management",
      category: "Investment Services",
      description: "Sophisticated investment platform with portfolio analysis and market insights",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Portfolio Analysis", "Market Research", "Investment Tools"],
      caseStudyLink: "/case-studies/premier-investment"
    },
    {
      title: "SecureBank Online Banking",
      category: "Digital Banking",
      description: "Modern banking platform with advanced security and mobile-first design",
      image: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Online Banking", "Mobile App", "Security Features"],
      caseStudyLink: "/case-studies/securebank"
    },
    {
      title: "Wealth Advisors Platform",
      category: "Wealth Management",
      description: "Comprehensive wealth management system for high-net-worth clients",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Wealth Planning", "Client Management", "Performance Tracking"],
      caseStudyLink: "/case-studies/wealth-advisors"
    },
    {
      title: "FinTech Innovations Hub",
      category: "Financial Technology",
      description: "Cutting-edge fintech platform with AI-powered financial insights",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["AI Analytics", "API Integration", "Real-time Data"],
      caseStudyLink: "/case-studies/fintech-innovations"
    },
    {
      title: "Credit Union Services Portal",
      category: "Credit Union",
      description: "Member-focused banking platform with community features and loan services",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Member Services", "Loan Applications", "Community Features"],
      caseStudyLink: "/case-studies/credit-union"
    },
    {
      title: "Insurance Brokers Network",
      category: "Insurance Brokerage",
      description: "Comprehensive platform connecting insurance brokers with clients and carriers",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Broker Network", "Quote Comparison", "Client Matching"],
      caseStudyLink: "/case-studies/insurance-brokers"
    },
    {
      title: "Real Estate Investment Trust",
      category: "Real Estate Finance",
      description: "Professional REIT platform with property management and investor relations",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Property Management", "Investor Portal", "Financial Reporting"],
      caseStudyLink: "/case-studies/reit-platform"
    },

    // Corporate Business (10 websites)
    {
      title: "TechFlow Solutions Corporate",
      category: "Technology Consulting",
      description: "Professional consulting firm website with service showcase and team profiles",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Service Catalog", "Team Profiles", "Client Testimonials"],
      caseStudyLink: "/case-studies/techflow-solutions"
    },
    {
      title: "InnovateCorp Enterprise Hub",
      category: "Innovation & Strategy",
      description: "Corporate innovation platform with project management and collaboration tools",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Project Management", "Team Collaboration", "Innovation Tracking"],
      caseStudyLink: "/case-studies/innovatecorp"
    },
    {
      title: "GreenTech Ventures Platform",
      category: "Sustainable Technology",
      description: "Environmental technology showcase with sustainability reporting and green solutions",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Sustainability Reports", "Green Solutions", "Environmental Impact"],
      caseStudyLink: "/case-studies/greentech-ventures"
    },
    {
      title: "Digital Dynamics Agency",
      category: "Digital Marketing",
      description: "Full-service digital marketing agency with campaign management and analytics",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Campaign Management", "Analytics Dashboard", "Client Reporting"],
      caseStudyLink: "/case-studies/digital-dynamics"
    },
    {
      title: "TechAdvantage Solutions",
      category: "IT Services",
      description: "Comprehensive IT services platform with support ticketing and service management",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Support Ticketing", "Service Management", "IT Solutions"],
      caseStudyLink: "/case-studies/techadvantage"
    },
    {
      title: "Anderson Consulting Group",
      category: "Management Consulting",
      description: "Strategic consulting firm with case study library and expertise showcase",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Case Studies", "Expertise Areas", "Consultant Profiles"],
      caseStudyLink: "/case-studies/anderson-consulting"
    },
    {
      title: "Brown & Associates Legal",
      category: "Legal Services",
      description: "Law firm platform with practice area information and attorney profiles",
      image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Practice Areas", "Attorney Profiles", "Legal Resources"],
      caseStudyLink: "/case-studies/brown-associates"
    },
    {
      title: "Garcia Industries Manufacturing",
      category: "Manufacturing",
      description: "Industrial manufacturing platform with product catalog and capabilities showcase",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Product Catalog", "Manufacturing Capabilities", "Quality Standards"],
      caseStudyLink: "/case-studies/garcia-industries"
    },
    {
      title: "Taylor Enterprises Operations",
      category: "Operations Management",
      description: "Operations management platform with workflow optimization and performance tracking",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Workflow Management", "Performance Analytics", "Operations Dashboard"],
      caseStudyLink: "/case-studies/taylor-enterprises"
    },
    {
      title: "Wright Solutions Engineering",
      category: "Engineering Services",
      description: "Engineering consultancy with project portfolio and technical expertise showcase",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Project Portfolio", "Technical Expertise", "Engineering Solutions"],
      caseStudyLink: "/case-studies/wright-solutions"
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

        {/* Website Showcase */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gowith-dark-blue mb-6">
                Our Website Portfolio Showcase
              </h2>
              <p className="text-lg text-gray-600">
                Explore our collection of professionally designed websites across various industries
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {websiteShowcase.map((site, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <img 
                      src={site.image} 
                      alt={site.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gowith-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                        {site.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">{site.title}</h3>
                    <p className="text-gray-600 mb-4">{site.description}</p>
                    <div className="space-y-2 mb-4">
                      {site.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-gowith-orange" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <a 
                      href={site.caseStudyLink}
                      className="flex items-center gap-2 text-gowith-orange hover:text-gowith-orange-hover font-medium"
                    >
                      View Case Study
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Testimonials with Carousel */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gowith-dark-blue mb-6">
                What Our Clients Say
              </h2>
              <p className="text-lg text-gray-600">
                Hear from business leaders who've transformed their online presence with our services
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <Carousel className="w-full">
                <CarouselContent>
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="bg-gray-50 rounded-lg shadow-lg p-8 h-full">
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
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
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

        {/* FAQ Section - Shortened */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gowith-dark-blue mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-600">
                  Quick answers to common questions about our web services
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">
                    How long does it take to build a website?
                  </h3>
                  <p className="text-gray-600">
                    Simple websites: 1-2 weeks. Complex projects: 4-8 weeks depending on requirements.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">
                    Will my website be mobile-friendly?
                  </h3>
                  <p className="text-gray-600">
                    Yes! All our websites are built with responsive design for perfect display on all devices.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">
                    What happens after launch?
                  </h3>
                  <p className="text-gray-600">
                    We provide ongoing support, maintenance, security updates, and performance monitoring.
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

import { Building2, Activity, Scale, Briefcase, HardDrive, Rocket, Film, Landmark, Heart } from 'lucide-react';

export const industryData = [
  {
    name: "Financial Services",
    slug: "financial-services",
    icon: <Building2 className="w-16 h-16" />,
    headline: "Secure, Compliant IT Solutions for Financial Services",
    subheadline: "Technology that protects your data, ensures compliance, and drives business growth",
    brief: "From strict regulatory requirements to the constant threat of cyber attacks, financial institutions require specialized IT solutions that balance security, compliance, and operational efficiency.",
    overview: "CloudMor understands the unique challenges facing financial services organizations. From strict regulatory requirements to the constant threat of cyber attacks, financial institutions require specialized IT solutions that balance security, compliance, and operational efficiency. Our team delivers comprehensive technology services tailored to the specific needs of banks, credit unions, investment firms, and insurance companies.",
    challenges: [
      {
        title: "Regulatory Compliance",
        description: "Financial institutions must navigate complex regulatory frameworks including GLBA, PCI DSS, SOX, and others. Non-compliance can result in significant penalties and reputational damage."
      },
      {
        title: "Cybersecurity Threats",
        description: "Financial services organizations are prime targets for cyber attacks due to the sensitive data they manage. Sophisticated threats require advanced security measures."
      },
      {
        title: "Customer Expectations",
        description: "Today's customers expect seamless digital experiences across multiple channels. Legacy systems often struggle to deliver the agility needed to meet these expectations."
      },
      {
        title: "Operational Efficiency",
        description: "Cost pressures and competition drive the need for operational efficiency while maintaining high service levels and security."
      }
    ],
    solutions: [
      {
        title: "Compliance and Security",
        items: [
          "Comprehensive security solutions aligned with financial industry regulations",
          "Regular security assessments and compliance audits",
          "Data protection strategies for sensitive financial information",
          "Security awareness training for employees"
        ]
      },
      {
        title: "Modern Infrastructure",
        items: [
          "Secure, scalable cloud solutions for financial applications",
          "High-availability systems to ensure business continuity",
          "Network optimization for performance and security",
          "Disaster recovery solutions with minimal downtime"
        ]
      },
      {
        title: "Digital Transformation",
        items: [
          "Modernization of legacy banking systems",
          "Secure mobile and online banking solutions",
          "Integration between financial platforms",
          "Data analytics for customer insights and risk management"
        ]
      }
    ],
    whyChooseUs: "Our team includes specialists with extensive experience in the financial services sector. We understand the unique regulatory requirements, security considerations, and operational challenges you face. Our solutions are designed to address these specific needs while providing the reliability and support critical to financial organizations.",
    caseStudy: "When a regional credit union needed to modernize their infrastructure while enhancing security, CloudMor delivered a comprehensive solution that reduced operational costs by 30% while improving compliance posture and customer experience.",
    ctaHeadline: "Enhance Your Financial Institution's Security and Efficiency",
    ctaButtonText: "Schedule a Financial Services IT Consultation"
  },
  {
    name: "Healthcare",
    slug: "healthcare",
    icon: <Activity className="w-16 h-16" />,
    headline: "HIPAA-Compliant IT Solutions for Healthcare",
    subheadline: "Secure, reliable technology that supports patient care and operational excellence",
    brief: "Healthcare organizations must protect patient data while ensuring it's available to authorized personnel. HIPAA violations can result in significant penalties and reputation damage.",
    overview: "CloudMor provides specialized IT solutions for healthcare organizations that address the unique challenges of managing patient data, ensuring compliance, and supporting quality care. Our healthcare IT experts understand the critical nature of your systems and the importance of maintaining both security and accessibility. We deliver technology services that help healthcare providers focus on what matters most—patient outcomes.",
    challenges: [
      {
        title: "HIPAA Compliance",
        description: "Healthcare organizations must protect patient data while ensuring it's available to authorized personnel. HIPAA violations can result in significant penalties and reputation damage."
      },
      {
        title: "System Availability",
        description: "Healthcare systems must be available 24/7, as downtime can directly impact patient care and safety. Reliability is mission-critical."
      },
      {
        title: "Integration Complexity",
        description: "Electronic health records (EHR), practice management, billing systems, and medical devices must work together seamlessly to support efficient operations."
      },
      {
        title: "Evolving Technology",
        description: "Telehealth, remote monitoring, and other advances require secure, reliable infrastructure to support new care delivery models."
      }
    ],
    solutions: [
      {
        title: "HIPAA-Compliant Infrastructure",
        items: [
          "Secure systems designed to protect patient data",
          "Comprehensive HIPAA risk assessments",
          "Documentation and policies to support compliance",
          "Audit trails and access controls for sensitive data"
        ]
      },
      {
        title: "Healthcare System Integration",
        items: [
          "Seamless integration between EHR and practice management systems",
          "Secure health information exchange (HIE) capabilities",
          "Connected medical device management",
          "Unified communications for care team collaboration"
        ]
      },
      {
        title: "Reliable Infrastructure",
        items: [
          "High-availability systems with minimal downtime",
          "Robust backup and disaster recovery solutions",
          "24/7 monitoring and support for critical systems",
          "Scalable solutions that grow with your practice"
        ]
      },
      {
        title: "Telehealth Support",
        items: [
          "Secure, reliable platforms for remote patient consultations",
          "HIPAA-compliant communication solutions",
          "Technical support for practitioners and patients",
          "Integration with existing healthcare systems"
        ]
      }
    ],
    whyChooseUs: "Our healthcare IT specialists have extensive experience working with medical practices, hospitals, and other healthcare organizations. We understand the critical nature of healthcare technology and the importance of balancing security, compliance, and accessibility. Our proactive approach ensures your systems remain secure and operational, allowing your team to focus on patient care.",
    caseStudy: "When a multi-location medical practice needed to implement a new EHR system while ensuring HIPAA compliance, CloudMor managed the entire process—from system selection to implementation and training—resulting in improved patient care coordination and a 25% reduction in administrative time.",
    ctaHeadline: "Enhance Patient Care with Secure, Reliable Healthcare IT",
    ctaButtonText: "Request a HIPAA Compliance Assessment"
  },
  {
    name: "Law Firms",
    slug: "law-firms",
    icon: <Scale className="w-16 h-16" />,
    headline: "Secure IT Solutions for Legal Professionals",
    subheadline: "Technology that protects client confidentiality while enhancing productivity",
    brief: "Law firms must maintain strict confidentiality for client information. Security breaches can result in ethical violations, malpractice claims, and reputational damage.",
    overview: "CloudMor understands the unique technology challenges facing law firms. From maintaining client confidentiality to managing complex document systems, legal professionals require specialized IT solutions that balance security, efficiency, and accessibility. Our team delivers comprehensive technology services tailored to the specific needs of law firms of all sizes.",
    challenges: [
      {
        title: "Client Confidentiality",
        description: "Law firms must maintain strict confidentiality for client information. Security breaches can result in ethical violations, malpractice claims, and reputational damage."
      },
      {
        title: "Document Management",
        description: "Legal professionals deal with vast amounts of documentation that must be organized, searchable, and securely accessible to authorized users."
      },
      {
        title: "Mobility Requirements",
        description: "Attorneys need secure access to case files and documents from courtrooms, client meetings, and other remote locations."
      },
      {
        title: "E-Discovery Compliance",
        description: "Modern litigation requires comprehensive electronic discovery capabilities, including preservation, collection, and production of electronic documents."
      }
    ],
    solutions: [
      {
        title: "Secure Infrastructure",
        items: [
          "Advanced security measures to protect client information",
          "Secure remote access for attorneys and staff",
          "Email encryption and data loss prevention",
          "Comprehensive security policies and training"
        ]
      },
      {
        title: "Legal-Specific Applications",
        items: [
          "Implementation and support for legal practice management software",
          "Document management systems with robust search capabilities",
          "Time and billing system integration",
          "Case management solutions"
        ]
      },
      {
        title: "E-Discovery Support",
        items: [
          "Systems for preserving and collecting electronic evidence",
          "Data storage solutions for large document repositories",
          "Chain of custody documentation",
          "Integration with e-discovery platforms"
        ]
      },
      {
        title: "Mobility Solutions",
        items: [
          "Secure mobile device management",
          "Remote access to case files and documents",
          "Virtual meeting capabilities for client consultations",
          "Cloud-based solutions for anywhere access"
        ]
      }
    ],
    whyChooseUs: "Our team includes specialists with extensive experience working with law firms. We understand the ethical obligations, workflow requirements, and security considerations unique to legal professionals. Our solutions are designed to address these specific needs while providing the reliability and support critical to your practice.",
    caseStudy: "When a growing law firm needed to implement a new document management system while ensuring client confidentiality, CloudMor delivered a comprehensive solution that improved attorney productivity by 35% while strengthening security and compliance.",
    ctaHeadline: "Enhance Your Firm's Security and Efficiency",
    ctaButtonText: "Schedule a Legal IT Consultation"
  },
  {
    name: "Private Equity",
    slug: "private-equity",
    icon: <Briefcase className="w-16 h-16" />,
    headline: "Strategic IT Solutions for Private Equity Firms",
    subheadline: "Technology that supports due diligence, portfolio management, and firm operations",
    brief: "Private equity firms manage highly sensitive financial data that requires robust security measures to prevent unauthorized access or breaches.",
    overview: "CloudMor delivers specialized IT solutions designed for the unique needs of private equity firms. From supporting due diligence processes to securing sensitive financial data, our team provides technology services that enhance operational efficiency, protect critical information, and support your firm's growth strategies.",
    challenges: [
      {
        title: "Data Security",
        description: "Private equity firms manage highly sensitive financial data that requires robust security measures to prevent unauthorized access or breaches."
      },
      {
        title: "Due Diligence Support",
        description: "Effective due diligence requires secure data rooms, reliable communication channels, and efficient document management."
      },
      {
        title: "Portfolio Company Integration",
        description: "Firms need to efficiently integrate with and assess the technology environments of portfolio companies."
      },
      {
        title: "Investor Reporting",
        description: "Secure, timely reporting to limited partners requires reliable systems and data management."
      }
    ],
    solutions: [
      {
        title: "Secure Financial Infrastructure",
        items: [
          "Advanced security measures for financial data protection",
          "Secure communication channels for sensitive discussions",
          "Compliance with financial industry regulations",
          "24/7 monitoring and threat detection"
        ]
      },
      {
        title: "Due Diligence Technology",
        items: [
          "Secure virtual data room implementation and management",
          "Document management systems for efficient review",
          "Collaboration tools for deal teams",
          "Mobile access for on-the-go analysis"
        ]
      },
      {
        title: "Portfolio Company Support",
        items: [
          "IT assessments of potential acquisitions",
          "Technology integration planning and execution",
          "Performance optimization for portfolio companies",
          "Value creation through strategic IT improvements"
        ]
      },
      {
        title: "Investor Relations Technology",
        items: [
          "Secure portals for investor communications",
          "Automated reporting systems",
          "CRM integration for relationship management",
          "Secure document distribution"
        ]
      }
    ],
    whyChooseUs: "Our team understands the fast-paced, high-stakes environment of private equity. We deliver technology solutions that provide the security, reliability, and efficiency necessary for successful deal-making and portfolio management. Our experience working with financial services firms ensures we understand your unique requirements and priorities.",
    caseStudy: "When a private equity firm needed to enhance its due diligence capabilities while strengthening data security, CloudMor implemented a comprehensive solution that accelerated the deal review process by 40% while ensuring regulatory compliance and data protection.",
    ctaHeadline: "Enhance Your Firm's Due Diligence and Data Security",
    ctaButtonText: "Schedule a Private Equity IT Consultation"
  },
  {
    name: "Manufacturing",
    slug: "manufacturing",
    icon: <HardDrive className="w-16 h-16" />,
    headline: "Innovative IT Solutions for Manufacturing",
    subheadline: "Technology that optimizes production, enhances quality, and drives operational efficiency",
    brief: "Manufacturing environments require seamless integration between IT systems and operational technology (OT) on the production floor.",
    overview: "CloudMor provides specialized IT solutions that address the unique challenges facing modern manufacturers. From production floor systems to supply chain management, our team delivers technology services that improve operational efficiency, maintain quality standards, and support your competitive advantage in a rapidly evolving industry.",
    challenges: [
      {
        title: "Operational Technology Integration",
        description: "Manufacturing environments require seamless integration between IT systems and operational technology (OT) on the production floor."
      },
      {
        title: "Supply Chain Visibility",
        description: "Complex supply chains demand real-time visibility and coordination to maintain production schedules and manage inventory effectively."
      },
      {
        title: "Quality Control",
        description: "Maintaining consistent quality requires reliable systems for monitoring, testing, and documenting throughout the production process."
      },
      {
        title: "Cybersecurity for Industrial Systems",
        description: "Connected manufacturing systems face unique security challenges that require specialized protection approaches."
      }
    ],
    solutions: [
      {
        title: "IT/OT Integration",
        items: [
          "Secure integration between business systems and production equipment",
          "Real-time data collection and analysis from manufacturing processes",
          "Industrial Internet of Things (IIoT) implementation and support",
          "Remote monitoring and management capabilities"
        ]
      },
      {
        title: "Supply Chain Technology",
        items: [
          "End-to-end visibility solutions for supply chain management",
          "Integration with supplier and logistics systems",
          "Inventory optimization through advanced analytics",
          "Contingency planning for supply chain disruptions"
        ]
      },
      {
        title: "Quality Management Systems",
        items: [
          "Automated quality control monitoring",
          "Electronic record keeping for compliance and traceability",
          "Integration with testing and measurement equipment",
          "Real-time alerting for quality issues"
        ]
      },
      {
        title: "Industrial Cybersecurity",
        items: [
          "Specialized security for manufacturing environments",
          "Network segmentation between IT and OT systems",
          "Secure remote access for vendors and maintenance",
          "Compliance with industry standards and regulations"
        ]
      }
    ],
    whyChooseUs: "Our team includes specialists with extensive experience in manufacturing environments. We understand the unique challenges of integrating traditional IT with operational technology while maintaining security, reliability, and efficiency. Our solutions are designed to address these specific needs while providing the support critical to maintaining production schedules.",
    caseStudy: "When a precision manufacturing company needed to modernize their production systems while improving cybersecurity, CloudMor delivered a comprehensive solution that increased operational efficiency by 28% while enhancing protection for critical production systems.",
    ctaHeadline: "Optimize Your Manufacturing Operations with Strategic IT",
    ctaButtonText: "Request a Manufacturing Technology Assessment"
  },
  {
    name: "Technology & Startups",
    slug: "technology-startups",
    icon: <Rocket className="w-16 h-16" />,
    headline: "Scalable IT Solutions for Growing Tech Companies",
    subheadline: "Technology infrastructure that supports innovation, growth, and competitive advantage",
    brief: "Tech companies and startups need infrastructure that can scale rapidly to accommodate growth and changing demands.",
    overview: "CloudMor provides specialized IT solutions designed for the unique needs of technology companies and startups. From establishing scalable infrastructure to implementing robust security, our team delivers technology services that support your rapid growth, protect your intellectual property, and help you focus on your core business of innovation and market expansion.",
    challenges: [
      {
        title: "Scalability Requirements",
        description: "Tech companies and startups need infrastructure that can scale rapidly to accommodate growth and changing demands."
      },
      {
        title: "Developer Support",
        description: "Technical teams require reliable environments for development, testing, and deployment of new products and features."
      },
      {
        title: "Intellectual Property Protection",
        description: "Innovative companies must safeguard their valuable intellectual property from theft or unauthorized access."
      },
      {
        title: "Talent Attraction and Retention",
        description: "Modern, flexible technology environments are essential for attracting and retaining top technical talent."
      }
    ],
    solutions: [
      {
        title: "Scalable Infrastructure",
        items: [
          "Cloud-based solutions designed for rapid growth",
          "Elastic computing resources that expand with demand",
          "Continuous integration/continuous deployment (CI/CD) pipelines",
          "Microservices architecture support"
        ]
      },
      {
        title: "DevOps Enablement",
        items: [
          "Automated development environments",
          "Containerization and orchestration solutions",
          "Version control and code repository management",
          "Collaborative development tools"
        ]
      },
      {
        title: "Security for Innovation",
        items: [
          "Protection for intellectual property and source code",
          "Secure development practices and code reviews",
          "Vulnerability management throughout the development lifecycle",
          "Compliance with industry standards and regulations"
        ]
      },
      {
        title: "Collaboration Platforms",
        items: [
          "Modern workplace solutions for distributed teams",
          "Secure knowledge sharing and documentation",
          "Video conferencing and virtual whiteboarding",
          "Project management and productivity tools"
        ]
      }
    ],
    whyChooseUs: "Our team understands the fast-paced, innovation-driven environment of technology companies. We deliver solutions that provide the agility, scalability, and security necessary for successful product development and market growth. Our experience working with startups and established tech firms ensures we understand your unique requirements and priorities.",
    caseStudy: "When a rapidly growing SaaS company needed to scale their infrastructure while enhancing security, CloudMor implemented a cloud-native solution that reduced deployment time by 65% while strengthening protection for customer data and intellectual property.",
    ctaHeadline: "Scale Your Tech Company with Strategic IT Infrastructure",
    ctaButtonText: "Schedule a Technology Scaling Consultation"
  },
  {
    name: "Entertainment",
    slug: "entertainment",
    icon: <Film className="w-16 h-16" />,
    headline: "Specialized IT Solutions for Entertainment Companies",
    subheadline: "Technology that supports creative workflows, content management, and distribution",
    brief: "Entertainment companies must efficiently store, organize, and retrieve massive amounts of media content throughout the production lifecycle.",
    overview: "CloudMor provides specialized IT solutions designed for the unique needs of entertainment companies. From managing large media files to supporting collaborative creative processes, our team delivers technology services that enhance production efficiency, protect valuable content, and support your distribution channels.",
    challenges: [
      {
        title: "Content Management",
        description: "Entertainment companies must efficiently store, organize, and retrieve massive amounts of media content throughout the production lifecycle."
      },
      {
        title: "Creative Collaboration",
        description: "Teams need to collaborate seamlessly across locations and departments, often with freelancers and external partners."
      },
      {
        title: "Content Protection",
        description: "Valuable intellectual property requires robust security measures to prevent unauthorized access or piracy."
      },
      {
        title: "High-Performance Computing",
        description: "Resource-intensive processes like rendering, editing, and effects require optimized computing environments."
      }
    ],
    solutions: [
      {
        title: "Media Asset Management",
        items: [
          "Systems for organizing, storing, and retrieving digital assets",
          "Workflow automation for content approval and distribution",
          "Metadata management for efficient search and discovery",
          "Archive and retrieval solutions for completed projects"
        ]
      },
      {
        title: "Collaborative Environments",
        items: [
          "High-speed networks for sharing large media files",
          "Secure access for remote team members and contractors",
          "Real-time collaboration tools for creative teams",
          "Version control for creative assets"
        ]
      },
      {
        title: "Content Security",
        items: [
          "Digital rights management implementation",
          "Watermarking and content tracking",
          "Access controls based on roles and permissions",
          "Security protocols for pre-release content"
        ]
      },
      {
        title: "Production Infrastructure",
        items: [
          "High-performance computing for rendering and effects",
          "Storage solutions optimized for media workflows",
          "Backup strategies for in-progress productions",
          "Disaster recovery planning for critical content"
        ]
      }
    ],
    whyChooseUs: "Our team includes specialists with extensive experience in the entertainment industry. We understand the unique requirements of creative workflows, the importance of protecting intellectual property, and the technical demands of media production. Our solutions are designed to address these specific needs while providing the reliability and support critical to meeting production deadlines.",
    caseStudy: "When a post-production studio needed to enhance their collaboration capabilities while strengthening content security, CloudMor delivered a comprehensive solution that improved workflow efficiency by 45% while ensuring robust protection for client projects.",
    ctaHeadline: "Optimize Your Creative Workflow with Strategic IT",
    ctaButtonText: "Schedule an Entertainment Technology Consultation"
  },
  {
    name: "Professional Services",
    slug: "professional-services",
    icon: <Landmark className="w-16 h-16" />,
    headline: "Strategic IT Solutions for Professional Services Firms",
    subheadline: "Technology that enhances client service, team collaboration, and operational efficiency",
    brief: "Professional services firms handle sensitive client information that requires robust security measures and compliance with industry regulations.",
    overview: "CloudMor provides specialized IT solutions designed for professional services firms, including consulting, accounting, architecture, and engineering companies. From supporting client engagements to enabling remote collaboration, our team delivers technology services that enhance operational efficiency, protect sensitive information, and support your firm's growth and client service excellence.",
    challenges: [
      {
        title: "Client Confidentiality",
        description: "Professional services firms handle sensitive client information that requires robust security measures and compliance with industry regulations."
      },
      {
        title: "Billable Time Optimization",
        description: "Maximizing billable time requires efficient systems for time tracking, project management, and administrative tasks."
      },
      {
        title: "Knowledge Management",
        description: "Firms must effectively capture, organize, and leverage internal expertise and project experience."
      },
      {
        title: "Remote Collaboration",
        description: "Teams need to collaborate seamlessly across locations, often with clients and external partners."
      }
    ],
    solutions: [
      {
        title: "Secure Client Portals",
        items: [
          "Encrypted communication and file sharing with clients",
          "Secure access to project documentation and deliverables",
          "Branded client experience with your firm's identity",
          "Streamlined approval and feedback processes"
        ]
      },
      {
        title: "Practice Management Systems",
        items: [
          "Integrated time tracking and billing solutions",
          "Project management tools optimized for professional services",
          "Resource allocation and capacity planning",
          "CRM integration for relationship management"
        ]
      },
      {
        title: "Knowledge Management Platforms",
        items: [
          "Solutions for capturing and organizing intellectual capital",
          "Searchable repositories for previous work products",
          "Expertise location systems to identify internal specialists",
          "Collaborative platforms for sharing insights and best practices"
        ]
      },
      {
        title: "Mobility Solutions",
        items: [
          "Secure remote access to firm resources",
          "Virtual meeting capabilities for client consultations",
          "Mobile apps for time entry and expense reporting",
          "Cloud-based solutions for anywhere productivity"
        ]
      }
    ],
    whyChooseUs: "Our team includes specialists with extensive experience working with professional services firms. We understand the importance of client service, the value of your firm's intellectual capital, and the need for secure, efficient operations. Our solutions are designed to address these specific needs while providing the reliability and support critical to your practice.",
    caseStudy: "When a growing consulting firm needed to enhance their knowledge management capabilities while improving client collaboration, CloudMor delivered a comprehensive solution that increased consultant productivity by 32% while strengthening client engagement and satisfaction.",
    ctaHeadline: "Enhance Your Firm's Client Service and Efficiency",
    ctaButtonText: "Schedule a Professional Services IT Consultation"
  },
  {
    name: "Non-Profits",
    slug: "non-profits",
    icon: <Heart className="w-16 h-16" />,
    headline: "Cost-Effective IT Solutions for Non-Profit Organizations",
    subheadline: "Technology that maximizes your impact, streamlines operations, and stretches your budget",
    brief: "Non-profits must maximize the impact of limited technology budgets while maintaining necessary capabilities.",
    overview: "CloudMor provides specialized IT solutions designed for the unique needs of non-profit organizations. From donor management to volunteer coordination, our team delivers cost-effective technology services that enhance your operational efficiency, protect sensitive data, and help you focus on your mission rather than IT challenges.",
    challenges: [
      {
        title: "Budget Constraints",
        description: "Non-profits must maximize the impact of limited technology budgets while maintaining necessary capabilities."
      },
      {
        title: "Donor and Constituent Management",
        description: "Organizations need effective systems to manage relationships with donors, volunteers, and the communities they serve."
      },
      {
        title: "Data Security and Compliance",
        description: "Non-profits often handle sensitive personal and financial information that requires appropriate protection and regulatory compliance."
      },
      {
        title: "Remote and Distributed Operations",
        description: "Many organizations operate with distributed teams, remote workers, and volunteers who need reliable access to systems and information."
      }
    ],
    solutions: [
      {
        title: "Cost-Effective Infrastructure",
        items: [
          "Cloud-based solutions with non-profit pricing",
          "Strategic IT planning to maximize limited budgets",
          "Leveraging donated and discounted technology programs",
          "Scalable solutions that grow with your organization"
        ]
      },
      {
        title: "Constituent Relationship Management",
        items: [
          "Implementation and support for donor management systems",
          "Volunteer coordination and engagement platforms",
          "Event management and fundraising solutions",
          "Integration with financial and program management systems"
        ]
      },
      {
        title: "Data Protection and Compliance",
        items: [
          "Security measures appropriate for sensitive constituent data",
          "Compliance with donation processing regulations",
          "Protection for financial and personal information",
          "Staff training on security best practices"
        ]
      },
      {
        title: "Collaboration and Communication",
        items: [
          "Remote work enablement for staff and volunteers",
          "Virtual meeting and collaboration tools",
          "Mobile solutions for field workers and events",
          "Knowledge sharing across distributed teams"
        ]
      }
    ],
    whyChooseUs: "Our team is passionate about supporting non-profit organizations. We understand the unique challenges you face, from budget constraints to the specialized systems needed for your mission. We're committed to providing cost-effective solutions that maximize your technology investment while minimizing the burden on your staff and resources.",
    caseStudy: "When a community service organization needed to improve their donor management while enhancing remote operations, CloudMor implemented a comprehensive solution that increased fundraising effectiveness by 28% while reducing administrative time by 35%.",
    ctaHeadline: "Maximize Your Mission Impact with Strategic IT",
    ctaButtonText: "Schedule a Non-Profit Technology Consultation"
  }
];

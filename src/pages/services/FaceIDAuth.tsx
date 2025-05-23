import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ServiceHero from "../../components/ServiceHero";
import FeatureGrid from "../../components/FeatureGrid";
import BenefitsSection from "../../components/BenefitsSection";
import UseCaseSection from "../../components/UseCaseSection";
import TechSpecsSection from "../../components/TechSpecsSection";
import FinalCTA from "../../components/FinalCTA";
import ContactForm from "../../components/ContactForm";
import { Shield, Fingerprint, ScanFace } from 'lucide-react';
const FaceIDAuth = () => {
  const platformFeatures = [{
    icon: <Shield className="h-6 w-6 text-white" />,
    title: "Multi-Platform Support",
    description: "Implement facial authentication across all your applications.",
    items: ["Web applications with JavaScript SDK integration", "Native iOS and Android mobile applications", "Cross-platform compatibility with unified API", "Responsive design for all device types", "Browser-based authentication without app downloads"]
  }, {
    icon: <Fingerprint className="h-6 w-6 text-white" />,
    title: "Advanced Security Features",
    description: "Protect against sophisticated spoofing attacks.",
    items: ["Liveness detection to prevent photo and video spoofing", "Anti-deepfake technology for ultimate security", "Mask detection with enhanced recognition algorithms", "Real-time threat analysis and fraud prevention", "Encrypted biometric data storage and transmission"]
  }, {
    icon: <Shield className="h-6 w-6 text-white" />,
    title: "Developer-Friendly Integration",
    description: "Quick and easy implementation for developers.",
    items: ["RESTful API with comprehensive documentation", "JavaScript SDK for rapid web implementation", "Native mobile SDKs for iOS and Android", "Customizable UI components and workflows", "Real-time face detection and automatic capture"]
  }, {
    icon: <Fingerprint className="h-6 w-6 text-white" />,
    title: "Enterprise-Grade Protection",
    description: "Meet the highest standards of security and compliance.",
    items: ["99.8% accuracy rate across all demographics", "Sub-second authentication response times", "GDPR and privacy regulation compliance", "On-premises deployment options available", "Comprehensive audit trails and analytics"]
  }];
  const functionalities = [{
    icon: <Shield className="h-6 w-6 text-white" />,
    title: "Face Enrollment",
    description: "Simple and secure user onboarding process.",
    items: ["Seamless user onboarding with guided photo capture", "Multiple angle verification for enhanced accuracy", "Quality assessment and feedback during enrollment", "Secure storage of biometric templates", "Easy re-enrollment for template updates"]
  }, {
    icon: <Fingerprint className="h-6 w-6 text-white" />,
    title: "Authentication Process",
    description: "Fast, accurate identity verification.",
    items: ["Real-time face detection and positioning guidance", "Instant verification with visual feedback", "Fallback options for accessibility compliance", "Multi-factor authentication integration", "Session management and security controls"]
  }, {
    icon: <Shield className="h-6 w-6 text-white" />,
    title: "Administrative Dashboard",
    description: "Complete visibility and control.",
    items: ["Comprehensive analytics and usage reporting", "User management and access controls", "Security event monitoring and alerts", "Performance metrics and optimization insights", "Compliance reporting and audit tools"]
  }];
  const benefits = [{
    icon: <Shield className="h-6 w-6" />,
    title: "Enhanced Security",
    description: "Eliminate password-related vulnerabilities while providing protection against sophisticated attack methods including deepfakes and presentation attacks."
  }, {
    icon: <Fingerprint className="h-6 w-6" />,
    title: "Improved User Experience",
    description: "Reduce friction in the authentication process, eliminating the need to remember passwords while providing instant access with just a glance."
  }, {
    icon: <Shield className="h-6 w-6" />,
    title: "Reduced Support Costs",
    description: "Minimize password reset requests and user lockout issues, significantly reducing help desk burden and operational costs."
  }, {
    icon: <Fingerprint className="h-6 w-6" />,
    title: "Compliance Support",
    description: "Meet stringent security requirements for regulated industries while maintaining user privacy and data protection standards."
  }, {
    icon: <Shield className="h-6 w-6" />,
    title: "Quick Integration",
    description: "Get up and running in minutes with our comprehensive SDK and API, supported by detailed documentation and implementation guides."
  }];
  const useCases = [{
    icon: <Shield className="h-6 w-6 text-white" />,
    title: "Financial Services",
    description: "Secure your banking and investment platforms.",
    items: ["Secure banking applications and transaction authorization", "Investment platform access and high-value transaction verification", "Insurance claim processing and customer verification"]
  }, {
    icon: <Fingerprint className="h-6 w-6 text-white" />,
    title: "Healthcare",
    description: "Protect sensitive patient information.",
    items: ["Patient portal access and medical record protection", "Telehealth platform authentication", "Prescription and treatment authorization"]
  }, {
    icon: <Shield className="h-6 w-6 text-white" />,
    title: "E-commerce",
    description: "Prevent fraud and secure user accounts.",
    items: ["Customer account protection and secure checkout", "Fraud prevention for high-value purchases", "Subscription service access control"]
  }, {
    icon: <Fingerprint className="h-6 w-6 text-white" />,
    title: "Enterprise Applications",
    description: "Secure corporate resources and data.",
    items: ["Employee access to sensitive systems and data", "Time and attendance tracking", "Secure document and application access"]
  }];
  const techSpecs = [{
    title: "API Endpoints",
    items: ["Face enrollment and template creation", "Real-time verification and authentication", "Liveness detection and spoof prevention", "User management and administrative functions"]
  }, {
    title: "Security Standards",
    items: ["AES-256 encryption for data transmission", "ISO 27001 and SOC 2 Type II compliance", "GDPR and CCPA privacy regulation adherence", "Zero-knowledge architecture options"]
  }];
  return <>
      <Navbar />
      <main>
        <ServiceHero title="Advanced Facial Authentication for Web & Mobile" subtitle="Secure, seamless user authentication using cutting-edge facial recognition technology" backgroundClass="from-gray-900 to-gowith-dark-blue" />
        
        {/* Overview Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6">Technology Overview</h2>
              <p className="text-lg text-gray-600 mb-8">CloudMor's Face ID Authentication solution brings enterprise-grade facial recognition capabilities to your web applications and mobile platforms. Our advanced biometric authentication system provides a frictionless user experience while delivering superior security compared to traditional password-based systems.</p>
              <div className="mt-10 relative">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                  <img alt="Face ID Authentication Technology" className="w-full h-full object-cover" src="/lovable-uploads/b695c5c9-2951-42e6-b1fa-8aca4db367e3.png" />
                </div>
                <div className="absolute -bottom-6 right-0 bg-gowith-orange p-6 rounded-lg shadow-xl max-w-xs">
                  <p className="text-white font-bold">
                    99.8% accuracy across all demographics with sub-second response times
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Key Features Section - Updated with 3 columns */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-4">Key Features</h2>
              <p className="text-lg text-gray-600">Enterprise-grade facial recognition for modern applications</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Multi-Platform Support */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gowith-medium-blue flex items-center justify-center mr-4">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gowith-dark-blue">
                    Multi-Platform Support
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Implement facial authentication across all your applications.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Web applications with JavaScript SDK integration</li>
                  <li>Native iOS and Android mobile applications</li>
                  <li>Cross-platform compatibility with unified API</li>
                  <li>Responsive design for all device types</li>
                  <li>Browser-based authentication without app downloads</li>
                </ul>
              </div>
              
              {/* Advanced Security Features */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gowith-medium-blue flex items-center justify-center mr-4">
                    <ScanFace className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gowith-dark-blue">
                    Advanced Security Features
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Protect against sophisticated spoofing attacks.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Liveness detection to prevent photo and video spoofing</li>
                  <li>Anti-deepfake technology for ultimate security</li>
                  <li>Mask detection with enhanced recognition algorithms</li>
                  <li>Real-time threat analysis and fraud prevention</li>
                  <li>Encrypted biometric data storage and transmission</li>
                </ul>
              </div>
              
              {/* Developer-Friendly Integration */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gowith-medium-blue flex items-center justify-center mr-4">
                    <Fingerprint className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gowith-dark-blue">
                    Developer-Friendly Integration
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Quick and easy implementation for developers.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>RESTful API with comprehensive documentation</li>
                  <li>JavaScript SDK for rapid web implementation</li>
                  <li>Native mobile SDKs for iOS and Android</li>
                  <li>Customizable UI components and workflows</li>
                  <li>Real-time face detection and automatic capture</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Demo/Visual Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6">AI-Powered Face Recognition</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Our advanced AI algorithms deliver precise facial recognition with industry-leading accuracy rates and protection against spoofing attempts.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-bold text-gowith-dark-blue mb-4">Enterprise-Grade Protection</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>99.8% accuracy rate across all demographics</li>
                    <li>Sub-second authentication response times</li>
                    <li>GDPR and privacy regulation compliance</li>
                    <li>On-premises deployment options available</li>
                    <li>Comprehensive audit trails and analytics</li>
                  </ul>
                </div>
                <div className="flex space-x-4">
                  <button className="bg-gowith-medium-blue text-white px-6 py-2 rounded-md hover:bg-gowith-dark-blue transition-colors">
                    Request Demo
                  </button>
                  <button className="border border-gowith-medium-blue text-gowith-medium-blue px-6 py-2 rounded-md hover:bg-gray-50 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="relative">
                <img src="/lovable-uploads/b695c5c9-2951-42e6-b1fa-8aca4db367e3.png" alt="AI Facial Recognition" className="rounded-lg shadow-xl" />
                <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-lg shadow-lg border-l-4 border-gowith-orange">
                  <p className="text-gowith-dark-blue font-bold">Advanced liveness detection & anti-spoofing</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Core Functionality */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-4">Core Functionality</h2>
              <p className="text-lg text-gray-600">Complete authentication solution from enrollment to verification</p>
            </div>
            
            <FeatureGrid features={functionalities} />
          </div>
        </section>
        
        {/* Benefits */}
        <BenefitsSection benefits={benefits} />
        
        {/* Use Cases */}
        <UseCaseSection title="Use Cases" subtitle="How organizations in different industries benefit from Face ID Authentication" useCases={useCases} />
        
        {/* Technical Specifications */}
        <TechSpecsSection specGroups={techSpecs} />
        
        {/* Contact Form Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6">Experience Secure Authentication</h2>
                <p className="text-lg text-gray-600 mb-8">
                  See how our Face ID Authentication solution can enhance security while improving user experience across your web and mobile applications. Start your free trial today to experience the power of facial recognition technology.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
                  <h3 className="text-xl font-bold text-gowith-dark-blue mb-4">What's Included in Your Trial</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gowith-light-blue flex items-center justify-center text-white font-bold mr-3">1</div>
                      <span>Full access to all Face ID Authentication features for 30 days</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gowith-light-blue flex items-center justify-center text-white font-bold mr-3">2</div>
                      <span>Up to 1,000 authentication requests</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gowith-light-blue flex items-center justify-center text-white font-bold mr-3">3</div>
                      <span>Developer documentation and integration support</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gowith-light-blue flex items-center justify-center text-white font-bold mr-3">4</div>
                      <span>No credit card required to start</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <ContactForm formTitle="Start Your Free Trial" formDescription="Fill out the form below to begin your 30-day free trial of our Face ID Authentication solution." buttonText="Start Free Trial" formType="trial" />
            </div>
          </div>
        </section>
        
        {/* Final CTA */}
        <FinalCTA headline="Revolutionize Your Authentication Security" buttonText="Start Your Free Trial" buttonLink="/contact" backgroundClass="bg-gradient-to-r from-gray-900 to-gowith-dark-blue" />
      </main>
      <Footer />
    </>;
};
export default FaceIDAuth;
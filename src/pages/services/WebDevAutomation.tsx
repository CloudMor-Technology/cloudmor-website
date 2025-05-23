import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ServiceHero from "../../components/ServiceHero";
import FeatureGrid from "../../components/FeatureGrid";
import BenefitsSection from "../../components/BenefitsSection";
import ProcessTimeline from "../../components/ProcessTimeline";
import TargetUsersSection from "../../components/TargetUsersSection";
import SuccessMetrics from "../../components/SuccessMetrics";
import FinalCTA from "../../components/FinalCTA";
import ContactForm from "../../components/ContactForm";
import { Code, Database, Settings, Zap, Rocket } from 'lucide-react';
const WebDevAutomation = () => {
  const platformFeatures = [{
    icon: <Code className="h-6 w-6 text-white" />,
    title: "AI-Powered Code Generation",
    description: "Let AI handle the routine coding tasks.",
    items: ["Intelligent component generation from natural language descriptions", "Automated responsive design creation and optimization", "Smart API integration and endpoint management", "Automated testing framework generation", "Database schema creation and optimization"]
  }, {
    icon: <Zap className="h-6 w-6 text-white" />,
    title: "No-Code Visual Development",
    description: "Build complex applications without writing code.",
    items: ["Drag-and-drop interface builder with professional templates", "Visual workflow designer for complex business logic", "Real-time preview and collaborative editing capabilities", "Component library with customizable elements", "Automated mobile responsiveness and cross-browser compatibility"]
  }, {
    icon: <Rocket className="h-6 w-6 text-white" />,
    title: "Intelligent Project Management",
    description: "Streamline development processes with AI assistance.",
    items: ["AI-driven project timeline estimation and optimization", "Automated task assignment and resource allocation", "Real-time progress tracking and milestone management", "Risk assessment and mitigation recommendations", "Integrated collaboration tools for distributed teams"]
  }, {
    icon: <Settings className="h-6 w-6 text-white" />,
    title: "Advanced Automation Capabilities",
    description: "Automate complex development workflows.",
    items: ["Automated deployment pipelines and CI/CD integration", "Performance optimization and code quality analysis", "Security vulnerability scanning and remediation", "SEO optimization and accessibility compliance checking", "Automated documentation generation and maintenance"]
  }];
  const automationFeatures = [{
    icon: <Code className="h-6 w-6 text-white" />,
    title: "Smart Template Generation",
    description: "Jump-start development with intelligent templates.",
    items: ["Industry-specific application templates", "Customizable design systems and component libraries", "Automated layout generation based on content requirements", "Responsive design patterns and mobile optimization", "Performance-optimized code structure"]
  }, {
    icon: <Database className="h-6 w-6 text-white" />,
    title: "Intelligent Integration Management",
    description: "Connect with external services effortlessly.",
    items: ["Automated API discovery and integration", "Third-party service connection wizards", "Data synchronization and mapping tools", "Authentication and security implementation", "Payment gateway and service integrations"]
  }, {
    icon: <Settings className="h-6 w-6 text-white" />,
    title: "Automated Testing and Quality Assurance",
    description: "Ensure code quality and performance automatically.",
    items: ["Comprehensive test suite generation", "Cross-browser compatibility testing", "Performance and load testing automation", "Security vulnerability assessments", "Accessibility compliance verification"]
  }, {
    icon: <Rocket className="h-6 w-6 text-white" />,
    title: "Deployment and Maintenance Automation",
    description: "Streamline application deployment and updates.",
    items: ["One-click deployment to multiple environments", "Automated backup and disaster recovery", "Performance monitoring and optimization", "Security patching and updates", "Scalability monitoring and adjustment"]
  }];
  const benefits = [{
    icon: <Rocket className="h-6 w-6" />,
    title: "Accelerated Development Speed",
    description: "Reduce development time by up to 70% through intelligent automation, pre-built components, and AI-assisted coding that handles routine tasks automatically."
  }, {
    icon: <Code className="h-6 w-6" />,
    title: "Enhanced Code Quality",
    description: "Ensure consistent, maintainable code through automated best practices, code review suggestions, and quality assurance checks built into the development process."
  }, {
    icon: <Settings className="h-6 w-6" />,
    title: "Reduced Technical Debt",
    description: "Prevent accumulation of technical debt through automated refactoring suggestions, dependency management, and continuous code quality monitoring."
  }, {
    icon: <Zap className="h-6 w-6" />,
    title: "Seamless Scalability",
    description: "Build applications that scale automatically with intelligent architecture decisions, optimized database queries, and cloud-native deployment strategies."
  }, {
    icon: <Database className="h-6 w-6" />,
    title: "Cost Optimization",
    description: "Minimize development costs through efficient resource utilization, automated testing that reduces bug fixes, and optimized deployment processes."
  }];
  const processSteps = [{
    number: 1,
    title: "Platform Onboarding",
    description: "We start with project assessment, requirement analysis, custom workspace setup, integration with existing tools, and comprehensive team training."
  }, {
    number: 2,
    title: "Project Planning",
    description: "AI-assisted project planning and architecture design lays the foundation for efficient development."
  }, {
    number: 3,
    title: "Development",
    description: "Automated component generation, customization, and real-time collaboration accelerate the development process."
  }, {
    number: 4,
    title: "Quality Assurance",
    description: "Automated testing and quality checks ensure your application meets the highest standards."
  }, {
    number: 5,
    title: "Deployment",
    description: "Streamlined deployment process with automated scaling and optimization for production environments."
  }];
  const targetUsers = [{
    icon: <Code className="h-6 w-6" />,
    title: "No-Code Developers",
    description: "Empower citizen developers to create sophisticated web applications without extensive programming knowledge, using visual tools and intelligent automation."
  }, {
    icon: <Settings className="h-6 w-6" />,
    title: "Professional Developers",
    description: "Enhance productivity for experienced developers by automating routine tasks, providing intelligent code suggestions, and streamlining complex workflows."
  }, {
    icon: <Database className="h-6 w-6" />,
    title: "Development Teams",
    description: "Enable collaborative development with integrated project management, automated testing, and streamlined deployment processes that keep teams synchronized."
  }, {
    icon: <Zap className="h-6 w-6" />,
    title: "Agencies and Consultants",
    description: "Accelerate client project delivery with rapid prototyping, automated quality assurance, and efficient project management tools."
  }, {
    icon: <Rocket className="h-6 w-6" />,
    title: "Enterprise Organizations",
    description: "Scale internal development capabilities with standardized processes, automated compliance checking, and enterprise-grade security features."
  }];
  const metrics = [{
    value: "70%",
    label: "Reduction in Development Timeline"
  }, {
    value: "50%",
    label: "Decrease in Bug Reports"
  }, {
    value: "60%",
    label: "Improvement in Code Maintainability"
  }, {
    value: "40%",
    label: "Reduction in Development Costs"
  }, {
    value: "99.9%",
    label: "Deployment Success Rate"
  }];
  return <>
      <Navbar />
      <main>
        <ServiceHero title="AI-Powered Web Development Automation" subtitle="Accelerate your web development projects with intelligent automation tools designed for modern developers" backgroundClass="from-gowith-dark-blue to-gowith-medium-blue" />
        
        {/* Overview Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6">Platform Overview</h2>
              <p className="text-lg text-gray-600 mb-8">CloudMor's Web Development Automation platform harnesses the power of artificial intelligence to streamline and accelerate web development processes. Whether you're a no-code enthusiast or an experienced developer, our intelligent automation tools help you build robust, scalable web applications faster and more efficiently than traditional development methods.</p>
            </div>
          </div>
        </section>
        
        {/* Core Platform Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-4">Core Platform Features</h2>
              <p className="text-lg text-gray-600">Powerful automation tools to transform your development process</p>
            </div>
            
            <FeatureGrid features={platformFeatures} />
          </div>
        </section>
        
        {/* Benefits */}
        <BenefitsSection benefits={benefits} />
        
        {/* Automation Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-4">Key Automation Features</h2>
              <p className="text-lg text-gray-600">Detailed look at our automation capabilities</p>
            </div>
            
            <FeatureGrid features={automationFeatures} />
          </div>
        </section>
        
        {/* Target Users */}
        <TargetUsersSection users={targetUsers} />
        
        {/* Implementation Process */}
        <ProcessTimeline steps={processSteps} title="Implementation Process" subtitle="Our structured approach to implementing web development automation" />
        
        {/* Success Metrics */}
        <SuccessMetrics metrics={metrics} />
        
        {/* Contact Form Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6">Ready to Accelerate Your Web Development?</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Discover how our AI-powered automation platform can transform your development process, reduce costs, and accelerate time-to-market for your web applications.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
                  <h3 className="text-xl font-bold text-gowith-dark-blue mb-4">Supported Technologies</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gowith-medium-blue mb-2">Frontend Frameworks</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• React, Vue.js, Angular</li>
                        <li>• Modern CSS frameworks</li>
                        <li>• Progressive Web Apps</li>
                        <li>• Single Page Applications</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gowith-medium-blue mb-2">Backend Technologies</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Node.js, Python</li>
                        <li>• Database integration</li>
                        <li>• API development</li>
                        <li>• Serverless architecture</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <ContactForm formTitle="Start Your Automation Journey" formDescription="Fill out the form below and our team will reach out to discuss how we can accelerate your web development process." buttonText="Get Started" formType="contact" />
            </div>
          </div>
        </section>
        
        {/* Final CTA */}
        <FinalCTA headline="Accelerate Your Web Development Today" buttonText="Start Your Automation Journey" buttonLink="/contact" />
      </main>
      <Footer />
    </>;
};
export default WebDevAutomation;
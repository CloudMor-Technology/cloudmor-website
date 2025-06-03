
import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { CheckCircle, ArrowLeft, ExternalLink, Users, TrendingUp, Shield, Clock } from "lucide-react";

const BaleenSpecialty = () => {
  const projectDetails = {
    client: "Baleen Specialty",
    industry: "Insurance & Risk Management",
    projectType: "Financial Services Portal",
    timeline: "6 months",
    teamSize: "8 specialists",
    launchDate: "March 2024"
  };

  const challenges = [
    "Complex underwriting processes requiring specialized tools",
    "High-risk client management with detailed risk assessment",
    "Integration with multiple insurance carrier systems",
    "Regulatory compliance across multiple jurisdictions",
    "Secure document management for sensitive client information"
  ];

  const solutions = [
    "Custom risk assessment algorithms and scoring system",
    "Automated underwriting workflow with approval chains",
    "Real-time integration with major insurance carriers",
    "Comprehensive compliance monitoring and reporting",
    "Advanced security protocols with encryption and access controls"
  ];

  const results = [
    { metric: "75%", description: "Reduction in underwriting processing time" },
    { metric: "92%", description: "Client satisfaction rate increase" },
    { metric: "40%", description: "Increase in policy conversion rates" },
    { metric: "60%", description: "Reduction in manual data entry" },
    { metric: "99.9%", description: "System uptime and reliability" }
  ];

  const technologies = [
    "React.js & TypeScript",
    "Node.js Backend",
    "PostgreSQL Database",
    "AWS Cloud Infrastructure",
    "Stripe Payment Integration",
    "Advanced Security Protocols"
  ];

  const features = [
    {
      title: "Risk Assessment Engine",
      description: "AI-powered risk evaluation with customizable scoring models",
      icon: <Shield className="w-8 h-8 text-gowith-orange" />
    },
    {
      title: "Client Management Dashboard",
      description: "Comprehensive client profiles with risk history and policy tracking",
      icon: <Users className="w-8 h-8 text-gowith-orange" />
    },
    {
      title: "Automated Underwriting",
      description: "Streamlined approval processes with configurable business rules",
      icon: <Clock className="w-8 h-8 text-gowith-orange" />
    },
    {
      title: "Performance Analytics",
      description: "Real-time reporting and analytics for business insights",
      icon: <TrendingUp className="w-8 h-8 text-gowith-orange" />
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="h-[35vh] bg-gradient-to-r from-gowith-dark-blue to-gowith-medium-blue flex items-center justify-center">
          <div className="container mx-auto px-[16px] my-[50px]">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-4">
                <a href="/services/web-design-development" className="inline-flex items-center text-gowith-light-blue hover:text-white transition-colors">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Web Design & Development
                </a>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Baleen Specialty Insurance Portal
              </h1>
              <p className="text-lg md:text-xl text-gowith-light-blue mb-6">
                Comprehensive Case Study
              </p>
              <p className="text-base md:text-lg text-white max-w-3xl mx-auto leading-relaxed">
                How we transformed a traditional insurance operation into a cutting-edge digital platform for high-risk specialty insurance
              </p>
            </div>
          </div>
        </section>

        {/* Project Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <img 
                  src="/lovable-uploads/0dce7e79-c0fa-4ea3-a35f-2ef83f2d5fe2.png" 
                  alt="Baleen Specialty Website"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6">Project Overview</h2>
                <p className="text-gray-600 mb-8">
                  Baleen Specialty, a division of Bowhead Underwriting Services, partners with wholesale brokers to provide specialized insurance solutions for high-risk clients, including hospitals facing lawsuits, property owners with structural failures, and professionals with liability concerns.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-gowith-medium-blue mb-2">Client</h3>
                    <p className="text-gray-600">{projectDetails.client}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gowith-medium-blue mb-2">Industry</h3>
                    <p className="text-gray-600">{projectDetails.industry}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gowith-medium-blue mb-2">Timeline</h3>
                    <p className="text-gray-600">{projectDetails.timeline}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gowith-medium-blue mb-2">Team Size</h3>
                    <p className="text-gray-600">{projectDetails.teamSize}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-8 text-center">The Challenge</h2>
              <p className="text-lg text-gray-600 mb-8 text-center">
                Baleen Specialty needed a comprehensive digital transformation to handle complex underwriting processes for high-risk insurance cases.
              </p>
              <div className="space-y-4">
                {challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                    <div className="w-2 h-2 bg-gowith-orange rounded-full mt-3 shrink-0"></div>
                    <p className="text-gray-700">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-8 text-center">Our Solution</h2>
              <div className="space-y-4">
                {solutions.map((solution, index) => (
                  <div key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-gowith-orange mt-1 shrink-0" />
                    <p className="text-gray-700">{solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-12 text-center">Key Features Delivered</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="flex items-center gap-4 mb-4">
                      {feature.icon}
                      <h3 className="text-xl font-bold text-gowith-dark-blue">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-12 text-center">Results Achieved</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {results.map((result, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl font-bold text-gowith-orange mb-2">{result.metric}</div>
                    <p className="text-gray-600">{result.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-8 text-center">Technologies Used</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {technologies.map((tech, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <span className="text-gray-700 font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gowith-dark-blue">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-gowith-light-blue mb-8 max-w-2xl mx-auto">
              Let us help you build a custom solution that drives real results for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="bg-gowith-orange hover:bg-gowith-orange-hover text-white px-8 py-3 rounded-md font-medium transition-colors"
              >
                Start Your Project
              </a>
              <a 
                href="/services/web-design-development"
                className="border border-white text-white hover:bg-white hover:text-gowith-dark-blue px-8 py-3 rounded-md font-medium transition-colors"
              >
                View All Services
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BaleenSpecialty;

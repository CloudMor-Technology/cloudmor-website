import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ServiceHero from "../../components/ServiceHero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Cloud, Shield, Server, Database, BarChart, Layers } from "lucide-react";

const CloudServices = () => {
  return (
    <>
      <Navbar />
      <main>
        <ServiceHero 
          title="Secure & Scalable Cloud Solutions" 
          subtitle="Harness the power of the cloud with expert migration, management, and optimization"
          description="Leverage the power of the cloud with expert migration, management, and optimization services."
        />
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6 text-center">Overview</h2>
              <p className="text-lg text-gray-700 mb-8">
                CloudMor's Managed Cloud Services help businesses leverage the full potential of cloud computing. Whether you're considering migrating to the cloud, optimizing your current cloud environment, or implementing a hybrid solution, our team provides the expertise and support you need. We ensure your cloud infrastructure is secure, scalable, and aligned with your business objectives.
              </p>
              
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6 mt-14 text-center">Key Services</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Cloud className="text-gowith-medium-blue h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold text-gowith-dark-blue">Cloud Migration</h3>
                  </div>
                  <p className="text-gray-700">
                    Seamless transition of your applications and data to the cloud, minimizing disruption and risk. We plan and execute migrations that set you up for future success.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Server className="text-gowith-medium-blue h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold text-gowith-dark-blue">Cloud Infrastructure Management</h3>
                  </div>
                  <p className="text-gray-700">
                    Comprehensive management of your cloud environment, including monitoring, optimization, and support. We ensure reliable performance and security.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Shield className="text-gowith-medium-blue h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold text-gowith-dark-blue">Cloud Security</h3>
                  </div>
                  <p className="text-gray-700">
                    Advanced security measures specifically designed for cloud environments. We protect your data and applications with industry-leading security practices.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Database className="text-gowith-medium-blue h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold text-gowith-dark-blue">Backup and Disaster Recovery</h3>
                  </div>
                  <p className="text-gray-700">
                    Robust backup and recovery solutions to ensure business continuity in the event of data loss or system failure. We safeguard your critical information.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <BarChart className="text-gowith-medium-blue h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold text-gowith-dark-blue">Cost Optimization</h3>
                  </div>
                  <p className="text-gray-700">
                    Strategic analysis and management of your cloud spending to maximize value and minimize waste. We help you control costs while maintaining performance.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Layers className="text-gowith-medium-blue h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold text-gowith-dark-blue">Multi-Cloud and Hybrid Solutions</h3>
                  </div>
                  <p className="text-gray-700">
                    Expert guidance and management for complex multi-cloud and hybrid environments. We integrate different platforms to create the optimal solution for your business.
                  </p>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6 mt-14 text-center">Cloud Platforms</h2>
              
              <p className="text-lg text-gray-700 mb-4">Our team has expertise across major cloud platforms, including:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Microsoft Azure</h3>
                  <p>Enterprise-grade cloud computing platform with comprehensive services and solutions</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Google Cloud</h3>
                  <p>Innovative cloud platform with advanced analytics and machine learning capabilities</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Amazon Web Services (AWS)</h3>
                  <p>Comprehensive and widely adopted cloud platform with extensive global infrastructure</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Private and hybrid cloud solutions</h3>
                  <p>Customized environments that combine the benefits of public and private cloud resources</p>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6 mt-14 text-center">Implementation Process</h2>
              
              <div className="mb-14">
                <div className="bg-gray-50 p-8 rounded-lg">
                  <ol className="relative">
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-10 h-10 bg-gowith-medium-blue text-white rounded-full -left-5">
                        1
                      </span>
                      <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Assessment</h3>
                      <p className="text-gray-700">Evaluate your current infrastructure and business requirements</p>
                    </li>
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-10 h-10 bg-gowith-medium-blue text-white rounded-full -left-5">
                        2
                      </span>
                      <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Strategy</h3>
                      <p className="text-gray-700">Develop a cloud migration and management strategy tailored to your needs</p>
                    </li>
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-10 h-10 bg-gowith-medium-blue text-white rounded-full -left-5">
                        3
                      </span>
                      <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Migration</h3>
                      <p className="text-gray-700">Execute a carefully planned migration with minimal disruption</p>
                    </li>
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-10 h-10 bg-gowith-medium-blue text-white rounded-full -left-5">
                        4
                      </span>
                      <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Optimization</h3>
                      <p className="text-gray-700">Fine-tune your cloud environment for performance, security, and cost-efficiency</p>
                    </li>
                    <li className="ml-6">
                      <span className="absolute flex items-center justify-center w-10 h-10 bg-gowith-medium-blue text-white rounded-full -left-5">
                        5
                      </span>
                      <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Management</h3>
                      <p className="text-gray-700">Provide ongoing monitoring, maintenance, and support</p>
                    </li>
                  </ol>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6 mt-14 text-center">Benefits</h2>
              
              <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 mb-14">
                <li>Enhanced scalability and flexibility</li>
                <li>Improved business continuity and disaster recovery</li>
                <li>Reduced capital expenditure on hardware</li>
                <li>Access to enterprise-grade technology</li>
                <li>Increased collaboration and productivity</li>
                <li>Expert management and support</li>
              </ul>
              
              <div className="bg-gowith-light-blue bg-opacity-10 p-8 rounded-lg border border-gowith-light-blue text-center mb-10">
                <h3 className="text-2xl font-bold text-gowith-dark-blue mb-4">Ready to elevate your business with cloud technology?</h3>
                <Button className="bg-gowith-orange hover:bg-gowith-orange-hover text-white px-8 py-6 text-lg">
                  <Link to="/contact">Schedule a Cloud Readiness Assessment</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CloudServices;

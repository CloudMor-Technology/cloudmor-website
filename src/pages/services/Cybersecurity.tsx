import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ServiceHero from "../../components/ServiceHero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Lock, Server, Mail, Users, Clock, FileCheck } from "lucide-react";

const Cybersecurity = () => {
  return (
    <>
      <Navbar />
      <main>
        <ServiceHero 
          title="Advanced Cybersecurity Protection" 
          subtitle="Comprehensive security solutions to protect your business from evolving threats"
          description="Safeguard your data, systems, and reputation with enterprise-grade security tailored to your business needs."
        />
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6 text-center">Overview</h2>
              <p className="text-lg text-gray-700 mb-8">
                In today's digital landscape, cybersecurity is not optional—it's essential. GowithSupport provides robust, multi-layered security solutions designed to protect your business from the full spectrum of cyber threats. Our comprehensive approach combines advanced technologies, proven methodologies, and continuous monitoring to safeguard your data, systems, and reputation.
              </p>
              
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6 mt-14 text-center">Key Services</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Shield className="text-gowith-medium-blue h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold text-gowith-dark-blue">Security Assessments and Audits</h3>
                  </div>
                  <p className="text-gray-700">
                    Comprehensive evaluation of your security posture to identify vulnerabilities and develop remediation strategies. We test your defenses to ensure they can withstand real-world attacks.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Lock className="text-gowith-medium-blue h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold text-gowith-dark-blue">Endpoint Protection</h3>
                  </div>
                  <p className="text-gray-700">
                    Advanced protection for all devices accessing your network, with real-time monitoring and automated responses to threats. We secure your endpoints against malware, ransomware, and other attacks.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Server className="text-gowith-medium-blue h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold text-gowith-dark-blue">Network Security</h3>
                  </div>
                  <p className="text-gray-700">
                    Robust firewall management, intrusion detection and prevention, and network monitoring to identify and block suspicious activity. We create secure boundaries around your digital assets.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Mail className="text-gowith-medium-blue h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold text-gowith-dark-blue">Email Security</h3>
                  </div>
                  <p className="text-gray-700">
                    Multi-layered protection against phishing, spam, and malware delivered via email. We secure your primary communication channel against increasingly sophisticated attacks.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Users className="text-gowith-medium-blue h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold text-gowith-dark-blue">Security Awareness Training</h3>
                  </div>
                  <p className="text-gray-700">
                    Comprehensive employee training programs to build a security-conscious culture. We transform your team into your first line of defense against cyber threats.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Clock className="text-gowith-medium-blue h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold text-gowith-dark-blue">Incident Response</h3>
                  </div>
                  <p className="text-gray-700">
                    Rapid response and remediation in the event of a security incident. Our team is prepared to minimize damage and restore normal operations quickly.
                  </p>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6 mt-14 text-center">Our Security Approach</h2>
              
              <div className="mb-14">
                <div className="bg-gray-50 p-8 rounded-lg">
                  <ol className="relative">
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-10 h-10 bg-gowith-medium-blue text-white rounded-full -left-5">
                        1
                      </span>
                      <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Assess</h3>
                      <p className="text-gray-700">Evaluate your current security posture and identify vulnerabilities</p>
                    </li>
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-10 h-10 bg-gowith-medium-blue text-white rounded-full -left-5">
                        2
                      </span>
                      <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Design</h3>
                      <p className="text-gray-700">Develop a comprehensive security strategy tailored to your business</p>
                    </li>
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-10 h-10 bg-gowith-medium-blue text-white rounded-full -left-5">
                        3
                      </span>
                      <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Implement</h3>
                      <p className="text-gray-700">Deploy and configure security solutions and controls</p>
                    </li>
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-10 h-10 bg-gowith-medium-blue text-white rounded-full -left-5">
                        4
                      </span>
                      <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Monitor</h3>
                      <p className="text-gray-700">Continuously monitor for threats and suspicious activity</p>
                    </li>
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-10 h-10 bg-gowith-medium-blue text-white rounded-full -left-5">
                        5
                      </span>
                      <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Respond</h3>
                      <p className="text-gray-700">Rapidly address security incidents to minimize impact</p>
                    </li>
                    <li className="ml-6">
                      <span className="absolute flex items-center justify-center w-10 h-10 bg-gowith-medium-blue text-white rounded-full -left-5">
                        6
                      </span>
                      <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Evolve</h3>
                      <p className="text-gray-700">Regularly update security measures to address emerging threats</p>
                    </li>
                  </ol>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6 mt-14 text-center">Benefits</h2>
              
              <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 mb-14">
                <li>Comprehensive protection against evolving cyber threats</li>
                <li>Reduced risk of data breaches and associated costs</li>
                <li>Enhanced compliance with regulatory requirements</li>
                <li>Peace of mind knowing your business is protected</li>
                <li>Expert guidance from certified security professionals</li>
                <li>Rapid response to security incidents</li>
              </ul>
              
              <div className="bg-gowith-light-blue bg-opacity-10 p-8 rounded-lg border border-gowith-light-blue text-center mb-10">
                <h3 className="text-2xl font-bold text-gowith-dark-blue mb-4">Ready to protect your business from cyber threats?</h3>
                <Button className="bg-gowith-orange hover:bg-gowith-orange-hover text-white px-8 py-6 text-lg">
                  <Link to="/contact">Request a Security Assessment</Link>
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

export default Cybersecurity;

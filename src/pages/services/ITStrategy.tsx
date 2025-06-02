
import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart2, Zap, Layout, PieChart, ShieldAlert, Users } from "lucide-react";

const ITStrategy = () => {
  return <>
      <Navbar />
      <main>
        <section className="h-[35vh] bg-gradient-to-r from-gowith-dark-blue to-gowith-medium-blue flex items-center justify-center">
          <div className="container mx-auto px-[16px] my-[50px]">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Strategic IT Planning for Business Growth
              </h1>
              <p className="text-lg md:text-xl text-gowith-light-blue mb-6">
                Align technology with your business goals to drive innovation and competitive advantage
              </p>
              <p className="text-base md:text-lg text-white max-w-3xl mx-auto leading-relaxed">
                Develop a clear vision for your IT infrastructure that supports your long-term objectives.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6 text-center">Overview</h2>
              <p className="text-lg text-gray-700 mb-8">
                CloudMor's IT Strategy services help businesses develop a clear vision for their technology infrastructure that supports long-term objectives. We work closely with your leadership team to understand your business goals and create a roadmap that leverages technology as a strategic asset. Our approach ensures that your IT investments deliver maximum value and support your organization's growth and success.
              </p>
              
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6 mt-14 text-center">Key Components</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <BarChart2 className="text-gowith-medium-blue h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold text-gowith-dark-blue">Technology Roadmapping</h3>
                  </div>
                  <p className="text-gray-700">
                    Development of a comprehensive technology roadmap that aligns with your business strategy. We create a clear path forward for your technology investments.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Zap className="text-gowith-medium-blue h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold text-gowith-dark-blue">Digital Transformation</h3>
                  </div>
                  <p className="text-gray-700">
                    Strategic guidance on leveraging digital technologies to transform your business processes and customer experiences. We help you navigate the digital landscape.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Layout className="text-gowith-medium-blue h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold text-gowith-dark-blue">IT Governance</h3>
                  </div>
                  <p className="text-gray-700">
                    Establishment of frameworks and processes to ensure technology decisions support business objectives. We create structures that enable effective decision-making.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <PieChart className="text-gowith-medium-blue h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold text-gowith-dark-blue">Budget Planning</h3>
                  </div>
                  <p className="text-gray-700">
                    Strategic allocation of technology resources to maximize ROI and support business priorities. We help you make the most of your IT budget.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <ShieldAlert className="text-gowith-medium-blue h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold text-gowith-dark-blue">Risk Management</h3>
                  </div>
                  <p className="text-gray-700">
                    Identification and mitigation of technology-related risks to protect your business. We ensure your strategy includes appropriate safeguards.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Users className="text-gowith-medium-blue h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold text-gowith-dark-blue">Vendor Strategy</h3>
                  </div>
                  <p className="text-gray-700">
                    Guidance on selecting and managing technology vendors to create a cohesive ecosystem. We help you build strategic partnerships with the right providers.
                  </p>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6 mt-14 text-center">Strategy Development Process</h2>
              
              <div className="mb-14">
                <div className="bg-gray-50 p-8 rounded-lg">
                  <ol className="relative">
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-10 h-10 bg-gowith-medium-blue text-white rounded-full -left-5">
                        1
                      </span>
                      <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Business Alignment</h3>
                      <p className="text-gray-700">Understand your business goals, challenges, and opportunities</p>
                    </li>
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-10 h-10 bg-gowith-medium-blue text-white rounded-full -left-5">
                        2
                      </span>
                      <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Current State Assessment</h3>
                      <p className="text-gray-700">Evaluate your existing technology environment</p>
                    </li>
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-10 h-10 bg-gowith-medium-blue text-white rounded-full -left-5">
                        3
                      </span>
                      <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Gap Analysis</h3>
                      <p className="text-gray-700">Identify gaps between current state and desired future state</p>
                    </li>
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-10 h-10 bg-gowith-medium-blue text-white rounded-full -left-5">
                        4
                      </span>
                      <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Roadmap Development</h3>
                      <p className="text-gray-700">Create a prioritized plan for technology initiatives</p>
                    </li>
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-10 h-10 bg-gowith-medium-blue text-white rounded-full -left-5">
                        5
                      </span>
                      <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Implementation Planning</h3>
                      <p className="text-gray-700">Develop detailed plans for executing the roadmap</p>
                    </li>
                    <li className="ml-6">
                      <span className="absolute flex items-center justify-center w-10 h-10 bg-gowith-medium-blue text-white rounded-full -left-5">
                        6
                      </span>
                      <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Ongoing Governance</h3>
                      <p className="text-gray-700">Establish processes for monitoring and adapting the strategy</p>
                    </li>
                  </ol>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6 mt-14 text-center">Benefits</h2>
              
              <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 mb-14">
                <li>Alignment of technology investments with business objectives</li>
                <li>Clear vision and direction for technology initiatives</li>
                <li>Improved return on technology investments</li>
                <li>Reduced risk through strategic planning</li>
                <li>Competitive advantage through innovative technology use</li>
                <li>Adaptability to changing business and technology landscapes</li>
              </ul>
              
              <div className="bg-gowith-light-blue bg-opacity-10 p-8 rounded-lg border border-gowith-light-blue text-center mb-10">
                <h3 className="text-2xl font-bold text-gowith-dark-blue mb-4">Ready to position your business for future success?</h3>
                <Button className="bg-gowith-orange hover:bg-gowith-orange-hover text-white px-8 py-6 text-lg">
                  <Link to="/contact">Schedule a Strategy Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>;
};

export default ITStrategy;

import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Lightbulb, Users, PenTool, ArrowUpCircle, BriefcaseBusiness, FileSearch } from "lucide-react";
const ProfessionalServices = () => {
  return <>
      <Navbar />
      <main>
        <section className="pt-32 pb-20 bg-gradient-to-r from-gowith-dark-blue to-gowith-medium-blue">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-white mb-6 md:text-2xl">
                Expert IT Professional Services
              </h1>
              <p className="text-xl text-gowith-light-blue mb-8">
                Strategic guidance and implementation for your most important technology initiatives
              </p>
              <p className="text-lg text-white mb-10 max-w-2xl mx-auto">
                From technology assessments to complex migrations, our team delivers projects on time and on budget.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6 text-center">Overview</h2>
              <p className="text-lg text-gray-700 mb-8">
                CloudMor's Professional Services team delivers expert guidance and implementation for strategic IT initiatives. From technology assessments to complex migrations, our experienced consultants work closely with your team to plan and execute projects that drive business value. We combine technical expertise with business acumen to deliver solutions that meet your specific needs and objectives.
              </p>
              
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6 mt-14 text-center">Key Services</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Lightbulb className="text-gowith-medium-blue h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold text-gowith-dark-blue">IT Consulting</h3>
                  </div>
                  <p className="text-gray-700">
                    Strategic guidance on technology decisions, helping you align IT with business goals. We provide expert advice based on years of industry experience.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Users className="text-gowith-medium-blue h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold text-gowith-dark-blue">Project Management</h3>
                  </div>
                  <p className="text-gray-700">
                    Skilled management of technology projects from planning to implementation. We ensure your projects are delivered on time, within budget, and to specification.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <PenTool className="text-gowith-medium-blue h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold text-gowith-dark-blue">Technology Implementation</h3>
                  </div>
                  <p className="text-gray-700">
                    Expert deployment of new technologies and systems with minimal disruption. We handle the technical details so you can focus on your business.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <ArrowUpCircle className="text-gowith-medium-blue h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold text-gowith-dark-blue">Infrastructure Upgrades</h3>
                  </div>
                  <p className="text-gray-700">
                    Carefully planned and executed upgrades to your technology infrastructure. We modernize your systems while maintaining business continuity.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <BriefcaseBusiness className="text-gowith-medium-blue h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold text-gowith-dark-blue">Virtual CIO (vCIO) Services</h3>
                  </div>
                  <p className="text-gray-700">
                    Executive-level technology guidance without the cost of a full-time CIO. Our vCIOs provide strategic planning, budgeting, and roadmapping.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <FileSearch className="text-gowith-medium-blue h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold text-gowith-dark-blue">Technology Assessment</h3>
                  </div>
                  <p className="text-gray-700">
                    Comprehensive evaluation of your current technology environment to identify opportunities for improvement. We provide actionable recommendations based on best practices.
                  </p>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6 mt-14 text-center">Project Approach</h2>
              
              <div className="mb-14">
                <div className="bg-gray-50 p-8 rounded-lg">
                  <ol className="relative">
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-10 h-10 bg-gowith-medium-blue text-white rounded-full -left-5">
                        1
                      </span>
                      <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Discovery</h3>
                      <p className="text-gray-700">Understand your business objectives and current environment</p>
                    </li>
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-10 h-10 bg-gowith-medium-blue text-white rounded-full -left-5">
                        2
                      </span>
                      <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Planning</h3>
                      <p className="text-gray-700">Develop a detailed project plan with clear deliverables and timelines</p>
                    </li>
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-10 h-10 bg-gowith-medium-blue text-white rounded-full -left-5">
                        3
                      </span>
                      <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Execution</h3>
                      <p className="text-gray-700">Implement the solution with careful attention to quality and detail</p>
                    </li>
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-10 h-10 bg-gowith-medium-blue text-white rounded-full -left-5">
                        4
                      </span>
                      <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Testing</h3>
                      <p className="text-gray-700">Rigorously test all aspects of the implementation</p>
                    </li>
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-10 h-10 bg-gowith-medium-blue text-white rounded-full -left-5">
                        5
                      </span>
                      <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Training</h3>
                      <p className="text-gray-700">Provide comprehensive training for your team</p>
                    </li>
                    <li className="ml-6">
                      <span className="absolute flex items-center justify-center w-10 h-10 bg-gowith-medium-blue text-white rounded-full -left-5">
                        6
                      </span>
                      <h3 className="font-semibold text-xl text-gowith-dark-blue mb-2">Transition</h3>
                      <p className="text-gray-700">Ensure a smooth transition to operational status</p>
                    </li>
                  </ol>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6 mt-14 text-center">Team Expertise</h2>
              
              <p className="text-lg text-gray-700 mb-8">
                Our Professional Services team brings decades of combined experience and numerous industry certifications. We stay at the forefront of technology trends and best practices to deliver exceptional results for our clients. Our specialists are experts in their respective fields, with deep knowledge of enterprise technologies and business processes.
              </p>
              
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6 mt-14 text-center">Benefits</h2>
              
              <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 mb-14">
                <li>Access to specialized expertise for critical projects</li>
                <li>Reduced risk through careful planning and execution</li>
                <li>Accelerated implementation timelines</li>
                <li>Knowledge transfer to your internal team</li>
                <li>Strategic guidance from experienced professionals</li>
                <li>Focus on business outcomes, not just technical implementation</li>
              </ul>
              
              <div className="bg-gowith-light-blue bg-opacity-10 p-8 rounded-lg border border-gowith-light-blue text-center mb-10">
                <h3 className="text-2xl font-bold text-gowith-dark-blue mb-4">Ready to transform your business with expert IT guidance?</h3>
                <Button className="bg-gowith-orange hover:bg-gowith-orange-hover text-white px-8 py-6 text-lg">
                  <Link to="/contact">Discuss Your Project Needs</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>;
};
export default ProfessionalServices;

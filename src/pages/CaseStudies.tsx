import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CaseStudies = () => {
  const caseStudies = [
    {
      id: 1,
      title: "Manufacturing Company Transformation",
      client: "Mid-sized manufacturing company with 150 employees",
      industry: "Manufacturing",
      challenge: "Outdated infrastructure causing frequent downtime and security vulnerabilities",
      solution: "Complete technology transformation with hybrid cloud solution and advanced security measures",
      results: [
        "99.9% system uptime, eliminating production disruptions",
        "78% reduction in security incidents",
        "40% decrease in overall IT costs through operational efficiencies"
      ],
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 2,
      title: "Law Firm Security Enhancement",
      client: "Established law firm with 75 attorneys and staff",
      industry: "Legal Services",
      challenge: "Increasing cybersecurity threats and compliance requirements",
      solution: "Comprehensive security program with multi-layered protection and staff training",
      results: [
        "Successfully blocked over 1,200 potential security threats in the first year",
        "100% compliance with industry regulations and client security requirements",
        "90% reduction in successful phishing attempts through employee training"
      ],
      image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 3,
      title: "Healthcare Provider Cloud Migration",
      client: "Regional healthcare provider with multiple locations",
      industry: "Healthcare",
      challenge: "Fragmented systems and limited accessibility of patient information",
      solution: "Strategic cloud migration with HIPAA-compliant infrastructure",
      results: [
        "Seamless access to patient information across all locations",
        "35% reduction in IT operational costs",
        "60% faster deployment of new applications and services"
      ],
      image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        <section className="h-[35vh] bg-gradient-to-r from-gowith-dark-blue to-gowith-medium-blue flex items-center justify-center">
          <div className="container mx-auto px-[16px] my-[50px]">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Case Studies
              </h1>
              <p className="text-lg md:text-xl text-gowith-light-blue mb-6">
                Real results for real businesses
              </p>
              <p className="text-base md:text-lg text-white max-w-2xl mx-auto leading-relaxed">
                Explore how we've helped organizations across diverse industries overcome technology challenges and achieve their business objectives
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <div className="flex justify-center space-x-4 mb-8">
                <button className="bg-gowith-medium-blue text-white px-4 py-2 rounded">All Industries</button>
                <button className="text-gowith-dark-blue hover:bg-gray-100 px-4 py-2 rounded">Healthcare</button>
                <button className="text-gowith-dark-blue hover:bg-gray-100 px-4 py-2 rounded">Manufacturing</button>
                <button className="text-gowith-dark-blue hover:bg-gray-100 px-4 py-2 rounded">Financial Services</button>
                <button className="text-gowith-dark-blue hover:bg-gray-100 px-4 py-2 rounded">Legal</button>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button className="text-gowith-dark-blue hover:bg-gray-100 px-4 py-2 rounded">Cybersecurity</button>
                <button className="text-gowith-dark-blue hover:bg-gray-100 px-4 py-2 rounded">Cloud Migration</button>
                <button className="text-gowith-dark-blue hover:bg-gray-100 px-4 py-2 rounded">Managed IT</button>
                <button className="text-gowith-dark-blue hover:bg-gray-100 px-4 py-2 rounded">IT Strategy</button>
              </div>
            </div>
            
            <div className="space-y-16">
              {caseStudies.map((study, index) => (
                <div key={study.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <img src={study.image} alt={study.title} className="rounded-lg shadow-md w-full h-full object-cover" />
                  </div>
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <span className="text-gowith-light-blue font-medium">{study.industry}</span>
                    <h2 className="text-3xl font-bold text-gowith-dark-blue mt-2 mb-4">{study.title}</h2>
                    <p className="text-gray-600 mb-4">{study.client}</p>
                    
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gowith-medium-blue mb-2">Challenge</h3>
                      <p className="text-gray-600">{study.challenge}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gowith-medium-blue mb-2">Solution</h3>
                      <p className="text-gray-600">{study.solution}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gowith-medium-blue mb-2">Results</h3>
                      <ul className="list-disc list-outside ml-5 text-gray-600">
                        {study.results.map((result, i) => (
                          <li key={i} className="mb-1">{result}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-8">
                      <a href={`/insights/case-studies/${study.id}`} className="inline-flex items-center text-gowith-medium-blue hover:text-gowith-dark-blue font-medium">
                        Read full case study
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <a href="/contact" className="inline-block bg-gowith-orange hover:bg-gowith-orange-hover text-white px-8 py-3 rounded-md transition-colors">
                Discuss Your Project With Our Experts
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CaseStudies;

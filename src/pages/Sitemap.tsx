import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Sitemap = () => {
  return (
    <>
      <Navbar />
      <main>
        <section className="h-[35vh] bg-gradient-to-r from-gowith-dark-blue to-gowith-medium-blue flex items-center justify-center">
          <div className="container mx-auto px-[16px] my-[50px]">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Sitemap
              </h1>
              <p className="text-lg md:text-xl text-gowith-light-blue mb-6">
                Find your way around our website
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-gowith-dark-blue mb-4">Main Pages</h2>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gowith-medium-blue hover:underline">Home</Link></li>
                  <li><Link to="/about" className="text-gowith-medium-blue hover:underline">About Us</Link></li>
                  <li><Link to="/contact" className="text-gowith-medium-blue hover:underline">Contact</Link></li>
                  <li><Link to="/careers" className="text-gowith-medium-blue hover:underline">Careers</Link></li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gowith-dark-blue mb-4">Services</h2>
                <ul className="space-y-2">
                  <li><Link to="/services" className="text-gowith-medium-blue hover:underline">Services Overview</Link></li>
                  <li><Link to="/services/managed-it" className="text-gowith-medium-blue hover:underline">Managed IT Services</Link></li>
                  <li><Link to="/services/cybersecurity" className="text-gowith-medium-blue hover:underline">Cybersecurity Services</Link></li>
                  <li><Link to="/services/cloud" className="text-gowith-medium-blue hover:underline">Managed Cloud Services</Link></li>
                  <li><Link to="/services/professional" className="text-gowith-medium-blue hover:underline">Professional Services</Link></li>
                  <li><Link to="/services/it-strategy" className="text-gowith-medium-blue hover:underline">IT Strategy</Link></li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gowith-dark-blue mb-4">Industries</h2>
                <ul className="space-y-2">
                  <li><Link to="/industries" className="text-gowith-medium-blue hover:underline">Industries Overview</Link></li>
                  <li><Link to="/industries/financial-services" className="text-gowith-medium-blue hover:underline">Financial Services</Link></li>
                  <li><Link to="/industries/healthcare" className="text-gowith-medium-blue hover:underline">Healthcare</Link></li>
                  <li><Link to="/industries/legal" className="text-gowith-medium-blue hover:underline">Law Firms</Link></li>
                  <li><Link to="/industries/private-equity" className="text-gowith-medium-blue hover:underline">Private Equity</Link></li>
                  <li><Link to="/industries/manufacturing" className="text-gowith-medium-blue hover:underline">Manufacturing</Link></li>
                  <li><Link to="/industries/technology" className="text-gowith-medium-blue hover:underline">Technology & Startups</Link></li>
                  <li><Link to="/industries/entertainment" className="text-gowith-medium-blue hover:underline">Entertainment</Link></li>
                  <li><Link to="/industries/professional-services" className="text-gowith-medium-blue hover:underline">Professional Services</Link></li>
                  <li><Link to="/industries/non-profit" className="text-gowith-medium-blue hover:underline">Non-Profits</Link></li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gowith-dark-blue mb-4">Insights</h2>
                <ul className="space-y-2">
                  <li><Link to="/insights/case-studies" className="text-gowith-medium-blue hover:underline">Case Studies</Link></li>
                  <li><Link to="/insights/blog" className="text-gowith-medium-blue hover:underline">Blog</Link></li>
                </ul>
                
                <h2 className="text-2xl font-bold text-gowith-dark-blue mt-8 mb-4">Legal</h2>
                <ul className="space-y-2">
                  <li><Link to="/privacy-policy" className="text-gowith-medium-blue hover:underline">Privacy Policy</Link></li>
                  <li><Link to="/terms-of-service" className="text-gowith-medium-blue hover:underline">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Sitemap;

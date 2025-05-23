import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ManagedIT = () => {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-20 bg-gradient-to-r from-gowith-dark-blue to-gowith-medium-blue">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-white mb-6 md:text-2xl">
                Comprehensive Managed IT Services
              </h1>
              <p className="text-xl text-gowith-light-blue mb-8">
                Proactive technology management that drives business success
              </p>
              <p className="text-lg text-white mb-10 max-w-2xl mx-auto">
                Let our team handle the day-to-day management of your technology, so you can focus on running your business.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6">Overview</h2>
              <p className="text-lg text-gray-600 mb-8">
                CloudMor's Managed IT Services provide comprehensive support for your entire technology infrastructure. We take a proactive approach to IT management, identifying and resolving issues before they impact your business. Our team becomes an extension of yours, providing the expertise and support you need to leverage technology for growth and success.
              </p>
              
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm mb-12">
                <h2 className="text-2xl font-bold text-gowith-dark-blue mb-6">Key Features</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-gowith-medium-blue mb-2">24/7 Monitoring and Support</h3>
                    <p className="text-gray-600">
                      Round-the-clock monitoring of your critical systems with alerts and automated resolution of common issues. Our helpdesk is always available to provide support when you need it.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gowith-medium-blue mb-2">Proactive Maintenance</h3>
                    <p className="text-gray-600">
                      Regular updates, patches, and preventative maintenance to keep your systems secure and performing optimally. We prevent problems before they occur.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gowith-medium-blue mb-2">Network Management</h3>
                    <p className="text-gray-600">
                      Comprehensive management of your network infrastructure, including routers, switches, firewalls, and wireless access points. We ensure reliable connectivity and performance.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gowith-medium-blue mb-2">Strategic IT Planning</h3>
                    <p className="text-gray-600">
                      Regular technology assessments and strategic planning to align your IT infrastructure with business objectives. We help you make informed decisions about technology investments.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gowith-medium-blue mb-2">Vendor Management</h3>
                    <p className="text-gray-600">
                      Coordination with technology vendors on your behalf, ensuring seamless integration and support. We become your single point of contact for all IT-related matters.
                    </p>
                  </div>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6">How It Works</h2>
              <div className="space-y-6 mb-12">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gowith-medium-blue text-white">
                      1
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gowith-dark-blue">Assessment</h3>
                    <p className="text-gray-600">
                      We begin with a comprehensive assessment of your current IT infrastructure to identify strengths, weaknesses, and opportunities for improvement.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gowith-medium-blue text-white">
                      2
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gowith-dark-blue">Strategic Planning</h3>
                    <p className="text-gray-600">
                      Based on the assessment, we develop a strategic plan tailored to your business needs and objectives.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gowith-medium-blue text-white">
                      3
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gowith-dark-blue">Implementation</h3>
                    <p className="text-gray-600">
                      Our team implements the necessary technologies, processes, and procedures to optimize your IT environment.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gowith-medium-blue text-white">
                      4
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gowith-dark-blue">Ongoing Management</h3>
                    <p className="text-gray-600">
                      We provide continuous monitoring, maintenance, and support to ensure your technology remains secure, reliable, and aligned with your business goals.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gowith-medium-blue text-white">
                      5
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gowith-dark-blue">Regular Reviews</h3>
                    <p className="text-gray-600">
                      Quarterly business reviews to assess performance, discuss future needs, and adjust strategies as necessary.
                    </p>
                  </div>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6">Benefits</h2>
              <ul className="list-disc list-outside ml-5 text-gray-600 space-y-2 mb-12">
                <li>Reduced downtime and improved productivity</li>
                <li>Predictable monthly IT costs</li>
                <li>Enhanced security and compliance</li>
                <li>Access to a team of IT experts</li>
                <li>Strategic guidance for technology investments</li>
                <li>Focus on your core business while we manage the technology</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing Wizard Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gowith-dark-blue mb-4">
                  Managed Services Pricing Calculator
                </h2>
                <p className="text-lg text-gray-600">
                  Get an instant estimate for your managed IT services based on your specific requirements
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8">
                <iframe 
                  src="https://app.calconic.com/api/embed/calculator/5fca9eac0ff8010029aa0767" 
                  sandbox="allow-same-origin allow-forms allow-scripts allow-top-navigation allow-popups-to-escape-sandbox allow-popups" 
                  title="Calconic_ Calculator" 
                  name="Calconic_ Calculator" 
                  height="996px" 
                  scrolling="no" 
                  style={{width: '100%', border: 0, outline: 'none'}}
                />
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 mb-4">
                  * This calculator provides an estimate based on standard configurations. Final pricing may vary based on specific requirements and customizations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/contact" className="inline-block bg-gowith-orange hover:bg-gowith-orange-hover text-white px-6 py-3 rounded-md transition-colors">
                    Request Detailed Quote
                  </a>
                  <a href="tel:+18885546597" className="inline-block bg-gowith-medium-blue hover:bg-gowith-dark-blue text-white px-6 py-3 rounded-md transition-colors">
                    Call (888) 554-6597
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-gowith-dark-blue text-white p-8 rounded-lg text-center">
                <h2 className="text-2xl font-bold mb-4">Experience Reliable, Proactive IT Management</h2>
                <p className="mb-6">Take the first step towards optimizing your technology infrastructure</p>
                <a href="/contact" className="inline-block bg-gowith-orange hover:bg-gowith-orange-hover text-white px-8 py-3 rounded-md transition-colors">
                  Schedule Your Free IT Assessment
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Calconic Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() { 
              function inViewport(element) { 
                var m = 100; 
                var w = window; 
                var r = element.getBoundingClientRect(); 
                var wB = w.innerHeight; 
                var wR = w.innerWidth; 
                return ( 
                  (0 <= r.top && wB -m >= r.top) || 
                  (0 >= r.top && wB <= r.bottom) || 
                  (m <= r.bottom && wB >= r.bottom) 
                ) && ( 
                  (0 <= r.left && wR -m >= r.left) || 
                  (0 >= r.left && wR <= r.right) || 
                  (m <= r.right && wR >= r.right) 
                ); 
              } 
              var iframes = []; 
              window.addEventListener("message",function(t){ 
                var e="https://www.paypalobjects.com/api/checkout.4.0.141.js"; 
                if(!document.querySelector('script[src="'+e+'"]')&&t.data&&"LOAD_PAYPAL"===t.data.action){ 
                  var a=document.createElement("script");
                  a.src=e,a.async=!0,a.dataset={paypalCheckout:!0,noBridge:!0,state:"ppxo_meta",env:"production"},
                  document.body.append(a) 
                }
                if(t.data&&"CALCONIC_UPDATE_HEIGHT"===t.data.action){ 
                  var l=document.querySelectorAll('iframe[src="https://app.calconic.com/api/embed/calculator/'+t.data.payload.id+'"]'); 
                  for (let i in [...l]) { 
                    l[i].height=t.data.payload.height; 
                    if (!iframes.includes(l[i])) { 
                      iframes.push(l[i]); 
                      let intervalId = setInterval(function() { 
                        l[i].contentWindow.postMessage({ action: 'IS_ACTIVE' }, '*'); 
                        if (inViewport(l[i])) { 
                          clearInterval(intervalId); 
                          l[i].contentWindow.postMessage({ action: 'IN_VIEWPORT' }, '*'); 
                        } 
                      }, 200); 
                    } 
                  };
                } 
              }); 
            })();
          `
        }}
      />
    </>
  );
};

export default ManagedIT;

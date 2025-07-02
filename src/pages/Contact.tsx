
import React, { useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapPin } from "lucide-react";

const Contact = () => {
  useEffect(() => {
    // Load Typeform embed script
    const script = document.createElement('script');
    script.src = '//embed.typeform.com/next/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      const existingScript = document.querySelector('script[src="//embed.typeform.com/next/embed.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <section className="h-[15vh] bg-gradient-to-r from-gowith-dark-blue to-gowith-medium-blue flex items-center justify-center my-20">
          <div className="container mx-auto px-[16px] my-[50px]">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Get in Touch
              </h1>
              <p className="text-lg md:text-xl text-gowith-light-blue mb-6">
                We're here to help with your technology challenges
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Typeform Embed */}
              <div className="bg-gray-50 p-8 rounded-lg shadow-md">
                <div data-tf-live="01JZ6NHSXJY8Z0T2Y9F67F1K68"></div>
              </div>
              
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-gowith-dark-blue mb-6">Contact Information</h2>
                
                <div className="space-y-8">
                  {/* Office Address */}
                  <div>
                    <h3 className="text-xl font-bold text-gowith-medium-blue mb-2 flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Office Location
                    </h3>
                    <div className="bg-gowith-dark-blue text-white p-4 rounded-lg mb-4">
                      <p className="font-medium">188 Spear Street, #170</p>
                      <p>San Francisco, CA 94105</p>
                    </div>
                    {/* Embedded Google Map */}
                    <div className="w-full h-64 rounded-lg overflow-hidden shadow-md">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0136999999998!2d-122.39358!3d37.791541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807c35b1b1b1%3A0x1b1b1b1b1b1b1b1b!2s188%20Spear%20St%2C%20San%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1234567890123"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="CloudMor Office Location"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gowith-medium-blue mb-2">Phone</h3>
                    <p className="text-gray-600">Main: <a href="tel:8885546597" className="text-gowith-medium-blue hover:underline">(888) 554-6597</a></p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gowith-medium-blue mb-2">Email</h3>
                    <p className="text-gray-600">General Inquiries: <a href="mailto:sales@cloudmor.com" className="text-gowith-medium-blue hover:underline">sales@cloudmor.com</a></p>
                    <p className="text-gray-600">Support: <a href="mailto:Support@cloudmor.com" className="text-gowith-medium-blue hover:underline">Support@cloudmor.com</a></p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gowith-medium-blue mb-2">Office Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM (PST)</p>
                    <p className="text-gray-600">After-hours support available for clients</p>
                  </div>
                  
                  <div className="bg-gowith-dark-blue text-white p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">Support Options</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gowith-light-blue">Standard Support</h4>
                        <p className="text-sm">Our standard support is available during business hours for all clients. Contact us by phone, email, or through our client portal.</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gowith-light-blue">Priority Support</h4>
                        <p className="text-sm">Clients with priority support agreements receive expedited response times and extended support hours.</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gowith-light-blue">Emergency Support</h4>
                        <p className="text-sm">For critical issues outside business hours, our emergency support line is available 24/7 for clients with eligible support plans.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;

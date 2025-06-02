import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import { toast } from "sonner";

const Contact = () => {
  const handleFormSuccess = () => {
    toast.success("Thank you for your message! We'll be in touch soon.");
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="h-[35vh] bg-gradient-to-r from-gowith-dark-blue to-gowith-medium-blue flex items-center justify-center">
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
              {/* Contact Form */}
              <div className="bg-gray-50 p-8 rounded-lg shadow-md">
                <ContactForm 
                  formTitle="Send Us a Message" 
                  formDescription="Fill out the form below and our team will respond shortly."
                  buttonText="Submit"
                  formType="contact"
                  showConsultationCheckbox={true}
                  onSubmitSuccess={handleFormSuccess}
                />
              </div>
              
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-gowith-dark-blue mb-6">Contact Information</h2>
                
                <div className="space-y-8">
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

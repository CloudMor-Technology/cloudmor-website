
import React from 'react';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gowith-dark-blue mb-4">
            Get In Touch With Us
          </h2>
          <p className="text-lg text-gray-600">
            Ready to start your free website project? Contact us today!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Phone Contact */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gowith-orange to-gowith-orange-hover rounded-full flex items-center justify-center">
              <img 
                src="/assets/icons/contact-phone-blue.png" 
                alt="Phone" 
                className="w-8 h-8"
                onError={(e) => {
                  // Fallback to Lucide icon if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <Phone className="w-8 h-8 text-white hidden" />
            </div>
            <h3 className="text-lg font-bold text-gowith-dark-blue mb-2">Call Us</h3>
            <p className="text-gray-600">
              <a href="tel:8885546597" className="hover:text-gowith-orange transition-colors">
                (888) 554-6597
              </a>
            </p>
          </div>

          {/* Email Contact */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gowith-medium-blue to-gowith-light-blue rounded-full flex items-center justify-center">
              <img 
                src="/assets/icons/contact-email.png" 
                alt="Email" 
                className="w-8 h-8"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <Mail className="w-8 h-8 text-white hidden" />
            </div>
            <h3 className="text-lg font-bold text-gowith-dark-blue mb-2">Email Us</h3>
            <p className="text-gray-600">
              <a href="mailto:sales@cloudmor.com" className="hover:text-gowith-orange transition-colors">
                sales@cloudmor.com
              </a>
            </p>
          </div>

          {/* Location */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gowith-dark-blue to-gowith-medium-blue rounded-full flex items-center justify-center">
              <img 
                src="/assets/icons/contact-location.png" 
                alt="Location" 
                className="w-8 h-8"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <MapPin className="w-8 h-8 text-white hidden" />
            </div>
            <h3 className="text-lg font-bold text-gowith-dark-blue mb-2">Visit Us</h3>
            <p className="text-gray-600">California, USA</p>
          </div>

          {/* Website */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <img 
                src="/assets/icons/contact-globe.png" 
                alt="Website" 
                className="w-8 h-8"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <Globe className="w-8 h-8 text-white hidden" />
            </div>
            <h3 className="text-lg font-bold text-gowith-dark-blue mb-2">Website</h3>
            <p className="text-gray-600">
              <a href="https://cloudmor.com" className="hover:text-gowith-orange transition-colors">
                cloudmor.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

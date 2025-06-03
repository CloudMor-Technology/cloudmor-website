import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdDesignServices, MdCode, MdDevices, MdSpeed, MdSecurity, MdTrendingUp } from 'react-icons/md';
import { Helmet } from 'react-helmet';

const WebDesignDevelopment = () => {
  return (
    <div>
      <Helmet>
        <title>Web Design and Development Services | [Your Company Name]</title>
        <meta name="description" content="Comprehensive web design and development services to create stunning, high-performing websites tailored to your business needs." />
        {/* You can add more meta tags as needed, such as keywords, author, etc. */}
      </Helmet>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-24">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Web Design & Development Services
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-12">
            Crafting digital experiences that drive results.
          </p>
          <a href="/contact" className="bg-white text-blue-600 py-3 px-8 rounded-full font-semibold hover:bg-blue-100 transition-colors duration-300">
            Get a Free Quote
          </a>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Web Design */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <MdDesignServices className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Web Design</h3>
              <p className="text-gray-700">
                Visually appealing and user-friendly designs that capture your brand identity.
              </p>
            </div>

            {/* Web Development */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <MdCode className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Web Development</h3>
              <p className="text-gray-700">
                Robust and scalable web solutions using the latest technologies.
              </p>
            </div>

            {/* Responsive Design */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <MdDevices className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Responsive Design</h3>
              <p className="text-gray-700">
                Websites that adapt seamlessly to any device, ensuring a consistent user experience.
              </p>
            </div>

            {/* Performance Optimization */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <MdSpeed className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance Optimization</h3>
              <p className="text-gray-700">
                Fast-loading websites that provide a smooth and engaging user experience.
              </p>
            </div>

            {/* Security */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <MdSecurity className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Security</h3>
              <p className="text-gray-700">
                Protecting your website and users with the latest security measures.
              </p>
            </div>

            {/* SEO Friendly */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <MdTrendingUp className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">SEO Friendly</h3>
              <p className="text-gray-700">
                Optimizing your website for search engines to drive more organic traffic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our web design and development services include a range of key features to ensure your website is a success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="flex items-start">
              <FaCheckCircle className="text-green-500 text-2xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom Design</h3>
                <p className="text-gray-700">
                  Tailored designs that reflect your brand and meet your specific needs.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start">
              <FaCheckCircle className="text-green-500 text-2xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">User-Friendly Interface</h3>
                <p className="text-gray-700">
                  Intuitive navigation and a seamless user experience.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start">
              <FaCheckCircle className="text-green-500 text-2xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Mobile Optimization</h3>
                <p className="text-gray-700">
                  Ensuring your website looks and functions perfectly on all devices.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start">
              <FaCheckCircle className="text-green-500 text-2xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">SEO Optimization</h3>
                <p className="text-gray-700">
                  Improving your website's visibility in search engine results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Industry Portfolio Showcase */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Industry Portfolio Showcase
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover how we've helped businesses across various industries build stunning, high-performing websites that drive results.
              </p>
            </div>

            {/* Finance Industry */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Finance Industry</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="/lovable-uploads/b54dbedd-701e-4c03-9e4c-32de14604d6a.png" 
                    alt="Maxwell Locke & Ritter Website" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">Maxwell Locke & Ritter LLP</h4>
                    <p className="text-gray-600 text-sm mt-2">Austin's largest locally-owned accounting firm</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551838449-2429e8be8625?w=500&h=300&fit=crop" 
                    alt="Baleen Specialty Insurance Website" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">Baleen Specialty Insurance</h4>
                    <p className="text-gray-600 text-sm mt-2">Technology-powered underwriting operation</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=300&fit=crop" 
                    alt="Coalition Inc Website" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">Coalition Inc.</h4>
                    <p className="text-gray-600 text-sm mt-2">Leading provider of cyber insurance and security</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Healthcare Industry */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Healthcare Industry</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1524230572899-a752b3835840?w=500&h=300&fit=crop" 
                    alt="Medical Center Website" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">Premier Medical Center</h4>
                    <p className="text-gray-600 text-sm mt-2">Comprehensive healthcare services</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=500&h=300&fit=crop" 
                    alt="Dental Practice Website" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">Advanced Dental Care</h4>
                    <p className="text-gray-600 text-sm mt-2">Modern dental practice with advanced technology</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551038247-3d9af20df552?w=500&h=300&fit=crop" 
                    alt="Specialty Clinic Website" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">Cardiology Specialists</h4>
                    <p className="text-gray-600 text-sm mt-2">Specialized cardiac care center</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technology Industry */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Technology Industry</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1466442929976-97f336a657be?w=500&h=300&fit=crop" 
                    alt="Tech Startup Website" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">InnovaTech Solutions</h4>
                    <p className="text-gray-600 text-sm mt-2">Software development and consulting</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=500&h=300&fit=crop" 
                    alt="SaaS Platform Website" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">CloudFlow Platform</h4>
                    <p className="text-gray-600 text-sm mt-2">Enterprise cloud management solution</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=300&fit=crop" 
                    alt="AI Company Website" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">AI Dynamics</h4>
                    <p className="text-gray-600 text-sm mt-2">Artificial intelligence and machine learning</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Real Estate Industry */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Real Estate Industry</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1524230572899-a752b3835840?w=500&h=300&fit=crop" 
                    alt="Luxury Realty Website" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">Luxury Realty Group</h4>
                    <p className="text-gray-600 text-sm mt-2">Premium real estate services</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=500&h=300&fit=crop" 
                    alt="Commercial Properties Website" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">Metro Commercial Properties</h4>
                    <p className="text-gray-600 text-sm mt-2">Commercial real estate specialists</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551038247-3d9af20df552?w=500&h=300&fit=crop" 
                    alt="Property Management Website" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">Premier Property Management</h4>
                    <p className="text-gray-600 text-sm mt-2">Full-service property management</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mortgage Industry */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Mortgage Industry</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1466442929976-97f336a657be?w=500&h=300&fit=crop" 
                    alt="Home Loans Website" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">First Home Mortgage</h4>
                    <p className="text-gray-600 text-sm mt-2">Residential mortgage specialists</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=500&h=300&fit=crop" 
                    alt="Mortgage Broker Website" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">Capital Mortgage Brokers</h4>
                    <p className="text-gray-600 text-sm mt-2">Independent mortgage brokerage</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=300&fit=crop" 
                    alt="Refinancing Services Website" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">Elite Refinancing Solutions</h4>
                    <p className="text-gray-600 text-sm mt-2">Mortgage refinancing experts</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nonprofit Organizations */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Nonprofit Organizations</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1524230572899-a752b3835840?w=500&h=300&fit=crop" 
                    alt="Community Foundation Website" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">Community Hope Foundation</h4>
                    <p className="text-gray-600 text-sm mt-2">Supporting local communities</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=500&h=300&fit=crop" 
                    alt="Educational Nonprofit Website" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">Future Leaders Education</h4>
                    <p className="text-gray-600 text-sm mt-2">Youth education and development</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551038247-3d9af20df552?w=500&h=300&fit=crop" 
                    alt="Health Nonprofit Website" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">Wellness for All</h4>
                    <p className="text-gray-600 text-sm mt-2">Community health initiatives</p>
                  </div>
                </div>
              </div>
            </div>

            {/* HOA Associations */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">HOA Associations</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1466442929976-97f336a657be?w=500&h=300&fit=crop" 
                    alt="Residential HOA Website" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">Oakwood Estates HOA</h4>
                    <p className="text-gray-600 text-sm mt-2">Residential community management</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=500&h=300&fit=crop" 
                    alt="Luxury Community HOA Website" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">Riverside Luxury Community</h4>
                    <p className="text-gray-600 text-sm mt-2">Premium gated community</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=300&fit=crop" 
                    alt="Townhome HOA Website" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">Maple Grove Townhomes</h4>
                    <p className="text-gray-600 text-sm mt-2">Modern townhome community</p>
                  </div>
                </div>
              </div>
            </div>

            {/* E-commerce Industry */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">E-commerce Industry</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1524230572899-a752b3835840?w=500&h=300&fit=crop" 
                    alt="Fashion Store Website" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">Urban Style Boutique</h4>
                    <p className="text-gray-600 text-sm mt-2">Contemporary fashion retailer</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=500&h=300&fit=crop" 
                    alt="Electronics Store Website" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">TechGear Pro</h4>
                    <p className="text-gray-600 text-sm mt-2">Professional electronics and gadgets</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551038247-3d9af20df552?w=500&h=300&fit=crop" 
                    alt="Home Goods Website" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900">Modern Living Essentials</h4>
                    <p className="text-gray-600 text-sm mt-2">Home decor and furniture</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Read what our clients have to say about our web design and development services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-700 italic mb-4">
                "The new website has transformed our online presence. We've seen a significant increase in leads and sales."
              </p>
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Client"
                  className="rounded-full w-10 h-10 mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">John Doe</h4>
                  <p className="text-gray-600 text-sm">CEO, Example Company</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-700 italic mb-4">
                "The team was professional, responsive, and delivered a website that exceeded our expectations."
              </p>
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Client"
                  className="rounded-full w-10 h-10 mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Jane Smith</h4>
                  <p className="text-gray-600 text-sm">Marketing Manager, Another Company</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-700 italic mb-4">
                "We highly recommend their web design and development services. They are true experts in their field."
              </p>
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Client"
                  className="rounded-full w-10 h-10 mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Mike Johnson</h4>
                  <p className="text-gray-600 text-sm">Owner, Yet Another Company</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl mb-12">
            Contact us today for a free consultation and let us help you create a website that drives results.
          </p>
          <a href="/contact" className="bg-white text-blue-600 py-3 px-8 rounded-full font-semibold hover:bg-blue-100 transition-colors duration-300">
            Get a Free Quote
          </a>
        </div>
      </section>
    </div>
  );
};

export default WebDesignDevelopment;

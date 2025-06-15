import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { CheckCircle, Star, Users, Clock, Shield, Smartphone, TrendingUp, Zap } from 'lucide-react';
import WebApplicationForm from '@/components/WebApplicationForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const WebLanding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const websiteShowcase = [
    { name: "Restaurant Website", image: "/lovable-uploads/834d5c69-5070-4488-bc7a-7b19eeebae04.png" },
    { name: "Healthcare Website", image: "/lovable-uploads/691e7939-254c-4028-91c9-7c00fd9a8db8.png" },
    { name: "Legal Services", image: "/lovable-uploads/b54dbedd-701e-4c03-9e4c-32de14604d6a.png" },
    { name: "Real Estate", image: "/lovable-uploads/c98e8d7b-612c-4375-b9d1-af212401e6dc.png" },
    { name: "Retail Store", image: "/lovable-uploads/d14591a0-5690-4ddf-99ca-b2144172f86c.png" },
    { name: "Construction", image: "/lovable-uploads/edb9dbfe-335c-4145-a6a2-f0e188e64fbb.png" }
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % websiteShowcase.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>FREE $6,300 Professional Website - CloudMor | web.cloudmor.com</title>
        <meta name="description" content="Get a $6,300 professional website absolutely FREE for selected California businesses. Fast, mobile-optimized, SEO-ready websites delivered in 2 weeks." />
        <meta name="keywords" content="free website, professional website design, California business, CloudMor, web design" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block bg-red-500 text-white px-6 py-2 rounded-full text-lg font-bold mb-6">
                🔥 LIMITED TIME OFFER - Only 50 Spots Available This Quarter
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Transform Your Business with a <span className="text-yellow-300">$6,300 Professional Website</span> - FREE for Limited Time & Selected Businesses
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Fast, Mobile-Optimized, and SEO-Ready Websites Built With Love for California Businesses
              </p>
              
              <p className="text-lg mb-10 max-w-4xl mx-auto leading-relaxed">
                Get a $6,300 professional website design absolutely FREE for a limited time - available only for selected businesses. We're helping communities and businesses get started or get the help they need to transform their online presence. Your complete website delivered in up to 2 weeks! Join 23,435+ successful businesses who've scaled with our expert team.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">23,435</div>
                  <div className="text-blue-200">Websites Built</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">$6,300</div>
                  <div className="text-blue-200">Website Value</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">$0</div>
                  <div className="text-blue-200">What You Pay</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">2 Weeks</div>
                  <div className="text-blue-200">Delivery Time</div>
                </div>
              </div>

              <a href="#application" className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 px-8 rounded-full transition-colors duration-300 inline-block">
                Get My FREE $6,300 Website
              </a>
            </div>

            {/* Website Showcase Carousel */}
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white p-4 rounded-lg shadow-2xl">
                <div className="relative h-64 md:h-96 overflow-hidden rounded">
                  <img 
                    src={websiteShowcase[currentSlide].image} 
                    alt={websiteShowcase[currentSlide].name}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded">
                    {websiteShowcase[currentSlide].name}
                  </div>
                </div>
                <div className="flex justify-center mt-4 space-x-2">
                  {websiteShowcase.map((_, index) => (
                    <div 
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Why Your Business Needs a Strong Digital Window
            </h2>
            <p className="text-lg text-gray-700 mb-12">
              In today's digital world, your website is your business's most important storefront. It's working 24/7 to showcase your products and services, build trust with customers, and drive sales. A professional website isn't just an expense—it's the foundation of your business growth.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <Smartphone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Mobile Optimized</h3>
                <p className="text-gray-600">Over 50% of traffic comes from mobile devices</p>
              </div>
              <div className="text-center p-6">
                <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">SEO Ready</h3>
                <p className="text-gray-600">Rank higher on Google and search engines</p>
              </div>
              <div className="text-center p-6">
                <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Maximum Speed</h3>
                <p className="text-gray-600">Lightning-fast loading times</p>
              </div>
              <div className="text-center p-6">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Cutting-Edge Security</h3>
                <p className="text-gray-600">Advanced protection and daily backups</p>
              </div>
              <div className="text-center p-6">
                <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Stunning Designs</h3>
                <p className="text-gray-600">World-class graphic design</p>
              </div>
              <div className="text-center p-6">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Easily Customizable</h3>
                <p className="text-gray-600">Edit your own content anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Support Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Helping Communities & Businesses Get Started
            </h2>
            <p className="text-lg text-gray-700 mb-12">
              At CloudMor, we believe every business deserves a chance to succeed online. That's why we're dedicated to helping communities and businesses get started or get the help they need to thrive. Whether you're launching your first business or need to upgrade your existing online presence, we're here to support your journey.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-800">New Entrepreneurs</h3>
                <p className="text-gray-600">Get the professional foundation you need to launch successfully</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-800">Struggling Businesses</h3>
                <p className="text-gray-600">Transform your online presence without breaking the bank</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-800">Growing Companies</h3>
                <p className="text-gray-600">Scale your digital presence as you expand</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-800">Community Organizations</h3>
                <p className="text-gray-600">Amplify your mission with professional web presence</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-lg text-gray-700 mb-6">
                We're not just building websites—we're building dreams, supporting families, and strengthening communities across California. Every free website we create helps a business owner feed their family, hire employees, and contribute to their local economy.
              </p>
              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
                <p className="text-lg font-semibold text-yellow-800">
                  ⏰ We select only 50 businesses each quarter for this exclusive community support program. This is our way of giving back and helping those who need it most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              What Other Agencies Charge vs. What You Pay
            </h2>
            
            <div className="bg-gray-50 rounded-lg p-8 mb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="py-4 text-lg font-semibold">Service</th>
                      <th className="py-4 text-lg font-semibold text-center">Other Agencies</th>
                      <th className="py-4 text-lg font-semibold text-center text-blue-600">CloudMor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3">Professional Design</td>
                      <td className="py-3 text-center">$3,000</td>
                      <td className="py-3 text-center text-green-600 font-bold">FREE</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3">Custom Logo Design</td>
                      <td className="py-3 text-center">$500</td>
                      <td className="py-3 text-center text-green-600 font-bold">FREE</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3">Mobile Optimization</td>
                      <td className="py-3 text-center">$800</td>
                      <td className="py-3 text-center text-green-600 font-bold">FREE</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3">SEO Setup</td>
                      <td className="py-3 text-center">$1,200</td>
                      <td className="py-3 text-center text-green-600 font-bold">FREE</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3">Security Features</td>
                      <td className="py-3 text-center">$500</td>
                      <td className="py-3 text-center text-green-600 font-bold">FREE</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3">Content Management</td>
                      <td className="py-3 text-center">$800</td>
                      <td className="py-3 text-center text-green-600 font-bold">FREE</td>
                    </tr>
                    <tr className="bg-yellow-50 font-bold text-lg">
                      <td className="py-4">TOTAL VALUE</td>
                      <td className="py-4 text-center text-red-600">$6,800+</td>
                      <td className="py-4 text-center text-green-600 text-2xl">$0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-center text-lg text-gray-700">
              While other agencies charge $6,300-$6,800+ upfront plus monthly fees, we're offering a complete $6,300+ value website absolutely FREE for selected businesses. This is our investment in helping communities and businesses succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              How We Get Your Website Done in 2 Weeks
            </h2>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Submit Your Application</h3>
                  <p className="text-gray-700">Submit your information with details about your business and services you offer. This helps our design team understand your business needs and vision.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">24-Hour Review & Response</h3>
                  <p className="text-gray-700">Our design team will review your application and get back to you within 24 hours after submission to confirm your selection and start working on your design.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Design Planning (Days 1-2)</h3>
                  <p className="text-gray-700">We design your website based on your recommended themes and colors discussed during the intake process. Our team creates a custom design that matches your brand and business goals.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Content Creation (Days 3-5)</h3>
                  <p className="text-gray-700">We provide all the content for your website at no additional cost. You may need to provide some specific information about your services, but our content team handles the professional writing.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Development & Logo Design (Days 6-12)</h3>
                  <p className="text-gray-700">Our engineers start working on your website design, create your custom logo, and develop all the technical features to ensure everything is ready for you.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">6</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Final Review & Launch (Days 13-14)</h3>
                  <p className="text-gray-700">We complete final testing, make any necessary adjustments, and launch your professional website - all ready for your business success!</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-12">
              <h3 className="text-xl font-bold mb-4">What's Included:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Custom Logo Design</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Professional Website Design</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Content Writing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Mobile Optimization</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>SEO Setup</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Security Features</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>2-Week Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lovable Integration Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Built with Lovable - The Future of Web Development
            </h2>
            <p className="text-xl mb-8">
              We use Lovable, the industry's most advanced website creation platform, to build stunning, professional websites in record time. This cutting-edge technology allows us to deliver enterprise-level websites that would typically cost thousands—absolutely free.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">AI-powered design optimization</h3>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Lightning-fast development process</h3>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Enterprise-grade performance</h3>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Seamless mobile responsiveness</h3>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Advanced SEO integration</h3>
              </div>
            </div>

            <a href="#application" className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300 inline-block">
              Experience the power of Lovable technology with your FREE website
            </a>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Apply for Your FREE $6,300 Professional Website
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Tell us about your business and how we can help you get started or take your business to the next level. Submit your information with details about your business and services to help our design team understand your needs. Every application is personally reviewed by our community support team.
              </p>
            </div>

            <WebApplicationForm />

            <div className="text-center mt-8">
              <p className="text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                ⚡ Limited Time: Only 50 spots available this quarter for our community support program. Applications are reviewed on a first-come, first-served basis with priority given to businesses that need the most help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              What Our Clients Say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4">
                  "CloudMor transformed our small bakery into a thriving online business. Our sales increased 300% in just 3 months!"
                </blockquote>
                <footer className="text-sm text-gray-600">
                  — Maria Rodriguez, Sweet Dreams Bakery, Los Angeles
                </footer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4">
                  "I couldn't believe they built our entire website for free. The quality is better than what we paid $5,000 for before."
                </blockquote>
                <footer className="text-sm text-gray-600">
                  — David Chen, Chen's Auto Repair, San Francisco
                </footer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4">
                  "The team at CloudMor didn't just build us a website—they gave us a complete business solution."
                </blockquote>
                <footer className="text-sm text-gray-600">
                  — Sarah Johnson, Johnson Consulting, San Diego
                </footer>
              </div>
            </div>

            <div className="text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-center space-x-2">
                  <Star className="h-6 w-6 text-yellow-400 fill-current" />
                  <span className="font-semibold">5-Star Google Reviews</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="font-semibold">BBB A+ Rating</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Users className="h-6 w-6 text-blue-500" />
                  <span className="font-semibold">99.9% Client Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WebLanding;

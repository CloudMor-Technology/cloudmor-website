import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { CheckCircle, Star, Users, Clock, Shield, Smartphone, TrendingUp, Zap, ArrowRight, Play, Globe, Monitor, Code, Palette } from 'lucide-react';
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
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>FREE $6,300 Professional Website - CloudMor | web.cloudmor.com</title>
        <meta name="description" content="Get a $6,300 professional website absolutely FREE for selected California businesses. Fast, mobile-optimized, SEO-ready websites delivered in 2 weeks." />
        <meta name="keywords" content="free website, professional website design, California business, CloudMor, web design" />
      </Helmet>

      <Navbar />

      {/* Hero Section - Blue Gradient Theme */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-800 text-white overflow-hidden min-h-screen">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-16 h-16 bg-green-400 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-32 right-20 w-8 h-8 bg-yellow-400 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-pink-400 rounded-full opacity-25 animate-bounce delay-1000"></div>
          <div className="absolute top-1/2 right-10 w-6 h-6 bg-purple-400 rounded-full opacity-20 animate-pulse delay-500"></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div>
                {/* Limited Time Badge */}
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 animate-pulse">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  <span>LIMITED TIME - Only 50 Spots Available Each Month</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                  BEAUTIFUL<br />
                  WEBSITES FOR THE<br />
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">BEST IDEAS</span>, YOURS.
                </h1>
                
                <p className="text-xl md:text-2xl mb-6 text-blue-100 max-w-2xl leading-relaxed">
                  Ready to get a professional website for your business and work with CloudMor's website design team?
                </p>
                
                <p className="text-lg mb-8 text-blue-200">
                  We'll create your best website in less than 2 weeks and launch.
                </p>

                {/* Community Empowerment Message */}
                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-400/30 rounded-2xl p-6 mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-green-300 mb-4">Empowering Communities to Thrive</h2>
                  <p className="text-lg text-blue-100 leading-relaxed">
                    We believe every business deserves success online. That's why we're investing in communities 
                    across California with our exclusive support program.
                  </p>
                </div>

                {/* CTA Button */}
                <a 
                  href="#application" 
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-xl font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-green-500/25"
                >
                  <span>JOIN THE REVOLUTION</span>
                  <ArrowRight className="h-6 w-6" />
                </a>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-1">23,435</div>
                    <div className="text-blue-200 text-sm">Websites Built</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-1">$6,300</div>
                    <div className="text-blue-200 text-sm">Website Value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-400 mb-1">$0</div>
                    <div className="text-blue-200 text-sm">What You Pay</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-1">2 Weeks</div>
                    <div className="text-blue-200 text-sm">Delivery Time</div>
                  </div>
                </div>
              </div>

              {/* Right Content - Illustration Area */}
              <div className="relative">
                <div className="relative z-10">
                  {/* Main illustration area with floating elements */}
                  <div className="relative bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20">
                    <div className="relative h-80 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-white">
                      <img 
                        src={websiteShowcase[currentSlide].image} 
                        alt={websiteShowcase[currentSlide].name}
                        className="w-full h-full object-cover transition-opacity duration-500"
                      />
                      <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                        {websiteShowcase[currentSlide].name}
                      </div>
                    </div>
                    <div className="flex justify-center mt-6 space-x-3">
                      {websiteShowcase.map((_, index) => (
                        <div 
                          key={index}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentSlide ? 'bg-green-400 scale-125' : 'bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Floating icons */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center animate-bounce">
                    <Monitor className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center animate-pulse">
                    <Code className="h-7 w-7 text-white" />
                  </div>
                  <div className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded-2xl flex items-center justify-center animate-bounce delay-500">
                    <Palette className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section - Modern Design */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                CONTACT US TODAY!
              </h2>
              <p className="text-xl text-gray-600">
                Ready to transform your business with a stunning website?
              </p>
            </div>

            {/* Quick Contact Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your phone number"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                What are our benefits
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We deliver cutting-edge websites that help your business grow and succeed online
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  icon: Globe, 
                  title: "Cutting edge websites", 
                  desc: "Built with the latest web technologies and design trends for maximum impact and performance."
                },
                { 
                  icon: Smartphone, 
                  title: "Mobile-First Design", 
                  desc: "Perfect responsive design that looks amazing on every device and screen size."
                },
                { 
                  icon: TrendingUp, 
                  title: "SEO Optimized", 
                  desc: "Built-in SEO optimization to help you rank higher on Google and attract more customers."
                },
                { 
                  icon: Zap, 
                  title: "Lightning Fast", 
                  desc: "Optimized for speed with loading times under 2 seconds for better user experience."
                },
                { 
                  icon: Shield, 
                  title: "Bank-Level Security", 
                  desc: "Advanced security features and SSL certificates to protect your business and customers."
                },
                { 
                  icon: Users, 
                  title: "Content Support", 
                  desc: "Professional support for updates and changes as needed to keep your site current."
                }
              ].map((feature, index) => (
                <div key={index} className="group bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Support - Modern Two-Column Layout */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Empowering <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Communities</span> to Thrive
              </h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                We believe every business deserves success online. That's why we're investing in communities 
                across California with our exclusive support program.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              {[
                { title: "New Entrepreneurs", desc: "Launch with professional foundation" },
                { title: "Growing Businesses", desc: "Scale your digital presence" },
                { title: "Community Organizations", desc: "Amplify your mission online" },
                { title: "Local Service Providers", desc: "Compete with big corporations" }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-2xl border-l-4 border-orange-500">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-lg text-slate-700 mb-6">
                Every free website we create helps a business owner support their family, hire employees, 
                and strengthen their local community. We're not just building websites—we're building dreams.
              </p>
              <div className="bg-orange-100 border border-orange-200 rounded-xl p-4">
                <p className="text-lg font-semibold text-orange-800 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Only 50 businesses selected each month - Apply now!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison - Updated Title */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Industry Standard vs. <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Our Free Service</span>
              </h2>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-2xl border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="py-6 text-xl font-bold text-gray-900">Service</th>
                      <th className="py-6 text-xl font-bold text-center text-gray-900">Industry Standard</th>
                      <th className="py-6 text-xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">CloudMor</th>
                    </tr>
                  </thead>
                  <tbody className="text-lg">
                    {[
                      ["Professional Design", "$3,000"],
                      ["Custom Logo Design", "$500"],
                      ["Mobile Optimization", "$800"],
                      ["SEO Setup", "$1,200"],
                      ["Security Features", "$500"],
                      ["Content Management", "$800"]
                    ].map(([service, price], index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-4 text-gray-700">{service}</td>
                        <td className="py-4 text-center text-red-600 font-semibold">{price}</td>
                        <td className="py-4 text-center text-green-600 font-bold text-xl">FREE</td>
                      </tr>
                    ))}
                    <tr className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
                      <td className="py-6 text-xl font-bold text-gray-900">TOTAL VALUE</td>
                      <td className="py-6 text-center text-2xl font-bold text-red-600">$6,800+</td>
                      <td className="py-6 text-center text-3xl font-bold text-green-600">$0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline - Modern Step Design */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                From Application to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Launch in 14 Days</span>
              </h2>
            </div>

            <div className="space-y-8">
              {[
                { step: 1, title: "Submit Application", desc: "Tell us about your business and vision", days: "Day 1" },
                { step: 2, title: "24-Hour Review", desc: "Our team reviews and confirms selection", days: "Day 1-2" },
                { step: 3, title: "Design Planning", desc: "Custom design based on your brand", days: "Day 2-3" },
                { step: 4, title: "Content Creation", desc: "Professional copywriting included", days: "Day 4-7" },
                { step: 5, title: "Development", desc: "Building your custom website", days: "Day 8-12" },
                { step: 6, title: "Launch", desc: "Final testing and go-live", days: "Day 13-14" }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">{item.step}</span>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                      <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{item.days}</span>
                    </div>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Apply for Your <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">FREE $6,300 Website</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Tell us about your business so our team can understand your needs. Every application 
                is personally reviewed by our community support team.
              </p>
            </div>

            <WebApplicationForm />

            <div className="text-center mt-8">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 rounded-2xl p-6">
                <p className="text-lg font-semibold text-orange-800 flex items-center justify-center">
                  <Clock className="h-6 w-6 mr-2" />
                  Limited Time: Only 50 spots available each month
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Modern Card Grid */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Success Stories from <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Real Businesses</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  quote: "CloudMor transformed our small bakery into a thriving online business. Our sales increased 300% in just 3 months!",
                  author: "Maria Rodriguez",
                  business: "Sweet Dreams Bakery, Los Angeles"
                },
                {
                  quote: "I couldn't believe they built our entire website for free. The quality is better than what we paid $5,000 for before.",
                  author: "David Chen",
                  business: "Chen's Auto Repair, San Francisco"
                },
                {
                  quote: "The team at CloudMor didn't just build us a website—they gave us a complete business solution.",
                  author: "Sarah Johnson",
                  business: "Johnson Consulting, San Diego"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-slate-700 mb-6 text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <footer className="border-t border-slate-100 pt-4">
                    <div className="font-semibold text-slate-900">{testimonial.author}</div>
                    <div className="text-slate-600 text-sm">{testimonial.business}</div>
                  </footer>
                </div>
              ))}
            </div>

            <div className="text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="flex items-center justify-center space-x-2">
                  <Star className="h-6 w-6 text-yellow-400 fill-current" />
                  <span className="font-semibold text-slate-900">5-Star Reviews</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="font-semibold text-slate-900">BBB A+ Rating</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Users className="h-6 w-6 text-blue-500" />
                  <span className="font-semibold text-slate-900">99.9% Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Updated Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <img 
                src="/lovable-uploads/691e7939-254c-4028-91c9-7c00fd9a8db8.png" 
                alt="CloudMor Logo" 
                className="h-16 mx-auto mb-6"
              />
              <p className="text-xl text-blue-200 mb-4">
                Technology experts from the heart of California
              </p>
              <p className="text-blue-300">
                Made with ❤️ helping businesses from California
              </p>
            </div>
            
            <div className="border-t border-blue-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-blue-300 text-sm mb-4 md:mb-0">
                  &copy; {new Date().getFullYear()} CloudMor. All rights reserved.
                </p>
                <div className="flex space-x-6">
                  <a href="/privacy-policy" className="text-blue-300 hover:text-white text-sm transition-colors">
                    Privacy Policy
                  </a>
                  <a href="/contact" className="text-blue-300 hover:text-white text-sm transition-colors">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WebLanding;

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { CheckCircle, Star, Users, Clock, Shield, Smartphone, TrendingUp, Zap, ArrowRight, Play, MapPin, Phone, Mail } from 'lucide-react';
import WebApplicationForm from '@/components/WebApplicationForm';
import Footer from '@/components/Footer';

const WebLanding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const websiteShowcase = [
    {
      name: "IT Services & Development",
      image: "/lovable-uploads/456f6b18-a26b-4d1c-8b81-c7b162c2f167.png"
    }, {
      name: "Healthcare & Medical",
      image: "/lovable-uploads/41e70552-cf4f-4074-b3d0-dd02c146962f.png"
    }, {
      name: "Technology Solutions",
      image: "/lovable-uploads/e3c1f94a-bff4-49f3-8000-6fe0f80f5a61.png"
    }, {
      name: "Transportation Services",
      image: "/lovable-uploads/3b4cdc1a-9058-4f24-a018-ae75a5a4d8bf.png"
    }, {
      name: "Software Development",
      image: "/lovable-uploads/c3b6701b-bb4c-4250-9533-f896f4d0c424.png"
    }, {
      name: "Healthcare Services",
      image: "/lovable-uploads/36b35cef-110d-4025-b2c7-f8219ef17bb4.png"
    }, {
      name: "Real Estate",
      image: "/lovable-uploads/94922800-f71e-41a6-a160-922825f92499.png"
    }, {
      name: "HR & Recruitment",
      image: "/lovable-uploads/1ed34d30-a7db-45b5-a053-691203089abe.png"
    }, {
      name: "Business Consulting",
      image: "/lovable-uploads/ca9c6590-6839-4e4f-b1fc-ba0d637c2506.png"
    }, {
      name: "Property Management",
      image: "/lovable-uploads/9d1728c1-5d1f-48ff-a52f-48a80ffca7ea.png"
    }
  ];

  const testimonials = [
    {
      quote: "CloudMor transformed our small bakery into a thriving online business. Our sales increased 300% in just 3 months!",
      author: "Maria Rodriguez",
      business: "Sweet Dreams Bakery, Los Angeles"
    }, {
      quote: "I couldn't believe they built our entire website for free. The quality is better than what we paid $5,000 for before.",
      author: "David Chen",
      business: "Chen's Auto Repair, San Francisco"
    }, {
      quote: "The team at CloudMor didn't just build us a website—they gave us a complete business solution.",
      author: "Sarah Johnson",
      business: "Johnson Consulting, San Diego"
    }, {
      quote: "Our restaurant bookings doubled after getting our new website. The mobile design is absolutely perfect!",
      author: "Antonio Martinez",
      business: "Casa Bella Restaurant, Sacramento"
    }, {
      quote: "CloudMor's team understood our vision perfectly. They delivered exactly what we needed for our law firm.",
      author: "Jennifer Walsh",
      business: "Walsh & Associates Law, Oakland"
    }, {
      quote: "The SEO optimization they included helped us rank #1 on Google for our main keywords within 2 months.",
      author: "Michael Thompson",
      business: "Thompson Plumbing Services, Fresno"
    }, {
      quote: "As a startup, getting a professional website for free was a game-changer. We look like a million-dollar company now!",
      author: "Lisa Chang",
      business: "InnovateTech Solutions, Palo Alto"
    }, {
      quote: "The customer support is incredible. They helped us update our content and made changes whenever we needed them.",
      author: "Robert Garcia",
      business: "Garcia Construction, San Jose"
    }, {
      quote: "Our online sales went from zero to $10,000 per month after launching our new website. Absolutely amazing!",
      author: "Emma Wilson",
      business: "Wilson Handmade Crafts, Santa Barbara"
    }, {
      quote: "CloudMor delivered everything they promised and more. The security features give us complete peace of mind.",
      author: "Dr. James Park",
      business: "Park Family Dental, Riverside"
    }, {
      quote: "The design is stunning and loads incredibly fast. Our bounce rate dropped by 60% after the new site launch.",
      author: "Nicole Adams",
      business: "Adams Real Estate Group, Long Beach"
    }, {
      quote: "Getting our veterinary clinic online was seamless. The appointment booking system works perfectly!",
      author: "Dr. Amanda Foster",
      business: "Foster Animal Hospital, Modesto"
    }, {
      quote: "CloudMor's team made the entire process stress-free. From concept to launch, everything was handled professionally.",
      author: "Carlos Mendoza",
      business: "Mendoza Landscaping, Bakersfield"
    }
  ];

  const scrollToForm = () => {
    const formElement = document.getElementById('application');
    if (formElement) {
      formElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % websiteShowcase.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(testimonialInterval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>FREE $6,800 Professional Website - CloudMor | web.cloudmor.com</title>
        <meta name="description" content="Get a $6,800 professional website absolutely FREE for selected California businesses. Fast, mobile-optimized, SEO-ready websites delivered in 2 weeks." />
        <meta name="keywords" content="free website, professional website design, California business, CloudMor, web design" />
      </Helmet>

      {/* Modern Header */}
      <header className="w-full fixed top-0 left-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-center">
            <img 
              src="/lovable-uploads/691e7939-254c-4028-91c9-7c00fd9a8db8.png" 
              alt="CloudMor Logo" 
              className="h-16 w-auto" 
            />
          </div>
        </div>
      </header>

      {/* Hero Section - Clean and Modern */}
      <section className="relative bg-white pt-28 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Limited Time Offer - 50 Free Websites Available
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Get Your Professional Website
              <span className="block text-blue-600">100% FREE</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              We're building professional websites for California businesses at no cost. 
              Complete with everything you need to succeed online.
            </p>

            {/* Value Proposition Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">$6,800</div>
                <div className="text-gray-600 text-sm">Total Value</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">$0</div>
                <div className="text-gray-600 text-sm">Your Cost</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">14</div>
                <div className="text-gray-600 text-sm">Days to Launch</div>
              </div>
            </div>

            {/* Primary CTA */}
            <button 
              onClick={scrollToForm} 
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg mb-12"
            >
              Get My FREE Website Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>

            {/* Website Showcase */}
            <div className="relative max-w-4xl mx-auto">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gray-100">
                <div className="relative h-80 md:h-96 overflow-hidden">
                  <img 
                    src={websiteShowcase[currentSlide].image} 
                    alt={websiteShowcase[currentSlide].name} 
                    className="w-full h-full object-cover object-top transition-all duration-700" 
                  />
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                    <span className="font-medium text-sm">{websiteShowcase[currentSlide].name}</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4 space-x-2">
                  {websiteShowcase.map((_, index) => (
                    <div 
                      key={index} 
                      className={`w-2 h-2 rounded-full transition-all duration-500 cursor-pointer ${
                        index === currentSlide ? 'bg-blue-500 scale-150' : 'bg-white/50 hover:bg-white/80'
                      }`} 
                      onClick={() => setCurrentSlide(index)} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything You Need to Succeed Online
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your complete professional website package includes all the features modern businesses need.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Smartphone,
                  title: "Mobile-Perfect Design",
                  desc: "Looks stunning on every device"
                },
                {
                  icon: TrendingUp,
                  title: "SEO Optimized",
                  desc: "Built to rank on Google"
                },
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  desc: "Loads in under 2 seconds"
                },
                {
                  icon: Shield,
                  title: "Bank-Level Security",
                  desc: "Advanced protection included"
                },
                {
                  icon: Star,
                  title: "Professional Design",
                  desc: "Custom design for your brand"
                },
                {
                  icon: Users,
                  title: "Ongoing Support",
                  desc: "Help when you need it"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Real Results from Real Businesses
              </h2>
              <p className="text-xl text-gray-600">See how we've helped businesses like yours succeed online</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {testimonials.slice(currentTestimonial, currentTestimonial + 6).map((testimonial, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-2xl">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <footer>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm">{testimonial.business}</div>
                  </footer>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value Section - Modern Cards */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                What You're Getting: <span className="text-green-400">$6,800 Value</span>
              </h2>
              <p className="text-xl text-gray-300">
                See exactly what's included in your free professional website
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                { service: "Professional Website Design", price: "$3,000", icon: "🎨" },
                { service: "Custom Logo Design", price: "$400", icon: "🎯" },
                { service: "Content Management", price: "$200", icon: "📝" },
                { service: "Blog or News Section", price: "$150", icon: "📰" },
                { service: "Mobile Optimization", price: "$100", icon: "📱" },
                { service: "Speed Optimization", price: "$100", icon: "⚡" },
                { service: "Accessibility Compliance", price: "$200", icon: "♿" },
                { service: "SEO & Analytics Setup", price: "$900", icon: "📊" },
                { service: "Social Media Integration", price: "$200", icon: "🔗" },
                { service: "Advanced Security & Threat Protection", price: "$100", icon: "🔒" },
                { service: "Privacy Policy & Cookie Consent", price: "$200", icon: "📋" },
                { service: "Backup & Restore Setup", price: "$150", icon: "💾" }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="text-white font-medium mb-2 leading-tight">{item.service}</h3>
                  <div className="text-right">
                    <span className="text-green-400 font-bold text-lg">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-8 text-center">
                <div className="text-3xl mb-4">💰</div>
                <h3 className="text-xl font-bold mb-2">TOTAL VALUE</h3>
                <div className="text-4xl font-bold">$6,800</div>
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8 text-center">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2">YOUR INVESTMENT</h3>
                <div className="text-4xl font-bold">FREE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                From Application to Launch in 14 Days
              </h2>
              <p className="text-xl text-gray-600">
                Our proven process ensures you get a professional website quickly
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: 1,
                  title: "Apply Today",
                  desc: "Fill out our simple application form",
                  days: "Day 1"
                },
                {
                  step: 2,
                  title: "Get Approved",
                  desc: "We review and confirm your selection",
                  days: "Day 1-2"
                },
                {
                  step: 3,
                  title: "We Build",
                  desc: "Our team creates your custom website",
                  days: "Day 3-12"
                },
                {
                  step: 4,
                  title: "You Launch",
                  desc: "Final review and your site goes live",
                  days: "Day 13-14"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white font-bold text-lg">{item.step}</span>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="text-xs font-medium text-blue-600 mb-2 bg-blue-100 px-3 py-1 rounded-full inline-block">
                      {item.days}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                🚀 Get Your <span className="text-blue-600">FREE $6,800 Website</span> – Apply Now!
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
                We review all submissions within 24 hours. If you're selected, we'll assign a Team lead to coordinate and start building your website — completely free.
              </p>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-8 inline-block">
                <p className="text-orange-800 font-medium flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  ⚡ Spots Are Limited – Submit Your Request Today!
                </p>
              </div>
            </div>

            <WebApplicationForm />

            <div className="text-center mt-8">
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-orange-800 flex items-center justify-center">
                  <Clock className="h-4 w-4 mr-2" />
                  ⚡ We're Giving Away 50 FREE Websites This Month – Secure Yours Before They're All Taken!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why California Businesses Choose CloudMor
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Local Expertise",
                  desc: "We understand California businesses and markets",
                  icon: "🌟"
                },
                {
                  title: "Proven Results",
                  desc: "Hundreds of successful websites launched",
                  icon: "📈"
                },
                {
                  title: "No Hidden Costs",
                  desc: "Completely free with no surprise fees",
                  icon: "💰"
                },
                {
                  title: "Fast Delivery",
                  desc: "Professional website in just 14 days",
                  icon: "⚡"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm text-center">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div>
                <div className="mb-8">
                  <img 
                    src="/lovable-uploads/691e7939-254c-4028-91c9-7c00fd9a8db8.png" 
                    alt="CloudMor Logo" 
                    className="h-20 mb-4" 
                  />
                  <p className="text-lg text-gray-300 mb-4">
                    Technology experts from the heart of California
                  </p>
                  <p className="text-gray-400">
                    Helping businesses succeed online with professional web solutions
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">1390 Market Street, Suite 200</p>
                      <p className="text-gray-300">San Francisco, CA 94102</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <a href="tel:8885546597" className="text-white hover:text-blue-400 transition-colors font-medium">
                        (888) 554-6597
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <a href="mailto:hello@cloudmor.com" className="text-white hover:text-blue-400 transition-colors font-medium">
                        hello@cloudmor.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-6">Our Location</h3>
                <div className="bg-white/10 border border-white/20 rounded-xl p-6">
                  <div className="relative w-full h-64 mb-4 overflow-hidden rounded-lg">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.025804193596!2d-122.41853868468208!3d37.775826679758516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2s1390%20Market%20St%2C%20San%20Francisco%2C%20CA%2094102!5e0!3m2!1sen!2sus!4v1635789234567!5m2!1sen!2sus" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade" 
                      className="rounded-lg"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold">San Francisco, California</p>
                    <p className="text-gray-300 text-sm">Serving businesses across California</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm mb-4 md:mb-0">
                  &copy; {new Date().getFullYear()} CloudMor. All rights reserved.
                </p>
                <div className="flex space-x-6">
                  <a href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Privacy Policy
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

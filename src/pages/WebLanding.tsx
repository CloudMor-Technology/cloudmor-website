import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { CheckCircle, Star, Users, Clock, Shield, Smartphone, TrendingUp, Zap, ArrowRight, Play, MapPin, Phone, Mail } from 'lucide-react';
import WebApplicationForm from '@/components/WebApplicationForm';
import Footer from '@/components/Footer';
const WebLanding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const websiteShowcase = [{
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
  }];
  const testimonials = [{
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
  }];
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
  return <div className="min-h-screen bg-white">
      <Helmet>
        <title>FREE $6,800 Professional Website - CloudMor | web.cloudmor.com</title>
        <meta name="description" content="Get a $6,800 professional website absolutely FREE for selected California businesses. Fast, mobile-optimized, SEO-ready websites delivered in 2 weeks." />
        <meta name="keywords" content="free website, professional website design, California business, CloudMor, web design" />
      </Helmet>

      {/* Updated Header - Logo Only, Centered and Larger */}
      <header className="w-full fixed top-0 left-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-100">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-center">
            {/* Even Larger Centered Logo */}
            <div className="flex items-center">
              <img src="/lovable-uploads/691e7939-254c-4028-91c9-7c00fd9a8db8.png" alt="CloudMor Logo" className="h-40 w-auto" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Updated slide container size */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden pt-52">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:50px_50px]"></div>
        
        <div className="relative container mx-auto px-6 lg:py-24 py-[30px]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 py-0">
              
              <h1 className="text-4xl md:text-5xl mb-6 leading-tight font-bold lg:text-6xl">
                Get Your Professional Website
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">100% FREE</span>
              </h1>
              
              <p className="text-xl mb-6 text-slate-200 max-w-3xl mx-auto leading-relaxed">
                We're building professional websites for California businesses at no cost. 
                Complete with everything you need to succeed online.
              </p>
              
              <p className="text-lg mb-8 max-w-2xl mx-auto text-blue-200">
                Delivered in just 14 days.
              </p>

              {/* Value Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
                <div className="text-center p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-green-400 mb-1">$6,800</div>
                  <div className="text-green-200 text-sm">Total Value</div>
                </div>
                <div className="text-center p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-blue-400 mb-1">$0</div>
                  <div className="text-blue-200 text-sm">Your Cost</div>
                </div>
                <div className="text-center p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-orange-400 mb-1">14</div>
                  <div className="text-orange-200 text-sm">Days to Launch</div>
                </div>
              </div>

              {/* Enhanced Primary CTA with Flashing Effect */}
              <button onClick={scrollToForm} className="inline-flex items-center space-x-3 text-white text-lg font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl relative overflow-hidden" style={{
              background: 'linear-gradient(45deg, #ff6b35, #f7931e, #ff8c00, #ff6b35)',
              backgroundSize: '400% 400%',
              animation: 'gradient-flash 2s ease-in-out infinite, pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}>
                <span>🎯 Get My FREE Website Now</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* Website Showcase - Larger to show headers */}
            <div className="relative max-w-6xl mx-auto">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <div className="relative h-96 md:h-[600px] overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border-8 border-slate-700">
                  <img src={websiteShowcase[currentSlide].image} alt={websiteShowcase[currentSlide].name} className="w-full h-full transition-all duration-700 object-cover object-top" />
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                    <span className="font-semibold text-sm">{websiteShowcase[currentSlide].name}</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4 space-x-2">
                  {websiteShowcase.map((_, index) => <div key={index} className={`w-2 h-2 rounded-full transition-all duration-500 cursor-pointer ${index === currentSlide ? 'bg-blue-400 scale-150' : 'bg-white/50 hover:bg-white/80'}`} onClick={() => setCurrentSlide(index)} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add CSS for gradient flash animation in the head */}
      <style>
        {`
          @keyframes gradient-flash {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}
      </style>

      {/* What's Included - Value Proposition */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Everything You Need to <span className="text-blue-600">Succeed Online</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Your complete professional website package includes all the features and tools 
                modern businesses need to attract customers and grow online.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[{
              icon: Smartphone,
              title: "Mobile-Perfect Design",
              desc: "Looks stunning on every device"
            }, {
              icon: TrendingUp,
              title: "SEO Optimized",
              desc: "Built to rank on Google"
            }, {
              icon: Zap,
              title: "Lightning Fast",
              desc: "Loads in under 2 seconds"
            }, {
              icon: Shield,
              title: "Bank-Level Security",
              desc: "Advanced protection included"
            }, {
              icon: Star,
              title: "Professional Design",
              desc: "Custom design for your brand"
            }, {
              icon: Users,
              title: "Ongoing Support",
              desc: "Help with updates when needed"
            }].map((feature, index) => <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                <span className="text-blue-600">Real Results</span> from Real Businesses
              </h2>
              <p className="text-lg text-slate-600">See how we've helped businesses like yours succeed online</p>
            </div>

            {/* Two rows of testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {testimonials.slice(currentTestimonial, currentTestimonial + 3).map((testimonial, index) => <div key={index} className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />)}
                  </div>
                  <blockquote className="text-slate-700 mb-4 text-sm leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <footer className="border-t border-slate-200 pt-3">
                    <div className="font-semibold text-slate-900 text-sm">{testimonial.author}</div>
                    <div className="text-slate-600 text-xs">{testimonial.business}</div>
                  </footer>
                </div>)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.slice(currentTestimonial + 3, currentTestimonial + 6).map((testimonial, index) => <div key={index + 3} className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />)}
                  </div>
                  <blockquote className="text-slate-700 mb-4 text-sm leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <footer className="border-t border-slate-200 pt-3">
                    <div className="font-semibold text-slate-900 text-sm">{testimonial.author}</div>
                    <div className="text-slate-600 text-xs">{testimonial.business}</div>
                  </footer>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Value Breakdown - Cleaner pricing table */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What You're Getting: <span className="text-green-400">$6,800 Value</span>
              </h2>
              <p className="text-lg text-slate-300">
                See exactly what's included in your free professional website
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-blue-600 p-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <h3 className="font-bold text-white">Professional Service</h3>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Market Value</h3>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="divide-y divide-white/10">
                {[["Professional Website Design", "$3,000"], ["Custom Logo Design", "$400"], ["Content Management", "$200"], ["Blog or News Section", "$150"], ["Mobile Optimization", "$100"], ["Speed Optimization", "$100"], ["Accessibility Compliance", "$200"], ["SEO & Analytics Setup", "$900"], ["Social Media Integration", "$200"], ["Advanced Security & Threat Protection", "$100"], ["Privacy Policy & Cookie Consent", "$200"], ["Backup & Restore Setup", "$150"]].map(([service, price], index) => <div key={index} className="grid grid-cols-2 gap-4 p-4 hover:bg-white/5 transition-colors">
                    <div className="text-white flex items-center text-sm">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      {service}
                    </div>
                    <div className="text-center">
                      <span className="text-green-400 font-bold text-sm">{price}</span>
                    </div>
                  </div>)}
              </div>

              {/* Total */}
              <div className="bg-green-600 grid grid-cols-2 gap-4 p-6">
                <div className="text-lg font-bold text-white">
                  💰 TOTAL VALUE
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-white">$6,800</span>
                </div>
              </div>

              {/* Your Investment */}
              <div className="bg-blue-600 grid grid-cols-2 gap-4 p-6">
                <div className="text-lg font-bold text-white">
                  🎯 YOUR INVESTMENT
                </div>
                <div className="text-center">
                  <span className="text-3xl font-bold text-white">FREE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Process */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                From Application to <span className="text-blue-600">Launch in 14 Days</span>
              </h2>
              <p className="text-lg text-slate-600">
                Our proven process ensures you get a professional website quickly and efficiently
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[{
              step: 1,
              title: "Apply Today",
              desc: "Fill out our simple application form",
              days: "Day 1"
            }, {
              step: 2,
              title: "Get Approved",
              desc: "We review and confirm your selection",
              days: "Day 1-2"
            }, {
              step: 3,
              title: "We Build",
              desc: "Our team creates your custom website",
              days: "Day 3-12"
            }, {
              step: 4,
              title: "You Launch",
              desc: "Final review and your site goes live",
              days: "Day 13-14"
            }].map((item, index) => <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white font-bold text-lg">{item.step}</span>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 h-40 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-semibold text-blue-600 mb-2 bg-blue-100 px-2 py-1 rounded-full">{item.days}</div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    </div>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Apply if you are Ready to Get Your <span className="text-blue-600">FREE $6,800 Website?</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Tell us about your business and we'll create a professional website that helps you succeed online.
              </p>
            </div>

            <WebApplicationForm />

            <div className="text-center mt-6">
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-orange-800 flex items-center justify-center">
                  <Clock className="h-4 w-4 mr-2" />
                  ⚡ Only 50 websites available this month - Apply now before spots fill up!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Trust Building */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why California Businesses <span className="text-blue-600">Choose CloudMor</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[{
              title: "Local Expertise",
              desc: "We understand California businesses and markets",
              icon: "🌟"
            }, {
              title: "Proven Results",
              desc: "Hundreds of successful websites launched",
              icon: "📈"
            }, {
              title: "No Hidden Costs",
              desc: "Completely free with no surprise fees",
              icon: "💰"
            }, {
              title: "Fast Delivery",
              desc: "Professional website in just 14 days",
              icon: "⚡"
            }].map((item, index) => <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 text-center hover:shadow-xl transition-shadow">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer with Professional Contact Information */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Company Info */}
              <div>
                <div className="mb-6">
                  <img src="/lovable-uploads/691e7939-254c-4028-91c9-7c00fd9a8db8.png" alt="CloudMor Logo" className="h-32 mb-4" />
                  <p className="text-lg text-slate-300 mb-3">
                    Technology experts from the heart of California
                  </p>
                  <p className="text-slate-400">
                    Helping businesses succeed online with professional web solutions
                  </p>
                </div>

                {/* Contact Information */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">1390 Market Street, Suite 200</p>
                      <p className="text-slate-300">San Francisco, CA 94102</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <a href="tel:8885546597" className="text-white hover:text-blue-400 transition-colors font-semibold">
                        (888) 554-6597
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <a href="mailto:hello@cloudmor.com" className="text-white hover:text-blue-400 transition-colors font-semibold">
                        hello@cloudmor.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real Google Map */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Our Location</h3>
                <div className="bg-white/10 border border-white/20 rounded-xl p-4 backdrop-blur-sm">
                  <div className="relative w-full h-64 mb-4 overflow-hidden rounded-lg">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.025804193596!2d-122.41853868468208!3d37.775826679758516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2s1390%20Market%20St%2C%20San%20Francisco%2C%20CA%2094102!5e0!3m2!1sen!2sus!4v1635789234567!5m2!1sen!2sus" width="100%" height="100%" style={{
                    border: 0
                  }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg"></iframe>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-white font-bold">San Francisco, California</p>
                    <p className="text-slate-300 text-sm">Serving businesses across California</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-slate-700 pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-slate-400 text-sm mb-2 md:mb-0">
                  &copy; {new Date().getFullYear()} CloudMor. All rights reserved.
                </p>
                <div className="flex space-x-4">
                  <a href="/privacy-policy" className="text-slate-400 hover:text-white text-sm transition-colors">
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default WebLanding;

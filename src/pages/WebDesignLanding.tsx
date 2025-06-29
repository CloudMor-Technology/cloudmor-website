
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { CheckCircle, Star, Users, Clock, Shield, Smartphone, TrendingUp, Zap, ArrowRight, Play, MapPin, Phone, Mail, Award, Target, Rocket, Eye, Heart, DollarSign, Menu, X, User, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WebDesignLanding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  }];

  const testimonials = [{
    quote: "CloudMor transformed our small bakery into a thriving online business. Our sales increased 300% in just 3 months!",
    author: "Maria Rodriguez",
    business: "Sweet Dreams Bakery, Los Angeles",
    result: "+300% Sales",
    avatar: "💃"
  }, {
    quote: "I couldn't believe they built our entire website for free. The quality is better than what we paid $5,000 for before.",
    author: "David Chen",
    business: "Chen's Auto Repair, San Francisco",
    result: "$5,000 Saved",
    avatar: "👨‍🔧"
  }, {
    quote: "The team at CloudMor didn't just build us a website—they gave us a complete business solution.",
    author: "Sarah Johnson",
    business: "Johnson Consulting, San Diego",
    result: "Complete Solution",
    avatar: "👩‍💼"
  }];

  const socialProof = [{
    metric: "3451+",
    label: "Websites Built",
    icon: "🚀"
  }, {
    metric: "98%",
    label: "Client Satisfaction",
    icon: "❤️"
  }, {
    metric: "2.1M+",
    label: "Visitors Generated",
    icon: "👀"
  }, {
    metric: "14 Days",
    label: "Average Launch Time",
    icon: "⚡"
  }];

  const scrollToForm = () => {
    const formElement = document.getElementById('web-design-form');
    if (formElement) {
      formElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
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
        <title>Professional Web Design Services - CloudMor | Free Website Development</title>
        <meta name="description" content="Get professional web design services from CloudMor. Custom websites, responsive design, SEO optimization, and complete digital solutions for your business." />
        <meta name="keywords" content="web design, website development, professional websites, CloudMor, responsive design, SEO" />
      </Helmet>

      {/* Navigation Header */}
      <header className="w-full fixed top-0 left-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <img src="/lovable-uploads/691e7939-254c-4028-91c9-7c00fd9a8db8.png" alt="CloudMor Logo" className="h-24 w-auto" />
            
            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center justify-center flex-1 space-x-8">
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-gowith-dark-blue hover:text-gowith-medium-blue transition-colors font-medium"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('reviews')}
                className="text-gowith-dark-blue hover:text-gowith-medium-blue transition-colors font-medium"
              >
                Reviews
              </button>
              <a 
                href="https://cloudmor.atlassian.net/servicedesk/customer/portal/4/user/login?destination=portal%2F4%2Fgroup%2F13%2Fcreate%2F10021"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gowith-dark-blue hover:text-gowith-medium-blue transition-colors font-medium flex items-center gap-1"
              >
                Support
                <ExternalLink className="h-4 w-4" />
              </a>
            </nav>

            {/* Right Side Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                className="bg-[#007bff] hover:bg-[#0056b3] text-white font-medium transition-colors"
              >
                <a 
                  href="https://cloudmor.atlassian.net/servicedesk/customer/portal/4/user/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <User size={18} />
                  Client Portal
                </a>
              </Button>
              
              <Button 
                onClick={scrollToForm}
                className="bg-gowith-orange hover:bg-gowith-orange-hover text-white font-bold transition-colors"
              >
                Apply Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gowith-dark-blue" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4 mt-4">
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-gowith-dark-blue hover:text-gowith-medium-blue transition-colors font-medium text-left"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => scrollToSection('reviews')}
                  className="text-gowith-dark-blue hover:text-gowith-medium-blue transition-colors font-medium text-left"
                >
                  Reviews
                </button>
                <a 
                  href="https://cloudmor.atlassian.net/servicedesk/customer/portal/4/user/login?destination=portal%2F4%2Fgroup%2F13%2Fcreate%2F10021"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gowith-dark-blue hover:text-gowith-medium-blue transition-colors font-medium text-left flex items-center gap-1"
                >
                  Support
                  <ExternalLink className="h-4 w-4" />
                </a>
                <Button 
                  className="bg-[#007bff] hover:bg-[#0056b3] text-white font-medium transition-colors w-full"
                >
                  <a 
                    href="https://cloudmor.atlassian.net/servicedesk/customer/portal/4/user/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <User size={18} />
                    Client Portal
                  </a>
                </Button>
                <Button 
                  onClick={scrollToForm}
                  className="bg-gowith-orange hover:bg-gowith-orange-hover text-white font-bold transition-colors w-full"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section - Simplified Colors */}
      <section className="relative bg-gradient-to-br from-gowith-dark-blue to-gowith-medium-blue pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center py-20">
            <div className="inline-flex items-center bg-gowith-orange text-white px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg">
              <Zap className="w-4 h-4 mr-2" />
              Professional Web Design Services Available Now!
            </div>
            
            <h1 className="text-5xl font-black text-white mb-6 leading-tight md:text-6xl">
              PROFESSIONAL
              <span className="block text-gowith-orange">
                WEB DESIGN
              </span>
              <span className="block text-white">SERVICES</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Custom websites that drive results. From concept to launch, we create digital experiences that <span className="font-bold text-white">convert visitors into customers</span>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-black text-white mb-2">100%</div>
                <div className="text-white text-sm font-medium">Custom Design</div>
                <Heart className="w-6 h-6 text-white mx-auto mt-2" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-black text-white mb-2">24/7</div>
                <div className="text-white text-sm font-medium">Support</div>
                <Shield className="w-6 h-6 text-white mx-auto mt-2" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-black text-white mb-2">SEO</div>
                <div className="text-white text-sm font-medium">Optimized</div>
                <TrendingUp className="w-6 h-6 text-white mx-auto mt-2" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-black text-white mb-2">Mobile</div>
                <div className="text-white text-sm font-medium">Responsive</div>
                <Smartphone className="w-6 h-6 text-white mx-auto mt-2" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button onClick={scrollToForm} className="group relative inline-flex items-center bg-gowith-orange hover:bg-gowith-orange-hover text-white text-xl font-black px-10 py-5 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-2xl">
                <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                GET STARTED TODAY!
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            <div className="relative max-w-5xl mx-auto">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gray-100 border-4 border-white/50">
                <div className="relative h-80 md:h-[500px] overflow-hidden">
                  <img src={websiteShowcase[currentSlide].image} alt={websiteShowcase[currentSlide].name} className="w-full h-full object-cover object-top transition-all duration-1000 transform hover:scale-105" />
                  <div className="absolute bottom-6 left-6 bg-black/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl shadow-lg">
                    <span className="font-bold text-lg">{websiteShowcase[currentSlide].name}</span>
                    <div className="text-gowith-orange text-sm font-medium">✓ Professional Design</div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-6 space-x-3">
                  {websiteShowcase.map((_, index) => (
                    <div 
                      key={index} 
                      className={`w-3 h-3 rounded-full transition-all duration-500 cursor-pointer ${
                        index === currentSlide ? 'bg-white scale-150 shadow-lg' : 'bg-white/50 hover:bg-white/80'
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

      {/* Social Proof Section - Simplified */}
      <section className="py-16 bg-gowith-dark-blue text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Trusted by <span className="text-gowith-orange">500+ California Businesses</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {socialProof.map((item, index) => (
                <div key={index} className="text-center group hover:scale-110 transition-transform duration-300">
                  <div className="text-5xl mb-2">{item.icon}</div>
                  <div className="text-4xl font-black text-gowith-orange mb-2">{item.metric}</div>
                  <div className="text-gray-300 font-medium">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Simplified Colors */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gowith-dark-blue mb-6">
                How It Works: <span className="text-gowith-medium-blue">Simple 4-Step Process</span>
              </h2>
              <p className="text-xl text-gray-600">
                From initial consultation to website launch, we make it easy
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[{
                step: 1,
                title: "Consultation",
                desc: "Tell us about your business and vision",
                days: "Day 1",
                color: "from-gowith-medium-blue to-gowith-light-blue"
              }, {
                step: 2,
                title: "Design",
                desc: "We create custom mockups and designs",
                days: "Day 2-5",
                color: "from-gowith-orange to-gowith-orange-hover"
              }, {
                step: 3,
                title: "Development",
                desc: "Professional coding and optimization",
                days: "Day 6-12",
                color: "from-gray-600 to-gray-700"
              }, {
                step: 4,
                title: "Launch",
                desc: "Testing, final review, and go live",
                days: "Day 13-14",
                color: "from-gowith-dark-blue to-gowith-medium-blue"
              }].map((item, index) => (
                <div key={index} className="text-center group">
                  <div className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <span className="text-white font-black text-2xl">{item.step}</span>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className="text-xs font-bold text-gowith-medium-blue mb-2 bg-blue-100 px-4 py-2 rounded-full inline-block">
                      {item.days}
                    </div>
                    <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Simplified Colors */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gowith-dark-blue mb-6">
                Everything You Need to <span className="text-gowith-medium-blue">Succeed Online</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Comprehensive web design services that cover every aspect of your online presence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[{
                icon: Smartphone,
                title: "Mobile-First Design",
                desc: "Responsive design that works perfectly on all devices",
                color: "from-gowith-medium-blue to-gowith-light-blue"
              }, {
                icon: TrendingUp,
                title: "SEO Optimized",
                desc: "Built to rank higher in search results",
                color: "from-gowith-orange to-gowith-orange-hover"
              }, {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Optimized for speed and performance",
                color: "from-gray-600 to-gray-700"
              }, {
                icon: Shield,
                title: "Secure & Reliable",
                desc: "Advanced security and reliable hosting",
                color: "from-gowith-dark-blue to-gowith-medium-blue"
              }, {
                icon: Star,
                title: "Custom Design",
                desc: "Unique designs tailored to your brand",
                color: "from-gowith-orange to-gowith-orange-hover"
              }, {
                icon: Users,
                title: "Ongoing Support",
                desc: "Continuous support and maintenance",
                color: "from-gowith-medium-blue to-gowith-light-blue"
              }].map((feature, index) => (
                <div key={index} className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gowith-dark-blue mb-3">
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

      {/* Reviews Section - Simplified */}
      <section id="reviews" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gowith-dark-blue mb-6">
                What Our Clients Say About <span className="text-gowith-medium-blue">CloudMor</span>
              </h2>
              <p className="text-xl text-gray-600">Real results from real businesses across California</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="group bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="inline-flex items-center bg-gowith-orange/10 text-gowith-orange px-3 py-1 rounded-full text-sm font-bold mb-4">
                    <Award className="w-4 h-4 mr-1" />
                    {testimonial.result}
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-gowith-orange fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-6 leading-relaxed font-medium">
                    "{testimonial.quote}"
                  </blockquote>
                  <footer className="flex items-center">
                    <div className="text-3xl mr-3">{testimonial.avatar}</div>
                    <div>
                      <div className="font-bold text-gowith-dark-blue">{testimonial.author}</div>
                      <div className="text-gray-600 text-sm">{testimonial.business}</div>
                    </div>
                  </footer>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Web Design Form Section - Simplified Colors */}
      <section id="web-design-form" className="py-20 bg-gradient-to-br from-gowith-dark-blue to-gowith-medium-blue text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                START YOUR <span className="text-gowith-orange">WEB DESIGN PROJECT</span>
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Get Your Custom Quote Today!
              </h3>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Tell us about your project and we'll provide a detailed proposal within 24 hours. From simple websites to complex web applications, we've got you covered.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <div className="bg-gowith-orange text-white px-6 py-3 rounded-full font-bold text-lg flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  24-Hour Response
                </div>
                <div className="bg-white/20 text-white px-6 py-3 rounded-full font-bold text-lg flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Free Consultation
                </div>
                <div className="bg-white/20 text-white px-6 py-3 rounded-full font-bold text-lg flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Custom Pricing
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gowith-dark-blue mb-6">Web Design Project Request Form</h3>
                <div className="bg-gray-100 rounded-lg p-6">
                  <iframe
                    src="https://form.jotform.com/243666980284061"
                    width="100%"
                    height="800"
                    frameBorder="0"
                    scrolling="yes"
                    title="Web Design Project Request Form"
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <div className="bg-gowith-orange rounded-2xl p-6 shadow-lg">
                <p className="text-xl font-black text-white flex items-center justify-center">
                  <Clock className="h-6 w-6 mr-3" />
                  Ready to Transform Your Online Presence? Let's Build Something Amazing Together!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gowith-dark-blue text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div>
                <div className="mb-8">
                  <img src="/lovable-uploads/691e7939-254c-4028-91c9-7c00fd9a8db8.png" alt="CloudMor Logo" className="h-20 mb-4" />
                  <p className="text-lg text-gray-300 mb-4">
                    Professional web design and development services
                  </p>
                  <p className="text-gray-400">
                    Creating digital experiences that drive business growth
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gowith-medium-blue rounded-lg flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">1390 Market Street, Suite 200</p>
                      <p className="text-gray-300">San Francisco, CA 94102</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gowith-orange rounded-lg flex items-center justify-center">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <a href="tel:8885546597" className="text-white hover:text-gowith-orange transition-colors font-medium">
                        (888) 554-6597
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gowith-medium-blue rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <a href="mailto:hello@cloudmor.com" className="text-white hover:text-gowith-orange transition-colors font-medium">
                        hello@cloudmor.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-6">Our Services</h3>
                <div className="space-y-3">
                  <p className="text-gray-300">• Custom Web Design</p>
                  <p className="text-gray-300">• Responsive Development</p>
                  <p className="text-gray-300">• E-commerce Solutions</p>
                  <p className="text-gray-300">• SEO Optimization</p>
                  <p className="text-gray-300">• Website Maintenance</p>
                  <p className="text-gray-300">• Digital Marketing</p>
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

export default WebDesignLanding;

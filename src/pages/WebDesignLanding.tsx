import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { CheckCircle, Star, Users, Clock, Shield, Smartphone, TrendingUp, Zap, ArrowRight, Play, MapPin, Phone, Mail, Award, Target, Rocket, Eye, Heart, DollarSign, Menu, X, User, ExternalLink, FileText, Search, Settings, Code, Rocket as RocketIcon, Palette, Brush, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Link } from 'react-router-dom';
import ContactSection from '@/components/ContactSection';

const WebDesignLanding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonialGroup, setCurrentTestimonialGroup] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Add useEffect for Typeform script loading
  useEffect(() => {
    // Load Typeform embed script
    const script = document.createElement('script');
    script.src = '//embed.typeform.com/next/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script on component unmount
      const existingScript = document.querySelector('script[src="//embed.typeform.com/next/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

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

  // 12 diverse testimonials grouped in sets of 3
  const testimonialGroups = [
  // Group 1
  [{
    quote: "Our new website and logo transformed our business image completely. We look professional and trustworthy now!",
    author: "Sarah Chen",
    business: "Chen Marketing Solutions, San Francisco",
    avatar: "👩‍💼"
  }, {
    quote: "The mobile-friendly design brought us younger customers we never reached before. Revenue up 300%!",
    author: "Dr. Michael Rodriguez",
    business: "Rodriguez Medical Center, Los Angeles",
    avatar: "👨‍⚕️"
  }, {
    quote: "Online appointment system eliminated phone tag. Client satisfaction scores hit all-time highs!",
    author: "Amanda Foster",
    business: "Foster's Boutique, Beverly Hills",
    avatar: "👗"
  }],
  // Group 2
  [{
    quote: "Our competitors still look outdated while we appear cutting-edge. We're winning every proposal now!",
    author: "James Liu",
    business: "Liu Construction Group, San Diego",
    avatar: "🏗️"
  }, {
    quote: "24/7 online presence means customers find us even when we're closed. Night inquiries increased 400%!",
    author: "Maria Gonzalez",
    business: "Gonzalez Auto Repair, Fresno",
    avatar: "🔧"
  }, {
    quote: "The professional credibility boost helped us attract Fortune 500 clients. Our biggest year ever!",
    author: "Robert Kim",
    business: "Kim Digital Consulting, Palo Alto",
    avatar: "💼"
  }],
  // Group 3
  [{
    quote: "New customers find us easily through Google search. Our visibility increased by 500% in just 3 months!",
    author: "Dr. Jennifer Park",
    business: "Park Dental Practice, Oakland",
    avatar: "🦷"
  }, {
    quote: "The website perfectly represents our brand. Clients trust us before they even call!",
    author: "Carlos Mendez",
    business: "Mendez Digital Agency, Sacramento",
    avatar: "🎯"
  }, {
    quote: "Customer testimonials on our new site convert visitors instantly. Trust factor went through the roof!",
    author: "Lisa Wang",
    business: "Wang Interior Design, San Jose",
    avatar: "🏡"
  }],
  // Group 4
  [{
    quote: "The contact forms capture leads we used to lose. Follow-up automation does the heavy lifting for us!",
    author: "Anthony Davis",
    business: "Davis Legal Services, Long Beach",
    avatar: "⚖️"
  }, {
    quote: "Our e-commerce integration turned browsers into buyers. Online sales now match our physical store!",
    author: "Rachel Green",
    business: "Green Home Goods, Santa Monica",
    avatar: "🛍️"
  }, {
    quote: "The backup system saved us during a server crash. Zero downtime means zero lost business!",
    author: "Marcus Johnson",
    business: "Johnson IT Support, Modesto",
    avatar: "💻"
  }]];
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
      setCurrentTestimonialGroup(prev => (prev + 1) % testimonialGroups.length);
    }, 3000);
    return () => clearInterval(testimonialInterval);
  }, []);
  return <div className="min-h-screen bg-white">
      <Helmet>
        <title>Professional Web Design Services - CloudMor | Free Website Development</title>
        <meta name="description" content="Get professional web design services from CloudMor. Custom websites, responsive design, SEO optimization, and complete digital solutions for your business." />
        <meta name="keywords" content="web design, website development, professional websites, CloudMor, responsive design, SEO" />
      </Helmet>

      {/* Navigation Header */}
      <header className="w-full fixed top-0 left-0 z-50 bg-slate-900 shadow-sm border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img src="/lovable-uploads/691e7939-254c-4028-91c9-7c00fd9a8db8.png" alt="CloudMor Logo" className="h-24 w-auto" />
            </div>
            
            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 space-x-8">
              <button onClick={() => scrollToSection('how-it-works')} className="text-white hover:text-gray-300 transition-colors font-medium">
                How It Works
              </button>
              <button onClick={() => scrollToSection('reviews')} className="text-white hover:text-gray-300 transition-colors font-medium">
                Reviews
              </button>
              <a href="https://cloudmor.atlassian.net/servicedesk/customer/portal/4/user/login?destination=portal%2F4%2Fgroup%2F13%2Fcreate%2F10021" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors font-medium flex items-center gap-1">
                Support
                <ExternalLink className="h-4 w-4" />
              </a>
            </nav>

            {/* Right Side Buttons */}
            <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
              <Button className="bg-[#007bff] hover:bg-[#0056b3] text-white font-medium transition-colors">
                <a href="https://cloudmor.atlassian.net/servicedesk/customer/portal/4/user/login" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <User size={18} />
                  Client Portal
                </a>
              </Button>
              
              <Button onClick={scrollToForm} className="bg-gowith-orange hover:bg-gowith-orange-hover text-white font-bold transition-colors">
                Apply Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && <div className="md:hidden mt-4 pb-4 border-t border-gray-600">
              <div className="flex flex-col space-y-4 mt-4">
                <button onClick={() => scrollToSection('how-it-works')} className="text-white hover:text-gray-300 transition-colors font-medium text-left">
                  How It Works
                </button>
                <button onClick={() => scrollToSection('reviews')} className="text-white hover:text-gray-300 transition-colors font-medium text-left">
                  Reviews
                </button>
                <a href="https://cloudmor.atlassian.net/servicedesk/customer/portal/4/user/login?destination=portal%2F4%2Fgroup%2F13%2Fcreate%2F10021" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors font-medium text-left flex items-center gap-1">
                  Support
                  <ExternalLink className="h-4 w-4" />
                </a>
                <Button className="bg-[#007bff] hover:bg-[#0056b3] text-white font-medium transition-colors w-full">
                  <a href="https://cloudmor.atlassian.net/servicedesk/customer/portal/4/user/login" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2">
                    <User size={18} />
                    Client Portal
                  </a>
                </Button>
                <Button onClick={scrollToForm} className="bg-gowith-orange hover:bg-gowith-orange-hover text-white font-bold transition-colors w-full">
                  Apply Now
                </Button>
              </div>
            </div>}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gowith-dark-blue to-gowith-medium-blue pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center py-20">
            <div className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg">
              <DollarSign className="w-4 h-4 mr-2" />
              Save $6,800 - Professional Web Design FREE!
            </div>
            
            <h1 className="text-5xl font-black text-white mb-6 leading-tight md:text-6xl">
              PROFESSIONAL
              <span className="block text-gowith-orange">
                WEB DESIGN
              </span>
              <span className="block text-white">SERVICES</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get a <span className="font-bold text-gowith-orange">$6,800 professional website absolutely FREE</span>. Custom designs that drive results and convert visitors into customers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-black text-white mb-2">FREE</div>
                <div className="text-white text-sm font-medium">Custom Design</div>
                <div className="text-gowith-orange text-xs font-bold">Worth $3,000</div>
                <Heart className="w-6 h-6 text-white mx-auto mt-2" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-black text-white mb-2">FREE</div>
                <div className="text-white text-sm font-medium">Development</div>
                <div className="text-gowith-orange text-xs font-bold">Worth $2,500</div>
                <Shield className="w-6 h-6 text-white mx-auto mt-2" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-black text-white mb-2">SEO</div>
                <div className="text-white text-sm font-medium">Optimized</div>
                <div className="text-gowith-orange text-xs font-bold">Worth $900</div>
                <TrendingUp className="w-6 h-6 text-white mx-auto mt-2" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-black text-white mb-2">Mobile</div>
                <div className="text-white text-sm font-medium">Responsive</div>
                <div className="text-gowith-orange text-xs font-bold">Worth $400</div>
                <Smartphone className="w-6 h-6 text-white mx-auto mt-2" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button onClick={scrollToForm} className="group relative inline-flex items-center bg-gowith-orange hover:bg-gowith-orange-hover text-white text-xl font-black px-10 py-5 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-2xl">
                <DollarSign className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                GET YOUR $6,800 VALUE FREE!
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            <div className="relative max-w-5xl mx-auto">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gray-100 border-4 border-white/50">
                <div className="relative h-80 md:h-[500px] overflow-hidden">
                  <img src={websiteShowcase[currentSlide].image} alt={websiteShowcase[currentSlide].name} className="w-full h-full object-cover object-top transition-all duration-1000 transform hover:scale-105" />
                  <div className="absolute bottom-6 left-6 bg-black/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl shadow-lg">
                    <span className="font-bold text-lg">{websiteShowcase[currentSlide].name}</span>
                    <div className="text-gowith-orange text-sm font-medium">✓ $6,800 Value - FREE</div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-6 space-x-3">
                  {websiteShowcase.map((_, index) => <div key={index} className={`w-3 h-3 rounded-full transition-all duration-500 cursor-pointer ${index === currentSlide ? 'bg-white scale-150 shadow-lg' : 'bg-white/50 hover:bg-white/80'}`} onClick={() => setCurrentSlide(index)} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-8">
              🎯 What You're Getting: <span className="text-yellow-300">$6,800 Value</span>
            </h2>
            <p className="text-xl mb-8">See exactly what's included in your free professional website package</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-4">🎨</div>
                <h3 className="text-xl font-bold mb-2">Professional Website Design</h3>
                <div className="text-2xl font-black text-yellow-300">$3,000</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-4">💻</div>
                <h3 className="text-xl font-bold mb-2">Custom Development</h3>
                <div className="text-2xl font-black text-yellow-300">$2,500</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-4">🚀</div>
                <h3 className="text-xl font-bold mb-2">SEO & Optimization</h3>
                <div className="text-2xl font-black text-yellow-300">$1,300</div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <div className="bg-green-600 rounded-2xl p-8 text-center">
                <div className="text-yellow-300 text-lg font-bold mb-2">TOTAL VALUE</div>
                <div className="text-4xl font-black">$6,800</div>
              </div>
              <div className="text-6xl">→</div>
              <div className="bg-blue-600 rounded-2xl p-8 text-center">
                <div className="text-yellow-300 text-lg font-bold mb-2">YOUR INVESTMENT</div>
                <div className="text-4xl font-black text-yellow-300">FREE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-gowith-dark-blue text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Trusted by <span className="text-gowith-orange">500+ California Businesses</span>
              </h2>
              <p className="text-xl text-gray-300">Each saved an average of $6,800 on professional web design</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {socialProof.map((item, index) => <div key={index} className="text-center group hover:scale-110 transition-transform duration-300">
                  <div className="text-5xl mb-2">{item.icon}</div>
                  <div className="text-4xl font-black text-gowith-orange mb-2">{item.metric}</div>
                  <div className="text-gray-300 font-medium">{item.label}</div>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gowith-dark-blue mb-6">
                Website Development <span className="text-gowith-medium-blue">Process</span>
              </h2>
              <p className="text-xl text-gray-600">
                From application to launch, we make it easy with our proven 5-step process
              </p>
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold mt-4">
                <DollarSign className="w-4 h-4 mr-2" />
                No upfront costs - $6,800 value delivered FREE
              </div>
            </div>

            {/* Process Timeline */}
            <div className="relative">
              {/* Desktop Timeline Line */}
              <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-gowith-medium-blue via-gowith-orange to-gowith-dark-blue rounded-full"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
                {[{
                step: 1,
                title: "Application Submission",
                desc: "Clients submit their website request through our application form with details about their needs, goals, and preferred features.",
                timeline: "Day 1",
                icon: FileText,
                color: "from-gowith-medium-blue to-gowith-light-blue"
              }, {
                step: 2,
                title: "Review Process",
                desc: "Our team reviews the application, clarifies requirements if needed, and confirms the scope of the project.",
                timeline: "Day 2",
                icon: Search,
                color: "from-gowith-orange to-gowith-orange-hover"
              }, {
                step: 3,
                title: "Finalize Requirements",
                desc: "We finalize the website features, pages, content structure, and gather all assets (logos, images, text, etc.) for development.",
                timeline: "Days 3–5",
                icon: Settings,
                color: "from-gray-600 to-gray-700"
              }, {
                step: 4,
                title: "Design & Development",
                desc: "Our designers and developers build the website based on the finalized plan, ensuring it meets the client's vision, is mobile-friendly, and optimized.",
                timeline: "Days 6–12",
                icon: Code,
                color: "from-gowith-dark-blue to-gowith-medium-blue"
              }, {
                step: 5,
                title: "Launch & Go Live",
                desc: "We test the website, perform quality checks, and once approved, deploy it to production and go live.",
                timeline: "Days 13–14",
                icon: RocketIcon,
                color: "from-green-600 to-green-700"
              }].map((item, index) => <div key={index} className="relative group">
                    {/* Step Circle */}
                    <div className="relative z-10 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300 border-4 border-white`}>
                        <span className="text-white font-black text-xl">{item.step}</span>
                      </div>
                      {/* Icon overlay */}
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                        <item.icon className="w-4 h-4 text-gray-600" />
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                      <div className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-4">
                        <Clock className="w-3 h-3 mr-1" />
                        {item.timeline}
                      </div>
                      
                      <h3 className="text-lg font-bold text-gowith-dark-blue mb-3 leading-tight">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.desc}
                      </p>

                      {/* Step indicator */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-500">Step {item.step} of 5</span>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => <div key={i} className={`w-2 h-2 rounded-full ${i < item.step ? 'bg-gowith-orange' : 'bg-gray-200'}`} />)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Connector Arrow for Desktop */}
                    {index < 4 && <div className="hidden lg:block absolute top-8 -right-4 z-0">
                        <ArrowRight className="w-8 h-8 text-gray-300" />
                      </div>}
                  </div>)}
              </div>
            </div>

            {/* Summary Section */}
            <div className="mt-16 bg-gradient-to-r from-gowith-dark-blue to-gowith-medium-blue rounded-3xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Complete Process: 13-14 Days</h3>
              <p className="text-lg text-blue-100 mb-6">
                From application submission to website launch, we deliver professional results efficiently
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold text-gowith-orange">5 Steps</div>
                  <div className="text-sm text-blue-100">Structured Process</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold text-gowith-orange">14 Days</div>
                  <div className="text-sm text-blue-100">Average Timeline</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold text-gowith-orange">$6,800</div>
                  <div className="text-sm text-blue-100">Value Delivered FREE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Design Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
                <Palette className="w-4 h-4 mr-2" />
                BONUS: Professional Logo Design Included FREE!
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-gowith-dark-blue mb-6">
                Custom Logo Design <span className="text-gradient bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">+ Brand Identity</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
                Your website deserves a professional logo that represents your brand perfectly. We create custom logos that make your business memorable and trustworthy.
              </p>
              
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold">
                <DollarSign className="w-4 h-4 mr-2" />
                Usually costs $250-$300 - Yours FREE with website package
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Logo Design Features */}
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Brush className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">Custom Logo Creation</h3>
                      <p className="text-gray-600">Unique, professional logos designed specifically for your business and industry</p>
                      <div className="text-green-600 font-bold text-sm mt-2">$150 value - FREE</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Layers className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">Multiple Format Delivery</h3>
                      <p className="text-gray-600">PNG, SVG, PDF, and high-resolution files for all your marketing needs</p>
                      <div className="text-green-600 font-bold text-sm mt-2">$75 value - FREE</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">Brand Color Palette</h3>
                      <p className="text-gray-600">Professional color scheme that works across all your marketing materials</p>
                      <div className="text-green-600 font-bold text-sm mt-2">$75 value - FREE</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Examples */}
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-8 text-center">
                  <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
                    <div className="text-6xl mb-4">🎨</div>
                    <h3 className="text-2xl font-bold text-gowith-dark-blue mb-2">Your Logo Here</h3>
                    <p className="text-gray-600">Professional design that represents your brand</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <div className="text-2xl mb-2">📱</div>
                      <div className="text-xs text-gray-600">Mobile Ready</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <div className="text-2xl mb-2">🖥️</div>
                      <div className="text-xs text-gray-600">Website</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <div className="text-2xl mb-2">📧</div>
                      <div className="text-xs text-gray-600">Email</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating value badge */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  $300 Value FREE!
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-gradient-to-r from-gowith-dark-blue to-gowith-medium-blue rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Website + Logo + Branding = Complete Package</h3>
              <p className="text-lg text-blue-100 mb-6">
                Get everything you need to establish a professional online presence
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gowith-orange">$6,800</div>
                  <div className="text-sm text-blue-100">Website Value</div>
                </div>
                <div className="text-2xl">+</div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gowith-orange">$300</div>
                  <div className="text-sm text-blue-100">Logo & Branding</div>
                </div>
                <div className="text-2xl">=</div>
                <div className="bg-gowith-orange rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white">FREE</div>
                  <div className="text-sm text-white">Your Investment</div>
                </div>
              </div>
              
              <Button onClick={scrollToForm} className="bg-gowith-orange hover:bg-gowith-orange-hover text-white text-lg font-bold px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
                <Palette className="mr-3 h-5 w-5" />
                Get My FREE Website + Logo Package
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gowith-dark-blue mb-6">
                Everything You Need to <span className="text-gowith-medium-blue">Succeed Online</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-4">
                Comprehensive web design services that cover every aspect of your online presence
              </p>
              <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-bold">
                <Star className="w-4 h-4 mr-2" />
                Usually costs $5,000-$7,000 - Yours FREE
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[{
              icon: Smartphone,
              title: "Mobile-First Design",
              desc: "Responsive design that works perfectly on all devices",
              color: "from-gowith-medium-blue to-gowith-light-blue",
              value: "$400"
            }, {
              icon: TrendingUp,
              title: "SEO Optimized",
              desc: "Built to rank higher in search results",
              color: "from-gowith-orange to-gowith-orange-hover",
              value: "$900"
            }, {
              icon: Zap,
              title: "Lightning Fast",
              desc: "Optimized for speed and performance",
              color: "from-gray-600 to-gray-700",
              value: "$300"
            }, {
              icon: Shield,
              title: "Secure & Reliable",
              desc: "Advanced security and reliable hosting",
              color: "from-gowith-dark-blue to-gowith-medium-blue",
              value: "$500"
            }, {
              icon: Star,
              title: "Custom Design",
              desc: "Unique designs tailored to your brand",
              color: "from-gowith-orange to-gowith-orange-hover",
              value: "$3,000"
            }, {
              icon: Users,
              title: "Ongoing Support",
              desc: "Continuous support and maintenance",
              color: "from-gowith-medium-blue to-gowith-light-blue",
              value: "$1,700"
            }].map((feature, index) => <div key={index} className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gowith-dark-blue">
                      {feature.title}
                    </h3>
                    <span className="text-green-600 font-bold text-sm bg-green-100 px-2 py-1 rounded">
                      {feature.value}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section with Rotating Groups */}
      <section id="reviews" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gowith-dark-blue mb-6">
                What Our Clients Say About <span className="text-gowith-medium-blue">CloudMor</span>
              </h2>
              <p className="text-xl text-gray-600 mb-4">Real results from real businesses across California</p>
            </div>

            {/* Rotating testimonial groups display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {testimonialGroups[currentTestimonialGroup].map((testimonial, index) => <div key={index} className="group bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-gowith-orange fill-current" />)}
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
                </div>)}
            </div>

            {/* Group indicators */}
            <div className="flex justify-center space-x-2 mb-8">
              {testimonialGroups.map((_, index) => <div key={index} className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${index === currentTestimonialGroup ? 'bg-gowith-orange scale-150' : 'bg-gray-300 hover:bg-gray-400'}`} onClick={() => setCurrentTestimonialGroup(index)} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Web Design Form Section with Updated Typeform Embed */}
      <section id="web-design-form" className="py-20 bg-gradient-to-br from-gowith-dark-blue to-gowith-medium-blue text-white relative overflow-hidden">
        {/* Enhanced background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gowith-orange/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Enhanced header with pulsing elements */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full text-lg font-black mb-8 shadow-2xl animate-pulse">
                <Star className="h-6 w-6 mr-3 animate-spin" />
                🎯 MOST VISIBLE FORM - SUBMIT YOUR REQUEST NOW!
                <Star className="h-6 w-6 ml-3 animate-spin" />
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-shadow-lg">
                START YOUR <span className="text-gowith-orange animate-pulse">FREE WEB DESIGN</span>
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                APPLY YOUR REQUEST TODAY!
              </h3>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
                Get your $6,800 professional website absolutely FREE. Tell us about your project and we'll get started right away.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <div className="bg-green-500 text-white px-6 py-3 rounded-full font-bold text-lg flex items-center shadow-lg">
                  <DollarSign className="h-5 w-5 mr-2" />
                  FREE DESIGN
                </div>
                <div className="bg-green-500 text-white px-6 py-3 rounded-full font-bold text-lg flex items-center shadow-lg">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  FREE DEVELOPMENT
                </div>
                <div className="bg-white/20 text-white px-6 py-3 rounded-full font-bold text-lg flex items-center shadow-lg">
                  <Star className="h-5 w-5 mr-2" />
                  $6,800 Value
                </div>
              </div>
            </div>

            {/* Enhanced form container with glowing border and Updated Typeform embed */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-gowith-orange via-yellow-400 to-gowith-orange rounded-3xl blur opacity-75 animate-pulse"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-black text-gowith-dark-blue mb-2">
                    📝 SUBMIT YOUR WEB DESIGN REQUEST
                  </h4>
                  <p className="text-gray-600">Fill out this form to get your FREE $6,800 website</p>
                </div>
                
                {/* Updated Typeform Embed with form ID 01JZ6P3Y0CNZCV4GXSH5YQ4WSQ */}
                <div className="w-full h-[600px]">
                  <div data-tf-live="01JZ6P3Y0CNZCV4GXSH5YQ4WSQ" className="w-full h-full"></div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <div className="bg-gowith-orange rounded-2xl p-6 shadow-lg">
                <p className="text-xl font-black text-white flex items-center justify-center">
                  <Heart className="h-6 w-6 mr-3" />
                  From California, with ❤️ – Passionately Powering Your Vision
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="inline-block mb-4">
                <img src="/lovable-uploads/691e7939-254c-4028-91c9-7c00fd9a8db8.png" alt="CloudMor Logo" className="h-20 w-auto" />
              </Link>
              <p className="text-gray-300 mb-4">
                Enterprise-level technology solutions for growing businesses.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-white">Services</h4>
              <ul className="space-y-2">
                <li><Link to="/services/web-dev-automation" className="text-gray-300 hover:text-white">Web Development</Link></li>
                <li><Link to="/services/managed-it" className="text-gray-300 hover:text-white">Managed IT</Link></li>
                <li><Link to="/services/cybersecurity" className="text-gray-300 hover:text-white">Cybersecurity</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-white">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-300 hover:text-white">About</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-white">Contact</h4>
              <p className="text-gray-300 mb-2">
                <strong>Phone:</strong> <a href="tel:8885546597" className="hover:text-white">(888) 554-6597</a>
              </p>
              <p className="text-gray-300">
                <strong>Email:</strong> <a href="mailto:sales@cloudmor.com" className="hover:text-white">sales@cloudmor.com</a>
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-600 mt-12 pt-8 text-center">
            <p className="text-gray-300">
              &copy; {new Date().getFullYear()} CloudMor. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>;
};

export default WebDesignLanding;

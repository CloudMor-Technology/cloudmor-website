import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { CheckCircle, Star, Users, Clock, Shield, Smartphone, TrendingUp, Zap, ArrowRight, Play, MapPin, Phone, Mail, Award, Target, Rocket, Eye, Heart, DollarSign } from 'lucide-react';
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
  }, {
    quote: "Our restaurant bookings doubled after getting our new website. The mobile design is absolutely perfect!",
    author: "Antonio Martinez",
    business: "Casa Bella Restaurant, Sacramento",
    result: "+200% Bookings",
    avatar: "👨‍🍳"
  }, {
    quote: "CloudMor's team understood our vision perfectly. They delivered exactly what we needed for our law firm.",
    author: "Jennifer Walsh",
    business: "Walsh & Associates Law, Oakland",
    result: "Perfect Vision",
    avatar: "⚖️"
  }, {
    quote: "The SEO optimization they included helped us rank #1 on Google for our main keywords within 2 months.",
    author: "Michael Thompson",
    business: "Thompson Plumbing Services, Fresno",
    result: "#1 Google Ranking",
    avatar: "🔧"
  }, {
    quote: "As a startup, getting a professional website for free was a game-changer. We look like a million-dollar company now!",
    author: "Lisa Chang",
    business: "InnovateTech Solutions, Palo Alto",
    result: "Million $ Look",
    avatar: "🚀"
  }, {
    quote: "The customer support is incredible. They helped us update our content and made changes whenever we needed them.",
    author: "Robert Garcia",
    business: "Garcia Construction, San Jose",
    result: "Amazing Support",
    avatar: "👷‍♂️"
  }, {
    quote: "Our online sales went from zero to $10,000 per month after launching our new website. Absolutely amazing!",
    author: "Emma Wilson",
    business: "Wilson Handmade Crafts, Santa Barbara",
    result: "$10K/Month Sales",
    avatar: "🎨"
  }, {
    quote: "CloudMor delivered everything they promised and more. The security features give us complete peace of mind.",
    author: "Dr. James Park",
    business: "Park Family Dental, Riverside",
    result: "Complete Security",
    avatar: "🦷"
  }, {
    quote: "The design is stunning and loads incredibly fast. Our bounce rate dropped by 60% after the new site launch.",
    author: "Nicole Adams",
    business: "Adams Real Estate Group, Long Beach",
    result: "-60% Bounce Rate",
    avatar: "🏠"
  }, {
    quote: "Getting our veterinary clinic online was seamless. The appointment booking system works perfectly!",
    author: "Dr. Amanda Foster",
    business: "Foster Animal Hospital, Modesto",
    result: "Perfect Bookings",
    avatar: "🐾"
  }, {
    quote: "CloudMor's team made the entire process stress-free. From concept to launch, everything was handled professionally.",
    author: "Carlos Mendoza",
    business: "Mendoza Landscaping, Bakersfield",
    result: "Stress-Free Process",
    avatar: "🌱"
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

      {/* Modern Header */}
      <header className="w-full fixed top-0 left-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-center">
            <img src="/lovable-uploads/00436355-e891-4698-a6af-6e31111733e9.png" alt="CloudMor Logo" className="h-32 w-auto animate-fade-in" />
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 pt-44 pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center py-[20px]">
            {/* Attention-Grabbing Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-8 animate-bounce shadow-lg">
              <Zap className="w-4 h-4 mr-2" />
              🔥 BREAKING: Only 10 FREE Websites Left This Month!
            </div>
            
            {/* Eye-Catching Headlines */}
            <h1 className="text-5xl font-black text-white mb-6 leading-tight animate-fade-in md:text-6xl">
              GET YOUR
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
                $6,800 WEBSITE
              </span>
              <span className="block text-green-400">100% FREE!</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-300">
              🎯 We're giving away professional websites to <span className="font-bold text-yellow-300">California businesses</span>. 
              Zero cost, zero catch, maximum results!
            </p>

            {/* Enhanced Value Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/30 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-black text-green-400 mb-2">$6,800</div>
                <div className="text-white text-sm font-medium">Total Value</div>
                <DollarSign className="w-6 h-6 text-green-400 mx-auto mt-2" />
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/30 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-black text-yellow-400 mb-2">$0</div>
                <div className="text-white text-sm font-medium">Your Cost</div>
                <Heart className="w-6 h-6 text-yellow-400 mx-auto mt-2" />
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/30 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-black text-orange-400 mb-2">14</div>
                <div className="text-white text-sm font-medium">Days to Launch</div>
                <Rocket className="w-6 h-6 text-orange-400 mx-auto mt-2" />
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/30 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-black text-purple-400 mb-2">∞</div>
                <div className="text-white text-sm font-medium">Value Added</div>
                <Target className="w-6 h-6 text-purple-400 mx-auto mt-2" />
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button onClick={scrollToForm} className="group relative inline-flex items-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xl font-black px-10 py-5 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-2xl">
                <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                CLAIM MY FREE WEBSITE NOW!
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              
              
            </div>

            {/* Website Showcase with Enhanced Animation */}
            <div className="relative max-w-5xl mx-auto">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gray-100 border-4 border-white/50">
                <div className="relative h-80 md:h-[500px] overflow-hidden">
                  <img src={websiteShowcase[currentSlide].image} alt={websiteShowcase[currentSlide].name} className="w-full h-full object-cover object-top transition-all duration-1000 transform hover:scale-105" />
                  <div className="absolute bottom-6 left-6 bg-black/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl shadow-lg">
                    <span className="font-bold text-lg">{websiteShowcase[currentSlide].name}</span>
                    <div className="text-green-400 text-sm font-medium">✓ Built in 14 days</div>
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

      {/* Enhanced Social Proof Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                🏆 Trusted by <span className="text-yellow-400">3451+ California Businesses</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {socialProof.map((item, index) => <div key={index} className="text-center group hover:scale-110 transition-transform duration-300">
                  <div className="text-5xl mb-2">{item.icon}</div>
                  <div className="text-4xl font-black text-yellow-400 mb-2">{item.metric}</div>
                  <div className="text-gray-300 font-medium">{item.label}</div>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                🎯 Everything You Need to <span className="text-blue-600">DOMINATE Online</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Your complete professional website package includes all the features modern businesses need to crush the competition.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[{
              icon: Smartphone,
              title: "Mobile-Perfect Design",
              desc: "Looks stunning on every device",
              color: "from-blue-500 to-blue-600"
            }, {
              icon: TrendingUp,
              title: "SEO Optimized",
              desc: "Built to rank #1 on Google",
              color: "from-green-500 to-green-600"
            }, {
              icon: Zap,
              title: "Lightning Fast",
              desc: "Loads in under 2 seconds",
              color: "from-yellow-500 to-orange-500"
            }, {
              icon: Shield,
              title: "Bank-Level Security",
              desc: "Advanced protection included",
              color: "from-purple-500 to-purple-600"
            }, {
              icon: Star,
              title: "Professional Design",
              desc: "Custom design for your brand",
              color: "from-pink-500 to-red-500"
            }, {
              icon: Users,
              title: "24/7 Support",
              desc: "Help when you need it",
              color: "from-indigo-500 to-blue-600"
            }].map((feature, index) => <div key={index} className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                💬 Real Results from <span className="text-green-600">Real Businesses</span>
              </h2>
              <p className="text-xl text-gray-600">See how we've helped businesses like yours explode their online presence</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {testimonials.slice(currentTestimonial, currentTestimonial + 6).map((testimonial, index) => <div key={index} className="group bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  {/* Result Badge */}
                  <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold mb-4">
                    <Award className="w-4 h-4 mr-1" />
                    {testimonial.result}
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
                  </div>
                  <blockquote className="text-gray-700 mb-6 leading-relaxed font-medium">
                    "{testimonial.quote}"
                  </blockquote>
                  <footer className="flex items-center">
                    <div className="text-3xl mr-3">{testimonial.avatar}</div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.author}</div>
                      <div className="text-gray-600 text-sm">{testimonial.business}</div>
                    </div>
                  </footer>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Value Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                💰 What You're Getting: <span className="text-green-400 animate-pulse">$6,800 Value</span>
              </h2>
              <p className="text-xl text-gray-300">
                See exactly what's included in your free professional website package
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[{
              service: "Professional Website Design",
              price: "$3,000",
              icon: "🎨"
            }, {
              service: "Custom Logo Design",
              price: "$400",
              icon: "🎯"
            }, {
              service: "Content Management",
              price: "$200",
              icon: "📝"
            }, {
              service: "Blog or News Section",
              price: "$150",
              icon: "📰"
            }, {
              service: "Mobile Optimization",
              price: "$100",
              icon: "📱"
            }, {
              service: "Speed Optimization",
              price: "$100",
              icon: "⚡"
            }, {
              service: "Accessibility Compliance",
              price: "$200",
              icon: "♿"
            }, {
              service: "SEO & Analytics Setup",
              price: "$900",
              icon: "📊"
            }, {
              service: "Social Media Integration",
              price: "$200",
              icon: "🔗"
            }, {
              service: "Advanced Security & Threat Protection",
              price: "$100",
              icon: "🔒"
            }, {
              service: "Privacy Policy & Cookie Consent",
              price: "$200",
              icon: "📋"
            }, {
              service: "Backup & Restore Setup",
              price: "$150",
              icon: "💾"
            }].map((item, index) => <div key={index} className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl mb-3 group-hover:animate-bounce">{item.icon}</div>
                  <h3 className="text-white font-bold mb-2 leading-tight">{item.service}</h3>
                  <div className="text-right">
                    <span className="text-green-400 font-black text-xl">{item.price}</span>
                  </div>
                </div>)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-3xl p-8 text-center transform hover:scale-105 transition-transform duration-300 shadow-2xl">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-2xl font-black mb-2">TOTAL VALUE</h3>
                <div className="text-5xl font-black">$6,800</div>
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-8 text-center transform hover:scale-105 transition-transform duration-300 shadow-2xl">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-black mb-2">YOUR INVESTMENT</h3>
                <div className="text-5xl font-black text-yellow-400">FREE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Process Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                🚀 From Application to <span className="text-blue-600">Launch in 14 Days</span>
              </h2>
              <p className="text-xl text-gray-600">
                Our proven process ensures you get a professional website lightning fast
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[{
              step: 1,
              title: "Apply Today",
              desc: "Fill out our simple application form",
              days: "Day 1",
              color: "from-blue-500 to-blue-600"
            }, {
              step: 2,
              title: "Get Approved",
              desc: "We review and confirm your selection",
              days: "Day 1-2",
              color: "from-green-500 to-green-600"
            }, {
              step: 3,
              title: "We Build",
              desc: "Our team creates your custom website",
              days: "Day 3-12",
              color: "from-purple-500 to-purple-600"
            }, {
              step: 4,
              title: "You Launch",
              desc: "Final review and your site goes live",
              days: "Day 13-14",
              color: "from-orange-500 to-red-500"
            }].map((item, index) => <div key={index} className="text-center group">
                  <div className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <span className="text-white font-black text-2xl">{item.step}</span>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className="text-xs font-bold text-blue-600 mb-2 bg-blue-100 px-4 py-2 rounded-full inline-block">
                      {item.days}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Application Form Section */}
      <section id="application" className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                🚀 GET YOUR <span className="text-yellow-400 animate-pulse">FREE $6,800 WEBSITE</span>
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Apply Now – Only 10 Spots Left This Month!
              </h3>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                We review all submissions within 24 hours. If you're selected, we'll assign a Team lead to coordinate and start building your website — completely free.
              </p>
              
              {/* Urgency Elements */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <div className="bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg animate-pulse flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  ⚡ 10 Spots Remaining
                </div>
                <div className="bg-green-500 text-white px-6 py-3 rounded-full font-bold text-lg flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  ✓ 24-Hour Response
                </div>
                <div className="bg-yellow-500 text-black px-6 py-3 rounded-full font-bold text-lg flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  💰 $6,800 Value
                </div>
              </div>
            </div>

            {/* Enhanced Form Container */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
              <WebApplicationForm />
            </div>

            <div className="text-center mt-8">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 shadow-lg">
                <p className="text-xl font-black text-white flex items-center justify-center">
                  <Clock className="h-6 w-6 mr-3 animate-spin" />
                  🔥 HURRY! We're Giving Away Only 50 FREE Websites This Month – Secure Yours Before They're All Taken!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                🏆 Why California Businesses Choose <span className="text-blue-600">CloudMor</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[{
              title: "Local Expertise",
              desc: "We understand California businesses and markets",
              icon: "🌟",
              color: "from-yellow-400 to-orange-500"
            }, {
              title: "Proven Results",
              desc: "500+ successful websites launched",
              icon: "📈",
              color: "from-green-400 to-blue-500"
            }, {
              title: "No Hidden Costs",
              desc: "Completely free with no surprise fees",
              icon: "💰",
              color: "from-purple-400 to-pink-500"
            }, {
              title: "Lightning Fast",
              desc: "Professional website in just 14 days",
              icon: "⚡",
              color: "from-blue-400 to-purple-500"
            }].map((item, index) => <div key={index} className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl text-center transition-all duration-300 transform hover:scale-105 border border-gray-100">
                  <div className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                    <div className="text-4xl">{item.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>)}
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
                  <img src="/lovable-uploads/00436355-e891-4698-a6af-6e31111733e9.png" alt="CloudMor Logo" className="h-20 mb-4" />
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
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.025804193596!2d-122.41853868468208!3d37.775826679758516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2s1390%20Market%20St%2C%20San%20Francisco%2C%20CA%2094102!5e0!3m2!1sen!2sus!4v1635789234567!5m2!1sen!2sus" width="100%" height="100%" style={{
                    border: 0
                  }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg" />
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
    </div>;
};
export default WebLanding;

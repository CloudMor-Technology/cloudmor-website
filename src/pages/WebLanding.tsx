
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { CheckCircle, Star, Users, Clock, Shield, Smartphone, TrendingUp, Zap, ArrowRight, Play, MapPin, Phone, Mail } from 'lucide-react';
import WebApplicationForm from '@/components/WebApplicationForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const WebLanding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const websiteShowcase = [{
    name: "Restaurant Website",
    image: "/lovable-uploads/834d5c69-5070-4488-bc7a-7b19eeebae04.png"
  }, {
    name: "Healthcare Website",
    image: "/lovable-uploads/691e7939-254c-4028-91c9-7c00fd9a8db8.png"
  }, {
    name: "Legal Services",
    image: "/lovable-uploads/b54dbedd-701e-4c03-9e4c-32de14604d6a.png"
  }, {
    name: "Real Estate",
    image: "/lovable-uploads/c98e8d7b-612c-4375-b9d1-af212401e6dc.png"
  }, {
    name: "Retail Store",
    image: "/lovable-uploads/d14591a0-5690-4ddf-99ca-b2144172f86c.png"
  }, {
    name: "Construction",
    image: "/lovable-uploads/edb9dbfe-335c-4145-a6a2-f0e188e64fbb.png"
  }];

  // Expanded testimonials array with 23 reviews
  const testimonials = [
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
    },
    {
      quote: "Our restaurant bookings doubled after getting our new website. The mobile design is absolutely perfect!",
      author: "Antonio Martinez",
      business: "Casa Bella Restaurant, Sacramento"
    },
    {
      quote: "CloudMor's team understood our vision perfectly. They delivered exactly what we needed for our law firm.",
      author: "Jennifer Walsh",
      business: "Walsh & Associates Law, Oakland"
    },
    {
      quote: "The SEO optimization they included helped us rank #1 on Google for our main keywords within 2 months.",
      author: "Michael Thompson",
      business: "Thompson Plumbing Services, Fresno"
    },
    {
      quote: "As a startup, getting a professional website for free was a game-changer. We look like a million-dollar company now!",
      author: "Lisa Chang",
      business: "InnovateTech Solutions, Palo Alto"
    },
    {
      quote: "The customer support is incredible. They helped us update our content and made changes whenever we needed them.",
      author: "Robert Garcia",
      business: "Garcia Construction, San Jose"
    },
    {
      quote: "Our online sales went from zero to $10,000 per month after launching our new website. Absolutely amazing!",
      author: "Emma Wilson",
      business: "Wilson Handmade Crafts, Santa Barbara"
    },
    {
      quote: "CloudMor delivered everything they promised and more. The security features give us complete peace of mind.",
      author: "Dr. James Park",
      business: "Park Family Dental, Riverside"
    },
    {
      quote: "The design is stunning and loads incredibly fast. Our bounce rate dropped by 60% after the new site launch.",
      author: "Nicole Adams",
      business: "Adams Real Estate Group, Long Beach"
    },
    {
      quote: "Getting our veterinary clinic online was seamless. The appointment booking system works perfectly!",
      author: "Dr. Amanda Foster",
      business: "Foster Animal Hospital, Modesto"
    },
    {
      quote: "CloudMor's team made the entire process stress-free. From concept to launch, everything was handled professionally.",
      author: "Carlos Mendoza",
      business: "Mendoza Landscaping, Bakersfield"
    }
  ];

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
        <title>FREE $7,200 Professional Website - CloudMor | web.cloudmor.com</title>
        <meta name="description" content="Get a $7,200 professional website absolutely FREE for selected California businesses. Fast, mobile-optimized, SEO-ready websites delivered in 2 weeks." />
        <meta name="keywords" content="free website, professional website design, California business, CloudMor, web design" />
      </Helmet>

      <Navbar />

      {/* Hero Section - Dynamic Gradient with Powerful Content */}
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:40px_40px] animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"></div>
        
        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 my-[70px]">
              {/* Dynamic Limited Time Badge */}
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white px-6 py-3 rounded-full text-xs font-bold mb-8 animate-bounce shadow-2xl">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                <span>⚡ EXCLUSIVE: Only 50 Spots Available This Month ⚡</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl mb-6 leading-tight font-extrabold lg:text-4xl">
                Transform Your Business with a 
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent animate-pulse">$7,200 Website</span>
                <br />
                <span className="text-3xl md:text-4xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent my-0 py-0 mx-0 lg:text-3xl">100% FREE</span>
              </h1>
              
              <p className="text-lg md:text-xl mb-6 text-cyan-200 max-w-5xl mx-auto leading-relaxed font-semibold">
                🚀 Professional websites that convert visitors into customers
                <br />
                <span className="text-base text-purple-200 font-extrabold">Built with cutting-edge tech for ambitious businesses ready to own the digital space</span>
              </p>
              
              <p className="text-lg mb-6 max-w-4xl mx-auto text-blue-200 font-medium">
                Join thriving businesses. Complete website delivered in just 14 days.
              </p>

              {/* Community Message */}
              <div className="bg-gradient-to-r from-emerald-500/30 to-teal-500/30 backdrop-blur-lg border border-emerald-400/50 rounded-3xl p-6 mb-8 max-w-5xl mx-auto shadow-2xl">
                <h2 className="text-2xl md:text-3xl font-bold text-emerald-300 mb-4">Communities to Thrive</h2>
                <p className="text-lg text-white leading-relaxed">
                  We believe every business deserves success online. That's why we're investing in communities 
                  across California with our exclusive support program - turning dreams into digital reality.
                </p>
              </div>

              {/* Dynamic Stats Grid - Updated prices */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
                <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-3xl border border-green-400/30 hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl md:text-4xl font-black text-green-400 mb-2">$7,200</div>
                  <div className="text-green-200 font-semibold text-sm">Total Value</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-3xl border border-blue-400/30 hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl md:text-4xl font-black text-cyan-400 mb-2">$0</div>
                  <div className="text-cyan-200 font-semibold text-sm">Your Investment</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-lg rounded-3xl border border-orange-400/30 hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl md:text-4xl font-black text-orange-400 mb-2">14</div>
                  <div className="text-orange-200 font-semibold text-sm">Days to Launch</div>
                </div>
              </div>

              {/* Dynamic CTA Button - Updated price */}
              <a href="#application" className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white text-lg font-black py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-green-500/50 animate-pulse">
                <span>🎯 Claim My FREE $7,200 Website</span>
                <ArrowRight className="h-6 w-6" />
              </a>
            </div>

            {/* Website Showcase */}
            <div className="relative max-w-6xl mx-auto">
              <div className="bg-gradient-to-r from-white/10 to-purple-500/10 backdrop-blur-xl p-6 shadow-2xl border border-white/20 rounded-3xl">
                <div className="relative h-80 md:h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-inner">
                  <img src={websiteShowcase[currentSlide].image} alt={websiteShowcase[currentSlide].name} className="w-full h-full transition-all duration-700 object-contain hover:scale-105" />
                  <div className="absolute bottom-4 left-4 bg-gradient-to-r from-black/90 to-purple-900/90 backdrop-blur-sm text-white px-4 py-2 rounded-xl shadow-lg">
                    <span className="font-bold text-base">{websiteShowcase[currentSlide].name}</span>
                  </div>
                </div>
                <div className="flex justify-center mt-6 space-x-3">
                  {websiteShowcase.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-500 cursor-pointer ${
                        index === currentSlide
                          ? 'bg-gradient-to-r from-cyan-400 to-purple-400 scale-150 shadow-lg'
                          : 'bg-white/50 hover:bg-white/80'
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

      {/* Value Proposition - Dynamic Color Design with Fixed Content Support tile */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                Why Your Business Needs a 
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Digital Powerhouse</span>
              </h2>
              <p className="text-lg text-slate-700 max-w-4xl mx-auto leading-relaxed font-medium">
                Your website is your 24/7 sales machine. It builds trust, showcases your expertise, 
                and converts visitors into loyal customers while you sleep.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Smartphone,
                  title: "Mobile-First Design",
                  desc: "Perfect on every device",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  icon: TrendingUp,
                  title: "SEO Optimized",
                  desc: "Rank higher on Google",
                  gradient: "from-green-500 to-emerald-500"
                },
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  desc: "Load in under 2 seconds",
                  gradient: "from-yellow-500 to-orange-500"
                },
                {
                  icon: Shield,
                  title: "Premium Level Security",
                  desc: "Advanced protection included",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  icon: Star,
                  title: "Premium Design",
                  desc: "Award-winning aesthetics",
                  gradient: "from-indigo-500 to-blue-500"
                },
                {
                  icon: Users,
                  title: "Content Support",
                  desc: "Professional support for updates and changes as needed",
                  gradient: "from-teal-500 to-cyan-500"
                }
              ].map((feature, index) => (
                <div key={index} className="group">
                  <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-purple-200 transform hover:-translate-y-3 hover:scale-105 h-64 flex flex-col justify-between">
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-lg font-bold text-slate-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-sm">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Support - Vibrant Design */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">Communities</span> to Thrive
              </h2>
              <p className="text-lg text-slate-700 max-w-5xl mx-auto leading-relaxed font-medium">
                We believe every business deserves success online. That's why we're investing in communities 
                across California with our exclusive support program.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {[{
                title: "New Entrepreneurs",
                desc: "Launch with professional foundation",
                gradient: "from-blue-500 to-purple-500"
              }, {
                title: "Growing Businesses",
                desc: "Scale your digital presence",
                gradient: "from-green-500 to-teal-500"
              }, {
                title: "Community Organizations",
                desc: "Amplify your mission online",
                gradient: "from-orange-500 to-red-500"
              }, {
                title: "Local Service Providers",
                desc: "Compete with big corporations",
                gradient: "from-purple-500 to-pink-500"
              }].map((item, index) => <div key={index} className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-base">{item.desc}</p>
                  </div>
                </div>)}
            </div>

            <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-red-100 p-8 rounded-3xl border-l-8 border-orange-500 shadow-xl">
              <h3 className="text-2xl font-black text-slate-900 mb-4">🎯 Our Mission</h3>
              <p className="text-lg text-slate-800 mb-6 leading-relaxed">
                Every free website we create helps a business owner support their family, hire employees, 
                and strengthen their local community. We're not just building websites—we're building dreams and futures.
              </p>
              <div className="bg-gradient-to-r from-orange-200 to-red-200 border-2 border-orange-300 rounded-2xl p-4 shadow-inner">
                <p className="text-lg font-bold text-orange-900 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  ⚡ Only 50 businesses selected each month - Apply now before spots fill up!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Updated Market Value Comparison Section with new pricing structure */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                Market Value vs. <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Your Investment</span>
              </h2>
              <p className="text-lg text-purple-200 max-w-3xl mx-auto">
                See the incredible value you're getting with our community support program
              </p>
            </div>

            {/* Modern Glass Card Design with new categorized pricing */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Professional Service</h3>
                    <p className="text-purple-200 text-sm">What you get</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Market Rate</h3>
                    <p className="text-purple-200 text-sm">Industry standard</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-green-300 mb-1">CloudMor Price</h3>
                    <p className="text-green-200 text-sm">Your investment</p>
                  </div>
                </div>
              </div>

              {/* Website Development & Design Section */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-white/10">
                <div className="p-4">
                  <h4 className="text-lg font-bold text-blue-300 mb-2 flex items-center">
                    ✅ Website Development & Design
                  </h4>
                </div>
              </div>
              
              <div className="divide-y divide-white/10">
                {[
                  ["Professional Website Design", "$3,000"],
                  ["Custom Logo Design", "$400"],
                  ["Content Management", "$700"],
                  ["Blog or News Section", "$250"]
                ].map(([service, price], index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 hover:bg-white/5 transition-all duration-300 group">
                    <div className="text-white font-medium flex items-center text-sm">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                      {service}
                    </div>
                    <div className="text-center">
                      <span className="text-red-400 font-bold text-lg bg-red-400/10 px-3 py-1 rounded-full">{price}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-green-400 font-bold text-lg bg-green-400/10 px-4 py-1 rounded-full shadow-lg">FREE</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* User Experience & Optimization Section */}
              <div className="bg-gradient-to-r from-pink-500/10 to-red-500/10 border-b border-white/10">
                <div className="p-4">
                  <h4 className="text-lg font-bold text-pink-300 mb-2 flex items-center">
                    📱 User Experience & Optimization
                  </h4>
                </div>
              </div>
              
              <div className="divide-y divide-white/10">
                {[
                  ["Mobile Optimization", "$200"],
                  ["Speed Optimization", "$200"],
                  ["Accessibility Compliance", "$300"]
                ].map(([service, price], index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 hover:bg-white/5 transition-all duration-300 group">
                    <div className="text-white font-medium flex items-center text-sm">
                      <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                      {service}
                    </div>
                    <div className="text-center">
                      <span className="text-red-400 font-bold text-lg bg-red-400/10 px-3 py-1 rounded-full">{price}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-green-400 font-bold text-lg bg-green-400/10 px-4 py-1 rounded-full shadow-lg">FREE</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Visibility & Analytics Section */}
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-b border-white/10">
                <div className="p-4">
                  <h4 className="text-lg font-bold text-green-300 mb-2 flex items-center">
                    📈 Visibility & Analytics
                  </h4>
                </div>
              </div>
              
              <div className="divide-y divide-white/10">
                {[
                  ["SEO & Analytics Setup", "$900"],
                  ["Social Media Integration", "$200"]
                ].map(([service, price], index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 hover:bg-white/5 transition-all duration-300 group">
                    <div className="text-white font-medium flex items-center text-sm">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                      {service}
                    </div>
                    <div className="text-center">
                      <span className="text-red-400 font-bold text-lg bg-red-400/10 px-3 py-1 rounded-full">{price}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-green-400 font-bold text-lg bg-green-400/10 px-4 py-1 rounded-full shadow-lg">FREE</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Security & Legal Section */}
              <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-b border-white/10">
                <div className="p-4">
                  <h4 className="text-lg font-bold text-orange-300 mb-2 flex items-center">
                    🔒 Security & Legal
                  </h4>
                </div>
              </div>
              
              <div className="divide-y divide-white/10">
                {[
                  ["Advanced Security & Threat Protection", "$400"],
                  ["Privacy Policy & Cookie Consent", "$100"],
                  ["Backup & Restore Setup", "$50"]
                ].map(([service, price], index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 hover:bg-white/5 transition-all duration-300 group">
                    <div className="text-white font-medium flex items-center text-sm">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                      {service}
                    </div>
                    <div className="text-center">
                      <span className="text-red-400 font-bold text-lg bg-red-400/10 px-3 py-1 rounded-full">{price}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-green-400 font-bold text-lg bg-green-400/10 px-4 py-1 rounded-full shadow-lg">FREE</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Row */}
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-t-4 border-green-400 grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                <div className="text-xl font-black text-white flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mr-3"></div>
                  💰 TOTAL VALUE
                </div>
                <div className="text-center">
                  <span className="text-3xl font-black text-red-400 bg-red-400/10 px-4 py-2 rounded-full">$7,200</span>
                </div>
                <div className="text-center">
                  <span className="text-4xl font-black text-green-400 bg-green-400/10 px-6 py-3 rounded-full shadow-2xl animate-pulse">$0</span>
                </div>
              </div>
            </div>

            {/* Additional Value Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {[
                { icon: "🎯", title: "ROI Focused", desc: "Built for conversions" },
                { icon: "⚡", title: "Lightning Fast", desc: "Under 2 second load" },
                { icon: "🛡️", title: "Enterprise Security", desc: "Bank-level protection" },
                { icon: "📱", title: "Mobile Perfect", desc: "Flawless on all devices" }
              ].map((item, index) => (
                <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl mb-3 group-hover:animate-bounce">{item.icon}</div>
                  <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-purple-200 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Updated Process Timeline Design - Fixed sizes */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                From Application to <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Launch in 14 Days</span>
              </h2>
              <p className="text-lg text-purple-200 max-w-3xl mx-auto">
                Our streamlined process ensures your website is delivered on time, every time
              </p>
            </div>

            <div className="relative">
              {/* Dotted Line Connection for desktop */}
              <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 border-t-2 border-dotted border-cyan-400/50"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                {[
                  {
                    step: 1,
                    title: "Submit Application",
                    desc: "Tell us about your business and vision",
                    days: "Day 1",
                    color: "from-blue-500 to-purple-600"
                  },
                  {
                    step: 2,
                    title: "24-Hour Review",
                    desc: "Our team reviews and confirms selection",
                    days: "Day 1-2",
                    color: "from-purple-500 to-pink-600"
                  },
                  {
                    step: 3,
                    title: "Design Planning",
                    desc: "Custom design based on your brand",
                    days: "Day 2-3",
                    color: "from-pink-500 to-red-600"
                  },
                  {
                    step: 4,
                    title: "Content Creation",
                    desc: "Professional copywriting included",
                    days: "Day 4-7",
                    color: "from-orange-500 to-yellow-600"
                  },
                  {
                    step: 5,
                    title: "Development",
                    desc: "Building your custom website",
                    days: "Day 8-12",
                    color: "from-green-500 to-emerald-600"
                  },
                  {
                    step: 6,
                    title: "Launch",
                    desc: "Final testing and go-live",
                    days: "Day 13-14",
                    color: "from-cyan-500 to-blue-600"
                  }
                ].map((item, index) => (
                  <div key={index} className="relative text-center">
                    {/* Step Circle - Larger */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl relative z-10 border-4 border-white`}>
                      <span className="text-white font-bold text-lg">{item.step}</span>
                    </div>
                    
                    {/* Content Card - Fixed height and larger with smaller font */}
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 h-56 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-semibold text-cyan-300 mb-2 bg-cyan-400/10 px-2 py-1 rounded-full">{item.days}</div>
                        <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                      </div>
                      <p className="text-purple-200 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section - Updated price */}
      <section id="application" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Apply for Your <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">FREE $7,200 Website</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Tell us about your business so our team can understand your needs. Every application 
                is personally reviewed by our community support team.
              </p>
            </div>

            <WebApplicationForm />

            <div className="text-center mt-6">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 rounded-2xl p-4">
                <p className="text-base font-semibold text-orange-800 flex items-center justify-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Limited Time: Only 50 spots available each month
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Two rows with 6 reviews showing */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Success Stories from <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Real Businesses</span>
              </h2>
            </div>

            {/* Two rows of rotating testimonials - showing 6 at a time */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {testimonials.slice(currentTestimonial, currentTestimonial + 3).map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />)}
                  </div>
                  <blockquote className="text-slate-700 mb-4 text-base leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <footer className="border-t border-slate-100 pt-3">
                    <div className="font-semibold text-slate-900 text-sm">{testimonial.author}</div>
                    <div className="text-slate-600 text-xs">{testimonial.business}</div>
                  </footer>
                </div>
              ))}
            </div>

            {/* Second row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {testimonials.slice(currentTestimonial + 3, currentTestimonial + 6).map((testimonial, index) => (
                <div key={index + 3} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />)}
                  </div>
                  <blockquote className="text-slate-700 mb-4 text-base leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <footer className="border-t border-slate-100 pt-3">
                    <div className="font-semibold text-slate-900 text-sm">{testimonial.author}</div>
                    <div className="text-slate-600 text-xs">{testimonial.business}</div>
                  </footer>
                </div>
              ))}
            </div>

            <div className="text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="flex items-center justify-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold text-slate-900 text-sm">5-Star Reviews</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-slate-900 text-sm">BBB A+ Rating</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-slate-900 text-sm">99.9% Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories at Bottom - Updated prices */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Join Our Growing Community</h2>
              <p className="text-lg text-purple-200">Real businesses achieving real results</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg border border-green-400/30 rounded-3xl p-6 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-black text-green-400 mb-2">$7,200</div>
                <div className="text-green-200 font-semibold text-base">Total Value</div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border border-blue-400/30 rounded-3xl p-6 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-black text-cyan-400 mb-2">$0</div>
                <div className="text-cyan-200 font-semibold text-base">Your Investment</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-purple-400/30 rounded-3xl p-6 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-black text-purple-400 mb-2">14</div>
                <div className="text-purple-200 font-semibold text-base">Days to Launch</div>
              </div>
              
              {/* New 23,435 tile */}
              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border border-yellow-400/30 rounded-3xl p-6 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-black text-yellow-400 mb-2">23,435</div>
                <div className="text-yellow-200 font-semibold text-base">Success Stories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer with Bay Area Business Information */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {/* Company Info */}
              <div className="lg:col-span-2">
                <div className="mb-4">
                  <img src="/lovable-uploads/691e7939-254c-4028-91c9-7c00fd9a8db8.png" alt="CloudMor Logo" className="h-32 mb-4" />
                  <p className="text-lg text-slate-300 mb-3">
                    Technology experts from the heart of California
                  </p>
                  <p className="text-slate-400">
                    Made with ❤️ helping businesses from California
                  </p>
                </div>
              </div>

              {/* Office Contact Information */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2 flex items-center justify-center">
                    🏢
                  </div>
                  Office
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2 group hover:bg-slate-800 p-2 rounded-lg transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Address</p>
                      <p className="text-slate-300 text-sm">1390 Market Street</p>
                      <p className="text-slate-300 text-sm">San Francisco, Suite 200</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 group hover:bg-slate-800 p-2 rounded-lg transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Phone</p>
                      <a href="tel:8885546597" className="text-slate-300 hover:text-white transition-colors text-sm">
                        (888) 554-6597
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 group hover:bg-slate-800 p-2 rounded-lg transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Email</p>
                      <a href="mailto:hello@cloudmor.com" className="text-slate-300 hover:text-white transition-colors text-sm">
                        hello@cloudmor.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real Google Map */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2 flex items-center justify-center">
                    🗺️
                  </div>
                  Our Location
                </h3>
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4 backdrop-blur-sm">
                  {/* Google Map Embed */}
                  <div className="relative w-full h-48 mb-3 overflow-hidden rounded-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.025804193596!2d-122.41853868468208!3d37.775826679758516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2s1390%20Market%20St%2C%20San%20Francisco%2C%20CA%2094102!5e0!3m2!1sen!2sus!4v1635789234567!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    ></iframe>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-base font-semibold text-blue-300 mb-1">Proudly Serving</p>
                    <p className="text-white font-bold text-sm">San Francisco</p>
                    <p className="text-slate-300 text-xs mt-1">Innovation • Technology • Community</p>
                  </div>
                  
                  <div className="mt-3 flex justify-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Stories Counter - Updated price */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border border-yellow-400/30 rounded-3xl p-6 text-center mb-6 hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-black text-yellow-400 mb-2">23,435</div>
              <div className="text-yellow-200 font-semibold text-lg">Success Stories and Growing</div>
              <p className="text-yellow-100 text-xs mt-1">Businesses transformed across California</p>
            </div>
            
            <div className="border-t border-slate-700 pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-slate-400 text-xs mb-3 md:mb-0">
                  &copy; {new Date().getFullYear()} CloudMor. All rights reserved.
                </p>
                <div className="flex space-x-4">
                  <a href="/privacy-policy" className="text-slate-400 hover:text-white text-xs transition-colors">
                    Privacy Policy
                  </a>
                  <a href="/contact" className="text-slate-400 hover:text-white text-xs transition-colors">
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

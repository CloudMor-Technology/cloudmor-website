import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { CheckCircle, Star, Users, Clock, Shield, Smartphone, TrendingUp, Zap, ArrowRight, Play } from 'lucide-react';
import WebApplicationForm from '@/components/WebApplicationForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const WebLanding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
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

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % websiteShowcase.length);
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

      {/* Hero Section - Dynamic Gradient with Powerful Content */}
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:40px_40px] animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"></div>
        
        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 my-[70px]">
              {/* Dynamic Limited Time Badge */}
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white px-8 py-4 rounded-full text-sm font-bold mb-8 animate-bounce shadow-2xl">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                <span>⚡ EXCLUSIVE: Only 50 Spots Available This Month ⚡</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl mb-8 leading-tight font-extrabold lg:text-5xl">
                Transform Your Business with a 
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent animate-pulse">$6,300 Website</span>
                <br />
                <span className="text-4xl md:text-6xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent my-0 py-0 mx-0 lg:text-4xl">100% FREE</span>
              </h1>
              
              <p className="text-2xl md:text-3xl mb-8 text-cyan-200 max-w-5xl mx-auto leading-relaxed font-semibold">
                🚀 Professional websites that convert visitors into customers
                <br />
                <span className="text-xl text-purple-200 font-extrabold">Built with cutting-edge tech for ambitious businesses ready to own the digital space</span>
              </p>
              
              <p className="text-xl mb-8 max-w-4xl mx-auto text-blue-200 font-medium">
                Join thriving businesses. Complete website delivered in just 14 days.
              </p>

              {/* Community Message */}
              <div className="bg-gradient-to-r from-emerald-500/30 to-teal-500/30 backdrop-blur-lg border border-emerald-400/50 rounded-3xl p-8 mb-12 max-w-5xl mx-auto shadow-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-emerald-300 mb-6">Communities to Thrive</h2>
                <p className="text-xl text-white leading-relaxed">
                  We believe every business deserves success online. That's why we're investing in communities 
                  across California with our exclusive support program - turning dreams into digital reality.
                </p>
              </div>

              {/* Dynamic Stats Grid - Removed 23,435 number */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                <div className="text-center p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-3xl border border-green-400/30 hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl md:text-5xl font-black text-green-400 mb-2">$6,300</div>
                  <div className="text-green-200 font-semibold">Total Value</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-3xl border border-blue-400/30 hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl md:text-5xl font-black text-cyan-400 mb-2">$0</div>
                  <div className="text-cyan-200 font-semibold">Your Investment</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-lg rounded-3xl border border-orange-400/30 hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl md:text-5xl font-black text-orange-400 mb-2">14</div>
                  <div className="text-orange-200 font-semibold">Days to Launch</div>
                </div>
              </div>

              {/* Dynamic CTA Button */}
              <a href="#application" className="inline-flex items-center space-x-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white text-2xl font-black py-6 px-12 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-green-500/50 animate-pulse">
                <span>🎯 Claim My FREE $6,300 Website</span>
                <ArrowRight className="h-8 w-8" />
              </a>
            </div>

            {/* Website Showcase */}
            <div className="relative max-w-6xl mx-auto">
              <div className="bg-gradient-to-r from-white/10 to-purple-500/10 backdrop-blur-xl p-8 shadow-2xl border border-white/20 rounded-3xl">
                <div className="relative h-80 md:h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-inner">
                  <img src={websiteShowcase[currentSlide].image} alt={websiteShowcase[currentSlide].name} className="w-full h-full transition-all duration-700 object-contain hover:scale-105" />
                  <div className="absolute bottom-6 left-6 bg-gradient-to-r from-black/90 to-purple-900/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl shadow-lg">
                    <span className="font-bold text-lg">{websiteShowcase[currentSlide].name}</span>
                  </div>
                </div>
                <div className="flex justify-center mt-8 space-x-4">
                  {websiteShowcase.map((_, index) => (
                    <div
                      key={index}
                      className={`w-4 h-4 rounded-full transition-all duration-500 cursor-pointer ${
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
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8">
                Why Your Business Needs a 
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Digital Powerhouse</span>
              </h2>
              <p className="text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed font-medium">
                Your website is your 24/7 sales machine. It builds trust, showcases your expertise, 
                and converts visitors into loyal customers while you sleep.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-purple-200 transform hover:-translate-y-3 hover:scale-105">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Support - Vibrant Design */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8">
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">Communities</span> to Thrive
              </h2>
              <p className="text-2xl text-slate-700 max-w-5xl mx-auto leading-relaxed font-medium">
                We believe every business deserves success online. That's why we're investing in communities 
                across California with our exclusive support program.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
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
              }].map((item, index) => <div key={index} className="flex items-start space-x-6">
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <CheckCircle className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600 text-lg">{item.desc}</p>
                  </div>
                </div>)}
            </div>

            <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-red-100 p-10 rounded-3xl border-l-8 border-orange-500 shadow-xl">
              <h3 className="text-3xl font-black text-slate-900 mb-6">🎯 Our Mission</h3>
              <p className="text-xl text-slate-800 mb-8 leading-relaxed">
                Every free website we create helps a business owner support their family, hire employees, 
                and strengthen their local community. We're not just building websites—we're building dreams and futures.
              </p>
              <div className="bg-gradient-to-r from-orange-200 to-red-200 border-2 border-orange-300 rounded-2xl p-6 shadow-inner">
                <p className="text-xl font-bold text-orange-900 flex items-center">
                  <Clock className="h-6 w-6 mr-3" />
                  ⚡ Only 50 businesses selected each month - Apply now before spots fill up!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Value Comparison - New Design */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8">
                Market Value vs. <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Your Investment</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                See the incredible value you're getting with our community support program
              </p>
            </div>
            
            {/* New Table Design */}
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden mb-12">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="grid grid-cols-3 gap-4 font-bold text-lg">
                  <div>Service</div>
                  <div className="text-center">Market Rate</div>
                  <div className="text-center text-green-300">CloudMor</div>
                </div>
              </div>
              
              <div className="divide-y divide-slate-100">
                {[
                  ["Professional Design", "$3,000"],
                  ["Custom Logo Design", "$500"],
                  ["Mobile Optimization", "$800"],
                  ["SEO Setup", "$1,200"],
                  ["Security Features", "$500"],
                  ["Content Management", "$800"],
                  ["Domain & Hosting Setup", "$300"],
                  ["SSL Certificate", "$200"],
                  ["Analytics Integration", "$400"],
                  ["Social Media Integration", "$300"]
                ].map(([service, price], index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 p-6 hover:bg-slate-50 transition-colors">
                    <div className="text-slate-700 font-medium">{service}</div>
                    <div className="text-center text-red-600 font-semibold">{price}</div>
                    <div className="text-center text-green-600 font-bold text-xl">FREE</div>
                  </div>
                ))}
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-t-4 border-green-400 grid grid-cols-3 gap-4 p-8">
                  <div className="text-xl font-bold text-slate-900">TOTAL VALUE</div>
                  <div className="text-center text-3xl font-bold text-red-600">$6,800+</div>
                  <div className="text-center text-4xl font-bold text-green-600">$0</div>
                </div>
              </div>
            </div>

            {/* Additional Value Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Premium Security",
                  value: "$500",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  icon: Zap,
                  title: "Speed Optimization",
                  value: "$400",
                  gradient: "from-yellow-500 to-orange-500"
                },
                {
                  icon: TrendingUp,
                  title: "SEO Foundation",
                  value: "$1,200",
                  gradient: "from-green-500 to-emerald-500"
                },
                {
                  icon: Users,
                  title: "Ongoing Support",
                  value: "$800",
                  gradient: "from-blue-500 to-cyan-500"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-4`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <div className="text-sm text-slate-600 mb-2">Market Value:</div>
                  <div className="text-2xl font-bold text-red-600">{item.value}</div>
                  <div className="text-lg font-bold text-green-600 mt-1">FREE</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* New Process Timeline Design */}
      <section className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                From Application to <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Launch in 14 Days</span>
              </h2>
              <p className="text-xl text-purple-200 max-w-3xl mx-auto">
                Our streamlined process ensures your website is delivered on time, every time
              </p>
            </div>

            <div className="relative">
              {/* Dotted Line Connection */}
              <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 border-t-2 border-dotted border-cyan-400/50"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
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
                    {/* Step Circle */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl relative z-10 border-4 border-white`}>
                      <span className="text-white font-bold text-xl">{item.step}</span>
                    </div>
                    
                    {/* Content Card */}
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                      <div className="text-sm font-semibold text-cyan-300 mb-2">{item.days}</div>
                      <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-purple-200 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
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

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Success Stories from <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Real Businesses</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[{
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
              }].map((testimonial, index) => <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
                  </div>
                  <blockquote className="text-slate-700 mb-6 text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <footer className="border-t border-slate-100 pt-4">
                    <div className="font-semibold text-slate-900">{testimonial.author}</div>
                    <div className="text-slate-600 text-sm">{testimonial.business}</div>
                  </footer>
                </div>)}
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

      {/* Success Stories at Bottom - New Design */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Join Our Growing Community</h2>
              <p className="text-xl text-purple-200">Real businesses achieving real results</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border border-yellow-400/30 rounded-3xl p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-black text-yellow-400 mb-3">23,435</div>
                <div className="text-yellow-200 font-semibold text-lg">Success Stories</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg border border-green-400/30 rounded-3xl p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-black text-green-400 mb-3">$6,300</div>
                <div className="text-green-200 font-semibold text-lg">Total Value</div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border border-blue-400/30 rounded-3xl p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-black text-cyan-400 mb-3">$0</div>
                <div className="text-cyan-200 font-semibold text-lg">Your Investment</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-purple-400/30 rounded-3xl p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-black text-purple-400 mb-3">14</div>
                <div className="text-purple-200 font-semibold text-lg">Days to Launch</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with California message */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <img src="/lovable-uploads/691e7939-254c-4028-91c9-7c00fd9a8db8.png" alt="CloudMor Logo" className="h-16 mx-auto mb-6" />
              <p className="text-xl text-slate-300 mb-4">
                Technology experts from the heart of California
              </p>
              <p className="text-slate-400">
                Made with ❤️ helping businesses from California
              </p>
            </div>
            
            <div className="border-t border-slate-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-slate-400 text-sm mb-4 md:mb-0">
                  &copy; {new Date().getFullYear()} CloudMor. All rights reserved.
                </p>
                <div className="flex space-x-6">
                  <a href="/privacy-policy" className="text-slate-400 hover:text-white text-sm transition-colors">
                    Privacy Policy
                  </a>
                  <a href="/contact" className="text-slate-400 hover:text-white text-sm transition-colors">
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

import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FeatureGrid from "../../components/FeatureGrid";
import BenefitsSection from "../../components/BenefitsSection";
import ProcessTimeline from "../../components/ProcessTimeline";
import UseCaseSection from "../../components/UseCaseSection";
import FinalCTA from "../../components/FinalCTA";
import ContactForm from "../../components/ContactForm";
import PhoneButton from "../../components/ui/phone-button";
import { Headphones, MessageSquare, Video, Users, Mic, Phone, Check } from 'lucide-react';
import { Card, CardContent } from "../../components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../components/ui/carousel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import { Link } from 'react-router-dom';

const BusinessComms = () => {
  const features = [{
    icon: <Headphones className="h-6 w-6 text-white" />,
    title: "Unified Communications",
    description: "Integrate all your communication channels into one seamless platform.",
    items: ["Voice calling with enterprise-grade VoIP functionality", "Text messaging (SMS/MMS) from business phone numbers", "Video conferencing and screen sharing capabilities", "Team messaging and collaboration tools", "All accessible from desktop, mobile, or web platforms"]
  }, {
    icon: <Mic className="h-6 w-6 text-white" />,
    title: "Advanced Call Center Features",
    description: "Enhance customer service with professional call management tools.",
    items: ["Intelligent call routing and distribution", "Real-time coaching and agent scripting", "Dynamic caller ID based on customer location", "Call recording and analytics for quality improvement", "Interactive voice response (IVR) systems"]
  }, {
    icon: <Users className="h-6 w-6 text-white" />,
    title: "Customer Relationship Management",
    description: "Track and manage customer interactions across all channels.",
    items: ["Integrated CRM with communication history", "Lead management and distribution capabilities", "Automated workflows for customer follow-up", "Performance analytics and reporting", "Customer interaction tracking across all channels"]
  }, {
    icon: <MessageSquare className="h-6 w-6 text-white" />,
    title: "Business Productivity Tools",
    description: "Streamline operations with integrated business tools.",
    items: ["Document sharing and collaboration features", "Calendar integration and appointment scheduling", "Contact management and directory services", "Mobile apps for on-the-go communication", "Third-party software integrations"]
  }];
  const benefits = [{
    icon: <Users className="h-6 w-6" />,
    title: "Enhanced Productivity",
    description: "Reduce time spent switching between communication tools and improve team collaboration with a unified platform that connects all your business communications."
  }, {
    icon: <Headphones className="h-6 w-6" />,
    title: "Improved Customer Experience",
    description: "Deliver consistent, professional communication across all channels while maintaining complete visibility into customer interactions and history."
  }, {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Cost Optimization",
    description: "Eliminate multiple vendor relationships and reduce communication costs while gaining access to enterprise-grade features typically available only to large corporations."
  }, {
    icon: <Video className="h-6 w-6" />,
    title: "Scalability",
    description: "Easily add users, features, and capabilities as your business grows, with flexible pricing that scales with your needs."
  }, {
    icon: <Mic className="h-6 w-6" />,
    title: "Security and Reliability",
    description: "Enterprise-grade security features, 99.9% uptime guarantee, and compliance with industry regulations ensure your communications are always secure and available."
  }];
  const processSteps = [{
    number: 1,
    title: "Assessment",
    description: "We evaluate your current communication tools and requirements to understand your unique business needs."
  }, {
    number: 2,
    title: "Design",
    description: "Our team creates a customized solution that meets your specific needs and business goals."
  }, {
    number: 3,
    title: "Migration",
    description: "We seamlessly transition from your existing systems with minimal disruption to your business operations."
  }, {
    number: 4,
    title: "Training",
    description: "Comprehensive training for all users ensures quick adoption of new features and capabilities."
  }, {
    number: 5,
    title: "Optimization",
    description: "Ongoing monitoring and optimization maximize the value of your communication platform."
  }];
  const useCases = [{
    icon: <Headphones className="h-6 w-6 text-white" />,
    title: "Call Centers",
    description: "Optimize customer service operations with advanced call management and routing."
  }, {
    icon: <Users className="h-6 w-6 text-white" />,
    title: "Sales Teams",
    description: "Enhance lead management and follow-up with integrated communication tools."
  }, {
    icon: <Video className="h-6 w-6 text-white" />,
    title: "Remote Teams",
    description: "Connect distributed teams with powerful collaboration and video conferencing."
  }, {
    icon: <MessageSquare className="h-6 w-6 text-white" />,
    title: "Professional Services",
    description: "Manage client communications efficiently with integrated messaging and tracking."
  }];

  return <>
      <Navbar />
      <main>
        {/* Merged Hero Section */}
        <section className="py-16 bg-gradient-to-b from-gowith-dark-blue to-blue-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 md:text-2xl mx-0 my-[50px]">Unified Business Communications Platform</h1>
              <p className="text-xl text-gowith-light-blue mb-6">
                Streamline your team collaboration and customer communications with an all-in-one solution
              </p>
              
              
              
            </div>
            <div className="max-w-4xl mx-auto text-center mt-12">
              <h3 className="text-2xl font-bold mb-4">All the features of a world-class cloud phone system in one app</h3>
              <p className="text-lg text-gowith-light-blue">
                Utilize one simple platform for all your important conversations and empower your business.
              </p>
            </div>
          </div>
        </section>
        
        {/* Pricing Section - NEW */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gowith-dark-blue mb-4">PLANS THAT WORK FOR YOUR BUSINESS-AND YOUR WALLET</h2>
              <p className="text-gray-600 mb-8 text-lg">VOICE FEATURES & PRICING MODEL</p>
              
            </div>
            
            <div className="max-w-5xl mx-auto">
              <Tabs defaultValue="annually" className="w-full mb-8">
                <TabsList className="grid w-[200px] grid-cols-2 mx-auto">
                  <TabsTrigger value="annually">Annually</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
                
                <TabsContent value="annually" className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Essentials Plan */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="p-6 border-b">
                        <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">Essentials</h3>
                        <p className="text-gray-600 mb-4">A reliable voice solution to get your business up and running</p>
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">Starting at</p>
                          <p className="text-4xl font-bold text-gowith-dark-blue">$24.95</p>
                          <p className="text-sm text-gray-500">Per User*</p>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="font-medium mb-4">Additional Features Include</p>
                        <ul className="space-y-3 mb-6">
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Unlimited Calling</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>High-definition (HD) voice</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Desktop App (Windows, Mac)</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Mobile Apps (Apple, Android)</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Business Chat</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Business SMS & MMS</span>
                          </li>
                        </ul>
                        <Button className="w-full bg-gowith-orange hover:bg-gowith-orange-hover">
                          <Link to="/contact" className="w-full">Get started</Link>
                        </Button>
                      </div>
                    </div>
                    
                    {/* Standard Plan */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative">
                      <div className="absolute top-0 right-0 bg-gowith-orange text-white px-3 py-1 text-sm font-medium">
                        Popular
                      </div>
                      <div className="p-6 border-b">
                        <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">Standard</h3>
                        <p className="text-gray-600 mb-4">A supercharged telephone system to help boost productivity and performance</p>
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">Starting at</p>
                          <p className="text-4xl font-bold text-gowith-dark-blue">$34.99</p>
                          <p className="text-sm text-gray-500">Per User*</p>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="font-medium mb-4">Includes Everything in Essentials, Plus</p>
                        <ul className="space-y-3 mb-6">
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Ring Groups</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Call log reports</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Audio Conferencing</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Video Conferencing</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Video Meeting & Recording</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Access to Zendesk, Hubspot, Google and Microsoft 365 contacts + apps</span>
                          </li>
                        </ul>
                        <Button className="w-full bg-gowith-orange hover:bg-gowith-orange-hover">
                          <Link to="/contact" className="w-full">Get started</Link>
                        </Button>
                      </div>
                    </div>
                    
                    {/* Enterprise Plan */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="p-6 border-b">
                        <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">Enterprise</h3>
                        <p className="text-gray-600 mb-4">A suite of complete and customized communications packages with powerful features for your business needs</p>
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">Starting at</p>
                          <p className="text-4xl font-bold text-gowith-dark-blue">$44.99</p>
                          <p className="text-sm text-gray-500">Per User*</p>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="font-medium mb-4">Includes Everything in Standard, Plus</p>
                        <ul className="space-y-3 mb-6">
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Call Center Dashboard</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Supervisor Panel</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Live Monitoring & Coaching</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Call Center Queues</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Dynamic Caller ID-Automated</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Call Center Reporting</span>
                          </li>
                        </ul>
                        <Button className="w-full bg-gowith-orange hover:bg-gowith-orange-hover">
                          <Link to="/contact" className="w-full">Get started</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="monthly" className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Monthly pricing content - same structure but with different prices */}
                    {/* Essentials Plan Monthly */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="p-6 border-b">
                        <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">Essentials</h3>
                        <p className="text-gray-600 mb-4">A reliable voice solution to get your business up and running</p>
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">Starting at</p>
                          <p className="text-4xl font-bold text-gowith-dark-blue">$29.95</p>
                          <p className="text-sm text-gray-500">Per User*</p>
                        </div>
                      </div>
                      <div className="p-6">
                        {/* Same features as annual */}
                        <p className="font-medium mb-4">Additional Features Include</p>
                        <ul className="space-y-3 mb-6">
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Unlimited Calling</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>High-definition (HD) voice</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Desktop App (Windows, Mac)</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Mobile Apps (Apple, Android)</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Business Chat</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Business SMS & MMS</span>
                          </li>
                        </ul>
                        <Button className="w-full bg-gowith-orange hover:bg-gowith-orange-hover">
                          <Link to="/contact" className="w-full">Get started</Link>
                        </Button>
                      </div>
                    </div>
                    
                    {/* Standard Plan Monthly */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative">
                      <div className="absolute top-0 right-0 bg-gowith-orange text-white px-3 py-1 text-sm font-medium">
                        Popular
                      </div>
                      <div className="p-6 border-b">
                        <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">Standard</h3>
                        <p className="text-gray-600 mb-4">A supercharged telephone system to help boost productivity and performance</p>
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">Starting at</p>
                          <p className="text-4xl font-bold text-gowith-dark-blue">$39.99</p>
                          <p className="text-sm text-gray-500">Per User*</p>
                        </div>
                      </div>
                      <div className="p-6">
                        {/* Same features as annual */}
                        <p className="font-medium mb-4">Includes Everything in Essentials, Plus</p>
                        <ul className="space-y-3 mb-6">
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Ring Groups</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Call log reports</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Audio Conferencing</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Video Conferencing</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Video Meeting & Recording</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Access to Zendesk, Hubspot, Google and Microsoft 365 contacts + apps</span>
                          </li>
                        </ul>
                        <Button className="w-full bg-gowith-orange hover:bg-gowith-orange-hover">
                          <Link to="/contact" className="w-full">Get started</Link>
                        </Button>
                      </div>
                    </div>
                    
                    {/* Enterprise Plan Monthly */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="p-6 border-b">
                        <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">Enterprise</h3>
                        <p className="text-gray-600 mb-4">A suite of complete and customized communications packages with powerful features for your business needs</p>
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">Starting at</p>
                          <p className="text-4xl font-bold text-gowith-dark-blue">$49.99</p>
                          <p className="text-sm text-gray-500">Per User*</p>
                        </div>
                      </div>
                      <div className="p-6">
                        {/* Same features as annual */}
                        <p className="font-medium mb-4">Includes Everything in Standard, Plus</p>
                        <ul className="space-y-3 mb-6">
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Call Center Dashboard</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Supervisor Panel</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Live Monitoring & Coaching</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Call Center Queues</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Dynamic Caller ID-Automated</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-gowith-light-blue mr-2" />
                            <span>Call Center Reporting</span>
                          </li>
                        </ul>
                        <Button className="w-full bg-gowith-orange hover:bg-gowith-orange-hover">
                          <Link to="/contact" className="w-full">Get started</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              {/* Add-on Section */}
              <div className="bg-gray-50 rounded-lg p-6 mt-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div>
                    <span className="bg-gowith-orange text-white text-xs py-1 px-2 rounded mb-2 inline-block">Add-on</span>
                    <h3 className="text-xl font-bold text-gowith-dark-blue">CloudMor Guide</h3>
                    <p className="text-gray-600">Self-service agent scripting, automated workflows, and analytics to optimize your call center.</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Button className="bg-gowith-orange hover:bg-gowith-orange-hover">
                      <Link to="/contact">Learn More</Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* FAQs */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gowith-dark-blue mb-6 text-center">FAQs</h3>
                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    
                    <p className="text-gray-600">As an all-in-one virtual phone system,  CloudMor Voice can be used for customer support, as a contact center, or simply as a customer support tool. We also offer a solution that is suitable for companies operating remotely or with multiple locations at the same time.</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-gowith-dark-blue mb-2">Does CloudMor Voice offer free trials?</h4>
                    <p className="text-gray-600">Contact our sales department to take advantage of our limited time offer for a seven-day free trial. Start dialing immediately and enjoy all our features and integrations for two weeks.</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-gowith-dark-blue mb-2">How often can I change my billing plan?</h4>
                    <p className="text-gray-600">Plans billed annually can only be upgraded to a higher tier plan (e.g. From Essential to Standard). It's not possible to downgrade on annual billing.</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-gowith-dark-blue mb-2">Does my CloudMor Voice plan include unlimited calling?</h4>
                    <p className="text-gray-600">With Voice, you can make unlimited VoIP calls and conference calls using the Voice app to anyone in your organization. Calls to the US and Canada are unlimited for external calls. Voice's international calling plans and bundles offer affordable rates when making international calls.</p>
                  </div>
                </div>
              </div>
              
              {/* Disclaimers */}
              <div className="mt-12 text-xs text-gray-500">
                <h4 className="font-medium mb-2">Information and Disclaimers</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>New subscribers are only eligible for the free trial. There is a limit of five users and two desktop phones per trial. Hardware returned within 21 days of trial cancellation will not be charged. The use of SMS is not available as a trial.</li>
                  <li>Acceptable Use policies apply to all plans.</li>
                  <li>Enhanced Business SMS is subject to our SMS/MMS content policies, including volume and frequency limitations.</li>
                  <li>Rental phones are only available with multi-year contracts.</li>
                  <li>For two users and above, professional implementation is available.</li>
                  <li>Additional taxes and fees may apply, including the Federal Universal Service Recovery Fee, the E911 Fee, the Compliance and Administrative Cost Recovery Fee, and the 911 Fee.</li>
                  <li>We offer options to purchase additional numbers and toll-free minutes.</li>
                  <li>All international calls will be charged at the rates listed in our table of international rates.</li>
                  <li>There are no unlimited phone calls outside of the US or CA.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Overview Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6">Platform Overview</h2>
              <p className="text-lg text-gray-600 mb-8">CloudMor's Business Communications Platform integrates voice, messaging, video, and collaboration tools into a single, secure environment. Designed for modern businesses, our solution eliminates the complexity of managing multiple communication systems while enhancing productivity, improving customer relationships, and reducing operational costs.</p>
            </div>
          </div>
        </section>
        
        {/* Platform UI Examples */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-4">Platform Interface</h2>
              <p className="text-lg text-gray-600 mb-8">
                Experience our intuitive, feature-rich communication platform designed for modern businesses
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <Carousel className="w-full">
                <CarouselContent>
                  <CarouselItem>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex items-center justify-center p-6">
                          <div className="relative overflow-hidden rounded-lg shadow-xl">
                            <img src="/lovable-uploads/ae064278-371c-4c0b-a8d5-5c1e57a9c7d1.png" alt="An Advanced Phone System That Meets Today's Business Needs" className="w-full object-cover" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex items-center justify-center p-6">
                          <div className="relative overflow-hidden rounded-lg shadow-xl">
                            <img src="/lovable-uploads/73a7901d-ffe4-433c-ba2e-86355fbf9f00.png" alt="Empower Your Team" className="w-full object-cover" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex items-center justify-center p-6">
                          <div className="relative overflow-hidden rounded-lg shadow-xl">
                            <img src="/lovable-uploads/d14591a0-5690-4ddf-99ca-b2144172f86c.png" alt="Easy-To-Use And Effective Business Texting" className="w-full object-cover" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex items-center justify-center p-6">
                          <div className="relative overflow-hidden rounded-lg shadow-xl">
                            <img src="/lovable-uploads/cdbfa0fa-7893-4974-9cc1-a27e1e325c14.png" alt="Reimagine The Way You Meet" className="w-full object-cover" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex items-center justify-center p-6">
                          <div className="relative overflow-hidden rounded-lg shadow-xl">
                            <img src="/lovable-uploads/33683319-9c3a-4e4c-aabb-6ebb320ff02e.png" alt="Effective And Simple Team Collaboration" className="w-full object-cover" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex items-center justify-center p-6">
                          <div className="relative overflow-hidden rounded-lg shadow-xl">
                            <img src="/lovable-uploads/4e5602a4-78e4-489f-a23f-17fbb354874a.png" alt="Call Center Platform" className="w-full object-cover" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="lg:-left-16" />
                <CarouselNext className="lg:-right-16" />
              </Carousel>
            </div>
          </div>
        </section>
        
        {/* Reimagine The Way You Meet Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-8 text-center">Reimagine The Way You Meet</h2>
              
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="bg-gowith-light-blue p-4 rounded-full">
                    <Video className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">Connected on the go</h3>
                    <p className="text-gray-600">
                      You can switch from a phone call to a video meeting in a click between your desktop and mobile apps.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="bg-gowith-light-blue p-4 rounded-full">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">Connect with your clients</h3>
                    <p className="text-gray-600">
                      Schedule or send invites to your contacts. Build trust and increase communication between your brand and clients.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="bg-gowith-light-blue p-4 rounded-full">
                    <MessageSquare className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">Support and collaborate</h3>
                    <p className="text-gray-600">
                      With a selection of features designed to enhance and enable effective collaboration, screen sharing tool makes information sharing and collaboration more efficient and productive.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Integrations Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-4">SUPPORTED INTEGRATIONS</h2>
              <p className="text-lg text-gray-600 mb-10">Connect the tools and services that you use every day to automate work for users.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                
              </div>
            </div>
          </div>
        </section>
        
        {/* Unified Communications Platform Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gowith-dark-blue mb-4">Unified Communications Platform</h2>
                <p className="text-lg text-gray-600 mb-6">By centralizing global voice, and messaging into an all-in-one platform, CloudMor Voice makes it easy for businesses to empower quality interactions without the complexity of traditional communication methods.</p>
                <p className="text-lg text-gray-600">
                  With our industry-leading tools and insights, you will be able to master every conversation quickly, cost-effectively, and without disrupting your business.
                </p>
              </div>
              
              <div className="bg-gowith-light-blue bg-opacity-10 p-8 rounded-xl">
                <h2 className="text-3xl font-bold text-gowith-dark-blue mb-4">Call Center Platform</h2>
                <p className="text-lg text-gray-600 mb-6">
                  All the tools you need for your call center are available in one easy-to-use, browser-based platform. Utilize real-time coaching, agent scripting, dynamic caller ID, and a unified interface for voice and digital interactions to improve customer relationships.
                </p>
                <p className="text-lg font-medium text-gowith-dark-blue">
                  Are you still not convinced? Why not take a closer look and see for yourself?
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Key Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-4">Key Features</h2>
              <p className="text-lg text-gray-600">Comprehensive tools to transform your business communications</p>
            </div>
            
            <FeatureGrid features={features} />
          </div>
        </section>
        
        {/* Benefits */}
        <BenefitsSection benefits={benefits} />
        
        {/* Implementation Process */}
        <ProcessTimeline steps={processSteps} />
        
        {/* Industry Applications */}
        <UseCaseSection useCases={useCases} />
        
        {/* Contact Form Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6">Ready to Transform Your Business Communications?</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our Business Communications Platform is designed to help your business communicate more effectively, both internally and with customers. Contact us today to request a demo of our products and get an in-depth understanding of how it can help your business.
                </p>
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                  <h3 className="text-xl font-bold text-gowith-dark-blue mb-4">What to Expect in Your Demo</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gowith-light-blue flex items-center justify-center text-white font-bold mr-3">1</div>
                      <span>Personalized walkthrough of platform features relevant to your business</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gowith-light-blue flex items-center justify-center text-white font-bold mr-3">2</div>
                      <span>Live Q&A session with our communications specialists</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gowith-light-blue flex items-center justify-center text-white font-bold mr-3">3</div>
                      <span>Custom pricing and implementation timeline</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gowith-light-blue flex items-center justify-center text-white font-bold mr-3">4</div>
                      <span>Clear next steps for getting started</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <PhoneButton phoneNumber="(888) 554-6597" className="flex-grow" />
                </div>
              </div>
              
              <ContactForm formTitle="Request a Demo" formDescription="Fill out the form below and one of our experts will contact you shortly." buttonText="Submit Request" formType="demo" />
              <p className="text-xs text-gray-500 mt-4 lg:col-span-2">
                You consent to receive calls, SMS, and emails from us by clicking submit. 
                Reply STOP to unsubscribe or HELP for further assistance. Message frequency varies and Msg&Data rates may apply. 
                Reply "unsubscribe" to opt-out. Calls may be connected using automated technology. 
                We will not rent or sell personal information about you.
              </p>
            </div>
          </div>
        </section>
        
        {/* Final CTA */}
        <FinalCTA headline="Transform Your Business Communications Today" buttonText="Schedule a Platform Demo" buttonLink="/contact" />
      </main>
      <Footer />
    </>;
};

export default BusinessComms;

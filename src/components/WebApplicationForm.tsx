
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

const WebApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const steps = [
    { title: "Personal Info", icon: "👤" },
    { title: "Business Details", icon: "🏢" },
    { title: "Design Preferences", icon: "🎨" },
    { title: "Website Goals", icon: "🎯" },
    { title: "Additional Info", icon: "📋" },
    { title: "Review & Submit", icon: "✅" }
  ];

  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    bestTimeToContact: '',
    
    // Business Information
    businessName: '',
    businessIndustry: '',
    businessDescription: '',
    productsServices: '',
    targetAudience: '',
    
    // Domain Information
    hasDomain: '',
    domainName: '',
    hostingProvider: '',
    otherHostingProvider: '',
    domainAccess: '',
    
    // Design Preferences
    colorPreferences: [],
    specificColors: '',
    hasLogo: '',
    canProvideLogo: '',
    logoStyle: '',
    
    // Website Features
    websitePages: [],
    specialFeatures: [],
    existingContent: '',
    
    // Current Online Presence
    hasWebsite: '',
    currentWebsite: '',
    socialMediaAccounts: [],
    
    // Project Goals
    mainGoals: [],
    biggestChallenge: '',
    
    // How did you hear about us
    hearAboutUs: '',
    referralName: '',
    
    // Additional Information
    additionalInfo: '',
    previousExperience: '',
    competitorWebsites: '',
    
    // Agreement
    understandsOffer: false,
    agreesToProvideContent: false,
    preferredContact: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name.includes('[]')) {
        const fieldName = name.replace('[]', '');
        setFormData(prev => ({
          ...prev,
          [fieldName]: checked 
            ? [...prev[fieldName], value]
            : prev[fieldName].filter(item => item !== value)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.understandsOffer || !formData.agreesToProvideContent) {
      toast.error("Please agree to the terms before submitting.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const submissionData = {
        first_name: formData.fullName.split(' ')[0] || '',
        last_name: formData.fullName.split(' ').slice(1).join(' ') || '',
        email: formData.email,
        phone: formData.phone || null,
        company: formData.businessName || null,
        subject: "FREE $6,300 Website Application",
        message: `
Business Industry: ${formData.businessIndustry}
Business Description: ${formData.businessDescription}
Products/Services: ${formData.productsServices}
Target Audience: ${formData.targetAudience}
Color Preferences: ${formData.colorPreferences.join(', ')}
Main Goals: ${formData.mainGoals.join(', ')}
Additional Info: ${formData.additionalInfo}
        `,
        form_type: 'web_application',
        request_consultation: true,
        subscribe_newsletter: false,
        preferred_date: null,
        employee_count: null,
        industry: formData.businessIndustry || null,
      };

      const { error } = await supabase
        .from('contact_submissions')
        .insert([submissionData]);

      if (error) {
        console.error('Error submitting form:', error);
        toast.error("Failed to submit your application. Please try again.");
        return;
      }
      
      toast.success("Thank you! Your application has been submitted successfully. We'll review it within 24 hours.");
      
      // Reset form
      setFormData({
        fullName: '', email: '', phone: '', bestTimeToContact: '',
        businessName: '', businessIndustry: '', businessDescription: '',
        productsServices: '', targetAudience: '', hasDomain: '',
        domainName: '', hostingProvider: '', otherHostingProvider: '',
        domainAccess: '', colorPreferences: [], specificColors: '',
        hasLogo: '', canProvideLogo: '', logoStyle: '',
        websitePages: [], specialFeatures: [], existingContent: '',
        hasWebsite: '', currentWebsite: '', socialMediaAccounts: [],
        mainGoals: [], biggestChallenge: '', hearAboutUs: '',
        referralName: '', additionalInfo: '', previousExperience: '',
        competitorWebsites: '', understandsOffer: false,
        agreesToProvideContent: false, preferredContact: ''
      });
      setCurrentStep(0);
      
    } catch (error) {
      console.error('Failed to submit form:', error);
      toast.error("Failed to submit your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Personal Information
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName" className="text-lg font-semibold">Your Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  className="mt-2 p-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-lg font-semibold">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                  className="mt-2 p-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone" className="text-lg font-semibold">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="(123) 456-7890"
                  className="mt-2 p-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="bestTimeToContact" className="text-lg font-semibold">Best Time to Contact You *</Label>
                <select
                  id="bestTimeToContact"
                  name="bestTimeToContact"
                  value={formData.bestTimeToContact}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full p-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                >
                  <option value="">Select time</option>
                  <option value="morning">Morning (9 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                  <option value="evening">Evening (5 PM - 8 PM)</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 1: // Business Information
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Business Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="businessName" className="text-lg font-semibold">Business Name *</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  required
                  placeholder="Your business name"
                  className="mt-2 p-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="businessIndustry" className="text-lg font-semibold">Business Industry/Category *</Label>
                <select
                  id="businessIndustry"
                  name="businessIndustry"
                  value={formData.businessIndustry}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full p-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                >
                  <option value="">Select industry</option>
                  <option value="Restaurant/Food Service">Restaurant/Food Service</option>
                  <option value="Healthcare/Medical">Healthcare/Medical</option>
                  <option value="Legal Services">Legal Services</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Retail/E-commerce">Retail/E-commerce</option>
                  <option value="Construction/Contracting">Construction/Contracting</option>
                  <option value="Beauty/Salon">Beauty/Salon</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Technology/IT">Technology/IT</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Education/Training">Education/Training</option>
                  <option value="Non-Profit">Non-Profit</option>
                  <option value="Photography/Creative">Photography/Creative</option>
                  <option value="Fitness/Wellness">Fitness/Wellness</option>
                  <option value="Professional Services">Professional Services</option>
                  <option value="Other">Other (Please Specify)</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="businessDescription" className="text-lg font-semibold">Tell Us About Your Business *</Label>
              <Textarea
                id="businessDescription"
                name="businessDescription"
                value={formData.businessDescription}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Please write about your business - what you do, how long you've been in business, your location, and what makes you different from competitors."
                className="mt-2 p-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="productsServices" className="text-lg font-semibold">What Products or Services Do You Offer? *</Label>
              <Textarea
                id="productsServices"
                name="productsServices"
                value={formData.productsServices}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Please list and describe all the products or services you provide to your customers."
                className="mt-2 p-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="targetAudience" className="text-lg font-semibold">Who Is Your Target Audience? *</Label>
              <Textarea
                id="targetAudience"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                required
                rows={3}
                placeholder="Describe your ideal customers (age, location, interests, needs, etc.)"
                className="mt-2 p-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              />
            </div>
          </div>
        );

      case 2: // Design Preferences
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Design Preferences</h3>
            
            <div>
              <Label className="text-lg font-semibold mb-4 block">What colors would you like for your website design? *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: 'Blue (Professional, Trustworthy)', color: 'bg-blue-500' },
                  { value: 'Green (Natural, Growth, Health)', color: 'bg-green-500' },
                  { value: 'Red (Bold, Energetic, Urgent)', color: 'bg-red-500' },
                  { value: 'Black (Elegant, Sophisticated)', color: 'bg-black' },
                  { value: 'White/Gray (Clean, Modern, Minimal)', color: 'bg-gray-400' },
                  { value: 'Orange (Creative, Friendly, Energetic)', color: 'bg-orange-500' },
                  { value: 'Purple (Luxury, Creative, Unique)', color: 'bg-purple-500' },
                  { value: 'Yellow (Happy, Optimistic)', color: 'bg-yellow-500' },
                  { value: 'Pink (Feminine, Caring, Creative)', color: 'bg-pink-500' },
                  { value: 'Brown (Reliable, Natural, Earthy)', color: 'bg-amber-700' },
                  { value: "I'm not sure - please recommend colors", color: 'bg-gradient-to-r from-blue-500 to-purple-500' }
                ].map((color) => (
                  <label key={color.value} className="flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-xl hover:border-blue-300 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      name="colorPreferences[]"
                      value={color.value}
                      checked={formData.colorPreferences.includes(color.value)}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded"
                    />
                    <div className={`w-6 h-6 rounded-full ${color.color}`}></div>
                    <span className="text-sm font-medium">{color.value}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="specificColors" className="text-lg font-semibold">Do you have any specific color preferences or brand colors?</Label>
              <Input
                id="specificColors"
                name="specificColors"
                value={formData.specificColors}
                onChange={handleInputChange}
                placeholder="If you have specific colors (like hex codes #000000) or color combinations, please list them here."
                className="mt-2 p-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              />
            </div>
          </div>
        );

      case 3: // Website Goals
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Website Goals</h3>
            
            <div>
              <Label className="text-lg font-semibold mb-4 block">What is your main goal for this website? *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: 'Generate more leads/customers', icon: '🎯' },
                  { value: 'Establish professional online presence', icon: '🏢' },
                  { value: 'Sell products online', icon: '🛒' },
                  { value: 'Provide information to customers', icon: 'ℹ️' },
                  { value: 'Build brand awareness', icon: '📢' },
                  { value: 'Replace outdated website', icon: '🔄' },
                  { value: 'Compete with competitors online', icon: '⚡' },
                  { value: 'Other (Please Specify)', icon: '📝' }
                ].map((goal) => (
                  <label key={goal.value} className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      name="mainGoals[]"
                      value={goal.value}
                      checked={formData.mainGoals.includes(goal.value)}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded"
                    />
                    <span className="text-xl">{goal.icon}</span>
                    <span className="text-sm font-medium">{goal.value}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="biggestChallenge" className="text-lg font-semibold">What is your biggest challenge with your current online presence?</Label>
              <Textarea
                id="biggestChallenge"
                name="biggestChallenge"
                value={formData.biggestChallenge}
                onChange={handleInputChange}
                rows={4}
                placeholder="Please explain any problems with your current website, lack of online presence, or digital marketing challenges you're facing."
                className="mt-2 p-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="hearAboutUs" className="text-lg font-semibold">Where did you first learn about CloudMor? *</Label>
              <select
                id="hearAboutUs"
                name="hearAboutUs"
                value={formData.hearAboutUs}
                onChange={handleInputChange}
                required
                className="mt-2 w-full p-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              >
                <option value="">Select source</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="Google Search">Google Search</option>
                <option value="Referral from friend/family">Referral from friend/family</option>
                <option value="Referral from another business">Referral from another business</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="YouTube">YouTube</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Local directory/listing">Local directory/listing</option>
                <option value="Other">Other (Please Specify)</option>
              </select>
            </div>
          </div>
        );

      case 4: // Additional Information
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Additional Information</h3>
            
            <div>
              <Label htmlFor="additionalInfo" className="text-lg font-semibold">Is there anything specific you want us to know about your business or website needs?</Label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                rows={4}
                placeholder="Please share any specific requirements, special features you need, concerns you have, or anything else you want us to know about your business or website project."
                className="mt-2 p-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="previousExperience" className="text-lg font-semibold">Have you worked with web designers/developers before?</Label>
              <select
                id="previousExperience"
                name="previousExperience"
                value={formData.previousExperience}
                onChange={handleInputChange}
                className="mt-2 w-full p-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              >
                <option value="">Select experience</option>
                <option value="Yes, good experience">Yes, good experience</option>
                <option value="Yes, bad experience">Yes, bad experience</option>
                <option value="No, this is my first time">No, this is my first time</option>
              </select>
            </div>

            <div>
              <Label htmlFor="competitorWebsites" className="text-lg font-semibold">Do you have any competitor websites you like or want to reference?</Label>
              <Textarea
                id="competitorWebsites"
                name="competitorWebsites"
                value={formData.competitorWebsites}
                onChange={handleInputChange}
                rows={3}
                placeholder="Share any website URLs that you like the design or functionality of."
                className="mt-2 p-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="referralName" className="text-lg font-semibold">If referred by someone, who can we thank?</Label>
              <Input
                id="referralName"
                name="referralName"
                value={formData.referralName}
                onChange={handleInputChange}
                placeholder="Optional - help us thank the person who referred you!"
                className="mt-2 p-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              />
            </div>
          </div>
        );

      case 5: // Review & Submit
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Review & Submit</h3>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Application Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Name:</strong> {formData.fullName}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                </div>
                <div>
                  <p><strong>Business:</strong> {formData.businessName}</p>
                  <p><strong>Industry:</strong> {formData.businessIndustry}</p>
                  <p><strong>Goals:</strong> {formData.mainGoals.slice(0, 2).join(', ')}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-start space-x-3 p-4 border-2 border-gray-200 rounded-xl">
                <input
                  type="checkbox"
                  name="understandsOffer"
                  checked={formData.understandsOffer}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-5 h-5 rounded"
                />
                <span className="text-lg font-medium">I understand this is a limited-time offer for selected businesses *</span>
              </label>

              <label className="flex items-start space-x-3 p-4 border-2 border-gray-200 rounded-xl">
                <input
                  type="checkbox"
                  name="agreesToProvideContent"
                  checked={formData.agreesToProvideContent}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-5 h-5 rounded"
                />
                <span className="text-lg font-medium">I agree to provide necessary content and feedback during the design process *</span>
              </label>

              <div>
                <Label htmlFor="preferredContact" className="text-lg font-semibold">Best way to contact me for updates *</Label>
                <select
                  id="preferredContact"
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full p-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                >
                  <option value="">Select contact method</option>
                  <option value="Email">Email</option>
                  <option value="Phone Call">Phone Call</option>
                  <option value="Text Message">Text Message</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8 rounded-3xl shadow-2xl border border-blue-100">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border-2 transition-all duration-300 ${
                index < currentStep 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : index === currentStep 
                    ? 'bg-blue-500 border-blue-500 text-white animate-pulse' 
                    : 'bg-gray-200 border-gray-300 text-gray-500'
              }`}>
                {index < currentStep ? <Check className="h-6 w-6" /> : step.icon}
              </div>
              <span className={`text-xs mt-2 font-medium ${
                index <= currentStep ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Dynamic Content */}
        <div className="min-h-[500px]">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8 border-t border-gray-200">
          <Button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              currentStep === 0 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-500 hover:bg-gray-600 text-white'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Previous</span>
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
              <Check className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={nextStep}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <span>Next</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default WebApplicationForm;

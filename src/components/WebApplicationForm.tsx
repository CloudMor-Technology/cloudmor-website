
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const WebApplicationForm = () => {
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

  const [isSubmitting, setIsSubmitting] = useState(false);

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
      
    } catch (error) {
      console.error('Failed to submit form:', error);
      toast.error("Failed to submit your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fullName">Your Full Name *</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="(123) 456-7890"
              />
            </div>
            <div>
              <Label htmlFor="bestTimeToContact">Best Time to Contact You *</Label>
              <select
                id="bestTimeToContact"
                name="bestTimeToContact"
                value={formData.bestTimeToContact}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-input rounded-md"
              >
                <option value="">Select time</option>
                <option value="morning">Morning (9 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                <option value="evening">Evening (5 PM - 8 PM)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Business Information */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Business Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                required
                placeholder="Your business name"
              />
            </div>
            <div>
              <Label htmlFor="businessIndustry">Business Industry/Category *</Label>
              <select
                id="businessIndustry"
                name="businessIndustry"
                value={formData.businessIndustry}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-input rounded-md"
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

          <div className="mt-4">
            <Label htmlFor="businessDescription">Tell Us About Your Business *</Label>
            <Textarea
              id="businessDescription"
              name="businessDescription"
              value={formData.businessDescription}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder="Please write about your business - what you do, how long you've been in business, your location, and what makes you different from competitors."
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="productsServices">What Products or Services Do You Offer to Your Clients? *</Label>
            <Textarea
              id="productsServices"
              name="productsServices"
              value={formData.productsServices}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder="Please list and describe all the products or services you provide to your customers. Include pricing if you want it displayed on your website."
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="targetAudience">Who Is Your Target Audience? *</Label>
            <Textarea
              id="targetAudience"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleInputChange}
              required
              rows={3}
              placeholder="Describe your ideal customers (age, location, interests, needs, etc.)"
            />
          </div>
        </div>

        {/* Design Preferences */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Design Preferences</h3>
          
          <div className="mb-4">
            <Label>What colors would you like for your website design? *</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {[
                'Blue (Professional, Trustworthy)',
                'Green (Natural, Growth, Health)',
                'Red (Bold, Energetic, Urgent)',
                'Black (Elegant, Sophisticated)',
                'White/Gray (Clean, Modern, Minimal)',
                'Orange (Creative, Friendly, Energetic)',
                'Purple (Luxury, Creative, Unique)',
                'Yellow (Happy, Optimistic, Attention-grabbing)',
                'Pink (Feminine, Caring, Creative)',
                'Brown (Reliable, Natural, Earthy)',
                'I\'m not sure - please recommend colors for my industry'
              ].map((color) => (
                <label key={color} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    name="colorPreferences[]"
                    value={color}
                    checked={formData.colorPreferences.includes(color)}
                    onChange={handleInputChange}
                    className="rounded"
                  />
                  <span>{color}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor="specificColors">Do you have any specific color preferences or brand colors?</Label>
            <Input
              id="specificColors"
              name="specificColors"
              value={formData.specificColors}
              onChange={handleInputChange}
              placeholder="If you have specific colors (like hex codes #000000) or color combinations, please list them here."
            />
          </div>
        </div>

        {/* Website Goals */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Project Goals</h3>
          
          <div className="mb-4">
            <Label>What is your main goal for this website? *</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              {[
                'Generate more leads/customers',
                'Establish professional online presence',
                'Sell products online',
                'Provide information to customers',
                'Build brand awareness',
                'Replace outdated website',
                'Compete with competitors online',
                'Other (Please Specify)'
              ].map((goal) => (
                <label key={goal} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    name="mainGoals[]"
                    value={goal}
                    checked={formData.mainGoals.includes(goal)}
                    onChange={handleInputChange}
                    className="rounded"
                  />
                  <span>{goal}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor="biggestChallenge">What is your biggest challenge with your current online presence?</Label>
            <Textarea
              id="biggestChallenge"
              name="biggestChallenge"
              value={formData.biggestChallenge}
              onChange={handleInputChange}
              rows={3}
              placeholder="Please explain any problems with your current website, lack of online presence, or digital marketing challenges you're facing."
            />
          </div>
        </div>

        {/* How Did You Hear About Us */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">How Did You Hear About Us?</h3>
          
          <div className="mb-4">
            <Label htmlFor="hearAboutUs">Where did you first learn about CloudMor? *</Label>
            <select
              id="hearAboutUs"
              name="hearAboutUs"
              value={formData.hearAboutUs}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-input rounded-md"
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

          <div className="mt-4">
            <Label htmlFor="referralName">If referred by someone, who can we thank?</Label>
            <Input
              id="referralName"
              name="referralName"
              value={formData.referralName}
              onChange={handleInputChange}
              placeholder="Optional - help us thank the person who referred you!"
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h3>
          
          <div className="mt-4">
            <Label htmlFor="additionalInfo">Is there anything specific you want us to know about your business or website needs?</Label>
            <Textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              rows={4}
              placeholder="Please share any specific requirements, special features you need, concerns you have, or anything else you want us to know about your business or website project."
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="previousExperience">Have you worked with web designers/developers before?</Label>
            <select
              id="previousExperience"
              name="previousExperience"
              value={formData.previousExperience}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-input rounded-md"
            >
              <option value="">Select experience</option>
              <option value="Yes, good experience">Yes, good experience</option>
              <option value="Yes, bad experience">Yes, bad experience</option>
              <option value="No, this is my first time">No, this is my first time</option>
            </select>
          </div>

          <div className="mt-4">
            <Label htmlFor="competitorWebsites">Do you have any competitor websites you like or want to reference?</Label>
            <Textarea
              id="competitorWebsites"
              name="competitorWebsites"
              value={formData.competitorWebsites}
              onChange={handleInputChange}
              rows={3}
              placeholder="Share any website URLs that you like the design or functionality of."
            />
          </div>
        </div>

        {/* Agreement */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Agreement & Submission</h3>
          
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              name="understandsOffer"
              checked={formData.understandsOffer}
              onChange={handleInputChange}
              required
              className="mt-1 rounded"
            />
            <span className="text-sm">I understand this is a limited-time offer for selected businesses *</span>
          </label>

          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              name="agreesToProvideContent"
              checked={formData.agreesToProvideContent}
              onChange={handleInputChange}
              required
              className="mt-1 rounded"
            />
            <span className="text-sm">I agree to provide necessary content and feedback during the design process *</span>
          </label>

          <div>
            <Label htmlFor="preferredContact">Best way to contact me for updates *</Label>
            <select
              id="preferredContact"
              name="preferredContact"
              value={formData.preferredContact}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-input rounded-md"
            >
              <option value="">Select contact method</option>
              <option value="Email">Email</option>
              <option value="Phone Call">Phone Call</option>
              <option value="Text Message">Text Message</option>
              <option value="WhatsApp">WhatsApp</option>
            </select>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-md font-bold text-lg"
        >
          {isSubmitting ? "Submitting..." : "Submit My Application for Review"}
        </Button>
      </form>
    </div>
  );
};

export default WebApplicationForm;

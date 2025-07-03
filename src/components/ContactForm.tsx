import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from 'react-router-dom';

interface ContactFormProps {
  formTitle?: string;
  formDescription?: string;
  buttonText?: string;
  formType?: "demo" | "contact" | "trial" | "application";
  showConsultationCheckbox?: boolean;
  initialSubject?: string;
  onSubmitSuccess?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  formTitle = "Get in Touch",
  formDescription = "Fill out the form below and our team will get back to you shortly.",
  buttonText = "Submit Request",
  formType = "contact",
  showConsultationCheckbox = false,
  initialSubject = "",
  onSubmitSuccess,
}) => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    subject: initialSubject,
    message: "",
    preferredDate: "",
    employeeCount: "",
    industry: "",
    requestConsultation: false,
    subscribeNewsletter: false,
    privacyAgreed: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Check URL parameters to determine if this is an application form
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const typeParam = searchParams.get('type');
    
    if (serviceParam === 'web-design' && typeParam === 'application') {
      setFormData(prev => ({
        ...prev,
        subject: "Web Design & Development - Special Offer Application"
      }));
    }
  }, [searchParams]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: checked
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacyAgreed) {
      toast.error("Please agree to the privacy policy before submitting.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Determine actual form type based on URL params
      const serviceParam = searchParams.get('service');
      const typeParam = searchParams.get('type');
      const actualFormType = (serviceParam === 'web-design' && typeParam === 'application') ? 'application' : formType;
      
      // Prepare data for Supabase
      const submissionData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        subject: formData.subject || `New ${actualFormType} inquiry`,
        message: formData.message,
        form_type: actualFormType,
        request_consultation: formData.requestConsultation,
        subscribe_newsletter: formData.subscribeNewsletter,
        preferred_date: formData.preferredDate || null,
        employee_count: formData.employeeCount || null,
        industry: formData.industry || null,
      };

      const { error } = await supabase
        .from('contact_submissions')
        .insert([submissionData]);

      if (error) {
        console.error('Error submitting form:', error);
        toast.error("Failed to submit your request. Please try again.");
        return;
      }
      
      // Show different success messages based on form type
      if (actualFormType === 'application') {
        toast.success("Thank you for your application! Our team will review your request and contact you within 24 hours about our special web design offer.");
      } else {
        toast.success("Thank you for contacting us! We'll be in touch soon.");
      }
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
        preferredDate: "",
        employeeCount: "",
        industry: "",
        requestConsultation: false,
        subscribeNewsletter: false,
        privacyAgreed: false
      });
      
      // Call success callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
      toast.error("Failed to submit your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Determine if this is an application form based on URL params
  const serviceParam = searchParams.get('service');
  const typeParam = searchParams.get('type');
  const isApplicationForm = serviceParam === 'web-design' && typeParam === 'application';
  
  // Update form display based on application type
  const displayTitle = isApplicationForm ? "Apply for Special Web Design Offer" : formTitle;
  const displayDescription = isApplicationForm ? "Take advantage of our limited-time special offer for web design and development services. Fill out the form below to apply!" : formDescription;
  const displayButtonText = isApplicationForm ? "Submit Application" : buttonText;
  
  // Dynamically render fields based on formType
  const renderSpecificFields = () => {
    if (isApplicationForm) {
      return (
        <>
          <div className="mb-4">
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your company name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
              Industry
            </label>
            <select
              id="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your industry</option>
              <option value="Financial Services">Financial Services</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Legal">Legal</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Technology">Technology</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </>
      );
    }
    
    switch (formType) {
      case "demo":
        return (
          <>
            <div className="mb-4">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gowith-medium-blue"
                placeholder="Your company name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="employeeCount" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Employees
              </label>
              <select
                id="employeeCount"
                value={formData.employeeCount}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gowith-medium-blue"
              >
                <option value="">Select</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="501+">501+</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Demo Date
              </label>
              <input
                type="date"
                id="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gowith-medium-blue"
              />
            </div>
          </>
        );
      case "trial":
        return (
          <>
            <div className="mb-4">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gowith-medium-blue"
                placeholder="Your company name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                Industry
              </label>
              <select
                id="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gowith-medium-blue"
              >
                <option value="">Select your industry</option>
                <option value="Financial Services">Financial Services</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Legal">Legal</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Technology">Technology</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </>
        );
      default:
        return (
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gowith-medium-blue"
              placeholder="How can we help you?"
              required
            />
          </div>
        );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gowith-dark-blue mb-4 text-center">
        Have Questions? Contact Us
      </h2>
      <h3 className="text-2xl font-bold text-gowith-dark-blue mb-2">{displayTitle}</h3>
      <p className="text-gray-600 mb-6">{displayDescription}</p>
      
      {isApplicationForm && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded">
          <h4 className="font-semibold text-blue-800 mb-2">🎯 Special Offer Details:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Professional web design consultation</li>
            <li>• Custom website development</li>
            <li>• Mobile-responsive design</li>
            <li>• Limited time pricing</li>
          </ul>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${isApplicationForm ? 'focus:ring-blue-500' : 'focus:ring-gowith-medium-blue'}`}
              placeholder="Your first name"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${isApplicationForm ? 'focus:ring-blue-500' : 'focus:ring-gowith-medium-blue'}`}
              placeholder="Your last name"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${isApplicationForm ? 'focus:ring-blue-500' : 'focus:ring-gowith-medium-blue'}`}
            placeholder="your.email@example.com"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${isApplicationForm ? 'focus:ring-blue-500' : 'focus:ring-gowith-medium-blue'}`}
            placeholder="(123) 456-7890"
          />
        </div>
        
        {renderSpecificFields()}
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message *
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${isApplicationForm ? 'focus:ring-blue-500' : 'focus:ring-gowith-medium-blue'}`}
            placeholder={isApplicationForm ? "Tell us about your website needs and goals..." : "Tell us more about your needs..."}
            required
          ></textarea>
        </div>
        
        {showConsultationCheckbox && (
          <div className="mb-4">
            <div className="flex items-start">
              <input
                id="requestConsultation"
                type="checkbox"
                checked={formData.requestConsultation}
                onChange={handleCheckboxChange}
                className={`h-4 w-4 mt-1 border-gray-300 rounded ${isApplicationForm ? 'text-blue-500 focus:ring-blue-500' : 'text-gowith-medium-blue focus:ring-gowith-medium-blue'}`}
              />
              <label htmlFor="requestConsultation" className="ml-2 block text-sm text-gray-600">
                I'd like to schedule a free IT consultation
              </label>
            </div>
          </div>
        )}
        
        <div className="mb-4">
          <div className="flex items-start">
            <input
              id="subscribeNewsletter"
              type="checkbox"
              checked={formData.subscribeNewsletter}
              onChange={handleCheckboxChange}
              className={`h-4 w-4 mt-1 border-gray-300 rounded ${isApplicationForm ? 'text-blue-500 focus:ring-blue-500' : 'text-gowith-medium-blue focus:ring-gowith-medium-blue'}`}
            />
            <label htmlFor="subscribeNewsletter" className="ml-2 block text-sm text-gray-600">
              Subscribe to our newsletter for IT tips and updates
            </label>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-start">
            <input
              id="privacyAgreed"
              type="checkbox"
              checked={formData.privacyAgreed}
              onChange={handleCheckboxChange}
              className={`h-4 w-4 mt-1 border-gray-300 rounded ${isApplicationForm ? 'text-blue-500 focus:ring-blue-500' : 'text-gowith-medium-blue focus:ring-gowith-medium-blue'}`}
              required
            />
            <label htmlFor="privacyAgreed" className="ml-2 block text-sm text-gray-600">
              I agree to the <a href="/privacy-policy" className={`${isApplicationForm ? 'text-blue-500 hover:text-blue-700' : 'text-gowith-medium-blue'} hover:underline`}>privacy policy</a> and consent to be contacted regarding my request. *
            </label>
          </div>
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-md font-medium transition-colors text-lg ${
            isApplicationForm 
              ? 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white' 
              : 'bg-gowith-orange hover:bg-gowith-orange-hover text-white'
          }`}
        >
          {isSubmitting ? "Submitting..." : displayButtonText}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;

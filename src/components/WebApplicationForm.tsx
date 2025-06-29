
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send, CheckCircle } from 'lucide-react';

const formSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  businessType: z.string().min(1, 'Please select a business type'),
  websiteGoals: z.string().min(10, 'Please describe your website goals'),
  currentWebsite: z.string().optional(),
  timeline: z.string().min(1, 'Please select a timeline'),
  budget: z.string().min(1, 'Please select a budget range'),
  additionalInfo: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const WebApplicationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: '',
      contactName: '',
      email: '',
      phone: '',
      businessType: '',
      websiteGoals: '',
      currentWebsite: '',
      timeline: '',
      budget: '',
      additionalInfo: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/submit-web-design-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We'll contact you within 24 hours.",
      });

      form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-800 mb-2">Application Submitted!</h3>
        <p className="text-green-700 mb-4">
          Thank you for your interest in our web design services. We'll review your application and contact you within 24 hours.
        </p>
        <Button 
          onClick={() => setIsSubmitted(false)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Submit Another Application
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gowith-dark-blue font-semibold">Business Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Business Name" {...field} className="border-gray-300 focus:border-gowith-orange" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gowith-dark-blue font-semibold">Contact Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Full Name" {...field} className="border-gray-300 focus:border-gowith-orange" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gowith-dark-blue font-semibold">Email Address *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} className="border-gray-300 focus:border-gowith-orange" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gowith-dark-blue font-semibold">Phone Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="(555) 123-4567" {...field} className="border-gray-300 focus:border-gowith-orange" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gowith-dark-blue font-semibold">Business Type *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-gray-300 focus:border-gowith-orange">
                      <SelectValue placeholder="Select your business type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="retail">Retail/E-commerce</SelectItem>
                    <SelectItem value="restaurant">Restaurant/Food Service</SelectItem>
                    <SelectItem value="professional">Professional Services</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="nonprofit">Non-profit</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="websiteGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gowith-dark-blue font-semibold">Website Goals & Requirements *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Please describe what you want to achieve with your website (e.g., increase sales, showcase services, generate leads, etc.)"
                    className="border-gray-300 focus:border-gowith-orange min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentWebsite"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gowith-dark-blue font-semibold">Current Website (if any)</FormLabel>
                <FormControl>
                  <Input placeholder="https://yourwebsite.com" {...field} className="border-gray-300 focus:border-gowith-orange" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="timeline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gowith-dark-blue font-semibold">Project Timeline *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-gray-300 focus:border-gowith-orange">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="asap">ASAP (Rush)</SelectItem>
                      <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                      <SelectItem value="3-4-weeks">3-4 weeks</SelectItem>
                      <SelectItem value="1-2-months">1-2 months</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gowith-dark-blue font-semibold">Budget Range *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-gray-300 focus:border-gowith-orange">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="free">FREE (Qualifying Projects)</SelectItem>
                      <SelectItem value="under-1000">Under $1,000</SelectItem>
                      <SelectItem value="1000-3000">$1,000 - $3,000</SelectItem>
                      <SelectItem value="3000-5000">$3,000 - $5,000</SelectItem>
                      <SelectItem value="5000-plus">$5,000+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gowith-dark-blue font-semibold">Additional Information</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any additional details, special requirements, or questions you'd like us to know..."
                    className="border-gray-300 focus:border-gowith-orange min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gowith-orange hover:bg-gowith-orange-hover text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                Submitting Application...
              </>
            ) : (
              <>
                <Send className="mr-3 h-5 w-5" />
                Submit My FREE Website Application
              </>
            )}
          </Button>

          <div className="text-center text-sm text-gray-600 mt-4">
            <p>🔒 Your information is secure and will only be used to contact you about your website project.</p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default WebApplicationForm;

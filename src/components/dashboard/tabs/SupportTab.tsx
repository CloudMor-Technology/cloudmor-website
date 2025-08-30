
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Mail, Phone, MessageCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { ClientSupportDocuments } from './support/ClientSupportDocuments';

// Declare JSDWidget type for TypeScript
declare global {
  interface Window {
    JSDWidget?: {
      show: () => void;
      hide: () => void;
    };
  }
}

export const SupportTab = () => {
  const { profile } = useAuth();
  const isAdmin = profile?.role === 'admin';

  useEffect(() => {
    // Load Jira Service Desk widget
    const script = document.createElement('script');
    script.setAttribute('data-jsd-embedded', '');
    script.setAttribute('data-key', '7266fae8-8b7d-4231-8579-bce9a92270b2');
    script.setAttribute('data-base-url', 'https://jsd-widget.atlassian.com');
    script.src = 'https://jsd-widget.atlassian.com/assets/embed.js';
    script.async = true;
    
    document.body.appendChild(script);
    
    return () => {
      // Cleanup - check if script exists before removing
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const supportOptions = [
    {
      title: 'CloudMor Support Portal',
      description: 'Submit tickets through our online portal',
      url: 'support.cloudmor.com',
      icon: Globe,
      color: 'blue',
      action: () => window.open('https://support.cloudmor.com', '_blank')
    },
    {
      title: 'Email Support',
      description: 'Send us an email for assistance',
      url: 'support@cloudmor.com',
      icon: Mail,
      color: 'green',
      action: () => window.open('mailto:support@cloudmor.com', '_blank')
    },
    {
      title: 'Live Chat Support',
      description: 'Chat with our support team instantly',
      url: 'Start Chat Session',
      icon: MessageCircle,
      color: 'purple',
      action: () => {
        // Trigger Jira Service Desk widget
        if (window.JSDWidget) {
          window.JSDWidget.show();
        }
      }
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Support Center</h2>
          <p className="text-white/70 text-lg">Get help and submit support requests</p>
        </div>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {supportOptions.map((option, index) => {
          const IconComponent = option.icon;
          return (
            <Card key={index} className="bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow cursor-pointer" onClick={option.action}>
              <CardContent className="p-8">
                <div className={`w-16 h-16 bg-${option.color}-100 rounded-full flex items-center justify-center mb-6`}>
                  <IconComponent className={`w-8 h-8 text-${option.color}-600`} />
                </div>
                <h3 className="font-bold text-xl mb-3">{option.title}</h3>
                <p className="text-gray-600 text-lg mb-4">{option.description}</p>
                <p className={`text-${option.color}-600 font-bold text-lg`}>
                  {option.url}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Emergency Hotline Information */}
      <Card className="bg-red-50 border-red-200">
        <CardHeader>
          <CardTitle className="text-2xl text-red-800 flex items-center gap-2">
            <Phone className="w-6 h-6" />
            Emergency Support Hotline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="text-red-700 text-lg mb-2">
              For immediate issues or urgent support needs
            </p>
            <p className="text-2xl font-bold text-red-800 mb-2">
              📞 888-554-6597
            </p>
            <p className="text-red-600 font-medium">
              Have your ticket number ready when calling
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Support Portal Access */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800 flex items-center gap-2">
            <Globe className="w-6 h-6" />
            Support Portal Access
          </CardTitle>
          <p className="text-blue-600 text-lg">Connect to our Jira support system</p>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <Button 
              onClick={() => window.open('https://support.cloudmor.com', '_blank')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-3 mr-4"
            >
              <Globe className="w-5 h-5 mr-2" />
              Open Support Portal
            </Button>
            <Button 
              onClick={() => {
                if (window.JSDWidget) {
                  window.JSDWidget.show();
                }
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-3"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Chat Support
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Client-Specific Support Documents */}
      <ClientSupportDocuments />

      {isAdmin && (
        <Card className="bg-orange-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-800">Admin: Support Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-700 text-lg mb-4">
              As an administrator, you can modify all support content from the Admin panel.
            </p>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-6 py-3">
              Manage Support Content
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

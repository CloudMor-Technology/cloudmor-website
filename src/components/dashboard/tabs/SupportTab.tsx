
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Clock, CheckCircle } from 'lucide-react';

export const SupportTab = () => {
  const supportChannels = [
    {
      title: 'Phone Support',
      subtitle: '(877) 724-4267',
      description: 'Call for immediate support',
      icon: Phone,
      color: 'blue'
    },
    {
      title: 'Email Support',
      subtitle: 'support@cloudmor.com',
      description: 'Response within 4 hours',
      icon: Mail,
      color: 'green'
    },
    {
      title: 'Emergency Support',
      subtitle: 'Mon-Fri 24/7 EST',
      description: 'Weekend: Emergency Only',
      icon: Clock,
      color: 'orange'
    }
  ];

  const supportResources = [
    'Knowledge Base',
    'System Status',
    'Documentation',
    'Community Forum'
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Support Center</h2>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          + New Support Ticket
        </Button>
      </div>

      <p className="text-white/70">Get help and submit support requests</p>

      {/* Support Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {supportChannels.map((channel, index) => {
          const IconComponent = channel.icon;
          return (
            <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`w-12 h-12 bg-${channel.color}-100 rounded-full flex items-center justify-center mb-4`}>
                  <IconComponent className={`w-6 h-6 text-${channel.color}-600`} />
                </div>
                <h3 className="font-semibold text-lg mb-1">{channel.title}</h3>
                <p className={`text-${channel.color}-600 font-medium mb-2`}>{channel.subtitle}</p>
                <p className="text-gray-600 text-sm">{channel.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Support Channels & Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Support Channels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Emergency Support (24/7)</h4>
              <p className="text-gray-600 text-sm mb-2">
                For critical system and security incidents
              </p>
              <p className="text-blue-600 font-medium">📞 (866) 123-4567</p>
              <p className="text-blue-600 font-medium">✉️ emergency@cloudmor.com</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">General Support</h4>
              <p className="text-gray-600 text-sm mb-2">
                For general questions and non-critical issues
              </p>
              <p className="text-green-600 font-medium">📞 (855) 123-4567</p>
              <p className="text-green-600 font-medium">✉️ support@cloudmor.com</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Billing & Account</h4>
              <p className="text-gray-600 text-sm mb-2">
                For billing questions and account changes
              </p>
              <p className="text-orange-600 font-medium">✉️ billing@cloudmor.com</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Support Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {supportResources.map((resource, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium">{resource}</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Info & Tabs Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Contact Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm"><span className="font-medium">My Tickets:</span> 0</p>
              <p className="text-sm"><span className="font-medium">Support Portal:</span> Available</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

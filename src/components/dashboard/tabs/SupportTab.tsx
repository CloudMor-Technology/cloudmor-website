
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const SupportTab = () => {
  const { profile } = useAuth();
  const isAdmin = profile?.role === 'admin';

  const supportProcess = [
    {
      step: 1,
      title: 'Submit Support Ticket',
      description: 'Create a ticket through the CloudMor Support Portal',
      icon: CheckCircle,
      color: 'blue'
    },
    {
      step: 2,
      title: 'Send Email (if urgent)',
      description: 'Email support@cloudmor.com for immediate assistance',
      icon: Mail,
      color: 'green'
    },
    {
      step: 3,
      title: 'Call with Ticket Number',
      description: 'Call our phone line with your ticket number ready',
      icon: Phone,
      color: 'orange'
    }
  ];

  const supportChannels = [
    {
      title: 'Emergency Support (24/7)',
      subtitle: '(866) 123-4567',
      email: 'emergency@cloudmor.com',
      description: 'For critical system and security incidents',
      hours: 'Mon-Fri 24/7 EST',
      weekend: 'Weekend: Emergency Only',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'General Support',
      subtitle: '(855) 123-4567',
      email: 'support@cloudmor.com',
      description: 'For general questions and non-critical issues',
      hours: 'Business Hours: Mon-Fri 8AM-6PM EST',
      responseTime: 'Response within 30 minutes',
      icon: Phone,
      color: 'blue'
    },
    {
      title: 'Billing & Account',
      subtitle: 'billing@cloudmor.com',
      description: 'For billing questions and account changes',
      hours: 'Business Hours: Mon-Fri 9AM-5PM EST',
      responseTime: 'Response within 4 hours',
      icon: Mail,
      color: 'green'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Support Center</h2>
          <p className="text-white/70 text-lg">Get help and submit support requests</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3">
          + New Support Ticket
        </Button>
      </div>

      {/* Support Process Steps */}
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Support Request Process</CardTitle>
          <p className="text-gray-600 text-lg">Follow these steps to get the fastest support</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportProcess.map((process, index) => {
              const IconComponent = process.icon;
              return (
                <div key={index} className="text-center p-6 border-2 border-dashed border-gray-200 rounded-lg">
                  <div className={`w-16 h-16 bg-${process.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <div className={`w-8 h-8 bg-${process.color}-600 text-white rounded-full flex items-center justify-center text-lg font-bold`}>
                      {process.step}
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-3">{process.title}</h3>
                  <p className="text-gray-600 text-lg">{process.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Support Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {supportChannels.map((channel, index) => {
          const IconComponent = channel.icon;
          return (
            <Card key={index} className="bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className={`w-16 h-16 bg-${channel.color}-100 rounded-full flex items-center justify-center mb-6`}>
                  <IconComponent className={`w-8 h-8 text-${channel.color}-600`} />
                </div>
                <h3 className="font-bold text-xl mb-3">{channel.title}</h3>
                <div className="space-y-3">
                  <p className={`text-${channel.color}-600 font-bold text-lg`}>📞 {channel.subtitle}</p>
                  {channel.email && (
                    <p className={`text-${channel.color}-600 font-bold text-lg`}>✉️ {channel.email}</p>
                  )}
                  <p className="text-gray-600 text-lg">{channel.description}</p>
                  <p className="text-gray-500">{channel.hours}</p>
                  {channel.weekend && <p className="text-orange-600 font-medium">{channel.weekend}</p>}
                  {channel.responseTime && <p className="text-green-600 font-medium">{channel.responseTime}</p>}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Current Tickets Status - Placeholder for Jira Integration */}
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Your Support Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">2</div>
              <div className="text-gray-600 text-lg">Open Tickets</div>
            </div>
            <div className="text-center p-6 bg-yellow-50 rounded-lg">
              <div className="text-3xl font-bold text-yellow-600">1</div>
              <div className="text-gray-600 text-lg">In Progress</div>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">15</div>
              <div className="text-gray-600 text-lg">Resolved</div>
            </div>
          </div>
          
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg mb-4">Jira Support Portal will be embedded here</p>
            <Button className="bg-purple-600 hover:bg-purple-700 text-lg px-6 py-3">
              View All Tickets in Jira
            </Button>
          </div>
        </CardContent>
      </Card>

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

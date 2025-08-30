import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { User, UserPlus, Settings, Phone, Mail, AlertTriangle, CheckCircle } from 'lucide-react';
import { BillingTab } from './tabs/BillingTab';

export const SinglePagePortal = () => {
  const { profile, user } = useAuth();
  const isAdmin = profile?.role === 'admin';
  
  // Stats data
  const stats = [
    { title: 'Active Services', value: '94.5%', color: 'text-green-600' },
    { title: 'Uptime Performance', value: '99.5%', color: 'text-blue-600' },
    { title: 'Average Usage', value: '72.3%', color: 'text-orange-600' },
    { title: 'Service Success Rate', value: '100%', color: 'text-purple-600' }
  ];

  const supportChannels = [
    {
      title: 'Emergency Support (24/7)',
      phone: '(866) 123-4567',
      email: 'emergency@cloudmor.com',
      description: 'For critical system and security incidents',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'General Support',
      phone: '(855) 123-4567', 
      email: 'support@cloudmor.com',
      description: 'For general questions and non-critical issues',
      icon: Phone,
      color: 'blue'
    },
    {
      title: 'Billing & Account',
      email: 'billing@cloudmor.com',
      description: 'For billing questions and account changes',
      icon: Mail,
      color: 'green'
    }
  ];

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'url(/lovable-uploads/9da9a140-1484-41e8-9ec7-94b7528611ad.png)'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-[95%] mx-auto px-6 sm:px-8 lg:px-12 py-10 space-y-8">
        
        {/* Admin Controls Section (only for admins) */}
        {isAdmin && (
          <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
            <CardHeader>
              <CardTitle className="text-2xl text-orange-800 flex items-center gap-2">
                <Settings className="w-6 h-6" />
                Administrator Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Create Client User
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Client Management
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  System Administration
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Account Information Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Info */}
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{profile?.full_name || 'User'}</h3>
                  <p className="text-gray-500">{user?.email}</p>
                  <p className="text-sm text-gray-400 capitalize">{profile?.role || 'Client'} Account</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{profile?.phone || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Job Title</p>
                  <p className="font-medium">{profile?.job_title || 'Not set'}</p>
                </div>
              </div>
              
              <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4">
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Service Stats */}
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Service Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className={`text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.title}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Billing Section (Compact) */}
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Billing Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <BillingTab />
          </CardContent>
        </Card>

        {/* Support Section */}
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">Support Center</CardTitle>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                + New Support Ticket
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Support Process */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border-2 border-dashed border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                </div>
                <h4 className="font-semibold mb-2">Submit Ticket</h4>
                <p className="text-sm text-gray-600">Create a support ticket</p>
              </div>
              
              <div className="text-center p-4 border-2 border-dashed border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                </div>
                <h4 className="font-semibold mb-2">Email Support</h4>
                <p className="text-sm text-gray-600">Email for urgent issues</p>
              </div>
              
              <div className="text-center p-4 border-2 border-dashed border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                </div>
                <h4 className="font-semibold mb-2">Call with Ticket</h4>
                <p className="text-sm text-gray-600">Call with your ticket number</p>
              </div>
            </div>

            {/* Support Channels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportChannels.map((channel, index) => {
                const IconComponent = channel.icon;
                return (
                  <div key={index} className="p-6 bg-gray-50 rounded-lg">
                    <div className={`w-12 h-12 bg-${channel.color}-100 rounded-full flex items-center justify-center mb-4`}>
                      <IconComponent className={`w-6 h-6 text-${channel.color}-600`} />
                    </div>
                    <h4 className="font-bold mb-2">{channel.title}</h4>
                    {channel.phone && (
                      <p className={`text-${channel.color}-600 font-semibold mb-1`}>📞 {channel.phone}</p>
                    )}
                    <p className={`text-${channel.color}-600 font-semibold mb-2`}>✉️ {channel.email}</p>
                    <p className="text-sm text-gray-600">{channel.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Ticket Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">2</div>
                <div className="text-gray-600">Open Tickets</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">1</div>
                <div className="text-gray-600">In Progress</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">15</div>
                <div className="text-gray-600">Resolved</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { User, UserPlus, Settings, Phone, Mail, AlertTriangle, CheckCircle, Eye, CreditCard, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const SinglePagePortal = () => {
  const { profile, user } = useAuth();
  const isAdmin = profile?.role === 'admin';
  const [showProfile, setShowProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    // Here you would implement the actual password change logic
    toast.success('Password updated successfully');
    setIsChangingPassword(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleViewInvoices = async () => {
    try {
      const response = await fetch('/api/supabase/functions/create-customer-portal', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ return_url: window.location.origin })
      });
      
      if (!response.ok) throw new Error('Failed to create portal session');
      
      const data = await response.json();
      window.open(data.url, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
    } catch (error) {
      toast.error('Failed to open billing portal');
    }
  };

  const handleManagePayment = async () => {
    try {
      const response = await fetch('/api/supabase/functions/create-customer-portal', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ return_url: window.location.origin })
      });
      
      if (!response.ok) throw new Error('Failed to create portal session');
      
      const data = await response.json();
      window.open(data.url, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
    } catch (error) {
      toast.error('Failed to open billing portal');
    }
  };

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
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
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
              <Button 
                onClick={() => setShowProfile(!showProfile)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Profile
              </Button>
            </div>
            
            {showProfile && (
              <div className="border-t pt-4 mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{profile?.phone || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Job Title</p>
                      <p className="font-medium">{profile?.job_title || 'Not set'}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Security</h4>
                    <Button 
                      onClick={() => setIsChangingPassword(!isChangingPassword)}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      Change Password
                    </Button>
                  </div>
                  
                  {isChangingPassword && (
                    <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handlePasswordChange} size="sm" className="bg-green-600 hover:bg-green-700">
                          Update Password
                        </Button>
                        <Button 
                          onClick={() => {
                            setIsChangingPassword(false);
                            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                          }}
                          variant="outline" 
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Billing Section */}
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Billing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button 
                onClick={handleViewInvoices}
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Invoices
              </Button>
              <Button 
                onClick={handleManagePayment}
                variant="outline"
                className="flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Manage Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Services Section */}
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>My Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-green-600">Active</h4>
                  <h3 className="text-lg font-bold">Managed IT Services</h3>
                  <p className="text-sm text-gray-500">Monthly Plan</p>
                  <p className="text-sm text-gray-600">Next billing: Jan 15, 2025</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-green-600">Active</h4>
                  <h3 className="text-lg font-bold">Cloud Hosting</h3>
                  <p className="text-sm text-gray-500">Annual Plan</p>
                  <p className="text-sm text-gray-600">Expires: Dec 31, 2025</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-blue-600">Pending</h4>
                  <h3 className="text-lg font-bold">Cybersecurity Audit</h3>
                  <p className="text-sm text-gray-500">One-time Service</p>
                  <p className="text-sm text-gray-600">Scheduled: Feb 1, 2025</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Service Summary</h4>
                  <div className="flex gap-4 text-sm">
                    <span className="text-green-600">● 2 Active</span>
                    <span className="text-blue-600">● 1 Pending</span>
                    <span className="text-gray-500">● 0 Inactive</span>
                  </div>
                </div>
              </div>
            </div>
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
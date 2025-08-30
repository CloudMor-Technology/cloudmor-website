import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { User, Settings, Phone, CheckCircle, Eye, CreditCard, Lock, LogOut, Building2, Headphones, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { ServicesTab } from './tabs/ServicesTab';
import { SupportTab } from './tabs/SupportTab';
import { AdminTab } from './tabs/AdminTab';

export const SinglePagePortal = () => {
  const { profile, user, signOut } = useAuth();
  const isAdmin = profile?.role === 'admin';
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Check for impersonation
  const impersonationData = localStorage.getItem('impersonating_client');
  const isImpersonating = impersonationData && isAdmin;
  const impersonatedClient = isImpersonating ? JSON.parse(impersonationData) : null;

  const handleSignOut = async () => {
    try {
      // Clear impersonation if active
      if (isImpersonating) {
        localStorage.removeItem('impersonating_client');
      }
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    toast.success('Password updated successfully');
    setIsChangingPassword(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleViewInvoices = async () => {
    try {
      let stripeCustomerId = profile?.stripe_customer_id;
      
      if (!stripeCustomerId) {
        toast.error('No billing information found. Please contact your administrator.');
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-customer-portal', {
        body: { 
          return_url: window.location.origin,
          stripe_customer_id: stripeCustomerId
        }
      });
      
      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating customer portal session:', error);
      toast.error('Failed to open billing portal');
    }
  };

  const handleManagePayment = async () => {
    try {
      let stripeCustomerId = profile?.stripe_customer_id;
      
      if (!stripeCustomerId) {
        toast.error('No billing information found. Please contact your administrator.');
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-customer-portal', {
        body: { 
          return_url: window.location.origin,
          stripe_customer_id: stripeCustomerId
        }
      });
      
      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating customer portal session:', error);
      toast.error('Failed to open billing portal');
    }
  };

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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CloudMor Client Portal
            </h1>
            <p className="text-white/80 text-lg mt-2">
              Welcome, {isImpersonating ? `${impersonatedClient.company_name} (${impersonatedClient.contact_name})` : (profile?.full_name || user?.email)}
            </p>
            {isImpersonating && (
              <div className="bg-orange-100 border border-orange-300 rounded-lg px-3 py-1 mt-2 inline-block">
                <span className="text-orange-800 text-sm font-medium">Admin Impersonation Active</span>
              </div>
            )}
          </div>
          <Button
            onClick={handleSignOut}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue={isAdmin && !isImpersonating ? "admin" : "dashboard"} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-white/20 backdrop-blur-sm h-16 mb-8">
            {(!isAdmin || isImpersonating) && (
              <>
                <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-white/30 text-sm py-4">
                  <User className="w-5 h-5 mr-2 text-blue-400" />
                  <span className="font-semibold">Dashboard</span>
                </TabsTrigger>
                <TabsTrigger value="services" className="text-white data-[state=active]:bg-white/30 text-sm py-4">
                  <Settings className="w-5 h-5 mr-2 text-green-400" />
                  <span className="font-semibold">My Services</span>
                </TabsTrigger>
                <TabsTrigger value="billing" className="text-white data-[state=active]:bg-white/30 text-sm py-4">
                  <CreditCard className="w-5 h-5 mr-2 text-purple-400" />
                  <span className="font-semibold">Billing</span>
                </TabsTrigger>
                <TabsTrigger value="support" className="text-white data-[state=active]:bg-white/30 text-sm py-4">
                  <Headphones className="w-5 h-5 mr-2 text-orange-400" />
                  <span className="font-semibold">Support</span>
                </TabsTrigger>
                <TabsTrigger value="account" className="text-white data-[state=active]:bg-white/30 text-sm py-4">
                  <Shield className="w-5 h-5 mr-2 text-red-400" />
                  <span className="font-semibold">Account</span>
                </TabsTrigger>
              </>
            )}
            {isAdmin && !isImpersonating && (
              <TabsTrigger value="admin" className="text-white data-[state=active]:bg-white/30 text-sm py-4 col-span-6">
                <Building2 className="w-5 h-5 mr-2 text-orange-400" />
                <span className="font-semibold">Administrator Panel</span>
              </TabsTrigger>
            )}
          </TabsList>

          {/* Admin Tab */}
          {isAdmin && !isImpersonating && (
            <TabsContent value="admin">
              <AdminTab />
            </TabsContent>
          )}

          {/* Dashboard Tab */}
          {(!isAdmin || isImpersonating) && (
            <TabsContent value="dashboard">
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {/* Account Overview */}
                  <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-xl text-blue-800 flex items-center gap-2">
                        <User className="w-6 h-6 text-blue-600" />
                        Account Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-blue-600 font-medium">Full Name</p>
                        <p className="text-blue-800 font-semibold">
                          {isImpersonating ? impersonatedClient.contact_name : (profile?.full_name || 'Not provided')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-600 font-medium">Email</p>
                        <p className="text-blue-800 font-semibold">
                          {isImpersonating ? impersonatedClient.contact_email : user?.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-600 font-medium">Role</p>
                        <p className="text-blue-800 font-semibold capitalize">
                          {isImpersonating ? 'Client' : (profile?.role || 'Client')}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
                    <CardHeader>
                      <CardTitle className="text-xl text-green-800 flex items-center gap-2">
                        <Settings className="w-6 h-6 text-green-600" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button 
                        onClick={handleViewInvoices}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        View Invoices
                      </Button>
                      <Button 
                        onClick={handleManagePayment}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Manage Payment Methods
                      </Button>
                      <Button 
                        onClick={() => window.open('https://support.cloudmor.com', '_blank')}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                      >
                        <Headphones className="w-4 h-4 mr-2" />
                        Contact Support
                      </Button>
                    </CardContent>
                  </Card>

                  {/* System Status */}
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                    <CardHeader>
                      <CardTitle className="text-xl text-green-800 flex items-center gap-2">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        System Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-green-700">All Services</span>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-green-800 font-semibold">Operational</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-green-700">Support Portal</span>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-green-800 font-semibold">Online</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-green-700">Billing System</span>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-green-800 font-semibold">Active</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          )}

          {/* Services Tab */}
          {(!isAdmin || isImpersonating) && (
            <TabsContent value="services">
              <ServicesTab />
            </TabsContent>
          )}

          {/* Billing Tab */}
          {(!isAdmin || isImpersonating) && (
            <TabsContent value="billing">
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Billing & Payments
                    </h2>
                    <p className="text-white/70 text-lg">Manage your billing information and payment methods</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-2xl text-purple-800 flex items-center gap-2">
                        <Eye className="w-6 h-6" />
                        View Invoices
                      </CardTitle>
                      <p className="text-purple-600">Access your billing history and download invoices</p>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        onClick={handleViewInvoices}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg py-3"
                      >
                        <Eye className="w-5 h-5 mr-2" />
                        Open Billing Portal
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-2xl text-blue-800 flex items-center gap-2">
                        <CreditCard className="w-6 h-6" />
                        Payment Methods
                      </CardTitle>
                      <p className="text-blue-600">Update your payment information and billing preferences</p>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        onClick={handleManagePayment}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg py-3"
                      >
                        <CreditCard className="w-5 h-5 mr-2" />
                        Manage Payment Methods
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          )}

          {/* Support Tab */}
          {(!isAdmin || isImpersonating) && (
            <TabsContent value="support">
              <SupportTab />
            </TabsContent>
          )}

          {/* Account Tab */}
          {(!isAdmin || isImpersonating) && (
            <TabsContent value="account">
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                      Account Settings
                    </h2>
                    <p className="text-white/70 text-lg">Manage your account information and security settings</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200">
                    <CardHeader>
                      <CardTitle className="text-2xl text-red-800 flex items-center gap-2">
                        <User className="w-6 h-6" />
                        Profile Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-red-700 font-medium">Full Name</Label>
                        <Input
                          value={isImpersonating ? impersonatedClient.contact_name : (profile?.full_name || '')}
                          readOnly
                          className="bg-red-50 border-red-200"
                        />
                      </div>
                      <div>
                        <Label className="text-red-700 font-medium">Email Address</Label>
                        <Input
                          value={isImpersonating ? impersonatedClient.contact_email : (user?.email || '')}
                          readOnly
                          className="bg-red-50 border-red-200"
                        />
                      </div>
                      <div>
                        <Label className="text-red-700 font-medium">Role</Label>
                        <Input
                          value={isImpersonating ? 'Client' : (profile?.role || 'Client')}
                          readOnly
                          className="bg-red-50 border-red-200"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200">
                    <CardHeader>
                      <CardTitle className="text-2xl text-orange-800 flex items-center gap-2">
                        <Lock className="w-6 h-6" />
                        Security Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {!isChangingPassword ? (
                        <Button 
                          onClick={() => setIsChangingPassword(true)}
                          className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
                          disabled={isImpersonating}
                        >
                          <Lock className="w-4 h-4 mr-2" />
                          {isImpersonating ? 'Password Change (Admin View)' : 'Change Password'}
                        </Button>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <Label>Current Password</Label>
                            <Input
                              type="password"
                              value={passwordForm.currentPassword}
                              onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                              className="border-orange-300 focus:border-orange-500"
                            />
                          </div>
                          <div>
                            <Label>New Password</Label>
                            <Input
                              type="password"
                              value={passwordForm.newPassword}
                              onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                              className="border-orange-300 focus:border-orange-500"
                            />
                          </div>
                          <div>
                            <Label>Confirm New Password</Label>
                            <Input
                              type="password"
                              value={passwordForm.confirmPassword}
                              onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                              className="border-orange-300 focus:border-orange-500"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              onClick={handlePasswordChange}
                              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                            >
                              Update Password
                            </Button>
                            <Button 
                              onClick={() => setIsChangingPassword(false)}
                              variant="outline"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          )}

        </Tabs>
      </div>
    </div>
  );
};
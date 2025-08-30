import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { User, Settings, Phone, CheckCircle, Eye, CreditCard, Lock, LogOut, Building2, Headphones, Shield, Globe, Mail, MessageCircle, FileText, ExternalLink, Folder, TrendingUp, Activity, DollarSign, Calendar, RefreshCcw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { AdminTab } from './tabs/AdminTab';
import { ClientSupportDocuments } from './tabs/support/ClientSupportDocuments';

interface ClientService {
  id: string;
  service_name: string;
  service_description: string | null;
  status: string | null;
  created_at: string;
}

export const SinglePagePortal = () => {
  const { profile, user, signOut } = useAuth();
  const isAdmin = profile?.role === 'admin';
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [clientServices, setClientServices] = useState<ClientService[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  // Check for impersonation
  const impersonationData = localStorage.getItem('impersonating_client');
  const isImpersonating = impersonationData && isAdmin;
  const impersonatedClient = isImpersonating ? JSON.parse(impersonationData) : null;

  useEffect(() => {
    if ((!isAdmin || isImpersonating) && profile?.email) {
      fetchClientServices();
    }
  }, [profile, isAdmin, isImpersonating]);

  const fetchClientServices = async () => {
    if (!profile?.email) return;

    try {
      setServicesLoading(true);
      
      // Check if user is impersonating a client
      const impersonationData = localStorage.getItem('impersonating_client');
      let clientEmail = profile.email;
      
      if (impersonationData && profile.role === 'admin') {
        const impersonatedClient = JSON.parse(impersonationData);
        clientEmail = impersonatedClient.contact_email;
      }

      // First get the client ID
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('id')
        .eq('contact_email', clientEmail)
        .single();

      if (clientError || !clientData) {
        console.log('No client found for email:', clientEmail);
        setClientServices([]);
        return;
      }

      // Then get their services
      const { data: servicesData, error: servicesError } = await supabase
        .from('client_services')
        .select('*')
        .eq('client_id', clientData.id)
        .order('created_at', { ascending: false });

      if (servicesError) throw servicesError;

      setClientServices(servicesData || []);
    } catch (error) {
      console.error('Error fetching client services:', error);
    } finally {
      setServicesLoading(false);
    }
  };

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

  // Enhanced Stripe portal functions to avoid popup blockers
  const handleViewInvoices = async () => {
    try {
      let stripeCustomerId = profile?.stripe_customer_id;
      
      if (!stripeCustomerId) {
        toast.error('No billing information found. Please contact your administrator.');
        return;
      }

      // Show loading indicator
      toast.loading('Opening billing portal...');

      const { data, error } = await supabase.functions.invoke('create-customer-portal', {
        body: { 
          return_url: window.location.origin,
          stripe_customer_id: stripeCustomerId
        }
      });
      
      if (error) throw error;
      
      if (data?.url) {
        // Use window.location.href to avoid popup blockers
        window.location.href = data.url;
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

      // Show loading indicator
      toast.loading('Opening payment portal...');

      const { data, error } = await supabase.functions.invoke('create-customer-portal', {
        body: { 
          return_url: window.location.origin,
          stripe_customer_id: stripeCustomerId
        }
      });
      
      if (error) throw error;
      
      if (data?.url) {
        // Use window.location.href to avoid popup blockers
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating customer portal session:', error);
      toast.error('Failed to open billing portal');
    }
  };

  const openJiraPortal = async () => {
    // Check if user is impersonating a client
    const impersonationData = localStorage.getItem('impersonating_client');
    let clientEmail = profile?.email;
    
    if (impersonationData && profile?.role === 'admin') {
      const impersonatedClient = JSON.parse(impersonationData);
      clientEmail = impersonatedClient.contact_email;
    }

    // For now, open the portal directly - Jira auto-login integration would require backend setup
    window.open(`https://support.cloudmor.com?email=${encodeURIComponent(clientEmail || '')}`, '_blank');
  };

  const getServiceIcon = (serviceName: string) => {
    const name = serviceName.toLowerCase();
    if (name.includes('cyber') || name.includes('security')) return 'red';
    if (name.includes('phone') || name.includes('voip')) return 'green';
    if (name.includes('cloud') || name.includes('backup')) return 'purple';
    if (name.includes('web') || name.includes('design')) return 'blue';
    if (name.includes('face') || name.includes('auth')) return 'orange';
    if (name.includes('automation') || name.includes('ai')) return 'pink';
    return 'blue';
  };

  const getStatusColor = (status: string) => {
    return status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  // Render admin view if admin and not impersonating
  if (isAdmin && !isImpersonating) {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: 'url(/lovable-uploads/9da9a140-1484-41e8-9ec7-94b7528611ad.png)'
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center p-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CloudMor Admin Portal
            </h1>
            <Button
              onClick={handleSignOut}
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
          <AdminTab />
        </div>
      </div>
    );
  }

  // Client portal single-page layout
  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative"
      style={{
        backgroundImage: 'linear-gradient(135deg, hsl(222.2, 84%, 4.9%) 0%, hsl(215, 28%, 17%) 50%, hsl(222.2, 84%, 4.9%) 100%)'
      }}
    >
      {/* Background overlay with pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-orange-400 to-blue-300 bg-clip-text text-transparent">
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
          </div>
        </div>

        {/* Main Content - Single Page Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          
          {/* Dashboard Section */}
          <section id="dashboard" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent mb-2">
                Dashboard Overview
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Account Overview */}
              <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-400/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-300 flex items-center gap-2">
                    <User className="w-6 h-6 text-blue-400" />
                    Account Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-blue-300 font-medium">Full Name</p>
                    <p className="text-white font-semibold">
                      {isImpersonating ? impersonatedClient.contact_name : (profile?.full_name || 'Not provided')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-300 font-medium">Email</p>
                    <p className="text-white font-semibold">
                      {isImpersonating ? impersonatedClient.contact_email : user?.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-300 font-medium">Role</p>
                    <p className="text-white font-semibold capitalize">
                      {isImpersonating ? 'Client' : (profile?.role || 'Client')}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-400/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-300 flex items-center gap-2">
                    <Settings className="w-6 h-6 text-orange-400" />
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
                    Manage Payments
                  </Button>
                  <Button 
                    onClick={openJiraPortal}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                  >
                    <Headphones className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-400/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-green-300 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-green-300">All Services</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white font-semibold">Operational</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-300">Support Portal</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white font-semibold">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-300">Billing System</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white font-semibold">Active</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
                My Services
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mx-auto"></div>
            </div>

            {/* Services Grid - No static percentages */}
            {servicesLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <Card key={n} className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6">
                      <div className="animate-pulse">
                        <div className="h-6 bg-gray-300/20 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300/20 rounded w-1/2 mb-4"></div>
                        <div className="h-16 bg-gray-300/20 rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : clientServices.length === 0 ? (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-8 text-center">
                  <Settings className="w-16 h-16 text-white/50 mx-auto mb-4" />
                  <p className="text-white/80 text-lg mb-2">No services assigned to your account.</p>
                  <p className="text-white/60">Contact support if you believe this is an error.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {clientServices.map((service) => {
                  const color = getServiceIcon(service.service_name);
                  const status = service.status || 'ACTIVE';
                  
                  return (
                    <Card key={service.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-12 h-12 bg-gradient-to-br from-${color}-400 to-${color}-600 rounded-lg flex items-center justify-center`}>
                              <span className="text-white font-bold text-lg">
                                {service.service_name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <CardTitle className="text-lg text-white">{service.service_name}</CardTitle>
                              <Badge className={getStatusColor(status)}>
                                {status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {service.service_description && (
                          <p className="text-white/70 text-sm">{service.service_description}</p>
                        )}
                        
                        <div className="flex justify-between items-center text-xs text-white/50">
                          <span>Added: {new Date(service.created_at).toLocaleDateString()}</span>
                          <span>Active Service</span>
                        </div>

                        <Button variant="outline" size="sm" className="w-full border-white/30 text-white hover:bg-white/10">
                          View Service Details
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>

          {/* Billing Section */}
          <section id="billing" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Billing & Payments
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-300 flex items-center gap-2">
                    <Eye className="w-6 h-6" />
                    View Invoices
                  </CardTitle>
                  <p className="text-purple-200">Access your billing history and download invoices</p>
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

              <Card className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-blue-400/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-300 flex items-center gap-2">
                    <CreditCard className="w-6 h-6" />
                    Payment Methods
                  </CardTitle>
                  <p className="text-blue-200">Update your payment information and billing preferences</p>
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
          </section>

          {/* Support Section */}
          <section id="support" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                Support Center
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mx-auto"></div>
            </div>

            {/* Support Options - No flashy animations */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-400/30 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-white">CloudMor Support Portal</h3>
                  <p className="text-white/70 text-lg mb-6">Submit tickets through our online portal</p>
                  <Button
                    onClick={openJiraPortal}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-lg"
                  >
                    Click to Open Portal
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-400/30 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-white">Email Support</h3>
                  <p className="text-white/70 text-lg mb-6">Send us an email for assistance</p>
                  <Button
                    onClick={() => window.open('mailto:support@cloudmor.com', '_blank')}
                    className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-2 px-4 rounded-lg"
                  >
                    Click to Send Email
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-400/30 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-white">Live Chat Support</h3>
                  <p className="text-white/70 text-lg mb-6">Chat with our support team instantly</p>
                  <Button
                    onClick={() => {
                      // Trigger Jira Service Desk widget
                      if ((window as any).JSDWidget) {
                        (window as any).JSDWidget.show();
                      }
                    }}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold py-2 px-4 rounded-lg"
                  >
                    Click to Start Chat
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Emergency Hotline */}
            <Card className="bg-gradient-to-br from-red-500/20 to-red-600/20 border-red-400/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-red-300 flex items-center gap-2">
                  <Phone className="w-6 h-6" />
                  Emergency Support Hotline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-red-200 text-lg mb-2">
                    For immediate issues or urgent support needs
                  </p>
                  <p className="text-2xl font-bold text-white mb-2">
                    📞 888-554-6597
                  </p>
                  <p className="text-red-200 font-medium">
                    Have your ticket number ready when calling
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Client Support Documents */}
            <ClientSupportDocuments />
          </section>

          {/* Account Section */}
          <section id="account" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">
                Account Settings
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-400/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-red-300 flex items-center gap-2">
                    <User className="w-6 h-6" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-red-300 font-medium">Full Name</Label>
                    <Input
                      value={isImpersonating ? impersonatedClient.contact_name : (profile?.full_name || '')}
                      readOnly
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-red-300 font-medium">Email Address</Label>
                    <Input
                      value={isImpersonating ? impersonatedClient.contact_email : (user?.email || '')}
                      readOnly
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-red-300 font-medium">Role</Label>
                    <Input
                      value={isImpersonating ? 'Client' : (profile?.role || 'Client')}
                      readOnly
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-orange-400/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-orange-300 flex items-center gap-2">
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
                        <Label className="text-orange-300">Current Password</Label>
                        <Input
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-orange-300">New Password</Label>
                        <Input
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-orange-300">Confirm New Password</Label>
                        <Input
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                          className="bg-white/10 border-white/20 text-white"
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
                          className="border-white/30 text-white hover:bg-white/10"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
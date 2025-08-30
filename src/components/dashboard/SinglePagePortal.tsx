import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { User, Settings, Phone, CheckCircle, Eye, CreditCard, Lock, LogOut, Building2, Headphones, Shield, Globe, Mail, MessageCircle, FileText, ExternalLink, Folder, TrendingUp, Activity, DollarSign, Calendar, RefreshCcw, AlertCircle, Wifi, Cloud, BookOpen, AlertTriangle, Users } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { AdminTab } from './tabs/AdminTab';
import { ClientSupportDocuments } from './tabs/support/ClientSupportDocuments';
interface ClientService {
  id: string;
  service_name: string;
  service_description: string | null;
  status: string | null;
  notes: string | null;
  created_at: string;
  start_date: string | null;
}
interface PhoneExtension {
  id: string;
  extension_number: string;
  user_name: string;
  voicemail_email: string | null;
  is_active: boolean;
}
interface ClientSupportDocument {
  id: string;
  title: string;
  description: string | null;
  url: string | null;
  category: string | null;
  role: string;
  assigned_to_all: boolean;
  is_active: boolean;
  created_at: string;
}
export const SinglePagePortal = () => {
  const {
    profile,
    user,
    signOut
  } = useAuth();
  const isAdmin = profile?.role === 'admin';
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [clientServices, setClientServices] = useState<ClientService[]>([]);
  const [phoneExtensions, setPhoneExtensions] = useState<PhoneExtension[]>([]);
  const [clientSupportDocs, setClientSupportDocs] = useState<ClientSupportDocument[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  // Check for impersonation
  const impersonationData = localStorage.getItem('impersonating_client');
  const isImpersonating = impersonationData && isAdmin;
  const impersonatedClient = isImpersonating ? JSON.parse(impersonationData) : null;
  useEffect(() => {
    if ((!isAdmin || isImpersonating) && profile?.email) {
      fetchClientServices();
      fetchPhoneExtensions();
    }
    fetchClientSupportDocs();
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
      const {
        data: clientData,
        error: clientError
      } = await supabase.from('clients').select('id').eq('contact_email', clientEmail).single();
      if (clientError || !clientData) {
        console.log('No client found for email:', clientEmail);
        setClientServices([]);
        return;
      }

      // Then get their services
      const {
        data: servicesData,
        error: servicesError
      } = await supabase.from('client_services').select('*').eq('client_id', clientData.id).order('created_at', {
        ascending: false
      });
      if (servicesError) throw servicesError;
      setClientServices(servicesData || []);
    } catch (error) {
      console.error('Error fetching client services:', error);
    } finally {
      setServicesLoading(false);
    }
  };
  const fetchPhoneExtensions = async () => {
    if (!profile?.company_id) return;
    try {
      const {
        data: extensionsData,
        error: extensionsError
      } = await supabase.from('phone_extensions').select('*').eq('company_id', profile.company_id).eq('is_active', true).order('extension_number');
      if (extensionsError) throw extensionsError;
      setPhoneExtensions(extensionsData || []);
    } catch (error) {
      console.error('Error fetching phone extensions:', error);
    }
  };
  const fetchClientSupportDocs = async () => {
    try {
      // Get client-specific and all-client documents
      let clientEmail = profile?.email;
      if (isImpersonating && profile?.role === 'admin') {
        const impersonatedClient = JSON.parse(localStorage.getItem('impersonating_client') || '{}');
        clientEmail = impersonatedClient.contact_email;
      }
      const {
        data,
        error
      } = await supabase.from('client_support_documents').select('*').eq('is_active', true).or(`assigned_to_all.eq.true,id.in.(${await getClientAssignedDocIds(clientEmail)})`).order('created_at', {
        ascending: false
      });
      if (error) throw error;
      setClientSupportDocs(data || []);
    } catch (error) {
      console.error('Error fetching client support documents:', error);
    }
  };
  const getClientAssignedDocIds = async (clientEmail?: string) => {
    if (!clientEmail) return '';
    try {
      const {
        data: clientData
      } = await supabase.from('clients').select('id').eq('contact_email', clientEmail).single();
      if (!clientData) return '';
      const {
        data: assignments
      } = await supabase.from('client_support_document_assignments').select('document_id').eq('client_id', clientData.id);
      return assignments?.map(a => a.document_id).join(',') || '';
    } catch (error) {
      return '';
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
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
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
      const {
        data,
        error
      } = await supabase.functions.invoke('create-customer-portal', {
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
      const {
        data,
        error
      } = await supabase.functions.invoke('create-customer-portal', {
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
    return <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" style={{
      backgroundImage: 'url(/lovable-uploads/9da9a140-1484-41e8-9ec7-94b7528611ad.png)'
    }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center p-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CloudMor Admin Portal
            </h1>
            <Button onClick={handleSignOut} className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
          <AdminTab />
        </div>
      </div>;
  }

  // Client portal single-page layout
  return <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" style={{
    backgroundImage: 'url(/lovable-uploads/9da9a140-1484-41e8-9ec7-94b7528611ad.png)'
  }}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-[gowith-dark-blue] text-sky-200 font-extrabold">
                  CloudMor Client Portal
                </h1>
                <p className="font-medium text-gowith-orange">
                  Welcome, {isImpersonating ? `${impersonatedClient.contact_name}` : profile?.full_name || user?.email?.split('@')[0]}
                </p>
                {isImpersonating && <div className="bg-orange-100 border border-orange-300 rounded-lg px-3 py-1 mt-2 inline-block">
                    <span className="text-orange-800 text-sm font-medium">Admin Impersonation Active</span>
                  </div>}
              </div>
              <div className="flex items-center gap-4">
                {!isChangingPassword ? <Button onClick={() => setIsChangingPassword(true)} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" disabled={isImpersonating}>
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </Button> : <div className="flex items-center gap-2">
                    <Input type="password" placeholder="New Password" value={passwordForm.newPassword} onChange={e => setPasswordForm({
                  ...passwordForm,
                  newPassword: e.target.value
                })} className="bg-white/10 border-white/20 text-white placeholder:text-white/50 w-40" />
                    <Button onClick={handlePasswordChange} size="sm" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                      Update
                    </Button>
                    <Button onClick={() => setIsChangingPassword(false)} size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      Cancel
                    </Button>
                  </div>}
                <Button onClick={handleSignOut} className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Single Page Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          
          {/* Dashboard Section */}
          <section id="dashboard" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text mb-2 text-amber-500 text-[gowith-orange-hover]">
                Dashboard Overview
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Account Overview */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[gowith-dark-blue] text-blue-900">
                    <User className="w-6 h-6 text-blue-400" />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-blue-900">Full Name</p>
                     <p className="text-white font-semibold text-lg">
                       {isImpersonating ? impersonatedClient.contact_name : profile?.full_name || 'Not provided'}
                     </p>
                   </div>
                   <div>
                     <p className="text-sm font-semibold text-blue-900">Email</p>
                     <p className="text-white font-semibold text-lg">
                       {isImpersonating ? impersonatedClient.contact_email : user?.email}
                     </p>
                   </div>
                   <div>
                     <p className="text-sm font-semibold text-blue-900">Role</p>
                     <p className="text-white font-semibold text-lg capitalize">
                       {isImpersonating ? 'Client' : profile?.role || 'Client'}
                     </p>
                   </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2 text-blue-900">
                    <Settings className="w-6 h-6 text-orange-400" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={handleViewInvoices} className="w-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white">
                    <Eye className="w-4 h-4 mr-2" />
                    Open Billing Portal
                  </Button>
                  <Button onClick={openJiraPortal} className="w-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white">
                    <Headphones className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>

              {/* Services Overview */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2 text-blue-900">
                    <Activity className="w-6 h-6 text-blue-400" />
                    Services Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-50">Active Services</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-2xl">{clientServices.length}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-50">System Status</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-white font-bold">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-50">Support</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-white font-bold">Available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text mb-2 text-gowith-orange">
                My Services
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full mx-auto"></div>
            </div>

            {/* Services Grid */}
            {servicesLoading ? <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(n => <Card key={n} className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6">
                      <div className="animate-pulse">
                        <div className="h-6 bg-gray-300/20 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300/20 rounded w-1/2 mb-4"></div>
                        <div className="h-16 bg-gray-300/20 rounded"></div>
                      </div>
                    </CardContent>
                  </Card>)}
              </div> : clientServices.length === 0 ? <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-8 text-center">
                  <Settings className="w-16 h-16 text-white/50 mx-auto mb-4" />
                  <p className="text-white text-lg mb-2">No services assigned to your account.</p>
                  <p className="text-white/60">Contact support if you believe this is an error.</p>
                </CardContent>
              </Card> : <div className="grid grid-cols-1 gap-6">
                {clientServices.map(service => {
              const status = service.status || 'ACTIVE';
              return <Card key={service.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-2xl">
                                {service.service_name.charAt(0)}
                              </span>
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-xl font-bold text-blue-900">{service.service_name}</CardTitle>
                              <Badge className={getStatusColor(status)}>
                                {status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {service.service_description && <p className="font-medium text-[gowith-light-blue] text-zinc-50">{service.service_description}</p>}
                        
                        {/* Service Notes */}
                        {service.notes && <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                            <h5 className="font-bold text-white text-lg mb-2 flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              Service Notes
                            </h5>
                            <p className="text-white/90 text-base font-medium">{service.notes}</p>
                          </div>}
                        
                        {/* Phone Extensions for Business Phone Systems */}
                        {service.service_name.toLowerCase().includes('phone') && phoneExtensions.length > 0 && <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                            <h5 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
                              <Phone className="w-5 h-5" />
                              Phone Extensions
                            </h5>
                            <div className="grid md:grid-cols-2 gap-2">
                              {phoneExtensions.map(ext => <div key={ext.id} className="flex justify-between items-center text-sm bg-white/10 p-3 rounded border border-white/10">
                                  <span className="font-bold text-white">Ext. {ext.extension_number}</span>
                                  <span className="text-white/90 font-medium">{ext.user_name}</span>
                                </div>)}
                            </div>
                          </div>}
                        
                         <div className="flex justify-between items-center text-sm text-white/80 font-medium">
                           <span>Started: {service.start_date ? new Date(service.start_date).toLocaleDateString() : 'Not specified'}</span>
                           <span>Status: {status}</span>
                         </div>
                      </CardContent>
                    </Card>;
            })}
              </div>}
          </section>

          {/* Billing Section */}
          <section id="billing" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text mb-2 text-gowith-orange">
                Billing & Payments
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full mx-auto"></div>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                 <CardHeader>
                   <CardTitle className="text-2xl flex items-center gap-2 text-blue-900">
                     <Eye className="w-6 h-6 text-blue-400" />
                     Billing Management
                   </CardTitle>
                   <p className="text-white/90 font-medium">Access your billing history, download invoices, and manage payment methods</p>
                 </CardHeader>
                <CardContent>
                  <Button onClick={handleViewInvoices} className="w-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white text-lg py-3">
                    <Eye className="w-5 h-5 mr-2" />
                    Open Billing Portal
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Support Section - Combined */}
          <section id="support" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text mb-2 text-gowith-orange">
                Support Center
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full mx-auto"></div>
            </div>

            {/* Combined Support Options */}
            <div className="grid gap-6">
              {/* Contact Support - Expanded */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2 text-blue-900">
                    <Users className="w-6 h-6 text-blue-400" />
                    Contact Support
                  </CardTitle>
                  <p className="text-white/90 font-medium">Get help through multiple channels</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-3">
                    <Button onClick={openJiraPortal} className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white font-medium">
                      <Globe className="w-4 h-4 mr-2" />
                      Open Support Portal
                    </Button>
                    <Button onClick={() => window.open('mailto:support@cloudmor.com', '_blank')} className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white font-medium">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </Button>
                    <Button onClick={() => {
                    if ((window as any).JSDWidget) {
                      (window as any).JSDWidget.show();
                    }
                  }} className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white font-medium">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Start Live Chat
                    </Button>
                     <Button onClick={() => window.open('tel:888-554-6597', '_self')} className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium">
                       <Phone className="w-4 h-4 mr-2" />
                       Call Support: 888-554-6597
                     </Button>
                  </div>
                  
                  {/* Emergency Section - Removed as requested by user */}
                </CardContent>
              </Card>
            </div>

            {/* Support Tips Section */}
            <div className="mt-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2 text-blue-900">
                    <BookOpen className="w-6 h-6 text-blue-400" />
                    Quick Support Tips
                  </CardTitle>
                  <p className="font-medium text-white/90">Helpful guides and troubleshooting resources</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {clientSupportDocs.length > 0 ? clientSupportDocs.map(doc => <div key={doc.id} className="bg-white/10 rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-colors">
                          <h4 className="font-bold text-lg mb-2 text-blue-900">{doc.title}</h4>
                          {doc.description && <p className="text-base mb-3 font-medium text-white/90 whitespace-pre-wrap break-words">{doc.description}</p>}
                          {doc.url && <Button size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-medium" onClick={() => window.open(doc.url, '_blank')}>
                              <ExternalLink className="w-3 h-3 mr-1" />
                              View Resource
                            </Button>}
                        </div>) : <>
        <div className="bg-white/10 rounded-lg p-4 border border-white/20">
          <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
            <Phone className="w-5 h-5 text-green-400" />
            Phone System Help
          </h4>
          <p className="text-white/90 text-base font-medium">Need help with your phone extensions or voicemail? Check our phone system guide.</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4 border border-white/20">
          <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
            <Wifi className="w-5 h-5 text-blue-400" />
            Network Issues
          </h4>
          <p className="text-white/90 text-base font-medium">Experiencing connectivity problems? Run our network diagnostics tool first.</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4 border border-white/20">
          <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
            <Shield className="w-5 h-5 text-orange-400" />
            Security Best Practices
          </h4>
          <p className="text-white/90 text-base font-medium">Keep your business secure with our cybersecurity guidelines and tips.</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4 border border-white/20">
          <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
            <Cloud className="w-5 h-5 text-purple-400" />
            Cloud Services
          </h4>
          <p className="text-white/90 text-base font-medium">Learn how to maximize your cloud infrastructure and backup solutions.</p>
        </div>
      </>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>


        </div>
      </div>
    </div>;
};
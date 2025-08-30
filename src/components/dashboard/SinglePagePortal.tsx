import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { User, UserPlus, Settings, Phone, Mail, AlertTriangle, CheckCircle, Eye, CreditCard, Lock, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const SinglePagePortal = () => {
  const { profile, user, signOut } = useAuth();
  const isAdmin = profile?.role === 'admin';
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showClientManagement, setShowClientManagement] = useState(false);
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      company: 'Tech Solutions Inc',
      companyWebsite: 'www.techsolutions.com',
      companyAddress: '123 Tech Street, NY 10001',
      stripeCustomerId: 'cus_abc123',
      stripeEmail: 'billing@techsolutions.com',
      jiraEmail: 'support@techsolutions.com',
      services: 'Managed IT Services, Cloud Hosting'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@company.com',
      phone: '(555) 987-6543',
      company: 'Digital Corp',
      companyWebsite: 'www.digitalcorp.com',
      companyAddress: '456 Digital Ave, CA 90210',
      stripeCustomerId: 'cus_def456',
      stripeEmail: 'accounting@digitalcorp.com',
      jiraEmail: 'help@digitalcorp.com',
      services: 'Cybersecurity Services, Web Development'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@business.com',
      phone: '(555) 456-7890',
      company: 'Business Solutions LLC',
      companyWebsite: 'www.bizsolut.com',
      companyAddress: '789 Business Blvd, TX 75001',
      stripeCustomerId: 'cus_ghi789',
      stripeEmail: 'finance@bizsolut.com',
      jiraEmail: 'tickets@bizsolut.com',
      services: 'Network Management, Technical Support'
    }
  ]);
  const [clientForm, setClientForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    companyWebsite: '',
    companyAddress: '',
    stripeCustomerId: '',
    stripeEmail: '',
    jiraEmail: '',
    services: ''
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCreatePassword, setShowCreatePassword] = useState<string | null>(null);
  const [clientPasswordForm, setClientPasswordForm] = useState({
    email: '',
    password: ''
  });

  // Get user services - mock for now, would come from database
  const getUserServices = () => {
    if (isAdmin) {
      return []; // Admins don't have assigned services
    }
    
    // For regular users, find their services from clients list
    // This would normally come from a database query
    const userServices = clients
      .filter(client => client.email === user?.email)
      .map(client => client.services)
      .join(', ');
    
    return userServices ? userServices.split(', ').map(service => service.trim()) : [];
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const handleAddClient = async () => {
    try {
      // Create new client with unique ID
      const newClient = {
        id: Date.now(), // Simple ID generation for demo
        ...clientForm
      };
      
      // Add new client to the beginning of the list
      setClients([newClient, ...clients]);
      
      console.log('Adding client:', clientForm);
      toast.success('Client added successfully');
      
      // Reset form
      setClientForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        companyWebsite: '',
        companyAddress: '',
        stripeCustomerId: '',
        stripeEmail: '',
        jiraEmail: '',
        services: ''
      });
    } catch (error) {
      toast.error('Failed to add client');
    }
  };

  const handleDeleteClient = (clientId: number) => {
    setClients(clients.filter(client => client.id !== clientId));
    toast.success('Client deleted successfully');
  };

  const handleCreatePassword = async (clientEmail: string) => {
    try {
      // Here you would implement the logic to create password for the client
      console.log('Creating password for:', clientEmail);
      toast.success('Password created and sent to client via email');
      setShowCreatePassword(null);
      setClientPasswordForm({ email: '', password: '' });
    } catch (error) {
      toast.error('Failed to create password');
    }
  };

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
      // Determine the correct stripe customer ID based on user type
      let stripeCustomerId = profile?.stripe_customer_id;
      
      // If not admin and no stripe ID in profile, check if they're in the clients list
      if (!stripeCustomerId && !isAdmin) {
        const clientRecord = clients.find(client => client.email === user?.email);
        stripeCustomerId = clientRecord?.stripeCustomerId;
      }
      
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
      // Determine the correct stripe customer ID based on user type
      let stripeCustomerId = profile?.stripe_customer_id;
      
      // If not admin and no stripe ID in profile, check if they're in the clients list
      if (!stripeCustomerId && !isAdmin) {
        const clientRecord = clients.find(client => client.email === user?.email);
        stripeCustomerId = clientRecord?.stripeCustomerId;
      }
      
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
                <Button 
                  onClick={() => setShowClientManagement(!showClientManagement)}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Client Management
                </Button>
              </div>
              
              {/* Client Management Section */}
              {showClientManagement && (
                <div className="mt-6 space-y-6">
                   {/* Existing Clients List */}
                   <div className="p-6 bg-white rounded-lg border">
                     <h3 className="text-lg font-semibold mb-4">Existing Clients</h3>
                     <div className="space-y-3">
                       {clients.map((client) => (
                         <div key={client.id} className="p-4 border rounded-lg hover:bg-gray-50">
                           <div className="flex justify-between items-start">
                             <div className="flex-1">
                               <h4 className="font-semibold text-lg">{client.name}</h4>
                               <p className="text-gray-600">{client.email}</p>
                               <p className="text-gray-600">{client.phone}</p>
                               <p className="text-gray-600">{client.company}</p>
                               <p className="text-gray-600">{client.companyWebsite}</p>
                               <p className="text-gray-600">{client.companyAddress}</p>
                               <p className="text-sm text-purple-600 mt-1">Stripe ID: {client.stripeCustomerId}</p>
                               <p className="text-sm text-blue-600 mt-1">Services: {client.services}</p>
                             </div>
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                  onClick={() => setShowCreatePassword(client.email)}
                                >
                                  Set Password
                                </Button>
                                <Button size="sm" variant="outline">Edit</Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => handleDeleteClient(client.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                            
                            {/* Password Creation Form */}
                            {showCreatePassword === client.email && (
                              <div className="mt-4 p-4 bg-green-50 rounded-lg border">
                                <h5 className="font-medium mb-3">Create Password for {client.name}</h5>
                                <div className="space-y-3">
                                  <div>
                                    <Label htmlFor={`password-${client.id}`}>Password</Label>
                                    <Input
                                      id={`password-${client.id}`}
                                      type="password"
                                      placeholder="Enter secure password"
                                      value={clientPasswordForm.password}
                                      onChange={(e) => setClientPasswordForm({...clientPasswordForm, password: e.target.value})}
                                    />
                                  </div>
                                  <div className="flex gap-2">
                                    <Button 
                                      size="sm" 
                                      className="bg-green-600 hover:bg-green-700"
                                      onClick={() => handleCreatePassword(client.email)}
                                    >
                                      Create & Send Password
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => setShowCreatePassword(null)}
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                         </div>
                       ))}
                     </div>
                   </div>

                  {/* Add New Client Form */}
                  <div className="p-6 bg-gray-50 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-4">Add New Client</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="clientName">Client Name</Label>
                        <Input
                          id="clientName"
                          value={clientForm.name}
                          onChange={(e) => setClientForm({...clientForm, name: e.target.value})}
                          placeholder="Enter client name"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="clientEmail">Email</Label>
                        <Input
                          id="clientEmail"
                          type="email"
                          value={clientForm.email}
                          onChange={(e) => setClientForm({...clientForm, email: e.target.value})}
                          placeholder="client@example.com"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="clientPhone">Phone Number</Label>
                        <Input
                          id="clientPhone"
                          value={clientForm.phone}
                          onChange={(e) => setClientForm({...clientForm, phone: e.target.value})}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="clientCompany">Company</Label>
                        <Input
                          id="clientCompany"
                          value={clientForm.company}
                          onChange={(e) => setClientForm({...clientForm, company: e.target.value})}
                          placeholder="Company Name"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="companyWebsite">Company Website</Label>
                        <Input
                          id="companyWebsite"
                          value={clientForm.companyWebsite}
                          onChange={(e) => setClientForm({...clientForm, companyWebsite: e.target.value})}
                          placeholder="www.company.com"
                        />
                      </div>
                       
                       <div>
                         <Label htmlFor="stripeCustomerId">Stripe Customer ID</Label>
                         <Input
                           id="stripeCustomerId"
                           value={clientForm.stripeCustomerId}
                           onChange={(e) => setClientForm({...clientForm, stripeCustomerId: e.target.value})}
                           placeholder="cus_abc123..."
                         />
                       </div>

                       <div>
                         <Label htmlFor="stripeEmail">Stripe Email</Label>
                         <Input
                           id="stripeEmail"
                           type="email"
                           value={clientForm.stripeEmail}
                           onChange={(e) => setClientForm({...clientForm, stripeEmail: e.target.value})}
                           placeholder="billing@company.com"
                         />
                       </div>
                      
                      <div>
                        <Label htmlFor="jiraEmail">Jira Email</Label>
                        <Input
                          id="jiraEmail"
                          type="email"
                          value={clientForm.jiraEmail}
                          onChange={(e) => setClientForm({...clientForm, jiraEmail: e.target.value})}
                          placeholder="support@company.com"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Label htmlFor="companyAddress">Company Address</Label>
                      <Input
                        id="companyAddress"
                        value={clientForm.companyAddress}
                        onChange={(e) => setClientForm({...clientForm, companyAddress: e.target.value})}
                        placeholder="Full company address"
                        className="w-full"
                      />
                    </div>
                    
                    <div className="mt-4">
                      <Label htmlFor="clientServices">Services Provided</Label>
                      <Input
                        id="clientServices"
                        value={clientForm.services}
                        onChange={(e) => setClientForm({...clientForm, services: e.target.value})}
                        placeholder="Enter services separated by commas (e.g., Managed IT Services, Cloud Hosting, Cybersecurity)"
                        className="w-full"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Type the services you provide to this client, separated by commas
                      </p>
                    </div>
                    
                    <div className="flex gap-3 mt-6">
                      <Button onClick={handleAddClient} className="bg-green-600 hover:bg-green-700">
                        Add Client
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowClientManagement(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Account Information Section */}
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Account Information
              </CardTitle>
              <Button 
                onClick={handleSignOut}
                variant="outline"
                className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
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
            
            {/* Always expanded profile details */}
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
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Company Name</p>
                  <p className="font-medium">CloudMor</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company Website</p>
                  <p className="font-medium">www.cloudmor.com</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Company Address</p>
                  <p className="font-medium">27632 Falkirk, Mission Viejo, CA 92691</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
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
               {(() => {
                 const userServices = getUserServices();
                 
                 if (isAdmin) {
                   return (
                     <div className="text-center py-8">
                       <p className="text-gray-500 text-lg mb-4">
                         Services will be populated based on client assignments
                       </p>
                       <p className="text-sm text-gray-400">
                         Use Client Management to assign services to users
                       </p>
                     </div>
                   );
                 } else if (userServices.length === 0) {
                   return (
                     <div className="text-center py-8">
                       <p className="text-gray-500 text-lg mb-4">
                         No services assigned yet
                       </p>
                       <p className="text-sm text-gray-400">
                         Contact your administrator to get services assigned
                       </p>
                     </div>
                   );
                 } else {
                   return (
                     <div className="space-y-3">
                       <h3 className="font-semibold text-lg mb-4">Your Assigned Services</h3>
                       {userServices.map((service, index) => (
                         <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                           <div className="flex items-center gap-3">
                             <CheckCircle className="w-5 h-5 text-green-600" />
                             <span className="font-medium text-gray-800">{service}</span>
                           </div>
                         </div>
                       ))}
                     </div>
                   );
                 }
               })()}
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
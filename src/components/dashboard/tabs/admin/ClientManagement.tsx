import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Edit, Eye, Trash2, Building2, RotateCcw, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Client {
  id: string;
  company_name: string;
  contact_email: string;
  stripe_email: string;
  jira_email: string;
  contact_name: string;
  phone: string;
  address: string;
  stripe_customer_id: string;
  created_at: string;
}

interface ClientService {
  id: string;
  service_name: string;
  service_description: string;
  status: string;
}

export const ClientManagement = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    company_name: '',
    contact_email: '',
    contact_name: '',
    phone: '',
    address: '',
    stripe_customer_id: '',
    password: '',
    services: [] as string[]
  });

  const serviceOptions = [
    'Managed IT Services',
    'Cloud Services',
    'Cybersecurity',
    'IT Strategy & Consulting',
    'Business Communications',
    'Professional Services',
    'Web Design & Development'
  ];

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('company_name', { ascending: true });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Failed to fetch clients');
    }
  };

  const handleCreateClient = async () => {
    if (!formData.password.trim()) {
      toast.error('Password is required for new clients');
      return;
    }

    try {
      // First create the Supabase auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: formData.contact_email,
        password: formData.password,
        email_confirm: true,
        user_metadata: {
          full_name: formData.contact_name,
          company_name: formData.company_name
        }
      });

      if (authError) throw authError;

      // Then create the client record
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .insert({
          company_name: formData.company_name,
          contact_email: formData.contact_email,
          contact_name: formData.contact_name,
          phone: formData.phone,
          address: formData.address,
          stripe_customer_id: formData.stripe_customer_id
        })
        .select()
        .single();

      if (clientError) throw clientError;

      // Add services for the client
      if (selectedServices.length > 0) {
        const serviceInserts = selectedServices.map(service => ({
          client_id: clientData.id,
          service_name: service,
          service_description: `${service} for ${formData.company_name}`
        }));

        const { error: serviceError } = await supabase
          .from('client_services')
          .insert(serviceInserts);

        if (serviceError) throw serviceError;
      }

      // Send welcome email with credentials
      try {
        const { error: emailError } = await supabase.functions.invoke('send-user-credentials', {
          body: {
            email: formData.contact_email,
            full_name: formData.contact_name || formData.company_name,
            password: formData.password,
            company_name: formData.company_name,
            role: 'client'
          }
        });

        if (emailError) {
          console.error('Error sending welcome email:', emailError);
          toast.warning('Client created but welcome email failed to send');
        } else {
          toast.success('Client created and welcome email sent successfully');
        }
      } catch (emailError) {
        console.error('Error sending welcome email:', emailError);
        toast.warning('Client created but welcome email failed to send');
      }

      fetchClients();
      resetForm();
    } catch (error) {
      console.error('Error creating client:', error);
      toast.error('Failed to create client: ' + (error as any).message);
    }
  };

  const handleResetPassword = async (client: Client) => {
    const newPassword = prompt(`Enter new password for ${client.contact_name || client.company_name}:`);
    
    if (!newPassword) return;
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      // Update the user's password in Supabase auth
      const { error } = await supabase.auth.admin.updateUserById(
        client.contact_email, // Using email as identifier
        { password: newPassword }
      );

      if (error) throw error;

      // Send new credentials email
      try {
        await supabase.functions.invoke('send-user-credentials', {
          body: {
            email: client.contact_email,
            full_name: client.contact_name || client.company_name,
            password: newPassword,
            company_name: client.company_name,
            role: 'client'
          }
        });
        toast.success('Password reset and new credentials sent via email');
      } catch (emailError) {
        toast.success('Password reset successfully (email sending failed)');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('Failed to reset password: ' + (error as any).message);
    }
  };

  const handleUpdateClient = async () => {
    if (!editingClient) return;

    try {
      const { error } = await supabase
        .from('clients')
        .update({
          company_name: formData.company_name,
          contact_email: formData.contact_email,
          contact_name: formData.contact_name,
          phone: formData.phone,
          address: formData.address,
          stripe_customer_id: formData.stripe_customer_id
        })
        .eq('id', editingClient.id);

      if (error) throw error;

      toast.success('Client updated successfully');
      fetchClients();
      resetForm();
    } catch (error) {
      console.error('Error updating client:', error);
      toast.error('Failed to update client');
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm('Are you sure you want to delete this client?')) return;

    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Client deleted successfully');
      fetchClients();
    } catch (error) {
      console.error('Error deleting client:', error);
      toast.error('Failed to delete client');
    }
  };

  const handleImpersonateClient = (client: Client) => {
    // Store client info in localStorage for impersonation
    localStorage.setItem('impersonating_client', JSON.stringify({
      id: client.id,
      company_name: client.company_name,
      contact_email: client.contact_email,
      contact_name: client.contact_name
    }));

    toast.success(`Now impersonating ${client.company_name}`);
    // Reload the page to update the context
    window.location.reload();
  };

  const resetForm = () => {
    setFormData({
      company_name: '',
      contact_email: '',
      contact_name: '',
      phone: '',
      address: '',
      stripe_customer_id: '',
      password: '',
      services: []
    });
    setSelectedServices([]);
    setShowForm(false);
    setEditingClient(null);
  };

  const startEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      company_name: client.company_name,
      contact_email: client.contact_email,
      contact_name: client.contact_name,
      phone: client.phone || '',
      address: client.address || '',
      stripe_customer_id: client.stripe_customer_id || '',
      password: '',
      services: []
    });
    setShowForm(true);
  };

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-600" />
            Client Management
          </h3>
          <p className="text-gray-600">Manage your clients and their services</p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Client
        </Button>
      </div>

      {showForm && (
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-xl text-blue-800">
              {editingClient ? 'Edit Client' : 'Create New Client'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company_name">Company Name *</Label>
                <Input
                  id="company_name"
                  value={formData.company_name}
                  onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                  className="border-blue-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="contact_name">Contact Name</Label>
                <Input
                  id="contact_name"
                  value={formData.contact_name}
                  onChange={(e) => setFormData({...formData, contact_name: e.target.value})}
                  className="border-blue-300 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="contact_email">Client Email *</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={formData.contact_email}
                  onChange={(e) => setFormData({...formData, contact_email: e.target.value})}
                  className="border-blue-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="stripe_email">Stripe Email (Auto-populated)</Label>
                <Input
                  id="stripe_email"
                  value={formData.contact_email}
                  disabled
                  className="bg-gray-100"
                />
              </div>
              <div>
                <Label htmlFor="jira_email">Jira Email (Auto-populated)</Label>
                <Input
                  id="jira_email"
                  value={formData.contact_email}
                  disabled
                  className="bg-gray-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="border-blue-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="stripe_customer_id">Stripe Customer ID</Label>
                <Input
                  id="stripe_customer_id"
                  value={formData.stripe_customer_id}
                  onChange={(e) => setFormData({...formData, stripe_customer_id: e.target.value})}
                  className="border-blue-300 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="border-blue-300 focus:border-blue-500"
                rows={3}
              />
            </div>

            {!editingClient && (
              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="border-blue-300 focus:border-blue-500"
                  placeholder="Password for client login"
                />
              </div>
            )}

            {!editingClient && (
              <div>
                <Label>Services Provided</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {serviceOptions.map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={service}
                        checked={selectedServices.includes(service)}
                        onChange={() => handleServiceToggle(service)}
                        className="rounded border-blue-300"
                      />
                      <Label htmlFor={service} className="text-sm">{service}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button 
                onClick={editingClient ? handleUpdateClient : handleCreateClient}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                {editingClient ? 'Update Client' : 'Create Client'}
              </Button>
              <Button onClick={resetForm} variant="outline">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-gradient-to-br from-gray-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Existing Clients ({clients.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {clients.map((client) => (
                <Card key={client.id} className="border border-blue-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h4 className="font-bold text-lg text-blue-800">{client.company_name}</h4>
                        <p className="text-gray-600">Contact: {client.contact_name}</p>
                        <p className="text-gray-600">Email: {client.contact_email}</p>
                        <p className="text-gray-600">Phone: {client.phone}</p>
                        {client.stripe_customer_id && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Stripe Customer
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => startEdit(client)}
                          size="sm"
                          variant="outline"
                          className="text-blue-600 border-blue-600 hover:bg-blue-50"
                          title="Edit Client"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleResetPassword(client)}
                          size="sm"
                          variant="outline"
                          className="text-orange-600 border-orange-600 hover:bg-orange-50"
                          title="Reset Password"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleImpersonateClient(client)}
                          size="sm"
                          variant="outline"
                          className="text-purple-600 border-purple-600 hover:bg-purple-50"
                          title="Impersonate Client"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteClient(client.id)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-600 hover:bg-red-50"
                          title="Delete Client"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
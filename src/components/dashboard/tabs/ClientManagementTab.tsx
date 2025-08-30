import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Loader2, UserPlus, Edit, Trash2, Users, RefreshCw } from 'lucide-react';

interface ClientData {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  job_title?: string;
  role: string;
  stripe_customer_id?: string;
  company_id?: string;
  created_at: string;
  updated_at: string;
}

interface FormData {
  full_name: string;
  email: string;
  phone: string;
  job_title: string;
  role: string;
  stripe_customer_id: string;
}

export const ClientManagementTab = () => {
  const { user, profile } = useAuth();
  const [clients, setClients] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    phone: '',
    job_title: '',
    role: 'client',
    stripe_customer_id: ''
  });

  // Check if user is admin
  if (profile?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <p className="text-white/70">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching clients:', error);
        toast.error('Failed to load clients');
        return;
      }

      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Failed to load clients');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      full_name: '',
      email: '',
      phone: '',
      job_title: '',
      role: 'client',
      stripe_customer_id: ''
    });
    setEditingClient(null);
  };

  const openAddDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEditDialog = (client: ClientData) => {
    setFormData({
      full_name: client.full_name || '',
      email: client.email || '',
      phone: client.phone || '',
      job_title: client.job_title || '',
      role: client.role || 'client',
      stripe_customer_id: client.stripe_customer_id || ''
    });
    setEditingClient(client);
    setDialogOpen(true);
  };

  const saveClient = async () => {
    try {
      setSaving(true);

      if (!formData.full_name || !formData.email) {
        toast.error('Name and email are required');
        return;
      }

      if (editingClient) {
        // Update existing client
        const { error } = await supabase
          .from('profiles')
          .update({
            full_name: formData.full_name,
            phone: formData.phone,
            job_title: formData.job_title,
            role: formData.role,
            stripe_customer_id: formData.stripe_customer_id || null,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingClient.id);

        if (error) {
          toast.error('Failed to update client');
          return;
        }

        toast.success('Client updated successfully!');
      } else {
        // Create new client - this would require creating a new auth user
        // For now, we'll show a message about this limitation
        toast.error('Creating new clients requires auth user creation. Please use the sign-up process.');
        return;
      }

      setDialogOpen(false);
      resetForm();
      await fetchClients();
    } catch (error) {
      console.error('Error saving client:', error);
      toast.error('Failed to save client');
    } finally {
      setSaving(false);
    }
  };

  const deleteClient = async (client: ClientData) => {
    if (!confirm(`Are you sure you want to delete ${client.full_name}?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', client.id);

      if (error) {
        toast.error('Failed to delete client');
        return;
      }

      toast.success('Client deleted successfully!');
      await fetchClients();
    } catch (error) {
      console.error('Error deleting client:', error);
      toast.error('Failed to delete client');
    }
  };

  const syncClientWithStripe = async (client: ClientData) => {
    try {
      setSaving(true);
      
      // Call the sync function with the client's email
      const { data, error } = await supabase.functions.invoke('sync-profile-stripe', {
        headers: {
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        }
      });

      if (error) {
        toast.error('Failed to sync with Stripe');
        return;
      }

      if (data?.customer) {
        // Update the client's stripe_customer_id
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ 
            stripe_customer_id: data.customer.id,
            updated_at: new Date().toISOString()
          })
          .eq('id', client.id);

        if (updateError) {
          console.error('Profile update error:', updateError);
        } else {
          toast.success(`${client.full_name} synced with Stripe successfully!`);
          await fetchClients();
        }
      }
    } catch (error) {
      console.error('Error syncing with Stripe:', error);
      toast.error('Failed to sync with Stripe');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Client Management</h1>
          <p className="text-white/80">Manage client profiles and Stripe customer data</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={fetchClients}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={openAddDialog}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Client
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700 text-white">
              <DialogHeader>
                <DialogTitle>
                  {editingClient ? 'Edit Client' : 'Add New Client'}
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  {editingClient 
                    ? 'Update client information and Stripe integration'
                    : 'Note: New clients must sign up through the registration process first'
                  }
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                    placeholder="Enter full name"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                    className="bg-gray-800 border-gray-600 text-white"
                    disabled={!!editingClient}
                  />
                  {editingClient && (
                    <p className="text-xs text-gray-400">Email cannot be changed for existing clients</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter phone number"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job_title">Job Title</Label>
                  <Input
                    id="job_title"
                    value={formData.job_title}
                    onChange={(e) => setFormData(prev => ({ ...prev, job_title: e.target.value }))}
                    placeholder="Enter job title"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stripe_customer_id">Stripe Customer ID</Label>
                  <Input
                    id="stripe_customer_id"
                    value={formData.stripe_customer_id}
                    onChange={(e) => setFormData(prev => ({ ...prev, stripe_customer_id: e.target.value }))}
                    placeholder="cus_xxxxxxxxxx (optional)"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setDialogOpen(false)}
                    className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={saveClient}
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      editingClient ? 'Update Client' : 'Add Client'
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Users className="h-5 w-5" />
            All Clients ({clients.length})
          </CardTitle>
          <CardDescription className="text-white/70">
            Manage client information and Stripe integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/20">
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Email</TableHead>
                  <TableHead className="text-white">Phone</TableHead>
                  <TableHead className="text-white">Job Title</TableHead>
                  <TableHead className="text-white">Role</TableHead>
                  <TableHead className="text-white">Stripe ID</TableHead>
                  <TableHead className="text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id} className="border-white/10">
                    <TableCell className="text-white font-medium">{client.full_name}</TableCell>
                    <TableCell className="text-white/80">{client.email}</TableCell>
                    <TableCell className="text-white/80">{client.phone || '-'}</TableCell>
                    <TableCell className="text-white/80">{client.job_title || '-'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        client.role === 'admin' 
                          ? 'bg-orange-500/20 text-orange-300' 
                          : 'bg-blue-500/20 text-blue-300'
                      }`}>
                        {client.role}
                      </span>
                    </TableCell>
                    <TableCell className="text-white/80">
                      {client.stripe_customer_id ? (
                        <span className="text-green-300">{client.stripe_customer_id}</span>
                      ) : (
                        <span className="text-yellow-300">Not linked</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(client)}
                          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        {!client.stripe_customer_id && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => syncClientWithStripe(client)}
                            className="bg-green-600/20 border-green-400/30 text-green-300 hover:bg-green-600/30"
                          >
                            <RefreshCw className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteClient(client)}
                          className="bg-red-600/20 border-red-400/30 text-red-300 hover:bg-red-600/30"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {clients.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-white/30 mx-auto mb-4" />
              <p className="text-white/70 text-lg">No clients found</p>
              <p className="text-white/50">Add your first client to get started</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
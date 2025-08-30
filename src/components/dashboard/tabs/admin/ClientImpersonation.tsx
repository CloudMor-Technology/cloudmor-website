import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { UserCheck, Eye, LogOut, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Client {
  id: string;
  company_name: string;
  contact_email: string;
  contact_name: string;
}

export const ClientImpersonation = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string>('');
  const [currentImpersonation, setCurrentImpersonation] = useState<Client | null>(null);

  useEffect(() => {
    fetchClients();
    checkCurrentImpersonation();
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('id, company_name, contact_email, contact_name')
        .order('company_name', { ascending: true });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Failed to fetch clients');
    }
  };

  const checkCurrentImpersonation = () => {
    const impersonationData = localStorage.getItem('impersonating_client');
    if (impersonationData) {
      try {
        const client = JSON.parse(impersonationData);
        setCurrentImpersonation(client);
      } catch (error) {
        console.error('Error parsing impersonation data:', error);
        localStorage.removeItem('impersonating_client');
      }
    }
  };

  const handleImpersonateClient = () => {
    const selectedClient = clients.find(client => client.id === selectedClientId);
    if (!selectedClient) {
      toast.error('Please select a client to impersonate');
      return;
    }

    // Store client info in localStorage for impersonation
    localStorage.setItem('impersonating_client', JSON.stringify({
      id: selectedClient.id,
      company_name: selectedClient.company_name,
      contact_email: selectedClient.contact_email,
      contact_name: selectedClient.contact_name
    }));

    toast.success(`Now impersonating ${selectedClient.company_name}`);
    setCurrentImpersonation(selectedClient);
    
    // Clear selection
    setSelectedClientId('');
    
    // Reload the page to update the context
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleStopImpersonation = () => {
    localStorage.removeItem('impersonating_client');
    setCurrentImpersonation(null);
    toast.success('Stopped impersonation - back to admin view');
    
    // Reload the page to update the context
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-purple-600" />
            Client Impersonation
          </h3>
          <p className="text-gray-600">View the portal from a client's perspective</p>
        </div>
      </div>

      {currentImpersonation && (
        <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
          <CardHeader>
            <CardTitle className="text-xl text-orange-800 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Currently Impersonating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <h4 className="font-bold text-lg text-orange-800">
                  {currentImpersonation.company_name}
                </h4>
                <p className="text-orange-600">Contact: {currentImpersonation.contact_name}</p>
                <p className="text-orange-600">Email: {currentImpersonation.contact_email}</p>
                <Badge className="bg-orange-100 text-orange-800 border-orange-300">
                  Impersonation Active
                </Badge>
              </div>
              <Button
                onClick={handleStopImpersonation}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Stop Impersonation
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-purple-600" />
            Select Client to Impersonate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose Client
              </label>
              <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                <SelectTrigger className="border-purple-300 focus:border-purple-500">
                  <SelectValue placeholder="Select a client to impersonate..." />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{client.company_name}</span>
                        <span className="text-sm text-gray-500">{client.contact_email}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleImpersonateClient}
              disabled={!selectedClientId}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              <Eye className="w-4 h-4 mr-2" />
              Start Impersonation
            </Button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">How Impersonation Works:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Select a client from the dropdown above</li>
              <li>• Click "Start Impersonation" to view their portal experience</li>
              <li>• You'll see their services, billing, and account information</li>
              <li>• Use "Stop Impersonation" to return to the admin view</li>
              <li>• The page will reload to apply the changes</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
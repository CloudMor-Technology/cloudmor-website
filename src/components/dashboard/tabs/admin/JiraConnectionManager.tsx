import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RefreshCw, Settings, Globe, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface JiraConnection {
  id: string;
  company_name: string;
  contact_email: string;
  jira_email: string;
  jira_base_url: string;
  jira_connected: boolean;
  jira_last_sync: string;
  jira_expires_at: string;
}

export const JiraConnectionManager = () => {
  const { toast } = useToast();
  const [connections, setConnections] = useState<JiraConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingClient, setEditingClient] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    jira_base_url: '',
    jira_email: ''
  });

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('clients')
        .select('id, company_name, contact_email, jira_email, jira_base_url, jira_connected, jira_last_sync, jira_expires_at')
        .order('company_name');

      if (error) throw error;
      setConnections(data || []);
    } catch (error) {
      console.error('Error fetching Jira connections:', error);
      toast({
        title: "Error",
        description: "Failed to fetch Jira connections",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (client: JiraConnection) => {
    setEditingClient(client.id);
    setEditForm({
      jira_base_url: client.jira_base_url || '',
      jira_email: client.jira_email || client.contact_email
    });
  };

  const handleSave = async (clientId: string) => {
    try {
      const { error } = await supabase
        .from('clients')
        .update({
          jira_base_url: editForm.jira_base_url,
          jira_email: editForm.jira_email,
          updated_at: new Date().toISOString()
        })
        .eq('id', clientId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Jira settings updated successfully",
      });

      setEditingClient(null);
      fetchConnections();
    } catch (error) {
      console.error('Error updating Jira settings:', error);
      toast({
        title: "Error",
        description: "Failed to update Jira settings",
        variant: "destructive",
      });
    }
  };

  const resetConnection = async (clientId: string) => {
    try {
      const { error } = await supabase
        .from('clients')
        .update({
          jira_access_token: null,
          jira_refresh_token: null,
          jira_connected: false,
          jira_expires_at: null,
          jira_last_sync: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', clientId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Jira connection reset successfully",
      });

      fetchConnections();
    } catch (error) {
      console.error('Error resetting Jira connection:', error);
      toast({
        title: "Error",
        description: "Failed to reset Jira connection",
        variant: "destructive",
      });
    }
  };

  const testConnection = async (client: JiraConnection) => {
    try {
      if (!client.jira_base_url) {
        toast({
          title: "Error",
          description: "No Jira base URL configured for this client",
          variant: "destructive",
        });
        return;
      }

      // Test if the URL is accessible
      const testUrl = `${client.jira_base_url}/rest/api/3/serverInfo`;
      toast({
        title: "Testing Connection",
        description: `Testing connection to ${client.jira_base_url}...`,
      });

      // Note: This is a simple connectivity test
      // In a real implementation, you might want to use the OAuth token to test authentication
      const response = await fetch(testUrl, { 
        method: 'GET',
        mode: 'no-cors' // This will always succeed but we can't read the response
      });
      
      toast({
        title: "Connection Test",
        description: "URL appears to be reachable. Use OAuth connection for full access test.",
      });

    } catch (error) {
      console.error('Error testing connection:', error);
      toast({
        title: "Connection Error",
        description: "Failed to reach Jira instance",
        variant: "destructive",
      });
    }
  };

  const getConnectionStatus = (client: JiraConnection) => {
    if (!client.jira_connected) {
      return { status: 'disconnected', color: 'red', text: 'Not Connected' };
    }

    if (client.jira_expires_at) {
      const expiresAt = new Date(client.jira_expires_at);
      const now = new Date();
      
      if (expiresAt > now) {
        return { status: 'connected', color: 'green', text: 'Connected' };
      } else {
        return { status: 'expired', color: 'yellow', text: 'Token Expired' };
      }
    }

    return { status: 'unknown', color: 'gray', text: 'Unknown Status' };
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-lg">Loading Jira connections...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Globe className="w-6 h-6" />
            Jira Connection Management
          </CardTitle>
          <p className="text-gray-600">
            Manage Jira OAuth connections for all clients. Configure base URLs and monitor connection status.
          </p>
        </CardHeader>
        <CardContent>
          <Button onClick={fetchConnections} className="mb-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Connections
          </Button>
        </CardContent>
      </Card>

      {connections.map((client) => {
        const connectionStatus = getConnectionStatus(client);
        const isEditing = editingClient === client.id;

        return (
          <Card key={client.id} className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    {client.company_name}
                    <Badge 
                      variant={connectionStatus.status === 'connected' ? 'default' : 'destructive'}
                      className={`bg-${connectionStatus.color}-100 text-${connectionStatus.color}-800`}
                    >
                      {connectionStatus.status === 'connected' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {connectionStatus.status === 'disconnected' && <XCircle className="w-3 h-3 mr-1" />}
                      {connectionStatus.status === 'expired' && <AlertCircle className="w-3 h-3 mr-1" />}
                      {connectionStatus.text}
                    </Badge>
                  </CardTitle>
                  <p className="text-gray-600">{client.contact_email}</p>
                  {client.jira_last_sync && (
                    <p className="text-sm text-gray-500">
                      Last sync: {new Date(client.jira_last_sync).toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testConnection(client)}
                  >
                    <Globe className="w-4 h-4 mr-1" />
                    Test
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(client)}
                  >
                    <Settings className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => resetConnection(client.id)}
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Reset
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`jira-url-${client.id}`}>Jira Base URL</Label>
                    <Input
                      id={`jira-url-${client.id}`}
                      value={editForm.jira_base_url}
                      onChange={(e) => setEditForm(prev => ({ ...prev, jira_base_url: e.target.value }))}
                      placeholder="https://yourcompany.atlassian.net"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`jira-email-${client.id}`}>Jira Email</Label>
                    <Input
                      id={`jira-email-${client.id}`}
                      value={editForm.jira_email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, jira_email: e.target.value }))}
                      placeholder="user@company.com"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleSave(client.id)}>
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setEditingClient(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Jira Base URL</Label>
                    <p className="text-sm text-gray-600">
                      {client.jira_base_url || 'Not configured'}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Jira Email</Label>
                    <p className="text-sm text-gray-600">
                      {client.jira_email || client.contact_email}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}

      {connections.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Clients Found</h3>
            <p className="text-gray-500">Create some clients first to manage their Jira connections.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
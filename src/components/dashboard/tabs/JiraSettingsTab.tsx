import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, CheckCircle, XCircle, TestTube, Save, ExternalLink } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface JiraConnection {
  jira_base_url: string;
  jira_email: string;
  jira_connected: boolean;
  jira_last_test: string | null;
}

export const JiraSettingsTab = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    jiraBaseUrl: 'https://cloudmor.atlassian.net',
    jiraEmail: '',
    jiraApiToken: ''
  });
  
  const [showToken, setShowToken] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testing, setTesting] = useState(false);
  const [connection, setConnection] = useState<JiraConnection | null>(null);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    if (profile?.email) {
      setFormData(prev => ({
        ...prev,
        jiraEmail: profile.email
      }));
      fetchConnectionStatus();
    }
  }, [profile]);

  const fetchConnectionStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('jira_base_url, jira_email, jira_connected, jira_last_test')
        .eq('contact_email', profile?.email)
        .maybeSingle();

      if (error) {
        console.error('Error fetching connection status:', error);
        return;
      }

      if (data) {
        setConnection(data);
        setFormData(prev => ({
          ...prev,
          jiraBaseUrl: data.jira_base_url || 'https://cloudmor.atlassian.net',
          jiraEmail: data.jira_email || profile?.email || ''
        }));
      }
    } catch (error) {
      console.error('Error fetching connection status:', error);
    }
  };

  const handleTestConnection = async () => {
    if (!formData.jiraApiToken) {
      toast({
        title: "Error",
        description: "Please enter your API token first.",
        variant: "destructive"
      });
      return;
    }

    setTesting(true);
    setTestResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('jira-api-auth', {
        body: {
          jiraBaseUrl: formData.jiraBaseUrl,
          jiraEmail: formData.jiraEmail,
          jiraApiToken: formData.jiraApiToken,
          action: 'test'
        }
      });

      if (error) throw error;

      if (data.success) {
        setTestResult({ success: true, message: 'Connection successful!' });
        toast({
          title: "Success",
          description: "Jira connection test successful!",
        });
      } else {
        setTestResult({ success: false, message: data.error || 'Connection failed' });
        toast({
          title: "Connection Failed",
          description: data.error || 'Please check your credentials.',
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error testing connection:', error);
      setTestResult({ success: false, message: 'Connection test failed' });
      toast({
        title: "Error",
        description: "Failed to test connection. Please try again.",
        variant: "destructive"
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSaveSettings = async () => {
    if (!formData.jiraApiToken) {
      toast({
        title: "Error",
        description: "Please enter your API token first.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('jira-api-auth', {
        body: {
          jiraBaseUrl: formData.jiraBaseUrl,
          jiraEmail: formData.jiraEmail,
          jiraApiToken: formData.jiraApiToken,
          action: 'save'
        }
      });

      if (error) throw error;

      if (data.success) {
        toast({
          title: "Success",
          description: "Jira settings saved successfully!",
        });
        
        // Clear the token input for security
        setFormData(prev => ({ ...prev, jiraApiToken: '' }));
        
        // Refresh connection status
        await fetchConnectionStatus();
      } else {
        toast({
          title: "Save Failed",
          description: data.error || 'Failed to save settings.',
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Connection Status
            {connection?.jira_connected ? (
              <Badge variant="default" className="bg-green-500">
                <CheckCircle className="w-3 h-3 mr-1" />
                Connected
              </Badge>
            ) : (
              <Badge variant="destructive">
                <XCircle className="w-3 h-3 mr-1" />
                Not Connected
              </Badge>
            )}
          </CardTitle>
          {connection?.jira_last_test && (
            <CardDescription>
              Last tested: {new Date(connection.jira_last_test).toLocaleString()}
            </CardDescription>
          )}
        </CardHeader>
      </Card>

      {/* Settings Form */}
      <Card>
        <CardHeader>
          <CardTitle>Jira Configuration</CardTitle>
          <CardDescription>
            Configure your Jira Service Management connection using API tokens for secure access.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="jiraBaseUrl">Jira Base URL</Label>
              <Input
                id="jiraBaseUrl"
                type="url"
                value={formData.jiraBaseUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, jiraBaseUrl: e.target.value }))}
                placeholder="https://yourcompany.atlassian.net"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jiraEmail">Jira Email</Label>
              <Input
                id="jiraEmail"
                type="email"
                value={formData.jiraEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, jiraEmail: e.target.value }))}
                placeholder="your.email@company.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jiraApiToken">API Token</Label>
              <div className="relative">
                <Input
                  id="jiraApiToken"
                  type={showToken ? "text" : "password"}
                  value={formData.jiraApiToken}
                  onChange={(e) => setFormData(prev => ({ ...prev, jiraApiToken: e.target.value }))}
                  placeholder="Enter your Jira API token"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowToken(!showToken)}
                >
                  {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {testResult && (
            <Alert className={testResult.success ? "border-green-500" : "border-red-500"}>
              <AlertDescription className="flex items-center gap-2">
                {testResult.success ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                {testResult.message}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handleTestConnection}
              disabled={testing || !formData.jiraApiToken}
              variant="outline"
              className="flex items-center gap-2"
            >
              <TestTube className="w-4 h-4" />
              {testing ? 'Testing...' : 'Test Connection'}
            </Button>

            <Button
              onClick={handleSaveSettings}
              disabled={loading || !formData.jiraApiToken}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            How to Generate an API Token
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm space-y-2">
            <p><strong>1.</strong> Go to your Atlassian account settings: <code>https://id.atlassian.com/manage-profile/security/api-tokens</code></p>
            <p><strong>2.</strong> Click "Create API token"</p>
            <p><strong>3.</strong> Enter a label like "CloudMor Portal Access"</p>
            <p><strong>4.</strong> Copy the generated token and paste it above</p>
            <p><strong>5.</strong> Click "Test Connection" to verify your settings</p>
          </div>
          
          <Alert>
            <AlertDescription>
              <strong>Security Note:</strong> API tokens are encrypted before storage and never displayed in plain text after saving.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  ExternalLink, 
  Mail, 
  MessageCircle, 
  Phone, 
  Clock, 
  CheckCircle,
  XCircle,
  RefreshCw,
  Settings
} from 'lucide-react';
import { ClientSupportDocuments } from './support/ClientSupportDocuments';

export const SupportTab = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  
  const [jiraConnectionStatus, setJiraConnectionStatus] = useState<{
    connected: boolean;
    loading: boolean;
    lastTest?: string;
  }>({
    connected: false,
    loading: true
  });

  const checkJiraConnectionStatus = async () => {
    if (!profile?.email) return;

    try {
      setJiraConnectionStatus(prev => ({ ...prev, loading: true }));

      const { data, error } = await supabase
        .from('clients')
        .select('jira_connected, jira_last_test')
        .eq('contact_email', profile.email)
        .maybeSingle();

      if (error) {
        console.error('Error checking Jira connection:', error);
        setJiraConnectionStatus({
          connected: false,
          loading: false
        });
        return;
      }

      setJiraConnectionStatus({
        connected: data?.jira_connected || false,
        loading: false,
        lastTest: data?.jira_last_test
      });

    } catch (error) {
      console.error('Error checking Jira connection:', error);
      setJiraConnectionStatus({
        connected: false,
        loading: false
      });
    }
  };

  useEffect(() => {
    checkJiraConnectionStatus();
  }, [profile]);

  const openJiraPortal = async () => {
    try {
      console.log('Opening Jira portal...');
      
      const { data, error } = await supabase.functions.invoke('jira-portal-access');

      if (error) {
        console.error('Portal access error:', error);
        toast({
          title: "Connection Required",
          description: "Please configure your Jira settings first.",
          variant: "destructive"
        });
        return;
      }

      if (data.success && data.portalUrl) {
        window.open(data.portalUrl, '_blank');
        toast({
          title: "Success",
          description: "Opening Jira portal in a new window.",
        });
      } else {
        toast({
          title: "Connection Error",
          description: data.error || "Failed to access Jira portal.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error opening Jira portal:', error);
      toast({
        title: "Error",
        description: "Failed to access Jira portal. Please try again.",
        variant: "destructive"
      });
    }
  };

  const supportOptions = [
    {
      title: 'Support Portal',
      description: 'Access our Jira Service Management portal for tickets and requests',
      icon: <ExternalLink className="w-6 h-6" />,
      action: jiraConnectionStatus.connected ? openJiraPortal : () => {
        toast({
          title: "Setup Required",
          description: "Please configure your Jira connection in settings first.",
          variant: "destructive"
        });
      },
      primary: true,
      disabled: !jiraConnectionStatus.connected
    },
    {
      title: 'Email Support',
      description: 'Send us an email and we\'ll get back to you within 24 hours',
      icon: <Mail className="w-6 h-6" />,
      action: () => window.location.href = 'mailto:support@cloudmor.com?subject=Support Request',
      primary: false,
      disabled: false
    },
    {
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      icon: <MessageCircle className="w-6 h-6" />,
      action: () => {
        toast({
          title: "Live Chat",
          description: "Please use email support or the Jira portal for assistance.",
        });
      },
      primary: false,
      disabled: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Jira Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Jira Service Management</span>
            <div className="flex items-center gap-2">
              {jiraConnectionStatus.loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : jiraConnectionStatus.connected ? (
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
            </div>
          </CardTitle>
          <CardDescription>
            {jiraConnectionStatus.connected 
              ? 'Your Jira connection is active and ready for support requests.'
              : 'Configure your Jira API token to access the support portal.'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {jiraConnectionStatus.lastTest && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Last tested: {new Date(jiraConnectionStatus.lastTest).toLocaleString()}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={checkJiraConnectionStatus}
                variant="outline" 
                size="sm"
                disabled={jiraConnectionStatus.loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${jiraConnectionStatus.loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support Options */}
      <div className="grid md:grid-cols-3 gap-6">
        {supportOptions.map((option, index) => (
          <Card key={index} className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                {option.icon}
                {option.title}
              </CardTitle>
              <CardDescription>
                {option.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={option.action}
                variant={option.primary ? "default" : "outline"}
                className="w-full"
                size="lg"
                disabled={option.disabled}
              >
                {option.icon}
                <span className="ml-2">{option.title}</span>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emergency Hotline */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <Phone className="w-5 h-5" />
            Emergency Support Hotline
          </CardTitle>
          <CardDescription className="text-red-600">
            For critical issues requiring immediate attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-800 mb-2">
              📞 888-554-6597
            </p>
            <p className="text-red-600">
              Available 24/7 for urgent support needs
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Support Documents */}
      <ClientSupportDocuments />

      {/* Jira Settings Access */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Jira Settings
          </CardTitle>
          <CardDescription>
            Configure your Jira API token and connection settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Set up your Jira Service Management connection using API tokens for secure access to support tickets.
          </p>
        </CardContent>
      </Card>

      {profile?.role === 'admin' && (
        <Card>
          <CardHeader>
            <CardTitle>Admin Support Management</CardTitle>
            <CardDescription>
              Manage support documents and client assignments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              As an admin, you can manage support documents that are available to clients.
              Use the Admin tab to configure support content and client document assignments.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Mail, Phone, MessageCircle, Settings, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { ClientSupportDocuments } from './support/ClientSupportDocuments';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Declare JSDWidget type for TypeScript
declare global {
  interface Window {
    JSDWidget?: {
      show: () => void;
      hide: () => void;
    };
  }
}

export const SupportTab = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const isAdmin = profile?.role === 'admin';
  const [jiraConnectionStatus, setJiraConnectionStatus] = useState<{
    connected: boolean;
    loading: boolean;
    lastSync?: string;
  }>({ connected: false, loading: true });

  // Check Jira connection status on component mount
  useEffect(() => {
    checkJiraConnectionStatus();
  }, [profile]);

  const checkJiraConnectionStatus = async () => {
    if (!profile?.email) return;

    try {
      setJiraConnectionStatus(prev => ({ ...prev, loading: true }));

      // Check if user is impersonating a client
      const impersonationData = localStorage.getItem('impersonating_client');
      let clientEmail = profile.email;
      
      if (impersonationData && profile.role === 'admin') {
        const impersonatedClient = JSON.parse(impersonationData);
        clientEmail = impersonatedClient.contact_email;
      }

      const { data: clientData, error } = await supabase
        .from('clients')
        .select('jira_connected, jira_last_sync, jira_expires_at')
        .eq('contact_email', clientEmail)
        .single();

      if (error) {
        console.error('Error fetching Jira connection status:', error);
        setJiraConnectionStatus({ connected: false, loading: false });
        return;
      }

      const isConnected = clientData?.jira_connected && 
        (!clientData?.jira_expires_at || new Date(clientData.jira_expires_at) > new Date());

      setJiraConnectionStatus({
        connected: isConnected,
        loading: false,
        lastSync: clientData?.jira_last_sync,
      });
    } catch (error) {
      console.error('Error checking Jira connection status:', error);
      setJiraConnectionStatus({ connected: false, loading: false });
    }
  };

  const connectToJira = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to connect to Jira.",
          variant: "destructive",
        });
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Session Error",
          description: "No active session found.",
          variant: "destructive",
        });
        return;
      }

      // Call OAuth init edge function
      const response = await supabase.functions.invoke('jira-oauth-init', {
        body: { clientId: 'jira-oauth' },
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (response.error) {
        console.error('OAuth init error:', response.error);
        toast({
          title: "Connection Error",
          description: "Failed to initialize Jira connection.",
          variant: "destructive",
        });
        return;
      }

      const { authUrl, state, codeVerifier } = response.data;

      // Store OAuth state for fallback
      localStorage.setItem('jira_oauth_state', JSON.stringify({
        state,
        codeVerifier,
        userEmail: profile?.email,
      }));

      // Open OAuth popup
      const popup = window.open(
        authUrl,
        'jira-oauth',
        'width=600,height=700,scrollbars=yes,resizable=yes'
      );

      // Listen for OAuth completion
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin && !event.origin.includes('atlassian.com')) {
          return;
        }

        if (event.data.success) {
          toast({
            title: "Jira Connected!",
            description: "You can now access your Jira portal seamlessly.",
          });
          checkJiraConnectionStatus(); // Refresh connection status
          localStorage.removeItem('jira_oauth_state');
        } else if (event.data.error) {
          toast({
            title: "Connection Failed",
            description: event.data.error || "Failed to connect to Jira.",
            variant: "destructive",
          });
        }

        window.removeEventListener('message', handleMessage);
        if (popup) popup.close();
      };

      window.addEventListener('message', handleMessage);

      // Close popup after 10 minutes if still open
      setTimeout(() => {
        if (popup && !popup.closed) {
          popup.close();
          window.removeEventListener('message', handleMessage);
          toast({
            title: "Connection Timeout",
            description: "OAuth connection timed out. Please try again.",
            variant: "destructive",
          });
        }
      }, 600000);

    } catch (error) {
      console.error('Error connecting to Jira:', error);
      toast({
        title: "Connection Error",
        description: "An error occurred while connecting to Jira.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    // Load Jira Service Desk widget
    const script = document.createElement('script');
    script.setAttribute('data-jsd-embedded', '');
    script.setAttribute('data-key', '7266fae8-8b7d-4231-8579-bce9a92270b2');
    script.setAttribute('data-base-url', 'https://jsd-widget.atlassian.com');
    script.src = 'https://jsd-widget.atlassian.com/assets/embed.js';
    script.async = true;
    
    document.body.appendChild(script);
    
    return () => {
      // Cleanup - check if script exists before removing
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const openJiraPortal = async () => {
    try {
      // Check if user is impersonating a client
      const impersonationData = localStorage.getItem('impersonating_client');
      let clientJiraEmail = null;
      
      if (impersonationData && profile?.role === 'admin') {
        const impersonatedClient = JSON.parse(impersonationData);
        clientJiraEmail = impersonatedClient.jira_email;
      } else {
        // Fetch the client's Jira email from the database
        const { data: clientData, error } = await supabase
          .from('clients')
          .select('jira_email')
          .eq('contact_email', profile?.email)
          .single();
        
        if (error) {
          console.error('Error fetching client Jira email:', error);
        } else {
          clientJiraEmail = clientData?.jira_email;
        }
      }

      if (!clientJiraEmail) {
        console.error('No client Jira email available, using contact email as fallback');
        clientJiraEmail = profile?.email;
      }

      if (!clientJiraEmail) {
        console.error('No client email available');
        window.open('https://support.cloudmor.com/servicedesk/customer/portals', '_blank');
        return;
      }

      console.log('Opening Jira portal with SSO for Jira email:', clientJiraEmail);

      // Call the Jira SSO edge function
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('User not authenticated');
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.error('No active session');
        return;
      }

      const response = await supabase.functions.invoke('jira-sso-login', {
        body: { 
          userEmail: clientJiraEmail,
          redirectUrl: 'https://support.cloudmor.com/servicedesk/customer/portals'
        },
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (response.error) {
        console.error('Jira SSO error:', response.error);
        // Fallback to direct portal access
        window.open('https://support.cloudmor.com/servicedesk/customer/portals', '_blank');
        return;
      }

      const { redirectUrl } = response.data;
      console.log('Opening Jira portal:', redirectUrl);
      window.open(redirectUrl, '_blank');

    } catch (error) {
      console.error('Error opening Jira portal:', error);
      // Fallback to direct portal access
      window.open('https://support.cloudmor.com/servicedesk/customer/portals', '_blank');
    }
  };

  const supportOptions = [
    {
      title: 'CloudMor Support Portal',
      description: 'Submit tickets through our online portal',
      url: 'support.cloudmor.com',
      icon: Globe,
      color: 'blue',
      action: openJiraPortal
    },
    {
      title: 'Email Support',
      description: 'Send us an email for assistance',
      url: 'support@cloudmor.com',
      icon: Mail,
      color: 'green',
      action: () => window.open('mailto:support@cloudmor.com', '_blank')
    },
    {
      title: 'Live Chat Support',
      description: 'Chat with our support team instantly',
      url: 'Start Chat Session',
      icon: MessageCircle,
      color: 'purple',
      action: () => {
        // Trigger Jira Service Desk widget
        if (window.JSDWidget) {
          window.JSDWidget.show();
        }
      }
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Support Center</h2>
          <p className="text-white/70 text-lg">Get help and submit support requests</p>
        </div>
      </div>

      {/* Jira Connection Status */}
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
        <CardHeader>
          <CardTitle className="text-2xl text-green-800 flex items-center gap-2">
            <Settings className="w-6 h-6" />
            Jira Connection Status
            {jiraConnectionStatus.loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
            ) : jiraConnectionStatus.connected ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
          </CardTitle>
          <p className="text-green-600 text-lg">
            {jiraConnectionStatus.loading 
              ? 'Checking connection status...' 
              : jiraConnectionStatus.connected 
                ? 'Connected - Instant portal access enabled'
                : 'Not connected - Click to set up seamless access'
            }
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            {!jiraConnectionStatus.loading && (
              <>
                {jiraConnectionStatus.connected ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <span>Connected to Jira</span>
                    </div>
                    {jiraConnectionStatus.lastSync && (
                      <p className="text-sm text-green-600">
                        Last sync: {new Date(jiraConnectionStatus.lastSync).toLocaleDateString()}
                      </p>
                    )}
                    <div className="flex gap-2 justify-center">
                      <Button 
                        onClick={openJiraPortal}
                        className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-2"
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        Open Portal
                      </Button>
                      <Button 
                        onClick={() => connectToJira()}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Reconnect
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-red-700">
                      <XCircle className="w-4 h-4" />
                      <span>Not connected to Jira</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Connect once for instant access to your support portal
                    </p>
                    <Button 
                      onClick={connectToJira}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Connect to Jira
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Support Options */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {supportOptions.map((option, index) => {
          const IconComponent = option.icon;
          return (
            <Card 
              key={index} 
              className="bg-white/90 backdrop-blur-sm hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-300 animate-pulse hover:animate-none" 
              onClick={option.action}
            >
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 bg-gradient-to-br from-${option.color}-400 to-${option.color}-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg animate-bounce hover:animate-none`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">{option.title}</h3>
                <p className="text-gray-600 text-lg mb-4">{option.description}</p>
                <div className={`bg-gradient-to-r from-${option.color}-500 to-${option.color}-700 text-white px-4 py-2 rounded-full font-bold text-lg shadow-md`}>
                  ✨ {option.url} ✨
                </div>
                <p className="text-xs text-gray-500 mt-2 font-semibold">👆 CLICK HERE TO ACCESS 👆</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Emergency Hotline Information */}
      <Card className="bg-red-50 border-red-200">
        <CardHeader>
          <CardTitle className="text-2xl text-red-800 flex items-center gap-2">
            <Phone className="w-6 h-6" />
            Emergency Support Hotline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="text-red-700 text-lg mb-2">
              For immediate issues or urgent support needs
            </p>
            <p className="text-2xl font-bold text-red-800 mb-2">
              📞 888-554-6597
            </p>
            <p className="text-red-600 font-medium">
              Have your ticket number ready when calling
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Support Portal Access */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800 flex items-center gap-2">
            <Globe className="w-6 h-6" />
            Support Portal Access
          </CardTitle>
          <p className="text-blue-600 text-lg">Connect to our Jira support system</p>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <Button 
              onClick={openJiraPortal}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-3 mr-4 shadow-lg transform hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none"
            >
              <Globe className="w-5 h-5 mr-2" />
              ✨ Open Support Portal ✨
            </Button>
            <Button 
              onClick={() => {
                if (window.JSDWidget) {
                  window.JSDWidget.show();
                }
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-3 shadow-lg transform hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              ✨ Start Chat Support ✨
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Client-Specific Support Documents */}
      <ClientSupportDocuments />

      {isAdmin && (
        <Card className="bg-orange-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-800">Admin: Support Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-700 text-lg mb-4">
              As an administrator, you can modify all support content from the Admin panel.
            </p>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-6 py-3">
              Manage Support Content
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

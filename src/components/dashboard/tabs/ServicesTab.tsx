
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Settings, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface ClientService {
  id: string;
  service_name: string;
  service_description: string | null;
  status: string | null;
  created_at: string;
}

export const ServicesTab = () => {
  const [clientServices, setClientServices] = useState<ClientService[]>([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  useEffect(() => {
    fetchClientServices();
  }, [profile]);

  const fetchClientServices = async () => {
    if (!profile?.email) return;

    try {
      setLoading(true);
      
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
      setLoading(false);
    }
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Services</h2>
          <p className="text-white/70">Monitor and manage your active services</p>
        </div>
        <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
          Service Settings
        </Button>
      </div>

      {/* Service Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">94.9%</p>
                <p className="text-sm text-gray-600">Active Services</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">99.5%</p>
                <p className="text-sm text-gray-600">Uptime Performance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">72.3%</p>
                <p className="text-sm text-gray-600">Average Usage</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">✓</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">100%</p>
                <p className="text-sm text-gray-600">Service Success</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <Card key={n} className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-16 bg-gray-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : clientServices.length === 0 ? (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <p className="text-gray-600 text-lg">No services assigned to your account.</p>
            <p className="text-gray-500">Contact support if you believe this is an error.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {clientServices.map((service, index) => {
            const color = getServiceIcon(service.service_name);
            const status = service.status || 'ACTIVE';
            
            return (
              <Card key={service.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center`}>
                        <span className={`text-${color}-600 font-bold text-lg`}>
                          {service.service_name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.service_name}</CardTitle>
                        <Badge className={getStatusColor(status)}>
                          {status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold text-${color}-600`}>99.9%</p>
                      <p className="text-xs text-gray-500">Uptime</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {service.service_description && (
                    <p className="text-gray-600 text-sm">{service.service_description}</p>
                  )}
                  
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Added: {new Date(service.created_at).toLocaleDateString()}</span>
                    <span>Active Service</span>
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    View Service Details
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

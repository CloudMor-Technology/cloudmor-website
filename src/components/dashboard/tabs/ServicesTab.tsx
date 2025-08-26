
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Settings, Activity } from 'lucide-react';

export const ServicesTab = () => {
  const services = [
    {
      name: 'IT Infrastructure Management',
      status: 'ACTIVE',
      uptime: '99.9%',
      description: 'Comprehensive management of your IT infrastructure including servers, networks, and endpoint devices.',
      features: ['LAN Checks', 'Key Procedures', 'Hardware Management', 'Network Monitoring'],
      lastUpdate: '2024-01-16 08:00',
      nextMaintenance: 'Proactive Security',
      color: 'blue'
    },
    {
      name: 'VoIP Phone System',
      status: 'ACTIVE',
      uptime: '100%',
      description: 'Advanced VoIP telephony solution with unified communications platform.',
      features: ['Nex-Gen System', 'Auto Features', 'Key Features', 'Mobile Applications'],
      lastUpdate: '2024-01-16 08:00',
      nextMaintenance: 'Mobile Integration',
      color: 'green'
    },
    {
      name: 'Cloud Backup & Recovery',
      status: 'ACTIVE',
      uptime: '100%',
      description: 'Automated cloud backup with rapid disaster recovery capabilities.',
      features: ['Live Check', 'Data Protection', 'Key Features', 'Recovery Service'],
      lastUpdate: '2024-01-16 08:00',
      nextMaintenance: 'Point-In-Time Recovery',
      color: 'purple'
    },
    {
      name: 'Cybersecurity Suite',
      status: 'ACTIVE',
      uptime: '100%',
      description: 'Advanced security monitoring and threat protection systems.',
      features: ['Live Check', 'Security Cams', 'Key Features', 'Security Analyst'],
      lastUpdate: '2024-01-16 08:00',
      nextMaintenance: 'Firewall Management',
      color: 'red'
    }
  ];

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-${service.color}-100 rounded-lg flex items-center justify-center`}>
                    <span className={`text-${service.color}-600 font-bold text-lg`}>
                      {service.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <Badge className={getStatusColor(service.status)}>
                      {service.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold text-${service.color}-600`}>{service.uptime}</p>
                  <p className="text-xs text-gray-500">Uptime</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">{service.description}</p>
              
              <div className="grid grid-cols-2 gap-2">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="text-xs bg-gray-100 rounded px-2 py-1">
                    {feature}
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Last Check: {service.lastUpdate}</span>
                <span>{service.nextMaintenance}</span>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

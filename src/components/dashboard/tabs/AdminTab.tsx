
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Server, Activity, Settings } from 'lucide-react';

export const AdminTab = () => {
  const adminStats = [
    { title: 'Total Users', value: '4', icon: Users, color: 'blue' },
    { title: 'Active Services', value: '4', icon: Server, color: 'green' },
    { title: 'Open Tickets', value: '3', icon: Activity, color: 'orange' },
    { title: 'System Status', value: 'Healthy', icon: Settings, color: 'purple' }
  ];

  const recentActivity = [
    { user: 'John Smith', action: 'Last login: 12/31/2024', status: 'online' },
    { user: 'Sarah Johnson', action: 'Last login: 12/31/2024', status: 'online' },
    { user: 'Mike Chen', action: 'Last login: 12/30/2024', status: 'offline' },
    { user: 'Lisa Wilson', action: 'Last login: 12/30/2024', status: 'offline' }
  ];

  const serviceUsage = [
    { service: 'IT Support Package', usage: '$35k/month' },
    { service: 'Cloud Backup Pro', usage: '$15k/month' },
    { service: 'VoIP Phone System', usage: '$8k/month' },
    { service: 'Security Monitoring', usage: '$12k/month' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
          <p className="text-white/70">Manage users, services, and system settings</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white">
          Administrator
        </Button>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-${stat.color}-100 rounded-full flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <div>
                    <p className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Admin Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm">Admin Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-sm">
                Overview
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                User Management
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                Service Management
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                System Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {/* Recent User Activity */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>     
              <CardTitle>Recent User Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        activity.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                      <div>
                        <p className="font-medium">{activity.user}</p>
                        <p className="text-sm text-gray-500">{activity.action}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      activity.status === 'online' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Service Usage */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Service Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceUsage.map((usage, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{usage.service}</p>
                      <p className="text-sm text-gray-500">Active</p>
                    </div>
                    <p className="font-bold text-lg">{usage.usage}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

export const DashboardTab = () => {
  const { profile } = useAuth();

  const stats = [
    { title: 'Active Services', value: '94.5%', color: 'text-green-600' },
    { title: 'Uptime Performance', value: '99.5%', color: 'text-blue-600' },
    { title: 'Average Usage', value: '72.3%', color: 'text-orange-600' },
    { title: 'Service Success Rate', value: '100%', color: 'text-purple-600' }
  ];

  const recentActivity = [
    { title: 'System backup completed', time: '2 hours ago', status: 'success' },
    { title: 'Phone extension 104 added', time: '1 day ago', status: 'info' },
    { title: 'Website maintenance completed', time: '2 days ago', status: 'success' },
    { title: 'Security scan completed', time: '3 days ago', status: 'success' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-6 rounded-lg text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome to the Client Portal</h2>
        <p className="text-blue-100">
          Access company info, services, billing, and support in one secure place.
        </p>
        <p className="text-sm text-blue-200 mt-2">
          CloudMor tech. Admin team will ensure dashboard provides easy access to all CloudMor services.
        </p>
      </div>

      {/* Active Services Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Company Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Company</p>
              <p className="font-medium">CloudMor</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">support@cloudmor.com</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">(555) 123-4567</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Your Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Account Type</p>
              <p className="font-medium capitalize">{profile?.role || 'Client'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium text-green-600">Active</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Quick Actions</p>
              <div className="flex space-x-2 mt-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                  Submit Support Ticket
                </button>
                <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm">
                  Download Latest Invoice
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

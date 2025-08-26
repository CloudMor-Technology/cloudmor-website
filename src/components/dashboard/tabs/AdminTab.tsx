import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Settings, Building, CreditCard, Headphones, Wrench } from 'lucide-react';
import { toast } from 'sonner';
import { UserManagement } from './admin/UserManagement';

export const AdminTab = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: 'CloudMor',
    email: 'support@cloudmor.com',
    phone: '(855) 123-4567',
    address: '123 Business Ave, Suite 100, City, State 12345',
    emergencyPhone: '(866) 123-4567',
    emergencyEmail: 'emergency@cloudmor.com'
  });

  const [supportContent, setSupportContent] = useState({
    emergencyHours: 'Mon-Fri 24/7 EST',
    weekendPolicy: 'Weekend: Emergency Only',
    responseTime: 'Response within 30 minutes',
    supportProcess: `1. Submit ticket through CloudMor Support Portal
2. Send email to support@cloudmor.com for immediate needs
3. Call phone line with ticket number in place`
  });

  const handleUpdateCompanyInfo = () => {
    toast.success('Company information updated successfully');
  };

  const handleUpdateSupportContent = () => {
    toast.success('Support content updated successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Administrator Panel</h2>
          <p className="text-white/70 text-lg">Manage all portal content and user settings</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-6 py-3">
          <Settings className="w-5 h-5 mr-2" />
          Administrator
        </Button>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/20 backdrop-blur-sm h-14">
          <TabsTrigger value="users" className="text-white data-[state=active]:bg-white/20 text-lg py-3">
            <Users className="w-5 h-5 mr-2" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="company" className="text-white data-[state=active]:bg-white/20 text-lg py-3">
            <Building className="w-5 h-5 mr-2" />
            Company Info
          </TabsTrigger>
          <TabsTrigger value="support" className="text-white data-[state=active]:bg-white/20 text-lg py-3">
            <Headphones className="w-5 h-5 mr-2" />
            Support Content
          </TabsTrigger>
          <TabsTrigger value="services" className="text-white data-[state=active]:bg-white/20 text-lg py-3">
            <Wrench className="w-5 h-5 mr-2" />
            Services
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-6">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <UserManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="mt-6">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Company Information Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="companyName" className="text-lg">Company Name</Label>
                  <Input
                    id="companyName"
                    value={companyInfo.name}
                    onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
                    className="text-lg py-3"
                  />
                </div>
                <div>
                  <Label htmlFor="companyEmail" className="text-lg">Company Email</Label>
                  <Input
                    id="companyEmail"
                    value={companyInfo.email}
                    onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
                    className="text-lg py-3"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="companyPhone" className="text-lg">Company Phone</Label>
                  <Input
                    id="companyPhone"
                    value={companyInfo.phone}
                    onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})}
                    className="text-lg py-3"
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyPhone" className="text-lg">Emergency Phone</Label>
                  <Input
                    id="emergencyPhone"
                    value={companyInfo.emergencyPhone}
                    onChange={(e) => setCompanyInfo({...companyInfo, emergencyPhone: e.target.value})}
                    className="text-lg py-3"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="companyAddress" className="text-lg">Company Address</Label>
                <Textarea
                  id="companyAddress"
                  value={companyInfo.address}
                  onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
                  className="text-lg py-3"
                  rows={3}
                />
              </div>

              <Button onClick={handleUpdateCompanyInfo} className="bg-blue-600 hover:bg-blue-700 text-lg px-6 py-3">
                Update Company Information
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="mt-6">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Support Content Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="emergencyHours" className="text-lg">Emergency Support Hours</Label>
                  <Input
                    id="emergencyHours"
                    value={supportContent.emergencyHours}
                    onChange={(e) => setSupportContent({...supportContent, emergencyHours: e.target.value})}
                    className="text-lg py-3"
                  />
                </div>
                <div>
                  <Label htmlFor="responseTime" className="text-lg">Response Time</Label>
                  <Input
                    id="responseTime"
                    value={supportContent.responseTime}
                    onChange={(e) => setSupportContent({...supportContent, responseTime: e.target.value})}
                    className="text-lg py-3"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="weekendPolicy" className="text-lg">Weekend Policy</Label>
                <Input
                  id="weekendPolicy"
                  value={supportContent.weekendPolicy}
                  onChange={(e) => setSupportContent({...supportContent, weekendPolicy: e.target.value})}
                  className="text-lg py-3"
                />
              </div>

              <div>
                <Label htmlFor="supportProcess" className="text-lg">Support Process Steps</Label>
                <Textarea
                  id="supportProcess"
                  value={supportContent.supportProcess}
                  onChange={(e) => setSupportContent({...supportContent, supportProcess: e.target.value})}
                  className="text-lg py-3"
                  rows={6}
                />
              </div>

              <Button onClick={handleUpdateSupportContent} className="bg-green-600 hover:bg-green-700 text-lg px-6 py-3">
                Update Support Content
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="mt-6">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Services Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="bg-purple-600 hover:bg-purple-700 text-lg px-6 py-3">
                  <Wrench className="w-5 h-5 mr-2" />
                  Manage Services
                </Button>
                <div className="text-lg text-gray-600">
                  Services management functionality will be implemented here.
                  This will include creating, editing, and managing service offerings.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

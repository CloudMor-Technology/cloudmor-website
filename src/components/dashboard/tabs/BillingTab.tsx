
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Calendar, CreditCard, Plus, RefreshCw, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const BillingTab = () => {
  const { user } = useAuth();
  const [billingData, setBillingData] = useState({
    totalSpent: '$0.00',
    nextBilling: 'Loading...',
    balance: '$0.00',
    currentPeriod: 'Loading...'
  });

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [recentInvoices, setRecentInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const services = [
    { name: 'IT Support Package', amount: '$699.00', status: 'Active' },
    { name: 'Phone System', amount: '$300.00', status: 'Active' },
    { name: 'Cloud Backup Pro', amount: '$300.00', status: 'Active' }
  ];

  useEffect(() => {
    if (user) {
      fetchBillingData();
    }
  }, [user]);

  const fetchBillingData = async () => {
    if (!user) {
      toast.error('Please log in to view billing information');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No active session');
      }

      console.log('Fetching billing data with session:', session.access_token.substring(0, 20) + '...');

      const { data, error } = await supabase.functions.invoke('get-billing-info', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      
      if (error) {
        console.error('Error fetching billing data:', error);
        throw new Error(error.message || 'Failed to load billing information');
      }

      if (data && !data.error) {
        console.log('Billing data received:', data);
        setBillingData({
          totalSpent: data.totalSpent || '$0.00',
          nextBilling: data.nextBilling || 'N/A',
          balance: data.balance || '$0.00',
          currentPeriod: data.currentPeriod || new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })
        });
        setPaymentMethods(data.paymentMethods || []);
        setRecentInvoices(data.invoices || []);
        toast.success('Billing data loaded successfully');
      } else {
        throw new Error(data?.error || 'Failed to load billing data');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error.message || 'Failed to load billing information';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleManagePayments = async () => {
    if (!user) {
      toast.error('Please log in to manage payments');
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No active session');
      }

      console.log('Opening customer portal...');

      const { data, error } = await supabase.functions.invoke('create-customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      
      if (error) {
        console.error('Error:', error);
        throw new Error(error.message || 'Failed to open payment management');
      }
      
      if (data?.url) {
        console.log('Opening portal URL:', data.url);
        window.open(data.url, '_blank');
        toast.success('Customer portal opened in new tab');
      } else {
        throw new Error('No portal URL received');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to open payment management');
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-white text-lg">Please log in to view billing information</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Billing & Payments</h2>
          <p className="text-white/70 text-lg">Manage your billing information and view invoices</p>
        </div>
        <div className="flex space-x-4">
          <Button 
            onClick={fetchBillingData}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-lg px-4 py-3"
            disabled={loading}
          >
            <RefreshCw className={`w-5 h-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            onClick={handleManagePayments}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Customer Portal
          </Button>
        </div>
      </div>

      {error && (
        <Card className="bg-red-100 border-red-300">
          <CardContent className="p-6">
            <p className="text-red-800">Error: {error}</p>
            <Button 
              onClick={fetchBillingData} 
              className="mt-4 bg-red-600 hover:bg-red-700"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Billing Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-white/90 backdrop-blur-sm border border-blue-200">
          <CardContent className="p-8">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <span className="text-3xl">💰</span>
            </div>
            <h3 className="text-4xl font-bold text-blue-600 mb-2">{billingData.totalSpent}</h3>
            <p className="text-gray-600 text-lg">Total Spent This Year</p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border border-orange-200">
          <CardContent className="p-8">
            <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-4xl font-bold text-orange-600 mb-2">{billingData.nextBilling}</h3>
            <p className="text-gray-600 text-lg">Next Billing Date</p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border border-green-200">
          <CardContent className="p-8">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <span className="text-3xl">💳</span>
            </div>
            <h3 className="text-4xl font-bold text-green-600 mb-2">{billingData.balance}</h3>
            <p className="text-gray-600 text-lg">Current Balance</p>
          </CardContent>
        </Card>
      </div>

      {/* Customer Portal Integration */}
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <ExternalLink className="w-6 h-6 mr-2" />
            Customer Portal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Access your complete billing management portal to update payment methods, view detailed invoices, 
            manage subscriptions, and download receipts.
          </p>
          <Button 
            onClick={handleManagePayments}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Open Customer Portal
          </Button>
        </CardContent>
      </Card>

      {/* Current Billing Period */}
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-2xl">Current Billing Period</CardTitle>
          <span className="text-lg text-gray-500">{billingData.currentPeriod}</span>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {services.map((service, index) => (
              <div key={index} className="flex justify-between items-center py-4 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-lg">{service.name}</p>
                  <p className="text-gray-500">Active subscription</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl">{service.amount}</p>
                  <span className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full">
                    {service.status}
                  </span>
                </div>
              </div>
            ))}
            <div className="pt-6 border-t-2 border-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-xl font-bold">Monthly Total</p>
                <p className="text-3xl font-bold text-blue-600">$1,299.00</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods & Recent Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl">Payment Methods</CardTitle>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleManagePayments}
              className="text-lg px-4 py-2"
            >
              <Plus className="w-5 h-5 mr-2" />
              Manage
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentMethods.length > 0 ? (
                paymentMethods.map((method, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-lg">•••• •••• •••• {method.last4}</p>
                    <p className="text-gray-500">
                      {method.brand?.toUpperCase()} expires {method.exp_month}/{method.exp_year}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No payment methods on file</p>
                  <Button 
                    onClick={handleManagePayments}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-lg px-6 py-3"
                  >
                    Add Payment Method
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl">Recent Invoices</CardTitle>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleManagePayments}
              className="text-lg px-4 py-2"
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInvoices.length > 0 ? (
                recentInvoices.map((invoice, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-lg">{invoice.id}</p>
                        <p className="text-gray-500">{invoice.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-bold text-lg">{invoice.amount}</p>
                        <span className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full">
                          {invoice.status}
                        </span>
                      </div>
                      {invoice.url && (
                        <Button 
                          variant="ghost" 
                          size="lg"
                          onClick={() => window.open(invoice.url, '_blank')}
                        >
                          <Download className="w-5 h-5" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No invoices found</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Use the Customer Portal to view detailed invoice history
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

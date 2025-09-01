
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  CreditCard, 
  Download, 
  ExternalLink, 
  RefreshCcw, 
  DollarSign, 
  Calendar,
  FileText,
  AlertCircle,
  User,
  Settings,
  TrendingUp,
  X
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

// Utility functions for invoice filtering
const getUniqueYears = (invoices: any[]) => {
  if (!invoices || invoices.length === 0) return [];
  const years = invoices.map(invoice => invoice.year).filter(Boolean);
  const uniqueYears = [...new Set(years)].sort((a, b) => b - a);
  return uniqueYears;
};

const shouldShowYearFilter = (invoices: any[]) => {
  const uniqueYears = getUniqueYears(invoices);
  const currentYear = new Date().getFullYear();
  return uniqueYears.length > 1 || (uniqueYears.length === 1 && uniqueYears[0] !== currentYear);
};

export const BillingTab = () => {
  const { user, isImpersonating, profile } = useAuth();
  const { toast } = useToast();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [showStripePortal, setShowStripePortal] = useState(false);
  const [stripePortalUrl, setStripePortalUrl] = useState<string | null>(null);
  const [portalType, setPortalType] = useState<'billing' | 'payment'>('billing');

  useEffect(() => {
    if (user) {
      fetchBillingData();
      fetchCompanyInfo();
    }
  }, [user, isImpersonating, profile?.email, profile?.company_id]);

  const fetchCompanyInfo = async () => {
    if (!profile?.company_id) {
      setCompanyName('No company assigned');
      return;
    }

    try {
      const { data: company, error } = await supabase
        .from('companies')
        .select('name')
        .eq('id', profile.company_id)
        .single();

      if (error) {
        console.error('Error fetching company:', error);
        setCompanyName('Error loading company');
        return;
      }

      setCompanyName(company?.name || 'Unknown company');
    } catch (error) {
      console.error('Error fetching company info:', error);
      setCompanyName('Error loading company');
    }
  };

  const fetchBillingData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching comprehensive billing dashboard...');
      console.log('Current auth state:', { 
        isImpersonating, 
        profileEmail: profile?.email,
        userEmail: user?.email 
      });
      
      const session = await supabase.auth.getSession();
      const requestBody = isImpersonating ? { impersonateEmail: profile?.email } : {};
      
      console.log('Request body for billing:', requestBody);
      
      const { data, error } = await supabase.functions.invoke('get-billing-info', {
        headers: {
          Authorization: `Bearer ${session.data.session?.access_token}`,
        },
        body: requestBody
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Function error: ${error.message}`);
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch billing data');
      }

      console.log('Comprehensive billing data received:', data.data);
      setDashboardData(data.data);

      const message = data.data.message || "Successfully refreshed your complete billing information.";
      toast({
        title: "Billing dashboard updated",
        description: message,
      });

    } catch (error) {
      console.error('Error fetching billing data:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      
      toast({
        title: "Error",
        description: "Failed to fetch billing data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleManagePayments = async () => {
    try {
      console.log('Creating customer portal session...');
      
      const { data, error } = await supabase.functions.invoke('create-customer-portal', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) {
        console.error('Portal creation error:', error);
        throw new Error(`Failed to create portal session`);
      }

      if (data?.url) {
        console.log('Opening billing portal:', data.url);
        // Direct navigation to avoid popup blocking
        window.location.href = data.url;
      } else {
        throw new Error('No portal URL received');
      }

    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Error",
        description: "Failed to open billing portal. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateBillingInfo = async () => {
    try {
      console.log('Creating customer portal session for billing info...');
      
      const session = await supabase.auth.getSession();
      if (!session.data.session?.access_token) {
        throw new Error('No active session found');
      }

      const { data, error } = await supabase.functions.invoke('create-customer-portal', {
        headers: {
          Authorization: `Bearer ${session.data.session.access_token}`,
        },
      });

      if (error) {
        console.error('Portal creation error:', error);
        throw new Error(`Portal error: ${error.message || 'Unknown error'}`);
      }

      if (data?.url) {
        console.log('Portal URL received:', data.url);
        // Try opening in new tab first, fallback to embedded if blocked
        const newWindow = window.open(data.url, '_blank');
        if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
          console.log('Popup blocked, opening embedded portal instead');
          setStripePortalUrl(data.url);
          setPortalType('billing');
          setShowStripePortal(true);
        } else {
          console.log('Opened billing portal in new tab');
        }
      } else {
        throw new Error('No portal URL received');
      }

    } catch (error) {
      console.error('Error opening billing info portal:', error);
      toast({
        title: "Billing Portal Error",
        description: `Failed to open billing portal: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const handleUpdatePaymentMethod = async () => {
    try {
      console.log('Creating customer portal session for payment method...');
      
      const { data, error } = await supabase.functions.invoke('create-customer-portal', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) {
        console.error('Portal creation error:', error);
        throw new Error(`Portal error: ${error.message}`);
      }

      if (data?.url) {
        console.log('Opening payment method portal inline:', data.url);
        setStripePortalUrl(data.url);
        setPortalType('payment');
        setShowStripePortal(true);
      } else {
        throw new Error('No portal URL received');
      }

    } catch (error) {
      console.error('Error opening payment method portal:', error);
      toast({
        title: "Error",
        description: "Failed to open payment method portal. Please try again.",
        variant: "destructive",
      });
    }
  };

  const closeStripePortal = () => {
    setShowStripePortal(false);
    setStripePortalUrl(null);
    console.log('Stripe portal closed, refreshing data...');
    fetchBillingData();
  };

  const testStripeConnection = async () => {
    try {
      console.log('Testing Stripe connection...');
      
      const { data, error } = await supabase.functions.invoke('test-stripe-connection', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) {
        console.error('Stripe test error:', error);
        toast({
          title: "Connection Test Failed",
          description: `Error: ${error.message}`,
          variant: "destructive",
        });
        return;
      }

      console.log('Stripe test results:', data);
      
      if (data.success) {
        toast({
          title: "Stripe Connection Successful!",
          description: `Found ${data.results.data.subscriptions} subscriptions, ${data.results.data.invoices} invoices, ${data.results.data.paymentMethods} payment methods`,
        });
        
        // After successful test, refresh billing data
        fetchBillingData();
      } else {
        toast({
          title: "Stripe Connection Issue",
          description: data.error,
          variant: "destructive",
        });
      }

    } catch (error) {
      console.error('Error testing Stripe connection:', error);
      toast({
        title: "Test Failed",
        description: "Failed to test Stripe connection. Check console for details.",
        variant: "destructive",
      });
    }
  };

  const formatCurrency = (amountInCents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format((amountInCents || 0) / 100);
  };

  if (!user) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-white">Please log in</h3>
          <p className="text-white/70">You need to be logged in to view billing information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Billing Dashboard</h1>
          <p className="text-white/70">
            Complete overview of your billing, subscriptions, and payment history
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={fetchBillingData}
            disabled={loading}
            className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            variant="outline" 
            onClick={testStripeConnection}
            className="flex items-center gap-2 bg-amber-600/10 border-amber-600/20 text-amber-200 hover:bg-amber-600/20"
          >
            <AlertCircle className="h-4 w-4" />
            Test Stripe
          </Button>
          <Button 
            onClick={handleManagePayments}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Settings className="h-4 w-4" />
            Customer Portal
          </Button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Error Loading Billing Data
            </CardTitle>
            <CardDescription>
              {error}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              onClick={fetchBillingData}
              className="flex items-center gap-2"
            >
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Billing Overview Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              {loading ? '...' : formatCurrency(dashboardData?.thisMonthTotal || 0)}
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              Current month charges
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
              {loading ? '...' : formatCurrency(dashboardData?.totalSpentThisYear || 0)}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">
              Total paid to date
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Billing</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold text-purple-700 dark:text-purple-300">
              {loading ? '...' : (dashboardData?.nextBillingDate || 'None')}
            </div>
            <p className="text-xs text-purple-600 dark:text-purple-400">
              Next charge date
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance</CardTitle>
            <User className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
              {loading ? '...' : formatCurrency(dashboardData?.customer?.balance || 0)}
            </div>
            <p className="text-xs text-orange-600 dark:text-orange-400">
              Account balance
            </p>
          </CardContent>
        </Card>
      </div>


      {/* Invoice History */}
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoice History
          </CardTitle>
          <CardDescription>
            View and download your invoices and billing history
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg animate-pulse">
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-32" />
                    <div className="h-3 bg-muted rounded w-24" />
                  </div>
                  <div className="h-8 bg-muted rounded w-16" />
                </div>
              ))}
            </div>
          ) : dashboardData?.invoices && dashboardData.invoices.length > 0 ? (
            <div className="space-y-4">
              {shouldShowYearFilter(dashboardData.invoices) && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Filter by year:</label>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Years</SelectItem>
                        {getUniqueYears(dashboardData.invoices).map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              <ScrollArea className="h-96 w-full">
                <div className="space-y-3 pr-4">
                  {dashboardData.invoices
                    .filter((invoice: any) => {
                      if (selectedYear === 'all') return true;
                      return invoice.year?.toString() === selectedYear;
                    })
                    .map((invoice: any) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{invoice.number || `Invoice ${invoice.id.slice(-8)}`}</p>
                        <p className="text-sm text-muted-foreground">{invoice.date}</p>
                        <div className="flex gap-2">
                          <Badge 
                            variant={invoice.status === 'paid' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {invoice.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {invoice.currency?.toUpperCase() || 'USD'}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(invoice.amount_paid || invoice.amount_due)}</p>
                        </div>
                        <div className="flex gap-2">
                          {invoice.invoice_pdf && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(invoice.invoice_pdf, '_blank')}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                          {invoice.hosted_invoice_url && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(invoice.hosted_invoice_url, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <Separator />
              <Button variant="outline" onClick={handleManagePayments}>
                View All Invoices in Portal
              </Button>
            </div>
          ) : (
            <div className="text-center py-6">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No invoices yet</h3>
              <p className="text-muted-foreground">Your invoices will appear here once you have charges</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Billing Information & Payment Method Update */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Billing Information
            </CardTitle>
            <CardDescription>
              Update your billing address, contact information, and company details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleUpdateBillingInfo}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              size="lg"
            >
              <Settings className="h-4 w-4" />
              Update Billing Information
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Methods
            </CardTitle>
            <CardDescription>
              Add, remove, or update your payment methods and default card
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleUpdatePaymentMethod}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
              size="lg"
            >
              <CreditCard className="h-4 w-4" />
              Update Payment Method
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Embedded Stripe Portal */}
      {showStripePortal && stripePortalUrl && (
        <Card className="bg-white/95 backdrop-blur-sm border-2 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2">
              {portalType === 'billing' ? (
                <>
                  <User className="h-5 w-5" />
                  Update Billing Information
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5" />
                  Update Payment Method
                </>
              )}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeStripePortal}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full h-[600px] overflow-hidden rounded-b-lg">
              <iframe
                src={stripePortalUrl}
                className="w-full h-full border-0"
                title={`Stripe ${portalType === 'billing' ? 'Billing Information' : 'Payment Method'} Portal`}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

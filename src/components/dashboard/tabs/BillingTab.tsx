
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
  TrendingUp
} from 'lucide-react';

export const BillingTab = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchBillingData();
    }
  }, [user]);

  const fetchBillingData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching comprehensive billing dashboard...');
      
      const { data, error } = await supabase.functions.invoke('get-billing-info', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
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

      toast({
        title: "Billing dashboard updated",
        description: "Successfully refreshed your complete billing information.",
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
        throw new Error(`Portal error: ${error.message}`);
      }

      if (data?.url) {
        console.log('Opening customer portal:', data.url);
        window.open(data.url, '_blank');
      } else {
        throw new Error('No portal URL received');
      }

    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Error",
        description: "Failed to open customer portal. Please try again.",
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
            <CardTitle className="text-sm font-medium">This Year</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
              {loading ? '...' : formatCurrency(dashboardData?.totalSpentThisYear || 0)}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">
              Total spent in 2024
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

      {/* Customer Information */}
      {dashboardData?.customer && (
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Account Information
            </CardTitle>
            <CardDescription>
              Your account details and customer information
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium">Customer ID</p>
              <p className="text-sm text-muted-foreground font-mono">{dashboardData.customerId}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{dashboardData.clientEmail}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Account Created</p>
              <p className="text-sm text-muted-foreground">
                {dashboardData.customer.created ? new Date(dashboardData.customer.created * 1000).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Currency</p>
              <p className="text-sm text-muted-foreground">{dashboardData.customer.currency?.toUpperCase() || 'USD'}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Subscriptions */}
      {dashboardData?.subscriptions && dashboardData.subscriptions.length > 0 && (
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Active Subscriptions
            </CardTitle>
            <CardDescription>
              Your current subscription plans and billing details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.subscriptions.map((subscription: any) => (
                <div key={subscription.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{subscription.plan_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(subscription.amount)}/{subscription.interval}
                    </p>
                    <Badge 
                      variant={subscription.status === 'active' ? 'default' : 'secondary'}
                      className="mt-2"
                    >
                      {subscription.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      Renews: {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
                    </p>
                    {subscription.cancel_at_period_end && (
                      <Badge variant="destructive" className="mt-1">
                        Canceling
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Customer Portal Access */}
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Manage Your Account
          </CardTitle>
          <CardDescription>
            Access your customer portal to manage subscriptions, payments, and download invoices.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleManagePayments}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            <ExternalLink className="h-4 w-4" />
            Open Stripe Customer Portal
          </Button>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Methods
          </CardTitle>
          <CardDescription>
            Your saved payment methods and billing information
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              <div className="h-4 bg-muted animate-pulse rounded" />
              <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
            </div>
          ) : dashboardData?.paymentMethods && dashboardData.paymentMethods.length > 0 ? (
            <div className="space-y-4">
              {dashboardData.paymentMethods.map((method: any) => (
                <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {method.card?.brand?.toUpperCase()} •••• {method.card?.last4}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Expires {method.card?.exp_month}/{method.card?.exp_year}
                      </p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {method.card?.funding}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant="outline">Active</Badge>
                </div>
              ))}
              <Separator />
              <Button variant="outline" onClick={handleManagePayments}>
                Manage Payment Methods
              </Button>
            </div>
          ) : (
            <div className="text-center py-6">
              <CreditCard className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No payment methods</h3>
              <p className="text-muted-foreground mb-4">Add a payment method to get started</p>
              <Button onClick={handleManagePayments}>
                Add Payment Method
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Invoices */}
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoice History
          </CardTitle>
          <CardDescription>
            View and download your recent invoices and billing history
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
              {dashboardData.invoices.map((invoice: any) => (
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
    </div>
  );
};

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, UserCircle, CreditCard, RefreshCw } from 'lucide-react';

interface ProfileData {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  job_title?: string;
  company_id?: string;
  stripe_customer_id?: string;
  role: string;
}

interface CompanyData {
  id: string;
  name: string;
  address?: string;
  primary_contact_name?: string;
  primary_contact_email?: string;
  primary_contact_phone?: string;
}

interface StripeCustomer {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export const ProfileTab = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [stripeCustomer, setStripeCustomer] = useState<StripeCustomer | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    job_title: ''
  });
  const [companyFormData, setCompanyFormData] = useState({
    name: '',
    address: '',
    primary_contact_name: '',
    primary_contact_email: '',
    primary_contact_phone: ''
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        toast.error('Failed to load profile');
        return;
      }

      setProfile(profileData);
      setFormData({
        full_name: profileData.full_name || '',
        phone: profileData.phone || '',
        job_title: profileData.job_title || ''
      });

      // Fetch company data if user has a company
      if (profileData.company_id) {
        const { data: companyData, error: companyError } = await supabase
          .from('companies')
          .select('*')
          .eq('id', profileData.company_id)
          .single();

        if (!companyError && companyData) {
          setCompany(companyData);
          setCompanyFormData({
            name: companyData.name || '',
            address: companyData.address || '',
            primary_contact_name: companyData.primary_contact_name || '',
            primary_contact_email: companyData.primary_contact_email || '',
            primary_contact_phone: companyData.primary_contact_phone || ''
          });
        }
      }

      // If user has a Stripe customer ID, fetch Stripe data
      if (profileData.stripe_customer_id) {
        await fetchStripeCustomer();
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchStripeCustomer = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('get-billing-info');
      
      if (error) {
        console.error('Stripe customer fetch error:', error);
        return;
      }

      if (data?.customer) {
        setStripeCustomer({
          id: data.customer.id,
          name: data.customer.name,
          email: data.customer.email
        });
      }
    } catch (error) {
      console.error('Error fetching Stripe customer:', error);
    }
  };

  const syncWithStripe = async () => {
    try {
      setSyncing(true);
      
      // Call edge function to sync with Stripe
      const { data, error } = await supabase.functions.invoke('sync-profile-stripe');
      
      if (error) {
        toast.error('Failed to sync with Stripe');
        return;
      }

      if (data?.customer) {
        setStripeCustomer(data.customer);
        toast.success('Profile synced with Stripe successfully!');
        await fetchProfile(); // Refresh profile data
      }
    } catch (error) {
      console.error('Error syncing with Stripe:', error);
      toast.error('Failed to sync with Stripe');
    } finally {
      setSyncing(false);
    }
  };

  const saveProfile = async () => {
    try {
      setSaving(true);

      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          job_title: formData.job_title,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);

      if (profileError) {
        toast.error('Failed to save profile');
        return;
      }

      // Update company if user has company access
      if (company && profile?.company_id) {
        const { error: companyError } = await supabase
          .from('companies')
          .update({
            name: companyFormData.name,
            address: companyFormData.address,
            primary_contact_name: companyFormData.primary_contact_name,
            primary_contact_email: companyFormData.primary_contact_email,
            primary_contact_phone: companyFormData.primary_contact_phone,
            updated_at: new Date().toISOString()
          })
          .eq('id', profile.company_id);

        if (companyError) {
          console.error('Company update error:', companyError);
          toast.error('Profile saved, but failed to update company info');
          return;
        }
      }

      toast.success('Profile updated successfully!');
      await fetchProfile(); // Refresh profile data
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Client Profile</h1>
        <p className="text-white/80">Manage your profile and company information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information Card */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <UserCircle className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription className="text-white/70">
              Update your personal details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-white">Full Name</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                placeholder="Enter your full name"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                value={profile?.email || ''}
                disabled
                className="bg-white/5 border-white/10 text-white/70"
              />
              <p className="text-xs text-white/50">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter your phone number"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="job_title" className="text-white">Job Title</Label>
              <Input
                id="job_title"
                value={formData.job_title}
                onChange={(e) => setFormData(prev => ({ ...prev, job_title: e.target.value }))}
                placeholder="Enter your job title"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Company Information Card */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <CreditCard className="h-5 w-5" />
              Company Information
            </CardTitle>
            <CardDescription className="text-white/70">
              Update your company details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {company ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="company_name" className="text-white">Company Name</Label>
                  <Input
                    id="company_name"
                    value={companyFormData.name}
                    onChange={(e) => setCompanyFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter company name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company_address" className="text-white">Billing Address</Label>
                  <Input
                    id="company_address"
                    value={companyFormData.address}
                    onChange={(e) => setCompanyFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter company address"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primary_contact_name" className="text-white">Primary Contact Name</Label>
                  <Input
                    id="primary_contact_name"
                    value={companyFormData.primary_contact_name}
                    onChange={(e) => setCompanyFormData(prev => ({ ...prev, primary_contact_name: e.target.value }))}
                    placeholder="Enter primary contact name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primary_contact_email" className="text-white">Primary Contact Email</Label>
                  <Input
                    id="primary_contact_email"
                    value={companyFormData.primary_contact_email}
                    onChange={(e) => setCompanyFormData(prev => ({ ...prev, primary_contact_email: e.target.value }))}
                    placeholder="Enter primary contact email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primary_contact_phone" className="text-white">Primary Contact Phone</Label>
                  <Input
                    id="primary_contact_phone"
                    value={companyFormData.primary_contact_phone}
                    onChange={(e) => setCompanyFormData(prev => ({ ...prev, primary_contact_phone: e.target.value }))}
                    placeholder="Enter primary contact phone"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </>
            ) : (
              <div className="p-4 bg-yellow-500/20 border border-yellow-400/30 rounded-lg">
                <h4 className="font-medium text-yellow-300 mb-2">No Company Assigned</h4>
                <p className="text-sm text-yellow-200">
                  Contact your administrator to assign you to a company.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Save Button and Stripe Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="pt-6">
            <Button 
              onClick={saveProfile} 
              disabled={saving}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Save All Changes'
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Stripe Integration Card */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <CreditCard className="h-5 w-5" />
              Stripe Customer Data
            </CardTitle>
            <CardDescription className="text-white/70">
              Sync your profile with Stripe customer information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stripeCustomer ? (
              <div className="space-y-3">
                <div className="p-4 bg-green-500/20 border border-green-400/30 rounded-lg">
                  <h4 className="font-medium text-green-300 mb-2">Stripe Customer Found</h4>
                  <div className="space-y-1 text-sm text-green-200">
                    <p><strong>Customer ID:</strong> {stripeCustomer.id}</p>
                    <p><strong>Name:</strong> {stripeCustomer.name}</p>
                    <p><strong>Email:</strong> {stripeCustomer.email}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-yellow-500/20 border border-yellow-400/30 rounded-lg">
                <h4 className="font-medium text-yellow-300 mb-2">No Stripe Customer Found</h4>
                <p className="text-sm text-yellow-200">
                  Click the sync button below to find and link your Stripe customer account.
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-white">Stripe Customer ID</Label>
              <Input
                value={profile?.stripe_customer_id || 'Not linked'}
                disabled
                className="bg-white/5 border-white/10 text-white/70"
              />
            </div>

            <Button 
              onClick={syncWithStripe} 
              disabled={syncing}
              variant="outline"
              className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              {syncing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync with Stripe
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
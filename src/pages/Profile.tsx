import { useState, useEffect } from 'react';
import { useAuth, AuthProvider } from '@/hooks/useAuth';
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

interface StripeCustomer {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

const ProfileContent = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [stripeCustomer, setStripeCustomer] = useState<StripeCustomer | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    job_title: ''
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
        
        // Update profile with Stripe customer ID
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ stripe_customer_id: data.customer.id })
          .eq('id', user?.id);

        if (updateError) {
          console.error('Profile update error:', updateError);
        } else {
          toast.success('Profile synced with Stripe successfully!');
          await fetchProfile(); // Refresh profile data
        }
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

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          job_title: formData.job_title,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);

      if (error) {
        toast.error('Failed to save profile');
        return;
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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Please log in to view your profile.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Profile</h1>
          <p className="text-gray-600">Manage your profile and sync with Stripe customer data</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCircle className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={profile?.email || ''}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="job_title">Job Title</Label>
                <Input
                  id="job_title"
                  value={formData.job_title}
                  onChange={(e) => setFormData(prev => ({ ...prev, job_title: e.target.value }))}
                  placeholder="Enter your job title"
                />
              </div>

              <Button 
                onClick={saveProfile} 
                disabled={saving}
                className="w-full"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  'Save Profile'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Stripe Integration Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Stripe Customer Data
              </CardTitle>
              <CardDescription>
                Sync your profile with Stripe customer information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {stripeCustomer ? (
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Stripe Customer Found</h4>
                    <div className="space-y-1 text-sm text-green-800">
                      <p><strong>Customer ID:</strong> {stripeCustomer.id}</p>
                      <p><strong>Name:</strong> {stripeCustomer.name}</p>
                      <p><strong>Email:</strong> {stripeCustomer.email}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">No Stripe Customer Found</h4>
                  <p className="text-sm text-yellow-800">
                    Click the sync button below to find and link your Stripe customer account.
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label>Stripe Customer ID</Label>
                <Input
                  value={profile?.stripe_customer_id || 'Not linked'}
                  disabled
                  className="bg-gray-50"
                />
              </div>

              <Button 
                onClick={syncWithStripe} 
                disabled={syncing}
                variant="outline"
                className="w-full"
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

              {profile?.stripe_customer_id && (
                <div className="text-center">
                  <Button 
                    variant="link" 
                    onClick={() => window.open('/portal?tab=billing', '_blank')}
                    className="text-sm"
                  >
                    View Billing Dashboard →
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <AuthProvider>
      <ProfileContent />
    </AuthProvider>
  );
};

export default Profile;
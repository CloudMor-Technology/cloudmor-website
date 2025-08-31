import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      toast.error('Invalid reset link. Please request a new password reset.');
      navigate('/auth');
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('reset-password', {
        body: { 
          token: token!,
          newPassword 
        }
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      setSuccess(true);
      toast.success('Your password has been reset successfully!');
    } catch (error: any) {
      console.error('Error resetting password:', error);
      toast.error('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative" style={{
        backgroundImage: 'url(/lovable-uploads/20cd0b55-8167-4f6a-acfc-85fe6cab38a2.png)'
      }}>
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
          <img src="/lovable-uploads/d7e7b224-06ca-4c59-a5df-1699995031a9.png" alt="CloudMor Logo" className="h-20 w-auto" />
        </div>
        
        <div className="flex flex-col items-center relative z-10 max-w-md mx-auto px-8">
          <Card className="w-full bg-white/90 backdrop-blur-md shadow-2xl border-0 rounded-2xl">
            <CardHeader className="space-y-1 text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">Password Reset Successful</CardTitle>
              <CardDescription className="text-gray-600 text-sm">
                Your password has been reset successfully
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4 px-6 pb-6">
              <p className="text-sm text-gray-700 text-center">
                You can now sign in with your new password.
              </p>
              
              <Button 
                onClick={() => navigate('/auth')}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 text-sm rounded-full transition-all duration-200"
              >
                Go to Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative" style={{
      backgroundImage: 'url(/lovable-uploads/20cd0b55-8167-4f6a-acfc-85fe6cab38a2.png)'
    }}>
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <img src="/lovable-uploads/d7e7b224-06ca-4c59-a5df-1699995031a9.png" alt="CloudMor Logo" className="h-20 w-auto" />
      </div>
      
      <div className="flex flex-col items-center relative z-10 max-w-md mx-auto px-8">
        <Card className="w-full bg-white/90 backdrop-blur-md shadow-2xl border-0 rounded-2xl">
          <CardHeader className="space-y-1 text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">Set New Password</CardTitle>
            <CardDescription className="text-gray-600 text-sm">
              Enter your new password below
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 px-6">
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-gray-700 font-medium text-sm">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-white/80 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm rounded-lg"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium text-sm">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-white/80 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm rounded-lg"
                  required
                />
              </div>
            </CardContent>
            
            <div className="px-6 pb-6">
              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 text-sm rounded-full transition-all duration-200" 
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Password'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
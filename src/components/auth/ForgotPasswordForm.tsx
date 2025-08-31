import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

export const ForgotPasswordForm = ({ onBackToLogin }: ForgotPasswordFormProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.functions.invoke('forgot-password', {
        body: { email }
      });

      if (error) {
        throw error;
      }

      setEmailSent(true);
      toast.success('If an account exists for that email, we\'ve sent instructions to reset your password.');
    } catch (error: any) {
      console.error('Error sending reset email:', error);
      toast.error('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    
    try {
      const { error } = await supabase.functions.invoke('forgot-password', {
        body: { email }
      });

      if (error) {
        throw error;
      }

      toast.success('If an account exists for that email, we\'ve sent instructions to reset your password.');
    } catch (error: any) {
      console.error('Error resending reset email:', error);
      toast.error('Failed to resend reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full bg-white/90 backdrop-blur-md shadow-2xl border-0 rounded-2xl">
      <CardHeader className="space-y-1 text-center pb-6">
        <div className="flex items-center justify-center mb-4">
          <Button
            variant="ghost"
            onClick={onBackToLogin}
            className="absolute left-4 p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle className="text-2xl font-bold text-gray-900">Reset Password</CardTitle>
        </div>
        <CardDescription className="text-gray-600 text-sm">
          Enter your email address and we'll send you a link to reset your password
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 px-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium text-sm">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/80 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-sm rounded-lg"
              required
            />
          </div>

          {emailSent && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800">
                If an account exists for that email, we've sent instructions to reset your password.
              </p>
            </div>
          )}
        </CardContent>

        <div className="flex flex-col space-y-3 px-6 pb-6">
          <Button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 text-sm rounded-full transition-all duration-200" 
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Email'}
          </Button>

          {emailSent && (
            <Button 
              type="button"
              variant="outline"
              onClick={handleResend}
              className="w-full font-semibold py-3 text-sm rounded-full"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Resend Email'}
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};
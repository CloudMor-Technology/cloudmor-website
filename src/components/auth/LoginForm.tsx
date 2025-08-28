import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
interface LoginFormProps {
  onToggleMode: () => void;
}
export const LoginForm = ({
  onToggleMode
}: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    signIn
  } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      toast.success('Successfully signed in!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };
  return <Card className="w-full bg-white/90 backdrop-blur-md shadow-2xl border-0 rounded-2xl">
      <CardHeader className="space-y-1 text-center pb-6">
        <CardTitle className="text-3xl font-bold text-gray-900">Log in Now</CardTitle>
        <CardDescription className="text-gray-600 text-base">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 px-8">
          <div className="space-y-3">
            <Label htmlFor="email" className="text-gray-700 font-medium text-base">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} className="bg-white/80 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-12 text-base rounded-lg" required />
          </div>
          <div className="space-y-3">
            <Label htmlFor="password" className="text-gray-700 font-medium text-base">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} className="bg-white/80 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-12 text-base rounded-lg" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-6 px-8 pb-8 bg-gray-50">
          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 text-lg rounded-full transition-all duration-200 h-14" disabled={loading}>
            {loading ? 'Signing In...' : 'Log in Now'}
          </Button>
          <p className="text-base text-center text-gray-600">
            Don't have an account?{' '}
            <button type="button" onClick={onToggleMode} className="text-blue-600 hover:underline font-medium">
              Sign up here
            </button>
          </p>
        </CardFooter>
      </form>
    </Card>;
};
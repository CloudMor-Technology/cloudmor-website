
import { useAuth } from '@/hooks/useAuth';
import { AuthPage } from './auth/AuthPage';
import { SinglePagePortal } from './dashboard/SinglePagePortal';

export const ClientPortal = () => {
  const { user, loading } = useAuth();

  console.log('ClientPortal render:', { user: !!user, loading });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-600 text-lg">Loading portal...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('No user, showing auth page');
    return <AuthPage />;
  }

  console.log('User authenticated, showing dashboard');
  return <SinglePagePortal />;
};

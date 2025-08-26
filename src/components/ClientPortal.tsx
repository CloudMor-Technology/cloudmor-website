
import { useAuth } from '@/hooks/useAuth';
import { AuthPage } from './auth/AuthPage';
import { ModernDashboard } from './dashboard/ModernDashboard';

export const ClientPortal = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return <ModernDashboard />;
};

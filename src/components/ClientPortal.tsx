
import { useAuth } from '@/hooks/useAuth';
import { AuthPage } from './auth/AuthPage';
import { DashboardLayout } from './dashboard/DashboardLayout';
import { Dashboard } from './dashboard/Dashboard';

export const ClientPortal = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
};

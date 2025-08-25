
import { AuthProvider } from '@/hooks/useAuth';
import { ClientPortal } from '@/components/ClientPortal';

const Portal = () => {
  return (
    <AuthProvider>
      <ClientPortal />
    </AuthProvider>
  );
};

export default Portal;

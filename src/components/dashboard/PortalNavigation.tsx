import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { 
  LayoutDashboard, 
  CreditCard, 
  MessageSquare, 
  Wrench, 
  User, 
  Shield,
  LogOut,
  Menu,
  X,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

interface PortalNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const PortalNavigation = ({ activeTab, onTabChange }: PortalNavigationProps) => {
  const { user, profile, signOut, isImpersonating, stopImpersonating } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error('Failed to sign out');
    }
  };

  // Define navigation items based on user permissions
  const permissions = profile?.access_permissions as any;
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      show: true
    },
    {
      id: 'services',
      label: 'Services',
      icon: Wrench,
      show: permissions?.services || false
    },
    {
      id: 'support',
      label: 'Support',
      icon: MessageSquare,
      show: permissions?.support || false
    },
    {
      id: 'jira-settings',
      label: 'Jira Settings',
      icon: Settings,
      show: true
    },
    {
      id: 'billing',
      label: 'Billing',
      icon: CreditCard,
      show: permissions?.billing || false
    },
    {
      id: 'account',
      label: 'Account',
      icon: User,
      show: permissions?.account || false
    },
    ...(profile?.role === 'admin' ? [{
      id: 'admin',
      label: 'Admin',
      icon: Shield,
      show: true
    }] : [])
  ];

  const visibleNavItems = navItems.filter(item => item.show);

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/c4a02f46-a725-41de-865e-2a53e399e8a5.png" 
              alt="CloudMor Logo" 
              className="h-8 w-auto"
            />
            <span className="text-white font-semibold text-lg">Client Portal</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {visibleNavItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* Impersonation indicator */}
            {isImpersonating && (
              <div className="bg-orange-500 text-white px-3 py-1 rounded-md flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="text-sm">Viewing as: {profile?.full_name || profile?.email}</span>
                <button
                  onClick={stopImpersonating}
                  className="ml-2 bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-xs transition-colors"
                >
                  Exit
                </button>
              </div>
            )}
            
            <div className="hidden md:block text-white/90">
              <span className="text-sm font-medium">{profile?.full_name || user?.email}</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white hover:text-white/70"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="space-y-1">
              {visibleNavItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onTabChange(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center w-full px-3 py-2 rounded-md text-left text-sm font-medium transition-colors ${
                      activeTab === item.id
                        ? 'bg-white/20 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
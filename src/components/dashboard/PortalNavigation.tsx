
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, User, Settings } from 'lucide-react';
import { toast } from 'sonner';

interface PortalNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const PortalNavigation = ({ activeTab, onTabChange }: PortalNavigationProps) => {
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error('Failed to sign out');
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Home', icon: '🏠' },
    { id: 'billing', label: 'Billing', icon: '💳' },
    { id: 'support', label: 'Support', icon: '🎧' },
    { id: 'services', label: 'Services', icon: '⚙️' },
    { id: 'account', label: 'Account', icon: '👤' },
    ...(profile?.role === 'admin' ? [{ id: 'admin', label: 'Admin Panel', icon: '⚡' }] : [])
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="text-white font-bold text-xl">
              <span className="text-blue-400">Cloud</span>Mor
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="text-white/90 text-sm">
              <span className="font-medium">{profile?.full_name || user?.email}</span>
              {profile?.role === 'admin' && (
                <span className="ml-2 px-2 py-1 bg-orange-500 text-white text-xs rounded-full">
                  Admin
                </span>
              )}
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
          </div>
        </div>
      </div>
    </div>
  );
};

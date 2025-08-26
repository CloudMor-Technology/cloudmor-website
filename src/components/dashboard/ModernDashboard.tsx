
import { useState } from 'react';
import { PortalNavigation } from './PortalNavigation';
import { DashboardTab } from './tabs/DashboardTab';
import { BillingTab } from './tabs/BillingTab';
import { SupportTab } from './tabs/SupportTab';
import { ServicesTab } from './tabs/ServicesTab';
import { AccountTab } from './tabs/AccountTab';
import { AdminTab } from './tabs/AdminTab';

export const ModernDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'billing':
        return <BillingTab />;
      case 'support':
        return <SupportTab />;
      case 'services':
        return <ServicesTab />;
      case 'account':
        return <AccountTab />;
      case 'admin':
        return <AdminTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'url(/lovable-uploads/9da9a140-1484-41e8-9ec7-94b7528611ad.png)'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <PortalNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};


import { ReactNode } from 'react';
import NavigationHeader from '@/components/NavigationHeader';

interface TradingDashboardLayoutProps {
  children: ReactNode;
}

const TradingDashboardLayout = ({ children }: TradingDashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      <NavigationHeader activeTab="trading" setActiveTab={() => {}} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default TradingDashboardLayout;

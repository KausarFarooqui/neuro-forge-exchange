
import { ReactNode } from 'react';
import DeploymentHealthCheck from '@/components/DeploymentHealthCheck';

interface TradingDashboardLayoutProps {
  children: ReactNode;
}

const TradingDashboardLayout = ({ children }: TradingDashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {children}
        
        {/* Health Check - Only show in development or if needed */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8">
            <DeploymentHealthCheck />
          </div>
        )}
      </div>
    </div>
  );
};

export default TradingDashboardLayout;


import { ReactNode } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import { Toaster } from '@/components/ui/toaster';

interface MainLayoutProps {
  children: ReactNode;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

const MainLayout = ({ children, activeTab = 'market', setActiveTab }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Toaster />
      <NavigationHeader activeTab={activeTab} setActiveTab={setActiveTab || (() => {})} />
      <main className="relative">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-blue-500/5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;

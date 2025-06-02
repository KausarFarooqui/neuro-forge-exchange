
import { useState } from 'react';
import { BarChart, Wallet, TrendingUp, Search, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface NavigationHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavigationHeader = ({ activeTab, setActiveTab }: NavigationHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'market', label: 'Market', icon: BarChart },
    { id: 'trading', label: 'Trading', icon: TrendingUp },
    { id: 'portfolio', label: 'Portfolio', icon: Wallet },
  ];

  return (
    <header className="border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NS</span>
              </div>
              <span className="text-white font-semibold">NeuroStock</span>
            </div>
            
            <nav className="flex items-center gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </Button>
                );
              })}
            </nav>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search AI assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 w-64"
              />
            </div>
            
            <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
              <Bell className="w-5 h-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
              <User className="w-5 h-5" />
            </Button>
            
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white">
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;


import { useState } from 'react';
import { BarChart, Wallet, TrendingUp, Search, Bell, User, LogOut, Upload, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface NavigationHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavigationHeader = ({ activeTab, setActiveTab }: NavigationHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const tabs = [
    { id: 'market', label: 'AI Market', icon: Brain },
    { id: 'trading', label: 'Neural Trading', icon: TrendingUp },
    { id: 'portfolio', label: 'Portfolio', icon: Wallet },
  ];

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Neural disconnect successful",
        description: "You've been safely logged out of the matrix"
      });
    }
  };

  return (
    <header className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-blue-500/5"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                  <Zap className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <span className="text-white font-bold text-lg bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                  NeuroStock
                </span>
                <div className="flex items-center gap-1">
                  <Badge className="bg-gradient-to-r from-green-500/20 to-green-400/20 text-green-400 border-green-500/30 text-xs">
                    v2.0
                  </Badge>
                  <Badge className="bg-gradient-to-r from-blue-500/20 to-blue-400/20 text-blue-400 border-blue-500/30 text-xs">
                    AI
                  </Badge>
                </div>
              </div>
            </div>
            
            <nav className="flex items-center gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50 hover:scale-105'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                    )}
                  </Button>
                );
              })}
            </nav>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-cyan-400 transition-colors duration-300" />
              <Input
                placeholder="Search neural assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 w-80 focus:border-cyan-500 focus:ring-cyan-500/20 transition-all duration-300"
              />
              {searchQuery && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">
                    AI
                  </Badge>
                </div>
              )}
            </div>
            
            {user ? (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-slate-300 hover:text-white relative group"
                >
                  <Bell className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">3</span>
                  </div>
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-green-500/20 hover:to-green-600/20 transition-all duration-300"
                  onClick={() => navigate('/upload')}
                >
                  <Upload className="w-5 h-5" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-blue-600/20 transition-all duration-300"
                  onClick={() => navigate('/profile')}
                >
                  <User className="w-5 h-5" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-slate-300 hover:text-red-400 hover:bg-red-500/20 transition-all duration-300"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => navigate('/enhanced-auth')}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-lg shadow-cyan-500/25 px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
              >
                Enter the Matrix
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;

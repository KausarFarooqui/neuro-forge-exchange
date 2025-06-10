
import { Brain, Star, Rocket, TrendingUp, Shield, Zap, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const EnhancedHeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analytics",
      description: "Advanced neural networks analyze market trends in real-time"
    },
    {
      icon: Shield,
      title: "Secure Trading",
      description: "Bank-level security with multi-factor authentication"
    },
    {
      icon: TrendingUp,
      title: "Real-Time Data",
      description: "Live market data with millisecond precision"
    },
    {
      icon: Globe,
      title: "Global Markets",
      description: "Access to worldwide AI and tech companies"
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse shadow-2xl shadow-cyan-500/50">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                <Star className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                NeuroStock.AI
              </h1>
              <div className="flex items-center gap-3 mt-3">
                <Badge className="bg-gradient-to-r from-green-500/20 to-green-400/20 text-green-400 border-green-500/30 animate-pulse">
                  ✓ LIVE TRADING
                </Badge>
                <Badge className="bg-gradient-to-r from-blue-500/20 to-blue-400/20 text-blue-400 border-blue-500/30">
                  AI-POWERED
                </Badge>
                <Badge className="bg-gradient-to-r from-purple-500/20 to-purple-400/20 text-purple-400 border-purple-500/30">
                  SECURE
                </Badge>
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent mb-6">
            The Future of AI Asset Trading
          </h2>
          
          <p className="text-slate-300 text-xl max-w-4xl mx-auto leading-relaxed mb-10">
            Join the world's most advanced AI-powered stock exchange. Trade real AI & tech company shares, 
            launch your own AI assets, and leverage intelligent insights for superior investment decisions.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            {user ? (
              <>
                <Button 
                  onClick={() => navigate('/upload')}
                  className="relative group bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white shadow-2xl shadow-cyan-500/50 px-10 py-6 text-xl font-semibold rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-cyan-400/60"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative flex items-center gap-3">
                    <Rocket className="w-7 h-7 animate-bounce" />
                    <span className="bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
                      Launch Your AI Asset
                    </span>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </Button>
                
                <Button 
                  onClick={() => navigate('/trading')}
                  variant="outline"
                  className="border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-10 py-6 text-xl font-semibold rounded-2xl backdrop-blur-sm"
                >
                  <TrendingUp className="w-6 h-6 mr-3" />
                  Start Trading
                </Button>
              </>
            ) : (
              <>
                <Button 
                  onClick={() => navigate('/auth')}
                  className="relative group bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white shadow-2xl shadow-cyan-500/50 px-10 py-6 text-xl font-semibold rounded-2xl transform transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative flex items-center gap-3">
                    <Zap className="w-6 h-6" />
                    Enter the Neural Matrix
                  </div>
                </Button>
                
                <Button 
                  onClick={() => navigate('/neural-insights')}
                  variant="outline"
                  className="border-2 border-purple-500/50 text-purple-400 hover:bg-purple-500/10 px-10 py-6 text-xl font-semibold rounded-2xl backdrop-blur-sm"
                >
                  View Market Insights
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              $2.4B+
            </div>
            <p className="text-slate-400">Total Trading Volume</p>
          </div>
          <div>
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
              10,000+
            </div>
            <p className="text-slate-400">Active AI Assets</p>
          </div>
          <div>
            <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2">
              50,000+
            </div>
            <p className="text-slate-400">Global Traders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedHeroSection;

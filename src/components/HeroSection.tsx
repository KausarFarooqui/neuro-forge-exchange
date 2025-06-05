
import { Brain, Star, Rocket } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="mb-12 text-center">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Star className="w-3 h-3 text-white" />
          </div>
        </div>
        <div className="text-left">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
            NeuroStock.AI
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge className="bg-gradient-to-r from-green-500/20 to-green-400/20 text-green-400 border-green-500/30">
              LIVE TRADING
            </Badge>
            <span className="text-slate-300 text-sm">Real-time AI & Tech stock exchange</span>
          </div>
        </div>
      </div>
      <p className="text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed mb-8">
        The world's most advanced AI-powered stock exchange. Trade real AI & tech company shares with intelligent insights.
      </p>
      
      {/* Eye-catching Launch Your AI Asset Button */}
      {user && (
        <div className="flex justify-center mb-8">
          <Button 
            onClick={() => navigate('/upload')}
            className="relative group bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white shadow-2xl shadow-cyan-500/50 px-8 py-4 text-lg font-semibold rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-cyan-400/60"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative flex items-center gap-3">
              <Rocket className="w-6 h-6 animate-bounce" />
              <span className="bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
                Launch Your AI Asset
              </span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </Button>
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
            AI & Tech Stock Exchange
          </h2>
          <p className="text-slate-400 mt-2">Trade shares in the world's leading AI and technology companies</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

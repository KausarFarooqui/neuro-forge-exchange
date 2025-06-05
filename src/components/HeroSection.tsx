
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
      <p className="text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed">
        The world's most advanced AI-powered stock exchange. Trade real AI & tech company shares with intelligent insights.
      </p>
      
      <div className="flex justify-between items-center mt-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
            AI & Tech Stock Exchange
          </h2>
          <p className="text-slate-400 mt-2">Trade shares in the world's leading AI and technology companies</p>
        </div>
        {user && (
          <Button 
            onClick={() => navigate('/upload')}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-lg shadow-cyan-500/25 flex items-center gap-2"
          >
            <Rocket className="w-4 h-4" />
            Launch Your AI Asset
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeroSection;

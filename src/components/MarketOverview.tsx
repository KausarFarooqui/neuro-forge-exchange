
import { TrendingUp, TrendingDown, BarChart, DollarSign, Brain, Zap, Globe, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const MarketOverview = () => {
  const marketStats = [
    {
      title: 'AI Market Cap',
      value: '$4.2T',
      change: '+12.34%',
      trend: 'up',
      icon: DollarSign,
      subtitle: '24h volume: $287.3B',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Active AI Assets',
      value: '24,847',
      change: '+1,234',
      trend: 'up',
      icon: Brain,
      subtitle: 'Models, APIs & Datasets',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Neural Network Index',
      value: '9,847',
      change: '+5.67%',
      trend: 'up',
      icon: Zap,
      subtitle: 'AI performance benchmark',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Global AI Adoption',
      value: '89.2%',
      change: '+2.1%',
      trend: 'up',
      icon: Globe,
      subtitle: 'Enterprise adoption rate',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: 'Active Traders',
      value: '127K',
      change: '+8.9%',
      trend: 'up',
      icon: Users,
      subtitle: 'Real-time participants',
      gradient: 'from-teal-500 to-green-500'
    },
    {
      title: 'Market Sentiment',
      value: 'BULLISH',
      change: '94/100',
      trend: 'up',
      icon: TrendingUp,
      subtitle: 'AI confidence index',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      {marketStats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.trend === 'up';
        
        return (
          <Card 
            key={index} 
            className="group relative bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
          >
            {/* Animated gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
            
            {/* Glow effect */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500`}></div>
            
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-300">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.gradient} bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300`}>
                <Icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold text-white mb-2 group-hover:text-3xl transition-all duration-300">
                {stat.value}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={`text-sm font-medium px-2 py-1 ${
                  isPositive 
                    ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border-red-500/30'
                }`}>
                  {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {stat.change}
                </Badge>
              </div>
              <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                {stat.subtitle}
              </p>
              
              {/* Progress bar animation */}
              <div className="mt-3 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${stat.gradient} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out`}
                ></div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MarketOverview;


import { TrendingUp, TrendingDown, BarChart, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MarketOverview = () => {
  const marketStats = [
    {
      title: 'AI Market Cap',
      value: '$2.47T',
      change: '+5.67%',
      trend: 'up',
      icon: DollarSign,
      subtitle: '24h volume: $147.3B'
    },
    {
      title: 'Active Assets',
      value: '12,847',
      change: '+234',
      trend: 'up',
      icon: BarChart,
      subtitle: 'Models, APIs & Datasets'
    },
    {
      title: 'Top Gainers',
      value: 'GPT-4V',
      change: '+12.45%',
      trend: 'up',
      icon: TrendingUp,
      subtitle: 'Leading AI assets'
    },
    {
      title: 'Market Sentiment',
      value: 'BULLISH',
      change: '87/100',
      trend: 'up',
      icon: TrendingUp,
      subtitle: 'AI confidence index'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {marketStats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.trend === 'up';
        
        return (
          <Card 
            key={index} 
            className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${
                  isPositive ? 'text-green-400' : 'text-red-400'
                }`}>
                  {isPositive ? <TrendingUp className="w-3 h-3 inline mr-1" /> : <TrendingDown className="w-3 h-3 inline mr-1" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {stat.subtitle}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MarketOverview;

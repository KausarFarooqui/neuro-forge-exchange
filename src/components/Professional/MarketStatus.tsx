
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity, Globe } from 'lucide-react';

interface MarketStatusData {
  status: 'open' | 'closed' | 'pre-market' | 'after-hours';
  totalVolume: number;
  totalValue: number;
  activeAssets: number;
  topGainer: { symbol: string; change: number };
  topLoser: { symbol: string; change: number };
}

const MarketStatus = () => {
  const [marketData, setMarketData] = useState<MarketStatusData>({
    status: 'open',
    totalVolume: 2400000000,
    totalValue: 15600000000,
    activeAssets: 10247,
    topGainer: { symbol: 'NVDA', change: 8.45 },
    topLoser: { symbol: 'META', change: -2.33 }
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simulate market data updates
      if (Math.random() > 0.9) {
        setMarketData(prev => ({
          ...prev,
          totalVolume: prev.totalVolume + Math.floor(Math.random() * 1000000),
          topGainer: {
            symbol: prev.topGainer.symbol,
            change: prev.topGainer.change + (Math.random() - 0.5) * 0.1
          }
        }));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'closed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'pre-market': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'after-hours': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num}`;
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            Global AI Market Status
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(marketData.status)}>
              <Activity className="w-3 h-3 mr-1" />
              {marketData.status.toUpperCase()}
            </Badge>
            <span className="text-slate-400 text-sm">
              {currentTime.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-slate-800/30 rounded-lg">
            <div className="text-2xl font-bold text-cyan-400 mb-1">
              {formatNumber(marketData.totalVolume)}
            </div>
            <p className="text-slate-400 text-sm">24h Volume</p>
          </div>
          
          <div className="text-center p-4 bg-slate-800/30 rounded-lg">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {formatNumber(marketData.totalValue)}
            </div>
            <p className="text-slate-400 text-sm">Market Cap</p>
          </div>
          
          <div className="text-center p-4 bg-slate-800/30 rounded-lg">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {marketData.activeAssets.toLocaleString()}
            </div>
            <p className="text-slate-400 text-sm">Active Assets</p>
          </div>
          
          <div className="text-center p-4 bg-slate-800/30 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-xl font-bold text-green-400">
                +{marketData.topGainer.change.toFixed(2)}%
              </span>
            </div>
            <p className="text-slate-400 text-sm">{marketData.topGainer.symbol}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketStatus;

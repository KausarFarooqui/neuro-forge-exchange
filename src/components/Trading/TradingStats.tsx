
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Volume2, TrendingUp, TrendingDown } from 'lucide-react';

interface TradingStatsProps {
  stockData: {
    marketCap: number;
    volume: number;
    pe: number;
    beta: number;
  };
}

const TradingStats = ({ stockData }: TradingStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <Card className="bg-slate-900/50 border-slate-700/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400 text-sm">Market Cap</span>
          </div>
          <div className="text-white font-bold">${(stockData.marketCap / 1e12).toFixed(2)}T</div>
        </CardContent>
      </Card>
      <Card className="bg-slate-900/50 border-slate-700/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400 text-sm">Volume</span>
          </div>
          <div className="text-white font-bold">{(stockData.volume / 1e6).toFixed(1)}M</div>
        </CardContent>
      </Card>
      <Card className="bg-slate-900/50 border-slate-700/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400 text-sm">P/E Ratio</span>
          </div>
          <div className="text-white font-bold">{stockData.pe}</div>
        </CardContent>
      </Card>
      <Card className="bg-slate-900/50 border-slate-700/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400 text-sm">Beta</span>
          </div>
          <div className="text-white font-bold">{stockData.beta}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TradingStats;

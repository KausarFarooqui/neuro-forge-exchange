
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

interface MarketWatchlistProps {
  marketData: Record<string, MarketData>;
  selectedSymbol: string;
  onSymbolSelect: (symbol: string) => void;
}

const MarketWatchlist = ({ marketData, selectedSymbol, onSymbolSelect }: MarketWatchlistProps) => {
  const symbols = Object.keys(marketData);

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          Market Watchlist
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {symbols.map((symbol) => {
            const data = marketData[symbol];
            const isSelected = symbol === selectedSymbol;
            const isPositive = data.change >= 0;
            
            return (
              <div
                key={symbol}
                onClick={() => onSymbolSelect(symbol)}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                  isSelected 
                    ? 'bg-cyan-500/20 border-cyan-500/50' 
                    : 'bg-slate-800/50 border-slate-700/30 hover:bg-slate-700/50 hover:border-slate-600/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-medium">{symbol}</span>
                  <div className="text-right">
                    <div className="text-white font-medium">${data.price.toFixed(2)}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>
                      {isPositive ? '+' : ''}{data.change.toFixed(2)} ({isPositive ? '+' : ''}{data.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                  
                  <div className="text-slate-400 text-xs">
                    Vol: {(data.volume / 1e6).toFixed(1)}M
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketWatchlist;

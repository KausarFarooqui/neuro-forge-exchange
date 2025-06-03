
import { TrendingUp, TrendingDown, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Asset {
  id: string; // Changed from number to string to handle UUIDs
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  category: string;
  description: string;
  logo: string;
}

interface AssetCardProps {
  asset: Asset;
}

const AssetCard = ({ asset }: AssetCardProps) => {
  const isPositive = asset.change > 0;
  
  const getCategoryColor = (category: string) => {
    const colors = {
      'API': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Dataset': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Model': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Company': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Framework': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      'Platform': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 group cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{asset.logo}</div>
            <div>
              <h3 className="font-semibold text-white group-hover:text-cyan-200 transition-colors">
                {asset.name}
              </h3>
              <p className="text-sm text-slate-400">{asset.symbol}</p>
            </div>
          </div>
          <Badge className={`text-xs ${getCategoryColor(asset.category)}`}>
            {asset.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">
                ${asset.price.toFixed(2)}
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                isPositive ? 'text-green-400' : 'text-red-400'
              }`}>
                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {isPositive ? '+' : ''}{asset.change.toFixed(2)} ({isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%)
              </div>
            </div>
            <BarChart className="w-8 h-8 text-slate-600" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-400">Volume</span>
              <div className="text-white font-medium">{asset.volume}</div>
            </div>
            <div>
              <span className="text-slate-400">Market Cap</span>
              <div className="text-white font-medium">{asset.marketCap}</div>
            </div>
          </div>
          
          <p className="text-sm text-slate-400 line-clamp-2">
            {asset.description}
          </p>
          
          <div className="flex gap-2">
            <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              Trade
            </Button>
            <Button size="sm" variant="outline" className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800">
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetCard;

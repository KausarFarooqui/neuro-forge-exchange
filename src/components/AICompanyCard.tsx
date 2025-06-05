
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface AICompany {
  id: string;
  name: string;
  symbol: string;
  category: string;
  description: string;
  logo: string;
}

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

interface AICompanyCardProps {
  company: AICompany;
  stockData: StockData;
  onBuyClick: () => void;
  onSellClick: () => void;
}

const AICompanyCard = ({ company, stockData, onBuyClick, onSellClick }: AICompanyCardProps) => {
  const navigate = useNavigate();

  // Ensure all values have safe defaults
  const price = stockData.price || 0;
  const change = stockData.change || 0;
  const changePercent = stockData.changePercent || 0;
  const volume = stockData.volume || 0;

  return (
    <Card 
      className="group relative bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer"
      onClick={() => navigate(`/trading/${company.symbol}`)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{company.logo}</div>
            <div>
              <CardTitle className="text-white text-lg">{company.symbol}</CardTitle>
              <p className="text-slate-400 text-sm">{company.name}</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-cyan-500/30">
            {company.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white">${price.toFixed(2)}</div>
            <div className={`flex items-center gap-1 ${change > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="font-medium">
                {change > 0 ? '+' : ''}{change.toFixed(2)} ({changePercent > 0 ? '+' : ''}{changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-400">Volume</span>
              <div className="text-white font-medium">{(volume / 1e6).toFixed(1)}M</div>
            </div>
            <div>
              <span className="text-slate-400">Market Cap</span>
              <div className="text-white font-medium">${((price * 1e9) / 1e12).toFixed(2)}T</div>
            </div>
          </div>
          
          <p className="text-slate-300 text-sm">{company.description}</p>
          
          <div className="flex gap-2">
            <Button 
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
              onClick={(e) => {
                e.stopPropagation();
                onBuyClick();
              }}
            >
              Buy
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10"
              onClick={(e) => {
                e.stopPropagation();
                onSellClick();
              }}
            >
              Sell
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AICompanyCard;

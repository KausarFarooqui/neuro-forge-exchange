
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Zap } from 'lucide-react';

interface QuickTradePanelProps {
  symbol: string;
  currentPrice: number;
  availableBalance: number;
  onTrade: (trade: {
    symbol: string;
    type: 'buy' | 'sell';
    orderType: 'market' | 'limit';
    quantity: number;
    price?: number;
    timeInForce: 'GTC';
  }) => Promise<{ success: boolean; error?: string }>;
}

const QuickTradePanel = ({ symbol, currentPrice, availableBalance, onTrade }: QuickTradePanelProps) => {
  const [quantity, setQuantity] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  const handleQuickTrade = async (type: 'buy' | 'sell') => {
    if (!quantity || parseFloat(quantity) <= 0) return;
    
    setIsExecuting(true);
    try {
      await onTrade({
        symbol,
        type,
        orderType: 'market',
        quantity: parseFloat(quantity),
        timeInForce: 'GTC'
      });
      setQuantity('');
    } finally {
      setIsExecuting(false);
    }
  };

  const totalValue = parseFloat(quantity || '0') * currentPrice;
  const canAfford = totalValue <= availableBalance;

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Quick Trade - {symbol}
          <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-cyan-500/30 ml-auto">
            Market Order
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-slate-300">Quantity</Label>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter shares"
            className="bg-slate-800 border-slate-600 text-white"
          />
        </div>

        <div className="p-3 bg-slate-800/50 rounded-lg space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Current Price:</span>
            <span className="text-white">${currentPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Estimated Total:</span>
            <span className="text-white">${totalValue.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Available Balance:</span>
            <span className="text-white">${availableBalance.toLocaleString()}</span>
          </div>
          {!canAfford && totalValue > 0 && (
            <div className="text-red-400 text-xs">Insufficient funds</div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => handleQuickTrade('buy')}
            disabled={!quantity || parseFloat(quantity) <= 0 || !canAfford || isExecuting}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            {isExecuting ? 'Executing...' : 'Quick Buy'}
          </Button>
          <Button
            onClick={() => handleQuickTrade('sell')}
            disabled={!quantity || parseFloat(quantity) <= 0 || isExecuting}
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
          >
            <TrendingDown className="w-4 h-4" />
            {isExecuting ? 'Executing...' : 'Quick Sell'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickTradePanel;

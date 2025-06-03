
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, TrendingUp, TrendingDown, Clock, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TradeExecutionProps {
  symbol: string;
  currentPrice: number;
  availableBalance: number;
  onTrade: (trade: TradeOrder) => void;
}

interface TradeOrder {
  symbol: string;
  type: 'buy' | 'sell';
  orderType: 'market' | 'limit' | 'stop';
  quantity: number;
  price?: number;
  stopPrice?: number;
  timeInForce: 'GTC' | 'IOC' | 'FOK';
}

const TradeExecution = ({ symbol, currentPrice, availableBalance, onTrade }: TradeExecutionProps) => {
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop'>('market');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState(currentPrice.toString());
  const [stopPrice, setStopPrice] = useState('');
  const [timeInForce, setTimeInForce] = useState<'GTC' | 'IOC' | 'FOK'>('GTC');
  const { toast } = useToast();

  const totalCost = parseFloat(quantity) * (orderType === 'market' ? currentPrice : parseFloat(price) || 0);
  const estimatedFees = totalCost * 0.001; // 0.1% fee

  const handleTrade = () => {
    if (!quantity || parseFloat(quantity) <= 0) {
      toast({
        title: "Invalid Quantity",
        description: "Please enter a valid quantity",
        variant: "destructive"
      });
      return;
    }

    if (tradeType === 'buy' && totalCost + estimatedFees > availableBalance) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough balance for this trade",
        variant: "destructive"
      });
      return;
    }

    const trade: TradeOrder = {
      symbol,
      type: tradeType,
      orderType,
      quantity: parseFloat(quantity),
      price: orderType !== 'market' ? parseFloat(price) : undefined,
      stopPrice: orderType === 'stop' ? parseFloat(stopPrice) : undefined,
      timeInForce
    };

    onTrade(trade);
    
    toast({
      title: "Order Submitted",
      description: `${tradeType.toUpperCase()} order for ${quantity} shares of ${symbol}`,
    });

    // Reset form
    setQuantity('');
    setPrice(currentPrice.toString());
    setStopPrice('');
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Trade {symbol}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={tradeType} onValueChange={(value) => setTradeType(value as 'buy' | 'sell')}>
          <TabsList className="grid w-full grid-cols-2 bg-slate-800">
            <TabsTrigger value="buy" className="text-white data-[state=active]:bg-green-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              Buy
            </TabsTrigger>
            <TabsTrigger value="sell" className="text-white data-[state=active]:bg-red-600">
              <TrendingDown className="w-4 h-4 mr-2" />
              Sell
            </TabsTrigger>
          </TabsList>

          <TabsContent value={tradeType} className="space-y-4 mt-6">
            {/* Order Type */}
            <div>
              <Label className="text-slate-300">Order Type</Label>
              <Select value={orderType} onValueChange={setOrderType}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="market">Market Order</SelectItem>
                  <SelectItem value="limit">Limit Order</SelectItem>
                  <SelectItem value="stop">Stop Order</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div>
              <Label className="text-slate-300">Quantity</Label>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>

            {/* Price (for limit orders) */}
            {orderType !== 'market' && (
              <div>
                <Label className="text-slate-300">
                  {orderType === 'limit' ? 'Limit Price' : 'Price'}
                </Label>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  step="0.01"
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
            )}

            {/* Stop Price (for stop orders) */}
            {orderType === 'stop' && (
              <div>
                <Label className="text-slate-300">Stop Price</Label>
                <Input
                  type="number"
                  value={stopPrice}
                  onChange={(e) => setStopPrice(e.target.value)}
                  step="0.01"
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
            )}

            {/* Time in Force */}
            <div>
              <Label className="text-slate-300">Time in Force</Label>
              <Select value={timeInForce} onValueChange={setTimeInForce}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="GTC">Good Till Canceled</SelectItem>
                  <SelectItem value="IOC">Immediate or Cancel</SelectItem>
                  <SelectItem value="FOK">Fill or Kill</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Order Summary */}
            <div className="p-4 bg-slate-800/50 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Current Price:</span>
                <span className="text-white">${currentPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Estimated Cost:</span>
                <span className="text-white">${totalCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Estimated Fees:</span>
                <span className="text-white">${estimatedFees.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium border-t border-slate-600 pt-2">
                <span className="text-slate-300">Total:</span>
                <span className="text-white">${(totalCost + estimatedFees).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Available Balance:</span>
                <span className="text-white">${availableBalance.toLocaleString()}</span>
              </div>
            </div>

            {/* Warning for insufficient funds */}
            {tradeType === 'buy' && totalCost + estimatedFees > availableBalance && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span className="text-red-400 text-sm">Insufficient funds for this trade</span>
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleTrade}
              className={`w-full ${
                tradeType === 'buy'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                  : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
              } text-white shadow-lg`}
              disabled={!quantity || parseFloat(quantity) <= 0 || (tradeType === 'buy' && totalCost + estimatedFees > availableBalance)}
            >
              {tradeType === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TradeExecution;

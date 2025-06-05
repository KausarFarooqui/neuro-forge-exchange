
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { stockMarketService } from '@/services/stockMarketService';

const RealTradingInterface = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('NVDA');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [portfolio, setPortfolio] = useState(stockMarketService.getPortfolio());
  const [availableStocks] = useState(stockMarketService.getAllStocks());
  const { toast } = useToast();

  const currentStock = availableStocks.find(s => s.symbol === selectedSymbol);

  useEffect(() => {
    // Simulate real-time price updates
    const interval = setInterval(() => {
      availableStocks.forEach(stock => {
        const variation = (Math.random() - 0.5) * 2;
        const newPrice = Math.max(1, stock.price + variation);
        stockMarketService.updateMarketPrice(stock.symbol, newPrice);
        stock.price = newPrice;
      });
      setPortfolio(stockMarketService.getPortfolio());
    }, 3000);

    return () => clearInterval(interval);
  }, [availableStocks]);

  const handleTrade = (type: 'buy' | 'sell') => {
    if (!quantity || parseFloat(quantity) <= 0) {
      toast({
        title: "Invalid Quantity",
        description: "Please enter a valid quantity",
        variant: "destructive"
      });
      return;
    }

    const tradePrice = orderType === 'market' ? undefined : parseFloat(price);

    const result = stockMarketService.executeOrder({
      symbol: selectedSymbol,
      type,
      orderType,
      quantity: parseFloat(quantity),
      price: tradePrice,
      timeInForce: 'GTC'
    });

    if (result.success) {
      toast({
        title: "Trade Executed",
        description: result.message,
      });
      setPortfolio(stockMarketService.getPortfolio());
      setQuantity('');
      setPrice('');
    } else {
      toast({
        title: "Trade Failed",
        description: result.message,
        variant: "destructive"
      });
    }
  };

  const totalCost = currentStock && quantity ? parseFloat(quantity) * currentStock.price : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Trading Interface */}
      <div className="lg:col-span-2">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Live Stock Trading
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-300">Stock Symbol</Label>
                <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {availableStocks.map((stock) => (
                      <SelectItem key={stock.symbol} value={stock.symbol}>
                        {stock.symbol} - ${stock.price.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-300">Order Type</Label>
                <Select value={orderType} onValueChange={(value) => setOrderType(value as 'market' | 'limit')}>
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="market">Market Order</SelectItem>
                    <SelectItem value="limit">Limit Order</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
              {orderType === 'limit' && (
                <div>
                  <Label className="text-slate-300">Limit Price</Label>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    step="0.01"
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
              )}
            </div>

            {currentStock && (
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300">Current Price:</span>
                  <span className="text-white font-bold">${currentStock.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300">Estimated Cost:</span>
                  <span className="text-white">${totalCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Available Cash:</span>
                  <span className="text-white">${portfolio.cashBalance.toLocaleString()}</span>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                onClick={() => handleTrade('buy')}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                disabled={!quantity || parseFloat(quantity) <= 0}
              >
                Buy {selectedSymbol}
              </Button>
              <Button
                onClick={() => handleTrade('sell')}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                disabled={!quantity || parseFloat(quantity) <= 0}
              >
                Sell {selectedSymbol}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Summary */}
      <div className="space-y-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Portfolio Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold text-white">${portfolio.totalValue.toLocaleString()}</div>
                <div className="text-slate-400 text-sm">Total Portfolio Value</div>
              </div>
              
              <div className="flex items-center gap-2">
                {portfolio.totalPnL >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <span className={`font-medium ${portfolio.totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {portfolio.totalPnL >= 0 ? '+' : ''}${portfolio.totalPnL.toFixed(2)} ({portfolio.totalPnLPercent.toFixed(2)}%)
                </span>
              </div>

              <div className="pt-2 border-t border-slate-700">
                <div className="text-white font-medium">${portfolio.cashBalance.toLocaleString()}</div>
                <div className="text-slate-400 text-sm">Available Cash</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Positions */}
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Current Positions</CardTitle>
          </CardHeader>
          <CardContent>
            {portfolio.positions.length === 0 ? (
              <div className="text-slate-400 text-center py-4">No positions</div>
            ) : (
              <div className="space-y-3">
                {portfolio.positions.map((position) => (
                  <div key={position.id} className="p-3 bg-slate-800/50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{position.symbol}</span>
                      <span className="text-white">{position.quantity} shares</span>
                    </div>
                    <div className="text-sm text-slate-300">
                      Avg: ${position.avgPrice.toFixed(2)} | Current: ${position.currentPrice.toFixed(2)}
                    </div>
                    <div className={`text-sm ${position.unrealizedPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {position.unrealizedPnL >= 0 ? '+' : ''}${position.unrealizedPnL.toFixed(2)} ({position.unrealizedPnLPercent.toFixed(2)}%)
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealTradingInterface;

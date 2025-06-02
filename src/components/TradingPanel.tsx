
import { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const TradingPanel = () => {
  const [selectedAsset, setSelectedAsset] = useState('GPT4V');
  const [orderType, setOrderType] = useState('buy');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('156.74');

  const watchlist = [
    { symbol: 'GPT4V', name: 'GPT-4 Vision API', price: 156.74, change: 8.63 },
    { symbol: 'BERT', name: 'BERT-Large Model', price: 234.89, change: 8.68 },
    { symbol: 'OPENAI', name: 'OpenAI Corp', price: 1247.33, change: 3.81 },
    { symbol: 'HF', name: 'Hugging Face Hub', price: 445.67, change: 5.55 }
  ];

  const recentTrades = [
    { symbol: 'GPT4V', type: 'BUY', quantity: 50, price: 156.74, time: '14:32:15' },
    { symbol: 'BERT', type: 'SELL', quantity: 25, price: 234.89, time: '14:28:42' },
    { symbol: 'OPENAI', type: 'BUY', quantity: 10, price: 1247.33, time: '14:25:18' },
    { symbol: 'HF', type: 'BUY', quantity: 75, price: 445.67, time: '14:21:55' }
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Trading Interface */}
      <div className="xl:col-span-2 space-y-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart className="w-5 h-5" />
              Trading Interface
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={orderType} onValueChange={setOrderType} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-800">
                <TabsTrigger value="buy" className="text-white data-[state=active]:bg-green-600">
                  Buy Order
                </TabsTrigger>
                <TabsTrigger value="sell" className="text-white data-[state=active]:bg-red-600">
                  Sell Order
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="buy" className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">Asset</Label>
                    <Input 
                      value={selectedAsset}
                      onChange={(e) => setSelectedAsset(e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Quantity</Label>
                    <Input 
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="0"
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">Price ($)</Label>
                    <Input 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Total ($)</Label>
                    <Input 
                      value={quantity && price ? (parseFloat(quantity) * parseFloat(price)).toFixed(2) : '0.00'}
                      readOnly
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                </div>
                
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Place Buy Order
                </Button>
              </TabsContent>
              
              <TabsContent value="sell" className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">Asset</Label>
                    <Input 
                      value={selectedAsset}
                      onChange={(e) => setSelectedAsset(e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Quantity</Label>
                    <Input 
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="0"
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">Price ($)</Label>
                    <Input 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Total ($)</Label>
                    <Input 
                      value={quantity && price ? (parseFloat(quantity) * parseFloat(price)).toFixed(2) : '0.00'}
                      readOnly
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                </div>
                
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Place Sell Order
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Recent Trades */}
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Recent Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTrades.map((trade, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge className={trade.type === 'BUY' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                      {trade.type}
                    </Badge>
                    <span className="text-white font-medium">{trade.symbol}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white">{trade.quantity} @ ${trade.price}</div>
                    <div className="text-slate-400 text-sm">{trade.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Watchlist */}
      <div className="space-y-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Watchlist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {watchlist.map((asset, index) => (
                <div 
                  key={index} 
                  className="p-3 bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors"
                  onClick={() => setSelectedAsset(asset.symbol)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">{asset.symbol}</div>
                      <div className="text-slate-400 text-sm">{asset.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white">${asset.price}</div>
                      <div className={`text-sm ${asset.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {asset.change > 0 ? '+' : ''}{asset.change}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TradingPanel;

import { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart, DollarSign, Activity, Target, Zap, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

const TradingPanel = () => {
  const [selectedAsset, setSelectedAsset] = useState('NVDA');
  const [orderType, setOrderType] = useState('buy');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('875.23');
  const [leverage, setLeverage] = useState([1]);
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');

  const watchlist = [
    { 
      symbol: 'NVDA', 
      name: 'NVIDIA Corporation', 
      price: 875.23, 
      change: 45.67, 
      aiScore: 98,
      sentiment: 'Bullish',
      volume: '15.2M',
      prediction: '+12.5%'
    },
    { 
      symbol: 'OPENAI', 
      name: 'OpenAI Corp', 
      price: 1247.33, 
      change: -23.45, 
      aiScore: 94,
      sentiment: 'Neutral',
      volume: '8.7M',
      prediction: '+8.2%'
    },
    { 
      symbol: 'ANTH', 
      name: 'Anthropic', 
      price: 432.89, 
      change: 28.34, 
      aiScore: 89,
      sentiment: 'Bullish',
      volume: '5.3M',
      prediction: '+15.8%'
    },
    { 
      symbol: 'DMND', 
      name: 'DeepMind Technologies', 
      price: 678.12, 
      change: 15.78, 
      aiScore: 92,
      sentiment: 'Bullish',
      volume: '3.8M',
      prediction: '+9.4%'
    }
  ];

  const recentTrades = [
    { symbol: 'NVDA', type: 'BUY', quantity: 50, price: 875.23, time: '14:32:15', profit: '+$2,341', status: 'completed' },
    { symbol: 'OPENAI', type: 'SELL', quantity: 25, price: 1247.33, time: '14:28:42', profit: '-$567', status: 'completed' },
    { symbol: 'ANTH', type: 'BUY', quantity: 100, price: 432.89, time: '14:25:18', profit: '+$1,234', status: 'pending' },
    { symbol: 'DMND', type: 'BUY', quantity: 75, price: 678.12, time: '14:21:55', profit: '+$890', status: 'completed' }
  ];

  const aiSignals = [
    {
      symbol: 'NVDA',
      signal: 'STRONG BUY',
      confidence: 94,
      reason: 'GPU demand surge detected',
      timeframe: '1-3 days'
    },
    {
      symbol: 'ANTH',
      signal: 'BUY',
      confidence: 87,
      reason: 'Positive sentiment analysis',
      timeframe: '2-5 days'
    },
    {
      symbol: 'OPENAI',
      signal: 'HOLD',
      confidence: 76,
      reason: 'Market consolidation phase',
      timeframe: '1-2 weeks'
    }
  ];

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'STRONG BUY': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'BUY': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'HOLD': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'SELL': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'STRONG SELL': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Advanced Trading Interface */}
      <div className="xl:col-span-2 space-y-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5"></div>
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart className="w-5 h-5" />
              Advanced Trading Terminal
              <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-cyan-500/30 ml-auto">
                AI-Powered
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <Tabs value={orderType} onValueChange={setOrderType} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800">
                <TabsTrigger value="buy" className="text-white data-[state=active]:bg-green-600">
                  Buy Order
                </TabsTrigger>
                <TabsTrigger value="sell" className="text-white data-[state=active]:bg-red-600">
                  Sell Order
                </TabsTrigger>
                <TabsTrigger value="options" className="text-white data-[state=active]:bg-purple-600">
                  Options
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="buy" className="space-y-6 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">Asset Symbol</Label>
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

                {/* Advanced Features */}
                <div className="space-y-4 p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="text-white font-medium">Advanced Options</h4>
                  
                  <div>
                    <Label className="text-slate-300">Leverage: {leverage[0]}x</Label>
                    <Slider
                      value={leverage}
                      onValueChange={setLeverage}
                      min={1}
                      max={10}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">Stop Loss</Label>
                      <Input 
                        value={stopLoss}
                        onChange={(e) => setStopLoss(e.target.value)}
                        placeholder="Optional"
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Take Profit</Label>
                      <Input 
                        value={takeProfit}
                        onChange={(e) => setTakeProfit(e.target.value)}
                        placeholder="Optional"
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg">
                  Execute Buy Order
                </Button>
              </TabsContent>
              
              <TabsContent value="sell" className="space-y-6 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">Asset Symbol</Label>
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

                {/* Advanced Features */}
                <div className="space-y-4 p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="text-white font-medium">Advanced Options</h4>
                  
                  <div>
                    <Label className="text-slate-300">Leverage: {leverage[0]}x</Label>
                    <Slider
                      value={leverage}
                      onValueChange={setLeverage}
                      min={1}
                      max={10}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">Stop Loss</Label>
                      <Input 
                        value={stopLoss}
                        onChange={(e) => setStopLoss(e.target.value)}
                        placeholder="Optional"
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Take Profit</Label>
                      <Input 
                        value={takeProfit}
                        onChange={(e) => setTakeProfit(e.target.value)}
                        placeholder="Optional"
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg">
                  Execute Sell Order
                </Button>
              </TabsContent>

              <TabsContent value="options" className="space-y-6 mt-6">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white text-lg font-semibold mb-2">Options Trading</h3>
                  <p className="text-slate-400 mb-4">Advanced derivatives trading coming soon</p>
                  <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30">
                    Beta Feature
                  </Badge>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* AI Trading Signals */}
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              AI Trading Signals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiSignals.map((signal, index) => (
                <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-medium">{signal.symbol}</span>
                      <Badge className={getSignalColor(signal.signal)}>
                        {signal.signal}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-cyan-400 font-medium">{signal.confidence}%</div>
                      <div className="text-slate-400 text-xs">Confidence</div>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm mb-2">{signal.reason}</p>
                  <div className="text-slate-400 text-xs">Timeframe: {signal.timeframe}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Watchlist */}
      <div className="space-y-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              Smart Watchlist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {watchlist.map((asset, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-all duration-300 border border-slate-700/30 hover:border-cyan-500/30"
                  onClick={() => setSelectedAsset(asset.symbol)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-white font-medium">{asset.symbol}</div>
                      <div className="text-slate-400 text-sm">{asset.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white">${asset.price}</div>
                      <div className={`text-sm ${asset.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {asset.change > 0 ? '+' : ''}{asset.change}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400">AI Score:</span>
                      <span className="text-cyan-400 ml-1">{asset.aiScore}/100</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Prediction:</span>
                      <span className="text-green-400 ml-1">{asset.prediction}</span>
                    </div>
                  </div>

                  <div className="mt-2">
                    <Badge className={`text-xs ${
                      asset.sentiment === 'Bullish' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                      asset.sentiment === 'Bearish' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                      'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    }`}>
                      {asset.sentiment}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trading History */}
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Recent Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTrades.map((trade, index) => (
                <div key={index} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Badge className={trade.type === 'BUY' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}>
                        {trade.type}
                      </Badge>
                      <span className="text-white font-medium">{trade.symbol}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white text-sm">{trade.quantity} @ ${trade.price}</div>
                      <div className={`text-xs ${trade.profit.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        {trade.profit}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{trade.time}</span>
                    <Badge className={`${
                      trade.status === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                      'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    }`}>
                      {trade.status}
                    </Badge>
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

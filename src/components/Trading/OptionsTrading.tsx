
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Calculator, DollarSign } from 'lucide-react';

interface OptionChain {
  strike: number;
  callPrice: number;
  putPrice: number;
  callVolume: number;
  putVolume: number;
  callOpenInterest: number;
  putOpenInterest: number;
  callDelta: number;
  putDelta: number;
  gamma: number;
  theta: number;
  vega: number;
}

const OptionsTrading = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('NVDA');
  const [currentPrice] = useState(875.23);
  const [quantity, setQuantity] = useState(1);
  const [selectedStrike, setSelectedStrike] = useState(875);

  const optionChain: OptionChain[] = [
    { strike: 850, callPrice: 42.50, putPrice: 15.20, callVolume: 1250, putVolume: 890, callOpenInterest: 5240, putOpenInterest: 3180, callDelta: 0.65, putDelta: -0.35, gamma: 0.012, theta: -0.25, vega: 0.18 },
    { strike: 875, callPrice: 28.75, putPrice: 26.80, callVolume: 2140, putVolume: 1560, callOpenInterest: 8920, putOpenInterest: 6750, callDelta: 0.52, putDelta: -0.48, gamma: 0.015, theta: -0.28, vega: 0.22 },
    { strike: 900, callPrice: 18.40, putPrice: 41.25, callVolume: 1680, putVolume: 2230, callOpenInterest: 6540, putOpenInterest: 9120, callDelta: 0.38, putDelta: -0.62, gamma: 0.013, theta: -0.22, vega: 0.19 },
  ];

  const calculateOptionValue = (type: 'call' | 'put', strike: number) => {
    const option = optionChain.find(opt => opt.strike === strike);
    if (!option) return 0;
    
    const price = type === 'call' ? option.callPrice : option.putPrice;
    return price * quantity * 100; // Options are per 100 shares
  };

  const getGreeks = (strike: number) => {
    const option = optionChain.find(opt => opt.strike === strike);
    return option ? {
      delta: option.callDelta,
      gamma: option.gamma,
      theta: option.theta,
      vega: option.vega
    } : null;
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calculator className="w-5 h-5 text-cyan-400" />
          Options Trading - {selectedSymbol}
          <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400">
            ${currentPrice.toFixed(2)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Entry */}
          <div className="space-y-4">
            <div>
              <label className="text-slate-400 text-sm">Symbol</label>
              <Input
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value)}
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="text-slate-400 text-sm">Quantity (Contracts)</label>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="text-slate-400 text-sm">Strike Price</label>
              <select
                value={selectedStrike}
                onChange={(e) => setSelectedStrike(Number(e.target.value))}
                className="w-full p-2 bg-slate-800/50 border border-slate-700 rounded text-white"
              >
                {optionChain.map(option => (
                  <option key={option.strike} value={option.strike}>
                    ${option.strike}
                  </option>
                ))}
              </select>
            </div>

            <Tabs defaultValue="call" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-800/50">
                <TabsTrigger value="call" className="text-white data-[state=active]:bg-green-500/20">
                  Call
                </TabsTrigger>
                <TabsTrigger value="put" className="text-white data-[state=active]:bg-red-500/20">
                  Put
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="call" className="space-y-3">
                <div className="p-3 bg-green-500/10 rounded border border-green-500/20">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Premium:</span>
                    <span className="text-green-400">${calculateOptionValue('call', selectedStrike).toFixed(2)}</span>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Buy Call
                </Button>
              </TabsContent>
              
              <TabsContent value="put" className="space-y-3">
                <div className="p-3 bg-red-500/10 rounded border border-red-500/20">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Premium:</span>
                    <span className="text-red-400">${calculateOptionValue('put', selectedStrike).toFixed(2)}</span>
                  </div>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <TrendingDown className="w-4 h-4 mr-2" />
                  Buy Put
                </Button>
              </TabsContent>
            </Tabs>
          </div>

          {/* Option Chain */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-medium mb-3">Option Chain</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {optionChain.map((option) => (
                <div
                  key={option.strike}
                  className={`p-3 bg-slate-800/30 rounded border transition-colors ${
                    option.strike === selectedStrike 
                      ? 'border-cyan-500/50 bg-cyan-500/10' 
                      : 'border-slate-700/30'
                  }`}
                >
                  <div className="grid grid-cols-5 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-slate-400 text-xs">Strike</div>
                      <div className="text-white font-medium">${option.strike}</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-green-400 text-xs">Call</div>
                      <div className="text-green-400">${option.callPrice}</div>
                      <div className="text-slate-400 text-xs">Vol: {option.callVolume}</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-red-400 text-xs">Put</div>
                      <div className="text-red-400">${option.putPrice}</div>
                      <div className="text-slate-400 text-xs">Vol: {option.putVolume}</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-slate-400 text-xs">Delta</div>
                      <div className="text-cyan-400">{option.callDelta}</div>
                      <div className="text-orange-400">{option.putDelta}</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-slate-400 text-xs">Greeks</div>
                      <div className="text-slate-300 text-xs">
                        Γ:{option.gamma} Θ:{option.theta}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Greeks Display */}
        {(() => {
          const greeks = getGreeks(selectedStrike);
          return greeks ? (
            <div className="mt-6 p-4 bg-slate-800/30 rounded border border-slate-700/30">
              <h4 className="text-white font-medium mb-3">Greeks Analysis</h4>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-slate-400 text-sm">Delta</div>
                  <div className="text-cyan-400 font-medium">{greeks.delta}</div>
                  <div className="text-slate-500 text-xs">Price sensitivity</div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400 text-sm">Gamma</div>
                  <div className="text-purple-400 font-medium">{greeks.gamma}</div>
                  <div className="text-slate-500 text-xs">Delta change</div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400 text-sm">Theta</div>
                  <div className="text-red-400 font-medium">{greeks.theta}</div>
                  <div className="text-slate-500 text-xs">Time decay</div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400 text-sm">Vega</div>
                  <div className="text-green-400 font-medium">{greeks.vega}</div>
                  <div className="text-slate-500 text-xs">Volatility</div>
                </div>
              </div>
            </div>
          ) : null;
        })()}
      </CardContent>
    </Card>
  );
};

export default OptionsTrading;

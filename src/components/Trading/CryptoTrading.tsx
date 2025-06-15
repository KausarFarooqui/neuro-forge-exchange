
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bitcoin, TrendingUp, TrendingDown, Zap } from 'lucide-react';

interface CryptoAsset {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  volume24h: number;
  marketCap: number;
  icon: string;
}

const CryptoTrading = () => {
  const [cryptoData, setCryptoData] = useState<CryptoAsset[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const initialData: CryptoAsset[] = [
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        price: 43250.75,
        change24h: 1250.80,
        changePercent24h: 2.98,
        volume24h: 15600000000,
        marketCap: 847000000000,
        icon: '₿'
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        price: 2678.45,
        change24h: -45.20,
        changePercent24h: -1.66,
        volume24h: 8900000000,
        marketCap: 321000000000,
        icon: 'Ξ'
      },
      {
        symbol: 'SOL',
        name: 'Solana',
        price: 98.75,
        change24h: 5.80,
        changePercent24h: 6.24,
        volume24h: 1200000000,
        marketCap: 42000000000,
        icon: '◎'
      },
      {
        symbol: 'ADA',
        name: 'Cardano',
        price: 0.485,
        change24h: 0.025,
        changePercent24h: 5.43,
        volume24h: 340000000,
        marketCap: 17000000000,
        icon: '₳'
      }
    ];

    setCryptoData(initialData);

    const interval = setInterval(() => {
      setCryptoData(prev => prev.map(crypto => {
        const change = (Math.random() - 0.5) * crypto.price * 0.02;
        const newPrice = Math.max(0.001, crypto.price + change);
        return {
          ...crypto,
          price: newPrice,
          change24h: change,
          changePercent24h: (change / crypto.price) * 100
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const selectedCryptoData = cryptoData.find(c => c.symbol === selectedCrypto);
  const orderValue = selectedCryptoData && quantity ? 
    parseFloat(quantity) * selectedCryptoData.price : 0;

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Bitcoin className="w-5 h-5 text-orange-400" />
          Crypto Trading
          <Badge className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 text-orange-400">
            24/7 Markets
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Crypto Selection */}
          <div className="space-y-4">
            <div>
              <label className="text-slate-400 text-sm mb-2 block">Select Cryptocurrency</label>
              <div className="space-y-2">
                {cryptoData.map((crypto) => (
                  <div
                    key={crypto.symbol}
                    onClick={() => setSelectedCrypto(crypto.symbol)}
                    className={`p-3 rounded cursor-pointer transition-colors ${
                      selectedCrypto === crypto.symbol
                        ? 'bg-cyan-500/20 border border-cyan-500/50'
                        : 'bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{crypto.icon}</span>
                        <div>
                          <div className="text-white font-medium">{crypto.symbol}</div>
                          <div className="text-slate-400 text-xs">{crypto.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white">${crypto.price.toFixed(2)}</div>
                        <div className={`text-xs ${
                          crypto.changePercent24h >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {crypto.changePercent24h >= 0 ? '+' : ''}{crypto.changePercent24h.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trading Interface */}
          <div className="space-y-4">
            <Tabs value={orderType} onValueChange={(value) => setOrderType(value as 'market' | 'limit')}>
              <TabsList className="grid w-full grid-cols-2 bg-slate-800/50">
                <TabsTrigger value="market" className="text-white data-[state=active]:bg-cyan-500/20">
                  Market
                </TabsTrigger>
                <TabsTrigger value="limit" className="text-white data-[state=active]:bg-purple-500/20">
                  Limit
                </TabsTrigger>
              </TabsList>

              <TabsContent value="market" className="space-y-4">
                <div>
                  <label className="text-slate-400 text-sm">Quantity ({selectedCrypto})</label>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="0.00"
                    className="bg-slate-800/50 border-slate-700 text-white"
                  />
                </div>
              </TabsContent>

              <TabsContent value="limit" className="space-y-4">
                <div>
                  <label className="text-slate-400 text-sm">Quantity ({selectedCrypto})</label>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="0.00"
                    className="bg-slate-800/50 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Limit Price (USD)</label>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="bg-slate-800/50 border-slate-700 text-white"
                  />
                </div>
              </TabsContent>
            </Tabs>

            {orderValue > 0 && (
              <div className="p-3 bg-slate-800/30 rounded border border-slate-700/30">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Order Value:</span>
                  <span className="text-white font-medium">${orderValue.toFixed(2)}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-green-600 hover:bg-green-700">
                <TrendingUp className="w-4 h-4 mr-2" />
                Buy
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">
                <TrendingDown className="w-4 h-4 mr-2" />
                Sell
              </Button>
            </div>
          </div>

          {/* Market Data */}
          <div className="space-y-4">
            {selectedCryptoData && (
              <>
                <div className="p-4 bg-slate-800/30 rounded border border-slate-700/30">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <span className="text-xl">{selectedCryptoData.icon}</span>
                    {selectedCryptoData.name}
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Price:</span>
                      <span className="text-white font-medium">
                        ${selectedCryptoData.price.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-slate-400">24h Change:</span>
                      <span className={`font-medium ${
                        selectedCryptoData.changePercent24h >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {selectedCryptoData.changePercent24h >= 0 ? '+' : ''}
                        {selectedCryptoData.changePercent24h.toFixed(2)}%
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-slate-400">Volume (24h):</span>
                      <span className="text-white">
                        {formatNumber(selectedCryptoData.volume24h)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-slate-400">Market Cap:</span>
                      <span className="text-white">
                        {formatNumber(selectedCryptoData.marketCap)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded border border-orange-500/20">
                  <div className="flex items-center gap-2 text-orange-400 mb-2">
                    <Zap className="w-4 h-4" />
                    <span className="font-medium text-sm">Live Markets</span>
                  </div>
                  <p className="text-slate-300 text-xs">
                    Crypto markets operate 24/7. Real-time pricing and instant execution available.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoTrading;

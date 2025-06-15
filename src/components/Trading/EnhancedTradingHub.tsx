
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Calculator, Bitcoin, BarChart3, PlayCircle } from 'lucide-react';
import OptionsTrading from './OptionsTrading';
import CryptoTrading from './CryptoTrading';

const EnhancedTradingHub = () => {
  const [isPaperTrading, setIsPaperTrading] = useState(true);

  return (
    <div className="space-y-6">
      <Card className="bg-slate-950/80 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Enhanced Trading Hub
            <Badge className={`ml-auto ${
              isPaperTrading 
                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                : 'bg-red-500/20 text-red-400 border-red-500/30'
            }`}>
              {isPaperTrading ? 'Paper Trading' : 'Live Trading'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setIsPaperTrading(!isPaperTrading)}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                isPaperTrading
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-slate-800/50 text-slate-400 border border-slate-700'
              }`}
            >
              <PlayCircle className="w-4 h-4" />
              Paper Trading Mode
            </button>
            
            {isPaperTrading && (
              <div className="text-sm text-slate-400">
                Practice trading with virtual money - no real funds at risk
              </div>
            )}
          </div>

          <Tabs defaultValue="options" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
              <TabsTrigger value="options" className="text-white data-[state=active]:bg-cyan-500/20">
                <Calculator className="w-4 h-4 mr-2" />
                Options
              </TabsTrigger>
              <TabsTrigger value="crypto" className="text-white data-[state=active]:bg-orange-500/20">
                <Bitcoin className="w-4 h-4 mr-2" />
                Crypto
              </TabsTrigger>
              <TabsTrigger value="futures" className="text-white data-[state=active]:bg-purple-500/20">
                <BarChart3 className="w-4 h-4 mr-2" />
                Futures
              </TabsTrigger>
              <TabsTrigger value="paper" className="text-white data-[state=active]:bg-green-500/20">
                <PlayCircle className="w-4 h-4 mr-2" />
                Practice
              </TabsTrigger>
            </TabsList>

            <TabsContent value="options">
              <OptionsTrading />
            </TabsContent>

            <TabsContent value="crypto">
              <CryptoTrading />
            </TabsContent>

            <TabsContent value="futures">
              <Card className="bg-slate-900/50 border-slate-700/50">
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <BarChart3 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Futures Trading</h3>
                    <p className="text-slate-400 mb-4">
                      Trade commodities, indices, and currencies with leverage
                    </p>
                    <Badge className="bg-purple-500/20 text-purple-400">
                      Coming Soon
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="paper">
              <Card className="bg-slate-900/50 border-slate-700/50">
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <PlayCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Paper Trading Dashboard</h3>
                    <p className="text-slate-400 mb-4">
                      Practice your trading strategies with virtual $100,000
                    </p>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="p-4 bg-slate-800/30 rounded">
                        <div className="text-green-400 text-2xl font-bold">$100,000</div>
                        <div className="text-slate-400 text-sm">Virtual Balance</div>
                      </div>
                      <div className="p-4 bg-slate-800/30 rounded">
                        <div className="text-cyan-400 text-2xl font-bold">+5.2%</div>
                        <div className="text-slate-400 text-sm">Performance</div>
                      </div>
                      <div className="p-4 bg-slate-800/30 rounded">
                        <div className="text-purple-400 text-2xl font-bold">24</div>
                        <div className="text-slate-400 text-sm">Trades Made</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedTradingHub;

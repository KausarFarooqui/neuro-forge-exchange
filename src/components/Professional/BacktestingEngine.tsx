
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, Calendar, Settings } from 'lucide-react';

interface BacktestResult {
  id: string;
  strategyName: string;
  timeframe: string;
  totalReturn: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
  totalTrades: number;
  averageReturn: number;
  volatility: number;
  status: 'completed' | 'running' | 'failed';
}

const BacktestingEngine = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [strategy, setStrategy] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [results, setResults] = useState<BacktestResult[]>([
    {
      id: '1',
      strategyName: 'Moving Average Crossover',
      timeframe: '2020-2024',
      totalReturn: 127.5,
      sharpeRatio: 1.85,
      maxDrawdown: 15.2,
      winRate: 68.4,
      totalTrades: 234,
      averageReturn: 2.3,
      volatility: 18.7,
      status: 'completed'
    },
    {
      id: '2',
      strategyName: 'Mean Reversion',
      timeframe: '2021-2024',
      totalReturn: 89.3,
      sharpeRatio: 1.42,
      maxDrawdown: 22.1,
      winRate: 74.2,
      totalTrades: 567,
      averageReturn: 1.8,
      volatility: 21.4,
      status: 'completed'
    },
    {
      id: '3',
      strategyName: 'Momentum Strategy',
      timeframe: '2022-2024',
      totalReturn: 156.8,
      sharpeRatio: 2.12,
      maxDrawdown: 18.9,
      winRate: 61.7,
      totalTrades: 189,
      averageReturn: 3.1,
      volatility: 24.2,
      status: 'running'
    }
  ]);

  const runBacktest = () => {
    if (!strategy || !timeframe) return;
    
    setIsRunning(true);
    
    // Simulate backtest running
    setTimeout(() => {
      const newResult: BacktestResult = {
        id: Date.now().toString(),
        strategyName: strategy,
        timeframe: timeframe,
        totalReturn: Math.random() * 200 + 50,
        sharpeRatio: Math.random() * 2 + 0.5,
        maxDrawdown: Math.random() * 30 + 10,
        winRate: Math.random() * 40 + 50,
        totalTrades: Math.floor(Math.random() * 500) + 100,
        averageReturn: Math.random() * 5 + 1,
        volatility: Math.random() * 20 + 15,
        status: 'completed'
      };
      
      setResults(prev => [newResult, ...prev]);
      setIsRunning(false);
      setStrategy('');
      setTimeframe('');
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'running': return 'bg-yellow-500/20 text-yellow-400';
      case 'failed': return 'bg-red-500/20 text-red-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getPerformanceColor = (value: number) => {
    return value >= 0 ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-950/80 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            Backtesting Engine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
              <TabsTrigger value="create" className="text-white data-[state=active]:bg-blue-500/20">
                <Settings className="w-4 h-4 mr-2" />
                Create Test
              </TabsTrigger>
              <TabsTrigger value="results" className="text-white data-[state=active]:bg-green-500/20">
                <TrendingUp className="w-4 h-4 mr-2" />
                Results
              </TabsTrigger>
              <TabsTrigger value="analysis" className="text-white data-[state=active]:bg-purple-500/20">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analysis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-800/30 border-slate-700/30">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Strategy Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-slate-300">Strategy Type</Label>
                      <Select value={strategy} onValueChange={setStrategy}>
                        <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                          <SelectValue placeholder="Select strategy" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="ma_crossover">Moving Average Crossover</SelectItem>
                          <SelectItem value="mean_reversion">Mean Reversion</SelectItem>
                          <SelectItem value="momentum">Momentum Strategy</SelectItem>
                          <SelectItem value="rsi_divergence">RSI Divergence</SelectItem>
                          <SelectItem value="bollinger_bands">Bollinger Bands</SelectItem>
                          <SelectItem value="custom">Custom Strategy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-slate-300">Time Period</Label>
                      <Select value={timeframe} onValueChange={setTimeframe}>
                        <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="2024">2024 YTD</SelectItem>
                          <SelectItem value="2023-2024">2023-2024</SelectItem>
                          <SelectItem value="2022-2024">2022-2024</SelectItem>
                          <SelectItem value="2020-2024">2020-2024</SelectItem>
                          <SelectItem value="2015-2024">2015-2024</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-slate-300">Initial Capital</Label>
                      <Input
                        type="number"
                        placeholder="100000"
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>

                    <div>
                      <Label className="text-slate-300">Commission Per Trade</Label>
                      <Input
                        type="number"
                        placeholder="1.00"
                        step="0.01"
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/30 border-slate-700/30">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Risk Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-slate-300">Position Size (%)</Label>
                      <Input
                        type="number"
                        placeholder="10"
                        max="100"
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>

                    <div>
                      <Label className="text-slate-300">Stop Loss (%)</Label>
                      <Input
                        type="number"
                        placeholder="5"
                        step="0.1"
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>

                    <div>
                      <Label className="text-slate-300">Take Profit (%)</Label>
                      <Input
                        type="number"
                        placeholder="15"
                        step="0.1"
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>

                    <div>
                      <Label className="text-slate-300">Max Positions</Label>
                      <Input
                        type="number"
                        placeholder="10"
                        min="1"
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={runBacktest}
                  disabled={isRunning || !strategy || !timeframe}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-8"
                >
                  {isRunning ? 'Running Backtest...' : 'Run Backtest'}
                </Button>
              </div>

              {isRunning && (
                <Card className="bg-slate-800/30 border-slate-700/30">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-white font-medium mb-2">Running backtest...</div>
                      <Progress value={66} className="mb-2" />
                      <div className="text-slate-400 text-sm">Processing historical data and calculating results</div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              <div className="space-y-4">
                {results.map((result) => (
                  <Card key={result.id} className="bg-slate-800/30 border-slate-700/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-white font-medium">{result.strategyName}</h3>
                          <div className="text-slate-400 text-sm">{result.timeframe}</div>
                        </div>
                        <Badge className={getStatusColor(result.status)}>
                          {result.status.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                        <div className="text-center">
                          <div className={`text-lg font-bold ${getPerformanceColor(result.totalReturn)}`}>
                            +{result.totalReturn.toFixed(1)}%
                          </div>
                          <div className="text-slate-400 text-xs">Total Return</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white text-lg font-bold">{result.sharpeRatio.toFixed(2)}</div>
                          <div className="text-slate-400 text-xs">Sharpe Ratio</div>
                        </div>
                        <div className="text-center">
                          <div className="text-red-400 text-lg font-bold">{result.maxDrawdown.toFixed(1)}%</div>
                          <div className="text-slate-400 text-xs">Max Drawdown</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white text-lg font-bold">{result.winRate.toFixed(1)}%</div>
                          <div className="text-slate-400 text-xs">Win Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white text-lg font-bold">{result.totalTrades}</div>
                          <div className="text-slate-400 text-xs">Total Trades</div>
                        </div>
                        <div className="text-center">
                          <div className="text-green-400 text-lg font-bold">{result.averageReturn.toFixed(1)}%</div>
                          <div className="text-slate-400 text-xs">Avg Return</div>
                        </div>
                        <div className="text-center">
                          <div className="text-yellow-400 text-lg font-bold">{result.volatility.toFixed(1)}%</div>
                          <div className="text-slate-400 text-xs">Volatility</div>
                        </div>
                        <div className="text-center">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <Card className="bg-slate-800/30 border-slate-700/30">
                <CardHeader>
                  <CardTitle className="text-white">Strategy Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BarChart3 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Advanced Analytics</h3>
                    <p className="text-slate-400 mb-4">
                      Compare multiple strategies, analyze performance attribution, and optimize parameters
                    </p>
                    <Badge className="bg-purple-500/20 text-purple-400">
                      Coming Soon
                    </Badge>
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

export default BacktestingEngine;

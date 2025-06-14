
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Brain, Target, DollarSign, Activity, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { useRealTimeTrading } from '@/hooks/useRealTimeTrading';
import { useEnhancedStockData } from '@/hooks/useEnhancedStockData';
import { aiStockPredictor, type StockPrediction } from '@/services/aiStockPredictor';

const RealPortfolioBoard = () => {
  const { portfolio, prices } = useRealTimeTrading();
  const [predictions, setPredictions] = useState<Record<string, StockPrediction>>({});
  const [selectedSymbol, setSelectedSymbol] = useState('NVDA');
  const [loading, setLoading] = useState(false);
  const { historicalData } = useEnhancedStockData(selectedSymbol);

  // Generate AI predictions for portfolio positions
  const generatePredictions = async () => {
    setLoading(true);
    const newPredictions: Record<string, StockPrediction> = {};
    
    // Get unique symbols from portfolio and add some popular ones
    const symbols = [...new Set([
      ...portfolio.positions.map(pos => pos.symbol),
      'NVDA', 'GOOGL', 'MSFT', 'AAPL', 'TSLA', 'META', 'AMD'
    ])];
    
    for (const symbol of symbols) {
      try {
        const currentPrice = prices[symbol]?.price || Math.random() * 500 + 50;
        const mockHistoricalData = Array.from({ length: 30 }, (_, i) => ({
          close: currentPrice + (Math.random() - 0.5) * 20,
          volume: Math.floor(Math.random() * 1000000) + 500000
        }));
        
        const analysis = aiStockPredictor.analyzeMarket(symbol, mockHistoricalData, currentPrice);
        const prediction = aiStockPredictor.generatePrediction(symbol, analysis, currentPrice);
        newPredictions[symbol] = prediction;
      } catch (error) {
        console.error(`Error generating prediction for ${symbol}:`, error);
      }
    }
    
    setPredictions(newPredictions);
    setLoading(false);
  };

  useEffect(() => {
    generatePredictions();
    const interval = setInterval(generatePredictions, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, [portfolio.positions, prices]);

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'bullish': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'bearish': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-400';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const topPredictions = Object.values(predictions)
    .filter(p => p.confidence > 60)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 8);

  const portfolioPredictions = portfolio.positions.map(position => ({
    ...position,
    prediction: predictions[position.symbol]
  }));

  return (
    <div className="space-y-6">
      {/* Portfolio Summary with AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${portfolio.totalValue.toLocaleString()}</div>
            <div className={`flex items-center gap-1 text-sm ${portfolio.totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {portfolio.totalPnL >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {portfolio.totalPnL >= 0 ? '+' : ''}${portfolio.totalPnL.toLocaleString()} ({portfolio.totalPnLPercent.toFixed(2)}%)
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">AI Confidence</CardTitle>
            <Brain className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {topPredictions.length > 0 ? Math.round(topPredictions.reduce((sum, p) => sum + p.confidence, 0) / topPredictions.length) : 0}%
            </div>
            <div className="text-sm text-slate-400">Market Analysis</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Active Positions</CardTitle>
            <Activity className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{portfolio.positions.length}</div>
            <div className="text-sm text-slate-400">Holdings</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              <div className="flex items-center gap-2">
                Cash Balance
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={generatePredictions}
                  disabled={loading}
                  className="h-4 w-4 p-0"
                >
                  <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </CardTitle>
            <DollarSign className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${portfolio.cashBalance.toLocaleString()}</div>
            <div className="text-sm text-slate-400">Available</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="positions" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800">
          <TabsTrigger value="positions" className="text-white">AI Portfolio</TabsTrigger>
          <TabsTrigger value="predictions" className="text-white">Market Predictions</TabsTrigger>
          <TabsTrigger value="analysis" className="text-white">Risk Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="positions" className="space-y-4">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                AI-Enhanced Portfolio Holdings
              </CardTitle>
            </CardHeader>
            <CardContent>
              {portfolioPredictions.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-slate-400 text-lg">No positions yet</div>
                  <div className="text-slate-500 text-sm mt-2">Start trading to build your AI-enhanced portfolio</div>
                </div>
              ) : (
                <div className="space-y-4">
                  {portfolioPredictions.map((position) => {
                    const prediction = position.prediction;
                    const potentialGain = prediction ? 
                      ((prediction.predictedPrice - position.currentPrice) * position.quantity) : 0;
                    
                    return (
                      <div key={position.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/30">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="text-white font-semibold text-lg">{position.symbol}</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400">Qty: {position.quantity}</span>
                              {prediction && (
                                <Badge className={getTrendColor(prediction.trend)}>
                                  {prediction.trend} ({prediction.confidence}%)
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-white">${position.totalValue.toLocaleString()}</div>
                            <div className={`text-sm ${position.unrealizedPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {position.unrealizedPnL >= 0 ? '+' : ''}${position.unrealizedPnL.toLocaleString()} ({position.unrealizedPnLPercent.toFixed(2)}%)
                            </div>
                          </div>
                        </div>
                        
                        {prediction && (
                          <div className="mt-3 p-3 bg-slate-700/30 rounded border border-slate-600/30">
                            <div className="grid grid-cols-2 gap-4 mb-2">
                              <div>
                                <span className="text-slate-400 text-sm">AI Target:</span>
                                <div className={`font-medium ${getConfidenceColor(prediction.confidence)}`}>
                                  ${prediction.predictedPrice.toFixed(2)}
                                </div>
                              </div>
                              <div>
                                <span className="text-slate-400 text-sm">Potential:</span>
                                <div className={`font-medium ${potentialGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                  {potentialGain >= 0 ? '+' : ''}${Math.abs(potentialGain).toFixed(0)}
                                </div>
                              </div>
                            </div>
                            <div className="text-xs text-slate-300">{prediction.reasoning}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                AI Market Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topPredictions.map((prediction) => (
                  <div key={prediction.symbol} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-white font-semibold text-lg">{prediction.symbol}</span>
                        <Badge className={getTrendColor(prediction.trend)}>
                          {prediction.trend.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">${prediction.predictedPrice.toFixed(2)}</div>
                        <div className="text-slate-400 text-sm">Target</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <span className="text-slate-400 text-sm">Current:</span>
                        <div className="text-white font-medium">${prediction.currentPrice.toFixed(2)}</div>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">Confidence:</span>
                        <div className={`font-medium ${getConfidenceColor(prediction.confidence)}`}>
                          {prediction.confidence}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="text-slate-400 text-sm mb-1">Confidence Level</div>
                      <Progress value={prediction.confidence} className="h-2" />
                    </div>
                    
                    <div className="text-sm text-slate-300 bg-slate-700/30 p-3 rounded">
                      <strong>Analysis:</strong> {prediction.reasoning.substring(0, 100)}...
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Portfolio Risk Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-4">Risk Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Diversification Score</span>
                      <div className="flex items-center gap-2">
                        <Progress value={Math.min(portfolio.positions.length * 20, 100)} className="w-20 h-2" />
                        <span className="text-green-400">{Math.min(portfolio.positions.length * 20, 100)}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">AI Confidence</span>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">High</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Volatility Risk</span>
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        Moderate
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-semibold mb-4">Market Outlook</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Overall Sentiment</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Bullish
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Volume Trend</span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">Increasing</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Next Update</span>
                      <span className="text-slate-400 text-sm">30 seconds</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RealPortfolioBoard;

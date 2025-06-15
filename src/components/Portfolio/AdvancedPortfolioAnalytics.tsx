
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Shield, TrendingUp, AlertTriangle, Target, DollarSign, BarChart3 } from 'lucide-react';
import type { Portfolio } from '@/services/stockMarketService';

interface RiskMetrics {
  sharpeRatio: number;
  valueAtRisk: number;
  maxDrawdown: number;
  beta: number;
  volatility: number;
  correlation: number;
}

interface PerformanceAttribution {
  category: string;
  contribution: number;
  percentage: number;
  color: string;
}

interface RebalancingSuggestion {
  symbol: string;
  currentWeight: number;
  targetWeight: number;
  action: 'buy' | 'sell' | 'hold';
  amount: number;
  reasoning: string;
}

interface AdvancedPortfolioAnalyticsProps {
  portfolio: Portfolio;
}

const AdvancedPortfolioAnalytics = ({ portfolio }: AdvancedPortfolioAnalyticsProps) => {
  const [riskMetrics, setRiskMetrics] = useState<RiskMetrics | null>(null);
  const [performanceAttribution, setPerformanceAttribution] = useState<PerformanceAttribution[]>([]);
  const [rebalancingSuggestions, setRebalancingSuggestions] = useState<RebalancingSuggestion[]>([]);
  const [portfolioHistory, setPortfolioHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('AdvancedPortfolioAnalytics: Initializing with portfolio:', portfolio);
    
    if (!portfolio || portfolio.totalValue === 0) {
      console.log('AdvancedPortfolioAnalytics: No portfolio data available');
      setIsLoading(false);
      return;
    }

    // Calculate advanced risk metrics
    const calculateRiskMetrics = (): RiskMetrics => {
      const totalValue = portfolio.totalValue;
      const returns = portfolio.positions.map(pos => pos.unrealizedPnLPercent / 100);
      
      // Simplified calculations for demo
      const avgReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length || 0;
      const volatility = Math.sqrt(returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / returns.length) || 0.15;
      
      return {
        sharpeRatio: volatility > 0 ? (avgReturn - 0.02) / volatility : 0,
        valueAtRisk: totalValue * 0.05, // 5% VaR
        maxDrawdown: Math.abs(Math.min(...returns)) * 100 || 5,
        beta: 1.2 + (Math.random() - 0.5) * 0.4,
        volatility: volatility * 100,
        correlation: 0.75 + (Math.random() - 0.5) * 0.3
      };
    };

    // Calculate performance attribution
    const calculatePerformanceAttribution = (): PerformanceAttribution[] => {
      const sectors = ['Technology', 'Healthcare', 'Financial', 'Energy', 'Consumer'];
      return sectors.map((sector, index) => ({
        category: sector,
        contribution: (Math.random() - 0.5) * 20,
        percentage: 15 + Math.random() * 25,
        color: ['#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index]
      }));
    };

    // Generate rebalancing suggestions
    const generateRebalancingSuggestions = (): RebalancingSuggestion[] => {
      if (portfolio.positions.length === 0) {
        return [];
      }

      return portfolio.positions.slice(0, 4).map(position => {
        const currentWeight = (position.totalValue / portfolio.totalValue) * 100;
        const targetWeight = 20 + Math.random() * 10;
        const action = currentWeight > targetWeight ? 'sell' : 'buy';
        
        return {
          symbol: position.symbol,
          currentWeight,
          targetWeight,
          action,
          amount: Math.abs(currentWeight - targetWeight) * portfolio.totalValue / 100,
          reasoning: action === 'sell' 
            ? 'Overweight position - reduce exposure' 
            : 'Underweight position - increase allocation'
        };
      });
    };

    // Generate portfolio history data
    const generatePortfolioHistory = () => {
      const history = [];
      for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        history.push({
          date: date.toISOString().split('T')[0],
          value: portfolio.totalValue + (Math.random() - 0.5) * 10000,
          benchmark: 100000 + (Math.random() - 0.5) * 8000
        });
      }
      return history;
    };

    setRiskMetrics(calculateRiskMetrics());
    setPerformanceAttribution(calculatePerformanceAttribution());
    setRebalancingSuggestions(generateRebalancingSuggestions());
    setPortfolioHistory(generatePortfolioHistory());
    setIsLoading(false);
    
    console.log('AdvancedPortfolioAnalytics: Data initialized successfully');
  }, [portfolio]);

  const getRiskColor = (value: number, type: 'sharpe' | 'var' | 'drawdown' | 'beta' | 'volatility') => {
    switch (type) {
      case 'sharpe':
        return value > 1 ? 'text-green-400' : value > 0.5 ? 'text-yellow-400' : 'text-red-400';
      case 'volatility':
        return value < 15 ? 'text-green-400' : value < 25 ? 'text-yellow-400' : 'text-red-400';
      case 'beta':
        return Math.abs(value - 1) < 0.2 ? 'text-green-400' : 'text-yellow-400';
      default:
        return 'text-white';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center h-32">
              <div className="text-cyan-400">Loading Advanced Analytics...</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!portfolio || portfolio.totalValue === 0) {
    return (
      <div className="space-y-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-slate-400 mb-4">No portfolio data available for analysis</div>
              <div className="text-sm text-slate-500">Make some trades to see advanced analytics</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!riskMetrics) {
    return (
      <div className="space-y-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="text-center text-slate-400">
              Calculating analytics...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="risk" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="risk" className="text-white data-[state=active]:bg-red-500/20">
            Risk Analysis
          </TabsTrigger>
          <TabsTrigger value="performance" className="text-white data-[state=active]:bg-green-500/20">
            Performance
          </TabsTrigger>
          <TabsTrigger value="allocation" className="text-white data-[state=active]:bg-blue-500/20">
            Asset Allocation
          </TabsTrigger>
          <TabsTrigger value="rebalancing" className="text-white data-[state=active]:bg-purple-500/20">
            Rebalancing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="risk" className="space-y-4">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-400" />
                Risk Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400">Sharpe Ratio</span>
                      <span className={`font-bold ${getRiskColor(riskMetrics.sharpeRatio, 'sharpe')}`}>
                        {riskMetrics.sharpeRatio.toFixed(2)}
                      </span>
                    </div>
                    <Progress value={Math.min(Math.max(riskMetrics.sharpeRatio * 50, 0), 100)} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400">Beta</span>
                      <span className={`font-bold ${getRiskColor(riskMetrics.beta, 'beta')}`}>
                        {riskMetrics.beta.toFixed(2)}
                      </span>
                    </div>
                    <Progress value={Math.min(riskMetrics.beta * 50, 100)} className="h-2" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400">Volatility</span>
                      <span className={`font-bold ${getRiskColor(riskMetrics.volatility, 'volatility')}`}>
                        {riskMetrics.volatility.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={Math.min(riskMetrics.volatility * 2, 100)} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400">Max Drawdown</span>
                      <span className="font-bold text-red-400">
                        -{riskMetrics.maxDrawdown.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={Math.min(riskMetrics.maxDrawdown * 5, 100)} className="h-2" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400">Value at Risk (95%)</span>
                      <span className="font-bold text-yellow-400">
                        ${riskMetrics.valueAtRisk.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400">Market Correlation</span>
                      <span className="font-bold text-cyan-400">
                        {riskMetrics.correlation.toFixed(2)}
                      </span>
                    </div>
                    <Progress value={riskMetrics.correlation * 100} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Portfolio vs Benchmark</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={portfolioHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} name="Portfolio" />
                    <Line type="monotone" dataKey="benchmark" stroke="#10b981" strokeWidth={2} name="Benchmark" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Performance Attribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceAttribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="category" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="contribution" fill="#06b6d4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-4">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={performanceAttribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="percentage"
                      label={({ category, percentage }) => `${category}: ${percentage.toFixed(1)}%`}
                    >
                      {performanceAttribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rebalancing" className="space-y-4">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                AI Rebalancing Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {rebalancingSuggestions.length === 0 ? (
                <div className="text-center text-slate-400 py-8">
                  No rebalancing suggestions available. Add more positions to your portfolio.
                </div>
              ) : (
                <div className="space-y-4">
                  {rebalancingSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.symbol}
                      className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-white font-semibold text-lg">{suggestion.symbol}</span>
                          <Badge className={
                            suggestion.action === 'buy' 
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : suggestion.action === 'sell'
                              ? 'bg-red-500/20 text-red-400 border-red-500/30'
                              : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                          }>
                            {suggestion.action.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">
                            ${suggestion.amount.toLocaleString()}
                          </div>
                          <div className="text-slate-400 text-sm">Suggested Amount</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <span className="text-slate-400 text-sm">Current Weight:</span>
                          <div className="text-white font-medium">{suggestion.currentWeight.toFixed(1)}%</div>
                        </div>
                        <div>
                          <span className="text-slate-400 text-sm">Target Weight:</span>
                          <div className="text-cyan-400 font-medium">{suggestion.targetWeight.toFixed(1)}%</div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-slate-300 bg-slate-700/30 p-3 rounded">
                        <strong>Reasoning:</strong> {suggestion.reasoning}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedPortfolioAnalytics;

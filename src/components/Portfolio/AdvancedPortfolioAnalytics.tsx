
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Shield, BarChart3, Target, RefreshCw } from 'lucide-react';
import RiskManagement from './RiskManagement';
import PerformanceAttribution from './PerformanceAttribution';
import { Portfolio } from '@/services/stockMarketService';

interface AdvancedPortfolioAnalyticsProps {
  portfolio: Portfolio;
}

const AdvancedPortfolioAnalytics = ({ portfolio }: AdvancedPortfolioAnalyticsProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock rebalancing suggestions
  const rebalancingSuggestions = [
    {
      action: 'Reduce',
      sector: 'Technology',
      currentWeight: 45.2,
      targetWeight: 35.0,
      reasoning: 'Overweight vs benchmark, high concentration risk'
    },
    {
      action: 'Increase',
      sector: 'Healthcare',
      currentWeight: 15.3,
      targetWeight: 20.0,
      reasoning: 'Defensive positioning, underweight opportunity'
    },
    {
      action: 'Add',
      sector: 'Energy',
      currentWeight: 4.1,
      targetWeight: 8.0,
      reasoning: 'Inflation hedge, seasonal strength expected'
    }
  ];

  const taxLossOpportunities = [
    {
      symbol: 'META',
      unrealizedLoss: -2450,
      taxSavings: 735,
      recommendation: 'Harvest loss before year-end'
    },
    {
      symbol: 'NFLX',
      unrealizedLoss: -1200,
      taxSavings: 360,
      recommendation: 'Consider wash sale rules'
    }
  ];

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800/50">
          <TabsTrigger value="overview" className="text-white data-[state=active]:bg-cyan-500/20">
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="risk" className="text-white data-[state=active]:bg-red-500/20">
            <Shield className="w-4 h-4 mr-2" />
            Risk Analysis
          </TabsTrigger>
          <TabsTrigger value="attribution" className="text-white data-[state=active]:bg-blue-500/20">
            <Target className="w-4 h-4 mr-2" />
            Attribution
          </TabsTrigger>
          <TabsTrigger value="rebalancing" className="text-white data-[state=active]:bg-green-500/20">
            <RefreshCw className="w-4 h-4 mr-2" />
            Rebalancing
          </TabsTrigger>
          <TabsTrigger value="tax" className="text-white data-[state=active]:bg-purple-500/20">
            <TrendingUp className="w-4 h-4 mr-2" />
            Tax Optimization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-slate-800/30 border-slate-700/30">
              <CardHeader>
                <CardTitle className="text-white text-lg">Portfolio Health Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">8.7</div>
                  <div className="text-slate-400 text-sm">out of 10</div>
                  <Badge className="bg-green-500/20 text-green-400 mt-2">
                    Excellent
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700/30">
              <CardHeader>
                <CardTitle className="text-white text-lg">Diversification Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">6.3</div>
                  <div className="text-slate-400 text-sm">out of 10</div>
                  <Badge className="bg-yellow-500/20 text-yellow-400 mt-2">
                    Moderate
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700/30">
              <CardHeader>
                <CardTitle className="text-white text-lg">ESG Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">7.9</div>
                  <div className="text-slate-400 text-sm">out of 10</div>
                  <Badge className="bg-cyan-500/20 text-cyan-400 mt-2">
                    Strong
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/30 border-slate-700/30">
              <CardHeader>
                <CardTitle className="text-white">Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-300">Alpha (1Y)</span>
                  <span className="text-green-400 font-bold">+2.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Beta</span>
                  <span className="text-white">1.15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Tracking Error</span>
                  <span className="text-white">4.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Information Ratio</span>
                  <span className="text-green-400 font-bold">0.67</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Treynor Ratio</span>
                  <span className="text-white">12.4</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700/30">
              <CardHeader>
                <CardTitle className="text-white">Risk Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-300">VaR (95%, 1-day)</span>
                  <span className="text-red-400 font-bold">-$3,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">CVaR (95%)</span>
                  <span className="text-red-400 font-bold">-$5,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Maximum Drawdown</span>
                  <span className="text-red-400">-15.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Calmar Ratio</span>
                  <span className="text-white">1.85</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Sortino Ratio</span>
                  <span className="text-green-400 font-bold">2.31</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <RiskManagement portfolio={portfolio} />
        </TabsContent>

        <TabsContent value="attribution" className="space-y-6">
          <PerformanceAttribution portfolio={portfolio} />
        </TabsContent>

        <TabsContent value="rebalancing" className="space-y-6">
          <Card className="bg-slate-800/30 border-slate-700/30">
            <CardHeader>
              <CardTitle className="text-white">AI-Optimized Rebalancing Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rebalancingSuggestions.map((suggestion, index) => (
                  <div key={index} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge className={suggestion.action === 'Reduce' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}>
                          {suggestion.action}
                        </Badge>
                        <span className="text-white font-medium">{suggestion.sector}</span>
                      </div>
                      <div className="text-slate-300 text-sm">
                        {suggestion.currentWeight.toFixed(1)}% → {suggestion.targetWeight.toFixed(1)}%
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm">{suggestion.reasoning}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tax" className="space-y-6">
          <Card className="bg-slate-800/30 border-slate-700/30">
            <CardHeader>
              <CardTitle className="text-white">Tax Loss Harvesting Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taxLossOpportunities.map((opportunity, index) => (
                  <div key={index} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-white font-medium">{opportunity.symbol}</span>
                        <Badge className="bg-red-500/20 text-red-400">
                          Loss: ${opportunity.unrealizedLoss.toLocaleString()}
                        </Badge>
                      </div>
                      <div className="text-green-400 font-bold">
                        Tax Savings: ${opportunity.taxSavings.toLocaleString()}
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm">{opportunity.recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedPortfolioAnalytics;

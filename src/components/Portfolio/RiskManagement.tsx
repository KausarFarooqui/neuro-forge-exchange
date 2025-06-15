
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, TrendingDown, Shield, Activity } from 'lucide-react';
import { Portfolio } from '@/services/stockMarketService';

interface RiskMetrics {
  var95: number;
  var99: number;
  beta: number;
  sharpeRatio: number;
  maxDrawdown: number;
  volatility: number;
  correlation: number;
}

interface StressTestResult {
  scenario: string;
  portfolioChange: number;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

interface RiskManagementProps {
  portfolio: Portfolio;
}

const RiskManagement = ({ portfolio }: RiskManagementProps) => {
  const [riskMetrics, setRiskMetrics] = useState<RiskMetrics | null>(null);
  const [stressTests, setStressTests] = useState<StressTestResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculateRiskMetrics = () => {
      // Mock risk calculations - in real app, these would be calculated from historical data
      const metrics: RiskMetrics = {
        var95: portfolio.totalValue * 0.035, // 3.5% of portfolio value
        var99: portfolio.totalValue * 0.055, // 5.5% of portfolio value
        beta: 1.2 + Math.random() * 0.4, // Random beta between 1.2-1.6
        sharpeRatio: 1.8 + Math.random() * 0.6, // Random Sharpe between 1.8-2.4
        maxDrawdown: 0.12 + Math.random() * 0.08, // 12-20% max drawdown
        volatility: 0.18 + Math.random() * 0.12, // 18-30% volatility
        correlation: 0.75 + Math.random() * 0.2 // 75-95% market correlation
      };

      const stressTestScenarios: StressTestResult[] = [
        {
          scenario: 'Market Crash (-20%)',
          portfolioChange: portfolio.totalValue * -0.24,
          description: 'Broad market decline similar to March 2020',
          severity: 'high'
        },
        {
          scenario: 'Tech Sector Correction (-15%)',
          portfolioChange: portfolio.totalValue * -0.18,
          description: 'Technology sector specific downturn',
          severity: 'medium'
        },
        {
          scenario: 'Interest Rate Spike (+200bp)',
          portfolioChange: portfolio.totalValue * -0.08,
          description: 'Federal Reserve raises rates aggressively',
          severity: 'medium'
        },
        {
          scenario: 'Inflation Surge (+3%)',
          portfolioChange: portfolio.totalValue * -0.06,
          description: 'Unexpected inflation acceleration',
          severity: 'low'
        }
      ];

      setRiskMetrics(metrics);
      setStressTests(stressTestScenarios);
      setLoading(false);
    };

    calculateRiskMetrics();
  }, [portfolio]);

  const getRiskLevel = (value: number, thresholds: { low: number; medium: number }) => {
    if (value <= thresholds.low) return { level: 'Low', color: 'text-green-400' };
    if (value <= thresholds.medium) return { level: 'Medium', color: 'text-yellow-400' };
    return { level: 'High', color: 'text-red-400' };
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'high': return 'bg-red-500/20 text-red-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  if (loading || !riskMetrics) {
    return (
      <Card className="bg-slate-900/50 border-slate-700/50">
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-slate-400">Loading risk analysis...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
          <TabsTrigger value="metrics" className="text-white data-[state=active]:bg-cyan-500/20">
            <Shield className="w-4 h-4 mr-2" />
            Risk Metrics
          </TabsTrigger>
          <TabsTrigger value="var" className="text-white data-[state=active]:bg-red-500/20">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Value at Risk
          </TabsTrigger>
          <TabsTrigger value="stress" className="text-white data-[state=active]:bg-orange-500/20">
            <Activity className="w-4 h-4 mr-2" />
            Stress Testing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-slate-800/30 border-slate-700/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300 text-sm">Portfolio Beta</span>
                  <Badge className={getRiskLevel(riskMetrics.beta, { low: 1.0, medium: 1.5 }).color}>
                    {getRiskLevel(riskMetrics.beta, { low: 1.0, medium: 1.5 }).level}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-white">{riskMetrics.beta.toFixed(2)}</div>
                <div className="text-xs text-slate-400">vs Market</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300 text-sm">Sharpe Ratio</span>
                  <Badge className={getRiskLevel(riskMetrics.sharpeRatio, { low: 1.0, medium: 2.0 }).color}>
                    {getRiskLevel(riskMetrics.sharpeRatio, { low: 1.0, medium: 2.0 }).level}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-white">{riskMetrics.sharpeRatio.toFixed(2)}</div>
                <div className="text-xs text-slate-400">Risk-Adjusted Return</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300 text-sm">Volatility</span>
                  <Badge className={getRiskLevel(riskMetrics.volatility, { low: 0.15, medium: 0.25 }).color}>
                    {getRiskLevel(riskMetrics.volatility, { low: 0.15, medium: 0.25 }).level}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-white">{(riskMetrics.volatility * 100).toFixed(1)}%</div>
                <div className="text-xs text-slate-400">Annualized</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="var" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-800/30 border-slate-700/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-400" />
                  1-Day Value at Risk
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300">95% Confidence</span>
                    <span className="text-red-400 font-bold">${riskMetrics.var95.toLocaleString()}</span>
                  </div>
                  <Progress value={35} className="h-2" />
                  <div className="text-xs text-slate-400 mt-1">
                    Maximum expected loss on 19 out of 20 days
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300">99% Confidence</span>
                    <span className="text-red-400 font-bold">${riskMetrics.var99.toLocaleString()}</span>
                  </div>
                  <Progress value={55} className="h-2" />
                  <div className="text-xs text-slate-400 mt-1">
                    Maximum expected loss on 99 out of 100 days
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700/30">
              <CardHeader>
                <CardTitle className="text-white">Risk Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-300">Market Risk</span>
                  <span className="text-white">65%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Sector Risk</span>
                  <span className="text-white">25%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Idiosyncratic Risk</span>
                  <span className="text-white">10%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stress" className="space-y-4">
          <Card className="bg-slate-800/30 border-slate-700/30">
            <CardHeader>
              <CardTitle className="text-white">Stress Test Scenarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stressTests.map((test, index) => (
                  <div key={index} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/30">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{test.scenario}</h4>
                      <Badge className={getSeverityColor(test.severity)}>
                        {test.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-sm text-slate-300 mb-2">{test.description}</div>
                    <div className={`text-lg font-bold ${test.portfolioChange < 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {test.portfolioChange < 0 ? '-' : '+'}${Math.abs(test.portfolioChange).toLocaleString()}
                      ({((test.portfolioChange / portfolio.totalValue) * 100).toFixed(1)}%)
                    </div>
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

export default RiskManagement;

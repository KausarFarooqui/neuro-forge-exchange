
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart3, PieChart, TrendingUp, Target } from 'lucide-react';
import { Portfolio } from '@/services/stockMarketService';

interface SectorAttribution {
  sector: string;
  weight: number;
  performance: number;
  attribution: number;
  benchmarkWeight: number;
}

interface FactorAttribution {
  factor: string;
  exposure: number;
  return: number;
  contribution: number;
}

interface PerformanceAttributionProps {
  portfolio: Portfolio;
}

const PerformanceAttribution = ({ portfolio }: PerformanceAttributionProps) => {
  const [sectorData, setSectorData] = useState<SectorAttribution[]>([]);
  const [factorData, setFactorData] = useState<FactorAttribution[]>([]);
  const [activeAllocation, setActiveAllocation] = useState(0);

  useEffect(() => {
    // Mock sector attribution data
    const sectors: SectorAttribution[] = [
      {
        sector: 'Technology',
        weight: 45.2,
        performance: 8.5,
        attribution: 3.84,
        benchmarkWeight: 28.5
      },
      {
        sector: 'Healthcare',
        weight: 15.3,
        performance: 4.2,
        attribution: 0.64,
        benchmarkWeight: 13.1
      },
      {
        sector: 'Financial Services',
        weight: 12.8,
        performance: 2.1,
        attribution: 0.27,
        benchmarkWeight: 15.2
      },
      {
        sector: 'Consumer Cyclical',
        weight: 10.5,
        performance: 6.3,
        attribution: 0.66,
        benchmarkWeight: 12.8
      },
      {
        sector: 'Communication',
        weight: 8.9,
        performance: -1.2,
        attribution: -0.11,
        benchmarkWeight: 9.4
      },
      {
        sector: 'Energy',
        weight: 4.1,
        performance: 12.8,
        attribution: 0.52,
        benchmarkWeight: 3.8
      },
      {
        sector: 'Cash',
        weight: 3.2,
        performance: 0.5,
        attribution: 0.02,
        benchmarkWeight: 2.2
      }
    ];

    const factors: FactorAttribution[] = [
      {
        factor: 'Growth',
        exposure: 1.35,
        return: 12.4,
        contribution: 4.8
      },
      {
        factor: 'Quality',
        exposure: 0.92,
        return: 8.7,
        contribution: 2.1
      },
      {
        factor: 'Momentum',
        exposure: 0.78,
        return: 6.2,
        contribution: 1.5
      },
      {
        factor: 'Size',
        exposure: -0.45,
        return: -3.1,
        contribution: -0.8
      },
      {
        factor: 'Value',
        exposure: -0.62,
        return: -2.8,
        contribution: -1.2
      },
      {
        factor: 'Low Volatility',
        exposure: 0.23,
        return: 4.5,
        contribution: 0.3
      }
    ];

    setSectorData(sectors);
    setFactorData(factors);
    
    // Calculate active allocation effect
    const totalActiveAllocation = sectors.reduce((sum, sector) => 
      sum + (sector.weight - sector.benchmarkWeight) * sector.performance / 100, 0
    );
    setActiveAllocation(totalActiveAllocation);
  }, [portfolio]);

  const getPerformanceColor = (value: number) => {
    return value >= 0 ? 'text-green-400' : 'text-red-400';
  };

  const getExposureColor = (value: number) => {
    if (value > 1) return 'text-cyan-400';
    if (value > 0) return 'text-green-400';
    return 'text-orange-400';
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="sector" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
          <TabsTrigger value="sector" className="text-white data-[state=active]:bg-blue-500/20">
            <PieChart className="w-4 h-4 mr-2" />
            Sector Attribution
          </TabsTrigger>
          <TabsTrigger value="factor" className="text-white data-[state=active]:bg-purple-500/20">
            <BarChart3 className="w-4 h-4 mr-2" />
            Factor Attribution
          </TabsTrigger>
          <TabsTrigger value="security" className="text-white data-[state=active]:bg-green-500/20">
            <Target className="w-4 h-4 mr-2" />
            Security Attribution
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sector" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <Card className="bg-slate-800/30 border-slate-700/30">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getPerformanceColor(portfolio.totalPnLPercent)}`}>
                    {portfolio.totalPnLPercent.toFixed(2)}%
                  </div>
                  <div className="text-slate-400 text-sm">Total Return</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/30 border-slate-700/30">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getPerformanceColor(activeAllocation)}`}>
                    {(activeAllocation * 100).toFixed(2)}%
                  </div>
                  <div className="text-slate-400 text-sm">Active Allocation</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/30 border-slate-700/30">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">2.8%</div>
                  <div className="text-slate-400 text-sm">Security Selection</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-800/30 border-slate-700/30">
            <CardHeader>
              <CardTitle className="text-white">Sector Performance Attribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sectorData.map((sector, index) => (
                  <div key={index} className="grid grid-cols-5 gap-4 p-3 bg-slate-900/50 rounded-lg">
                    <div className="text-white font-medium">{sector.sector}</div>
                    <div className="text-center">
                      <div className="text-white">{sector.weight.toFixed(1)}%</div>
                      <div className="text-xs text-slate-400">Weight</div>
                    </div>
                    <div className="text-center">
                      <div className={getPerformanceColor(sector.performance)}>
                        {sector.performance.toFixed(1)}%
                      </div>
                      <div className="text-xs text-slate-400">Return</div>
                    </div>
                    <div className="text-center">
                      <div className={getPerformanceColor(sector.attribution)}>
                        {sector.attribution.toFixed(2)}%
                      </div>
                      <div className="text-xs text-slate-400">Attribution</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white">{(sector.weight - sector.benchmarkWeight).toFixed(1)}%</div>
                      <div className="text-xs text-slate-400">vs Benchmark</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="factor" className="space-y-4">
          <Card className="bg-slate-800/30 border-slate-700/30">
            <CardHeader>
              <CardTitle className="text-white">Factor Exposure & Attribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {factorData.map((factor, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 p-4 bg-slate-900/50 rounded-lg">
                    <div className="text-white font-medium">{factor.factor}</div>
                    <div className="text-center">
                      <div className={getExposureColor(factor.exposure)}>
                        {factor.exposure.toFixed(2)}
                      </div>
                      <div className="text-xs text-slate-400">Exposure</div>
                    </div>
                    <div className="text-center">
                      <div className={getPerformanceColor(factor.return)}>
                        {factor.return.toFixed(1)}%
                      </div>
                      <div className="text-xs text-slate-400">Factor Return</div>
                    </div>
                    <div className="text-center">
                      <div className={getPerformanceColor(factor.contribution)}>
                        {factor.contribution.toFixed(1)}%
                      </div>
                      <div className="text-xs text-slate-400">Contribution</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="bg-slate-800/30 border-slate-700/30">
            <CardHeader>
              <CardTitle className="text-white">Top Security Contributors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {portfolio.positions.slice(0, 10).map((position, index) => (
                  <div key={position.id} className="grid grid-cols-4 gap-4 p-3 bg-slate-900/50 rounded-lg">
                    <div className="text-white font-medium">{position.symbol}</div>
                    <div className="text-center">
                      <div className="text-white">{((position.totalValue / portfolio.totalValue) * 100).toFixed(1)}%</div>
                      <div className="text-xs text-slate-400">Weight</div>
                    </div>
                    <div className="text-center">
                      <div className={getPerformanceColor(position.unrealizedPnLPercent)}>
                        {position.unrealizedPnLPercent.toFixed(1)}%
                      </div>
                      <div className="text-xs text-slate-400">Return</div>
                    </div>
                    <div className="text-center">
                      <div className={getPerformanceColor(position.unrealizedPnLPercent * (position.totalValue / portfolio.totalValue) / 100)}>
                        {(position.unrealizedPnLPercent * (position.totalValue / portfolio.totalValue) / 100).toFixed(2)}%
                      </div>
                      <div className="text-xs text-slate-400">Contribution</div>
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

export default PerformanceAttribution;

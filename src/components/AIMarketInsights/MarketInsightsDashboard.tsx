
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Target, Zap } from 'lucide-react';

interface SectorSentiment {
  sector: string;
  sentiment: number;
  change: number;
  volume: number;
  prediction: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  keyDrivers: string[];
}

interface MarketInsight {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  timeframe: string;
  confidence: number;
  sector: string;
}

const MarketInsightsDashboard = () => {
  const [sectorSentiments, setSectorSentiments] = useState<SectorSentiment[]>([]);
  const [marketInsights, setMarketInsights] = useState<MarketInsight[]>([]);
  const [overallMarketSentiment, setOverallMarketSentiment] = useState(72);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('MarketInsightsDashboard: Initializing component...');
    
    // Initialize with mock data that simulates real market insights
    const initialSectors: SectorSentiment[] = [
      {
        sector: 'Technology',
        sentiment: 85,
        change: 3.2,
        volume: 2.4,
        prediction: 'bullish',
        confidence: 88,
        keyDrivers: ['AI Adoption', 'Cloud Growth', 'Chip Demand']
      },
      {
        sector: 'Healthcare',
        sentiment: 72,
        change: 1.8,
        volume: 1.6,
        prediction: 'bullish',
        confidence: 75,
        keyDrivers: ['Biotech Breakthroughs', 'Aging Population', 'Drug Approvals']
      },
      {
        sector: 'Energy',
        sentiment: 68,
        change: -2.1,
        volume: 1.9,
        prediction: 'neutral',
        confidence: 65,
        keyDrivers: ['Oil Prices', 'Renewable Transition', 'Geopolitics']
      },
      {
        sector: 'Financial',
        sentiment: 76,
        change: 2.5,
        volume: 2.1,
        prediction: 'bullish',
        confidence: 78,
        keyDrivers: ['Interest Rates', 'Credit Growth', 'Fintech']
      }
    ];

    const initialInsights: MarketInsight[] = [
      {
        id: '1',
        title: 'AI Chip Demand Surge',
        description: 'Enterprise AI adoption driving unprecedented semiconductor demand',
        impact: 'high',
        timeframe: '3-6 months',
        confidence: 92,
        sector: 'Technology'
      },
      {
        id: '2',
        title: 'Healthcare M&A Activity',
        description: 'Increased consolidation in biotech sector creating opportunities',
        impact: 'medium',
        timeframe: '1-2 months',
        confidence: 78,
        sector: 'Healthcare'
      },
      {
        id: '3',
        title: 'Energy Transition Acceleration',
        description: 'Renewable energy investments reaching inflection point',
        impact: 'high',
        timeframe: '6-12 months',
        confidence: 85,
        sector: 'Energy'
      }
    ];

    setSectorSentiments(initialSectors);
    setMarketInsights(initialInsights);
    setIsLoading(false);
    
    console.log('MarketInsightsDashboard: Data initialized successfully');

    // Real-time updates simulation
    const interval = setInterval(() => {
      console.log('MarketInsightsDashboard: Updating real-time data...');
      
      setSectorSentiments(prev => prev.map(sector => ({
        ...sector,
        sentiment: Math.max(0, Math.min(100, sector.sentiment + (Math.random() - 0.5) * 3)),
        change: parseFloat((sector.change + (Math.random() - 0.5) * 1).toFixed(1)),
        volume: parseFloat((sector.volume + (Math.random() - 0.5) * 0.2).toFixed(1))
      })));

      setOverallMarketSentiment(prev => 
        Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 2))
      );
    }, 8000);

    return () => {
      console.log('MarketInsightsDashboard: Cleaning up interval');
      clearInterval(interval);
    };
  }, []);

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 80) return 'text-green-400';
    if (sentiment >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center h-32">
              <div className="text-cyan-400">Loading AI Market Insights...</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-cyan-400" />
            Overall Market Sentiment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className={`text-4xl font-bold ${getSentimentColor(overallMarketSentiment)}`}>
                {overallMarketSentiment.toFixed(0)}%
              </div>
              <div className="text-slate-400">Market Confidence</div>
            </div>
            <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-cyan-500/30">
              AI Powered
            </Badge>
          </div>
          <Progress value={overallMarketSentiment} className="h-3" />
        </CardContent>
      </Card>

      <Tabs defaultValue="sectors" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-slate-800/50">
          <TabsTrigger value="sectors" className="text-white data-[state=active]:bg-cyan-500/20">
            Sector Analysis
          </TabsTrigger>
          <TabsTrigger value="insights" className="text-white data-[state=active]:bg-purple-500/20">
            Market Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sectors" className="space-y-4">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Sector Sentiment Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sectorSentiments.map((sector) => (
                  <div
                    key={sector.sector}
                    className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-medium">{sector.sector}</h3>
                      <Badge className={
                        sector.prediction === 'bullish' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : sector.prediction === 'bearish'
                          ? 'bg-red-500/20 text-red-400 border-red-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      }>
                        {sector.prediction.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-400">Sentiment</span>
                        <span className={getSentimentColor(sector.sentiment)}>
                          {sector.sentiment.toFixed(0)}%
                        </span>
                      </div>
                      <Progress value={sector.sentiment} className="h-2" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                      <div>
                        <span className="text-slate-400">Change:</span>
                        <div className={`font-medium ${
                          sector.change >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {sector.change >= 0 ? '+' : ''}{sector.change}%
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400">Volume:</span>
                        <div className="text-white font-medium">{sector.volume}B</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Confidence:</span>
                        <div className="text-cyan-400 font-medium">{sector.confidence}%</div>
                      </div>
                    </div>

                    <div className="text-xs">
                      <span className="text-slate-400">Key Drivers:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {sector.keyDrivers.map((driver, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {driver}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                AI Market Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketInsights.map((insight) => (
                  <div
                    key={insight.id}
                    className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-white font-medium text-lg mb-1">
                          {insight.title}
                        </h3>
                        <p className="text-slate-300 text-sm mb-2">
                          {insight.description}
                        </p>
                      </div>
                      <Badge className={getImpactColor(insight.impact)}>
                        {insight.impact.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Sector:</span>
                        <div className="text-white font-medium">{insight.sector}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Timeframe:</span>
                        <div className="text-white font-medium">{insight.timeframe}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Confidence:</span>
                        <div className="text-cyan-400 font-medium">{insight.confidence}%</div>
                      </div>
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

export default MarketInsightsDashboard;

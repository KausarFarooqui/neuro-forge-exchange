
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/components/Layout/MainLayout';
import MarketSentimentRadar from '@/components/MarketSentimentRadar';
import RealPortfolioBoard from '@/components/RealPortfolioBoard';
import MarketInsightsDashboard from '@/components/AIMarketInsights/MarketInsightsDashboard';
import AdvancedPortfolioAnalytics from '@/components/Portfolio/AdvancedPortfolioAnalytics';
import { useRealTimeTrading } from '@/hooks/useRealTimeTrading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, TrendingUp, BarChart3, Target } from 'lucide-react';

const NeuralInsightsDashboard = () => {
  const [activeTab, setActiveTab] = useState('insights');
  const { portfolio } = useRealTimeTrading();

  console.log('NeuralInsightsDashboard: Rendering with activeTab:', activeTab);
  console.log('NeuralInsightsDashboard: Portfolio data:', portfolio);

  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-300 bg-clip-text text-transparent">
            Neural Insights Dashboard
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Advanced AI-powered market analysis and portfolio optimization with real-time insights
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 backdrop-blur-sm mb-8">
            <TabsTrigger 
              value="insights" 
              className="flex items-center gap-2 text-white data-[state=active]:bg-cyan-500/20"
            >
              <Brain className="w-4 h-4" />
              Market Insights
            </TabsTrigger>
            <TabsTrigger 
              value="sentiment" 
              className="flex items-center gap-2 text-white data-[state=active]:bg-purple-500/20"
            >
              <TrendingUp className="w-4 h-4" />
              Sentiment Radar
            </TabsTrigger>
            <TabsTrigger 
              value="portfolio" 
              className="flex items-center gap-2 text-white data-[state=active]:bg-green-500/20"
            >
              <Target className="w-4 h-4" />
              AI Portfolio
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="flex items-center gap-2 text-white data-[state=active]:bg-orange-500/20"
            >
              <BarChart3 className="w-4 h-4" />
              Advanced Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-6">
            <Card className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/20 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">AI Market Insights</h2>
                  <p className="text-slate-300">
                    Real-time market sentiment analysis and sector predictions powered by advanced AI
                  </p>
                </div>
              </CardContent>
            </Card>
            <MarketInsightsDashboard />
          </TabsContent>

          <TabsContent value="sentiment" className="space-y-6">
            <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">Market Sentiment Radar</h2>
                  <p className="text-slate-300">
                    Track real-time sentiment across technology sectors and emerging markets
                  </p>
                </div>
              </CardContent>
            </Card>
            <MarketSentimentRadar />
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">AI-Powered Portfolio</h2>
                  <p className="text-slate-300">
                    Intelligent portfolio management with AI predictions and real-time trading
                  </p>
                </div>
              </CardContent>
            </Card>
            <RealPortfolioBoard />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">Advanced Portfolio Analytics</h2>
                  <p className="text-slate-300">
                    Deep risk analysis, performance attribution, and AI-driven rebalancing suggestions
                  </p>
                </div>
              </CardContent>
            </Card>
            <AdvancedPortfolioAnalytics portfolio={portfolio} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default NeuralInsightsDashboard;

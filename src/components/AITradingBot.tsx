
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp, TrendingDown, Target, AlertTriangle, Zap, BarChart3 } from 'lucide-react';
import { aiTradingBot, type TradingRecommendation, type BotAnalysis } from '@/services/aiTradingBot';
import { useToast } from '@/hooks/use-toast';

interface AITradingBotProps {
  onExecuteTrade: (trade: any) => Promise<{ success: boolean; error?: string }>;
}

const AITradingBot = ({ onExecuteTrade }: AITradingBotProps) => {
  const [analysis, setAnalysis] = useState<BotAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const { toast } = useToast();

  const fetchAnalysis = async () => {
    try {
      setLoading(true);
      const botAnalysis = await aiTradingBot.generateRecommendations();
      setAnalysis(botAnalysis);
    } catch (error) {
      console.error('Error fetching AI analysis:', error);
      toast({
        title: "Analysis Error",
        description: "Failed to fetch AI recommendations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
    
    if (autoRefresh) {
      const interval = setInterval(fetchAnalysis, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const executeRecommendation = async (recommendation: TradingRecommendation) => {
    const trade = {
      symbol: recommendation.symbol,
      type: recommendation.action.toLowerCase() as 'buy' | 'sell',
      orderType: 'market' as const,
      quantity: 10, // Default quantity
      timeInForce: 'GTC' as const
    };

    const result = await onExecuteTrade(trade);
    
    if (result.success) {
      toast({
        title: "AI Trade Executed",
        description: `${recommendation.action} order for ${recommendation.symbol} executed successfully`,
      });
    } else {
      toast({
        title: "Trade Failed",
        description: result.error || "Failed to execute AI recommendation",
        variant: "destructive"
      });
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'BUY': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'SELL': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'HOLD': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'text-green-400';
      case 'MEDIUM': return 'text-yellow-400';
      case 'HIGH': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  if (loading) {
    return (
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400 animate-pulse" />
            AI Trading Bot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400">Analyzing market data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            AI Trading Bot
            <Badge className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-400 border-purple-500/30 ml-auto">
              {analysis?.marketSentiment}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300">Volatility Index</span>
                <span className="text-white font-medium">{analysis?.volatilityIndex.toFixed(1)}%</span>
              </div>
              <Progress value={analysis?.volatilityIndex || 0} className="mb-4" />
              
              <p className="text-slate-300 text-sm leading-relaxed">
                {analysis?.marketSummary}
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Button 
                  onClick={fetchAnalysis}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Refresh Analysis
                </Button>
                
                <Button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  size="sm"
                  variant={autoRefresh ? "default" : "outline"}
                  className={autoRefresh ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  Auto Refresh: {autoRefresh ? 'ON' : 'OFF'}
                </Button>
              </div>
              
              {analysis?.riskWarnings && analysis.riskWarnings.length > 0 && (
                <div className="space-y-2">
                  {analysis.riskWarnings.map((warning, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-red-500/10 border border-red-500/30 rounded">
                      <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-red-400 text-xs">{warning}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trading Recommendations */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="top-picks" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-800">
              <TabsTrigger value="top-picks" className="text-white">Top Picks</TabsTrigger>
              <TabsTrigger value="all-recommendations" className="text-white">All Signals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="top-picks" className="space-y-4 mt-6">
              {analysis?.recommendedActions
                .filter(rec => rec.action !== 'HOLD' && rec.confidence > 75)
                .slice(0, 3)
                .map((recommendation, index) => (
                <RecommendationCard 
                  key={index}
                  recommendation={recommendation}
                  onExecute={executeRecommendation}
                  getActionColor={getActionColor}
                  getRiskColor={getRiskColor}
                  isPremium={true}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="all-recommendations" className="space-y-4 mt-6">
              {analysis?.recommendedActions.map((recommendation, index) => (
                <RecommendationCard 
                  key={index}
                  recommendation={recommendation}
                  onExecute={executeRecommendation}
                  getActionColor={getActionColor}
                  getRiskColor={getRiskColor}
                />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

interface RecommendationCardProps {
  recommendation: TradingRecommendation;
  onExecute: (rec: TradingRecommendation) => void;
  getActionColor: (action: string) => string;
  getRiskColor: (risk: string) => string;
  isPremium?: boolean;
}

const RecommendationCard = ({ 
  recommendation, 
  onExecute, 
  getActionColor, 
  getRiskColor,
  isPremium = false 
}: RecommendationCardProps) => (
  <div className={`p-4 rounded-lg border ${isPremium ? 'bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border-purple-500/30' : 'bg-slate-800/50 border-slate-700/30'}`}>
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        <span className="text-white font-bold text-lg">{recommendation.symbol}</span>
        <Badge className={getActionColor(recommendation.action)}>
          {recommendation.action}
        </Badge>
        {isPremium && (
          <Badge className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-400 border-purple-500/30">
            Top Pick
          </Badge>
        )}
      </div>
      
      <div className="text-right">
        <div className="text-white font-medium">{recommendation.confidence}%</div>
        <div className="text-slate-400 text-xs">Confidence</div>
      </div>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
      <div>
        <div className="text-slate-400">Target</div>
        <div className="text-white">${recommendation.targetPrice.toFixed(2)}</div>
      </div>
      <div>
        <div className="text-slate-400">Stop Loss</div>
        <div className="text-white">${recommendation.stopLoss.toFixed(2)}</div>
      </div>
      <div>
        <div className="text-slate-400">Profit Potential</div>
        <div className="text-green-400">+{recommendation.potentialProfit.toFixed(1)}%</div>
      </div>
      <div>
        <div className="text-slate-400">Risk</div>
        <div className={getRiskColor(recommendation.riskLevel)}>{recommendation.riskLevel}</div>
      </div>
    </div>
    
    <p className="text-slate-300 text-sm mb-4 leading-relaxed">
      {recommendation.reasoning}
    </p>
    
    <div className="flex items-center justify-between">
      <span className="text-slate-400 text-xs">
        Timeframe: {recommendation.timeframe}
      </span>
      
      {recommendation.action !== 'HOLD' && (
        <Button
          onClick={() => onExecute(recommendation)}
          size="sm"
          className={recommendation.action === 'BUY' 
            ? "bg-green-600 hover:bg-green-700" 
            : "bg-red-600 hover:bg-red-700"
          }
        >
          Execute {recommendation.action}
        </Button>
      )}
    </div>
  </div>
);

export default AITradingBot;

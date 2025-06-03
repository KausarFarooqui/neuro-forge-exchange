
import { Brain, TrendingUp, Zap, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AIMarketInsights = () => {
  const insights = [
    {
      title: "AI Chip Shortage Impact",
      description: "NVIDIA's latest H100 GPU shortage is driving up AI infrastructure costs by 23%. This could benefit cloud providers like Google and Microsoft.",
      category: "Market Alert",
      sentiment: "bullish",
      confidence: 87,
      icon: Zap,
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "LLM Model Performance",
      description: "GPT-4 Turbo's efficiency improvements are causing a 15% reduction in OpenAI API costs, potentially affecting competitor pricing.",
      category: "Technology",
      sentiment: "neutral",
      confidence: 92,
      icon: Brain,
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Regulatory Outlook",
      description: "EU AI Act implementation timeline suggests increased compliance costs for AI companies. Smaller players may face challenges.",
      category: "Regulatory",
      sentiment: "bearish",
      confidence: 78,
      icon: AlertTriangle,
      color: "from-red-500 to-pink-500"
    }
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'bearish': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
    }
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-cyan-400" />
          AI Market Insights
          <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-cyan-500/30 ml-auto">
            Powered by Neural Networks
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div 
                key={index}
                className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 group"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${insight.color} bg-opacity-20`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium text-sm mb-1">{insight.title}</h4>
                    <Badge className={`text-xs ${getSentimentColor(insight.sentiment)}`}>
                      {insight.category}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-slate-300 text-sm mb-3 leading-relaxed">
                  {insight.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <Badge className={`text-xs ${getSentimentColor(insight.sentiment)}`}>
                    {insight.sentiment.toUpperCase()}
                  </Badge>
                  <div className="text-xs text-slate-400">
                    {insight.confidence}% confidence
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIMarketInsights;

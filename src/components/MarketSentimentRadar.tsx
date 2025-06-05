
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Radar, TrendingUp, AlertTriangle, Target, Zap } from 'lucide-react';

interface SentimentData {
  category: string;
  sentiment: number;
  confidence: number;
  change: number;
  volume: number;
  color: string;
}

const MarketSentimentRadar = () => {
  const [sentiments, setSentiments] = useState<SentimentData[]>([]);
  const [overallSentiment, setOverallSentiment] = useState(72);

  useEffect(() => {
    const initialSentiments: SentimentData[] = [
      {
        category: 'AI/ML',
        sentiment: 85,
        confidence: 92,
        change: 5.2,
        volume: 45230,
        color: 'from-green-500 to-emerald-500'
      },
      {
        category: 'Crypto/Web3',
        sentiment: 68,
        confidence: 78,
        change: -2.1,
        volume: 32100,
        color: 'from-yellow-500 to-orange-500'
      },
      {
        category: 'Quantum',
        sentiment: 76,
        confidence: 85,
        change: 12.7,
        volume: 8950,
        color: 'from-purple-500 to-pink-500'
      },
      {
        category: 'Biotech',
        sentiment: 71,
        confidence: 81,
        change: 3.4,
        volume: 15670,
        color: 'from-blue-500 to-cyan-500'
      },
      {
        category: 'SpaceTech',
        sentiment: 79,
        confidence: 88,
        change: 8.9,
        volume: 12340,
        color: 'from-indigo-500 to-blue-500'
      },
      {
        category: 'Climate Tech',
        sentiment: 74,
        confidence: 83,
        change: 6.1,
        volume: 18920,
        color: 'from-green-500 to-teal-500'
      }
    ];

    setSentiments(initialSentiments);

    // Real-time sentiment updates
    const interval = setInterval(() => {
      setSentiments(prev => prev.map(item => ({
        ...item,
        sentiment: Math.max(0, Math.min(100, item.sentiment + (Math.random() - 0.5) * 4)),
        change: parseFloat((item.change + (Math.random() - 0.5) * 2).toFixed(1)),
        volume: item.volume + Math.floor((Math.random() - 0.5) * 1000)
      })));

      setOverallSentiment(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 3)));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 80) return 'text-green-400';
    if (sentiment >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSentimentLabel = (sentiment: number) => {
    if (sentiment >= 80) return 'Bullish';
    if (sentiment >= 60) return 'Neutral';
    return 'Bearish';
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Radar className="w-5 h-5 text-cyan-400" />
          Market Sentiment Radar
          <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-cyan-500/30">
            AI-Powered
          </Badge>
        </CardTitle>
        <p className="text-slate-400 text-sm">Real-time sentiment analysis across tech sectors</p>
      </CardHeader>
      <CardContent>
        {/* Overall Sentiment */}
        <div className="mb-6 p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg border border-slate-600/30">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-white font-medium">Overall Tech Sentiment</h3>
              <p className="text-slate-400 text-sm">Aggregated market mood</p>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${getSentimentColor(overallSentiment)}`}>
                {overallSentiment.toFixed(0)}%
              </div>
              <Badge className={`${
                overallSentiment >= 80 
                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                  : overallSentiment >= 60
                  ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                  : 'bg-red-500/20 text-red-400 border-red-500/30'
              }`}>
                {getSentimentLabel(overallSentiment)}
              </Badge>
            </div>
          </div>
          <Progress value={overallSentiment} className="h-2" />
        </div>

        {/* Sector Sentiments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sentiments.map((item) => (
            <div
              key={item.category}
              className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`}></div>
                  <h4 className="text-white font-medium text-sm">{item.category}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${getSentimentColor(item.sentiment)}`}>
                    {item.sentiment.toFixed(0)}%
                  </span>
                  <div className={`flex items-center gap-1 text-xs ${
                    item.change >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <TrendingUp className={`w-3 h-3 ${item.change < 0 ? 'rotate-180' : ''}`} />
                    {item.change >= 0 ? '+' : ''}{item.change}%
                  </div>
                </div>
              </div>

              <Progress value={item.sentiment} className="h-2 mb-3" />

              <div className="flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <Target className="w-3 h-3" />
                  Confidence: {item.confidence}%
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Volume: {item.volume.toLocaleString()}
                </div>
              </div>

              <Badge className={`mt-2 text-xs ${
                item.sentiment >= 80 
                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                  : item.sentiment >= 60
                  ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                  : 'bg-red-500/20 text-red-400 border-red-500/30'
              }`}>
                {getSentimentLabel(item.sentiment)}
              </Badge>
            </div>
          ))}
        </div>

        {/* Alert Section */}
        <div className="mt-6 p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
          <div className="flex items-center gap-2 text-orange-400">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-medium text-sm">Sentiment Alert</span>
          </div>
          <p className="text-slate-300 text-xs mt-1">
            Crypto/Web3 sentiment showing bearish divergence. Monitor for potential market shifts.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketSentimentRadar;

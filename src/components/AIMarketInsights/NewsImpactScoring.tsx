
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, AlertCircle, Clock } from 'lucide-react';

interface NewsImpact {
  id: string;
  headline: string;
  source: string;
  impactScore: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  affectedStocks: string[];
  timestamp: Date;
  category: string;
}

const NewsImpactScoring = () => {
  const [newsData, setNewsData] = useState<NewsImpact[]>([]);

  useEffect(() => {
    const mockNews: NewsImpact[] = [
      {
        id: '1',
        headline: 'NVIDIA Reports Record Q4 Earnings, Beats Expectations',
        source: 'Reuters',
        impactScore: 92,
        sentiment: 'positive',
        affectedStocks: ['NVDA', 'AMD', 'INTC'],
        timestamp: new Date(),
        category: 'Earnings'
      },
      {
        id: '2',
        headline: 'Fed Signals Interest Rate Cuts for 2024',
        source: 'Bloomberg',
        impactScore: 85,
        sentiment: 'positive',
        affectedStocks: ['SPY', 'QQQ', 'MSFT'],
        timestamp: new Date(Date.now() - 3600000),
        category: 'Monetary Policy'
      },
      {
        id: '3',
        headline: 'Tech Sector Faces Regulatory Pressure',
        source: 'WSJ',
        impactScore: 76,
        sentiment: 'negative',
        affectedStocks: ['GOOGL', 'META', 'AAPL'],
        timestamp: new Date(Date.now() - 7200000),
        category: 'Regulation'
      }
    ];

    setNewsData(mockNews);

    const interval = setInterval(() => {
      setNewsData(prev => prev.map(item => ({
        ...item,
        impactScore: Math.max(0, Math.min(100, item.impactScore + (Math.random() - 0.5) * 5))
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getImpactColor = (score: number) => {
    if (score >= 80) return 'text-red-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'negative': return <TrendingDown className="w-4 h-4 text-red-400" />;
      default: return <AlertCircle className="w-4 h-4 text-yellow-400" />;
    }
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-cyan-400" />
          AI News Impact Scoring
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsData.map((news) => (
            <div
              key={news.id}
              className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-white font-medium text-sm mb-1">
                    {news.headline}
                  </h4>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {news.source}
                    </Badge>
                    <Badge className={`text-xs ${
                      news.sentiment === 'positive' 
                        ? 'bg-green-500/20 text-green-400'
                        : news.sentiment === 'negative'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {news.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getSentimentIcon(news.sentiment)}
                  <div className={`text-lg font-bold ${getImpactColor(news.impactScore)}`}>
                    {news.impactScore}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-400">Market Impact</span>
                  <span className={getImpactColor(news.impactScore)}>
                    {news.impactScore}%
                  </span>
                </div>
                <Progress value={news.impactScore} className="h-2" />
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3 h-3" />
                  {news.timestamp.toLocaleTimeString()}
                </div>
                <div className="flex gap-1">
                  {news.affectedStocks.slice(0, 3).map((stock) => (
                    <Badge key={stock} variant="outline" className="text-xs">
                      {stock}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsImpactScoring;

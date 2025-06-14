
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target } from 'lucide-react';
import type { StockPrediction } from '@/services/aiStockPredictor';

interface MarketPredictionsProps {
  predictions: Record<string, StockPrediction>;
}

const MarketPredictions = ({ predictions }: MarketPredictionsProps) => {
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'bullish': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'bearish': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-400';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const topPredictions = Object.values(predictions)
    .filter(p => p.confidence > 60)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 8);

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-400" />
          AI Market Predictions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topPredictions.map((prediction) => (
            <div key={prediction.symbol} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-white font-semibold text-lg">{prediction.symbol}</span>
                  <Badge className={getTrendColor(prediction.trend)}>
                    {prediction.trend.toUpperCase()}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">${prediction.predictedPrice.toFixed(2)}</div>
                  <div className="text-slate-400 text-sm">Target</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <span className="text-slate-400 text-sm">Current:</span>
                  <div className="text-white font-medium">${prediction.currentPrice.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-sm">Confidence:</span>
                  <div className={`font-medium ${getConfidenceColor(prediction.confidence)}`}>
                    {prediction.confidence}%
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-slate-400 text-sm mb-1">Confidence Level</div>
                <Progress value={prediction.confidence} className="h-2" />
              </div>
              
              <div className="text-sm text-slate-300 bg-slate-700/30 p-3 rounded">
                <strong>Analysis:</strong> {prediction.reasoning.substring(0, 100)}...
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketPredictions;

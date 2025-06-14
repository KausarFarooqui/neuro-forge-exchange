
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain } from 'lucide-react';
import type { Portfolio } from '@/services/stockMarketService';
import type { StockPrediction } from '@/services/aiStockPredictor';

interface PortfolioPositionsProps {
  portfolio: Portfolio;
  predictions: Record<string, StockPrediction>;
}

const PortfolioPositions = ({ portfolio, predictions }: PortfolioPositionsProps) => {
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

  const portfolioPredictions = portfolio.positions.map(position => ({
    ...position,
    prediction: predictions[position.symbol]
  }));

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400" />
          AI-Enhanced Portfolio Holdings
        </CardTitle>
      </CardHeader>
      <CardContent>
        {portfolioPredictions.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-slate-400 text-lg">No positions yet</div>
            <div className="text-slate-500 text-sm mt-2">Start trading to build your AI-enhanced portfolio</div>
          </div>
        ) : (
          <div className="space-y-4">
            {portfolioPredictions.map((position) => {
              const prediction = position.prediction;
              const potentialGain = prediction ? 
                ((prediction.predictedPrice - position.currentPrice) * position.quantity) : 0;
              
              return (
                <div key={position.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/30">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-white font-semibold text-lg">{position.symbol}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">Qty: {position.quantity}</span>
                        {prediction && (
                          <Badge className={getTrendColor(prediction.trend)}>
                            {prediction.trend} ({prediction.confidence}%)
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">${position.totalValue.toLocaleString()}</div>
                      <div className={`text-sm ${position.unrealizedPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {position.unrealizedPnL >= 0 ? '+' : ''}${position.unrealizedPnL.toLocaleString()} ({position.unrealizedPnLPercent.toFixed(2)}%)
                      </div>
                    </div>
                  </div>
                  
                  {prediction && (
                    <div className="mt-3 p-3 bg-slate-700/30 rounded border border-slate-600/30">
                      <div className="grid grid-cols-2 gap-4 mb-2">
                        <div>
                          <span className="text-slate-400 text-sm">AI Target:</span>
                          <div className={`font-medium ${getConfidenceColor(prediction.confidence)}`}>
                            ${prediction.predictedPrice.toFixed(2)}
                          </div>
                        </div>
                        <div>
                          <span className="text-slate-400 text-sm">Potential:</span>
                          <div className={`font-medium ${potentialGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {potentialGain >= 0 ? '+' : ''}${Math.abs(potentialGain).toFixed(0)}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-slate-300">{prediction.reasoning}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PortfolioPositions;

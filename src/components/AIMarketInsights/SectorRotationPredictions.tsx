
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RotateCcw, TrendingUp, Target } from 'lucide-react';

interface SectorPrediction {
  sector: string;
  currentWeight: number;
  predictedWeight: number;
  confidence: number;
  timeframe: string;
  drivers: string[];
  trend: 'inflow' | 'outflow' | 'stable';
}

const SectorRotationPredictions = () => {
  const [predictions, setPredictions] = useState<SectorPrediction[]>([]);

  useEffect(() => {
    const mockPredictions: SectorPrediction[] = [
      {
        sector: 'Technology',
        currentWeight: 28.5,
        predictedWeight: 32.1,
        confidence: 85,
        timeframe: '2-4 weeks',
        drivers: ['AI Adoption', 'Cloud Growth', 'Earnings Beat'],
        trend: 'inflow'
      },
      {
        sector: 'Healthcare',
        currentWeight: 15.2,
        predictedWeight: 17.8,
        confidence: 78,
        timeframe: '1-3 weeks',
        drivers: ['Drug Approvals', 'Biotech Rally', 'Demographics'],
        trend: 'inflow'
      },
      {
        sector: 'Energy',
        currentWeight: 12.8,
        predictedWeight: 9.5,
        confidence: 72,
        timeframe: '3-6 weeks',
        drivers: ['Oil Volatility', 'Green Transition', 'Geopolitics'],
        trend: 'outflow'
      },
      {
        sector: 'Financial',
        currentWeight: 18.3,
        predictedWeight: 19.1,
        confidence: 68,
        timeframe: '4-8 weeks',
        drivers: ['Interest Rates', 'Credit Cycle', 'Regulation'],
        trend: 'stable'
      }
    ];

    setPredictions(mockPredictions);

    const interval = setInterval(() => {
      setPredictions(prev => prev.map(pred => ({
        ...pred,
        currentWeight: Math.max(0, Math.min(100, pred.currentWeight + (Math.random() - 0.5) * 1)),
        predictedWeight: Math.max(0, Math.min(100, pred.predictedWeight + (Math.random() - 0.5) * 1.5))
      })));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'inflow': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'outflow': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    }
  };

  const getWeightChange = (current: number, predicted: number) => {
    const change = predicted - current;
    return {
      value: change,
      percentage: (change / current) * 100
    };
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <RotateCcw className="w-5 h-5 text-purple-400" />
          Sector Rotation Predictions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {predictions.map((pred) => {
            const change = getWeightChange(pred.currentWeight, pred.predictedWeight);
            return (
              <div
                key={pred.sector}
                className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">{pred.sector}</h4>
                  <Badge className={getTrendColor(pred.trend)}>
                    {pred.trend.toUpperCase()}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Current Weight</span>
                      <span className="text-white">{pred.currentWeight.toFixed(1)}%</span>
                    </div>
                    <Progress value={pred.currentWeight} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Predicted Weight</span>
                      <span className={change.value >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {pred.predictedWeight.toFixed(1)}% ({change.value >= 0 ? '+' : ''}{change.value.toFixed(1)})
                      </span>
                    </div>
                    <Progress value={pred.predictedWeight} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400">Confidence:</span>
                      <div className="text-cyan-400 font-medium">{pred.confidence}%</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Timeframe:</span>
                      <div className="text-white font-medium">{pred.timeframe}</div>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 text-xs">Key Drivers:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {pred.drivers.map((driver, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {driver}
                        </Badge>
                      ))}
                    </div>
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

export default SectorRotationPredictions;

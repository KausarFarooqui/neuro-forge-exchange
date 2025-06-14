
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, CheckCircle } from 'lucide-react';
import type { Portfolio } from '@/services/stockMarketService';

interface RiskAnalysisProps {
  portfolio: Portfolio;
}

const RiskAnalysis = ({ portfolio }: RiskAnalysisProps) => {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Portfolio Risk Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-white font-semibold mb-4">Risk Metrics</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Diversification Score</span>
                <div className="flex items-center gap-2">
                  <Progress value={Math.min(portfolio.positions.length * 20, 100)} className="w-20 h-2" />
                  <span className="text-green-400">{Math.min(portfolio.positions.length * 20, 100)}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">AI Confidence</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">High</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Volatility Risk</span>
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  Moderate
                </Badge>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Market Outlook</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Overall Sentiment</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  Bullish
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Volume Trend</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">Increasing</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Next Update</span>
                <span className="text-slate-400 text-sm">30 seconds</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAnalysis;

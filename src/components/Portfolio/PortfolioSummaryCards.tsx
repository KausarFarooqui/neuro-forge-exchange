
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Brain, Target, DollarSign, Activity, RefreshCw } from 'lucide-react';
import type { Portfolio } from '@/services/stockMarketService';
import type { StockPrediction } from '@/services/aiStockPredictor';

interface PortfolioSummaryCardsProps {
  portfolio: Portfolio;
  predictions: Record<string, StockPrediction>;
  loading: boolean;
  onRefresh: () => void;
}

const PortfolioSummaryCards = ({ portfolio, predictions, loading, onRefresh }: PortfolioSummaryCardsProps) => {
  const topPredictions = Object.values(predictions)
    .filter(p => p.confidence > 60)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 8);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-300">Portfolio Value</CardTitle>
          <DollarSign className="h-4 w-4 text-slate-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">${portfolio.totalValue.toLocaleString()}</div>
          <div className={`flex items-center gap-1 text-sm ${portfolio.totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {portfolio.totalPnL >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {portfolio.totalPnL >= 0 ? '+' : ''}${portfolio.totalPnL.toLocaleString()} ({portfolio.totalPnLPercent.toFixed(2)}%)
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-300">AI Confidence</CardTitle>
          <Brain className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            {topPredictions.length > 0 ? Math.round(topPredictions.reduce((sum, p) => sum + p.confidence, 0) / topPredictions.length) : 0}%
          </div>
          <div className="text-sm text-slate-400">Market Analysis</div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-300">Active Positions</CardTitle>
          <Activity className="h-4 w-4 text-slate-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{portfolio.positions.length}</div>
          <div className="text-sm text-slate-400">Holdings</div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-300">
            <div className="flex items-center gap-2">
              Cash Balance
              <Button
                size="sm"
                variant="ghost"
                onClick={onRefresh}
                disabled={loading}
                className="h-4 w-4 p-0"
              >
                <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardTitle>
          <DollarSign className="h-4 w-4 text-slate-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">${portfolio.cashBalance.toLocaleString()}</div>
          <div className="text-sm text-slate-400">Available</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioSummaryCards;

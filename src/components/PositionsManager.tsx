
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, X, Edit } from 'lucide-react';

interface Position {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  marketValue: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
  dayChange: number;
  dayChangePercent: number;
}

interface PositionsManagerProps {
  positions: Position[];
  onClosePosition: (positionId: string) => void;
  onEditPosition: (positionId: string) => void;
}

const PositionsManager = ({ positions, onClosePosition, onEditPosition }: PositionsManagerProps) => {
  const [sortBy, setSortBy] = useState<'symbol' | 'unrealizedPnL' | 'dayChange'>('unrealizedPnL');

  const sortedPositions = [...positions].sort((a, b) => {
    switch (sortBy) {
      case 'symbol':
        return a.symbol.localeCompare(b.symbol);
      case 'unrealizedPnL':
        return b.unrealizedPnL - a.unrealizedPnL;
      case 'dayChange':
        return b.dayChange - a.dayChange;
      default:
        return 0;
    }
  });

  const totalMarketValue = positions.reduce((sum, pos) => sum + pos.marketValue, 0);
  const totalUnrealizedPnL = positions.reduce((sum, pos) => sum + pos.unrealizedPnL, 0);
  const totalDayChange = positions.reduce((sum, pos) => sum + pos.dayChange, 0);

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Open Positions</CardTitle>
          <div className="flex gap-2">
            {['symbol', 'unrealizedPnL', 'dayChange'].map((sort) => (
              <Button
                key={sort}
                variant="outline"
                size="sm"
                onClick={() => setSortBy(sort as any)}
                className={`text-xs ${
                  sortBy === sort
                    ? 'bg-cyan-500 text-white border-cyan-500'
                    : 'border-slate-600 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {sort === 'unrealizedPnL' ? 'P&L' : sort === 'dayChange' ? 'Day Change' : 'Symbol'}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">${totalMarketValue.toLocaleString()}</div>
            <div className="text-slate-400 text-sm">Total Value</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${totalUnrealizedPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {totalUnrealizedPnL >= 0 ? '+' : ''}${totalUnrealizedPnL.toLocaleString()}
            </div>
            <div className="text-slate-400 text-sm">Unrealized P&L</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${totalDayChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {totalDayChange >= 0 ? '+' : ''}${totalDayChange.toLocaleString()}
            </div>
            <div className="text-slate-400 text-sm">Day Change</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {positions.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-slate-400 text-lg">No open positions</div>
            <div className="text-slate-500 text-sm mt-2">Start trading to see your positions here</div>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedPositions.map((position) => (
              <div key={position.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/30">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{position.symbol}</h3>
                    <p className="text-slate-400 text-sm">{position.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEditPosition(position.id)}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onClosePosition(position.id)}
                      className="border-red-600 text-red-400 hover:bg-red-500/10"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Quantity</span>
                    <div className="text-white font-medium">{position.quantity.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Avg Price</span>
                    <div className="text-white font-medium">${position.avgPrice.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Current Price</span>
                    <div className="text-white font-medium">${position.currentPrice.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Market Value</span>
                    <div className="text-white font-medium">${position.marketValue.toLocaleString()}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-700/50">
                  <div>
                    <span className="text-slate-400 text-sm">Unrealized P&L</span>
                    <div className={`flex items-center gap-1 ${position.unrealizedPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {position.unrealizedPnL >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span className="font-medium">
                        {position.unrealizedPnL >= 0 ? '+' : ''}${position.unrealizedPnL.toLocaleString()} 
                        ({position.unrealizedPnL >= 0 ? '+' : ''}{position.unrealizedPnLPercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-sm">Day Change</span>
                    <div className={`flex items-center gap-1 ${position.dayChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {position.dayChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span className="font-medium">
                        {position.dayChange >= 0 ? '+' : ''}${position.dayChange.toLocaleString()} 
                        ({position.dayChange >= 0 ? '+' : ''}{position.dayChangePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PositionsManager;

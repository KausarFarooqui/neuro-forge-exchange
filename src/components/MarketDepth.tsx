
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

interface DepthEntry {
  price: number;
  quantity: number;
  cumulative: number;
  side: 'bid' | 'ask';
}

interface MarketDepthProps {
  symbol: string;
  depthData: DepthEntry[];
  spread: number;
  spreadPercent: number;
}

const MarketDepth = ({ symbol, depthData, spread, spreadPercent }: MarketDepthProps) => {
  const maxQuantity = Math.max(...depthData.map(d => d.quantity));

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Market Depth - {symbol}</CardTitle>
          <div className="flex gap-2">
            <Badge className="bg-slate-700 text-slate-300">
              Spread: ${spread.toFixed(2)}
            </Badge>
            <Badge className="bg-slate-700 text-slate-300">
              {spreadPercent.toFixed(3)}%
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={depthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="price" 
                stroke="#9ca3af"
                fontSize={10}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
              />
              <YAxis 
                stroke="#9ca3af"
                fontSize={10}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              />
              <Bar dataKey="quantity" opacity={0.8}>
                {depthData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.side === 'bid' ? '#10b981' : '#ef4444'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 space-y-2">
          <div className="text-xs text-slate-400 grid grid-cols-4 gap-2 font-medium">
            <span>Price</span>
            <span>Quantity</span>
            <span>Cumulative</span>
            <span>%</span>
          </div>
          <div className="max-h-40 overflow-y-auto space-y-1">
            {depthData.slice(0, 20).map((entry, index) => (
              <div 
                key={index} 
                className="grid grid-cols-4 gap-2 text-xs py-1 hover:bg-slate-800/30 rounded"
              >
                <span className={entry.side === 'bid' ? 'text-green-400' : 'text-red-400'}>
                  ${entry.price.toFixed(2)}
                </span>
                <span className="text-white">{entry.quantity.toLocaleString()}</span>
                <span className="text-slate-300">{entry.cumulative.toLocaleString()}</span>
                <span className="text-slate-400">
                  {((entry.quantity / maxQuantity) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketDepth;

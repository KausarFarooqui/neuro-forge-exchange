
import { TrendingUp, TrendingDown, DollarSign, Percent, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const PortfolioDashboard = () => {
  const portfolioStats = {
    totalValue: 127845.67,
    totalChange: 8745.23,
    totalChangePercent: 7.34,
    dayChange: 2341.45,
    dayChangePercent: 1.87
  };

  const holdings = [
    {
      symbol: 'GPT4V',
      name: 'GPT-4 Vision API',
      quantity: 150,
      avgPrice: 142.33,
      currentPrice: 156.74,
      value: 23511.00,
      change: 2162.15,
      changePercent: 10.13,
      category: 'API'
    },
    {
      symbol: 'OPENAI',
      name: 'OpenAI Corp',
      quantity: 25,
      avgPrice: 1198.45,
      currentPrice: 1247.33,
      value: 31183.25,
      change: 1222.00,
      changePercent: 4.08,
      category: 'Company'
    },
    {
      symbol: 'BERT',
      name: 'BERT-Large Model',
      quantity: 200,
      avgPrice: 218.92,
      currentPrice: 234.89,
      value: 46978.00,
      change: 3194.00,
      changePercent: 7.29,
      category: 'Model'
    },
    {
      symbol: 'HF',
      name: 'Hugging Face Hub',
      quantity: 50,
      avgPrice: 398.21,
      currentPrice: 445.67,
      value: 22283.50,
      change: 2373.00,
      changePercent: 11.92,
      category: 'Platform'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'API': 'bg-blue-500/20 text-blue-400',
      'Company': 'bg-orange-500/20 text-orange-400',
      'Model': 'bg-purple-500/20 text-purple-400',
      'Platform': 'bg-pink-500/20 text-pink-400',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-400';
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${portfolioStats.totalValue.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-sm text-green-400">
              <TrendingUp className="w-3 h-3" />
              +${portfolioStats.totalChange.toLocaleString()} (+{portfolioStats.totalChangePercent}%)
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Today's Change</CardTitle>
            <Percent className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+${portfolioStats.dayChange.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-sm text-green-400">
              <TrendingUp className="w-3 h-3" />
              +{portfolioStats.dayChangePercent}%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Holdings</CardTitle>
            <Wallet className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{holdings.length}</div>
            <div className="text-sm text-slate-400">AI Assets</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Best Performer</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">HF</div>
            <div className="text-sm text-green-400">+11.92%</div>
          </CardContent>
        </Card>
      </div>

      {/* Holdings */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Your Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {holdings.map((holding, index) => (
              <div key={index} className="p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="font-semibold text-white">{holding.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">{holding.symbol}</span>
                        <Badge className={`text-xs ${getCategoryColor(holding.category)}`}>
                          {holding.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-white">${holding.value.toLocaleString()}</div>
                    <div className={`text-sm ${holding.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {holding.change > 0 ? '+' : ''}${holding.change.toLocaleString()} ({holding.change > 0 ? '+' : ''}{holding.changePercent}%)
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Quantity</span>
                    <div className="text-white font-medium">{holding.quantity}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Avg Price</span>
                    <div className="text-white font-medium">${holding.avgPrice}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Current Price</span>
                    <div className="text-white font-medium">${holding.currentPrice}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Actions</span>
                    <div className="flex gap-2 mt-1">
                      <Button size="sm" variant="outline" className="text-xs border-slate-600 text-slate-300">
                        Trade
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioDashboard;

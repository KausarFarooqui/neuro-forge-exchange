
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Search, Filter } from 'lucide-react';

interface ScreenerFilters {
  marketCap: string;
  peRatio: string;
  priceRange: string;
  sector: string;
  volume: string;
  change: string;
}

interface ScreenedStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  pe: number;
  beta: number;
  sector: string;
}

const StockScreener = () => {
  const [filters, setFilters] = useState<ScreenerFilters>({
    marketCap: '',
    peRatio: '',
    priceRange: '',
    sector: '',
    volume: '',
    change: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  // Mock AI stocks data
  const aiStocks: ScreenedStock[] = [
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      price: 875.23,
      change: 45.67,
      changePercent: 5.51,
      volume: 15200000,
      marketCap: 2200000000000,
      pe: 68.5,
      beta: 1.68,
      sector: 'Semiconductors'
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc Class A',
      price: 2850.45,
      change: -15.80,
      changePercent: -0.55,
      volume: 1800000,
      marketCap: 1800000000000,
      pe: 25.4,
      beta: 1.05,
      sector: 'Technology'
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      price: 415.75,
      change: 8.20,
      changePercent: 2.01,
      volume: 22500000,
      marketCap: 3100000000000,
      pe: 32.8,
      beta: 0.89,
      sector: 'Technology'
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc',
      price: 248.50,
      change: 12.30,
      changePercent: 5.20,
      volume: 45600000,
      marketCap: 789000000000,
      pe: 62.1,
      beta: 2.31,
      sector: 'Automotive'
    },
    {
      symbol: 'META',
      name: 'Meta Platforms Inc',
      price: 485.20,
      change: -8.95,
      changePercent: -1.81,
      volume: 18900000,
      marketCap: 1230000000000,
      pe: 24.7,
      beta: 1.23,
      sector: 'Technology'
    },
    {
      symbol: 'AMD',
      name: 'Advanced Micro Devices',
      price: 165.80,
      change: 6.45,
      changePercent: 4.05,
      volume: 35200000,
      marketCap: 268000000000,
      pe: 45.2,
      beta: 1.97,
      sector: 'Semiconductors'
    },
    {
      symbol: 'CRM',
      name: 'Salesforce Inc',
      price: 245.30,
      change: 3.75,
      changePercent: 1.55,
      volume: 5400000,
      marketCap: 240000000000,
      pe: 46.8,
      beta: 1.15,
      sector: 'Software'
    },
    {
      symbol: 'ORCL',
      name: 'Oracle Corporation',
      price: 118.45,
      change: -2.10,
      changePercent: -1.74,
      volume: 8900000,
      marketCap: 325000000000,
      pe: 34.2,
      beta: 0.95,
      sector: 'Software'
    }
  ];

  const filteredStocks = aiStocks.filter(stock => {
    if (searchTerm && !stock.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    if (filters.sector && stock.sector !== filters.sector) return false;
    
    if (filters.marketCap) {
      const marketCapBillion = stock.marketCap / 1e9;
      switch (filters.marketCap) {
        case 'large': if (marketCapBillion < 10) return false; break;
        case 'mid': if (marketCapBillion < 2 || marketCapBillion > 10) return false; break;
        case 'small': if (marketCapBillion > 2) return false; break;
      }
    }
    
    if (filters.peRatio) {
      switch (filters.peRatio) {
        case 'low': if (stock.pe > 20) return false; break;
        case 'medium': if (stock.pe < 20 || stock.pe > 50) return false; break;
        case 'high': if (stock.pe < 50) return false; break;
      }
    }
    
    return true;
  });

  const resetFilters = () => {
    setFilters({
      marketCap: '',
      peRatio: '',
      priceRange: '',
      sector: '',
      volume: '',
      change: ''
    });
    setSearchTerm('');
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Search className="w-5 h-5" />
          AI Stock Screener
          <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-cyan-500/30 ml-auto">
            {filteredStocks.length} Results
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search and Filters */}
        <div className="space-y-4 mb-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search stocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>
            <Button
              onClick={resetFilters}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <Filter className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-slate-300 text-sm">Market Cap</Label>
              <Select value={filters.marketCap} onValueChange={(value) => setFilters(prev => ({ ...prev, marketCap: value }))}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="large">Large Cap (>$10B)</SelectItem>
                  <SelectItem value="mid">Mid Cap ($2B-$10B)</SelectItem>
                  <SelectItem value="small">Small Cap (<$2B)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-slate-300 text-sm">P/E Ratio</Label>
              <Select value={filters.peRatio} onValueChange={(value) => setFilters(prev => ({ ...prev, peRatio: value }))}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="low">Low (<20)</SelectItem>
                  <SelectItem value="medium">Medium (20-50)</SelectItem>
                  <SelectItem value="high">High (>50)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-slate-300 text-sm">Sector</Label>
              <Select value={filters.sector} onValueChange={(value) => setFilters(prev => ({ ...prev, sector: value }))}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Semiconductors">Semiconductors</SelectItem>
                  <SelectItem value="Software">Software</SelectItem>
                  <SelectItem value="Automotive">Automotive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left text-slate-300 p-2">Symbol</th>
                <th className="text-left text-slate-300 p-2">Name</th>
                <th className="text-right text-slate-300 p-2">Price</th>
                <th className="text-right text-slate-300 p-2">Change</th>
                <th className="text-right text-slate-300 p-2">Volume</th>
                <th className="text-right text-slate-300 p-2">Market Cap</th>
                <th className="text-right text-slate-300 p-2">P/E</th>
                <th className="text-left text-slate-300 p-2">Sector</th>
              </tr>
            </thead>
            <tbody>
              {filteredStocks.map((stock) => (
                <tr key={stock.symbol} className="border-b border-slate-800 hover:bg-slate-800/30">
                  <td className="p-2">
                    <span className="text-white font-medium">{stock.symbol}</span>
                  </td>
                  <td className="p-2">
                    <span className="text-slate-300 text-sm">{stock.name}</span>
                  </td>
                  <td className="p-2 text-right">
                    <span className="text-white font-medium">${stock.price.toFixed(2)}</span>
                  </td>
                  <td className="p-2 text-right">
                    <div className={`flex items-center justify-end gap-1 ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span className="text-sm">
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </td>
                  <td className="p-2 text-right">
                    <span className="text-slate-300 text-sm">{(stock.volume / 1e6).toFixed(1)}M</span>
                  </td>
                  <td className="p-2 text-right">
                    <span className="text-slate-300 text-sm">
                      {stock.marketCap > 1e12 
                        ? `$${(stock.marketCap / 1e12).toFixed(2)}T`
                        : `$${(stock.marketCap / 1e9).toFixed(0)}B`
                      }
                    </span>
                  </td>
                  <td className="p-2 text-right">
                    <span className="text-slate-300 text-sm">{stock.pe.toFixed(1)}</span>
                  </td>
                  <td className="p-2">
                    <Badge className="text-xs bg-slate-700 text-slate-300">
                      {stock.sector}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockScreener;

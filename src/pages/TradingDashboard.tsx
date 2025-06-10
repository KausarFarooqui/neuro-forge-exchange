import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavigationHeader from '@/components/NavigationHeader';
import StockChart from '@/components/StockChart';
import OrderBook from '@/components/OrderBook';
import TradeExecution from '@/components/TradeExecution';
import PositionsManager from '@/components/PositionsManager';
import MarketDepth from '@/components/MarketDepth';
import TradingHeader from '@/components/Trading/TradingHeader';
import MarketWatchlist from '@/components/Trading/MarketWatchlist';
import QuickTradePanel from '@/components/Trading/QuickTradePanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useStockData } from '@/hooks/useStockData';
import { useRealTimeTrading } from '@/hooks/useRealTimeTrading';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, TrendingDown, Volume2, DollarSign } from 'lucide-react';

interface TradeOrder {
  symbol: string;
  type: 'buy' | 'sell';
  orderType: 'market' | 'limit' | 'stop';
  quantity: number;
  price?: number;
  stopPrice?: number;
  timeInForce: 'GTC' | 'IOC' | 'FOK';
}

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

const TradingDashboard = () => {
  const { symbol = 'NVDA' } = useParams();
  const { stockData, chartData, orderBook, loading } = useStockData(symbol);
  const { 
    prices, 
    portfolio, 
    notifications, 
    isConnected, 
    executeTrade, 
    getPrice,
    clearNotifications 
  } = useRealTimeTrading();
  const { toast } = useToast();
  const [selectedSymbol, setSelectedSymbol] = useState(symbol);
  const [availableBalance] = useState(50000); // Mock balance
  const [positions, setPositions] = useState<Position[]>([
    {
      id: '1',
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      quantity: 100,
      avgPrice: 820.50,
      currentPrice: 875.23,
      marketValue: 87523,
      unrealizedPnL: 5473,
      unrealizedPnLPercent: 6.67,
      dayChange: 4567,
      dayChangePercent: 5.51
    },
    {
      id: '2',
      symbol: 'GOOGL',
      name: 'Alphabet Inc Class A',
      quantity: 50,
      avgPrice: 2900.00,
      currentPrice: 2850.45,
      marketValue: 142522.50,
      unrealizedPnL: -2477.50,
      unrealizedPnLPercent: -1.71,
      dayChange: -790,
      dayChangePercent: -0.55
    }
  ]);

  // Update selected symbol when URL changes
  useEffect(() => {
    setSelectedSymbol(symbol);
  }, [symbol]);

  const handleTrade = async (trade: any) => {
    console.log('Executing trade:', trade);
    return await executeTrade(trade);
  };

  const handleClosePosition = (positionId: string) => {
    setPositions(prev => prev.filter(p => p.id !== positionId));
    toast({
      title: "Position Closed",
      description: "Position has been successfully closed",
    });
  };

  const handleEditPosition = (positionId: string) => {
    console.log('Edit position:', positionId);
    // Implement position editing logic
  };

  if (loading || !stockData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  const currentPrice = getPrice(selectedSymbol);
  const displayPrice = currentPrice?.price || stockData.price;
  const displayChange = currentPrice?.change || stockData.change;
  const displayChangePercent = currentPrice?.changePercent || stockData.changePercent;

  const depthData = [
    ...orderBook.bids.map(bid => ({
      price: bid.price,
      quantity: bid.quantity,
      cumulative: bid.total,
      side: 'bid' as const
    })),
    ...orderBook.asks.map(ask => ({
      price: ask.price,
      quantity: ask.quantity,
      cumulative: ask.total,
      side: 'ask' as const
    }))
  ].sort((a, b) => a.price - b.price);

  const spread = orderBook.asks[0]?.price - orderBook.bids[0]?.price || 0;
  const spreadPercent = (spread / stockData.price) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      <NavigationHeader activeTab="trading" setActiveTab={() => {}} />
      
      <main className="container mx-auto px-4 py-8">
        <TradingHeader
          symbol={selectedSymbol}
          price={displayPrice}
          change={displayChange}
          changePercent={displayChangePercent}
          isConnected={isConnected}
          notifications={notifications}
          onClearNotifications={clearNotifications}
        />

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-400 text-sm">Market Cap</span>
              </div>
              <div className="text-white font-bold">${(stockData.marketCap / 1e12).toFixed(2)}T</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-400 text-sm">Volume</span>
              </div>
              <div className="text-white font-bold">{(stockData.volume / 1e6).toFixed(1)}M</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-400 text-sm">P/E Ratio</span>
              </div>
              <div className="text-white font-bold">{stockData.pe}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-400 text-sm">Beta</span>
              </div>
              <div className="text-white font-bold">{stockData.beta}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Trading Interface */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left Column - Chart and Market Depth */}
          <div className="xl:col-span-2 space-y-6">
            <StockChart
              symbol={selectedSymbol}
              data={chartData}
              currentPrice={displayPrice}
              change={displayChange}
              changePercent={displayChangePercent}
            />
            <MarketDepth
              symbol={selectedSymbol}
              depthData={depthData}
              spread={spread}
              spreadPercent={spreadPercent}
            />
          </div>

          {/* Middle Column - Trading Controls */}
          <div className="space-y-6">
            <QuickTradePanel
              symbol={selectedSymbol}
              currentPrice={displayPrice}
              availableBalance={portfolio.cashBalance}
              onTrade={handleTrade}
            />
            <TradeExecution
              symbol={selectedSymbol}
              currentPrice={displayPrice}
              availableBalance={portfolio.cashBalance}
              onTrade={handleTrade}
            />
          </div>

          {/* Right Column - Market Data and Order Book */}
          <div className="space-y-6">
            <MarketWatchlist
              marketData={prices}
              selectedSymbol={selectedSymbol}
              onSymbolSelect={setSelectedSymbol}
            />
            <OrderBook
              symbol={selectedSymbol}
              bids={orderBook.bids}
              asks={orderBook.asks}
              lastPrice={displayPrice}
            />
          </div>
        </div>

        {/* Positions Manager */}
        <div className="mt-8">
          <PositionsManager
            positions={positions}
            onClosePosition={handleClosePosition}
            onEditPosition={handleEditPosition}
          />
        </div>
      </main>
    </div>
  );
};

export default TradingDashboard;


import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavigationHeader from '@/components/NavigationHeader';
import StockChart from '@/components/StockChart';
import OrderBook from '@/components/OrderBook';
import TradeExecution from '@/components/TradeExecution';
import PositionsManager from '@/components/PositionsManager';
import MarketDepth from '@/components/MarketDepth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useStockData } from '@/hooks/useStockData';
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
  const { toast } = useToast();
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

  const handleTrade = (trade: TradeOrder) => {
    console.log('Executing trade:', trade);
    
    // Mock trade execution
    if (trade.type === 'buy') {
      const existingPosition = positions.find(p => p.symbol === trade.symbol);
      if (existingPosition) {
        // Update existing position
        const newQuantity = existingPosition.quantity + trade.quantity;
        const newAvgPrice = ((existingPosition.avgPrice * existingPosition.quantity) + 
                           ((trade.price || stockData?.price || 0) * trade.quantity)) / newQuantity;
        
        setPositions(prev => prev.map(p => 
          p.symbol === trade.symbol 
            ? { 
                ...p, 
                quantity: newQuantity, 
                avgPrice: newAvgPrice,
                marketValue: newQuantity * (stockData?.price || 0)
              }
            : p
        ));
      } else {
        // Create new position
        const newPosition: Position = {
          id: Date.now().toString(),
          symbol: trade.symbol,
          name: stockData?.name || trade.symbol,
          quantity: trade.quantity,
          avgPrice: trade.price || stockData?.price || 0,
          currentPrice: stockData?.price || 0,
          marketValue: trade.quantity * (stockData?.price || 0),
          unrealizedPnL: 0,
          unrealizedPnLPercent: 0,
          dayChange: 0,
          dayChangePercent: 0
        };
        setPositions(prev => [...prev, newPosition]);
      }
    }
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
        {/* Stock Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-white">{stockData.symbol}</h1>
            <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-cyan-500/30">
              LIVE
            </Badge>
          </div>
          <p className="text-xl text-slate-300">{stockData.name}</p>
          
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
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
        </div>

        {/* Main Trading Interface */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Chart and Market Depth */}
          <div className="xl:col-span-2 space-y-6">
            <StockChart
              symbol={stockData.symbol}
              data={chartData}
              currentPrice={stockData.price}
              change={stockData.change}
              changePercent={stockData.changePercent}
            />
            <MarketDepth
              symbol={stockData.symbol}
              depthData={depthData}
              spread={spread}
              spreadPercent={spreadPercent}
            />
          </div>

          {/* Right Column - Trading and Order Book */}
          <div className="space-y-6">
            <TradeExecution
              symbol={stockData.symbol}
              currentPrice={stockData.price}
              availableBalance={availableBalance}
              onTrade={handleTrade}
            />
            <OrderBook
              symbol={stockData.symbol}
              bids={orderBook.bids}
              asks={orderBook.asks}
              lastPrice={stockData.price}
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

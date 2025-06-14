
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavigationHeader from '@/components/NavigationHeader';
import PositionsManager from '@/components/PositionsManager';
import TradingHeader from '@/components/Trading/TradingHeader';
import TradingStats from '@/components/Trading/TradingStats';
import TradingLayout from '@/components/Trading/TradingLayout';
import { useStockData } from '@/hooks/useStockData';
import { useRealTimeTrading } from '@/hooks/useRealTimeTrading';
import { useToast } from '@/hooks/use-toast';

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

        <TradingStats stockData={stockData} />

        <TradingLayout
          selectedSymbol={selectedSymbol}
          chartData={chartData}
          displayPrice={displayPrice}
          displayChange={displayChange}
          displayChangePercent={displayChangePercent}
          depthData={depthData}
          spread={spread}
          spreadPercent={spreadPercent}
          portfolio={portfolio}
          orderBook={orderBook}
          prices={prices}
          onTrade={handleTrade}
          onSymbolSelect={setSelectedSymbol}
        />

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

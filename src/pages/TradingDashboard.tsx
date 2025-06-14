import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavigationHeader from '@/components/NavigationHeader';
import PositionsManager from '@/components/PositionsManager';
import TradingHeader from '@/components/Trading/TradingHeader';
import TradingStats from '@/components/Trading/TradingStats';
import TradingLayout from '@/components/Trading/TradingLayout';
import ApiConfiguration from '@/components/Trading/ApiConfiguration';
import { useEnhancedStockData } from '@/hooks/useEnhancedStockData';
import { useRealTimeTrading } from '@/hooks/useRealTimeTrading';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Settings, Wifi } from 'lucide-react';

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
  const [selectedSymbol, setSelectedSymbol] = useState(symbol);
  const [showApiConfig, setShowApiConfig] = useState(false);
  const [isApiConfigured, setIsApiConfigured] = useState(false);
  
  const { quote, historicalData, loading, error, isConnected } = useEnhancedStockData(selectedSymbol);
  const { 
    prices, 
    portfolio, 
    notifications, 
    executeTrade, 
    getPrice,
    clearNotifications 
  } = useRealTimeTrading();
  
  const { toast } = useToast();
  const [positions, setPositions] = useState([
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

  // Check API configuration status
  useEffect(() => {
    const checkApiConfig = () => {
      const savedConfig = localStorage.getItem('stockApiConfig');
      const configured = !!savedConfig;
      setIsApiConfigured(configured);
      
      // Show config panel if not configured
      if (!configured) {
        setShowApiConfig(true);
      }
    };

    checkApiConfig();
    
    // Listen for storage changes to update config status
    const handleStorageChange = () => {
      checkApiConfig();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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
  };

  const handleApiConfigured = () => {
    setIsApiConfigured(true);
    setShowApiConfig(false);
    toast({
      title: "API Configured",
      description: "Real-time market data is now active",
    });
  };

  // Show API configuration prominently if not set up
  if (showApiConfig && !isApiConfigured) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
        <NavigationHeader activeTab="trading" setActiveTab={() => {}} />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">Configure Market Data</h1>
              <p className="text-slate-300">Set up your API provider to access real-time stock market data</p>
            </div>
            
            <Alert className="mb-6 bg-blue-500/10 border-blue-500/30">
              <Wifi className="h-4 w-4" />
              <AlertDescription className="text-blue-400">
                To access real-time market data, please configure your API provider. You can get started with a free Alpha Vantage API key.
              </AlertDescription>
            </Alert>
            
            <ApiConfiguration />
            
            <div className="mt-6 text-center">
              <Button
                onClick={() => setShowApiConfig(false)}
                variant="outline"
                className="mr-3"
              >
                Continue with Mock Data
              </Button>
              <Button
                onClick={() => window.location.href = '/trading-setup'}
                className="bg-gradient-to-r from-cyan-500 to-blue-600"
              >
                Full Setup Guide
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (loading && !quote) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400 mb-4"></div>
          <p className="text-white">Loading market data...</p>
        </div>
      </div>
    );
  }

  // Use real-time data if available, fallback to mock data
  const currentPrice = quote?.price || getPrice(selectedSymbol)?.price || 0;
  const displayChange = quote?.change || getPrice(selectedSymbol)?.change || 0;
  const displayChangePercent = quote?.changePercent || getPrice(selectedSymbol)?.changePercent || 0;

  // Convert historical data to chart format
  const chartData = historicalData.slice(-30).map(item => ({
    time: new Date(item.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    price: item.close,
    volume: item.volume
  }));

  // Generate mock order book if real data is not available
  const generateOrderBook = () => {
    const bids = [];
    const asks = [];
    
    for (let i = 0; i < 10; i++) {
      const bidPrice = currentPrice - (i + 1) * 0.25;
      const askPrice = currentPrice + (i + 1) * 0.25;
      const bidQuantity = Math.floor(Math.random() * 1000) + 100;
      const askQuantity = Math.floor(Math.random() * 1000) + 100;
      
      bids.push({
        price: bidPrice,
        quantity: bidQuantity,
        total: bidPrice * bidQuantity
      });
      
      asks.push({
        price: askPrice,
        quantity: askQuantity,
        total: askPrice * askQuantity
      });
    }
    
    return { bids, asks };
  };

  const orderBook = generateOrderBook();

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
  const spreadPercent = (spread / currentPrice) * 100;

  // Mock stock data for TradingStats
  const stockData = {
    marketCap: quote?.marketCap || 2200000000000,
    volume: quote?.volume || 15200000,
    pe: quote?.pe || 68.5,
    beta: 1.68
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      <NavigationHeader activeTab="trading" setActiveTab={() => {}} />
      
      <main className="container mx-auto px-4 py-8">
        {error && !isApiConfigured && (
          <Alert className="mb-6 bg-yellow-500/10 border-yellow-500/30">
            <Settings className="h-4 w-4" />
            <AlertDescription className="text-yellow-400 flex items-center justify-between">
              <span>{error} - Using mock data for demonstration.</span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setShowApiConfig(true)}
                className="ml-4"
              >
                Configure API
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <TradingHeader
          symbol={selectedSymbol}
          price={currentPrice}
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
          displayPrice={currentPrice}
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

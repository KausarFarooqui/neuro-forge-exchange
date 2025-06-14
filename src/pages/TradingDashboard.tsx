import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PositionsManager from '@/components/PositionsManager';
import TradingHeader from '@/components/Trading/TradingHeader';
import TradingStats from '@/components/Trading/TradingStats';
import TradingLayout from '@/components/Trading/TradingLayout';
import TradingDashboardLayout from '@/components/Trading/TradingDashboardLayout';
import ApiSetupPrompt from '@/components/Trading/ApiSetupPrompt';
import LoadingScreen from '@/components/Trading/LoadingScreen';
import ErrorAlert from '@/components/Trading/ErrorAlert';
import RealPortfolioBoard from '@/components/RealPortfolioBoard';
import AITradingBot from '@/components/AITradingBot';
import { useTradingData } from '@/hooks/useTradingData';
import { useApiConfiguration } from '@/hooks/useApiConfiguration';
import { useToast } from '@/hooks/use-toast';

const TradingDashboard = () => {
  const { symbol = 'NVDA' } = useParams();
  const [selectedSymbol, setSelectedSymbol] = useState(symbol);
  const [activeTab, setActiveTab] = useState('trading');
  const { toast } = useToast();
  
  const {
    loading,
    error,
    isConnected,
    positions,
    portfolio,
    notifications,
    executeTrade,
    clearNotifications,
    currentPrice,
    displayChange,
    displayChangePercent,
    chartData,
    orderBook,
    depthData,
    spread,
    spreadPercent,
    stockData,
    prices
  } = useTradingData(selectedSymbol);

  const {
    isApiConfigured,
    showApiConfig,
    setShowApiConfig,
    handleApiConfigured
  } = useApiConfiguration();

  // Update selected symbol when URL changes
  useEffect(() => {
    setSelectedSymbol(symbol);
  }, [symbol]);

  // Log connection status for debugging
  useEffect(() => {
    console.log('Trading Dashboard Status:', {
      isApiConfigured,
      isConnected,
      currentPrice,
      symbol: selectedSymbol,
      loading,
      activeTab
    });
  }, [isApiConfigured, isConnected, currentPrice, selectedSymbol, loading, activeTab]);

  const handleTrade = async (trade: any) => {
    console.log('Executing trade:', trade);
    const result = await executeTrade(trade);
    if (result.success) {
      toast({
        title: "Trade Executed Successfully",
        description: `${trade.type.toUpperCase()} ${trade.quantity} shares of ${trade.symbol}`,
      });
    } else {
      toast({
        title: "Trade Failed",
        description: result.error || "Unknown error occurred",
        variant: "destructive"
      });
    }
    return result;
  };

  const handleClosePosition = (positionId: string) => {
    const position = positions.find(p => p.id === positionId);
    if (position) {
      const sellOrder = {
        symbol: position.symbol,
        type: 'sell' as const,
        orderType: 'market' as const,
        quantity: position.quantity,
        timeInForce: 'GTC' as const
      };
      
      executeTrade(sellOrder).then(result => {
        if (result.success) {
          toast({
            title: "Position Closed",
            description: `Successfully closed ${position.quantity} shares of ${position.symbol}`,
          });
        }
      });
    }
  };

  const handleEditPosition = (positionId: string) => {
    console.log('Edit position:', positionId);
    toast({
      title: "Edit Position",
      description: "Position editing feature coming soon",
    });
  };

  // Show API configuration prominently if not set up and no real data
  if (!isApiConfigured && showApiConfig) {
    return (
      <ApiSetupPrompt 
        onHideSetup={() => setShowApiConfig(false)}
      />
    );
  }

  // Show loading only if we have no data at all
  if (loading && !currentPrice && !isConnected) {
    return <LoadingScreen />;
  }

  return (
    <TradingDashboardLayout>
      {error && !isConnected && (
        <ErrorAlert 
          error={error} 
          isApiConfigured={isApiConfigured}
          onShowApiConfig={() => setShowApiConfig(true)}
        />
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800 mb-6">
          <TabsTrigger value="trading" className="text-white">Trading Interface</TabsTrigger>
          <TabsTrigger value="ai-bot" className="text-white">AI Trading Bot</TabsTrigger>
          <TabsTrigger value="portfolio" className="text-white">AI Portfolio</TabsTrigger>
          <TabsTrigger value="positions" className="text-white">Positions</TabsTrigger>
        </TabsList>

        <TabsContent value="trading" className="space-y-6">
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
        </TabsContent>

        <TabsContent value="ai-bot" className="space-y-6">
          <AITradingBot onExecuteTrade={handleTrade} />
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <RealPortfolioBoard />
        </TabsContent>

        <TabsContent value="positions" className="space-y-6">
          <PositionsManager
            positions={positions}
            onClosePosition={handleClosePosition}
            onEditPosition={handleEditPosition}
          />
        </TabsContent>
      </Tabs>
    </TradingDashboardLayout>
  );
};

export default TradingDashboard;


import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRealTimeTrading } from '@/hooks/useRealTimeTrading';
import { useEnhancedStockData } from '@/hooks/useEnhancedStockData';
import { aiStockPredictor, type StockPrediction } from '@/services/aiStockPredictor';
import PortfolioSummaryCards from '@/components/Portfolio/PortfolioSummaryCards';
import PortfolioPositions from '@/components/Portfolio/PortfolioPositions';
import MarketPredictions from '@/components/Portfolio/MarketPredictions';
import RiskAnalysis from '@/components/Portfolio/RiskAnalysis';

const RealPortfolioBoard = () => {
  const { portfolio, prices } = useRealTimeTrading();
  const [predictions, setPredictions] = useState<Record<string, StockPrediction>>({});
  const [selectedSymbol, setSelectedSymbol] = useState('NVDA');
  const [loading, setLoading] = useState(false);
  const { historicalData } = useEnhancedStockData(selectedSymbol);

  // Generate AI predictions for portfolio positions
  const generatePredictions = async () => {
    setLoading(true);
    const newPredictions: Record<string, StockPrediction> = {};
    
    // Get unique symbols from portfolio and add some popular ones
    const symbols = [...new Set([
      ...portfolio.positions.map(pos => pos.symbol),
      'NVDA', 'GOOGL', 'MSFT', 'AAPL', 'TSLA', 'META', 'AMD'
    ])];
    
    for (const symbol of symbols) {
      try {
        const currentPrice = prices[symbol]?.price || Math.random() * 500 + 50;
        const mockHistoricalData = Array.from({ length: 30 }, (_, i) => ({
          close: currentPrice + (Math.random() - 0.5) * 20,
          volume: Math.floor(Math.random() * 1000000) + 500000
        }));
        
        const analysis = aiStockPredictor.analyzeMarket(symbol, mockHistoricalData, currentPrice);
        const prediction = aiStockPredictor.generatePrediction(symbol, analysis, currentPrice);
        newPredictions[symbol] = prediction;
      } catch (error) {
        console.error(`Error generating prediction for ${symbol}:`, error);
      }
    }
    
    setPredictions(newPredictions);
    setLoading(false);
  };

  useEffect(() => {
    generatePredictions();
    const interval = setInterval(generatePredictions, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, [portfolio.positions, prices]);

  return (
    <div className="space-y-6">
      <PortfolioSummaryCards 
        portfolio={portfolio}
        predictions={predictions}
        loading={loading}
        onRefresh={generatePredictions}
      />

      <Tabs defaultValue="positions" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800">
          <TabsTrigger value="positions" className="text-white">AI Portfolio</TabsTrigger>
          <TabsTrigger value="predictions" className="text-white">Market Predictions</TabsTrigger>
          <TabsTrigger value="analysis" className="text-white">Risk Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="positions" className="space-y-4">
          <PortfolioPositions portfolio={portfolio} predictions={predictions} />
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <MarketPredictions predictions={predictions} />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <RiskAnalysis portfolio={portfolio} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RealPortfolioBoard;

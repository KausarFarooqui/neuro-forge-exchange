import { useState, useEffect, useCallback } from 'react';
import { stockApiService } from '@/services/stockApiService';
import type { RealTimeQuote, HistoricalData } from '@/services/stockApiService';

interface UseEnhancedStockDataReturn {
  quote: RealTimeQuote | null;
  historicalData: HistoricalData[];
  loading: boolean;
  error: string | null;
  refreshData: () => void;
  isConnected: boolean;
}

export const useEnhancedStockData = (symbol: string): UseEnhancedStockDataReturn => {
  const [quote, setQuote] = useState<RealTimeQuote | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const fetchQuote = useCallback(async () => {
    try {
      console.log(`Fetching quote for ${symbol}...`);
      setError(null);
      const quoteData = await stockApiService.getQuote(symbol);
      console.log(`Quote data for ${symbol}:`, quoteData);
      setQuote(quoteData);
      setIsConnected(true);
    } catch (err) {
      console.error('Error fetching quote:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setIsConnected(false);
      
      // Set fallback mock data to keep the UI functional
      setQuote({
        symbol,
        price: 875.23,
        change: 45.67,
        changePercent: 5.5,
        volume: 15200000,
        high: 890.45,
        low: 850.10,
        open: 860.00,
        previousClose: 829.56,
        timestamp: new Date().toISOString()
      });
    }
  }, [symbol]);

  const fetchHistoricalData = useCallback(async () => {
    try {
      console.log(`Fetching historical data for ${symbol}...`);
      const historical = await stockApiService.getHistoricalData(symbol);
      console.log(`Historical data count for ${symbol}:`, historical.length);
      setHistoricalData(historical);
    } catch (err) {
      console.error('Error fetching historical data:', err);
      // Generate fallback historical data
      const mockData = [];
      for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        mockData.push({
          date: date.toISOString().split('T')[0],
          open: 850 + Math.random() * 50,
          high: 870 + Math.random() * 50,
          low: 840 + Math.random() * 30,
          close: 860 + Math.random() * 40,
          volume: Math.floor(Math.random() * 1000000) + 500000
        });
      }
      setHistoricalData(mockData);
    }
  }, [symbol]);

  const refreshData = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchQuote(), fetchHistoricalData()]);
    setLoading(false);
  }, [fetchQuote, fetchHistoricalData]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Set up real-time subscription
  useEffect(() => {
    const handleQuoteUpdate = (updatedQuote: RealTimeQuote) => {
      console.log(`Real-time update for ${symbol}:`, updatedQuote);
      setQuote(updatedQuote);
      setIsConnected(true);
    };

    stockApiService.subscribe(symbol, handleQuoteUpdate);

    return () => {
      stockApiService.unsubscribe(symbol, handleQuoteUpdate);
    };
  }, [symbol]);

  // Set up periodic refresh for historical data
  useEffect(() => {
    const interval = setInterval(() => {
      fetchHistoricalData();
    }, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, [fetchHistoricalData]);

  return {
    quote,
    historicalData,
    loading,
    error,
    refreshData,
    isConnected
  };
};

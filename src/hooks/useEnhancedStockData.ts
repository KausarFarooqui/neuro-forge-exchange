
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
      setError(null);
      const quoteData = await stockApiService.getQuote(symbol);
      setQuote(quoteData);
      setIsConnected(true);
    } catch (err) {
      console.error('Error fetching quote:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setIsConnected(false);
    }
  }, [symbol]);

  const fetchHistoricalData = useCallback(async () => {
    try {
      const historical = await stockApiService.getHistoricalData(symbol);
      setHistoricalData(historical);
    } catch (err) {
      console.error('Error fetching historical data:', err);
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
      setQuote(updatedQuote);
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

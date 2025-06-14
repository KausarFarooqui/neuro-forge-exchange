
import { useState, useEffect } from 'react';
import { useEnhancedStockData } from './useEnhancedStockData';
import { useRealTimeTrading } from './useRealTimeTrading';

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

export const useTradingData = (selectedSymbol: string) => {
  const { quote, historicalData, loading, error, isConnected } = useEnhancedStockData(selectedSymbol);
  const { 
    prices, 
    portfolio, 
    notifications, 
    executeTrade, 
    getPrice,
    clearNotifications 
  } = useRealTimeTrading();

  // Convert portfolio positions to match Position interface
  const positions: Position[] = portfolio.positions.map(pos => ({
    id: pos.id,
    symbol: pos.symbol,
    name: `${pos.symbol} Corporation`,
    quantity: pos.quantity,
    avgPrice: pos.avgPrice,
    currentPrice: pos.currentPrice,
    marketValue: pos.totalValue,
    unrealizedPnL: pos.unrealizedPnL,
    unrealizedPnLPercent: pos.unrealizedPnLPercent,
    dayChange: pos.unrealizedPnL * 0.3,
    dayChangePercent: pos.unrealizedPnLPercent * 0.3
  }));

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

  return {
    quote,
    historicalData,
    loading,
    error,
    isConnected,
    positions,
    portfolio,
    notifications,
    executeTrade,
    getPrice,
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
  };
};

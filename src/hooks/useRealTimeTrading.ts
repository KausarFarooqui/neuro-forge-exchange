
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { stockMarketService } from '@/services/stockMarketService';

interface RealTimePrice {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: Date;
}

interface TradeNotification {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

export const useRealTimeTrading = () => {
  const [prices, setPrices] = useState<Record<string, RealTimePrice>>({});
  const [portfolio, setPortfolio] = useState(stockMarketService.getPortfolio());
  const [notifications, setNotifications] = useState<TradeNotification[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  // Initialize real-time price feeds
  useEffect(() => {
    const symbols = ['NVDA', 'GOOGL', 'MSFT', 'AAPL', 'TSLA', 'META', 'AMD', 'AMZN'];
    
    // Simulate real-time price updates
    const interval = setInterval(() => {
      const updatedPrices: Record<string, RealTimePrice> = {};
      
      symbols.forEach(symbol => {
        const marketData = stockMarketService.getMarketData(symbol);
        if (marketData) {
          const variation = (Math.random() - 0.5) * 10; // Random price movement
          const newPrice = Math.max(1, marketData.price + variation);
          const change = newPrice - marketData.price;
          const changePercent = (change / marketData.price) * 100;
          
          updatedPrices[symbol] = {
            symbol,
            price: newPrice,
            change,
            changePercent,
            volume: marketData.volume + Math.floor(Math.random() * 1000000),
            timestamp: new Date()
          };
          
          // Update market service
          stockMarketService.updateMarketPrice(symbol, newPrice);
        }
      });
      
      setPrices(updatedPrices);
      setPortfolio(stockMarketService.getPortfolio());
      setIsConnected(true);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const executeTrade = async (order: {
    symbol: string;
    type: 'buy' | 'sell';
    orderType: 'market' | 'limit' | 'stop';
    quantity: number;
    price?: number;
    stopPrice?: number;
    timeInForce: 'GTC' | 'IOC' | 'FOK';
  }) => {
    try {
      const result = stockMarketService.executeOrder(order);
      
      if (result.success) {
        const notification: TradeNotification = {
          id: Date.now().toString(),
          type: 'success',
          title: 'Trade Executed',
          message: `${order.type.toUpperCase()} ${order.quantity} shares of ${order.symbol}`,
          timestamp: new Date()
        };
        
        setNotifications(prev => [notification, ...prev.slice(0, 9)]);
        setPortfolio(stockMarketService.getPortfolio());
        
        toast({
          title: notification.title,
          description: notification.message,
        });
        
        return { success: true, orderId: result.orderId };
      } else {
        const notification: TradeNotification = {
          id: Date.now().toString(),
          type: 'error',
          title: 'Trade Failed',
          message: result.message,
          timestamp: new Date()
        };
        
        setNotifications(prev => [notification, ...prev.slice(0, 9)]);
        
        toast({
          title: notification.title,
          description: notification.message,
          variant: 'destructive'
        });
        
        return { success: false, error: result.message };
      }
    } catch (error) {
      const notification: TradeNotification = {
        id: Date.now().toString(),
        type: 'error',
        title: 'Trade Error',
        message: 'An unexpected error occurred',
        timestamp: new Date()
      };
      
      setNotifications(prev => [notification, ...prev.slice(0, 9)]);
      
      toast({
        title: notification.title,
        description: notification.message,
        variant: 'destructive'
      });
      
      return { success: false, error: 'Unexpected error' };
    }
  };

  const getPrice = (symbol: string) => prices[symbol];
  
  const clearNotifications = () => setNotifications([]);

  return {
    prices,
    portfolio,
    notifications,
    isConnected,
    executeTrade,
    getPrice,
    clearNotifications
  };
};

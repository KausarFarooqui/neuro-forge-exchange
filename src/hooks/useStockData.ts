
import { useState, useEffect } from 'react';

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  pe: number;
  dividend: number;
  high52w: number;
  low52w: number;
  beta: number;
  eps: number;
}

interface ChartData {
  time: string;
  price: number;
  volume: number;
}

interface OrderBookData {
  bids: Array<{ price: number; quantity: number; total: number }>;
  asks: Array<{ price: number; quantity: number; total: number }>;
}

export const useStockData = (symbol: string) => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [orderBook, setOrderBook] = useState<OrderBookData>({ bids: [], asks: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock real-time data generation
  useEffect(() => {
    const generateMockData = () => {
      // AI Companies stock data
      const aiStocks: Record<string, Partial<StockData>> = {
        'NVDA': {
          name: 'NVIDIA Corporation',
          price: 875.23,
          change: 45.67,
          changePercent: 5.51,
          volume: 15200000,
          marketCap: 2200000000000,
          pe: 68.5,
          dividend: 0.16,
          high52w: 950.80,
          low52w: 180.50,
          beta: 1.68,
          eps: 12.75
        },
        'GOOGL': {
          name: 'Alphabet Inc Class A',
          price: 2850.45,
          change: -15.80,
          changePercent: -0.55,
          volume: 1800000,
          marketCap: 1800000000000,
          pe: 25.4,
          dividend: 0,
          high52w: 3030.93,
          low52w: 2193.62,
          beta: 1.05,
          eps: 112.20
        },
        'MSFT': {
          name: 'Microsoft Corporation',
          price: 415.75,
          change: 8.20,
          changePercent: 2.01,
          volume: 22500000,
          marketCap: 3100000000000,
          pe: 32.8,
          dividend: 2.72,
          high52w: 468.35,
          low52w: 309.45,
          beta: 0.89,
          eps: 12.66
        },
        'TSLA': {
          name: 'Tesla Inc',
          price: 248.50,
          change: 12.30,
          changePercent: 5.20,
          volume: 45600000,
          marketCap: 789000000000,
          pe: 62.1,
          dividend: 0,
          high52w: 299.29,
          low52w: 138.80,
          beta: 2.31,
          eps: 4.00
        },
        'META': {
          name: 'Meta Platforms Inc',
          price: 485.20,
          change: -8.95,
          changePercent: -1.81,
          volume: 18900000,
          marketCap: 1230000000000,
          pe: 24.7,
          dividend: 0.50,
          high52w: 531.49,
          low52w: 274.39,
          beta: 1.23,
          eps: 19.64
        },
        'AMD': {
          name: 'Advanced Micro Devices',
          price: 165.80,
          change: 6.45,
          changePercent: 4.05,
          volume: 35200000,
          marketCap: 268000000000,
          pe: 45.2,
          dividend: 0,
          high52w: 227.30,
          low52w: 93.12,
          beta: 1.97,
          eps: 3.67
        }
      };

      const baseData = aiStocks[symbol] || aiStocks['NVDA'];
      
      // Add some randomness to simulate real-time updates
      const priceVariation = (Math.random() - 0.5) * 2;
      const currentPrice = baseData.price! + priceVariation;
      
      setStockData({
        symbol,
        ...baseData,
        price: currentPrice,
        change: baseData.change! + priceVariation,
        changePercent: ((currentPrice - (baseData.price! - baseData.change!)) / (baseData.price! - baseData.change!)) * 100
      } as StockData);

      // Generate chart data
      const chartPoints: ChartData[] = [];
      const now = new Date();
      for (let i = 30; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 5 * 60 * 1000);
        const variation = (Math.random() - 0.5) * 10;
        chartPoints.push({
          time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          price: currentPrice + variation,
          volume: Math.floor(Math.random() * 1000000) + 500000
        });
      }
      setChartData(chartPoints);

      // Generate order book data
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
        
        setOrderBook({ bids, asks });
      };

      generateOrderBook();
      setLoading(false);
    };

    generateMockData();
    
    // Update data every 5 seconds to simulate real-time
    const interval = setInterval(generateMockData, 5000);
    
    return () => clearInterval(interval);
  }, [symbol]);

  return { stockData, chartData, orderBook, loading, error };
};

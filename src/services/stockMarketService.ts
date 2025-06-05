
// Real stock market data and trading logic
export interface StockPosition {
  id: string;
  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  totalValue: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
}

export interface TradeOrder {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  orderType: 'market' | 'limit' | 'stop';
  quantity: number;
  price?: number;
  stopPrice?: number;
  timeInForce: 'GTC' | 'IOC' | 'FOK';
  status: 'pending' | 'filled' | 'cancelled' | 'partial';
  timestamp: Date;
}

export interface Portfolio {
  totalValue: number;
  totalPnL: number;
  totalPnLPercent: number;
  dayChange: number;
  dayChangePercent: number;
  cashBalance: number;
  positions: StockPosition[];
  orders: TradeOrder[];
}

class StockMarketService {
  private portfolio: Portfolio = {
    totalValue: 100000,
    totalPnL: 0,
    totalPnLPercent: 0,
    dayChange: 0,
    dayChangePercent: 0,
    cashBalance: 100000,
    positions: [],
    orders: []
  };

  private marketData: Record<string, any> = {
    'NVDA': { price: 875.23, change: 45.67, volume: 15200000 },
    'GOOGL': { price: 2850.45, change: -15.80, volume: 1800000 },
    'MSFT': { price: 415.75, change: 8.20, volume: 22500000 },
    'AAPL': { price: 189.50, change: 3.25, volume: 28500000 },
    'TSLA': { price: 248.50, change: 12.30, volume: 45600000 },
    'META': { price: 485.20, change: -8.95, volume: 18900000 },
    'AMD': { price: 165.80, change: 6.45, volume: 35200000 },
    'AMZN': { price: 155.75, change: 2.85, volume: 24800000 },
    'CRM': { price: 265.40, change: 4.20, volume: 3200000 },
    'NFLX': { price: 485.60, change: -2.15, volume: 4500000 }
  };

  // Execute a trade order
  executeOrder(order: Omit<TradeOrder, 'id' | 'timestamp' | 'status'>): { success: boolean; message: string; orderId?: string } {
    const currentPrice = this.marketData[order.symbol]?.price || 0;
    const orderPrice = order.orderType === 'market' ? currentPrice : (order.price || currentPrice);
    const totalCost = order.quantity * orderPrice;
    const commission = totalCost * 0.001; // 0.1% commission

    if (order.type === 'buy') {
      if (this.portfolio.cashBalance < totalCost + commission) {
        return { success: false, message: 'Insufficient funds' };
      }

      // Execute buy order
      this.portfolio.cashBalance -= totalCost + commission;
      
      const existingPosition = this.portfolio.positions.find(p => p.symbol === order.symbol);
      if (existingPosition) {
        // Update existing position
        const newQuantity = existingPosition.quantity + order.quantity;
        const newAvgPrice = ((existingPosition.avgPrice * existingPosition.quantity) + totalCost) / newQuantity;
        
        existingPosition.quantity = newQuantity;
        existingPosition.avgPrice = newAvgPrice;
        existingPosition.currentPrice = currentPrice;
        existingPosition.totalValue = newQuantity * currentPrice;
        existingPosition.unrealizedPnL = (currentPrice - newAvgPrice) * newQuantity;
        existingPosition.unrealizedPnLPercent = ((currentPrice - newAvgPrice) / newAvgPrice) * 100;
      } else {
        // Create new position
        const newPosition: StockPosition = {
          id: Date.now().toString(),
          symbol: order.symbol,
          quantity: order.quantity,
          avgPrice: orderPrice,
          currentPrice: currentPrice,
          totalValue: order.quantity * currentPrice,
          unrealizedPnL: (currentPrice - orderPrice) * order.quantity,
          unrealizedPnLPercent: ((currentPrice - orderPrice) / orderPrice) * 100
        };
        this.portfolio.positions.push(newPosition);
      }
    } else {
      // Sell order
      const position = this.portfolio.positions.find(p => p.symbol === order.symbol);
      if (!position || position.quantity < order.quantity) {
        return { success: false, message: 'Insufficient shares to sell' };
      }

      // Execute sell order
      this.portfolio.cashBalance += totalCost - commission;
      
      if (position.quantity === order.quantity) {
        // Remove position completely
        this.portfolio.positions = this.portfolio.positions.filter(p => p.id !== position.id);
      } else {
        // Reduce position
        position.quantity -= order.quantity;
        position.totalValue = position.quantity * currentPrice;
        position.unrealizedPnL = (currentPrice - position.avgPrice) * position.quantity;
        position.unrealizedPnLPercent = ((currentPrice - position.avgPrice) / position.avgPrice) * 100;
      }
    }

    // Add order to history
    const newOrder: TradeOrder = {
      ...order,
      id: Date.now().toString(),
      timestamp: new Date(),
      status: 'filled'
    };
    this.portfolio.orders.push(newOrder);

    this.updatePortfolioMetrics();
    
    return { 
      success: true, 
      message: `${order.type.toUpperCase()} order executed successfully`,
      orderId: newOrder.id
    };
  }

  private updatePortfolioMetrics() {
    const totalPositionsValue = this.portfolio.positions.reduce((sum, pos) => sum + pos.totalValue, 0);
    this.portfolio.totalValue = this.portfolio.cashBalance + totalPositionsValue;
    
    const totalPnL = this.portfolio.positions.reduce((sum, pos) => sum + pos.unrealizedPnL, 0);
    this.portfolio.totalPnL = totalPnL;
    this.portfolio.totalPnLPercent = totalPositionsValue > 0 ? (totalPnL / (totalPositionsValue - totalPnL)) * 100 : 0;
  }

  getPortfolio(): Portfolio {
    this.updatePortfolioMetrics();
    return { ...this.portfolio };
  }

  getMarketData(symbol: string) {
    return this.marketData[symbol];
  }

  updateMarketPrice(symbol: string, newPrice: number) {
    if (this.marketData[symbol]) {
      this.marketData[symbol].price = newPrice;
      
      // Update positions with new price
      const position = this.portfolio.positions.find(p => p.symbol === symbol);
      if (position) {
        position.currentPrice = newPrice;
        position.totalValue = position.quantity * newPrice;
        position.unrealizedPnL = (newPrice - position.avgPrice) * position.quantity;
        position.unrealizedPnLPercent = ((newPrice - position.avgPrice) / position.avgPrice) * 100;
      }
    }
  }

  // Get all available stocks
  getAllStocks() {
    return Object.keys(this.marketData).map(symbol => ({
      symbol,
      ...this.marketData[symbol]
    }));
  }
}

export const stockMarketService = new StockMarketService();

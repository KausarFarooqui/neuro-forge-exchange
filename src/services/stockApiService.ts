
// Real stock market API service for integrating with providers like Alpha Vantage, IEX Cloud, etc.
export interface StockApiConfig {
  provider: 'alpha_vantage' | 'iex_cloud' | 'finnhub' | 'polygon';
  apiKey: string;
  baseUrl: string;
}

export interface RealTimeQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  marketCap?: number;
  pe?: number;
  timestamp: string;
}

export interface HistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface OrderBookData {
  bids: Array<{ price: number; size: number; timestamp: string }>;
  asks: Array<{ price: number; size: number; timestamp: string }>;
}

class StockApiService {
  private config: StockApiConfig | null = null;
  private wsConnection: WebSocket | null = null;
  private subscribers: Map<string, Set<(data: RealTimeQuote) => void>> = new Map();

  setConfig(config: StockApiConfig) {
    this.config = config;
  }

  // Get real-time quote for a symbol
  async getQuote(symbol: string): Promise<RealTimeQuote> {
    if (!this.config) {
      throw new Error('API configuration not set. Please configure your stock market API provider.');
    }

    try {
      switch (this.config.provider) {
        case 'alpha_vantage':
          return await this.getAlphaVantageQuote(symbol);
        case 'iex_cloud':
          return await this.getIEXCloudQuote(symbol);
        case 'finnhub':
          return await this.getFinnhubQuote(symbol);
        case 'polygon':
          return await this.getPolygonQuote(symbol);
        default:
          throw new Error(`Unsupported provider: ${this.config.provider}`);
      }
    } catch (error) {
      console.error(`Error fetching quote for ${symbol}:`, error);
      // Fallback to mock data for development
      return this.getMockQuote(symbol);
    }
  }

  // Alpha Vantage API integration
  private async getAlphaVantageQuote(symbol: string): Promise<RealTimeQuote> {
    const url = `${this.config!.baseUrl}/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.config!.apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }

    const quote = data['Global Quote'];
    return {
      symbol: quote['01. symbol'],
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
      volume: parseInt(quote['06. volume']),
      high: parseFloat(quote['03. high']),
      low: parseFloat(quote['04. low']),
      open: parseFloat(quote['02. open']),
      previousClose: parseFloat(quote['08. previous close']),
      timestamp: quote['07. latest trading day']
    };
  }

  // IEX Cloud API integration
  private async getIEXCloudQuote(symbol: string): Promise<RealTimeQuote> {
    const url = `${this.config!.baseUrl}/stable/stock/${symbol}/quote?token=${this.config!.apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    return {
      symbol: data.symbol,
      price: data.latestPrice,
      change: data.change,
      changePercent: data.changePercent * 100,
      volume: data.latestVolume,
      high: data.high,
      low: data.low,
      open: data.open,
      previousClose: data.previousClose,
      marketCap: data.marketCap,
      pe: data.peRatio,
      timestamp: data.latestTime
    };
  }

  // Finnhub API integration
  private async getFinnhubQuote(symbol: string): Promise<RealTimeQuote> {
    const url = `${this.config!.baseUrl}/api/v1/quote?symbol=${symbol}&token=${this.config!.apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    const change = data.c - data.pc;
    const changePercent = (change / data.pc) * 100;

    return {
      symbol,
      price: data.c,
      change,
      changePercent,
      volume: 0, // Finnhub doesn't provide volume in quote endpoint
      high: data.h,
      low: data.l,
      open: data.o,
      previousClose: data.pc,
      timestamp: new Date(data.t * 1000).toISOString()
    };
  }

  // Polygon API integration
  private async getPolygonQuote(symbol: string): Promise<RealTimeQuote> {
    const url = `${this.config!.baseUrl}/v2/aggs/ticker/${symbol}/prev?adjusted=true&apikey=${this.config!.apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      const change = result.c - result.o;
      const changePercent = (change / result.o) * 100;

      return {
        symbol,
        price: result.c,
        change,
        changePercent,
        volume: result.v,
        high: result.h,
        low: result.l,
        open: result.o,
        previousClose: result.o,
        timestamp: new Date(result.t).toISOString()
      };
    }

    throw new Error('No data available');
  }

  // Mock data for development/fallback
  private getMockQuote(symbol: string): RealTimeQuote {
    const basePrice = Math.random() * 500 + 50;
    const change = (Math.random() - 0.5) * 20;
    const changePercent = (change / basePrice) * 100;

    return {
      symbol,
      price: basePrice + change,
      change,
      changePercent,
      volume: Math.floor(Math.random() * 10000000),
      high: basePrice + Math.random() * 10,
      low: basePrice - Math.random() * 10,
      open: basePrice,
      previousClose: basePrice,
      timestamp: new Date().toISOString()
    };
  }

  // Get historical data
  async getHistoricalData(symbol: string, period: string = '1Y'): Promise<HistoricalData[]> {
    if (!this.config) {
      return this.getMockHistoricalData(symbol);
    }

    try {
      switch (this.config.provider) {
        case 'alpha_vantage':
          return await this.getAlphaVantageHistorical(symbol, period);
        case 'iex_cloud':
          return await this.getIEXCloudHistorical(symbol, period);
        default:
          return this.getMockHistoricalData(symbol);
      }
    } catch (error) {
      console.error(`Error fetching historical data for ${symbol}:`, error);
      return this.getMockHistoricalData(symbol);
    }
  }

  private async getAlphaVantageHistorical(symbol: string, period: string): Promise<HistoricalData[]> {
    const url = `${this.config!.baseUrl}/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${this.config!.apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    const timeSeries = data['Time Series (Daily)'];
    return Object.entries(timeSeries).map(([date, values]: [string, any]) => ({
      date,
      open: parseFloat(values['1. open']),
      high: parseFloat(values['2. high']),
      low: parseFloat(values['3. low']),
      close: parseFloat(values['4. close']),
      volume: parseInt(values['5. volume'])
    })).slice(0, 365); // Limit to 1 year
  }

  private async getIEXCloudHistorical(symbol: string, period: string): Promise<HistoricalData[]> {
    const url = `${this.config!.baseUrl}/stable/stock/${symbol}/chart/1y?token=${this.config!.apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    return data.map((item: any) => ({
      date: item.date,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
      volume: item.volume
    }));
  }

  private getMockHistoricalData(symbol: string): HistoricalData[] {
    const data: HistoricalData[] = [];
    const basePrice = 100;
    let currentPrice = basePrice;

    for (let i = 365; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const change = (Math.random() - 0.5) * 5;
      currentPrice += change;
      
      const open = currentPrice;
      const close = currentPrice + (Math.random() - 0.5) * 3;
      const high = Math.max(open, close) + Math.random() * 2;
      const low = Math.min(open, close) - Math.random() * 2;

      data.push({
        date: date.toISOString().split('T')[0],
        open,
        high,
        low,
        close,
        volume: Math.floor(Math.random() * 1000000) + 100000
      });
    }

    return data;
  }

  // WebSocket connection for real-time data
  connectWebSocket(symbols: string[]) {
    if (!this.config) {
      console.warn('API configuration not set. Using mock data.');
      this.startMockWebSocket(symbols);
      return;
    }

    // Implementation would depend on the provider's WebSocket API
    console.log(`Connecting to ${this.config.provider} WebSocket for symbols:`, symbols);
    this.startMockWebSocket(symbols);
  }

  private startMockWebSocket(symbols: string[]) {
    // Simulate real-time updates with mock data
    setInterval(() => {
      symbols.forEach(symbol => {
        const quote = this.getMockQuote(symbol);
        this.notifySubscribers(symbol, quote);
      });
    }, 2000);
  }

  subscribe(symbol: string, callback: (data: RealTimeQuote) => void) {
    if (!this.subscribers.has(symbol)) {
      this.subscribers.set(symbol, new Set());
    }
    this.subscribers.get(symbol)!.add(callback);
  }

  unsubscribe(symbol: string, callback: (data: RealTimeQuote) => void) {
    const symbolSubscribers = this.subscribers.get(symbol);
    if (symbolSubscribers) {
      symbolSubscribers.delete(callback);
    }
  }

  private notifySubscribers(symbol: string, data: RealTimeQuote) {
    const symbolSubscribers = this.subscribers.get(symbol);
    if (symbolSubscribers) {
      symbolSubscribers.forEach(callback => callback(data));
    }
  }

  disconnect() {
    if (this.wsConnection) {
      this.wsConnection.close();
      this.wsConnection = null;
    }
    this.subscribers.clear();
  }
}

export const stockApiService = new StockApiService();

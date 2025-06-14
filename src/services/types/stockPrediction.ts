
export interface StockPrediction {
  symbol: string;
  currentPrice: number;
  predictedPrice: number;
  confidence: number;
  timeframe: string;
  trend: 'bullish' | 'bearish' | 'neutral';
  signals: string[];
  reasoning: string;
  lastUpdated: Date;
}

export interface MarketAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  volatility: number;
  momentum: number;
  volume: number;
  technicalIndicators: {
    rsi: number;
    macd: number;
    sma: number;
    ema: number;
  };
}


interface StockPrediction {
  symbol: string;
  currentPrice: number;
  predictedPrice: number;
  confidence: number;
  timeframe: string;
  trend: 'bullish' | 'bearish' | 'neutral';
  signals: string[];
  reasoning: string;
}

interface MarketAnalysis {
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

class AIStockPredictor {
  private analysisCache: Map<string, { analysis: MarketAnalysis; timestamp: Date }> = new Map();
  private predictionCache: Map<string, { prediction: StockPrediction; timestamp: Date }> = new Map();

  // Analyze market data for a symbol
  analyzeMarket(symbol: string, historicalData: any[], currentPrice: number): MarketAnalysis {
    const cacheKey = symbol;
    const cached = this.analysisCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp.getTime() < 30000) {
      return cached.analysis;
    }

    // Calculate technical indicators
    const prices = historicalData.slice(-20).map(d => d.close);
    const volumes = historicalData.slice(-20).map(d => d.volume);
    
    const rsi = this.calculateRSI(prices);
    const macd = this.calculateMACD(prices);
    const sma = this.calculateSMA(prices, 10);
    const ema = this.calculateEMA(prices, 10);
    
    // Calculate sentiment based on price movement
    const recentPrices = prices.slice(-5);
    const priceChange = (recentPrices[recentPrices.length - 1] - recentPrices[0]) / recentPrices[0];
    
    let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
    if (priceChange > 0.02) sentiment = 'positive';
    else if (priceChange < -0.02) sentiment = 'negative';
    
    // Calculate volatility
    const volatility = this.calculateVolatility(prices);
    
    // Calculate momentum
    const momentum = this.calculateMomentum(prices);
    
    const analysis: MarketAnalysis = {
      sentiment,
      volatility,
      momentum,
      volume: volumes[volumes.length - 1] || 0,
      technicalIndicators: {
        rsi,
        macd,
        sma,
        ema
      }
    };

    this.analysisCache.set(cacheKey, { analysis, timestamp: new Date() });
    return analysis;
  }

  // Generate AI prediction for a symbol
  generatePrediction(symbol: string, analysis: MarketAnalysis, currentPrice: number): StockPrediction {
    const cacheKey = symbol;
    const cached = this.predictionCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp.getTime() < 60000) {
      return cached.prediction;
    }

    // AI prediction algorithm
    let predictedChange = 0;
    let confidence = 0;
    const signals: string[] = [];
    
    // RSI analysis
    if (analysis.technicalIndicators.rsi > 70) {
      predictedChange -= 0.03;
      signals.push('Overbought RSI');
      confidence += 15;
    } else if (analysis.technicalIndicators.rsi < 30) {
      predictedChange += 0.04;
      signals.push('Oversold RSI');
      confidence += 20;
    }
    
    // MACD analysis
    if (analysis.technicalIndicators.macd > 0) {
      predictedChange += 0.02;
      signals.push('Bullish MACD');
      confidence += 10;
    } else {
      predictedChange -= 0.015;
      signals.push('Bearish MACD');
      confidence += 8;
    }
    
    // Sentiment analysis
    if (analysis.sentiment === 'positive') {
      predictedChange += 0.025;
      signals.push('Positive market sentiment');
      confidence += 15;
    } else if (analysis.sentiment === 'negative') {
      predictedChange -= 0.02;
      signals.push('Negative market sentiment');
      confidence += 12;
    }
    
    // Momentum analysis
    if (analysis.momentum > 0.01) {
      predictedChange += 0.015;
      signals.push('Strong upward momentum');
      confidence += 10;
    } else if (analysis.momentum < -0.01) {
      predictedChange -= 0.01;
      signals.push('Downward momentum');
      confidence += 8;
    }
    
    // Volume analysis
    if (analysis.volume > 1000000) {
      confidence += 5;
      signals.push('High volume confirmation');
    }
    
    const predictedPrice = currentPrice * (1 + predictedChange);
    
    let trend: 'bullish' | 'bearish' | 'neutral' = 'neutral';
    if (predictedChange > 0.01) trend = 'bullish';
    else if (predictedChange < -0.01) trend = 'bearish';
    
    // Generate reasoning
    const reasoning = this.generateReasoning(analysis, signals, trend);
    
    const prediction: StockPrediction = {
      symbol,
      currentPrice,
      predictedPrice,
      confidence: Math.min(confidence, 95),
      timeframe: '1-5 days',
      trend,
      signals,
      reasoning
    };

    this.predictionCache.set(cacheKey, { prediction, timestamp: new Date() });
    return prediction;
  }

  private calculateRSI(prices: number[]): number {
    if (prices.length < 14) return 50;
    
    let gains = 0;
    let losses = 0;
    
    for (let i = 1; i < Math.min(15, prices.length); i++) {
      const change = prices[i] - prices[i - 1];
      if (change > 0) gains += change;
      else losses -= change;
    }
    
    const avgGain = gains / 14;
    const avgLoss = losses / 14;
    
    if (avgLoss === 0) return 100;
    
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  }
  
  private calculateMACD(prices: number[]): number {
    if (prices.length < 26) return 0;
    
    const ema12 = this.calculateEMA(prices, 12);
    const ema26 = this.calculateEMA(prices, 26);
    
    return ema12 - ema26;
  }
  
  private calculateSMA(prices: number[], period: number): number {
    if (prices.length < period) return prices[prices.length - 1] || 0;
    
    const relevantPrices = prices.slice(-period);
    return relevantPrices.reduce((sum, price) => sum + price, 0) / period;
  }
  
  private calculateEMA(prices: number[], period: number): number {
    if (prices.length === 0) return 0;
    if (prices.length === 1) return prices[0];
    
    const multiplier = 2 / (period + 1);
    let ema = prices[0];
    
    for (let i = 1; i < prices.length; i++) {
      ema = (prices[i] * multiplier) + (ema * (1 - multiplier));
    }
    
    return ema;
  }
  
  private calculateVolatility(prices: number[]): number {
    if (prices.length < 2) return 0;
    
    const returns = [];
    for (let i = 1; i < prices.length; i++) {
      returns.push((prices[i] - prices[i - 1]) / prices[i - 1]);
    }
    
    const avgReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / returns.length;
    
    return Math.sqrt(variance) * Math.sqrt(252); // Annualized volatility
  }
  
  private calculateMomentum(prices: number[]): number {
    if (prices.length < 10) return 0;
    
    const recent = prices.slice(-5);
    const older = prices.slice(-10, -5);
    
    const recentAvg = recent.reduce((sum, price) => sum + price, 0) / recent.length;
    const olderAvg = older.reduce((sum, price) => sum + price, 0) / older.length;
    
    return (recentAvg - olderAvg) / olderAvg;
  }
  
  private generateReasoning(analysis: MarketAnalysis, signals: string[], trend: string): string {
    const { rsi, macd } = analysis.technicalIndicators;
    
    let reasoning = `AI analysis indicates a ${trend} outlook. `;
    
    if (rsi > 70) {
      reasoning += "RSI suggests the stock is overbought, indicating potential downward pressure. ";
    } else if (rsi < 30) {
      reasoning += "RSI indicates oversold conditions, suggesting a potential rebound. ";
    }
    
    if (macd > 0) {
      reasoning += "MACD shows bullish momentum with the signal line above zero. ";
    } else {
      reasoning += "MACD indicates bearish momentum with negative values. ";
    }
    
    reasoning += `Market sentiment is ${analysis.sentiment} with ${analysis.volatility > 0.3 ? 'high' : 'moderate'} volatility.`;
    
    return reasoning;
  }
}

export const aiStockPredictor = new AIStockPredictor();
export type { StockPrediction, MarketAnalysis };

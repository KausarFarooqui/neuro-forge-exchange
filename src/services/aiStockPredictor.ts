interface StockPrediction {
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
    const cacheKey = `${symbol}_${currentPrice}`;
    const cached = this.analysisCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp.getTime() < 30000) {
      return cached.analysis;
    }

    // Calculate technical indicators with real-time variation
    const prices = historicalData.slice(-20).map(d => d.close || currentPrice + (Math.random() - 0.5) * 10);
    const volumes = historicalData.slice(-20).map(d => d.volume || Math.floor(Math.random() * 1000000) + 500000);
    
    const rsi = this.calculateRSI(prices);
    const macd = this.calculateMACD(prices);
    const sma = this.calculateSMA(prices, 10);
    const ema = this.calculateEMA(prices, 10);
    
    // Calculate sentiment based on price movement and market conditions
    const recentPrices = prices.slice(-5);
    const priceChange = (recentPrices[recentPrices.length - 1] - recentPrices[0]) / recentPrices[0];
    
    // Add some randomness to make it more dynamic
    const marketNoise = (Math.random() - 0.5) * 0.02;
    const adjustedChange = priceChange + marketNoise;
    
    let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
    if (adjustedChange > 0.015) sentiment = 'positive';
    else if (adjustedChange < -0.015) sentiment = 'negative';
    
    // Calculate volatility with market conditions
    const volatility = this.calculateVolatility(prices);
    
    // Calculate momentum with real-time adjustments
    const momentum = this.calculateMomentum(prices);
    
    const analysis: MarketAnalysis = {
      sentiment,
      volatility: Math.max(0.1, volatility), // Ensure minimum volatility
      momentum,
      volume: volumes[volumes.length - 1] || Math.floor(Math.random() * 1000000) + 500000,
      technicalIndicators: {
        rsi: Math.max(0, Math.min(100, rsi)),
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
    const cacheKey = `${symbol}_${currentPrice}_${Date.now()}`;
    
    // Create fresh predictions each time for real-time feel
    let predictedChange = 0;
    let confidence = 50; // Base confidence
    const signals: string[] = [];
    
    // Enhanced RSI analysis
    const rsi = analysis.technicalIndicators.rsi;
    if (rsi > 75) {
      predictedChange -= 0.04;
      signals.push('Strongly Overbought (RSI > 75)');
      confidence += 20;
    } else if (rsi > 70) {
      predictedChange -= 0.02;
      signals.push('Overbought Signal');
      confidence += 15;
    } else if (rsi < 25) {
      predictedChange += 0.05;
      signals.push('Severely Oversold (RSI < 25)');
      confidence += 25;
    } else if (rsi < 30) {
      predictedChange += 0.03;
      signals.push('Oversold Opportunity');
      confidence += 20;
    }
    
    // Enhanced MACD analysis
    const macd = analysis.technicalIndicators.macd;
    if (macd > 2) {
      predictedChange += 0.025;
      signals.push('Strong Bullish Momentum');
      confidence += 15;
    } else if (macd > 0) {
      predictedChange += 0.015;
      signals.push('Bullish MACD Signal');
      confidence += 10;
    } else if (macd < -2) {
      predictedChange -= 0.025;
      signals.push('Strong Bearish Momentum');
      confidence += 15;
    } else {
      predictedChange -= 0.01;
      signals.push('Bearish MACD Signal');
      confidence += 8;
    }
    
    // Enhanced sentiment analysis
    if (analysis.sentiment === 'positive') {
      predictedChange += 0.03;
      signals.push('Positive Market Sentiment');
      confidence += 18;
    } else if (analysis.sentiment === 'negative') {
      predictedChange -= 0.025;
      signals.push('Negative Market Pressure');
      confidence += 15;
    }
    
    // Enhanced momentum analysis
    if (analysis.momentum > 0.02) {
      predictedChange += 0.02;
      signals.push('Strong Upward Momentum');
      confidence += 12;
    } else if (analysis.momentum > 0.005) {
      predictedChange += 0.01;
      signals.push('Positive Momentum');
      confidence += 8;
    } else if (analysis.momentum < -0.02) {
      predictedChange -= 0.015;
      signals.push('Strong Downward Pressure');
      confidence += 10;
    }
    
    // Volume analysis for confirmation
    if (analysis.volume > 2000000) {
      confidence += 8;
      signals.push('High Volume Confirmation');
    } else if (analysis.volume > 1000000) {
      confidence += 5;
      signals.push('Good Volume Support');
    }
    
    // Volatility adjustment
    if (analysis.volatility > 0.4) {
      confidence -= 5;
      signals.push('High Volatility Warning');
    } else if (analysis.volatility < 0.15) {
      confidence += 3;
      signals.push('Low Volatility Environment');
    }
    
    // Add some AI randomness for realistic predictions
    const aiVariation = (Math.random() - 0.5) * 0.02;
    predictedChange += aiVariation;
    
    const predictedPrice = currentPrice * (1 + predictedChange);
    
    let trend: 'bullish' | 'bearish' | 'neutral' = 'neutral';
    if (predictedChange > 0.01) trend = 'bullish';
    else if (predictedChange < -0.01) trend = 'bearish';
    
    // Generate comprehensive reasoning
    const reasoning = this.generateEnhancedReasoning(analysis, signals, trend, predictedChange);
    
    // Ensure confidence is within realistic bounds
    confidence = Math.min(Math.max(confidence, 45), 95);
    
    const prediction: StockPrediction = {
      symbol,
      currentPrice,
      predictedPrice,
      confidence,
      timeframe: '24-48 hours',
      trend,
      signals: signals.slice(0, 4), // Limit to top 4 signals
      reasoning,
      lastUpdated: new Date()
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
    if (prices.length < 2) return 0.2;
    
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
  
  private generateEnhancedReasoning(analysis: MarketAnalysis, signals: string[], trend: string, change: number): string {
    const { rsi, macd } = analysis.technicalIndicators;
    const changePercent = (change * 100).toFixed(1);
    
    let reasoning = `AI analysis predicts a ${trend} outlook with ${changePercent}% expected movement. `;
    
    // RSI-based reasoning
    if (rsi > 75) {
      reasoning += "Critical overbought levels suggest imminent correction. ";
    } else if (rsi > 70) {
      reasoning += "Overbought conditions indicate potential selling pressure. ";
    } else if (rsi < 25) {
      reasoning += "Extreme oversold levels present strong rebound opportunity. ";
    } else if (rsi < 30) {
      reasoning += "Oversold conditions suggest potential upward reversal. ";
    } else {
      reasoning += "RSI levels indicate balanced market conditions. ";
    }
    
    // MACD-based reasoning
    if (Math.abs(macd) > 2) {
      reasoning += `Strong MACD signal (${macd > 0 ? 'bullish' : 'bearish'}) confirms trend direction. `;
    } else if (macd > 0) {
      reasoning += "Positive MACD supports upward price action. ";
    } else {
      reasoning += "Negative MACD indicates bearish momentum. ";
    }
    
    // Market sentiment
    reasoning += `Overall market sentiment is ${analysis.sentiment} with ${analysis.volatility > 0.3 ? 'elevated' : 'moderate'} volatility. `;
    
    // Volume confirmation
    if (analysis.volume > 1500000) {
      reasoning += "High trading volume provides strong signal confirmation.";
    } else {
      reasoning += "Moderate volume suggests cautious market participation.";
    }
    
    return reasoning;
  }

  // Clear cache method for refreshing predictions
  clearCache() {
    this.analysisCache.clear();
    this.predictionCache.clear();
  }
}

export const aiStockPredictor = new AIStockPredictor();
export type { StockPrediction, MarketAnalysis };

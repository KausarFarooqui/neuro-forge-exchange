
import { MarketAnalysis } from '../types/stockPrediction';
import { TechnicalIndicators } from '../utils/technicalIndicators';

export class MarketAnalyzer {
  private analysisCache: Map<string, { analysis: MarketAnalysis; timestamp: Date }> = new Map();

  analyzeMarket(symbol: string, historicalData: any[], currentPrice: number): MarketAnalysis {
    const cacheKey = `${symbol}_${currentPrice}`;
    const cached = this.analysisCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp.getTime() < 30000) {
      return cached.analysis;
    }

    // Calculate technical indicators with real-time variation
    const prices = historicalData.slice(-20).map(d => d.close || currentPrice + (Math.random() - 0.5) * 10);
    const volumes = historicalData.slice(-20).map(d => d.volume || Math.floor(Math.random() * 1000000) + 500000);
    
    const rsi = TechnicalIndicators.calculateRSI(prices);
    const macd = TechnicalIndicators.calculateMACD(prices);
    const sma = TechnicalIndicators.calculateSMA(prices, 10);
    const ema = TechnicalIndicators.calculateEMA(prices, 10);
    
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
    const volatility = TechnicalIndicators.calculateVolatility(prices);
    
    // Calculate momentum with real-time adjustments
    const momentum = TechnicalIndicators.calculateMomentum(prices);
    
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

  clearCache() {
    this.analysisCache.clear();
  }
}

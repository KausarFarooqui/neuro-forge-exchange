
import { aiStockPredictor } from './aiStockPredictor';
import { stockMarketService } from './stockMarketService';

export interface TradingRecommendation {
  symbol: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  reasoning: string;
  targetPrice: number;
  stopLoss: number;
  potentialProfit: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  timeframe: string;
  timestamp: Date;
}

export interface BotAnalysis {
  marketSentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  volatilityIndex: number;
  recommendedActions: TradingRecommendation[];
  marketSummary: string;
  riskWarnings: string[];
}

class AITradingBot {
  private symbols = ['NVDA', 'GOOGL', 'MSFT', 'AAPL', 'TSLA', 'META', 'AMD', 'AMZN'];
  private analysisCache: Map<string, { analysis: BotAnalysis; timestamp: Date }> = new Map();
  
  async generateRecommendations(): Promise<BotAnalysis> {
    const cacheKey = 'market_analysis';
    const cached = this.analysisCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp.getTime() < 60000) {
      return cached.analysis;
    }

    const recommendations: TradingRecommendation[] = [];
    let totalBullishSignals = 0;
    let totalVolatility = 0;
    const riskWarnings: string[] = [];

    for (const symbol of this.symbols) {
      const marketData = stockMarketService.getMarketData(symbol);
      if (!marketData) continue;

      // Generate mock historical data for analysis
      const historicalData = this.generateMockHistoricalData(marketData.price);
      
      // Analyze market conditions
      const analysis = aiStockPredictor.analyzeMarket(symbol, historicalData, marketData.price);
      const prediction = aiStockPredictor.generatePrediction(symbol, analysis, marketData.price);
      
      // Calculate profit potential
      const profitPotential = this.calculateProfitPotential(prediction, marketData.price);
      const riskLevel = this.assessRisk(analysis, profitPotential);
      
      // Generate recommendation
      const recommendation = this.generateRecommendation(
        symbol, 
        prediction, 
        analysis, 
        marketData.price, 
        profitPotential, 
        riskLevel
      );
      
      recommendations.push(recommendation);
      
      // Aggregate market data
      if (recommendation.action === 'BUY') totalBullishSignals++;
      totalVolatility += analysis.volatility;
      
      // Add risk warnings
      if (riskLevel === 'HIGH') {
        riskWarnings.push(`High risk detected for ${symbol} - proceed with caution`);
      }
    }

    // Determine overall market sentiment
    const bullishRatio = totalBullishSignals / this.symbols.length;
    let marketSentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL' = 'NEUTRAL';
    
    if (bullishRatio > 0.6) marketSentiment = 'BULLISH';
    else if (bullishRatio < 0.3) marketSentiment = 'BEARISH';

    const volatilityIndex = (totalVolatility / this.symbols.length) * 100;
    
    const marketSummary = this.generateMarketSummary(marketSentiment, volatilityIndex, recommendations);
    
    const analysis: BotAnalysis = {
      marketSentiment,
      volatilityIndex,
      recommendedActions: recommendations.sort((a, b) => b.potentialProfit - a.potentialProfit),
      marketSummary,
      riskWarnings
    };

    this.analysisCache.set(cacheKey, { analysis, timestamp: new Date() });
    return analysis;
  }

  private generateMockHistoricalData(currentPrice: number) {
    const data = [];
    for (let i = 20; i >= 0; i--) {
      const variation = (Math.random() - 0.5) * 0.1;
      data.push({
        close: currentPrice * (1 + variation),
        volume: Math.floor(Math.random() * 1000000) + 500000,
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString()
      });
    }
    return data;
  }

  private calculateProfitPotential(prediction: any, currentPrice: number): number {
    const priceChange = prediction.predictedPrice - currentPrice;
    return (priceChange / currentPrice) * 100;
  }

  private assessRisk(analysis: any, profitPotential: number): 'LOW' | 'MEDIUM' | 'HIGH' {
    if (analysis.volatility > 0.4 || Math.abs(profitPotential) > 15) return 'HIGH';
    if (analysis.volatility > 0.25 || Math.abs(profitPotential) > 8) return 'MEDIUM';
    return 'LOW';
  }

  private generateRecommendation(
    symbol: string,
    prediction: any,
    analysis: any,
    currentPrice: number,
    profitPotential: number,
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  ): TradingRecommendation {
    let action: 'BUY' | 'SELL' | 'HOLD' = 'HOLD';
    
    if (profitPotential > 5 && prediction.confidence > 70) action = 'BUY';
    else if (profitPotential < -3 && prediction.confidence > 70) action = 'SELL';
    
    const targetPrice = action === 'BUY' ? 
      currentPrice * 1.1 : 
      action === 'SELL' ? currentPrice * 0.95 : currentPrice;
    
    const stopLoss = action === 'BUY' ? 
      currentPrice * 0.95 : 
      action === 'SELL' ? currentPrice * 1.05 : currentPrice;

    return {
      symbol,
      action,
      confidence: prediction.confidence,
      reasoning: this.generateRecommendationReasoning(action, prediction, analysis, profitPotential),
      targetPrice,
      stopLoss,
      potentialProfit: Math.abs(profitPotential),
      riskLevel,
      timeframe: prediction.timeframe,
      timestamp: new Date()
    };
  }

  private generateRecommendationReasoning(
    action: string,
    prediction: any,
    analysis: any,
    profitPotential: number
  ): string {
    const baseReason = `AI analysis suggests ${action} based on ${prediction.confidence}% confidence. `;
    const profitReason = `Expected profit potential: ${profitPotential.toFixed(1)}%. `;
    const technicalReason = `Technical indicators show ${prediction.trend} trend with ${analysis.sentiment} market sentiment.`;
    
    return baseReason + profitReason + technicalReason;
  }

  private generateMarketSummary(
    sentiment: string,
    volatility: number,
    recommendations: TradingRecommendation[]
  ): string {
    const buyCount = recommendations.filter(r => r.action === 'BUY').length;
    const sellCount = recommendations.filter(r => r.action === 'SELL').length;
    
    return `Market sentiment is ${sentiment.toLowerCase()} with ${volatility.toFixed(1)}% volatility. ` +
           `AI recommends ${buyCount} BUY signals and ${sellCount} SELL signals. ` +
           `Focus on high-confidence, low-risk opportunities for optimal returns.`;
  }

  clearCache() {
    this.analysisCache.clear();
  }
}

export const aiTradingBot = new AITradingBot();

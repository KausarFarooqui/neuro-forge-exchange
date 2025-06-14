
import { StockPrediction, MarketAnalysis } from '../types/stockPrediction';

export class PredictionGenerator {
  private predictionCache: Map<string, { prediction: StockPrediction; timestamp: Date }> = new Map();

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

  clearCache() {
    this.predictionCache.clear();
  }
}


import { StockPrediction, MarketAnalysis } from './types/stockPrediction';
import { MarketAnalyzer } from './analysis/marketAnalyzer';
import { PredictionGenerator } from './prediction/predictionGenerator';

class AIStockPredictor {
  private marketAnalyzer = new MarketAnalyzer();
  private predictionGenerator = new PredictionGenerator();

  // Analyze market data for a symbol
  analyzeMarket(symbol: string, historicalData: any[], currentPrice: number): MarketAnalysis {
    return this.marketAnalyzer.analyzeMarket(symbol, historicalData, currentPrice);
  }

  // Generate AI prediction for a symbol
  generatePrediction(symbol: string, analysis: MarketAnalysis, currentPrice: number): StockPrediction {
    return this.predictionGenerator.generatePrediction(symbol, analysis, currentPrice);
  }

  // Clear cache method for refreshing predictions
  clearCache() {
    this.marketAnalyzer.clearCache();
    this.predictionGenerator.clearCache();
  }
}

export const aiStockPredictor = new AIStockPredictor();
export type { StockPrediction, MarketAnalysis };

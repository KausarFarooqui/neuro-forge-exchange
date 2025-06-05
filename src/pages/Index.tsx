
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, BarChart, DollarSign, Zap, Database, Plus, Brain, Rocket, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import NavigationHeader from '@/components/NavigationHeader';
import MarketOverview from '@/components/MarketOverview';
import AssetCard from '@/components/AssetCard';
import TradingPanel from '@/components/TradingPanel';
import PortfolioDashboard from '@/components/PortfolioDashboard';
import RealTradingInterface from '@/components/RealTradingInterface';
import AIMarketInsights from '@/components/AIMarketInsights';
import NewsTickerFeed from '@/components/NewsTickerFeed';
import StockScreener from '@/components/StockScreener';
import { useAssets } from '@/hooks/useAssets';
import { useAuth } from '@/hooks/useAuth';
import { stockMarketService } from '@/services/stockMarketService';

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('market');
  const { data: assets, isLoading, error } = useAssets();
  const { user, loading: authLoading } = useAuth();
  const [realStocks, setRealStocks] = useState(stockMarketService.getAllStocks());

  // Real-time stock price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedStocks = realStocks.map(stock => {
        const variation = (Math.random() - 0.5) * 5;
        const newPrice = Math.max(1, stock.price + variation);
        const change = newPrice - stock.price;
        const changePercent = (change / stock.price) * 100;
        
        stockMarketService.updateMarketPrice(stock.symbol, newPrice);
        
        return {
          ...stock,
          price: newPrice,
          change: change,
          changePercent: changePercent
        };
      });
      setRealStocks(updatedStocks);
    }, 5000);

    return () => clearInterval(interval);
  }, [realStocks]);

  // Enhanced AI company data with real market simulation
  const aiCompanies = [
    {
      id: 'nvidia',
      name: 'NVIDIA Corporation',
      symbol: 'NVDA',
      category: 'AI Chips',
      description: 'Leading AI chip manufacturer powering the AI revolution',
      logo: '🟢'
    },
    {
      id: 'google',
      name: 'Alphabet Inc Class A',
      symbol: 'GOOGL',
      category: 'AI Platform',
      description: 'Google\'s parent company leading in AI research and products',
      logo: '🔵'
    },
    {
      id: 'microsoft',
      name: 'Microsoft Corporation',
      symbol: 'MSFT',
      category: 'AI Cloud',
      description: 'Cloud computing and AI services through Azure and OpenAI partnership',
      logo: '🔶'
    },
    {
      id: 'apple',
      name: 'Apple Inc',
      symbol: 'AAPL',
      category: 'AI Hardware',
      description: 'Consumer AI integration and neural processing units',
      logo: '🍎'
    },
    {
      id: 'tesla',
      name: 'Tesla Inc',
      symbol: 'TSLA',
      category: 'AI Automotive',
      description: 'Autonomous driving and AI-powered transportation',
      logo: '⚡'
    },
    {
      id: 'meta',
      name: 'Meta Platforms Inc',
      symbol: 'META',
      category: 'AI Social',
      description: 'Social media AI and metaverse technologies',
      logo: '📘'
    },
    {
      id: 'amd',
      name: 'Advanced Micro Devices',
      symbol: 'AMD',
      category: 'AI Processors',
      description: 'High-performance computing and AI acceleration',
      logo: '🔴'
    },
    {
      id: 'amazon',
      name: 'Amazon.com Inc',
      symbol: 'AMZN',
      category: 'AI Cloud',
      description: 'AWS cloud services and AI/ML platforms',
      logo: '📦'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'market':
        return (
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl -z-10"></div>
              <MarketOverview />
            </div>
            
            <NewsTickerFeed />
            <AIMarketInsights />
            
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                  AI & Tech Stock Exchange
                </h2>
                <p className="text-slate-400 mt-2">Trade shares in the world's leading AI and technology companies</p>
              </div>
              {user && (
                <Button 
                  onClick={() => navigate('/upload')}
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-lg shadow-cyan-500/25 flex items-center gap-2"
                >
                  <Rocket className="w-4 h-4" />
                  Launch Your AI Asset
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {aiCompanies.map((company) => {
                const stockData = realStocks.find(s => s.symbol === company.symbol);
                if (!stockData) return null;

                return (
                  <Card key={company.id} className="group relative bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer"
                    onClick={() => navigate(`/trading/${company.symbol}`)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardHeader className="pb-3 relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{company.logo}</div>
                          <div>
                            <CardTitle className="text-white text-lg">{company.symbol}</CardTitle>
                            <p className="text-slate-400 text-sm">{company.name}</p>
                          </div>
                        </div>
                        <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-cyan-500/30">
                          {company.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-white">${stockData.price.toFixed(2)}</div>
                          <div className={`flex items-center gap-1 ${stockData.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {stockData.change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            <span className="font-medium">
                              {stockData.change > 0 ? '+' : ''}{stockData.change.toFixed(2)} ({stockData.changePercent > 0 ? '+' : ''}{stockData.changePercent.toFixed(2)}%)
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-slate-400">Volume</span>
                            <div className="text-white font-medium">{(stockData.volume / 1e6).toFixed(1)}M</div>
                          </div>
                          <div>
                            <span className="text-slate-400">Market Cap</span>
                            <div className="text-white font-medium">${((stockData.price * 1e9) / 1e12).toFixed(2)}T</div>
                          </div>
                        </div>
                        
                        <p className="text-slate-300 text-sm">{company.description}</p>
                        
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTab('trading');
                            }}
                          >
                            Buy
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTab('trading');
                            }}
                          >
                            Sell
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* User uploaded assets section */}
            {assets && assets.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-white mb-6">Community AI Assets</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {assets.slice(0, 6).map((asset) => {
                    const currentPrice = Number(asset.current_price) || 0;
                    const initialPrice = Number(asset.initial_price) || 1;
                    const downloadCount = asset.download_count || 0;
                    
                    return (
                      <AssetCard key={asset.id} asset={{
                        id: asset.id,
                        name: asset.name,
                        symbol: asset.ticker_symbol,
                        price: currentPrice,
                        change: currentPrice - initialPrice,
                        changePercent: ((currentPrice - initialPrice) / initialPrice) * 100,
                        volume: downloadCount.toString(),
                        marketCap: `${((currentPrice * (downloadCount + 100)) / 1000000).toFixed(1)}M`,
                        category: asset.asset_type.charAt(0).toUpperCase() + asset.asset_type.slice(1),
                        description: asset.description,
                        logo: '💎'
                      }} />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      case 'trading':
        return <RealTradingInterface />;
      case 'portfolio':
        return <PortfolioDashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <NavigationHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                NeuroStock.AI
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-gradient-to-r from-green-500/20 to-green-400/20 text-green-400 border-green-500/30">
                  LIVE TRADING
                </Badge>
                <span className="text-slate-300 text-sm">Real-time AI & Tech stock exchange</span>
              </div>
            </div>
          </div>
          <p className="text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed">
            The world's most advanced AI-powered stock exchange. Trade real AI & tech company shares with intelligent insights.
          </p>
        </div>

        {renderTabContent()}
      </main>
    </div>
  );
};

export default Index;

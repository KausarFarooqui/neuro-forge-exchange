
import { useState, useEffect } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import MarketOverview from '@/components/MarketOverview';
import RealTradingInterface from '@/components/RealTradingInterface';
import PortfolioDashboard from '@/components/PortfolioDashboard';
import AIMarketInsights from '@/components/AIMarketInsights';
import NewsTickerFeed from '@/components/NewsTickerFeed';
import HeroSection from '@/components/HeroSection';
import AICompaniesGrid from '@/components/AICompaniesGrid';
import CommunityAssets from '@/components/CommunityAssets';
import AINewsHub from '@/components/AINewsHub';
import TechWorldPulse from '@/components/TechWorldPulse';
import MarketSentimentRadar from '@/components/MarketSentimentRadar';
import { useAssets } from '@/hooks/useAssets';
import { useAuth } from '@/hooks/useAuth';
import { stockMarketService } from '@/services/stockMarketService';

const Index = () => {
  const [activeTab, setActiveTab] = useState('market');
  const { data: assets, isLoading, error } = useAssets();
  const { user, loading: authLoading } = useAuth();
  const [realStocks, setRealStocks] = useState(() => {
    return stockMarketService.getAllStocks().map(stock => ({
      ...stock,
      change: stock.change || 0,
      changePercent: ((stock.change || 0) / stock.price) * 100
    }));
  });

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
            
            {/* New AI/ML News and Analytics Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <AINewsHub />
              </div>
              <div className="space-y-6">
                <TechWorldPulse />
                <MarketSentimentRadar />
              </div>
            </div>
            
            <AIMarketInsights />
            
            <HeroSection />

            <AICompaniesGrid 
              companies={aiCompanies}
              stockData={realStocks}
              onTradingClick={() => setActiveTab('trading')}
            />

            <CommunityAssets assets={assets || []} />
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
        {renderTabContent()}
      </main>
    </div>
  );
};

export default Index;

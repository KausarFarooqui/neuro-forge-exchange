
import { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart, DollarSign, Zap, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import NavigationHeader from '@/components/NavigationHeader';
import MarketOverview from '@/components/MarketOverview';
import AssetCard from '@/components/AssetCard';
import TradingPanel from '@/components/TradingPanel';
import PortfolioDashboard from '@/components/PortfolioDashboard';

const Index = () => {
  const [activeTab, setActiveTab] = useState('market');

  const featuredAssets = [
    {
      id: 1,
      name: 'GPT-4 Vision API',
      symbol: 'GPT4V',
      price: 156.74,
      change: 12.45,
      changePercent: 8.63,
      volume: '2.4M',
      marketCap: '45.2B',
      category: 'API',
      description: 'Advanced vision-language model API with multimodal capabilities',
      logo: '🤖'
    },
    {
      id: 2,
      name: 'ImageNet Dataset',
      symbol: 'IMGNET',
      price: 89.32,
      change: -3.21,
      changePercent: -3.47,
      volume: '1.8M',
      marketCap: '12.7B',
      category: 'Dataset',
      description: 'Large-scale visual recognition dataset with 14M images',
      logo: '🖼️'
    },
    {
      id: 3,
      name: 'BERT-Large Model',
      symbol: 'BERT',
      price: 234.89,
      change: 18.76,
      changePercent: 8.68,
      volume: '3.1M',
      marketCap: '67.3B',
      category: 'Model',
      description: 'Bidirectional transformer for language understanding',
      logo: '📚'
    },
    {
      id: 4,
      name: 'OpenAI Corp',
      symbol: 'OPENAI',
      price: 1247.33,
      change: 45.67,
      changePercent: 3.81,
      volume: '5.2M',
      marketCap: '156.8B',
      category: 'Company',
      description: 'Leading AI research and deployment company',
      logo: '🚀'
    },
    {
      id: 5,
      name: 'TensorFlow Framework',
      symbol: 'TF',
      price: 78.45,
      change: 2.34,
      changePercent: 3.08,
      volume: '892K',
      marketCap: '8.9B',
      category: 'Framework',
      description: 'End-to-end machine learning platform',
      logo: '⚡'
    },
    {
      id: 6,
      name: 'Hugging Face Hub',
      symbol: 'HF',
      price: 445.67,
      change: 23.45,
      changePercent: 5.55,
      volume: '2.7M',
      marketCap: '34.2B',
      category: 'Platform',
      description: 'AI model repository and collaboration platform',
      logo: '🤗'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'market':
        return (
          <div className="space-y-6">
            <MarketOverview />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {featuredAssets.map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>
          </div>
        );
      case 'trading':
        return <TradingPanel />;
      case 'portfolio':
        return <PortfolioDashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <NavigationHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              NeuroStock.AI
            </h1>
          </div>
          <p className="text-slate-300 text-lg">The Ultimate AI Asset Exchange</p>
        </div>

        {renderTabContent()}
      </main>
    </div>
  );
};

export default Index;

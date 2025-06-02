
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, BarChart, DollarSign, Zap, Database, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import NavigationHeader from '@/components/NavigationHeader';
import MarketOverview from '@/components/MarketOverview';
import AssetCard from '@/components/AssetCard';
import TradingPanel from '@/components/TradingPanel';
import PortfolioDashboard from '@/components/PortfolioDashboard';
import { useAssets } from '@/hooks/useAssets';

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('market');
  const { data: assets, isLoading, error } = useAssets();

  // Convert database assets to the format expected by AssetCard
  const formatAssetsForDisplay = (dbAssets: any[]) => {
    return dbAssets.map(asset => ({
      id: asset.id,
      name: asset.name,
      symbol: asset.ticker_symbol,
      price: parseFloat(asset.current_price),
      change: parseFloat(asset.current_price) - parseFloat(asset.initial_price),
      changePercent: ((parseFloat(asset.current_price) - parseFloat(asset.initial_price)) / parseFloat(asset.initial_price)) * 100,
      volume: `${asset.download_count}`,
      marketCap: `${(parseFloat(asset.current_price) * (asset.download_count + 100)).toFixed(1)}M`,
      category: asset.asset_type.charAt(0).toUpperCase() + asset.asset_type.slice(1),
      description: asset.description,
      logo: getAssetLogo(asset.asset_type)
    }));
  };

  const getAssetLogo = (type: string) => {
    const logos = {
      'model': '🤖',
      'dataset': '🗂️',
      'api': '🔌',
      'framework': '⚡',
      'tool': '🛠️',
      'company_share': '🏢'
    };
    return logos[type as keyof typeof logos] || '💎';
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'market':
        return (
          <div className="space-y-6">
            <MarketOverview />
            
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Featured AI Assets</h2>
              <Button 
                onClick={() => navigate('/upload')}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                List Your Asset
              </Button>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm animate-pulse">
                    <CardHeader className="pb-3">
                      <div className="h-6 bg-slate-700 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="h-8 bg-slate-700 rounded"></div>
                        <div className="h-16 bg-slate-700 rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <p className="text-red-400 mb-4">Failed to load assets: {error.message}</p>
                  <Button onClick={() => window.location.reload()} variant="outline" className="border-slate-600">
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            ) : assets && assets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {formatAssetsForDisplay(assets).map((asset) => (
                  <AssetCard key={asset.id} asset={asset} />
                ))}
              </div>
            ) : (
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <Database className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Assets Listed Yet</h3>
                  <p className="text-slate-400 mb-6">
                    Be the first to list your AI assets on the NeuroStock exchange!
                  </p>
                  <Button 
                    onClick={() => navigate('/upload')}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Upload First Asset
                  </Button>
                </CardContent>
              </Card>
            )}
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

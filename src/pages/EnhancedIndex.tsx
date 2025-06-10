
import { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import EnhancedHeroSection from '@/components/EnhancedHeroSection';
import MarketStatus from '@/components/Professional/MarketStatus';
import AINewsHub from '@/components/AINewsHub';
import { useAssets } from '@/hooks/useAssets';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Star, Download } from 'lucide-react';

const EnhancedIndex = () => {
  const [activeTab, setActiveTab] = useState('market');
  const { data: assets, isLoading } = useAssets();

  const topAssets = assets?.slice(0, 6) || [];

  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <EnhancedHeroSection />
        
        {/* Market Status */}
        <MarketStatus />
        
        {/* Featured AI Assets */}
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Featured AI Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 bg-slate-800/30 rounded-lg animate-pulse">
                    <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-slate-700 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topAssets.map((asset) => (
                  <div key={asset.id} className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-white font-medium text-lg mb-1">{asset.name}</h3>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                          {asset.ticker_symbol}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-cyan-400">
                          ${asset.current_price.toFixed(2)}
                        </div>
                        <div className="flex items-center text-sm">
                          {asset.current_price > asset.initial_price ? (
                            <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-400 mr-1" />
                          )}
                          <span className={asset.current_price > asset.initial_price ? 'text-green-400' : 'text-red-400'}>
                            {((asset.current_price - asset.initial_price) / asset.initial_price * 100).toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                      {asset.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {asset.download_count}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {asset.rating?.toFixed(1) || '0.0'}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                      size="sm"
                    >
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* AI News Hub */}
        <AINewsHub />
      </div>
    </MainLayout>
  );
};

export default EnhancedIndex;

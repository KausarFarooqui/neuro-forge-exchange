
import { useState } from 'react';
import { TrendingUp, Download, DollarSign, Star, Edit, Trash2, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUserAssets } from '@/hooks/useAssets';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const DeveloperDashboard = () => {
  const { data: assets, isLoading, refetch } = useUserAssets();
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDeleteAsset = async (assetId: string) => {
    setDeletingId(assetId);
    
    try {
      const { error } = await supabase
        .from('ai_assets')
        .delete()
        .eq('id', assetId);

      if (error) throw error;

      toast({
        title: "Asset Deleted",
        description: "Your asset has been successfully removed from the marketplace."
      });

      refetch();
    } catch (error: any) {
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete asset.",
        variant: "destructive"
      });
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', label: 'Pending Review' },
      approved: { color: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'Live' },
      rejected: { color: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'Rejected' },
      delisted: { color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', label: 'Delisted' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const totalEarnings = assets?.reduce((sum, asset) => sum + parseFloat(asset.total_revenue || '0'), 0) || 0;
  const totalDownloads = assets?.reduce((sum, asset) => sum + (asset.download_count || 0), 0) || 0;
  const avgRating = assets?.length ? assets.reduce((sum, asset) => sum + (asset.rating || 0), 0) / assets.length : 0;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-slate-700 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-slate-700 rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Earnings</p>
                <p className="text-2xl font-bold text-green-400">${totalEarnings.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Downloads</p>
                <p className="text-2xl font-bold text-blue-400">{totalDownloads.toLocaleString()}</p>
              </div>
              <Download className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Average Rating</p>
                <p className="text-2xl font-bold text-yellow-400">{avgRating.toFixed(1)}/5.0</p>
              </div>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assets List */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Your Assets</CardTitle>
        </CardHeader>
        <CardContent>
          {!assets || assets.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-400 mb-4">You haven't uploaded any assets yet.</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Upload Your First Asset
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {assets.map((asset) => (
                <div key={asset.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/30">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{asset.name}</h3>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          ${asset.ticker_symbol}
                        </Badge>
                        {getStatusBadge(asset.status)}
                      </div>
                      
                      <p className="text-slate-400 text-sm mb-3 line-clamp-2">{asset.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Current Price:</span>
                          <div className="text-white font-medium">${parseFloat(asset.current_price).toFixed(2)}</div>
                        </div>
                        <div>
                          <span className="text-slate-400">Downloads:</span>
                          <div className="text-white font-medium">{asset.download_count}</div>
                        </div>
                        <div>
                          <span className="text-slate-400">Revenue:</span>
                          <div className="text-green-400 font-medium">${parseFloat(asset.total_revenue || '0').toFixed(2)}</div>
                        </div>
                        <div>
                          <span className="text-slate-400">Rating:</span>
                          <div className="text-yellow-400 font-medium">
                            {asset.rating ? `${asset.rating}/5.0 (${asset.rating_count})` : 'No ratings'}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline" className="border-slate-600">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-600">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-red-600 text-red-400 hover:bg-red-600/20"
                        onClick={() => handleDeleteAsset(asset.id)}
                        disabled={deletingId === asset.id}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeveloperDashboard;

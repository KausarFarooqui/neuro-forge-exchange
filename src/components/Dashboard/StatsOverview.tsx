
import { DollarSign, Download, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Asset } from '@/hooks/useAssets';

interface StatsOverviewProps {
  assets: Asset[] | undefined;
}

const StatsOverview = ({ assets }: StatsOverviewProps) => {
  const totalEarnings = assets?.reduce((sum, asset) => sum + parseFloat(String(asset.total_revenue || 0)), 0) || 0;
  const totalDownloads = assets?.reduce((sum, asset) => sum + (asset.download_count || 0), 0) || 0;
  const avgRating = assets?.length ? assets.reduce((sum, asset) => sum + (asset.rating || 0), 0) / assets.length : 0;

  return (
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
  );
};

export default StatsOverview;

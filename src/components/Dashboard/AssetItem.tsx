
import { Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AssetStatusBadge from './AssetStatusBadge';
import type { Asset } from '@/hooks/useAssets';

interface AssetItemProps {
  asset: Asset;
  onDelete: (assetId: string) => void;
  deletingId: string | null;
}

const AssetItem = ({ asset, onDelete, deletingId }: AssetItemProps) => {
  return (
    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/30">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-white">{asset.name}</h3>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              ${asset.ticker_symbol}
            </Badge>
            <AssetStatusBadge status={asset.status} />
          </div>
          
          <p className="text-slate-400 text-sm mb-3 line-clamp-2">{asset.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-slate-400">Current Price:</span>
              <div className="text-white font-medium">${parseFloat(String(asset.current_price || 0)).toFixed(2)}</div>
            </div>
            <div>
              <span className="text-slate-400">Downloads:</span>
              <div className="text-white font-medium">{asset.download_count}</div>
            </div>
            <div>
              <span className="text-slate-400">Revenue:</span>
              <div className="text-green-400 font-medium">${parseFloat(String(asset.total_revenue || 0)).toFixed(2)}</div>
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
            onClick={() => onDelete(asset.id)}
            disabled={deletingId === asset.id}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssetItem;

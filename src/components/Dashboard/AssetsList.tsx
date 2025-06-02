
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AssetItem from './AssetItem';
import type { Asset } from '@/hooks/useAssets';

interface AssetsListProps {
  assets: Asset[] | undefined;
  onDeleteAsset: (assetId: string) => void;
  deletingId: string | null;
}

const AssetsList = ({ assets, onDeleteAsset, deletingId }: AssetsListProps) => {
  return (
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
              <AssetItem
                key={asset.id}
                asset={asset}
                onDelete={onDeleteAsset}
                deletingId={deletingId}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AssetsList;

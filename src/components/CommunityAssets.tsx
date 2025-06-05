
import AssetCard from './AssetCard';

interface Asset {
  id: string;
  name: string;
  ticker_symbol: string;
  current_price: string | number;
  initial_price: string | number;
  download_count: number;
  asset_type: string;
  description: string;
}

interface CommunityAssetsProps {
  assets: Asset[];
}

const CommunityAssets = ({ assets }: CommunityAssetsProps) => {
  if (!assets || assets.length === 0) {
    return null;
  }

  return (
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
  );
};

export default CommunityAssets;

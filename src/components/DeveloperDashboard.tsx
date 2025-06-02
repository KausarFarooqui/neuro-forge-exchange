
import { useUserAssets } from '@/hooks/useAssets';
import { useDashboard } from '@/hooks/useDashboard';
import StatsOverview from './Dashboard/StatsOverview';
import AssetsList from './Dashboard/AssetsList';
import LoadingSkeleton from './Dashboard/LoadingSkeleton';

const DeveloperDashboard = () => {
  const { data: assets, isLoading, refetch } = useUserAssets();
  const { handleDeleteAsset, deletingId } = useDashboard();

  const onDeleteAsset = (assetId: string) => {
    handleDeleteAsset(assetId, refetch);
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      <StatsOverview assets={assets} />
      <AssetsList 
        assets={assets} 
        onDeleteAsset={onDeleteAsset}
        deletingId={deletingId}
      />
    </div>
  );
};

export default DeveloperDashboard;

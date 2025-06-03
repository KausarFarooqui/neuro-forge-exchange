
import { useEffect } from 'react';
import { useUserAssets } from '@/hooks/useAssets';
import { useDashboard } from '@/hooks/useDashboard';
import StatsOverview from './Dashboard/StatsOverview';
import AssetsList from './Dashboard/AssetsList';
import LoadingSkeleton from './Dashboard/LoadingSkeleton';
import NavigationHeader from './NavigationHeader';
import ProtectedRoute from './ProtectedRoute';

const DeveloperDashboard = () => {
  const { data: assets, isLoading, refetch } = useUserAssets();
  const { handleDeleteAsset, deletingId } = useDashboard();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const onDeleteAsset = (assetId: string) => {
    handleDeleteAsset(assetId, refetch);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <NavigationHeader activeTab="portfolio" setActiveTab={() => {}} />
        
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-4">
              Developer Dashboard
            </h1>
            <p className="text-slate-300 text-lg">
              Manage your AI assets and track performance
            </p>
          </div>

          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="space-y-6">
              <StatsOverview assets={assets || []} />
              <AssetsList 
                assets={assets || []} 
                onDeleteAsset={onDeleteAsset}
                deletingId={deletingId}
              />
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default DeveloperDashboard;

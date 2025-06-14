
import TradingDashboardLayout from './TradingDashboardLayout';

const LoadingScreen = () => {
  return (
    <TradingDashboardLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400 mb-4"></div>
          <p className="text-white">Loading market data...</p>
        </div>
      </div>
    </TradingDashboardLayout>
  );
};

export default LoadingScreen;

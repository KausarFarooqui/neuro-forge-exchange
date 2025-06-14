
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wifi } from 'lucide-react';
import TradingDashboardLayout from './TradingDashboardLayout';
import ApiConfiguration from './ApiConfiguration';

interface ApiSetupPromptProps {
  onHideSetup: () => void;
}

const ApiSetupPrompt = ({ onHideSetup }: ApiSetupPromptProps) => {
  return (
    <TradingDashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Configure Market Data</h1>
          <p className="text-slate-300">Set up your API provider to access real-time stock market data</p>
        </div>
        
        <Alert className="mb-6 bg-blue-500/10 border-blue-500/30">
          <Wifi className="h-4 w-4" />
          <AlertDescription className="text-blue-400">
            To access real-time market data, please configure your API provider. You can get started with a free Alpha Vantage API key.
          </AlertDescription>
        </Alert>
        
        <ApiConfiguration />
        
        <div className="mt-6 text-center">
          <Button
            onClick={onHideSetup}
            variant="outline"
            className="mr-3"
          >
            Continue with Mock Data
          </Button>
          <Button
            onClick={() => window.location.href = '/trading-setup'}
            className="bg-gradient-to-r from-cyan-500 to-blue-600"
          >
            Full Setup Guide
          </Button>
        </div>
      </div>
    </TradingDashboardLayout>
  );
};

export default ApiSetupPrompt;

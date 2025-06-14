
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Settings, Key, CheckCircle, AlertTriangle } from 'lucide-react';
import { stockApiService, type StockApiConfig } from '@/services/stockApiService';
import { useToast } from '@/hooks/use-toast';

interface ApiProvider {
  id: StockApiConfig['provider'];
  name: string;
  baseUrl: string;
  description: string;
  features: string[];
  pricing: string;
  signupUrl: string;
}

const API_PROVIDERS: ApiProvider[] = [
  {
    id: 'alpha_vantage',
    name: 'Alpha Vantage',
    baseUrl: 'https://www.alphavantage.co',
    description: 'Free tier with 5 API requests per minute, 500 requests per day',
    features: ['Real-time quotes', 'Historical data', 'Technical indicators'],
    pricing: 'Free tier available',
    signupUrl: 'https://www.alphavantage.co/support/#api-key'
  },
  {
    id: 'iex_cloud',
    name: 'IEX Cloud',
    baseUrl: 'https://cloud.iexapis.com',
    description: 'Reliable market data with flexible pricing',
    features: ['Real-time quotes', 'Historical data', 'Company fundamentals'],
    pricing: 'Pay-per-use',
    signupUrl: 'https://iexcloud.io/pricing'
  },
  {
    id: 'finnhub',
    name: 'Finnhub',
    baseUrl: 'https://finnhub.io',
    description: 'Free tier with 60 API calls/minute',
    features: ['Real-time quotes', 'News', 'Technical analysis'],
    pricing: 'Free tier available',
    signupUrl: 'https://finnhub.io/pricing'
  },
  {
    id: 'polygon',
    name: 'Polygon.io',
    baseUrl: 'https://api.polygon.io',
    description: 'Professional-grade market data',
    features: ['Real-time data', 'Options data', 'Crypto support'],
    pricing: 'Starting at $99/month',
    signupUrl: 'https://polygon.io/pricing'
  }
];

const ApiConfiguration = () => {
  const [selectedProvider, setSelectedProvider] = useState<StockApiConfig['provider'] | ''>('');
  const [apiKey, setApiKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  useEffect(() => {
    // Check if API is already configured
    const savedConfig = localStorage.getItem('stockApiConfig');
    if (savedConfig) {
      const config = JSON.parse(savedConfig);
      setSelectedProvider(config.provider);
      setApiKey(config.apiKey);
      setIsConfigured(true);
      setConnectionStatus('success');
      
      // Set the configuration in the service
      const provider = API_PROVIDERS.find(p => p.id === config.provider);
      if (provider) {
        stockApiService.setConfig({
          provider: config.provider,
          apiKey: config.apiKey,
          baseUrl: provider.baseUrl
        });
      }
    }
  }, []);

  const handleSaveConfiguration = async () => {
    if (!selectedProvider || !apiKey) {
      toast({
        title: "Missing Information",
        description: "Please select a provider and enter your API key",
        variant: "destructive"
      });
      return;
    }

    const provider = API_PROVIDERS.find(p => p.id === selectedProvider);
    if (!provider) return;

    const config: StockApiConfig = {
      provider: selectedProvider,
      apiKey,
      baseUrl: provider.baseUrl
    };

    // Save to localStorage
    localStorage.setItem('stockApiConfig', JSON.stringify(config));
    
    // Configure the service
    stockApiService.setConfig(config);
    
    setIsConfigured(true);
    
    // Test the connection
    await testConnection();
  };

  const testConnection = async () => {
    setIsTestingConnection(true);
    setConnectionStatus('idle');

    try {
      // Test with a popular stock symbol
      const quote = await stockApiService.getQuote('AAPL');
      
      if (quote && quote.price > 0) {
        setConnectionStatus('success');
        toast({
          title: "Connection Successful",
          description: `Successfully connected to ${API_PROVIDERS.find(p => p.id === selectedProvider)?.name}`,
        });
      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      setConnectionStatus('error');
      toast({
        title: "Connection Failed",
        description: "Please check your API key and try again",
        variant: "destructive"
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  const resetConfiguration = () => {
    localStorage.removeItem('stockApiConfig');
    setSelectedProvider('');
    setApiKey('');
    setIsConfigured(false);
    setConnectionStatus('idle');
    
    toast({
      title: "Configuration Reset",
      description: "API configuration has been cleared",
    });
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Stock Market API Configuration
          {isConfigured && (
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <CheckCircle className="w-3 h-3 mr-1" />
              Configured
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isConfigured ? (
          <>
            <Alert className="bg-blue-500/10 border-blue-500/30">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-blue-400">
                To access real-time stock market data, you need to configure an API provider. 
                Choose from the options below and get your free API key.
              </AlertDescription>
            </Alert>

            <div>
              <Label className="text-slate-300">Select API Provider</Label>
              <Select value={selectedProvider} onValueChange={(value) => setSelectedProvider(value as StockApiConfig['provider'])}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue placeholder="Choose a provider" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {API_PROVIDERS.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedProvider && (
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">
                  {API_PROVIDERS.find(p => p.id === selectedProvider)?.name}
                </h4>
                <p className="text-slate-300 text-sm mb-3">
                  {API_PROVIDERS.find(p => p.id === selectedProvider)?.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {API_PROVIDERS.find(p => p.id === selectedProvider)?.features.map((feature, index) => (
                    <Badge key={index} className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-sm">Pricing:</span>
                  <span className="text-green-400 text-sm">
                    {API_PROVIDERS.find(p => p.id === selectedProvider)?.pricing}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => window.open(API_PROVIDERS.find(p => p.id === selectedProvider)?.signupUrl, '_blank')}
                >
                  Get API Key
                </Button>
              </div>
            )}

            <div>
              <Label className="text-slate-300">API Key</Label>
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>

            <Button
              onClick={handleSaveConfiguration}
              disabled={!selectedProvider || !apiKey || isTestingConnection}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              <Key className="w-4 h-4 mr-2" />
              {isTestingConnection ? 'Testing Connection...' : 'Save Configuration'}
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div>
                <h4 className="text-green-400 font-medium">
                  Connected to {API_PROVIDERS.find(p => p.id === selectedProvider)?.name}
                </h4>
                <p className="text-green-300 text-sm">Real-time market data is active</p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={testConnection}
                disabled={isTestingConnection}
                variant="outline"
                className="flex-1"
              >
                {isTestingConnection ? 'Testing...' : 'Test Connection'}
              </Button>
              <Button
                onClick={resetConfiguration}
                variant="destructive"
                className="flex-1"
              >
                Reset Configuration
              </Button>
            </div>

            {connectionStatus === 'error' && (
              <Alert className="bg-red-500/10 border-red-500/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-red-400">
                  Connection test failed. Please check your API key and try again.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiConfiguration;

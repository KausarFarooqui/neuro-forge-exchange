
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';
import { stockApiService } from '@/services/stockApiService';

export const useApiConfiguration = () => {
  const [isApiConfigured, setIsApiConfigured] = useState(false);
  const [showApiConfig, setShowApiConfig] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkApiConfig = () => {
      const savedConfig = localStorage.getItem('stockApiConfig');
      let configured = !!savedConfig;
      
      // Auto-configure Alpha Vantage if not already set
      if (!configured) {
        const alphaVantageConfig = {
          provider: 'alpha_vantage',
          apiKey: '7ZA3DU9MV65UBXD8',
          baseUrl: 'https://www.alphavantage.co'
        };
        
        localStorage.setItem('stockApiConfig', JSON.stringify(alphaVantageConfig));
        stockApiService.setConfig(alphaVantageConfig);
        configured = true;
        
        toast({
          title: "API Configured",
          description: "Alpha Vantage API has been automatically configured with your key",
        });
      }
      
      setIsApiConfigured(configured);
      
      if (!configured) {
        setShowApiConfig(true);
      }
    };

    checkApiConfig();
    
    const handleStorageChange = () => {
      checkApiConfig();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [toast]);

  const handleApiConfigured = () => {
    setIsApiConfigured(true);
    setShowApiConfig(false);
    toast({
      title: "API Configured",
      description: "Real-time market data is now active",
    });
  };

  return {
    isApiConfigured,
    showApiConfig,
    setShowApiConfig,
    handleApiConfigured
  };
};

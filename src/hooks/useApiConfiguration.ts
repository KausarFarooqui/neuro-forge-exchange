
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';

export const useApiConfiguration = () => {
  const [isApiConfigured, setIsApiConfigured] = useState(false);
  const [showApiConfig, setShowApiConfig] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkApiConfig = () => {
      const savedConfig = localStorage.getItem('stockApiConfig');
      const configured = !!savedConfig;
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
  }, []);

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

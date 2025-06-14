
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, ExternalLink, Settings, Database, Key, Zap } from 'lucide-react';
import ApiConfiguration from '@/components/Trading/ApiConfiguration';
import NavigationHeader from '@/components/NavigationHeader';

const TradingSetup = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const setupSteps = [
    {
      id: 1,
      title: 'Choose API Provider',
      description: 'Select and configure your stock market data provider',
      icon: Key,
      completed: false
    },
    {
      id: 2,
      title: 'Configure Real-time Data',
      description: 'Set up WebSocket connections for live market feeds',
      icon: Zap,
      completed: false
    },
    {
      id: 3,
      title: 'Database Setup',
      description: 'Configure portfolio and trading history storage',
      icon: Database,
      completed: false
    },
    {
      id: 4,
      title: 'Trading Features',
      description: 'Enable advanced trading capabilities',
      icon: Settings,
      completed: false
    }
  ];

  const apiProviders = [
    {
      name: 'Alpha Vantage',
      description: 'Free tier with 5 API requests per minute',
      pricing: 'Free',
      features: ['Real-time quotes', 'Historical data', 'Technical indicators'],
      recommended: true,
      signupUrl: 'https://www.alphavantage.co/support/#api-key'
    },
    {
      name: 'IEX Cloud',
      description: 'Reliable market data with flexible pricing',
      pricing: 'Pay-per-use',
      features: ['Real-time quotes', 'Historical data', 'Company fundamentals'],
      recommended: false,
      signupUrl: 'https://iexcloud.io/pricing'
    },
    {
      name: 'Finnhub',
      description: 'Free tier with 60 API calls/minute',
      pricing: 'Free',
      features: ['Real-time quotes', 'News', 'Technical analysis'],
      recommended: false,
      signupUrl: 'https://finnhub.io/pricing'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      <NavigationHeader activeTab="trading" setActiveTab={() => {}} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Trading Platform Setup
            </h1>
            <p className="text-xl text-slate-300">
              Configure your trading platform with real market data
            </p>
          </div>

          {/* Setup Progress */}
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-white">Setup Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {setupSteps.map((step) => {
                  const IconComponent = step.icon;
                  return (
                    <div
                      key={step.id}
                      className={`p-4 rounded-lg border ${
                        currentStep === step.id
                          ? 'bg-cyan-500/20 border-cyan-500/50'
                          : step.completed
                          ? 'bg-green-500/20 border-green-500/50'
                          : 'bg-slate-800/50 border-slate-700/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <IconComponent className={`w-5 h-5 ${
                          step.completed
                            ? 'text-green-400'
                            : currentStep === step.id
                            ? 'text-cyan-400'
                            : 'text-slate-400'
                        }`} />
                        {step.completed && <CheckCircle className="w-4 h-4 text-green-400" />}
                      </div>
                      <h3 className="text-white font-medium mb-1">{step.title}</h3>
                      <p className="text-slate-300 text-sm">{step.description}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Step 1: API Configuration */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <ApiConfiguration />
              
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">API Provider Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {apiProviders.map((provider, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          provider.recommended
                            ? 'bg-green-500/10 border-green-500/30'
                            : 'bg-slate-800/50 border-slate-700/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-white font-medium">{provider.name}</h3>
                          {provider.recommended && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              Recommended
                            </Badge>
                          )}
                        </div>
                        <p className="text-slate-300 text-sm mb-3">{provider.description}</p>
                        <div className="space-y-2 mb-4">
                          {provider.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-400" />
                              <span className="text-slate-300 text-xs">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-cyan-400 font-medium">{provider.pricing}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(provider.signupUrl, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Sign Up
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button
                  onClick={() => setCurrentStep(2)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Placeholder for other steps */}
          {currentStep > 1 && (
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-4">
                  Step {currentStep}: {setupSteps[currentStep - 1].title}
                </h3>
                <p className="text-slate-300 mb-6">
                  This step is coming soon. For now, your trading platform is ready to use with the configured API!
                </p>
                <Button
                  onClick={() => window.location.href = '/trading'}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  Go to Trading Dashboard
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default TradingSetup;

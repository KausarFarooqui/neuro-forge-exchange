
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, TrendingUp, Globe, Activity, Rocket, Brain } from 'lucide-react';

interface PulseMetric {
  id: string;
  title: string;
  value: string;
  change: number;
  icon: any;
  color: string;
  description: string;
}

const TechWorldPulse = () => {
  const [metrics, setMetrics] = useState<PulseMetric[]>([]);
  const [globalTechIndex, setGlobalTechIndex] = useState(2847.32);

  useEffect(() => {
    const initialMetrics: PulseMetric[] = [
      {
        id: '1',
        title: 'AI Model Releases',
        value: '47',
        change: 23.5,
        icon: Brain,
        color: 'from-purple-500 to-pink-500',
        description: 'New AI models this week'
      },
      {
        id: '2',
        title: 'Funding Rounds',
        value: '$2.4B',
        change: 15.7,
        icon: Rocket,
        color: 'from-green-500 to-emerald-500',
        description: 'Total funding this week'
      },
      {
        id: '3',
        title: 'Tech Patents',
        value: '1,247',
        change: -3.2,
        icon: Zap,
        color: 'from-yellow-500 to-orange-500',
        description: 'Filed globally today'
      },
      {
        id: '4',
        title: 'Research Papers',
        value: '892',
        change: 8.9,
        icon: Activity,
        color: 'from-blue-500 to-cyan-500',
        description: 'Published on arXiv today'
      }
    ];

    setMetrics(initialMetrics);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: updateValue(metric.value, metric.id),
        change: parseFloat((metric.change + (Math.random() - 0.5) * 2).toFixed(1))
      })));

      setGlobalTechIndex(prev => prev + (Math.random() - 0.5) * 10);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const updateValue = (currentValue: string, id: string) => {
    if (id === '1') {
      return String(parseInt(currentValue) + Math.floor(Math.random() * 3));
    } else if (id === '2') {
      const num = parseFloat(currentValue.replace('$', '').replace('B', ''));
      return `$${(num + Math.random() * 0.1).toFixed(1)}B`;
    } else if (id === '3') {
      return String(parseInt(currentValue.replace(',', '')) + Math.floor(Math.random() * 50)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return String(parseInt(currentValue) + Math.floor(Math.random() * 20));
    }
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-cyan-400" />
          Global Tech Pulse
          <Badge className="bg-gradient-to-r from-red-500/20 to-red-400/20 text-red-400 border-red-500/30 animate-pulse">
            REAL-TIME
          </Badge>
        </CardTitle>
        <p className="text-slate-400 text-sm">Live monitoring of global technology ecosystem</p>
      </CardHeader>
      <CardContent>
        {/* Global Tech Index */}
        <div className="mb-6 p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg border border-slate-600/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium">Global Tech Innovation Index</h3>
              <p className="text-slate-400 text-sm">Real-time composite score</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-cyan-400">{globalTechIndex.toFixed(2)}</div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">+2.4%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.id}
                className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${metric.color} bg-opacity-20`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xl font-bold text-white">{metric.value}</div>
                    <div className={`flex items-center gap-1 text-sm ${
                      metric.change >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      <TrendingUp className={`w-3 h-3 ${metric.change < 0 ? 'rotate-180' : ''}`} />
                      {metric.change >= 0 ? '+' : ''}{metric.change}%
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">{metric.title}</h4>
                  <p className="text-slate-400 text-xs">{metric.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trending Topics */}
        <div className="mt-6">
          <h4 className="text-white font-medium mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            Trending in Tech
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              'Quantum Computing', 'Neural Interfaces', 'AGI Research', 'Autonomous Systems',
              'Biotech AI', 'Space Tech', 'Climate AI', 'Web3 Infrastructure'
            ].map((topic) => (
              <Badge
                key={topic}
                className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-cyan-500/30 hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 cursor-pointer"
              >
                #{topic}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TechWorldPulse;

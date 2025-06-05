
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { Brain, TrendingUp, Globe, Zap, ArrowLeft, Activity, Target, Radar } from 'lucide-react';

interface ChartDataPoint {
  name: string;
  value: number;
  change?: number;
  volume?: number;
  sentiment?: number;
}

const NeuralInsightsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [aiTrendsData, setAiTrendsData] = useState<ChartDataPoint[]>([]);
  const [sentimentData, setSentimentData] = useState<ChartDataPoint[]>([]);
  const [volumeData, setVolumeData] = useState<ChartDataPoint[]>([]);
  const [categoryData, setCategoryData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    // Simulated AI trends data
    const trends = [
      { name: 'Mon', value: 85, change: 2.3, volume: 15420 },
      { name: 'Tue', value: 89, change: 4.7, volume: 18650 },
      { name: 'Wed', value: 92, change: 3.4, volume: 21300 },
      { name: 'Thu', value: 88, change: -4.3, volume: 19800 },
      { name: 'Fri', value: 95, change: 7.9, volume: 25600 },
      { name: 'Sat', value: 91, change: -4.2, volume: 22100 },
      { name: 'Sun', value: 97, change: 6.6, volume: 28900 }
    ];

    const sentiment = [
      { name: 'AI/ML', value: 85, sentiment: 0.8 },
      { name: 'Quantum', value: 76, sentiment: 0.7 },
      { name: 'Neural', value: 82, sentiment: 0.9 },
      { name: 'Robotics', value: 71, sentiment: 0.6 },
      { name: 'Biotech', value: 78, sentiment: 0.75 }
    ];

    const volume = [
      { name: '00:00', value: 1200 },
      { name: '04:00', value: 800 },
      { name: '08:00', value: 2100 },
      { name: '12:00', value: 3200 },
      { name: '16:00', value: 2800 },
      { name: '20:00', value: 1900 }
    ];

    const categories = [
      { name: 'Research Papers', value: 35 },
      { name: 'Product Launches', value: 25 },
      { name: 'Funding News', value: 20 },
      { name: 'Acquisitions', value: 15 },
      { name: 'Partnerships', value: 5 }
    ];

    setAiTrendsData(trends);
    setSentimentData(sentiment);
    setVolumeData(volume);
    setCategoryData(categories);
  }, [timeRange]);

  const chartConfig = {
    value: {
      label: "Value",
      color: "#3b82f6",
    },
    sentiment: {
      label: "Sentiment",
      color: "#10b981",
    },
    volume: {
      label: "Volume",
      color: "#f59e0b",
    }
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="text-white hover:bg-slate-800/50"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Neural Insights Dashboard</h1>
              <p className="text-slate-400">Advanced AI-powered analytics and real-time tech intelligence</p>
            </div>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 mb-6">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className={timeRange === range 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }
            >
              {range}
            </Button>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* AI Trends Chart */}
          <Card className="lg:col-span-2 bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                AI Innovation Trends
                <Badge className="bg-gradient-to-r from-green-500/20 to-green-400/20 text-green-400 border-green-500/30">
                  LIVE
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <LineChart data={aiTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Sentiment Analysis */}
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                Sector Sentiment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={sentimentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Volume Analysis */}
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Activity Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <AreaChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#f59e0b"
                    fill="url(#volumeGradient)"
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* News Categories Distribution */}
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                News Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Real-time Metrics */}
          <Card className="lg:col-span-2 bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Radar className="w-5 h-5 text-cyan-400" />
                Real-time Intelligence Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30">
                  <div className="text-2xl font-bold text-blue-400">247</div>
                  <div className="text-sm text-slate-300">AI Papers Today</div>
                  <div className="text-xs text-green-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +12.3%
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                  <div className="text-2xl font-bold text-green-400">$4.7B</div>
                  <div className="text-sm text-slate-300">Funding This Week</div>
                  <div className="text-xs text-green-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +23.1%
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
                  <div className="text-2xl font-bold text-purple-400">89</div>
                  <div className="text-sm text-slate-300">New Startups</div>
                  <div className="text-xs text-red-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 rotate-180" />
                    -2.1%
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
                  <div className="text-2xl font-bold text-yellow-400">156K</div>
                  <div className="text-sm text-slate-300">Social Mentions</div>
                  <div className="text-xs text-green-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +45.7%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NeuralInsightsDashboard;

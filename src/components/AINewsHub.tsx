import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Globe, Zap, TrendingUp, Clock, ExternalLink, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  impact: 'High' | 'Medium' | 'Low';
  timestamp: string;
  source: string;
  tags: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  aiAnalysis: string;
}

const AINewsHub = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated real-time news data (in production, this would come from APIs)
  const mockNews: NewsItem[] = [
    {
      id: '1',
      title: 'OpenAI Unveils GPT-5 with Revolutionary Multimodal Reasoning',
      summary: 'OpenAI has released GPT-5, featuring breakthrough capabilities in multimodal reasoning, real-time learning, and autonomous task execution.',
      category: 'AI Models',
      impact: 'High',
      timestamp: '2 minutes ago',
      source: 'TechCrunch',
      tags: ['OpenAI', 'GPT-5', 'Multimodal', 'Reasoning'],
      sentiment: 'positive',
      aiAnalysis: 'Major breakthrough in AI capabilities. Expected to accelerate adoption across industries.'
    },
    {
      id: '2',
      title: 'Google DeepMind Achieves Quantum-AI Supremacy in Drug Discovery',
      summary: 'DeepMind\'s new quantum-enhanced AI system successfully designs novel protein structures, potentially revolutionizing pharmaceutical research.',
      category: 'Quantum AI',
      impact: 'High',
      timestamp: '15 minutes ago',
      source: 'Nature',
      tags: ['Google', 'DeepMind', 'Quantum', 'Drug Discovery'],
      sentiment: 'positive',
      aiAnalysis: 'Quantum computing + AI breakthrough. Could transform healthcare and reduce drug development timelines.'
    },
    {
      id: '3',
      title: 'Meta Launches Neural Interface for Direct Brain-Computer Control',
      summary: 'Meta\'s Reality Labs introduces non-invasive neural interface technology enabling direct thought-to-digital interaction.',
      category: 'Neural Tech',
      impact: 'High',
      timestamp: '32 minutes ago',
      source: 'MIT Technology Review',
      tags: ['Meta', 'Neural Interface', 'Brain-Computer', 'Reality Labs'],
      sentiment: 'positive',
      aiAnalysis: 'Revolutionary human-computer interaction. Privacy and ethical considerations need careful evaluation.'
    },
    {
      id: '4',
      title: 'Tesla\'s FSD 13.0 Achieves 99.9% Autonomous Driving Accuracy',
      summary: 'Tesla\'s latest Full Self-Driving update demonstrates unprecedented accuracy in complex urban environments across global testing.',
      category: 'Autonomous Vehicles',
      impact: 'Medium',
      timestamp: '1 hour ago',
      source: 'Electrek',
      tags: ['Tesla', 'FSD', 'Autonomous', 'AI Safety'],
      sentiment: 'positive',
      aiAnalysis: 'Significant progress in autonomous driving. Regulatory approval timeline remains uncertain.'
    },
    {
      id: '5',
      title: 'NVIDIA H200 Superchips Power New AI Datacenter Revolution',
      summary: 'NVIDIA announces H200 deployment in 50+ major datacenters worldwide, enabling 10x faster AI model training.',
      category: 'Hardware',
      impact: 'Medium',
      timestamp: '2 hours ago',
      source: 'AnandTech',
      tags: ['NVIDIA', 'H200', 'Datacenter', 'AI Training'],
      sentiment: 'positive',
      aiAnalysis: 'Infrastructure scaling accelerates AI development. Power consumption concerns need addressing.'
    },
    {
      id: '6',
      title: 'EU AI Act Enforcement Results in First Major Penalties',
      summary: 'European regulators impose €50M fine on major tech company for AI bias violations, setting precedent for global AI governance.',
      category: 'Regulation',
      impact: 'High',
      timestamp: '3 hours ago',
      source: 'Reuters',
      tags: ['EU', 'AI Act', 'Regulation', 'Ethics'],
      sentiment: 'negative',
      aiAnalysis: 'Regulatory enforcement begins. Companies must prioritize AI safety and fairness compliance.'
    }
  ];

  useEffect(() => {
    // Simulate loading and data fetching
    setTimeout(() => {
      setNewsItems(mockNews);
      setIsLoading(false);
    }, 2000);

    // Simulate real-time updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setNewsItems(prev => prev.map(item => ({
          ...item,
          timestamp: updateTimestamp(item.timestamp)
        })));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const updateTimestamp = (currentTime: string) => {
    // Simple timestamp update logic
    if (currentTime.includes('minute')) {
      const minutes = parseInt(currentTime) + 1;
      return `${minutes} minutes ago`;
    }
    return currentTime;
  };

  const categories = ['all', 'AI Models', 'Quantum AI', 'Neural Tech', 'Autonomous Vehicles', 'Hardware', 'Regulation'];

  const filteredNews = activeFilter === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeFilter);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      default: return 'text-blue-400';
    }
  };

  const handleViewAllInsights = () => {
    navigate('/neural-insights');
  };

  if (isLoading) {
    return (
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center animate-pulse">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-white flex items-center gap-2">
                Neural News Intelligence
                <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-cyan-500/30">
                  LIVE
                </Badge>
              </CardTitle>
              <p className="text-slate-400 text-sm">AI-powered global tech news aggregation</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 bg-slate-800/30 rounded-lg animate-pulse">
                <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-slate-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-white flex items-center gap-2">
              Neural News Intelligence
              <Badge className="bg-gradient-to-r from-green-500/20 to-green-400/20 text-green-400 border-green-500/30 animate-pulse">
                LIVE
              </Badge>
            </CardTitle>
            <p className="text-slate-400 text-sm">AI-powered global tech news aggregation & analysis</p>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Globe className="w-4 h-4" />
            <span className="text-xs">{newsItems.length} sources</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter(category)}
              className={`${
                activeFilter === category
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              } transition-all duration-300`}
            >
              {category === 'all' ? 'All News' : category}
            </Button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 group hover:bg-slate-800/50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${getImpactColor(item.impact)}`}>
                    {item.impact} Impact
                  </Badge>
                  <Badge className="bg-slate-700/50 text-slate-300 text-xs">
                    {item.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-slate-400 text-xs">
                  <Clock className="w-3 h-3" />
                  {item.timestamp}
                </div>
              </div>

              <h4 className="text-white font-medium text-sm mb-2 leading-relaxed group-hover:text-cyan-300 transition-colors duration-300">
                {item.title}
              </h4>

              <p className="text-slate-300 text-xs mb-3 leading-relaxed">
                {item.summary}
              </p>

              {/* AI Analysis */}
              <div className="mb-3 p-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded border border-purple-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span className="text-purple-400 text-xs font-medium">AI Analysis</span>
                </div>
                <p className="text-slate-300 text-xs">{item.aiAnalysis}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-xs">{item.source}</span>
                  <div className={`w-2 h-2 rounded-full ${getSentimentColor(item.sentiment)} opacity-60`}></div>
                </div>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-cyan-400 p-1">
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mt-2">
                {item.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} className="bg-slate-700/30 text-slate-400 text-xs border-none">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-6">
          <Button 
            onClick={handleViewAllInsights}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            View All Neural Insights
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AINewsHub;

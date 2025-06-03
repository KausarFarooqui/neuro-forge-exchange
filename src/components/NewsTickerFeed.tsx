
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const NewsTickerFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const newsItems = [
    {
      title: "OpenAI announces GPT-5 with breakthrough reasoning capabilities",
      time: "2 min ago",
      category: "Product Launch",
      impact: "High"
    },
    {
      title: "NVIDIA H200 chips now available for enterprise customers",
      time: "15 min ago",
      category: "Hardware",
      impact: "Medium"
    },
    {
      title: "Microsoft invests $2B in Anthropic's latest funding round",
      time: "1 hour ago",
      category: "Investment",
      impact: "High"
    },
    {
      title: "Google DeepMind releases Gemini Ultra 2.0 for developers",
      time: "2 hours ago",
      category: "Product Launch",
      impact: "High"
    },
    {
      title: "Stability AI announces open-source video generation model",
      time: "3 hours ago",
      category: "Open Source",
      impact: "Medium"
    },
    {
      title: "EU AI Act enforcement begins with €10M fines for violations",
      time: "4 hours ago",
      category: "Regulation",
      impact: "High"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [newsItems.length]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Product Launch': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Hardware': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Investment': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Open Source': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      'Regulation': 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    };
    return colors[category as keyof typeof colors] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-16 flex items-center bg-gradient-to-r from-slate-800/50 to-slate-700/50">
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-cyan-500 to-purple-500"></div>
          
          <div className="flex items-center gap-4 px-6 w-full">
            <Badge className="bg-gradient-to-r from-red-500/20 to-red-400/20 text-red-400 border-red-500/30 whitespace-nowrap">
              LIVE NEWS
            </Badge>
            
            <div className="flex-1 overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {newsItems.map((item, index) => (
                  <div key={index} className="min-w-full flex items-center gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-white font-medium">{item.title}</span>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </Badge>
                        <Badge className={`text-xs ${getImpactColor(item.impact)}`}>
                          {item.impact}
                        </Badge>
                        <span className="text-slate-400 text-sm whitespace-nowrap">{item.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-1">
              {newsItems.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-cyan-400' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsTickerFeed;

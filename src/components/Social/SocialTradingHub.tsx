
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Trophy, Copy, TrendingUp, Eye, Star } from 'lucide-react';

interface Trader {
  id: string;
  name: string;
  rank: number;
  followers: number;
  totalReturn: number;
  winRate: number;
  avgHoldTime: string;
  riskScore: number;
  isFollowing: boolean;
  recentTrades: number;
}

interface TradingIdea {
  id: string;
  author: string;
  symbol: string;
  action: 'buy' | 'sell';
  targetPrice: number;
  currentPrice: number;
  reasoning: string;
  timePosted: string;
  likes: number;
  comments: number;
}

interface Watchlist {
  id: string;
  name: string;
  creator: string;
  subscribers: number;
  performance: number;
  stocks: string[];
  isPublic: boolean;
}

const SocialTradingHub = () => {
  const [topTraders, setTopTraders] = useState<Trader[]>([]);
  const [tradingIdeas, setTradingIdeas] = useState<TradingIdea[]>([]);
  const [sharedWatchlists, setSharedWatchlists] = useState<Watchlist[]>([]);
  const [activeTab, setActiveTab] = useState('leaderboard');

  useEffect(() => {
    // Mock data for top traders
    const traders: Trader[] = [
      {
        id: '1',
        name: 'TechWizard2024',
        rank: 1,
        followers: 15420,
        totalReturn: 127.5,
        winRate: 78.2,
        avgHoldTime: '12d',
        riskScore: 6.8,
        isFollowing: false,
        recentTrades: 23
      },
      {
        id: '2',
        name: 'AIInvestor',
        rank: 2,
        followers: 12890,
        totalReturn: 115.3,
        winRate: 74.1,
        avgHoldTime: '8d',
        riskScore: 7.2,
        isFollowing: true,
        recentTrades: 31
      },
      {
        id: '3',
        name: 'QuantMaster',
        rank: 3,
        followers: 9870,
        totalReturn: 98.7,
        winRate: 82.5,
        avgHoldTime: '15d',
        riskScore: 5.4,
        isFollowing: false,
        recentTrades: 18
      },
      {
        id: '4',
        name: 'ValueHunter',
        rank: 4,
        followers: 8650,
        totalReturn: 89.2,
        winRate: 71.8,
        avgHoldTime: '45d',
        riskScore: 4.2,
        isFollowing: false,
        recentTrades: 12
      },
      {
        id: '5',
        name: 'GrowthSeeker',
        rank: 5,
        followers: 7230,
        totalReturn: 76.8,
        winRate: 69.4,
        avgHoldTime: '22d',
        riskScore: 7.8,
        isFollowing: true,
        recentTrades: 27
      }
    ];

    const ideas: TradingIdea[] = [
      {
        id: '1',
        author: 'TechWizard2024',
        symbol: 'NVDA',
        action: 'buy',
        targetPrice: 950,
        currentPrice: 875.23,
        reasoning: 'Strong Q4 earnings expected, AI chip demand continues to surge. Technical breakout above $870 resistance.',
        timePosted: '2h ago',
        likes: 124,
        comments: 18
      },
      {
        id: '2',
        author: 'AIInvestor',
        symbol: 'GOOGL',
        action: 'buy',
        targetPrice: 3000,
        currentPrice: 2850.45,
        reasoning: 'Google Cloud gaining market share, Bard AI integration showing promise. Undervalued compared to peers.',
        timePosted: '4h ago',
        likes: 89,
        comments: 12
      },
      {
        id: '3',
        author: 'ValueHunter',
        symbol: 'META',
        action: 'sell',
        targetPrice: 420,
        currentPrice: 485.20,
        reasoning: 'Overbought after recent rally. Regulatory concerns and slowing user growth in key markets.',
        timePosted: '6h ago',
        likes: 67,
        comments: 24
      }
    ];

    const watchlists: Watchlist[] = [
      {
        id: '1',
        name: 'AI Revolution 2024',
        creator: 'TechWizard2024',
        subscribers: 3420,
        performance: 45.7,
        stocks: ['NVDA', 'GOOGL', 'MSFT', 'AMD', 'CRM'],
        isPublic: true
      },
      {
        id: '2',
        name: 'Dividend Aristocrats',
        creator: 'ValueHunter',
        subscribers: 2890,
        performance: 23.4,
        stocks: ['JNJ', 'PG', 'KO', 'PEP', 'MCD'],
        isPublic: true
      },
      {
        id: '3',
        name: 'Clean Energy Future',
        creator: 'GrowthSeeker',
        subscribers: 1650,
        performance: 38.9,
        stocks: ['TSLA', 'ENPH', 'SEDG', 'PLUG', 'NEE'],
        isPublic: true
      }
    ];

    setTopTraders(traders);
    setTradingIdeas(ideas);
    setSharedWatchlists(watchlists);
  }, []);

  const handleFollowTrader = (traderId: string) => {
    setTopTraders(prev => prev.map(trader => 
      trader.id === traderId 
        ? { ...trader, isFollowing: !trader.isFollowing }
        : trader
    ));
  };

  const getRiskColor = (score: number) => {
    if (score <= 4) return 'text-green-400';
    if (score <= 7) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-950/80 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            Social Trading Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
              <TabsTrigger value="leaderboard" className="text-white data-[state=active]:bg-yellow-500/20">
                <Trophy className="w-4 h-4 mr-2" />
                Leaderboard
              </TabsTrigger>
              <TabsTrigger value="copy" className="text-white data-[state=active]:bg-blue-500/20">
                <Copy className="w-4 h-4 mr-2" />
                Copy Trading
              </TabsTrigger>
              <TabsTrigger value="ideas" className="text-white data-[state=active]:bg-green-500/20">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trading Ideas
              </TabsTrigger>
              <TabsTrigger value="watchlists" className="text-white data-[state=active]:bg-purple-500/20">
                <Eye className="w-4 h-4 mr-2" />
                Shared Lists
              </TabsTrigger>
            </TabsList>

            <TabsContent value="leaderboard" className="space-y-4">
              <div className="space-y-3">
                {topTraders.map((trader) => (
                  <Card key={trader.id} className="bg-slate-800/30 border-slate-700/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3">
                            <Badge className="bg-yellow-500/20 text-yellow-400">
                              #{trader.rank}
                            </Badge>
                            <Avatar>
                              <AvatarFallback className="bg-slate-700 text-white">
                                {trader.name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-white font-medium">{trader.name}</div>
                              <div className="text-slate-400 text-sm">{trader.followers.toLocaleString()} followers</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-6 text-center">
                          <div>
                            <div className="text-green-400 font-bold">+{trader.totalReturn.toFixed(1)}%</div>
                            <div className="text-slate-400 text-xs">Total Return</div>
                          </div>
                          <div>
                            <div className="text-white">{trader.winRate.toFixed(1)}%</div>
                            <div className="text-slate-400 text-xs">Win Rate</div>
                          </div>
                          <div>
                            <div className={getRiskColor(trader.riskScore)}>{trader.riskScore.toFixed(1)}</div>
                            <div className="text-slate-400 text-xs">Risk Score</div>
                          </div>
                          <div>
                            <Button
                              onClick={() => handleFollowTrader(trader.id)}
                              size="sm"
                              className={trader.isFollowing 
                                ? "bg-green-600 hover:bg-green-700" 
                                : "bg-blue-600 hover:bg-blue-700"
                              }
                            >
                              {trader.isFollowing ? 'Following' : 'Follow'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="copy" className="space-y-4">
              <Card className="bg-slate-800/30 border-slate-700/30">
                <CardHeader>
                  <CardTitle className="text-white">Copy Trading Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Copy className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Copy Top Traders</h3>
                    <p className="text-slate-400 mb-4">
                      Automatically copy trades from the best performing traders in real-time
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Start Copy Trading
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ideas" className="space-y-4">
              <div className="space-y-4">
                {tradingIdeas.map((idea) => (
                  <Card key={idea.id} className="bg-slate-800/30 border-slate-700/30">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-slate-700 text-white">
                              {idea.author.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-white font-medium">{idea.author}</div>
                            <div className="text-slate-400 text-sm">{idea.timePosted}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={idea.action === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                            {idea.action.toUpperCase()} {idea.symbol}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="text-white text-sm mb-2">
                          Target: ${idea.targetPrice} | Current: ${idea.currentPrice}
                        </div>
                        <p className="text-slate-300 text-sm">{idea.reasoning}</p>
                      </div>
                      
                      <div className="flex items-center gap-4 text-slate-400 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {idea.likes}
                        </div>
                        <div>{idea.comments} comments</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="watchlists" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sharedWatchlists.map((watchlist) => (
                  <Card key={watchlist.id} className="bg-slate-800/30 border-slate-700/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-medium">{watchlist.name}</h3>
                        <Badge className="bg-green-500/20 text-green-400">
                          +{watchlist.performance.toFixed(1)}%
                        </Badge>
                      </div>
                      
                      <div className="text-slate-400 text-sm mb-3">
                        by {watchlist.creator} • {watchlist.subscribers} subscribers
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {watchlist.stocks.map((stock) => (
                          <Badge key={stock} variant="outline" className="text-xs">
                            {stock}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                        Subscribe to List
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialTradingHub;


import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Wifi, WifiOff, X } from 'lucide-react';
import { useState } from 'react';

interface TradingHeaderProps {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  isConnected: boolean;
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
    timestamp: Date;
  }>;
  onClearNotifications: () => void;
}

const TradingHeader = ({ 
  symbol, 
  price, 
  change, 
  changePercent, 
  isConnected, 
  notifications,
  onClearNotifications 
}: TradingHeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const isPositive = change >= 0;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-white">{symbol}</h1>
          <Badge className={`${isConnected ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
            {isConnected ? <Wifi className="w-3 h-3 mr-1" /> : <WifiOff className="w-3 h-3 mr-1" />}
            {isConnected ? 'LIVE' : 'DISCONNECTED'}
          </Badge>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-3xl font-bold text-white">${price.toFixed(2)}</div>
            <div className={`flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              <span className="font-medium">
                {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
          
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
            >
              <Bell className="w-4 h-4" />
              {notifications.length > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  {notifications.length > 9 ? '9+' : notifications.length}
                </Badge>
              )}
            </Button>
            
            {showNotifications && (
              <Card className="absolute right-0 top-12 w-80 bg-slate-900 border-slate-700 z-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-medium">Trade Notifications</h3>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={onClearNotifications}>
                        Clear
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setShowNotifications(false)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {notifications.length === 0 ? (
                    <p className="text-slate-400 text-sm">No notifications</p>
                  ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-2 rounded border-l-2 ${
                            notification.type === 'success' 
                              ? 'bg-green-500/10 border-green-400' 
                              : notification.type === 'error'
                              ? 'bg-red-500/10 border-red-400'
                              : 'bg-blue-500/10 border-blue-400'
                          }`}
                        >
                          <div className="text-white text-sm font-medium">{notification.title}</div>
                          <div className="text-slate-300 text-xs">{notification.message}</div>
                          <div className="text-slate-400 text-xs mt-1">
                            {notification.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingHeader;

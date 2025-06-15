
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, Plus, TrendingUp, Volume2, Clock } from 'lucide-react';

interface Alert {
  id: string;
  symbol: string;
  type: 'price' | 'volume' | 'technical' | 'news';
  condition: string;
  value: number;
  currentValue: number;
  isActive: boolean;
  triggered: boolean;
  createdAt: Date;
  triggeredAt?: Date;
}

const AlertSystem = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [newAlert, setNewAlert] = useState({
    symbol: '',
    type: 'price' as Alert['type'],
    condition: 'above',
    value: 0
  });

  useEffect(() => {
    // Mock alerts data
    const mockAlerts: Alert[] = [
      {
        id: '1',
        symbol: 'NVDA',
        type: 'price',
        condition: 'above',
        value: 900,
        currentValue: 875.23,
        isActive: true,
        triggered: false,
        createdAt: new Date(Date.now() - 86400000)
      },
      {
        id: '2',
        symbol: 'GOOGL',
        type: 'volume',
        condition: 'above',
        value: 2000000,
        currentValue: 1800000,
        isActive: true,
        triggered: false,
        createdAt: new Date(Date.now() - 172800000)
      },
      {
        id: '3',
        symbol: 'MSFT',
        type: 'price',
        condition: 'below',
        value: 400,
        currentValue: 415.75,
        isActive: true,
        triggered: true,
        createdAt: new Date(Date.now() - 259200000),
        triggeredAt: new Date(Date.now() - 86400000)
      }
    ];

    setAlerts(mockAlerts);
  }, []);

  const createAlert = () => {
    if (!newAlert.symbol || !newAlert.value) return;

    const alert: Alert = {
      id: Date.now().toString(),
      symbol: newAlert.symbol.toUpperCase(),
      type: newAlert.type,
      condition: newAlert.condition,
      value: newAlert.value,
      currentValue: Math.random() * 1000 + 100, // Mock current value
      isActive: true,
      triggered: false,
      createdAt: new Date()
    };

    setAlerts(prev => [alert, ...prev]);
    setNewAlert({ symbol: '', type: 'price', condition: 'above', value: 0 });
  };

  const toggleAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, isActive: !alert.isActive }
        : alert
    ));
  };

  const deleteAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'price': return <TrendingUp className="w-4 h-4" />;
      case 'volume': return <Volume2 className="w-4 h-4" />;
      case 'technical': return <TrendingUp className="w-4 h-4" />;
      case 'news': return <Bell className="w-4 h-4" />;
    }
  };

  const getStatusColor = (alert: Alert) => {
    if (alert.triggered) return 'bg-green-500/20 text-green-400';
    if (!alert.isActive) return 'bg-slate-500/20 text-slate-400';
    return 'bg-blue-500/20 text-blue-400';
  };

  const getStatusText = (alert: Alert) => {
    if (alert.triggered) return 'Triggered';
    if (!alert.isActive) return 'Inactive';
    return 'Active';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-950/80 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-cyan-400" />
            Alert System
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Create New Alert */}
          <Card className="bg-slate-800/30 border-slate-700/30 mb-6">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create New Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Label className="text-slate-300">Symbol</Label>
                  <Input
                    value={newAlert.symbol}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, symbol: e.target.value }))}
                    placeholder="NVDA"
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
                
                <div>
                  <Label className="text-slate-300">Type</Label>
                  <Select value={newAlert.type} onValueChange={(value) => setNewAlert(prev => ({ ...prev, type: value as Alert['type'] }))}>
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="volume">Volume</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="news">News</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-slate-300">Condition</Label>
                  <Select value={newAlert.condition} onValueChange={(value) => setNewAlert(prev => ({ ...prev, condition: value }))}>
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="above">Above</SelectItem>
                      <SelectItem value="below">Below</SelectItem>
                      <SelectItem value="crosses">Crosses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-slate-300">Value</Label>
                  <Input
                    type="number"
                    value={newAlert.value || ''}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, value: parseFloat(e.target.value) || 0 }))}
                    placeholder="0"
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
                
                <div className="flex items-end">
                  <Button
                    onClick={createAlert}
                    disabled={!newAlert.symbol || !newAlert.value}
                    className="w-full bg-cyan-600 hover:bg-cyan-700"
                  >
                    Create Alert
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Alerts */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-medium">Active Alerts ({alerts.filter(a => a.isActive && !a.triggered).length})</h3>
            
            {alerts.length === 0 ? (
              <Card className="bg-slate-800/30 border-slate-700/30">
                <CardContent className="p-8 text-center">
                  <Bell className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <div className="text-slate-400">No alerts created yet</div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <Card key={alert.id} className="bg-slate-800/30 border-slate-700/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {getAlertIcon(alert.type)}
                            <span className="text-white font-medium">{alert.symbol}</span>
                          </div>
                          
                          <Badge className={getStatusColor(alert)}>
                            {getStatusText(alert)}
                          </Badge>
                          
                          <div className="text-slate-300 text-sm">
                            {alert.type} {alert.condition} {alert.value.toLocaleString()}
                          </div>
                          
                          <div className="text-slate-400 text-sm">
                            Current: {alert.currentValue.toLocaleString()}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-400 text-sm">
                              {alert.triggeredAt ? alert.triggeredAt.toLocaleDateString() : alert.createdAt.toLocaleDateString()}
                            </span>
                          </div>
                          
                          <Switch
                            checked={alert.isActive}
                            onCheckedChange={() => toggleAlert(alert.id)}
                          />
                          
                          <Button
                            onClick={() => deleteAlert(alert.id)}
                            size="sm"
                            variant="destructive"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertSystem;

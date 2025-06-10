
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Bell, Mail, TrendingUp } from 'lucide-react';
import { UserPreferences } from '@/hooks/useProfile';

interface PreferencesFormProps {
  preferences: UserPreferences | null;
  onUpdate: (updates: Partial<UserPreferences>) => Promise<any>;
  loading: boolean;
}

const PreferencesForm = ({ preferences, onUpdate, loading }: PreferencesFormProps) => {
  const [formData, setFormData] = useState({
    notifications_enabled: preferences?.notifications_enabled ?? true,
    email_updates: preferences?.email_updates ?? true,
    trading_alerts: preferences?.trading_alerts ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(formData);
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-purple-400" />
          Preferences
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-yellow-400" />
                <div>
                  <Label className="text-white font-medium">Push Notifications</Label>
                  <p className="text-sm text-slate-400">Receive notifications in your browser</p>
                </div>
              </div>
              <Switch
                checked={formData.notifications_enabled}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, notifications_enabled: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <div>
                  <Label className="text-white font-medium">Email Updates</Label>
                  <p className="text-sm text-slate-400">Receive platform updates via email</p>
                </div>
              </div>
              <Switch
                checked={formData.email_updates}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, email_updates: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <div>
                  <Label className="text-white font-medium">Trading Alerts</Label>
                  <p className="text-sm text-slate-400">Get notified about price changes and opportunities</p>
                </div>
              </div>
              <Switch
                checked={formData.trading_alerts}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, trading_alerts: checked })
                }
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white"
          >
            {loading ? 'Saving...' : 'Save Preferences'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PreferencesForm;


import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import MainLayout from '@/components/Layout/MainLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import ProfileForm from '@/components/Profile/ProfileForm';
import PreferencesForm from '@/components/Profile/PreferencesForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Calendar, Shield, Award } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const { profile, preferences, loading, updateProfile, updatePreferences } = useProfile(user);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <ProtectedRoute>
      <MainLayout activeTab="" setActiveTab={() => {}}>
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Profile Settings
              </h1>
              <p className="text-slate-400 text-lg">
                Manage your account information and preferences
              </p>
            </div>

            {/* Account Overview */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-cyan-400" />
                  Account Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Member Since</p>
                      <p className="text-white font-medium">
                        {profile?.created_at ? formatDate(profile.created_at) : 'Just now'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Account Status</p>
                      <div className="flex items-center gap-2">
                        <p className="text-white font-medium">Active</p>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          Verified
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-600/20 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Total Earnings</p>
                      <div className="flex items-center gap-2">
                        <p className="text-white font-medium">
                          ${profile?.total_earnings?.toFixed(2) || '0.00'}
                        </p>
                        <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30">
                          Developer
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile and Preferences Forms */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ProfileForm
                profile={profile}
                onUpdate={updateProfile}
                loading={loading}
              />
              
              <PreferencesForm
                preferences={preferences}
                onUpdate={updatePreferences}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default Profile;

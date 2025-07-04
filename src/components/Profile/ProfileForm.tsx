
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, MapPin, Building, Globe, Camera } from 'lucide-react';
import { UserProfile } from '@/hooks/useProfile';

interface ProfileFormProps {
  profile: UserProfile | null;
  onUpdate: (updates: Partial<UserProfile>) => Promise<any>;
  loading: boolean;
}

const ProfileForm = ({ profile, onUpdate, loading }: ProfileFormProps) => {
  const [formData, setFormData] = useState({
    username: profile?.username || '',
    full_name: profile?.full_name || '',
    bio: profile?.bio || '',
    company: profile?.company || '',
    website: profile?.website || '',
    github_username: profile?.github_username || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(formData);
  };

  const getInitials = () => {
    const name = formData.full_name || profile?.full_name || '';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <User className="w-5 h-5 text-cyan-400" />
          Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24 border-2 border-cyan-500/30">
                <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xl">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <Button
                type="button"
                size="icon"
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-cyan-500 hover:bg-cyan-600 rounded-full"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <Label htmlFor="username" className="text-slate-300">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Enter username"
                className="bg-slate-800 border-slate-600 text-white mt-1"
              />
            </div>
          </div>

          {/* Basic Information */}
          <div>
            <Label htmlFor="full_name" className="text-slate-300">Full Name</Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              placeholder="Enter your full name"
              className="bg-slate-800 border-slate-600 text-white mt-1"
            />
          </div>

          {/* Professional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company" className="text-slate-300 flex items-center gap-1">
                <Building className="w-4 h-4" />
                Company
              </Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Company name"
                className="bg-slate-800 border-slate-600 text-white mt-1"
              />
            </div>
            <div>
              <Label htmlFor="website" className="text-slate-300 flex items-center gap-1">
                <Globe className="w-4 h-4" />
                Website
              </Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://your-website.com"
                className="bg-slate-800 border-slate-600 text-white mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="github_username" className="text-slate-300">GitHub Username</Label>
            <Input
              id="github_username"
              value={formData.github_username}
              onChange={(e) => setFormData({ ...formData, github_username: e.target.value })}
              placeholder="your-github-username"
              className="bg-slate-800 border-slate-600 text-white mt-1"
            />
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor="bio" className="text-slate-300">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell us about yourself..."
              className="bg-slate-800 border-slate-600 text-white mt-1 h-24"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;

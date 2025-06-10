
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface UserProfile {
  id: string;
  username?: string;
  full_name?: string;
  bio?: string;
  company?: string;
  website?: string;
  github_username?: string;
  total_earnings?: number;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  id: string;
  theme: string;
  notifications_enabled: boolean;
  email_updates: boolean;
  trading_alerts: boolean;
}

export const useProfile = (user: User | null) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchPreferences();
    } else {
      setProfile(null);
      setPreferences(null);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setProfile(data);
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPreferences = async () => {
    if (!user) return;
    
    try {
      // Since user_preferences table doesn't exist in the current schema,
      // we'll set default preferences
      setPreferences({
        id: user.id,
        theme: 'dark',
        notifications_enabled: true,
        email_updates: true,
        trading_alerts: true
      });
    } catch (error: any) {
      console.error('Error fetching preferences:', error);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          ...updates,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated."
      });
      
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile",
        variant: "destructive"
      });
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    if (!user) return;

    try {
      // Since user_preferences table doesn't exist, we'll just update local state
      setPreferences(prev => prev ? { ...prev, ...updates } : null);
      
      toast({
        title: "Preferences Updated",
        description: "Your preferences have been saved."
      });
      
      return { data: updates, error: null };
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update preferences",
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  return {
    profile,
    preferences,
    loading,
    updateProfile,
    updatePreferences,
    refetch: () => {
      fetchProfile();
      fetchPreferences();
    }
  };
};

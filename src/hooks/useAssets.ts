
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Asset {
  id: string;
  name: string;
  description: string;
  asset_type: string;
  license_type: string;
  ticker_symbol: string;
  current_price: number;
  initial_price: number;
  download_count: number;
  api_call_count: number;
  total_revenue: number;
  rating: number;
  rating_count: number;
  tags: string[];
  status: string;
  github_url?: string;
  model_url?: string;
  created_at: string;
  updated_at: string;
  owner_id: string;
}

export const useAssets = () => {
  return useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_assets')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data as Asset[];
    },
  });
};

export const useUserAssets = () => {
  return useQuery({
    queryKey: ['user-assets'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('ai_assets')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data as Asset[];
    },
    enabled: false, // Only fetch when user is authenticated
  });
};

export const useAssetById = (id: string) => {
  return useQuery({
    queryKey: ['asset', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_assets')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      return data as Asset;
    },
    enabled: !!id,
  });
};


import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useDashboard = () => {
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDeleteAsset = async (assetId: string, refetch: () => void) => {
    setDeletingId(assetId);
    
    try {
      const { error } = await supabase
        .from('ai_assets')
        .delete()
        .eq('id', assetId);

      if (error) throw error;

      toast({
        title: "Asset Deleted",
        description: "Your asset has been successfully removed from the marketplace."
      });

      refetch();
    } catch (error: any) {
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete asset.",
        variant: "destructive"
      });
    } finally {
      setDeletingId(null);
    }
  };

  return {
    handleDeleteAsset,
    deletingId
  };
};

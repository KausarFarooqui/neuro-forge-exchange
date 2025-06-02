
import { supabase } from '@/integrations/supabase/client';

export const initializeStorage = async () => {
  // Check if bucket exists, if not create it
  const { data: buckets } = await supabase.storage.listBuckets();
  
  const bucketExists = buckets?.find(bucket => bucket.name === 'ai-assets');
  
  if (!bucketExists) {
    const { error } = await supabase.storage.createBucket('ai-assets', {
      public: true,
      allowedMimeTypes: ['*']
    });
    
    if (error) {
      console.error('Error creating storage bucket:', error);
    }
  }
};

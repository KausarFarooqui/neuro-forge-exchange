
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AssetFormData {
  name: string;
  description: string;
  asset_type: string;
  license_type: string;
  custom_license_terms: string;
  github_url: string;
  model_url: string;
  initial_price: string;
  tags: string[];
}

export const useAssetUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `assets/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('ai-assets')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    return filePath;
  };

  const generateTickerSymbol = async (name: string) => {
    const { data, error } = await supabase.rpc('generate_ticker_symbol', {
      asset_name: name
    });

    if (error) {
      console.error('Error generating ticker:', error);
      return name.substring(0, 6).toUpperCase();
    }

    return data;
  };

  const uploadAsset = async (formData: AssetFormData, file: File | null) => {
    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to upload assets.",
          variant: "destructive"
        });
        return;
      }

      let filePath = '';
      if (file) {
        filePath = await handleFileUpload(file);
      }

      const tickerSymbol = await generateTickerSymbol(formData.name);

      const { data, error } = await supabase
        .from('ai_assets')
        .insert([{
          owner_id: user.id,
          name: formData.name,
          description: formData.description,
          asset_type: formData.asset_type as any,
          license_type: formData.license_type as any,
          custom_license_terms: formData.custom_license_terms || null,
          github_url: formData.github_url || null,
          model_url: formData.model_url || null,
          file_path: filePath || null,
          initial_price: parseFloat(formData.initial_price),
          current_price: parseFloat(formData.initial_price),
          ticker_symbol: tickerSymbol,
          tags: formData.tags
        }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Asset Uploaded Successfully!",
        description: `Your asset "${formData.name}" has been submitted for review with ticker symbol ${tickerSymbol}.`
      });

      navigate('/dashboard');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload asset. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadAsset,
    uploading
  };
};


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Github, Link, DollarSign, Tag, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AssetUploadForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    asset_type: '',
    license_type: '',
    custom_license_terms: '',
    github_url: '',
    model_url: '',
    initial_price: '10.00',
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const assetTypes = [
    { value: 'model', label: 'AI Model' },
    { value: 'dataset', label: 'Dataset' },
    { value: 'api', label: 'API' },
    { value: 'framework', label: 'Framework' },
    { value: 'tool', label: 'Tool' },
    { value: 'company_share', label: 'Company Share' }
  ];

  const licenseTypes = [
    { value: 'mit', label: 'MIT License' },
    { value: 'apache', label: 'Apache 2.0' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'proprietary', label: 'Proprietary' },
    { value: 'cc0', label: 'CC0 (Public Domain)' },
    { value: 'custom', label: 'Custom License' }
  ];

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        .insert({
          owner_id: user.id,
          name: formData.name,
          description: formData.description,
          asset_type: formData.asset_type,
          license_type: formData.license_type,
          custom_license_terms: formData.custom_license_terms || null,
          github_url: formData.github_url || null,
          model_url: formData.model_url || null,
          file_path: filePath || null,
          initial_price: parseFloat(formData.initial_price),
          current_price: parseFloat(formData.initial_price),
          ticker_symbol: tickerSymbol,
          tags: formData.tags
        })
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-4">
            Upload AI Asset
          </h1>
          <p className="text-slate-300 text-lg">
            List your AI model, dataset, or tool on the NeuroStock exchange
          </p>
        </div>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Asset Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Asset Name *</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., GPT-4 Vision Model"
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Asset Type *</label>
                  <Select required value={formData.asset_type} onValueChange={(value) => setFormData(prev => ({ ...prev, asset_type: value }))}>
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                      <SelectValue placeholder="Select asset type" />
                    </SelectTrigger>
                    <SelectContent>
                      {assetTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Description *</label>
                <Textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your asset, its capabilities, and use cases..."
                  className="bg-slate-800 border-slate-600 text-white h-32"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">License Type *</label>
                  <Select required value={formData.license_type} onValueChange={(value) => setFormData(prev => ({ ...prev, license_type: value }))}>
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                      <SelectValue placeholder="Select license" />
                    </SelectTrigger>
                    <SelectContent>
                      {licenseTypes.map((license) => (
                        <SelectItem key={license.value} value={license.value}>
                          {license.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Initial Price (USD) *</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      required
                      type="number"
                      step="0.01"
                      min="1"
                      value={formData.initial_price}
                      onChange={(e) => setFormData(prev => ({ ...prev, initial_price: e.target.value }))}
                      className="bg-slate-800 border-slate-600 text-white pl-10"
                    />
                  </div>
                </div>
              </div>

              {formData.license_type === 'custom' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Custom License Terms</label>
                  <Textarea
                    value={formData.custom_license_terms}
                    onChange={(e) => setFormData(prev => ({ ...prev, custom_license_terms: e.target.value }))}
                    placeholder="Specify your custom license terms..."
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">GitHub URL</label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      value={formData.github_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, github_url: e.target.value }))}
                      placeholder="https://github.com/user/repo"
                      className="bg-slate-800 border-slate-600 text-white pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Model/Demo URL</label>
                  <div className="relative">
                    <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      value={formData.model_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, model_url: e.target.value }))}
                      placeholder="https://huggingface.co/model or demo link"
                      className="bg-slate-800 border-slate-600 text-white pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Upload File (Optional)</label>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 bg-slate-800/50">
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  />
                  <p className="text-sm text-slate-400 mt-2">
                    Upload model files, datasets, or documentation (Max 100MB)
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Tags</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Add tags (e.g., NLP, Computer Vision, GPT)"
                      className="bg-slate-800 border-slate-600 text-white pl-10"
                    />
                  </div>
                  <Button type="button" onClick={addTag} variant="outline" className="border-slate-600">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-blue-500/20 text-blue-400 border-blue-500/30 cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {uploading ? 'Uploading...' : 'Submit Asset for Review'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="border-slate-600 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssetUploadForm;

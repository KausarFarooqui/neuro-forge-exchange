
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Github, Link, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AssetTypeSelector from './AssetUpload/AssetTypeSelector';
import LicenseTypeSelector from './AssetUpload/LicenseTypeSelector';
import TagManager from './AssetUpload/TagManager';
import FileUploadArea from './AssetUpload/FileUploadArea';
import NavigationHeader from './NavigationHeader';
import ProtectedRoute from './ProtectedRoute';
import { useAssetUpload, type AssetFormData } from '@/hooks/useAssetUpload';

const AssetUploadForm = () => {
  const navigate = useNavigate();
  const { uploadAsset, uploading } = useAssetUpload();
  const [formData, setFormData] = useState<AssetFormData>({
    name: '',
    description: '',
    asset_type: '',
    license_type: '',
    custom_license_terms: '',
    github_url: '',
    model_url: '',
    initial_price: '10.00',
    tags: [],
  });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await uploadAsset(formData, file);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <NavigationHeader activeTab="" setActiveTab={() => {}} />
        
        <div className="container mx-auto px-4 py-8 max-w-4xl">
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

                  <AssetTypeSelector
                    value={formData.asset_type}
                    onChange={(value) => setFormData(prev => ({ ...prev, asset_type: value }))}
                  />
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
                  <LicenseTypeSelector
                    value={formData.license_type}
                    onChange={(value) => setFormData(prev => ({ ...prev, license_type: value }))}
                  />

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

                <FileUploadArea onFileChange={setFile} />

                <TagManager
                  tags={formData.tags}
                  onTagsChange={(tags) => setFormData(prev => ({ ...prev, tags }))}
                />

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
    </ProtectedRoute>
  );
};

export default AssetUploadForm;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Github, Link, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import AssetTypeSelector from './AssetUpload/AssetTypeSelector';
import LicenseTypeSelector from './AssetUpload/LicenseTypeSelector';
import TagManager from './AssetUpload/TagManager';
import FileUploadArea from './AssetUpload/FileUploadArea';
import NavigationHeader from './NavigationHeader';
import ProtectedRoute from './ProtectedRoute';
import { useAssetUpload, type AssetFormData } from '@/hooks/useAssetUpload';
import { useToast } from '@/hooks/use-toast';

const AssetUploadForm = () => {
  const navigate = useNavigate();
  const { uploadAsset, uploading } = useAssetUpload();
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState<'form' | 'uploading' | 'processing' | 'complete'>('form');
  
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

  const simulateUpload = async () => {
    setUploadStage('uploading');
    
    // Simulate file upload progress
    for (let i = 0; i <= 60; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setUploadStage('processing');
    
    // Simulate processing
    for (let i = 60; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    setUploadStage('complete');
    
    toast({
      title: "Asset Uploaded Successfully!",
      description: `${formData.name} has been submitted for review and will be available for trading soon.`,
    });
    
    // Redirect after success
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.description || !formData.asset_type || !formData.license_type) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      // Simulate the upload process
      await simulateUpload();
      
      // You can also call the real upload function here
      // await uploadAsset(formData, file);
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Something went wrong during upload. Please try again.",
        variant: "destructive"
      });
      setUploadStage('form');
      setUploadProgress(0);
    }
  };

  const renderUploadStage = () => {
    switch (uploadStage) {
      case 'uploading':
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8 text-blue-400 animate-bounce" />
            </div>
            <h3 className="text-xl font-semibold text-white">Uploading Asset</h3>
            <p className="text-slate-400">Uploading your files to the platform...</p>
            <Progress value={uploadProgress} className="w-full max-w-md mx-auto" />
            <p className="text-sm text-slate-500">{uploadProgress}% complete</p>
          </div>
        );
        
      case 'processing':
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-purple-400 animate-spin" />
            </div>
            <h3 className="text-xl font-semibold text-white">Processing Asset</h3>
            <p className="text-slate-400">Analyzing and preparing your asset for the marketplace...</p>
            <Progress value={uploadProgress} className="w-full max-w-md mx-auto" />
            <p className="text-sm text-slate-500">Creating trading ticker and market listing...</p>
          </div>
        );
        
      case 'complete':
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Upload Complete!</h3>
            <p className="text-slate-400">Your asset has been successfully submitted and will be available for trading soon.</p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-green-400 text-sm">
                Your asset "{formData.name}" is now under review and will be listed on the exchange within 24 hours.
              </p>
            </div>
            <p className="text-slate-500 text-sm">Redirecting to main page...</p>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <NavigationHeader activeTab="" setActiveTab={() => {}} />
        
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-4">
              Launch Your AI Asset
            </h1>
            <p className="text-slate-300 text-lg">
              List your AI model, dataset, or tool on the NeuroStock exchange and start earning from trades
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
              {uploadStage !== 'form' ? (
                <div className="py-12">
                  {renderUploadStage()}
                </div>
              ) : (
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

                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                    <h4 className="text-cyan-400 font-medium mb-2">📈 Trading Information</h4>
                    <p className="text-slate-300 text-sm">
                      Once approved, your asset will be assigned a unique ticker symbol and will be available for trading on NeuroStock. 
                      You'll earn royalties from each trade and can track your asset's performance in real-time.
                    </p>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg"
                    >
                      {uploading ? 'Uploading...' : 'Launch Asset on Exchange'}
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
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AssetUploadForm;

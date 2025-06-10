
import { useState } from 'react';
import { Upload, Github, Link, DollarSign, Sparkles, Shield, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import AssetTypeSelector from './AssetTypeSelector';
import LicenseTypeSelector from './LicenseTypeSelector';
import TagManager from './TagManager';
import FileUploadArea from './FileUploadArea';
import { type AssetFormData } from '@/hooks/useAssetUpload';

interface ProfessionalUploadFormProps {
  formData: AssetFormData;
  setFormData: (data: AssetFormData | ((prev: AssetFormData) => AssetFormData)) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  uploading: boolean;
}

const ProfessionalUploadForm = ({ 
  formData, 
  setFormData, 
  file, 
  setFile, 
  onSubmit, 
  uploading 
}: ProfessionalUploadFormProps) => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    const errors = { ...validationErrors };
    
    switch (field) {
      case 'name':
        if (!value.trim()) {
          errors.name = 'Asset name is required';
        } else if (value.length < 3) {
          errors.name = 'Asset name must be at least 3 characters';
        } else {
          delete errors.name;
        }
        break;
      case 'description':
        if (!value.trim()) {
          errors.description = 'Description is required';
        } else if (value.length < 50) {
          errors.description = 'Description must be at least 50 characters';
        } else {
          delete errors.description;
        }
        break;
      case 'initial_price':
        const price = parseFloat(value);
        if (isNaN(price) || price < 1) {
          errors.initial_price = 'Price must be at least $1.00';
        } else if (price > 10000) {
          errors.initial_price = 'Price cannot exceed $10,000';
        } else {
          delete errors.initial_price;
        }
        break;
    }
    
    setValidationErrors(errors);
  };

  const features = [
    {
      icon: Shield,
      title: "Secure & Verified",
      description: "All assets are reviewed and verified by our AI security systems"
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Track your asset's performance with detailed analytics and insights"
    },
    {
      icon: Sparkles,
      title: "AI-Powered Discovery",
      description: "Our algorithms help the right users discover your innovations"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse shadow-2xl shadow-cyan-500/50">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              Launch Your AI Asset
            </h1>
            <p className="text-slate-400 text-lg">Join the future of AI asset trading</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-3">
          <Badge className="bg-gradient-to-r from-green-500/20 to-green-400/20 text-green-400 border-green-500/30">
            ✓ INSTANT LISTING
          </Badge>
          <Badge className="bg-gradient-to-r from-blue-500/20 to-blue-400/20 text-blue-400 border-blue-500/30">
            AI-VERIFIED
          </Badge>
          <Badge className="bg-gradient-to-r from-purple-500/20 to-purple-400/20 text-purple-400 border-purple-500/30">
            GLOBAL REACH
          </Badge>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="bg-slate-900/30 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Form */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            Asset Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Asset Name *</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((prev: AssetFormData) => ({ ...prev, name: e.target.value }));
                    validateField('name', e.target.value);
                  }}
                  placeholder="e.g., GPT-4 Vision Model"
                  className={`bg-slate-800 border-slate-600 text-white ${
                    validationErrors.name ? 'border-red-500' : ''
                  }`}
                />
                {validationErrors.name && (
                  <p className="text-red-400 text-xs">{validationErrors.name}</p>
                )}
              </div>

              <AssetTypeSelector
                value={formData.asset_type}
                onChange={(value) => setFormData((prev: AssetFormData) => ({ ...prev, asset_type: value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Description *</label>
              <Textarea
                required
                value={formData.description}
                onChange={(e) => {
                  setFormData((prev: AssetFormData) => ({ ...prev, description: e.target.value }));
                  validateField('description', e.target.value);
                }}
                placeholder="Describe your asset's capabilities, use cases, and unique features. Be detailed and specific to attract the right investors..."
                className={`bg-slate-800 border-slate-600 text-white h-32 ${
                  validationErrors.description ? 'border-red-500' : ''
                }`}
              />
              <div className="flex justify-between text-xs">
                {validationErrors.description && (
                  <p className="text-red-400">{validationErrors.description}</p>
                )}
                <p className="text-slate-500 ml-auto">
                  {formData.description.length}/500 characters
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LicenseTypeSelector
                value={formData.license_type}
                onChange={(value) => setFormData((prev: AssetFormData) => ({ ...prev, license_type: value }))}
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
                    max="10000"
                    value={formData.initial_price}
                    onChange={(e) => {
                      setFormData((prev: AssetFormData) => ({ ...prev, initial_price: e.target.value }));
                      validateField('initial_price', e.target.value);
                    }}
                    className={`bg-slate-800 border-slate-600 text-white pl-10 ${
                      validationErrors.initial_price ? 'border-red-500' : ''
                    }`}
                  />
                </div>
                {validationErrors.initial_price && (
                  <p className="text-red-400 text-xs">{validationErrors.initial_price}</p>
                )}
              </div>
            </div>

            {formData.license_type === 'custom' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Custom License Terms</label>
                <Textarea
                  value={formData.custom_license_terms}
                  onChange={(e) => setFormData((prev: AssetFormData) => ({ ...prev, custom_license_terms: e.target.value }))}
                  placeholder="Specify your custom license terms and conditions..."
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">GitHub Repository</label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    value={formData.github_url}
                    onChange={(e) => setFormData((prev: AssetFormData) => ({ ...prev, github_url: e.target.value }))}
                    placeholder="https://github.com/username/repository"
                    className="bg-slate-800 border-slate-600 text-white pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Demo/Model URL</label>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    value={formData.model_url}
                    onChange={(e) => setFormData((prev: AssetFormData) => ({ ...prev, model_url: e.target.value }))}
                    placeholder="https://huggingface.co/model or demo link"
                    className="bg-slate-800 border-slate-600 text-white pl-10"
                  />
                </div>
              </div>
            </div>

            <FileUploadArea onFileChange={setFile} />

            <TagManager
              tags={formData.tags}
              onTagsChange={(tags) => setFormData((prev: AssetFormData) => ({ ...prev, tags }))}
            />

            {/* Professional Info Box */}
            <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-6">
              <h4 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                🚀 Launch Benefits
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p className="text-slate-300">✓ Instant global marketplace access</p>
                  <p className="text-slate-300">✓ Real-time trading & analytics</p>
                  <p className="text-slate-300">✓ Automated royalty payments</p>
                </div>
                <div className="space-y-2">
                  <p className="text-slate-300">✓ AI-powered asset promotion</p>
                  <p className="text-slate-300">✓ Professional trading dashboard</p>
                  <p className="text-slate-300">✓ Community feedback system</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                disabled={uploading || Object.keys(validationErrors).length > 0}
                className="flex-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white shadow-2xl shadow-cyan-500/50 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
              >
                {uploading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Launching Asset...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5" />
                    Launch on NeuroStock Exchange
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalUploadForm;

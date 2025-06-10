
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import ProfessionalUploadForm from './AssetUpload/ProfessionalUploadForm';
import UploadProgressTracker from './AssetUpload/UploadProgressTracker';
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
      title: "🚀 Asset Launched Successfully!",
      description: `${formData.name} is now live on NeuroStock and ready for trading!`,
    });
    
    // Redirect after success
    setTimeout(() => {
      navigate('/');
    }, 4000);
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
        title: "Launch Failed",
        description: "Something went wrong during launch. Please try again.",
        variant: "destructive"
      });
      setUploadStage('form');
      setUploadProgress(0);
    }
  };

  return (
    <ProtectedRoute>
      <MainLayout activeTab="" setActiveTab={() => {}}>
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {uploadStage !== 'form' ? (
            <UploadProgressTracker 
              stage={uploadStage} 
              progress={uploadProgress} 
              assetName={formData.name} 
            />
          ) : (
            <ProfessionalUploadForm
              formData={formData}
              setFormData={setFormData}
              file={file}
              setFile={setFile}
              onSubmit={handleSubmit}
              uploading={uploading}
            />
          )}
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default AssetUploadForm;

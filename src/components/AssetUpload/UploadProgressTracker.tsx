
import { CheckCircle, Clock, AlertCircle, Upload } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface UploadProgressTrackerProps {
  stage: 'form' | 'uploading' | 'processing' | 'complete';
  progress: number;
  assetName: string;
}

const UploadProgressTracker = ({ stage, progress, assetName }: UploadProgressTrackerProps) => {
  const stages = [
    { id: 'form', label: 'Asset Details', icon: Upload },
    { id: 'uploading', label: 'Uploading Files', icon: Clock },
    { id: 'processing', label: 'Processing Asset', icon: AlertCircle },
    { id: 'complete', label: 'Launch Complete', icon: CheckCircle }
  ];

  const getStageStatus = (stageId: string) => {
    const currentIndex = stages.findIndex(s => s.id === stage);
    const stageIndex = stages.findIndex(s => s.id === stageId);
    
    if (stageIndex < currentIndex) return 'complete';
    if (stageIndex === currentIndex) return 'active';
    return 'pending';
  };

  const renderStageContent = () => {
    switch (stage) {
      case 'uploading':
        return (
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
              <Upload className="w-10 h-10 text-blue-400 animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold text-white">Uploading Your AI Asset</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              Securely transferring your files to our neural infrastructure...
            </p>
            <Progress value={progress} className="w-full max-w-md mx-auto h-3" />
            <p className="text-sm text-cyan-400 font-medium">{progress}% complete</p>
          </div>
        );
        
      case 'processing':
        return (
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto">
              <AlertCircle className="w-10 h-10 text-purple-400 animate-spin" />
            </div>
            <h3 className="text-2xl font-bold text-white">Neural Processing in Progress</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              Our AI systems are analyzing your asset and preparing it for the marketplace...
            </p>
            <Progress value={progress} className="w-full max-w-md mx-auto h-3" />
            <div className="space-y-2 text-sm text-slate-500">
              <p>✓ Generating ticker symbol</p>
              <p>✓ Creating market listing</p>
              <p>⏳ Setting up trading parameters</p>
            </div>
          </div>
        );
        
      case 'complete':
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">🚀 Launch Successful!</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              Congratulations! Your AI asset "{assetName}" has been successfully launched on NeuroStock.
            </p>
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6 max-w-md mx-auto">
              <h4 className="text-green-400 font-semibold mb-3">🎯 What happens next?</h4>
              <ul className="text-left text-green-300 text-sm space-y-2">
                <li>• Asset under review (24-48 hours)</li>
                <li>• Ticker symbol assignment</li>
                <li>• Market listing activation</li>
                <li>• Trading notifications enabled</li>
              </ul>
            </div>
            <p className="text-slate-500 text-sm animate-pulse">Redirecting to dashboard...</p>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardContent className="p-8">
        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8">
          {stages.map((stageItem, index) => {
            const Icon = stageItem.icon;
            const status = getStageStatus(stageItem.id);
            
            return (
              <div key={stageItem.id} className="flex flex-col items-center relative">
                {index < stages.length - 1 && (
                  <div className={`absolute top-5 left-10 w-24 h-0.5 ${
                    status === 'complete' ? 'bg-green-500' : 'bg-slate-700'
                  }`} />
                )}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                  status === 'complete' ? 'bg-green-500/20 border-2 border-green-500' :
                  status === 'active' ? 'bg-blue-500/20 border-2 border-blue-500 animate-pulse' :
                  'bg-slate-700/50 border-2 border-slate-600'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    status === 'complete' ? 'text-green-400' :
                    status === 'active' ? 'text-blue-400' :
                    'text-slate-500'
                  }`} />
                </div>
                <span className={`text-xs font-medium ${
                  status === 'complete' ? 'text-green-400' :
                  status === 'active' ? 'text-blue-400' :
                  'text-slate-500'
                }`}>
                  {stageItem.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Stage Content */}
        <div className="py-8">
          {renderStageContent()}
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadProgressTracker;

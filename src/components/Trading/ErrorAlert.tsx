
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Settings } from 'lucide-react';

interface ErrorAlertProps {
  error: string;
  isApiConfigured: boolean;
  onShowApiConfig: () => void;
}

const ErrorAlert = ({ error, isApiConfigured, onShowApiConfig }: ErrorAlertProps) => {
  if (isApiConfigured) return null;

  return (
    <Alert className="mb-6 bg-yellow-500/10 border-yellow-500/30">
      <Settings className="h-4 w-4" />
      <AlertDescription className="text-yellow-400 flex items-center justify-between">
        <span>{error} - Using mock data for demonstration.</span>
        <Button 
          size="sm" 
          variant="outline"
          onClick={onShowApiConfig}
          className="ml-4"
        >
          Configure API
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;


import { Badge } from '@/components/ui/badge';

interface AssetStatusBadgeProps {
  status: string;
}

const AssetStatusBadge = ({ status }: AssetStatusBadgeProps) => {
  const statusConfig = {
    pending: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', label: 'Pending Review' },
    approved: { color: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'Live' },
    rejected: { color: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'Rejected' },
    delisted: { color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', label: 'Delisted' }
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  
  return (
    <Badge className={config.color}>
      {config.label}
    </Badge>
  );
};

export default AssetStatusBadge;

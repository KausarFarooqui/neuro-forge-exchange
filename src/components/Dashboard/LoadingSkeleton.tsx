
import { Card, CardContent } from '@/components/ui/card';

const LoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm animate-pulse">
            <CardContent className="p-6">
              <div className="h-6 bg-slate-700 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-slate-700 rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;

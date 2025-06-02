
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AssetTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const AssetTypeSelector = ({ value, onChange }: AssetTypeSelectorProps) => {
  const assetTypes = [
    { value: 'model', label: 'AI Model' },
    { value: 'dataset', label: 'Dataset' },
    { value: 'api', label: 'API' },
    { value: 'framework', label: 'Framework' },
    { value: 'tool', label: 'Tool' },
    { value: 'company_share', label: 'Company Share' }
  ];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-300">Asset Type *</label>
      <Select required value={value} onValueChange={onChange}>
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
  );
};

export default AssetTypeSelector;

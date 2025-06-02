
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LicenseTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const LicenseTypeSelector = ({ value, onChange }: LicenseTypeSelectorProps) => {
  const licenseTypes = [
    { value: 'mit', label: 'MIT License' },
    { value: 'apache', label: 'Apache 2.0' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'proprietary', label: 'Proprietary' },
    { value: 'cc0', label: 'CC0 (Public Domain)' },
    { value: 'custom', label: 'Custom License' }
  ];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-300">License Type *</label>
      <Select required value={value} onValueChange={onChange}>
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
  );
};

export default LicenseTypeSelector;

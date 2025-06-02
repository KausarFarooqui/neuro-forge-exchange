
interface FileUploadAreaProps {
  onFileChange: (file: File | null) => void;
}

const FileUploadArea = ({ onFileChange }: FileUploadAreaProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-300">Upload File (Optional)</label>
      <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 bg-slate-800/50">
        <input
          type="file"
          onChange={(e) => onFileChange(e.target.files?.[0] || null)}
          className="w-full text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />
        <p className="text-sm text-slate-400 mt-2">
          Upload model files, datasets, or documentation (Max 100MB)
        </p>
      </div>
    </div>
  );
};

export default FileUploadArea;

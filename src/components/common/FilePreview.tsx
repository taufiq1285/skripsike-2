/**
 * File Preview Component - AKBID Lab System
 * Security: Safe file preview, no executable content
 * Status: Template ready
 */
interface FilePreviewProps {
  file: File | null;
  onRemove: () => void;
}

export const FilePreview = ({ file, onRemove }: FilePreviewProps) => {
  if (!file) return null;

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return 'Ì∂ºÔ∏è';
    if (type.includes('pdf')) return 'Ì≥Ñ';
    if (type.includes('document') || type.includes('word')) return 'Ì≥ù';
    if (type.includes('spreadsheet') || type.includes('excel')) return 'Ì≥ä';
    return 'Ì≥é';
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{getFileIcon(file.type)}</span>
        <div>
          <p className="text-sm font-medium text-gray-900">{file.name}</p>
          <p className="text-xs text-gray-500">
            {Math.round(file.size / 1024)} KB
          </p>
        </div>
      </div>
      
      <button
        onClick={onRemove}
        className="text-red-500 hover:text-red-700 p-1"
      >
        ‚úï
      </button>
    </div>
  );
};

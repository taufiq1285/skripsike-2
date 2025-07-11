/**
 * File Download Component - AKBID Lab System
 * Security: Secure download links, access control
 * Status: Template ready
 */
import { Button } from '../ui/Button';

interface FileDownloadProps {
  fileName: string;
  fileUrl: string;
  fileSize?: number;
}

export const FileDownload = ({ fileName, fileUrl, fileSize }: FileDownloadProps) => {
  const handleDownload = () => {
    // SECURITY: Validate file access permissions
    // TODO: Add authorization check
    
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center space-x-3">
        <span className="text-xl">í³Ž</span>
        <div>
          <p className="font-medium">{fileName}</p>
          {fileSize && (
            <p className="text-sm text-gray-500">
              {Math.round(fileSize / 1024)} KB
            </p>
          )}
        </div>
      </div>
      
      <Button size="sm" onClick={handleDownload}>
        Download
      </Button>
    </div>
  );
};

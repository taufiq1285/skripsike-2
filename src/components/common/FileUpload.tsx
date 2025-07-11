/**
 * File Upload Component - AKBID Lab System
 * Security: File type validation, size limits, virus scanning needed
 * Status: Template ready
 */
import { useState, useRef } from 'react';
import { ENV } from '../../lib/constants/env';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
}

export const FileUpload = ({ 
  onFileSelect,
  accept,
  maxSize = ENV.MAX_FILE_SIZE,
  multiple = false
}: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    // SECURITY: Validate file type and size
    const file = files[0];
    
    if (file.size > maxSize) {
      alert(`File too large. Maximum size: ${maxSize / 1024 / 1024}MB`);
      return;
    }

    onFileSelect(file);
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive ? 'border-akbid-500 bg-akbid-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          onChange={handleChange}
          accept={accept}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="text-center">
          <div className="text-4xl mb-4">📁</div>
          <p className="text-lg font-medium text-gray-900 mb-2">
            Drop files here or click to browse
          </p>
          <p className="text-sm text-gray-500">
            Maximum file size: {Math.round(maxSize / 1024 / 1024)}MB
          </p>
        </div>
      </div>
    </div>
  );
};
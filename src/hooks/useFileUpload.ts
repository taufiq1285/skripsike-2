/**
 * useFileUpload Hook - AKBID Lab System
 * Security: File validation, type checking, size limits
 * Status: Ready for implementation
 */
import { useState, useCallback } from 'react';
import { ENV } from '../lib/constants/env';

interface UseFileUploadOptions {
  maxSize?: number;
  allowedTypes?: string[];
  multiple?: boolean;
  onUpload?: (file: File) => Promise<string>;
}

export const useFileUpload = ({
  maxSize = ENV.MAX_FILE_SIZE,
  allowedTypes = ENV.ALLOWED_FILE_TYPES,
  multiple = false,
  onUpload,
}: UseFileUploadOptions = {}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const validateFile = useCallback((file: File): string | null => {
    // SECURITY: File size validation
    if (file.size > maxSize) {
      return `File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`;
    }

    // SECURITY: File type validation
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (fileExtension && !allowedTypes.includes(fileExtension)) {
      return `File type .${fileExtension} is not allowed`;
    }

    // SECURITY: Additional file validation
    if (!file.type && fileExtension) {
      // Check MIME type for security
      const allowedMimes = {
        'pdf': 'application/pdf',
        'doc': 'application/msword',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
      };
      
      const expectedMime = allowedMimes[fileExtension as keyof typeof allowedMimes];
      if (expectedMime && file.type !== expectedMime) {
        return 'File type mismatch detected';
      }
    }

    return null;
  }, [maxSize, allowedTypes]);

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const validFiles: File[] = [];
    
    for (const file of fileArray) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      validFiles.push(file);
    }

    if (!multiple && validFiles.length > 1) {
      setError('Only one file is allowed');
      return;
    }

    setFiles(prev => multiple ? [...prev, ...validFiles] : validFiles);
    setError(null);
  }, [multiple, validateFile]);

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const uploadFiles = useCallback(async () => {
    if (!onUpload || files.length === 0) return;

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const urls: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = await onUpload(file);
        urls.push(url);
        
        // Update progress
        setProgress(((i + 1) / files.length) * 100);
      }

      setUploadedUrls(urls);
      setFiles([]); // Clear files after upload
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }, [files, onUpload]);

  const reset = useCallback(() => {
    setFiles([]);
    setUploading(false);
    setProgress(0);
    setError(null);
    setUploadedUrls([]);
  }, []);

  return {
    files,
    uploading,
    progress,
    error,
    uploadedUrls,
    addFiles,
    removeFile,
    uploadFiles,
    reset,
    hasFiles: files.length > 0,
    canUpload: files.length > 0 && !uploading,
  };
};

/**
 * useFileDownload Hook - AKBID Lab System
 * Security: Secure download, access validation
 * Status: Ready for implementation
 */
import { useState, useCallback } from 'react';

interface UseFileDownloadOptions {
  onBeforeDownload?: (url: string) => Promise<boolean>;
}

export const useFileDownload = ({ onBeforeDownload }: UseFileDownloadOptions = {}) => {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const downloadFile = useCallback(async (url: string, filename?: string) => {
    setDownloading(url);
    setError(null);

    try {
      // SECURITY: Validate download permissions
      if (onBeforeDownload) {
        const canDownload = await onBeforeDownload(url);
        if (!canDownload) {
          throw new Error('Download not authorized');
        }
      }

      // SECURITY: Validate URL format
      if (!url.startsWith('http') && !url.startsWith('/')) {
        throw new Error('Invalid file URL');
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Download failed: ${response.statusText}`);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename || url.split('/').pop() || 'download';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(downloadUrl);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed');
    } finally {
      setDownloading(null);
    }
  }, [onBeforeDownload]);

  const isDownloading = useCallback((url: string) => {
    return downloading === url;
  }, [downloading]);

  return {
    downloadFile,
    isDownloading,
    downloading: !!downloading,
    error,
  };
};

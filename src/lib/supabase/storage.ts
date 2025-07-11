/**
 * Supabase Storage - AKBID Lab System
 * Security: Secure file operations, access validation
 * Status: Template ready for implementation
 */
import { supabase } from './client';

export const storage = {
  // Upload file to storage
  upload: async (bucket: string, path: string, file: File) => {
    // SECURITY: Validate file before upload
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;
    return data;
  },

  // Download file from storage
  download: async (bucket: string, path: string) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(path);

    if (error) throw error;
    return data;
  },

  // Get public URL for file
  getPublicUrl: (bucket: string, path: string) => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  },

  // Remove file from storage
  remove: async (bucket: string, paths: string[]) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove(paths);

    if (error) throw error;
    return data;
  },

  // List files in bucket
  list: async (bucket: string, folder?: string) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder);

    if (error) throw error;
    return data;
  },

  // Buckets for the application
  buckets: {
    avatars: 'avatars',
    documents: 'documents',
    reports: 'reports',
    materials: 'materials',
  },
};

export default storage;

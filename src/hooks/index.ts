/**
 * Hooks Barrel Export - AKBID Lab System
 * Security: Centralized hook exports
 * Status: Complete
 */

// Authentication & User hooks
export { useAuth } from './useAuth';
export { useSupabase } from './useSupabase';
export { useRole } from './useRole';
export { usePermissions } from './usePermissions';

// Form & Input hooks
export { useForm } from './useForm';
export { useDebounce, useDebouncedCallback } from './useDebounce';

// File management hooks
export { useFileUpload } from './useFileUpload';
export { useFileDownload } from './useFileDownload';

// UI & UX hooks
export { usePagination } from './usePagination';
export { useLocalStorage } from './useLocalStorage';
export { useNotification } from './useNotification';
export { useRoleSwitch } from './useRoleSwitch';
export { useNetworkStatus } from './useNetworkStatus';

// Re-export commonly used hook types
export type { UseFormOptions } from './useForm';
export type { UseFileUploadOptions } from './useFileUpload';
export type { UseFileDownloadOptions } from './useFileDownload';
export type { UsePaginationOptions } from './usePagination';

/**
 * App Constants - AKBID Lab System
 * Security: Safe constant definitions
 * Status: Ready
 */

export const APP_CONFIG = {
  NAME: 'AKBID Lab System',
  VERSION: '1.0.0',
  DESCRIPTION: 'Sistem Manajemen Laboratorium AKBID',
  AUTHOR: 'AKBID Lab System Team',
  
  // API Configuration
  API_TIMEOUT: 10000, // 10 seconds
  API_RETRY_COUNT: 3,
  
  // File Upload
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'jpg', 'jpeg', 'png', 'gif'],
  
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  
  // Search
  MIN_SEARCH_LENGTH: 2,
  SEARCH_DEBOUNCE_MS: 300,
  
  // Session
  SESSION_TIMEOUT: 8 * 60 * 60 * 1000, // 8 hours
  REMEMBER_ME_DURATION: 30 * 24 * 60 * 60 * 1000, // 30 days
} as const;

export default APP_CONFIG;

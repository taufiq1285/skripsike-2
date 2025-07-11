export const ENV = {
  // Application
  APP_NAME: import.meta.env.VITE_APP_NAME || 'AKBID Lab System',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  APP_DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION || 'Sistem Manajemen Laboratorium AKBID',

  // Environment Detection
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  VITE_ENV: import.meta.env.VITE_ENV || 'development',
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,

  // Supabase
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  SUPABASE_SERVICE_ROLE_KEY: import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '',

  // Database
  DATABASE_SCHEMA: import.meta.env.VITE_DATABASE_SCHEMA || 'public',

  // Security
  JWT_SECRET: import.meta.env.VITE_JWT_SECRET || '',
  ENCRYPTION_KEY: import.meta.env.VITE_ENCRYPTION_KEY || '',

  // File Storage
  MAX_FILE_SIZE: Number(import.meta.env.VITE_MAX_FILE_SIZE) || 10485760, // 10MB
  ALLOWED_FILE_TYPES: (import.meta.env.VITE_ALLOWED_FILE_TYPES || 'pdf,doc,docx,xls,xlsx,ppt,pptx,jpg,jpeg,png,gif').split(','),

  // Development Features
  DEV_MODE: import.meta.env.VITE_DEV_MODE === 'true',
  DEV_TOOLBAR: import.meta.env.VITE_DEV_TOOLBAR === 'true',
  DEV_ROLE_SWITCH: import.meta.env.VITE_DEV_ROLE_SWITCH === 'true',
  DEV_QUICK_LOGIN: import.meta.env.VITE_DEV_QUICK_LOGIN === 'true',

  // PWA
  PWA_ENABLED: import.meta.env.VITE_PWA_ENABLED === 'true',
  PWA_CACHE_NAME: import.meta.env.VITE_PWA_CACHE_NAME || 'akbid-lab-cache-v1',

  // API
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  API_RETRY_COUNT: Number(import.meta.env.VITE_API_RETRY_COUNT) || 3,

  // Logging
  LOG_LEVEL: import.meta.env.VITE_LOG_LEVEL || 'debug',
  LOG_CONSOLE: import.meta.env.VITE_LOG_CONSOLE === 'true',

  // Performance
  PAGINATION_SIZE: Number(import.meta.env.VITE_PAGINATION_SIZE) || 10,
  SEARCH_DEBOUNCE: Number(import.meta.env.VITE_SEARCH_DEBOUNCE) || 300,

  // Lab Configuration
  LAB_COUNT: Number(import.meta.env.VITE_LAB_COUNT) || 9,
  DEPO_COUNT: Number(import.meta.env.VITE_DEPO_COUNT) || 1,
  MAX_CONCURRENT_BOOKINGS: Number(import.meta.env.VITE_MAX_CONCURRENT_BOOKINGS) || 3,

  // Notification
  NOTIFICATION_TIMEOUT: Number(import.meta.env.VITE_NOTIFICATION_TIMEOUT) || 5000,
  NOTIFICATION_POSITION: import.meta.env.VITE_NOTIFICATION_POSITION || 'top-right',
} as const;

// Environment Validation
export const validateEnv = () => {
  const errors: string[] = [];

  // Required in production
  if (ENV.IS_PROD) {
    if (!ENV.SUPABASE_URL) errors.push('VITE_SUPABASE_URL is required');
    if (!ENV.SUPABASE_ANON_KEY) errors.push('VITE_SUPABASE_ANON_KEY is required');
    if (!ENV.JWT_SECRET) errors.push('VITE_JWT_SECRET is required');
  }

  // Required in development
  if (ENV.IS_DEV) {
    if (!ENV.SUPABASE_URL) console.warn('⚠️  VITE_SUPABASE_URL is not set - some features may not work');
    if (!ENV.SUPABASE_ANON_KEY) console.warn('⚠️  VITE_SUPABASE_ANON_KEY is not set - authentication will not work');
  }

  if (errors.length > 0) {
    throw new Error(`Environment validation failed:\n${errors.join('\n')}`);
  }
};

// Environment Info Display
export const getEnvInfo = () => {
  return {
    environment: ENV.VITE_ENV,
    version: ENV.APP_VERSION,
    isDev: ENV.IS_DEV,
    isProd: ENV.IS_PROD,
    devMode: ENV.DEV_MODE,
    pwaEnabled: ENV.PWA_ENABLED,
    supabaseConfigured: Boolean(ENV.SUPABASE_URL && ENV.SUPABASE_ANON_KEY),
    timestamp: new Date().toISOString(),
  };
};

// Export types for type safety
export type EnvConfig = typeof ENV;
export type EnvKey = keyof EnvConfig;
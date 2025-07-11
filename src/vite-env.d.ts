/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_DESCRIPTION: string;
  readonly VITE_ENV: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_SUPABASE_SERVICE_ROLE_KEY: string;
  readonly VITE_DATABASE_SCHEMA: string;
  readonly VITE_JWT_SECRET: string;
  readonly VITE_ENCRYPTION_KEY: string;
  readonly VITE_MAX_FILE_SIZE: string;
  readonly VITE_ALLOWED_FILE_TYPES: string;
  readonly VITE_DEV_MODE: string;
  readonly VITE_DEV_TOOLBAR: string;
  readonly VITE_DEV_ROLE_SWITCH: string;
  readonly VITE_DEV_QUICK_LOGIN: string;
  readonly VITE_PWA_ENABLED: string;
  readonly VITE_PWA_CACHE_NAME: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_API_RETRY_COUNT: string;
  readonly VITE_LOG_LEVEL: string;
  readonly VITE_LOG_CONSOLE: string;
  readonly VITE_PAGINATION_SIZE: string;
  readonly VITE_SEARCH_DEBOUNCE: string;
  readonly VITE_LAB_COUNT: string;
  readonly VITE_DEPO_COUNT: string;
  readonly VITE_MAX_CONCURRENT_BOOKINGS: string;
  readonly VITE_NOTIFICATION_TIMEOUT: string;
  readonly VITE_NOTIFICATION_POSITION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// CSS Module declarations
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.sass' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.less' {
  const content: Record<string, string>;
  export default content;
}
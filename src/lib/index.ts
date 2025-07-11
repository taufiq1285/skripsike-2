/**
 * Lib Barrel Export - AKBID Lab System
 * Centralized library exports
 * Status: Complete
 */

// Supabase
export * from './supabase/client';
export * from './supabase/auth';

// RBAC
export * from './rbac/permissions';
export * from './rbac/roles';

// Utils
export * from './utils/helpers';
export * from './utils/formatters';
export * from './utils/validators';
export * from './utils/dateUtils';

// Constants
export * from './constants/env';
export * from './constants/routes';

// Re-export commonly used items
export { supabase, checkConnection } from './supabase/client';
export { PERMISSIONS, type Permission } from './rbac/permissions';
export { ROLES, getRolePermissions, getRoleDisplayName } from './rbac/roles';
export { ENV } from './constants/env';
export { ROUTES } from './constants/routes';

/**
 * Development Guards - AKBID Lab System
 * Security: Development-only access control utilities
 * Status: Ready for implementation
 */

// Import dengan path yang benar sesuai struktur
import { useAuth } from '../../hooks/useAuth';
import { useRole } from '../../hooks/useRole';
import type { Permission } from '../rbac/permissions';

/**
 * Development-only permission checker
 * Hanya untuk testing dan development
 */
export const devHasPermission = (permission: Permission): boolean => {
  // DEVELOPMENT ONLY: Bypass permission check
  if (process.env.NODE_ENV === 'development') {
    console.log(`[DEV] Permission check bypassed: ${permission}`);
    return true;
  }
  
  // Production: Use normal permission check
  return false;
};

/**
 * Development-only role checker
 * Hanya untuk testing dan development
 */
export const devHasRole = (role: string): boolean => {
  // DEVELOPMENT ONLY: Bypass role check
  if (process.env.NODE_ENV === 'development') {
    console.log(`[DEV] Role check bypassed: ${role}`);
    return true;
  }
  
  // Production: Use normal role check
  return false;
};

/**
 * Development guard wrapper
 * Wrapper untuk bypass security checks di development
 */
export const devGuard = (condition: boolean, fallback: () => void = () => {}) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('[DEV] Security guard bypassed');
    return true;
  }
  
  if (!condition) {
    fallback();
    return false;
  }
  
  return true;
};

/**
 * Quick access untuk development testing
 */
export const devUtils = {
  bypassAuth: process.env.NODE_ENV === 'development',
  bypassRoles: process.env.NODE_ENV === 'development',
  bypassPermissions: process.env.NODE_ENV === 'development',
  
  // Quick role switching untuk development
  quickRole: (role: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEV] Quick switching to role: ${role}`);
      // TODO: Implement role switching logic
      return true;
    }
    return false;
  },
  
  // Quick permission granting untuk development
  quickPermission: (permission: Permission) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEV] Quick granting permission: ${permission}`);
      // TODO: Implement permission granting logic
      return true;
    }
    return false;
  }
};

/**
 * Development-only hooks wrapper
 * Wrapper untuk hooks yang hanya digunakan di development
 */
export const useDevAuth = () => {
  const auth = useAuth();
  
  return {
    ...auth,
    // Development overrides
    isDev: process.env.NODE_ENV === 'development',
    devBypass: process.env.NODE_ENV === 'development'
  };
};

export const useDevRole = () => {
  const role = useRole();
  
  return {
    ...role,
    // Development overrides
    isDev: process.env.NODE_ENV === 'development',
    devBypass: process.env.NODE_ENV === 'development'
  };
};
/**
 * RBAC Barrel Export - AKBID Lab System
 * Security: Centralized RBAC exports
 * Status: Complete
 */

// Permissions
export * from './permissions';
export type { Permission } from './permissions';

// Roles
export * from './roles';
export type { Role } from './roles';

// Guards
export * from './guards';
export type { UserContext, GuardResult } from './guards';

// Policies (for Supabase RLS)
export * from './policies';
export type { Policy } from './policies';

// Re-export commonly used items for convenience
export { 
  PERMISSIONS, 
  PERMISSION_GROUPS,
  hasPermission, 
  hasAnyPermission, 
  hasAllPermissions,
  getAllPermissions,
  getPermissionDisplayName
} from './permissions';

export { 
  ROLES, 
  ROLE_PERMISSIONS, 
  getRolePermissions, 
  getRoleDisplayName,
  getAllRoles,
  isValidRole,
  roleHasPermission
} from './roles';

export { 
  authGuard, 
  roleGuard, 
  permissionGuard,
  adminOnlyGuard,
  dosenOrAdminGuard,
  laboranOrAdminGuard,
  authenticatedUserGuard
} from './guards';

export { 
  POLICIES, 
  POLICY_EXPRESSIONS,
  getPoliciesByTable,
  generatePolicySQL,
  enableRLSSQL
} from './policies';
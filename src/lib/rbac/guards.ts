/**
 * RBAC Guards - AKBID Lab System
 * Security: Access control logic and guards
 * Status: Complete
 */

import { type Permission, hasPermission, hasAnyPermission, hasAllPermissions } from './permissions';
import type { Role } from './roles';

// User interface for guard functions
export interface UserContext {
  id: string;
  role: Role;
  permissions: Permission[];
  isAuthenticated: boolean;
}

// Guard result interface
export interface GuardResult {
  allowed: boolean;
  reason?: string;
}

// Authentication guard
export const authGuard = (user: UserContext | null): GuardResult => {
  if (!user) {
    return { allowed: false, reason: 'User not authenticated' };
  }
  
  if (!user.isAuthenticated) {
    return { allowed: false, reason: 'User not authenticated' };
  }
  
  return { allowed: true };
};

// Role guard
export const roleGuard = (user: UserContext | null, allowedRoles: Role[]): GuardResult => {
  const authResult = authGuard(user);
  if (!authResult.allowed) {
    return authResult;
  }
  
  if (!user || !allowedRoles.includes(user.role)) {
    return { 
      allowed: false, 
      reason: `Access denied. Required roles: ${allowedRoles.join(', ')}. User role: ${user?.role || 'none'}` 
    };
  }
  
  return { allowed: true };
};

// Permission guard
export const permissionGuard = (user: UserContext | null, requiredPermission: Permission): GuardResult => {
  const authResult = authGuard(user);
  if (!authResult.allowed) {
    return authResult;
  }
  
  if (!user || !hasPermission(user.permissions, requiredPermission)) {
    return { 
      allowed: false, 
      reason: `Access denied. Required permission: ${requiredPermission}` 
    };
  }
  
  return { allowed: true };
};

// Multiple permissions guard (ANY)
export const anyPermissionGuard = (user: UserContext | null, requiredPermissions: Permission[]): GuardResult => {
  const authResult = authGuard(user);
  if (!authResult.allowed) {
    return authResult;
  }
  
  if (!user || !hasAnyPermission(user.permissions, requiredPermissions)) {
    return { 
      allowed: false, 
      reason: `Access denied. Required any of permissions: ${requiredPermissions.join(', ')}` 
    };
  }
  
  return { allowed: true };
};

// Multiple permissions guard (ALL)
export const allPermissionsGuard = (user: UserContext | null, requiredPermissions: Permission[]): GuardResult => {
  const authResult = authGuard(user);
  if (!authResult.allowed) {
    return authResult;
  }
  
  if (!user || !hasAllPermissions(user.permissions, requiredPermissions)) {
    return { 
      allowed: false, 
      reason: `Access denied. Required all permissions: ${requiredPermissions.join(', ')}` 
    };
  }
  
  return { allowed: true };
};

// Resource ownership guard (for own resources)
export const ownershipGuard = (user: UserContext | null, resourceOwnerId: string): GuardResult => {
  const authResult = authGuard(user);
  if (!authResult.allowed) {
    return authResult;
  }
  
  if (!user || user.id !== resourceOwnerId) {
    return { 
      allowed: false, 
      reason: 'Access denied. User can only access own resources' 
    };
  }
  
  return { allowed: true };
};

// Combined guard: Role OR permission
export const roleOrPermissionGuard = (
  user: UserContext | null, 
  allowedRoles: Role[], 
  requiredPermission: Permission
): GuardResult => {
  const authResult = authGuard(user);
  if (!authResult.allowed) {
    return authResult;
  }
  
  if (!user) {
    return { allowed: false, reason: 'User not found' };
  }
  
  // Check role first
  if (allowedRoles.includes(user.role)) {
    return { allowed: true };
  }
  
  // Check permission
  if (hasPermission(user.permissions, requiredPermission)) {
    return { allowed: true };
  }
  
  return { 
    allowed: false, 
    reason: `Access denied. Required role: ${allowedRoles.join(', ')} OR permission: ${requiredPermission}` 
  };
};

// Admin or owner guard
export const adminOrOwnerGuard = (user: UserContext | null, resourceOwnerId: string): GuardResult => {
  const authResult = authGuard(user);
  if (!authResult.allowed) {
    return authResult;
  }
  
  if (!user) {
    return { allowed: false, reason: 'User not found' };
  }
  
  // Admin can access everything
  if (user.role === 'admin') {
    return { allowed: true };
  }
  
  // Owner can access own resources
  if (user.id === resourceOwnerId) {
    return { allowed: true };
  }
  
  return { 
    allowed: false, 
    reason: 'Access denied. Only admin or resource owner can access' 
  };
};

// Utility function to check multiple guards
export const checkMultipleGuards = (guards: (() => GuardResult)[]): GuardResult => {
  for (const guard of guards) {
    const result = guard();
    if (!result.allowed) {
      return result;
    }
  }
  
  return { allowed: true };
};

// Higher-order function to create guards
export const createPermissionGuard = (permission: Permission) => {
  return (user: UserContext | null): GuardResult => {
    return permissionGuard(user, permission);
  };
};

export const createRoleGuard = (roles: Role[]) => {
  return (user: UserContext | null): GuardResult => {
    return roleGuard(user, roles);
  };
};

// Specific guards for common use cases
export const adminOnlyGuard = (user: UserContext | null): GuardResult => {
  return roleGuard(user, ['admin']);
};

export const dosenOrAdminGuard = (user: UserContext | null): GuardResult => {
  return roleGuard(user, ['admin', 'dosen']);
};

export const laboranOrAdminGuard = (user: UserContext | null): GuardResult => {
  return roleGuard(user, ['admin', 'laboran']);
};

export const authenticatedUserGuard = (user: UserContext | null): GuardResult => {
  return authGuard(user);
};
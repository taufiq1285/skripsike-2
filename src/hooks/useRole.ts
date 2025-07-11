/**
 * useRole Hook - AKBID Lab System
 * Security: Role validation, permission checks
 * Status: Ready for implementation
 */
import { useAuth } from './useAuth';
import { ROLES, getRolePermissions, getRoleDisplayName } from '../lib/rbac/roles';
import { hasPermission, hasAnyPermission, hasAllPermissions, Permission } from '../lib/rbac/permissions';

export const useRole = () => {
  const { user, isAuthenticated, permissions } = useAuth();

  const currentRole = user?.role;
  const rolePermissions = currentRole ? getRolePermissions(currentRole) : [];

  return {
    // Current role info
    currentRole,
    roleDisplayName: currentRole ? getRoleDisplayName(currentRole) : '',
    rolePermissions,
    
    // Role checks
    isAdmin: currentRole === ROLES.ADMIN,
    isDosen: currentRole === ROLES.DOSEN,
    isLaboran: currentRole === ROLES.LABORAN,
    isMahasiswa: currentRole === ROLES.MAHASISWA,
    
    // Permission checks
    hasPermission: (permission: Permission) => 
      isAuthenticated && hasPermission(permissions, permission),
    hasAnyPermission: (permissionList: Permission[]) => 
      isAuthenticated && hasAnyPermission(permissions, permissionList),
    hasAllPermissions: (permissionList: Permission[]) => 
      isAuthenticated && hasAllPermissions(permissions, permissionList),
    
    // Utility
    canAccess: (requiredRole: string) => 
      isAuthenticated && currentRole === requiredRole,
    canAccessAny: (requiredRoles: string[]) => 
      isAuthenticated && currentRole && requiredRoles.includes(currentRole),
  };
};

/**
 * usePermissions Hook - AKBID Lab System
 * Security: Permission management, access control
 * Status: Ready for implementation
 */
import { useAuth } from './useAuth';
import { useRole } from './useRole';
import { PERMISSIONS } from '../lib/rbac/permissions';

export const usePermissions = () => {
  // Ambil permissions dari useAuth
  const { permissions: userPermissions } = useAuth();
  
  // Ambil semua data yang diperlukan dari useRole dengan destructuring yang benar
  const { 
    currentRole,
    rolePermissions,
    hasPermission, 
    hasAnyPermission, 
    hasAllPermissions 
  } = useRole();

  return {
    // All available permissions
    PERMISSIONS,
    
    // User's current permissions dari auth
    userPermissions,
    
    // Current role info dari useRole
    currentRole,
    rolePermissions,
    
    // Permission check functions dari useRole
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    
    // Specific permission checks
    canManageUsers: () => hasPermission(PERMISSIONS.USER_CREATE),
    canViewUsers: () => hasPermission(PERMISSIONS.USER_READ),
    canManageLabs: () => hasPermission(PERMISSIONS.LAB_CREATE),
    canManageInventory: () => hasPermission(PERMISSIONS.INVENTARIS_CREATE),
    canApproveBorrowings: () => hasPermission(PERMISSIONS.PEMINJAMAN_APPROVE),
    canCreateSchedules: () => hasPermission(PERMISSIONS.JADWAL_CREATE),
    canReviewReports: () => hasPermission(PERMISSIONS.LAPORAN_REVIEW),
    
    // Role-based access patterns
    hasTeachingAccess: () => hasAnyPermission([
      PERMISSIONS.MATAKULIAH_CREATE,
      PERMISSIONS.JADWAL_CREATE,
      PERMISSIONS.PRESENSI_CREATE,
    ]),
    hasLabAccess: () => hasAnyPermission([
      PERMISSIONS.INVENTARIS_CREATE,
      PERMISSIONS.PEMINJAMAN_APPROVE,
      PERMISSIONS.LAB_UPDATE,
    ]),
    hasStudentAccess: () => hasAnyPermission([
      PERMISSIONS.JADWAL_READ,
      PERMISSIONS.LAPORAN_CREATE,
      PERMISSIONS.PRESENSI_READ,
    ]),
  };
};
/**
 * Roles System - AKBID Lab System
 * Security: Role definitions and permissions mapping
 * Status: Complete
 */

import { type Permission, PERMISSIONS, PERMISSION_GROUPS } from './permissions';

// Role definitions
export const ROLES = {
  ADMIN: 'admin',
  DOSEN: 'dosen', 
  LABORAN: 'laboran',
  MAHASISWA: 'mahasiswa',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

// Role permissions mapping
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  // ADMIN: Full system access
  [ROLES.ADMIN]: [
    // User Management
    ...PERMISSION_GROUPS.USER_MANAGEMENT,
    // Lab Management
    ...PERMISSION_GROUPS.LAB_MANAGEMENT,
    // Academic Management
    ...PERMISSION_GROUPS.ACADEMIC_MANAGEMENT,
    // System Management
    ...PERMISSION_GROUPS.SYSTEM_MANAGEMENT,
    // Read access to all other modules
    PERMISSIONS.INVENTARIS_READ,
    PERMISSIONS.PEMINJAMAN_READ,
    PERMISSIONS.PRESENSI_READ,
    PERMISSIONS.LAPORAN_READ,
    PERMISSIONS.PENILAIAN_READ,
  ],
  
  // DOSEN: Academic and teaching related permissions
  [ROLES.DOSEN]: [
    // Mata Kuliah (hanya yang diajar)
    PERMISSIONS.MATAKULIAH_READ,
    PERMISSIONS.MATAKULIAH_UPDATE, // Own courses only
    
    // Jadwal Praktikum
    PERMISSIONS.JADWAL_CREATE,
    PERMISSIONS.JADWAL_READ,
    PERMISSIONS.JADWAL_UPDATE,
    
    // Presensi Management
    PERMISSIONS.PRESENSI_CREATE,
    PERMISSIONS.PRESENSI_READ,
    PERMISSIONS.PRESENSI_UPDATE,
    
    // Laporan Review
    PERMISSIONS.LAPORAN_READ,
    PERMISSIONS.LAPORAN_REVIEW,
    
    // Penilaian
    ...PERMISSION_GROUPS.GRADING_MANAGEMENT,
    
    // Peminjaman (request only)
    PERMISSIONS.PEMINJAMAN_CREATE,
    PERMISSIONS.PEMINJAMAN_READ,
    
    // Lab access (read only)
    PERMISSIONS.LAB_READ,
    PERMISSIONS.INVENTARIS_READ,
  ],
  
  // LABORAN: Inventory and lab equipment management
  [ROLES.LABORAN]: [
    // Inventaris Management
    ...PERMISSION_GROUPS.INVENTORY_MANAGEMENT,
    
    // Peminjaman Management (approval)
    ...PERMISSION_GROUPS.BORROWING_MANAGEMENT,
    
    // Lab Management
    PERMISSIONS.LAB_READ,
    PERMISSIONS.LAB_UPDATE,
    
    // Read access for coordination
    PERMISSIONS.JADWAL_READ,
    PERMISSIONS.USER_READ,
    PERMISSIONS.MATAKULIAH_READ,
  ],
  
  // MAHASISWA: Student access - view and submit only
  [ROLES.MAHASISWA]: [
    // View permissions
    PERMISSIONS.JADWAL_READ,
    PERMISSIONS.MATAKULIAH_READ,
    PERMISSIONS.PRESENSI_READ, // Own attendance only
    PERMISSIONS.PENILAIAN_READ, // Own grades only
    
    // Laporan (create and read own)
    PERMISSIONS.LAPORAN_CREATE,
    PERMISSIONS.LAPORAN_READ, // Own reports only
    PERMISSIONS.LAPORAN_UPDATE, // Own reports only, before review
    
    // Limited lab access
    PERMISSIONS.LAB_READ,
    PERMISSIONS.INVENTARIS_READ, // Browse only
  ],
};

// Helper functions
export const getRolePermissions = (role: Role): Permission[] => {
  return ROLE_PERMISSIONS[role] || [];
};

export const getRoleDisplayName = (role: Role): string => {
  const roleNames: Record<Role, string> = {
    [ROLES.ADMIN]: 'Administrator',
    [ROLES.DOSEN]: 'Dosen',
    [ROLES.LABORAN]: 'Laboran',
    [ROLES.MAHASISWA]: 'Mahasiswa',
  };
  
  return roleNames[role] || role;
};

export const getAllRoles = (): Role[] => {
  return Object.values(ROLES);
};

export const isValidRole = (role: string): role is Role => {
  return getAllRoles().includes(role as Role);
};

// Role hierarchy (for future use)
export const ROLE_HIERARCHY: Record<Role, number> = {
  [ROLES.ADMIN]: 4,
  [ROLES.DOSEN]: 3,
  [ROLES.LABORAN]: 2,
  [ROLES.MAHASISWA]: 1,
};

export const hasHigherRole = (userRole: Role, targetRole: Role): boolean => {
  return ROLE_HIERARCHY[userRole] > ROLE_HIERARCHY[targetRole];
};

export const hasEqualOrHigherRole = (userRole: Role, targetRole: Role): boolean => {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[targetRole];
};

// Role permissions checking
export const roleHasPermission = (role: Role, permission: Permission): boolean => {
  return getRolePermissions(role).includes(permission);
};

export const roleHasAnyPermission = (role: Role, permissions: Permission[]): boolean => {
  const rolePermissions = getRolePermissions(role);
  return permissions.some(permission => rolePermissions.includes(permission));
};

export const roleHasAllPermissions = (role: Role, permissions: Permission[]): boolean => {
  const rolePermissions = getRolePermissions(role);
  return permissions.every(permission => rolePermissions.includes(permission));
};

// Get roles that have specific permission
export const getRolesWithPermission = (permission: Permission): Role[] => {
  return getAllRoles().filter(role => roleHasPermission(role, permission));
};

// Role description for UI
export const getRoleDescription = (role: Role): string => {
  const descriptions: Record<Role, string> = {
    [ROLES.ADMIN]: 'Akses penuh ke semua fitur sistem termasuk manajemen user dan pengaturan sistem',
    [ROLES.DOSEN]: 'Mengelola mata kuliah, jadwal praktikum, presensi mahasiswa, dan penilaian',
    [ROLES.LABORAN]: 'Mengelola inventaris alat laboratorium dan persetujuan peminjaman',
    [ROLES.MAHASISWA]: 'Mengakses jadwal, materi, mengumpulkan laporan, dan melihat nilai',
  };
  
  return descriptions[role] || '';
};
/**
 * Permissions System - AKBID Lab System
 * Security: Permission definitions and management
 * Status: Complete
 */

// Permission type
export type Permission = string;

// Core permissions untuk setiap module
export const PERMISSIONS = {
  // User Management
  USER_CREATE: 'user:create',
  USER_READ: 'user:read', 
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  
  // Lab Management
  LAB_CREATE: 'lab:create',
  LAB_READ: 'lab:read',
  LAB_UPDATE: 'lab:update',
  LAB_DELETE: 'lab:delete',
  
  // Mata Kuliah Management
  MATAKULIAH_CREATE: 'matakuliah:create',
  MATAKULIAH_READ: 'matakuliah:read',
  MATAKULIAH_UPDATE: 'matakuliah:update',
  MATAKULIAH_DELETE: 'matakuliah:delete',
  
  // Jadwal Management
  JADWAL_CREATE: 'jadwal:create',
  JADWAL_READ: 'jadwal:read',
  JADWAL_UPDATE: 'jadwal:update',
  JADWAL_DELETE: 'jadwal:delete',
  
  // Inventaris Management
  INVENTARIS_CREATE: 'inventaris:create',
  INVENTARIS_READ: 'inventaris:read',
  INVENTARIS_UPDATE: 'inventaris:update',
  INVENTARIS_DELETE: 'inventaris:delete',
  
  // Peminjaman Management
  PEMINJAMAN_CREATE: 'peminjaman:create',
  PEMINJAMAN_READ: 'peminjaman:read',
  PEMINJAMAN_UPDATE: 'peminjaman:update',
  PEMINJAMAN_DELETE: 'peminjaman:delete',
  PEMINJAMAN_APPROVE: 'peminjaman:approve',
  
  // Presensi Management
  PRESENSI_CREATE: 'presensi:create',
  PRESENSI_READ: 'presensi:read',
  PRESENSI_UPDATE: 'presensi:update',
  PRESENSI_DELETE: 'presensi:delete',
  
  // Laporan Management
  LAPORAN_CREATE: 'laporan:create',
  LAPORAN_READ: 'laporan:read',
  LAPORAN_UPDATE: 'laporan:update',
  LAPORAN_DELETE: 'laporan:delete',
  LAPORAN_REVIEW: 'laporan:review',
  
  // Penilaian Management
  PENILAIAN_CREATE: 'penilaian:create',
  PENILAIAN_READ: 'penilaian:read',
  PENILAIAN_UPDATE: 'penilaian:update',
  PENILAIAN_DELETE: 'penilaian:delete',
  
  // System Management
  SYSTEM_ADMIN: 'system:admin',
  SYSTEM_REPORTS: 'system:reports',
  SYSTEM_SETTINGS: 'system:settings',
  SYSTEM_AUDIT: 'system:audit',
} as const;

// Permission groups untuk kemudahan management
export const PERMISSION_GROUPS = {
  USER_MANAGEMENT: [
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.USER_DELETE,
  ],
  LAB_MANAGEMENT: [
    PERMISSIONS.LAB_CREATE,
    PERMISSIONS.LAB_READ,
    PERMISSIONS.LAB_UPDATE,
    PERMISSIONS.LAB_DELETE,
  ],
  ACADEMIC_MANAGEMENT: [
    PERMISSIONS.MATAKULIAH_CREATE,
    PERMISSIONS.MATAKULIAH_READ,
    PERMISSIONS.MATAKULIAH_UPDATE,
    PERMISSIONS.MATAKULIAH_DELETE,
    PERMISSIONS.JADWAL_CREATE,
    PERMISSIONS.JADWAL_READ,
    PERMISSIONS.JADWAL_UPDATE,
    PERMISSIONS.JADWAL_DELETE,
  ],
  INVENTORY_MANAGEMENT: [
    PERMISSIONS.INVENTARIS_CREATE,
    PERMISSIONS.INVENTARIS_READ,
    PERMISSIONS.INVENTARIS_UPDATE,
    PERMISSIONS.INVENTARIS_DELETE,
  ],
  BORROWING_MANAGEMENT: [
    PERMISSIONS.PEMINJAMAN_CREATE,
    PERMISSIONS.PEMINJAMAN_READ,
    PERMISSIONS.PEMINJAMAN_UPDATE,
    PERMISSIONS.PEMINJAMAN_DELETE,
    PERMISSIONS.PEMINJAMAN_APPROVE,
  ],
  ATTENDANCE_MANAGEMENT: [
    PERMISSIONS.PRESENSI_CREATE,
    PERMISSIONS.PRESENSI_READ,
    PERMISSIONS.PRESENSI_UPDATE,
    PERMISSIONS.PRESENSI_DELETE,
  ],
  REPORT_MANAGEMENT: [
    PERMISSIONS.LAPORAN_CREATE,
    PERMISSIONS.LAPORAN_READ,
    PERMISSIONS.LAPORAN_UPDATE,
    PERMISSIONS.LAPORAN_DELETE,
    PERMISSIONS.LAPORAN_REVIEW,
  ],
  GRADING_MANAGEMENT: [
    PERMISSIONS.PENILAIAN_CREATE,
    PERMISSIONS.PENILAIAN_READ,
    PERMISSIONS.PENILAIAN_UPDATE,
    PERMISSIONS.PENILAIAN_DELETE,
  ],
  SYSTEM_MANAGEMENT: [
    PERMISSIONS.SYSTEM_ADMIN,
    PERMISSIONS.SYSTEM_REPORTS,
    PERMISSIONS.SYSTEM_SETTINGS,
    PERMISSIONS.SYSTEM_AUDIT,
  ],
} as const;

// Helper functions untuk permission checking
export const hasPermission = (userPermissions: Permission[], permission: Permission): boolean => {
  return userPermissions.includes(permission);
};

export const hasAnyPermission = (userPermissions: Permission[], permissions: Permission[]): boolean => {
  return permissions.some(permission => userPermissions.includes(permission));
};

export const hasAllPermissions = (userPermissions: Permission[], permissions: Permission[]): boolean => {
  return permissions.every(permission => userPermissions.includes(permission));
};

// Get all permissions as array
export const getAllPermissions = (): Permission[] => {
  return Object.values(PERMISSIONS);
};

// Get permissions by group
export const getPermissionsByGroup = (groupName: keyof typeof PERMISSION_GROUPS): Permission[] => {
  return [...PERMISSION_GROUPS[groupName]];
};

// Permission validation
export const isValidPermission = (permission: string): permission is Permission => {
  return getAllPermissions().includes(permission as Permission);
};

// Get permission display name
export const getPermissionDisplayName = (permission: Permission): string => {
  const permissionMap: Record<Permission, string> = {
    [PERMISSIONS.USER_CREATE]: 'Buat User',
    [PERMISSIONS.USER_READ]: 'Lihat User',
    [PERMISSIONS.USER_UPDATE]: 'Edit User',
    [PERMISSIONS.USER_DELETE]: 'Hapus User',
    
    [PERMISSIONS.LAB_CREATE]: 'Buat Lab',
    [PERMISSIONS.LAB_READ]: 'Lihat Lab',
    [PERMISSIONS.LAB_UPDATE]: 'Edit Lab',
    [PERMISSIONS.LAB_DELETE]: 'Hapus Lab',
    
    [PERMISSIONS.MATAKULIAH_CREATE]: 'Buat Mata Kuliah',
    [PERMISSIONS.MATAKULIAH_READ]: 'Lihat Mata Kuliah',
    [PERMISSIONS.MATAKULIAH_UPDATE]: 'Edit Mata Kuliah',
    [PERMISSIONS.MATAKULIAH_DELETE]: 'Hapus Mata Kuliah',
    
    [PERMISSIONS.JADWAL_CREATE]: 'Buat Jadwal',
    [PERMISSIONS.JADWAL_READ]: 'Lihat Jadwal',
    [PERMISSIONS.JADWAL_UPDATE]: 'Edit Jadwal',
    [PERMISSIONS.JADWAL_DELETE]: 'Hapus Jadwal',
    
    [PERMISSIONS.INVENTARIS_CREATE]: 'Tambah Inventaris',
    [PERMISSIONS.INVENTARIS_READ]: 'Lihat Inventaris',
    [PERMISSIONS.INVENTARIS_UPDATE]: 'Edit Inventaris',
    [PERMISSIONS.INVENTARIS_DELETE]: 'Hapus Inventaris',
    
    [PERMISSIONS.PEMINJAMAN_CREATE]: 'Buat Peminjaman',
    [PERMISSIONS.PEMINJAMAN_READ]: 'Lihat Peminjaman',
    [PERMISSIONS.PEMINJAMAN_UPDATE]: 'Edit Peminjaman',
    [PERMISSIONS.PEMINJAMAN_DELETE]: 'Hapus Peminjaman',
    [PERMISSIONS.PEMINJAMAN_APPROVE]: 'Setujui Peminjaman',
    
    [PERMISSIONS.PRESENSI_CREATE]: 'Buat Presensi',
    [PERMISSIONS.PRESENSI_READ]: 'Lihat Presensi',
    [PERMISSIONS.PRESENSI_UPDATE]: 'Edit Presensi',
    [PERMISSIONS.PRESENSI_DELETE]: 'Hapus Presensi',
    
    [PERMISSIONS.LAPORAN_CREATE]: 'Buat Laporan',
    [PERMISSIONS.LAPORAN_READ]: 'Lihat Laporan',
    [PERMISSIONS.LAPORAN_UPDATE]: 'Edit Laporan',
    [PERMISSIONS.LAPORAN_DELETE]: 'Hapus Laporan',
    [PERMISSIONS.LAPORAN_REVIEW]: 'Review Laporan',
    
    [PERMISSIONS.PENILAIAN_CREATE]: 'Buat Penilaian',
    [PERMISSIONS.PENILAIAN_READ]: 'Lihat Penilaian',
    [PERMISSIONS.PENILAIAN_UPDATE]: 'Edit Penilaian',
    [PERMISSIONS.PENILAIAN_DELETE]: 'Hapus Penilaian',
    
    [PERMISSIONS.SYSTEM_ADMIN]: 'Administrasi Sistem',
    [PERMISSIONS.SYSTEM_REPORTS]: 'Laporan Sistem',
    [PERMISSIONS.SYSTEM_SETTINGS]: 'Pengaturan Sistem',
    [PERMISSIONS.SYSTEM_AUDIT]: 'Audit Sistem',
  };
  
  return permissionMap[permission] || permission;
};
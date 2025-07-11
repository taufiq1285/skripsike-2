/**
 * Route Constants - AKBID Lab System
 * Security: Centralized route definitions
 * Status: Ready
 */

export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // Dashboard routes
  DASHBOARD: '/dashboard',
  
  // Admin routes
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    LABS: '/admin/labs',
    MATA_KULIAH: '/admin/mata-kuliah',
    REPORTS: '/admin/reports',
    SETTINGS: '/admin/settings',
    AUDIT_LOGS: '/admin/audit-logs',
  },
  
  // Dosen routes
  DOSEN: {
    DASHBOARD: '/dosen/dashboard',
    MATA_KULIAH: '/dosen/mata-kuliah',
    JADWAL: '/dosen/jadwal',
    PRESENSI: '/dosen/presensi',
    MATERI: '/dosen/materi',
    LAPORAN: '/dosen/laporan',
    PEMINJAMAN: '/dosen/peminjaman',
    PENILAIAN: '/dosen/penilaian',
    PROFILE: '/dosen/profile',
  },
  
  // Laboran routes
  LABORAN: {
    DASHBOARD: '/laboran/dashboard',
    INVENTARIS: '/laboran/inventaris',
    PEMINJAMAN: '/laboran/peminjaman',
    STOCK_OPNAME: '/laboran/stock-opname',
    MAINTENANCE: '/laboran/maintenance',
    LAPORAN: '/laboran/laporan',
    LAB_ROOMS: '/laboran/lab-rooms',
    PROFILE: '/laboran/profile',
  },
  
  // Mahasiswa routes
  MAHASISWA: {
    DASHBOARD: '/mahasiswa/dashboard',
    JADWAL: '/mahasiswa/jadwal',
    MATERI: '/mahasiswa/materi',
    LAPORAN: '/mahasiswa/laporan',
    NILAI: '/mahasiswa/nilai',
    PRESENSI: '/mahasiswa/presensi',
    PROFILE: '/mahasiswa/profile',
    HELP: '/mahasiswa/help',
  },
  
  // Error routes
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/unauthorized',
  SERVER_ERROR: '/500',
  MAINTENANCE: '/maintenance',
  OFFLINE: '/offline',
} as const;

export default ROUTES;

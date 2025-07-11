/**
 * Store Barrel Export - AKBID Lab System
 * Security: Centralized store exports
 * Status: Complete
 */

// Authentication & User stores
export { useAuthStore } from './authStore';

// Core entity stores
export { useMataKuliahStore } from './mataKuliahStore';
export { useInventarisStore } from './inventarisStore';
export { usePeminjamanStore } from './peminjamanStore';

// Re-export store types if needed
// export type { AuthState } from './authStore';
// export type { MataKuliahState } from './mataKuliahStore';
// export type { InventarisState } from './inventarisStore';
// export type { PeminjamanState } from './peminjamanStore';

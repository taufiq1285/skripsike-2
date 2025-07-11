/**
 * Store Barrel Export - AKBID Lab System
 * Security: Centralized store exports
 * Status: Complete
 */

// Authentication & User stores
export { useAuthStore } from './authStore';
export type { User } from './authStore';

// UI Store
export { useUIStore } from './uiStore';

// Development Store
export { useDevStore } from './devStore';

// Core entity stores (commented out until implemented)
// export { useMataKuliahStore } from './mataKuliahStore';
// export { useInventarisStore } from './inventarisStore';
// export { usePeminjamanStore } from './peminjamanStore';

// Re-export store types if needed
// export type { AuthState } from './authStore';
// export type { UIState } from './uiStore';
// export type { DevState } from './devStore';
/**
 * Main Barrel Export - AKBID Lab System
 * Central export point for the entire library
 * Status: Complete
 */

// Core exports
export * from './hooks';
export * from './store';
export * from './types';
export * from './lib';

// Commonly used items for easy access
export { useAuth, useRole, usePermissions } from './hooks';
export { useAuthStore, useUIStore } from './store';
export { PERMISSIONS, ROLES, ENV, ROUTES } from './lib';
export type { 
  User, 
  UserProfile, 
  LabRoom, 
  InventoryItem, 
  Schedule, 
  Borrowing, 
  MataKuliah,
  ApiResponse 
} from './types';

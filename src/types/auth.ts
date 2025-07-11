/**
 * Auth Types - AKBID Lab System
 * Authentication and authorization type definitions
 * Status: Complete
 */

import { type Role } from '../lib/rbac/roles';
import type { Permission } from '../lib/rbac/permissions';

// Core User interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  nim_nip?: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// User creation payload
export interface CreateUserData {
  email: string;
  name: string;
  role: Role;
  nim_nip?: string;
  phone?: string;
  password: string;
  bio?: string;
}

// User update payload
export interface UpdateUserData {
  name?: string;
  nim_nip?: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  is_active?: boolean;
}

// Login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Registration data
export interface RegisterData extends CreateUserData {
  confirmPassword: string;
}

// Auth session
export interface AuthSession {
  user: User;
  permissions: Permission[];
  expiresAt: string;
  token?: string;
}

// Password reset request
export interface PasswordResetRequest {
  email: string;
}

// Password reset data
export interface PasswordResetData {
  token: string;
  password: string;
  confirmPassword: string;
}

// Auth error types
export interface AuthError {
  code: string;
  message: string;
  details?: string;
}

// Auth response wrapper
export interface AuthResponse<T = any> {
  data: T | null;
  error: AuthError | null;
  success: boolean;
}

// Profile update response
export interface ProfileUpdateResponse {
  user: User;
  message: string;
}

// Permission check context
export interface PermissionContext {
  user: User;
  permissions: Permission[];
  resourceId?: string;
  action?: string;
}

// Role assignment data
export interface RoleAssignment {
  userId: string;
  role: Role;
  assignedBy: string;
  assignedAt: string;
  expiresAt?: string;
}

// Authentication state
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  permissions: Permission[];
  error: string | null;
  lastLoginAt?: string;
}
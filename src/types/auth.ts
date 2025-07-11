/**
 * Authentication Types - AKBID Lab System
 * Security: Type safety for auth operations
 * Status: Complete
 */

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'dosen' | 'laboran' | 'mahasiswa';
  nim_nip?: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  permissions: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: User['role'];
  nim_nip?: string;
  phone?: string;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: User;
}

export interface AuthError {
  message: string;
  status?: number;
  code?: string;
}

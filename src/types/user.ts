/**
 * User Types - AKBID Lab System
 * Security: Type safety for user operations
 * Status: Complete
 */

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'dosen' | 'laboran' | 'mahasiswa';
  nim_nip?: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  department?: string;
  semester?: number;
  academic_year?: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface CreateUserData {
  email: string;
  name: string;
  role: UserProfile['role'];
  nim_nip?: string;
  phone?: string;
  password: string;
  department?: string;
  semester?: number;
}

export interface UpdateUserData {
  name?: string;
  phone?: string;
  bio?: string;
  avatar_url?: string;
  department?: string;
  semester?: number;
}

export interface UserPermission {
  id: string;
  user_id: string;
  permission: string;
  granted_by: string;
  granted_at: string;
  expires_at?: string;
}

export interface UserSession {
  id: string;
  user_id: string;
  device_info?: string;
  ip_address?: string;
  last_activity: string;
  created_at: string;
}

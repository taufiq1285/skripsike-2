/**
 * Supabase Auth - AKBID Lab System
 * Security: Secure authentication operations
 * Status: Ready for implementation
 */

import { supabase } from './client';
import type { LoginCredentials, RegisterData } from '../../types/auth';

export const auth = {
  // Sign in user
  signIn: async (credentials: LoginCredentials) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw error;
    return { data, error: null };
  },

  // Sign up user
  signUp: async (userData: RegisterData) => {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          name: userData.name,
          role: userData.role || 'mahasiswa',
        },
      },
    });

    if (error) throw error;
    return { data, error: null };
  },

  // Sign out user
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current user
  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  // Get current session
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  // Reset password
  resetPassword: async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  },

  // Update password
  updatePassword: async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
  },

  // Update user profile
  updateProfile: async (updates: { name?: string; avatar_url?: string }) => {
    const { error } = await supabase.auth.updateUser({
      data: updates,
    });
    if (error) throw error;
  },

  // Listen to auth state changes
  onAuthStateChange: (callback: (event: string, session: unknown) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },

  // Check if user is authenticated
  isAuthenticated: async (): Promise<boolean> => {
    try {
      const session = await auth.getSession();
      return !!session?.user;
    } catch {
      return false;
    }
  },

  // Get user role from metadata
  getUserRole: async (): Promise<string | null> => {
    try {
      const user = await auth.getUser();
      return user?.user_metadata?.role || user?.app_metadata?.role || null;
    } catch {
      return null;
    }
  },
};

export default auth;